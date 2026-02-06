import { Bot, Database, MessageSquare, Brain, Cpu, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef, useCallback, ElementType } from 'react';

interface WorkflowNode {
  id: string;
  icon: ElementType;
  label: string;
  sublabel?: string;
  desktop: { x: number; y: number };
  mobile: { x: number; y: number };
  type: 'primary' | 'agent' | 'service';
  color: string;
}

interface Connection {
  from: string;
  to: string;
  style: 'solid' | 'dashed';
}

type NodeStatus = 'idle' | 'active' | 'completed';

const NODES: WorkflowNode[] = [
  {
    id: 'trigger',
    icon: MessageSquare,
    label: 'Input',
    sublabel: 'User Query',
    desktop: { x: 12, y: 35 },
    mobile: { x: 50, y: 8 },
    type: 'primary',
    color: '#818cf8', // indigo
  },
  {
    id: 'agent',
    icon: Bot,
    label: 'AI Agent',
    sublabel: 'Orchestrator',
    desktop: { x: 50, y: 32 },
    mobile: { x: 50, y: 35 },
    type: 'agent',
    color: '#06b6d4', // cyan
  },
  {
    id: 'output',
    icon: Sparkles,
    label: 'Output',
    sublabel: 'Response',
    desktop: { x: 88, y: 35 },
    mobile: { x: 50, y: 92 },
    type: 'primary',
    color: '#a78bfa', // violet
  },
  {
    id: 'llm',
    icon: Brain,
    label: 'LLM',
    sublabel: 'GPT-4',
    desktop: { x: 25, y: 75 },
    mobile: { x: 20, y: 62 },
    type: 'service',
    color: '#f472b6', // pink
  },
  {
    id: 'memory',
    icon: Database,
    label: 'Memory',
    sublabel: 'Context',
    desktop: { x: 42, y: 82 },
    mobile: { x: 80, y: 62 },
    type: 'service',
    color: '#34d399', // emerald
  },
  {
    id: 'vector',
    icon: Database,
    label: 'Vector DB',
    sublabel: 'RAG',
    desktop: { x: 58, y: 82 },
    mobile: { x: 20, y: 78 },
    type: 'service',
    color: '#38bdf8', // sky
  },
  {
    id: 'embeddings',
    icon: Cpu,
    label: 'Embeddings',
    sublabel: 'Encoder',
    desktop: { x: 75, y: 75 },
    mobile: { x: 80, y: 78 },
    type: 'service',
    color: '#fbbf24', // amber
  },
];

const CONNECTIONS: Connection[] = [
  { from: 'trigger', to: 'agent', style: 'solid' },
  { from: 'agent', to: 'output', style: 'solid' },
  { from: 'agent', to: 'llm', style: 'dashed' },
  { from: 'agent', to: 'memory', style: 'dashed' },
  { from: 'agent', to: 'vector', style: 'dashed' },
  { from: 'agent', to: 'embeddings', style: 'dashed' },
];

const STAGES = [
  { time: 300, activeNode: 'trigger', label: 'Receiving query...', completed: [] as string[], activeConns: [] as string[], completedConns: [] as string[] },
  { time: 1200, activeNode: 'trigger', label: 'Receiving query...', completed: ['trigger'], activeConns: ['trigger-agent'], completedConns: [] as string[] },
  { time: 2000, activeNode: 'agent', label: 'Agent reasoning...', completed: ['trigger'], activeConns: [], completedConns: ['trigger-agent'] },
  { time: 3000, activeNode: 'agent', label: 'Querying knowledge...', completed: ['trigger'], activeConns: ['agent-llm', 'agent-memory'], completedConns: ['trigger-agent'] },
  { time: 4000, activeNode: 'agent', label: 'Processing context...', completed: ['trigger', 'llm', 'memory'], activeConns: ['agent-vector', 'agent-embeddings'], completedConns: ['trigger-agent', 'agent-llm', 'agent-memory'] },
  { time: 5200, activeNode: 'agent', label: 'Synthesizing response...', completed: ['trigger', 'llm', 'memory', 'vector', 'embeddings'], activeConns: [], completedConns: ['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings'] },
  { time: 6200, activeNode: 'agent', label: 'Generating output...', completed: ['trigger', 'llm', 'memory', 'vector', 'embeddings'], activeConns: ['agent-output'], completedConns: ['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings'] },
  { time: 7200, activeNode: 'output', label: 'Response delivered', completed: ['trigger', 'llm', 'memory', 'vector', 'embeddings', 'agent', 'output'], activeConns: [], completedConns: ['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings', 'agent-output'] },
  { time: 8500, activeNode: null, label: '', completed: [] as string[], activeConns: [] as string[], completedConns: [] as string[] },
];

export default function AIAgentArchitecture() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [completedNodes, setCompletedNodes] = useState<string[]>([]);
  const [activeConnections, setActiveConnections] = useState<string[]>([]);
  const [completedConnections, setCompletedConnections] = useState<string[]>([]);
  const [currentStageLabel, setCurrentStageLabel] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationTimers = useRef<NodeJS.Timeout[]>([]);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const stopAnimation = useCallback(() => {
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    isAnimatingRef.current = false;
  }, []);

  const resetAnimation = useCallback(() => {
    setActiveNode(null);
    setCompletedNodes([]);
    setActiveConnections([]);
    setCompletedConnections([]);
    setCurrentStageLabel('');
  }, []);

  const runAnimation = useCallback(() => {
    stopAnimation();
    resetAnimation();

    STAGES.forEach(({ time, activeNode: node, label, completed, activeConns, completedConns }) => {
      animationTimers.current.push(setTimeout(() => {
        setActiveNode(node);
        setCurrentStageLabel(label);
        setCompletedNodes(completed);
        setActiveConnections(activeConns);
        setCompletedConnections(completedConns);
      }, time));
    });
  }, [stopAnimation, resetAnimation]);

  const startLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const loop = () => {
      if (!isAnimatingRef.current) return;
      runAnimation();
      animationTimers.current.push(setTimeout(loop, 10000));
    };
    loop();
  }, [runAnimation]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimatingRef.current) {
            startLoop();
          } else if (!entry.isIntersecting && isAnimatingRef.current) {
            stopAnimation();
            resetAnimation();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [startLoop, stopAnimation, resetAnimation]);

  const getNodeStatus = useCallback((id: string): NodeStatus => {
    if (completedNodes.includes(id)) return 'completed';
    if (activeNode === id) return 'active';
    return 'idle';
  }, [completedNodes, activeNode]);

  const getConnStatus = useCallback((from: string, to: string): NodeStatus => {
    const key = `${from}-${to}`;
    if (completedConnections.includes(key)) return 'completed';
    if (activeConnections.includes(key)) return 'active';
    return 'idle';
  }, [completedConnections, activeConnections]);

  const buildPath = useCallback((from: WorkflowNode, to: WorkflowNode): string => {
    const s = isMobile ? from.mobile : from.desktop;
    const e = isMobile ? to.mobile : to.desktop;

    if (isMobile) {
      if (Math.abs(s.x - e.x) < 5) return `M ${s.x},${s.y} L ${e.x},${e.y}`;
      const midY = (s.y + e.y) / 2;
      return `M ${s.x},${s.y} C ${s.x},${midY} ${e.x},${midY} ${e.x},${e.y}`;
    }

    if (Math.abs(s.y - e.y) < 5) return `M ${s.x},${s.y} L ${e.x},${e.y}`;
    const cy = s.y + (e.y - s.y) * 0.55;
    return `M ${s.x},${s.y} C ${s.x},${cy} ${e.x},${cy} ${e.x},${e.y}`;
  }, [isMobile]);

  const renderConnection = (conn: Connection, index: number) => {
    const fromNode = NODES.find(n => n.id === conn.from);
    const toNode = NODES.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return null;

    const status = getConnStatus(conn.from, conn.to);
    const pathId = `arch-path-${conn.from}-${conn.to}`;
    const gradId = `arch-grad-${conn.from}-${conn.to}`;
    const pathD = buildPath(fromNode, toNode);

    const isActive = status === 'active';
    const isDone = status === 'completed';

    return (
      <g key={index}>
        {/* Glow layer */}
        {(isActive || isDone) && (
          <path
            d={pathD}
            fill="none"
            stroke={isDone ? toNode.color : fromNode.color}
            strokeWidth="1.2"
            strokeDasharray={conn.style === 'dashed' ? '2,2' : 'none'}
            opacity={0.15}
            strokeLinecap="round"
            filter="url(#arch-glow)"
          />
        )}

        {/* Gradient definition for this connection */}
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fromNode.color} />
            <stop offset="100%" stopColor={toNode.color} />
          </linearGradient>
        </defs>

        {/* Main path */}
        <path
          id={pathId}
          d={pathD}
          fill="none"
          stroke={isActive || isDone ? `url(#${gradId})` : '#1e293b'}
          strokeWidth={isActive ? '0.5' : isDone ? '0.35' : '0.15'}
          strokeDasharray={conn.style === 'dashed' ? '1.5,1.5' : 'none'}
          opacity={status === 'idle' ? 0.3 : 1}
          strokeLinecap="round"
          className="transition-all duration-700"
        />

        {/* Traveling particle */}
        {isActive && (
          <>
            <circle r="0.8" fill={toNode.color} opacity="0.9">
              <animateMotion dur="1.2s" repeatCount="indefinite">
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
            <circle r="1.8" fill={toNode.color} opacity="0.15">
              <animateMotion dur="1.2s" repeatCount="indefinite">
                <mpath href={`#${pathId}`} />
              </animateMotion>
            </circle>
          </>
        )}
      </g>
    );
  };

  const renderNode = (node: WorkflowNode) => {
    const status = getNodeStatus(node.id);
    const isAgent = node.type === 'agent';
    const isService = node.type === 'service';
    const pos = isMobile ? node.mobile : node.desktop;
    const isActive = status === 'active';
    const isDone = status === 'completed';

    const sizeClass = isAgent
      ? 'w-[72px] h-[72px] sm:w-[88px] sm:h-[88px]'
      : isService
        ? 'w-[48px] h-[48px] sm:w-[56px] sm:h-[56px]'
        : 'w-[56px] h-[56px] sm:w-[64px] sm:h-[64px]';

    const iconSize = isAgent
      ? 'w-8 h-8 sm:w-9 sm:h-9'
      : 'w-5 h-5 sm:w-6 sm:h-6';

    return (
      <div
        key={node.id}
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out"
        style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: isAgent ? 20 : 10 }}
      >
        <div className="flex flex-col items-center gap-2.5">
          {/* Node container */}
          <div className="relative">
            {/* Outer ring pulse for active */}
            {isActive && (
              <div
                className="absolute -inset-2 rounded-2xl animate-ping opacity-20"
                style={{ backgroundColor: node.color }}
              />
            )}

            {/* Outer ring for active/completed */}
            {(isActive || isDone) && (
              <div
                className="absolute -inset-1 rounded-2xl opacity-30 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${node.color}40, transparent, ${node.color}20)`,
                  border: `1px solid ${node.color}50`,
                }}
              />
            )}

            {/* Main node */}
            <div
              className={`relative ${sizeClass} rounded-xl flex items-center justify-center transition-all duration-500 backdrop-blur-sm ${
                isActive
                  ? 'scale-110'
                  : isDone
                    ? 'scale-100'
                    : 'scale-100'
              }`}
              style={{
                background: isActive
                  ? `linear-gradient(135deg, ${node.color}25, ${node.color}10)`
                  : isDone
                    ? `linear-gradient(135deg, ${node.color}15, ${node.color}08)`
                    : 'rgba(15, 23, 42, 0.6)',
                border: `1px solid ${
                  isActive ? `${node.color}80` : isDone ? `${node.color}40` : 'rgba(51, 65, 85, 0.4)'
                }`,
                boxShadow: isActive
                  ? `0 0 30px ${node.color}20, inset 0 1px 0 ${node.color}15`
                  : isDone
                    ? `0 0 15px ${node.color}10`
                    : 'none',
              }}
            >
              <div
                className="transition-colors duration-500"
                style={{ color: isActive || isDone ? node.color : '#64748b' }}
              >
                <node.icon className={iconSize} strokeWidth={1.5} />
              </div>
            </div>

            {/* Status dot */}
            {isActive && (
              <div
                className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-slate-950"
                style={{ backgroundColor: node.color }}
              />
            )}
          </div>

          {/* Labels */}
          <div className="flex flex-col items-center">
            <span
              className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-colors duration-500"
              style={{ color: isActive ? node.color : isDone ? `${node.color}cc` : '#64748b' }}
            >
              {node.label}
            </span>
            {node.sublabel && !isMobile && (
              <span className="text-[9px] text-slate-600 mt-0.5 font-medium">{node.sublabel}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="w-full max-w-5xl mx-auto mt-8 md:mt-16 relative">
      {/* Ambient glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-500/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Main container */}
      <div className="relative rounded-2xl sm:rounded-3xl border border-white/[0.06] shadow-2xl overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(2,6,23,0.98) 100%)' }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

        {/* Status bar */}
        <div className="relative z-20 flex justify-between items-center px-5 py-3.5 border-b border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                currentStageLabel ? 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.6)]' : 'bg-slate-700'
              }`} />
              <span className="text-[11px] font-medium text-slate-400 tracking-wide">
                {currentStageLabel || 'Awaiting input'}
              </span>
            </div>
            {currentStageLabel && (
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-slate-600">
                <div className="w-1 h-1 rounded-full bg-cyan-500/40 animate-pulse" />
                <span>Pipeline active</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-[10px] text-slate-700 font-mono tracking-wider">v2.0</span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/15 border border-red-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/15 border border-yellow-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/15 border border-green-500/30" />
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className={`relative w-full ${isMobile ? 'h-[520px]' : 'h-[420px]'}`}>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
          >
            <defs>
              <filter id="arch-glow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {CONNECTIONS.map((conn, i) => renderConnection(conn, i))}
          </svg>

          {NODES.map(node => renderNode(node))}
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent" />
      </div>
    </div>
  );
}
