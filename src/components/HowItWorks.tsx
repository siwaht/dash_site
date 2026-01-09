import { MessageSquare, Phone, User, Workflow, Settings, Video } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HowItWorks() {
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 150 });

  const services = [
    {
      icon: MessageSquare,
      title: 'Chat Agents',
      description: 'Intelligent conversational bots that handle customer inquiries, support tickets, and lead qualification 24/7, featuring natural language understanding.',
      gradient: 'from-brand-indigo via-brand-blue to-brand-cyan',
      category: 'Agent Core',
    },
    {
      icon: Phone,
      title: 'Voice Calling Agents',
      description: 'AI-powered voice agents that make and receive calls, used for scheduling appointments, conducting surveys, and providing phone support with human-like conversation.',
      gradient: 'from-brand-violet via-brand-indigo to-brand-violet',
      category: 'Agent Core',
    },
    {
      icon: User,
      title: 'AI Avatars',
      description: 'Lifelike digital representatives that provide personalized video interactions, product demonstrations, and virtual assistance with realistic expressions.',
      gradient: 'from-brand-rose via-brand-orange to-brand-rose',
      category: 'Agent Core',
    },
    {
      icon: Settings,
      title: 'Custom AI Agents',
      description: 'Tailor-made AI solutions built from the ground up to handle unique and complex business processes or integrate with proprietary systems. Offers maximum flexibility and functional alignment.',
      gradient: 'from-brand-amber via-brand-orange to-brand-rose',
      category: 'Specialized',
    },
    {
      icon: Workflow,
      title: 'RAG Data Retrieval',
      description: 'Retrieval-Augmented Generation (RAG) technology that connects agents to your knowledge base, enabling accurate responses powered by your actual business data and documents.',
      gradient: 'from-brand-cyan via-brand-teal to-brand-emerald',
      category: 'Data/Tech',
    },
    {
      icon: Video,
      title: 'AI Generated Videos',
      description: 'Professional video content created by AI in hours, not weeks. From marketing videos to explainers, scaled to your needs with rapid turnaround.',
      gradient: 'from-brand-emerald via-brand-teal to-brand-cyan',
      category: 'Marketing',
    },
  ];

  return (
    <section ref={sectionRef} id="services" aria-labelledby="services-heading" itemScope itemType="https://schema.org/Service" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-light-primary via-light-secondary to-light-primary dark:from-dark-secondary dark:via-dark-primary dark:to-dark-secondary transition-colors relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" style={{ animation: 'float-elegant 15s ease-in-out infinite' }}></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" style={{ animation: 'float-elegant 12s ease-in-out infinite 3s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16 px-3 sm:px-4">
          <h2 id="services-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-text-light-primary dark:text-text-dark-primary tracking-tight" itemProp="name">
            Our AI Agent Services
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto leading-relaxed" itemProp="description">
            Comprehensive AI solutions designed to automate, enhance, and transform every aspect of your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 lg:gap-8 max-w-7xl mx-auto px-3 sm:px-4">
          {services.map((service, index) => (
            <div key={index} className="scroll-reveal relative">
              <div className="relative bg-light-secondary/90 dark:bg-dark-primary/90 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl border border-brand-slate-200/30 dark:border-brand-slate-700/30 hover:border-brand-indigo dark:hover:border-brand-violet transition-all duration-300 shadow-elevation-2 hover:shadow-elevation-purple hover:-translate-y-1 h-full flex flex-col">
                <div className="flex items-center justify-center mb-4 sm:mb-5">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-elevation-3 border-4 border-white/30`}>
                    <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" aria-hidden="true" />
                  </div>
                </div>

                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3 text-text-light-primary dark:text-text-dark-primary text-center">
                  {service.title}
                </h3>
                <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed text-center text-xs sm:text-sm md:text-base font-medium flex-grow">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
