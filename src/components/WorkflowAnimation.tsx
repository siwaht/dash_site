import { Play, Database, Search, FileText, GitBranch, CheckCircle, Sparkles, Zap, Loader2, Activity } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function WorkflowAnimation() {
  const [activeNode, setActiveNode] = useState<number>(-1);
  const [completedNodes, setCompletedNodes] = useState<number[]>([]);
  const [activeEdges, setActiveEdges] = useState<number[]>([]);
  const [completedEdges, setCompletedEdges] = useState<number[]>([]);
  const [processingNodes, setProcessingNodes] = useState<number[]>([]);
  const [nodeProgress, setNodeProgress] = useState<Record<number, number>>({});
  const [currentStageLabel, setCurrentStageLabel] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationTimers = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            setIsAnimating(true);
            startAnimationLoop();
          } else if (!entry.isIntersecting && isAnimating) {
            stopAnimation();
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
  }, [isAnimating]);

  const stopAnimation = () => {
    animationTimers.current.forEach(timer => clearTimeout(timer));
    animationTimers.current = [];
    setIsAnimating(false);
  };

  const startAnimationLoop = () => {
    startAnimation();
    // Loop the animation every 11 seconds
    const loopTimer = setTimeout(() => {
      resetAnimation();
      startAnimationLoop();
    }, 11000);
    animationTimers.current.push(loopTimer);
  };

  const resetAnimation = () => {
    setActiveNode(-1);
    setCompletedNodes([]);
    setActiveEdges([]);
    setCompletedEdges([]);
    setProcessingNodes([]);
    setCurrentStageLabel('');
  };

  const startAnimation = () => {
    animationTimers.current = [];

    // Start node
    animationTimers.current.push(setTimeout(() => {
      setActiveNode(0);
      setCurrentStageLabel('Receiving user query...');
      setProcessingNodes([0]);
    }, 300));

    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0]);
      setProcessingNodes([]);
      setActiveEdges([0]);
    }, 1200));

    // Router node
    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0]);
      setActiveNode(1);
      setCurrentStageLabel('Analyzing query and routing...');
      setProcessingNodes([1]);
    }, 1800));

    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1]);
      setProcessingNodes([]);
      setActiveEdges([1, 2]);
      setCurrentStageLabel('Dispatching to specialized agents...');
    }, 2700));

    // Parallel agent processing
    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0, 1, 2]);
      setActiveNode(2);
      setProcessingNodes([2, 3]);
      setCurrentStageLabel('Agents working in parallel...');
      setTimeout(() => setActiveNode(3), 100);
    }, 3300));

    // Validator receives data from both agents
    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1, 2, 3]);
      setProcessingNodes([]);
      setActiveEdges([3, 4]);
    }, 4500));

    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0, 1, 2, 3, 4]);
      setActiveNode(4);
      setCurrentStageLabel('Cross-checking and validating data...');
      setProcessingNodes([4]);
    }, 5100));

    // Synthesizer
    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1, 2, 3, 4]);
      setProcessingNodes([]);
      setActiveEdges([5]);
    }, 6200));

    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0, 1, 2, 3, 4, 5]);
      setActiveNode(5);
      setCurrentStageLabel('Synthesizing final response...');
      setProcessingNodes([5]);
    }, 6800));

    // Output
    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1, 2, 3, 4, 5]);
      setProcessingNodes([]);
      setActiveEdges([6]);
    }, 7900));

    animationTimers.current.push(setTimeout(() => {
      setCompletedEdges([0, 1, 2, 3, 4, 5, 6]);
      setActiveNode(6);
      setCurrentStageLabel('Delivering result!');
      setProcessingNodes([6]);
    }, 8500));

    animationTimers.current.push(setTimeout(() => {
      setCompletedNodes([0, 1, 2, 3, 4, 5, 6]);
      setProcessingNodes([]);
      setActiveNode(-1);
      setCurrentStageLabel('');
    }, 9600));
  };

  const workflowNodes = [
    {
      icon: Play,
      label: 'Start',
      sublabel: 'User Query',
      x: 8,
      y: 50
    },
    {
      icon: GitBranch,
      label: 'Router',
      sublabel: 'Analyze & Route',
      x: 23,
      y: 50
    },
    {
      icon: Database,
      label: 'SQL Agent',
      sublabel: 'Query DB',
      x: 40,
      y: 20
    },
    {
      icon: FileText,
      label: 'Doc Agent',
      sublabel: 'Search Docs',
      x: 40,
      y: 80
    },
    {
      icon: Search,
      label: 'Validator',
      sublabel: 'Cross-Check',
      x: 57,
      y: 50
    },
    {
      icon: Sparkles,
      label: 'Synthesizer',
      sublabel: 'Generate Result',
      x: 74,
      y: 50
    },
    {
      icon: CheckCircle,
      label: 'Output',
      sublabel: 'Return Answer',
      x: 91,
      y: 50
    }
  ];

  const edges = [
    { from: 0, to: 1, fromY: 50, toY: 50 },
    { from: 1, to: 2, fromY: 50, toY: 20 },
    { from: 1, to: 3, fromY: 50, toY: 80 },
    { from: 2, to: 4, fromY: 20, toY: 50 },
    { from: 3, to: 4, fromY: 80, toY: 50 },
    { from: 4, to: 5, fromY: 50, toY: 50 },
    { from: 5, to: 6, fromY: 50, toY: 50 }
  ];

  const getNodeStatus = (index: number) => {
    if (completedNodes.includes(index)) return 'completed';
    if (activeNode === index) return 'active';
    if (processingNodes.includes(index)) return 'processing';
    return 'idle';
  };

  const getEdgeStatus = (index: number) => {
    if (completedEdges.includes(index)) return 'completed';
    if (activeEdges.includes(index)) return 'active';
    return 'idle';
  };

  return (
    <div ref={sectionRef} className="w-full max-w-7xl mx-auto mt-8 md:mt-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-700/50 rounded-xl sm:rounded-2xl shadow-elevation-2 overflow-hidden">
      {currentStageLabel && (
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 md:pt-6">
          <div className="flex items-center justify-center gap-2 text-cyan-400 animate-pulse">
            <Activity className="w-4 h-4" />
            <span className="text-xs sm:text-sm font-medium">{currentStageLabel}</span>
          </div>
        </div>
      )}
      <div className="overflow-x-auto overflow-y-hidden">
        <div className="relative w-full min-w-[800px] h-[380px] sm:h-[420px] md:h-[460px] p-6 sm:p-8">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            animation: 'grid-flow 20s linear infinite'
          }}></div>
        </div>
        <div className="relative w-full h-full">

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#14b8a6" stopOpacity="1" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                <animate attributeName="x1" values="0%;100%;0%" dur="2s" repeatCount="indefinite" />
                <animate attributeName="x2" values="100%;200%;100%" dur="2s" repeatCount="indefinite" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            {edges.map((edge, index) => {
              const fromNode = workflowNodes[edge.from];
              const toNode = workflowNodes[edge.to];
              const status = getEdgeStatus(index);

              const fromX = fromNode.x + 4.5;
              const fromY = edge.fromY;
              const toX = toNode.x - 4.5;
              const toY = edge.toY;

              const isCurved = Math.abs(fromY - toY) > 10;

              let pathD;
              if (isCurved) {
                const dx = toX - fromX;
                const controlDist = Math.abs(dx) * 0.6;

                pathD = `M ${fromX},${fromY} C ${fromX + controlDist},${fromY} ${toX - controlDist},${toY} ${toX},${toY}`;
              } else {
                pathD = `M ${fromX},${fromY} L ${toX},${toY}`;
              }

              const pathId = `edge-${index}`;
              const strokeColor = status === 'completed' ? '#10b981' : status === 'active' ? '#14b8a6' : '#475569';
              const strokeWidth = status === 'active' ? '0.9' : status === 'completed' ? '0.7' : '0.4';

              return (
                <g key={index}>
                  {/* Background glow for active edges */}
                  {status === 'active' && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="2"
                      opacity="0.3"
                      strokeLinecap="round"
                      filter="url(#glow)"
                    />
                  )}
                  {/* Main edge path */}
                  <path
                    id={pathId}
                    d={pathD}
                    fill="none"
                    stroke={status === 'active' ? 'url(#activeGradient)' : strokeColor}
                    strokeWidth={strokeWidth}
                    opacity={status === 'idle' ? '0.4' : '1'}
                    strokeLinecap="round"
                    className={status === 'active' ? 'animate-pulse-subtle' : ''}
                  />
                  {/* Multiple data packets for active edges */}
                  {status === 'active' && (
                    <>
                      <circle r="0.8" fill="#06b6d4" opacity="0.8">
                        <animateMotion dur="1.5s" repeatCount="indefinite">
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                      <circle r="0.6" fill="#14b8a6" opacity="0.9">
                        <animateMotion dur="1.5s" begin="0.5s" repeatCount="indefinite">
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                      <circle r="0.7" fill="#22d3ee" opacity="0.7">
                        <animateMotion dur="1.5s" begin="1s" repeatCount="indefinite">
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                    </>
                  )}
                  {/* Single particle for completed edges */}
                  {status === 'completed' && (
                    <circle r="0.5" fill="#10b981" opacity="0.6">
                      <animateMotion dur="3s" repeatCount="indefinite">
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {workflowNodes.map((node, index) => {
            const status = getNodeStatus(index);
            const isVisible = true; // Always show all nodes in n8n style

            return (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  zIndex: 10
                }}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`relative bg-slate-800 rounded-lg transition-all duration-500 flex flex-col items-center justify-center min-w-[80px] sm:min-w-[90px] md:min-w-[100px] ${
                      status === 'active'
                        ? 'border-2 border-cyan-400 shadow-lg shadow-cyan-400/50 scale-110'
                        : status === 'processing'
                        ? 'border-2 border-cyan-400 shadow-lg shadow-cyan-400/50'
                        : status === 'completed'
                        ? 'border-2 border-emerald-500 shadow-lg shadow-emerald-500/30'
                        : 'border-2 border-slate-600'
                    }`}
                    style={{
                      padding: '8px 10px',
                    }}
                  >
                    {/* Particle effects around active nodes */}
                    {status === 'active' && (
                      <>
                        <div className="absolute -top-2 -left-2 w-1 h-1 bg-cyan-400 rounded-full animate-float-particle"></div>
                        <div className="absolute -top-1 -right-2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-particle" style={{ animationDelay: '0.3s' }}></div>
                        <div className="absolute -bottom-2 -left-1 w-1 h-1 bg-teal-400 rounded-full animate-float-particle" style={{ animationDelay: '0.6s' }}></div>
                        <div className="absolute -bottom-1 -right-1 w-1 h-1 bg-cyan-300 rounded-full animate-float-particle" style={{ animationDelay: '0.9s' }}></div>
                      </>
                    )}

                    <div className={`mb-1.5 transition-all duration-300 ${
                      status === 'active' || status === 'processing' ? 'text-cyan-400 animate-pulse' : status === 'completed' ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {status === 'processing' ? (
                        <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" strokeWidth={2.5} />
                      ) : (
                        <node.icon className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
                      )}
                    </div>

                    <div className={`text-[11px] sm:text-xs font-bold mb-1 text-center leading-tight ${
                      status === 'active' || status === 'processing' ? 'text-cyan-300' : status === 'completed' ? 'text-emerald-300' : 'text-slate-400'
                    }`}>
                      {node.label}
                    </div>

                    <div className="text-[9px] sm:text-[10px] text-slate-500 whitespace-nowrap text-center leading-tight">
                      {node.sublabel}
                    </div>

                    {(status === 'active' || status === 'processing') && (
                      <>
                        <div className="absolute inset-0 rounded-lg border-2 border-cyan-400 animate-ping opacity-75"></div>
                        <div className="absolute -inset-1 rounded-lg border border-cyan-400/30 animate-pulse"></div>
                        <div className="absolute -top-1.5 -right-1.5 flex items-center gap-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[8px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg animate-pulse">
                          <Zap className="w-2.5 h-2.5" />
                        </div>
                      </>
                    )}

                    {status === 'completed' && (
                      <>
                        <div className="absolute -top-1.5 -right-1.5 bg-emerald-500 rounded-full p-0.5 shadow-lg animate-bounce-once">
                          <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" strokeWidth={3} />
                        </div>
                        <div className="absolute inset-0 rounded-lg border border-emerald-400/20"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </div>

      <style>{`
        @keyframes grid-flow {
          0% { transform: translate(0, 0); }
          100% { transform: translate(20px, 20px); }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          50% {
            transform: translate(var(--float-x, 10px), var(--float-y, -10px)) scale(1.5);
            opacity: 1;
          }
        }

        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(0.9); }
          75% { transform: scale(1.1); }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        .animate-float-particle {
          animation: float-particle 2s ease-in-out infinite;
        }

        .animate-bounce-once {
          animation: bounce-once 0.6s ease-out;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        .edge-active {
          filter: drop-shadow(0 0 8px rgba(20, 184, 166, 0.9));
        }

        .edge-completed {
          filter: drop-shadow(0 0 4px rgba(16, 185, 129, 0.6));
        }

        .flow-particle {
          filter: drop-shadow(0 0 8px rgba(6, 182, 212, 1));
        }
      `}</style>
    </div>
  );
}
