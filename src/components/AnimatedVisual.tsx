import { BarChart3, PieChart, MapPin, TrendingUp, DollarSign } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';

export default function AnimatedVisual() {
  const [typedText, setTypedText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const fullText = 'Show me sales trends for Project Alpha in Q4...';
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
    setShowResults(false);

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
    }, 6500);

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
    <div className="w-full max-w-5xl mx-auto mt-6 sm:mt-8 md:mt-12 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-xl sm:rounded-2xl relative shadow-elevation-2 overflow-auto">
      <div className="w-[95%] sm:w-[93%] mx-auto relative z-10 py-3 sm:py-4 md:py-6">
        <div className="bg-slate-800/90 backdrop-blur-sm text-slate-100 px-3 sm:px-6 py-2.5 sm:py-4 rounded-xl text-left border border-slate-700 shadow-elevation-2 font-mono text-xs sm:text-sm">
          <span className="text-teal-400">&gt;</span> {typedText}
          <span className="inline-block w-2 h-3.5 sm:h-4 bg-teal-400 ml-1 animate-pulse"></span>
        </div>

        {showResults && (
          <div key={animationKey} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4 mt-3 sm:mt-4 md:mt-6 pb-4">
            <div
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl p-3 md:p-4 flex flex-col animate-fade-in-up h-[140px] sm:h-[160px]"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-300">Q4 Revenue</span>
              </div>
              <div className="flex-1 flex items-end justify-between gap-1">
                {[65, 45, 80, 60, 90, 70].map((height, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t"
                    style={{
                      height: `${height}%`,
                      animation: `grow-bar 0.6s ease-out ${0.1 + i * 0.1}s both`
                    }}
                  ></div>
                ))}
              </div>
            </div>

            <div
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl p-3 md:p-4 flex flex-col animate-fade-in-up h-[140px] sm:h-[160px]"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <PieChart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400" />
                <span className="text-xs font-semibold text-slate-300">Market Share</span>
              </div>
              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full" style={{
                  background: 'conic-gradient(from 0deg, #3b82f6 0deg 126deg, #8b5cf6 126deg 234deg, #ec4899 234deg 306deg, #f59e0b 306deg 360deg)',
                  animation: 'spin-in 1s ease-out 0.3s both'
                }}>
                  <div className="absolute inset-2 bg-slate-800 rounded-full flex items-center justify-center">
                    <span className="text-base sm:text-lg font-bold text-slate-100">35%</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl p-3 md:p-4 flex flex-col animate-fade-in-up sm:col-span-2 md:col-span-1 h-[140px] sm:h-[160px]"
              style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                <span className="text-xs font-semibold text-slate-300">Key Metrics</span>
              </div>
              <div className="space-y-2 sm:space-y-3 flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Revenue</span>
                  <span className="text-sm sm:text-base font-bold text-teal-400">$4.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Growth</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-400">+18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">Margin</span>
                  <span className="text-sm sm:text-base font-bold text-blue-400">24%</span>
                </div>
              </div>
            </div>

            <div
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl p-3 md:p-4 flex flex-col sm:col-span-2 md:col-span-2 animate-fade-in-up h-[160px] sm:h-[180px]"
              style={{ animationDelay: '0.7s', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" />
                <span className="text-xs font-semibold text-slate-300">Geographic Distribution</span>
              </div>
              <div className="flex-1 relative">
                <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-blue-500 via-teal-500 to-emerald-500 rounded-lg"></div>
                <div className="absolute inset-0 p-2">
                  {[
                    { x: 15, y: 30, color: 'bg-rose-500' },
                    { x: 75, y: 15, color: 'bg-blue-500' },
                    { x: 50, y: 60, color: 'bg-teal-500' },
                    { x: 10, y: 45, color: 'bg-amber-500' },
                    { x: 80, y: 70, color: 'bg-emerald-500' }
                  ].map((pin, i) => (
                    <div
                      key={i}
                      className={`absolute ${pin.color} rounded-full shadow-lg`}
                      style={{
                        width: '10px',
                        height: '10px',
                        left: `${pin.x}%`,
                        top: `${pin.y}%`,
                        animation: `pin-drop 0.5s ease-out ${0.7 + i * 0.1}s both`
                      }}
                    >
                      <div className={`absolute inset-0 ${pin.color} rounded-full animate-ping opacity-75`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-xl p-3 md:p-4 flex flex-col animate-fade-in-up h-[140px] sm:h-[160px]"
              style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-300">Trend</span>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <polyline
                    points="0,45 20,40 40,30 60,25 80,15 100,10"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 150,
                      strokeDashoffset: 150,
                      animation: 'draw-line 1.5s ease-out 0.9s forwards'
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
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
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes grow-bar {
          from {
            height: 0%;
          }
        }

        @keyframes spin-in {
          from {
            transform: rotate(0deg);
            opacity: 0;
          }
          to {
            transform: rotate(360deg);
            opacity: 1;
          }
        }

        @keyframes pin-drop {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes draw-line {
          to {
            stroke-dashoffset: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
