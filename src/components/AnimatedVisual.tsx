import { BarChart3, PieChart, Users, TrendingUp, Target, ArrowUpRight } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function AnimatedVisual() {
  const [typedText, setTypedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const fullText = 'Generate Q4 marketing performance report...';
  const isAnimatingRef = useRef(false);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(timer => clearTimeout(timer));
    timersRef.current = [];
  }, []);

  const startAnimation = useCallback(() => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    setTypedText('');
    // setShowResults(false); // Keep results visible during typing loop

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        const showTimer = setTimeout(() => {
          setShowResults(true);
          setAnimationKey(prev => prev + 1);
        }, 500);
        timersRef.current.push(showTimer);
      }
    }, 50);

    const resetTimer = setTimeout(() => {
      isAnimatingRef.current = false;
      startAnimation();
    }, 8000); // Extended duration to let users read the dashboard

    timersRef.current.push(resetTimer);

    return () => {
      clearInterval(typingInterval);
      clearAllTimers();
    };
  }, [fullText, clearAllTimers]);

  useEffect(() => {
    startAnimation();

    return () => {
      clearAllTimers();
      isAnimatingRef.current = false;
    };
  }, [startAnimation, clearAllTimers]);

  return (
    <div className="w-full max-w-5xl mx-auto mt-6 sm:mt-8 md:mt-12 bg-gradient-to-br from-slate-950 to-indigo-950 border border-indigo-900/50 rounded-xl sm:rounded-2xl relative shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
      <div className="w-[95%] sm:w-[93%] mx-auto relative z-10 py-3 sm:py-4 md:py-6">
        {/* Input Bar */}
        <div className="bg-slate-900/80 backdrop-blur-md text-slate-100 px-3 sm:px-6 py-3 sm:py-4 rounded-xl text-left border border-indigo-500/30 shadow-lg font-mono text-xs sm:text-sm flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
          </div>
          <div className="flex-1 flex items-center ml-2">
            <span className="text-indigo-400 mr-2">➜</span>
            <span className="text-slate-300">{typedText}</span>
            <span className="inline-block w-2 h-4 bg-indigo-400 ml-1 animate-pulse"></span>
          </div>
        </div>

        {showResults && (
          <div key={animationKey} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-4 sm:mt-6 pb-4">

            {/* Card 1: Campaign ROI */}
            <div
              className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 rounded-xl p-4 flex flex-col animate-fade-in-up sm:col-span-2 md:col-span-2 h-[180px]"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-indigo-500/20">
                    <BarChart3 className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">Campaign ROI</span>
                </div>
                <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">+24.5%</span>
              </div>
              <div className="flex-1 flex items-end justify-between gap-2 px-2">
                {[45, 70, 55, 85, 65, 95, 75].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end group">
                    <div className="w-full bg-gradient-to-t from-indigo-600 to-violet-500 rounded-t-sm transition-all duration-300 group-hover:opacity-100 opacity-80 origin-bottom"
                      style={{
                        height: `${height}%`,
                        transform: 'scaleY(0)',
                        animation: `grow-bar 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.2 + i * 0.1}s forwards`
                      }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Total Leads */}
            <div
              className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 rounded-xl p-4 flex flex-col animate-fade-in-up h-[180px]"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-violet-500/20">
                  <Users className="w-4 h-4 text-violet-400" />
                </div>
                <span className="text-sm font-semibold text-slate-200">Total Leads</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-3xl font-bold text-white mb-1">2,845</div>
                <div className="flex items-center gap-1 text-xs text-emerald-400 mb-4">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>12% vs last month</span>
                </div>
                <div className="w-full bg-slate-700/50 h-1.5 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full w-[75%] origin-left" style={{ animation: 'slide-right 1s ease-out 0.5s both' }}></div>
                </div>
              </div>
            </div>

            {/* Card 3: Conversion Rate */}
            <div
              className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 rounded-xl p-4 flex flex-col animate-fade-in-up h-[180px]"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-pink-500/20">
                  <Target className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-sm font-semibold text-slate-200">Conversion</span>
              </div>
              <div className="flex-1 flex flex-col justify-center items-center relative">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-pink-500" strokeDasharray="251.2" strokeDashoffset="60" style={{ animation: 'dash 1s ease-out 0.5s forwards' }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-xl font-bold text-white">4.2%</span>
                </div>
              </div>
            </div>

            {/* Card 4: Lead Sources (Pie) */}
            <div
              className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 rounded-xl p-4 flex flex-col animate-fade-in-up sm:col-span-2 md:col-span-1 h-[180px]"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="p-1.5 rounded-lg bg-blue-500/20">
                  <PieChart className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-sm font-semibold text-slate-200">Sources</span>
              </div>
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative w-24 h-24 rounded-full" style={{
                  background: 'conic-gradient(from 0deg, #3b82f6 0deg 144deg, #8b5cf6 144deg 252deg, #ec4899 252deg 360deg)',
                  animation: 'spin-in 1s ease-out 0.4s both'
                }}>
                  <div className="absolute inset-3 bg-slate-900 rounded-full flex items-center justify-center">
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 flex flex-col gap-1 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>Organic</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-violet-500"></div>Social</div>
                  <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-pink-500"></div>Paid</div>
                </div>
              </div>
            </div>

            {/* Card 5: Engagement Trend */}
            <div
              className="bg-slate-900/60 backdrop-blur-md border border-indigo-500/20 rounded-xl p-4 flex flex-col animate-fade-in-up sm:col-span-2 md:col-span-3 h-[180px]"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">Engagement Trend</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs text-slate-400">Last 30 Days</span>
                </div>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent opacity-50"></div>
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path
                    d="M0,45 C10,40 20,35 30,20 S50,10 60,25 S80,15 100,5 L100,50 L0,50 Z"
                    fill="url(#trendGradient)"
                    opacity="0.2"
                    className="animate-pulse"
                  />
                  <path
                    d="M0,45 C10,40 20,35 30,20 S50,10 60,25 S80,15 100,5"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 200,
                      strokeDashoffset: 200,
                      animation: 'draw-line 2s ease-out 0.5s forwards'
                    }}
                  />
                  <defs>
                    <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes grow-bar {
          from { transform: scaleY(0); opacity: 0; }
          to { transform: scaleY(1); opacity: 1; }
        }
        @keyframes spin-in {
          from { transform: rotate(-90deg); opacity: 0; }
          to { transform: rotate(0deg); opacity: 1; }
        }
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes dash {
          to { stroke-dashoffset: 60; }
        }
        @keyframes slide-right {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
