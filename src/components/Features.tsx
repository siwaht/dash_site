import { Globe, Brain, Plug, Lock, BarChart3, Sparkles, Clock, MessageCircle } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Features() {
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 100 });

  const primaryFeatures = [
    {
      icon: MessageCircle,
      title: 'Natural Conversations',
      description: 'Advanced NLP enables human-like dialogue with context awareness, sentiment analysis, and multi-turn conversations.',
      gradient: 'from-brand-indigo via-brand-violet to-brand-indigo',
      glowColor: 'indigo',
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Communicate with customers in 100+ languages with real-time translation and cultural adaptation.',
      gradient: 'from-brand-rose via-brand-orange to-brand-rose',
      glowColor: 'rose',
    },
    {
      icon: Plug,
      title: 'Seamless Integration',
      description: 'Connect with your CRM, helpdesk, calendar, and business tools. Deploy in hours, not months.',
      gradient: 'from-brand-blue via-brand-cyan to-brand-teal',
      glowColor: 'blue',
    },
  ];

  const additionalFeatures = [
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'SOC 2 compliant with end-to-end encryption.',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Never miss a customer interaction again.',
    },
    {
      icon: Brain,
      title: 'Continuous Learning',
      description: 'AI improves from every interaction.',
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Track performance and optimize operations.',
    },
    {
      icon: Sparkles,
      title: 'Custom Personalities',
      description: 'Align agents with your brand voice.',
    },
  ];

  return (
    <section ref={sectionRef} id="features" aria-labelledby="features-heading" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-light-secondary dark:bg-dark-secondary border-t border-b border-border-light dark:border-border-dark transition-colors relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16 px-3 sm:px-4">
          <h2 id="features-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-text-light-primary dark:text-text-dark-primary tracking-tight">
            Powerful Capabilities
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade AI agents with advanced features designed for real-world business needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-12 md:mb-14 lg:mb-16 max-w-7xl mx-auto px-3 sm:px-4">
          {primaryFeatures.map((feature, index) => (
            <div
              key={index}
              className="scroll-reveal elegant-card relative bg-gradient-to-br from-light-primary/95 via-light-secondary/50 to-light-primary/95 dark:from-dark-primary/95 dark:via-dark-secondary/50 dark:to-dark-primary/95 p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl sm:rounded-3xl border-2 border-indigo-500/20 dark:border-violet-500/20 hover:border-indigo-500/50 dark:hover:border-violet-500/50 transition-all duration-500 shadow-xl shadow-indigo-500/10 hover:shadow-2xl hover:shadow-indigo-500/30 flex flex-col h-full group"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 sm:mb-6 md:mb-8 shadow-elevation-3 border-2 border-white/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-500" aria-hidden="true" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 md:mb-5 text-text-light-primary dark:text-text-dark-primary">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-text-light-secondary dark:text-text-dark-secondary leading-relaxed font-medium flex-grow">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8">
            {additionalFeatures.map((feature, index) => (
              <div
                key={index}
                className="scroll-reveal flex items-start gap-4 sm:gap-5 bg-light-primary/95 dark:bg-dark-primary/95 p-5 sm:p-6 md:p-7 lg:p-8 rounded-xl sm:rounded-2xl border-2 border-brand-slate-200/20 dark:border-brand-slate-700/20 hover:border-brand-indigo dark:hover:border-brand-violet hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 shadow-elevation-2 h-full group hover:-translate-y-1"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand-violet via-brand-indigo to-brand-violet flex items-center justify-center flex-shrink-0 shadow-elevation-3 border-2 border-white/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white drop-shadow-lg" aria-hidden="true" />
                </div>
                <div className="flex flex-col flex-grow">
                  <h4 className="text-sm sm:text-base md:text-lg font-bold text-text-light-primary dark:text-text-dark-primary mb-1.5 sm:mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-xs sm:text-sm md:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
