import AnimatedVisual from './AnimatedVisual';
import { Bot, Clock, TrendingDown, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero() {
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 100 });

  return (
    <section ref={sectionRef} id="hero" aria-label="Hero section" className="py-16 sm:py-20 md:py-28 lg:py-32 xl:py-40 text-center bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-15%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] mix-blend-screen animate-float" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-[5%] right-[-8%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[130px] mix-blend-screen animate-float" style={{ animationDuration: '25s', animationDelay: '3s' }}></div>
        <div className="absolute bottom-[-15%] left-[25%] w-[700px] h-[700px] bg-blue-600/5 rounded-full blur-[160px] mix-blend-screen animate-float" style={{ animationDuration: '22s', animationDelay: '6s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="scroll-reveal inline-flex items-center gap-2.5 bg-white/[0.04] backdrop-blur-xl px-5 py-2.5 rounded-full border border-white/[0.08] mb-10 hover:border-white/15 transition-all duration-500 group cursor-default" aria-label="Comprehensive AI Solutions">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-slate-400 group-hover:text-slate-200 transition-colors tracking-wide">
              Next-Generation AI Agents
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="scroll-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] mb-8 md:mb-10 tracking-tight px-2" style={{ animationDelay: '0.1s' }}>
            <span className="text-white">
              Intelligent Automation
            </span>
            <br />
            <span className="text-gradient relative">
              for Modern Business
            </span>
          </h1>

          {/* Subheading */}
          <p className="scroll-reveal text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 md:mb-16 leading-relaxed px-4 font-light tracking-wide" style={{ animationDelay: '0.2s' }}>
            Transform your operations with autonomous AI agents. From 24/7 customer support to complex data analysis — scalable, secure, and tailored to your enterprise.
          </p>

          {/* CTA Buttons */}
          <div className="scroll-reveal flex flex-col sm:flex-row gap-4 justify-center items-center mb-20 px-4" style={{ animationDelay: '0.3s' }}>
            <a
              href="#demo-form"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white text-slate-950 px-9 py-4 rounded-full font-semibold text-base hover:bg-slate-100 transition-all duration-500 min-w-[180px] shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.25)]"
              aria-label="Get started"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#services"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/[0.04] backdrop-blur-md text-white border border-white/[0.08] px-9 py-4 rounded-full font-semibold text-base hover:bg-white/[0.08] hover:border-white/15 transition-all duration-500 min-w-[180px]"
              aria-label="View services"
            >
              View Services
            </a>
          </div>

          {/* Stats Cards */}
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-20 px-4" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Clock, value: '24/7', label: 'Availability', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/15' },
              { icon: Bot, value: '10x', label: 'Efficiency', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/15' },
              { icon: TrendingDown, value: '70%', label: 'Cost Reduction', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/15' }
            ].map((stat, index) => (
              <div key={index} className="glass-premium p-6 rounded-2xl flex items-center gap-4 hover:-translate-y-1 transition-all duration-500 group">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white tracking-tight">{stat.value}</div>
                  <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <AnimatedVisual />
        </div>
      </div>
    </section>
  );
}
