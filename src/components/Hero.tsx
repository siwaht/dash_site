import AnimatedVisual from './AnimatedVisual';
import { Bot, Clock, TrendingDown, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Hero() {
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 100 });

  return (
    <section ref={sectionRef} id="hero" aria-label="Hero section" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 text-center bg-slate-950 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDuration: '15s' }}></div>
        <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] bg-violet-600/20 rounded-full blur-[100px] mix-blend-screen animate-float" style={{ animationDuration: '18s', animationDelay: '2s' }}></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[130px] mix-blend-screen animate-float" style={{ animationDuration: '20s', animationDelay: '5s' }}></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="scroll-reveal inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full border border-white/10 mb-8 shadow-lg hover:border-white/20 transition-all duration-300 group cursor-default" aria-label="Comprehensive AI Solutions">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs sm:text-sm font-medium text-slate-300 group-hover:text-white transition-colors">
              Next-Generation AI Agents
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="scroll-reveal text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 md:mb-8 tracking-tight px-2" style={{ animationDelay: '0.1s' }}>
            <span className="text-white drop-shadow-2xl">
              Intelligent Automation
            </span>
            <br />
            <span className="text-gradient relative">
              for Modern Business
              <span className="absolute -inset-1 bg-indigo-500/20 blur-2xl -z-10"></span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="scroll-reveal text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed px-4 font-light" style={{ animationDelay: '0.2s' }}>
            Transform your operations with autonomous AI agents. From 24/7 customer support to complex data analysis—scalable, secure, and tailored to your enterprise.
          </p>

          {/* CTA Buttons */}
          <div className="scroll-reveal flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 px-4" style={{ animationDelay: '0.3s' }}>
            <a
              href="#demo-form"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-4 rounded-full font-semibold text-base hover:bg-slate-200 transition-all duration-300 min-w-[160px] shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              aria-label="Get started"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-full font-semibold text-base hover:bg-white/10 hover:border-white/20 transition-all duration-300 min-w-[160px]"
              aria-label="View services"
            >
              View Services
            </a>
          </div>

          {/* Stats Cards */}
          <div className="scroll-reveal grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-16 px-4" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Clock, value: '24/7', label: 'Availability', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
              { icon: Bot, value: '10x', label: 'Efficiency', color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
              { icon: TrendingDown, value: '70%', label: 'Cost Reduction', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
            ].map((stat, index) => (
              <div key={index} className={`glass-premium p-6 rounded-2xl flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300 group`}>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.border} border`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
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
