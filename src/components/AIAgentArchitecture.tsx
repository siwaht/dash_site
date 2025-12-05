import { Bot, Database, MessageSquare, Brain, Video, Sparkles } from 'lucide-react';
import { useEffect, useState, useRef, useCallback, ElementType } from 'react';

interface WorkflowNode {
  id: string;
  icon: ElementType;
  label: string;
  sublabel?: string;
  desktop: { x: number; y: number };
  mobile: { x: number; y: number };
  type: 'primary' | 'agent' | 'service';
}

interface Connection {
  from: string;
  to: string;
  style: 'solid' | 'dashed';
}

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
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
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

  const nodes: WorkflowNode[] = [
    {
      id: 'trigger',
      icon: MessageSquare,
      label: 'Input',
      sublabel: 'User Query',
      desktop: { x: 15, y: 30 },
      mobile: { x: 50, y: 10 },
      type: 'primary'
    },
    {
      id: 'agent',
      icon: Bot,
      label: 'AI Agent',
      sublabel: 'Orchestrator',
      desktop: { x: 50, y: 30 },
      mobile: { x: 50, y: 35 },
      type: 'agent'
    },
    {
      id: 'output',
      icon: Sparkles,
      label: 'Output',
      sublabel: 'Response',
      desktop: { x: 85, y: 30 },
      mobile: { x: 50, y: 90 },
      type: 'primary'
    },
    {
      id: 'llm',
      icon: Brain,
      label: 'LLM',
      desktop: { x: 25, y: 70 },
      mobile: { x: 25, y: 60 },
      type: 'service'
    },
    {
      id: 'memory',
      icon: Database,
      label: 'Memory',
      desktop: { x: 42, y: 80 },
      mobile: { x: 75, y: 60 },
      type: 'service'
    },
    {
      id: 'vector',
      icon: Database,
      label: 'Vector Store',
      desktop: { x: 58, y: 80 },
      mobile: { x: 25, y: 75 },
      type: 'service'
    },
    {
      id: 'embeddings',
      icon: Video,
      label: 'Embeddings',
      desktop: { x: 75, y: 70 },
      mobile: { x: 75, y: 75 },
      type: 'service'
    }
  ];

  const connections: Connection[] = [
    { from: 'trigger', to: 'agent', style: 'solid' },
    { from: 'agent', to: 'output', style: 'solid' },
    { from: 'agent', to: 'llm', style: 'dashed' },
    { from: 'agent', to: 'memory', style: 'dashed' },
    { from: 'agent', to: 'vector', style: 'dashed' },
    { from: 'agent', to: 'embeddings', style: 'dashed' }
  ];

  const startAnimation = useCallback(() => {
    stopAnimation();
    resetAnimation();

    const stages = [
      { time: 200, action: () => { setActiveNode('trigger'); setCurrentStageLabel('Receiving input...'); } },
      { time: 1000, action: () => { setCompletedNodes(['trigger']); setActiveConnections(['trigger-agent']); } },
      { time: 1500, action: () => { setCompletedConnections(['trigger-agent']); setActiveNode('agent'); setCurrentStageLabel('Agent processing...'); } },
      { time: 2500, action: () => { setActiveConnections(['agent-llm', 'agent-memory']); setCurrentStageLabel('Accessing LLM and memory...'); } },
      { time: 3000, action: () => { setCompletedConnections(['trigger-agent', 'agent-llm', 'agent-memory']); setActiveNode('llm'); setActiveNode('memory'); } },
      { time: 4000, action: () => { setCompletedNodes(['trigger', 'llm', 'memory']); setActiveNode('agent'); setCurrentStageLabel('Retrieving knowledge...'); } },
      { time: 4800, action: () => { setActiveConnections(['agent-vector', 'agent-embeddings']); } },
      { time: 5300, action: () => { setCompletedConnections(['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings']); setActiveNode('vector'); setActiveNode('embeddings'); } },
      { time: 6300, action: () => { setCompletedNodes(['trigger', 'llm', 'memory', 'vector', 'embeddings']); setActiveNode('agent'); setCurrentStageLabel('Generating response...'); } },
      { time: 7200, action: () => { setActiveConnections(['agent-output']); } },
      { time: 7800, action: () => { setCompletedConnections(['trigger-agent', 'agent-llm', 'agent-memory', 'agent-vector', 'agent-embeddings', 'agent-output']); setActiveNode('output'); } },
      { time: 8800, action: () => { setCompletedNodes(['trigger', 'llm', 'memory', 'vector', 'embeddings', 'agent', 'output']); setCurrentStageLabel('Complete!'); } },
      { time: 9500, action: () => { setCurrentStageLabel(''); setActiveNode(null); } }
    ];

    stages.forEach(({ time, action }) => {
      animationTimers.current.push(setTimeout(action, time));
    });
  }, [stopAnimation, resetAnimation]);

  const startAnimationLoop = useCallback(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const loop = () => {
      if (!isAnimatingRef.current) return;
      startAnimation();
      animationTimers.current.push(setTimeout(loop, 11000));
    };

    loop();
  }, [startAnimation]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimatingRef.current) {
            startAnimationLoop();
          } else if (!entry.isIntersecting && isAnimatingRef.current) {
            stopAnimation();
            resetAnimation();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, [startAnimationLoop, stopAnimation, resetAnimation]);

  const getNodeStatus = (id: string) => {
    if (completedNodes.includes(id)) return 'completed';
    if (activeNode === id) return 'active';
    return 'idle';
  };

  const getConnectionStatus = (fromId: string, toId: string) => {
    const key = `${fromId}-${toId}`;
    if (completedConnections.includes(key)) return 'completed';
    if (activeConnections.includes(key)) return 'active';
    return 'idle';
  };

  const renderConnection = (conn: Connection, index: number) => {
    const fromNode = nodes.find(n => n.id === conn.from);
    const toNode = nodes.find(n => n.id === conn.to);
    if (!fromNode || !toNode) return null;

    const status = getConnectionStatus(conn.from, conn.to);
    const pathId = `path-${conn.from}-${conn.to}`;

    const start = isMobile ? fromNode.mobile : fromNode.desktop;
    const end = isMobile ? toNode.mobile : toNode.desktop;

    const startX = start.x;
    const startY = start.y;
    const endX = end.x;
    const endY = end.y;

    let pathD: string;

    // Improved path logic for cleaner curves
    if (isMobile) {
      // Vertical flow logic
      if (Math.abs(startX - endX) < 5) {
        // Straight vertical line
        pathD = `M ${startX},${startY} L ${endX},${endY}`;
      } else {
        // Curved line for branching
        const midY = (startY + endY) / 2;
        pathD = `M ${startX},${startY} C ${startX},${midY} ${endX},${midY} ${endX},${endY}`;
      }
    } else {
      // Desktop flow logic
      if (Math.abs(startY - endY) < 5) {
        // Horizontal line
        pathD = `M ${startX},${startY} L ${endX},${endY}`;
      } else {
        // Curved line to services
        const controlY = startY + (endY - startY) * 0.6;
        pathD = `M ${startX},${startY} C ${startX},${controlY} ${endX},${controlY} ${endX},${endY}`;
      }
    }

    const strokeColor = status === 'completed' ? '#10b981' : status === 'active' ? '#06b6d4' : '#334155';
    const strokeWidth = status === 'active' ? '0.4' : '0.2';
    const opacity = status === 'idle' ? '0.3' : '1';

    return (
      <g key={index}>
        <path
          id={pathId}
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={conn.style === 'dashed' ? '1,1' : 'none'}
          opacity={opacity}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
        {status === 'active' && (
          <circle r="0.6" fill="#06b6d4" className="filter drop-shadow-[0_0_2px_rgba(6,182,212,0.8)]">
            <animateMotion dur="1.5s" repeatCount="indefinite">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        )}
      </g>
    );
  };

  const renderNode = (node: WorkflowNode) => {
    const status = getNodeStatus(node.id);
    const isAgent = node.type === 'agent';
    const isService = node.type === 'service';
    const pos = isMobile ? node.mobile : node.desktop;

    return (
      <div
        key={node.id}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          zIndex: isAgent ? 20 : 10
        }}
      >
        <div className="flex flex-col items-center gap-2 group">
          <div
            className={`relative flex items-center justify-center transition-all duration-500 backdrop-blur-md
              ${isAgent
                ? 'w-20 h-20 sm:w-24 sm:h-24 rounded-2xl'
                : isService
                  ? 'w-12 h-12 sm:w-14 sm:h-14 rounded-xl'
                  : 'w-16 h-12 sm:w-32 sm:h-14 rounded-lg'
              }
              ${status === 'active'
                ? 'bg-cyan-950/80 border-2 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)] scale-110'
                : status === 'completed'
                  ? 'bg-emerald-950/80 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                  : 'bg-slate-900/60 border border-slate-700/50 hover:border-slate-600'
              }
            `}
          >
            {/* Inner Glow for Agent */}
            {isAgent && status === 'active' && (
              <div className="absolute inset-0 rounded-2xl bg-cyan-400/10 animate-pulse"></div>
            )}

            <div className={`transition-colors duration-300 ${status === 'active' ? 'text-cyan-400' : status === 'completed' ? 'text-emerald-400' : 'text-slate-400'
              }`}>
              <node.icon className={`${isAgent ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-5 h-5 sm:w-6 sm:h-6'}`} strokeWidth={1.5} />
            </div>

            {/* Status Indicator Dot */}
            {status === 'active' && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full border-2 border-slate-900 animate-ping"></div>
            )}
          </div>

          {/* Labels */}
          <div className={`flex flex-col items-center transition-all duration-300 ${status === 'active' ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-80'
            }`}>
            <span className={`text-[10px] sm:text-xs font-bold tracking-wide uppercase ${status === 'active' ? 'text-cyan-300' : status === 'completed' ? 'text-emerald-300' : 'text-slate-400'
              }`}>
              {node.label}
            </span>
            {node.sublabel && !isMobile && (
              <span className="text-[9px] text-slate-500 mt-0.5">{node.sublabel}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={sectionRef} className="w-full max-w-5xl mx-auto mt-8 md:mt-16 relative">

      {/* Main Container */}
      <div className="relative bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/5 shadow-2xl overflow-hidden">

        {/* Header / Status Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-20 pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/50 border border-white/5 backdrop-blur-md">
            <div className={`w-2 h-2 rounded-full ${currentStageLabel ? 'bg-cyan-400 animate-pulse' : 'bg-slate-600'}`}></div>
            <span className="text-xs font-medium text-slate-300">
              {currentStageLabel || 'System Idle'}
            </span>
          </div>
          <div className="hidden sm:flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
        </div>

        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        </div>

        {/* Animation Area */}
        <div className={`relative w-full transition-all duration-500 ${isMobile ? 'h-[550px]' : 'h-[450px]'}`}>
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
              </linearGradient>
            </defs>
            {connections.map((conn, index) => renderConnection(conn, index))}
          </svg>

          {nodes.map(node => renderNode(node))}
        </div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
    </div>
  );
}
