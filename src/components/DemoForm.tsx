import { FormEvent, useState } from 'react';
import { CheckCircle, AlertCircle, Sparkles, ChevronDown, X, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function DemoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const sectionRef = useScrollReveal({ threshold: 0.1, staggerDelay: 100 });

  const serviceOptions = [
    { value: 'chat-agents', label: 'Chat AI Agents' },
    { value: 'voice-agents', label: 'Voice Calling AI Agents' },
    { value: 'ai-avatars', label: 'AI Avatars' },
    { value: 'rag-retrieval', label: 'RAG Data Retrieval' },
    { value: 'custom-agents', label: 'Custom AI Agents' },
    { value: 'video-ads', label: 'AI Generated Video Ads' },
  ];

  const toggleService = (value: string) => {
    setSelectedServices(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const removeService = (value: string) => {
    setSelectedServices(prev => prev.filter(item => item !== value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      company: formData.get('company') as string,
      job_title: formData.get('job_title') as string,
      service_interest: selectedServices.join(', '),
    };

    try {
      if (!supabase) {
        throw new Error('Database connection not available');
      }

      const { error } = await supabase
        .from('consultation_requests')
        .insert([data]);

      if (error) throw error;

      setSubmitStatus('success');
      e.currentTarget.reset();
      setSelectedServices([]);
    } catch (error) {
      console.error('Error submitting demo request:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={sectionRef} id="demo-form" aria-labelledby="demo-form-heading" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-light-primary dark:bg-dark-primary transition-colors relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto bg-light-primary/95 dark:bg-dark-primary/95 p-4 sm:p-6 md:p-10 lg:p-16 rounded-2xl sm:rounded-3xl border border-brand-slate-200/30 dark:border-brand-slate-700/30 shadow-elevation-3 relative overflow-hidden">

          <div className="relative z-10">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 sm:gap-3 bg-light-secondary/90 dark:bg-dark-secondary/90 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-brand-indigo/30 mb-6 sm:mb-8 shadow-elevation-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brand-indigo" aria-hidden="true" />
                <span className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-indigo">
                  Start Your AI Transformation
                </span>
              </div>

              <h2 id="demo-form-heading" className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 text-gradient tracking-tight px-2">
                Get Your Free Consultation
              </h2>
              <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl mx-auto font-medium px-2 sm:px-4">
                Discover how AI agents can transform your business operations. Schedule a personalized consultation with our team to explore voice agents, chat bots, AI avatars, and workflow automation tailored to your needs.
              </p>
            </div>

            {submitStatus === 'success' && (
              <div className="scroll-reveal mb-6 md:mb-8 p-5 sm:p-6 md:p-8 bg-green-50 dark:bg-green-900/30 border-2 border-green-300 dark:border-green-700 rounded-2xl flex items-start gap-3 sm:gap-4 shadow-elevation-2 animate-fadeInScale" role="alert" aria-live="polite">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                    Consultation Request Received!
                  </h3>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Thank you for your interest. Our AI solutions team will contact you within 24 hours to discuss your needs and schedule a personalized consultation.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="scroll-reveal mb-6 md:mb-8 p-5 sm:p-6 md:p-8 bg-red-50 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-2xl flex items-start gap-3 sm:gap-4 shadow-elevation-2 animate-fadeInScale" role="alert" aria-live="assertive">
                <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                    Submission Failed
                  </h3>
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {errorMessage || 'Please try again or contact us directly.'}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
              <div className="scroll-reveal flex flex-col group">
                <label
                  htmlFor="name"
                  className="text-xs sm:text-sm font-bold text-text-light-secondary dark:text-text-dark-secondary mb-2 sm:mb-3 group-focus-within:text-gradient transition-all duration-300"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-light-primary/95 dark:bg-dark-primary/95 border-2 border-brand-slate-200/30 dark:border-brand-slate-700/30 text-text-light-primary dark:text-text-dark-primary px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl text-base font-medium focus:outline-none focus:border-brand-indigo focus:ring-2 focus:ring-brand-indigo/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-elevation-1 min-h-[48px] hover:border-brand-indigo/50"
                  placeholder="John Doe"
                  aria-required="true"
                />
              </div>

              <div className="scroll-reveal flex flex-col group" style={{ animationDelay: '0.1s' }}>
                <label
                  htmlFor="email"
                  className="text-xs sm:text-sm font-bold text-text-light-secondary dark:text-text-dark-secondary mb-2 sm:mb-3 group-focus-within:text-gradient transition-all duration-300"
                >
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-light-primary/95 dark:bg-dark-primary/95 border-2 border-brand-slate-200/30 dark:border-brand-slate-700/30 text-text-light-primary dark:text-text-dark-primary px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl text-base font-medium focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-elevation-1 min-h-[48px] hover:border-brand-purple/50"
                  placeholder="john@company.com"
                  aria-required="true"
                />
              </div>

              <div className="scroll-reveal flex flex-col group" style={{ animationDelay: '0.2s' }}>
                <label
                  htmlFor="company"
                  className="text-sm font-bold text-text-light-secondary dark:text-text-dark-secondary mb-3 group-focus-within:text-gradient transition-all duration-300"
                >
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-light-primary/95 dark:bg-dark-primary/95 border-2 border-brand-slate-200/30 dark:border-brand-slate-700/30 text-text-light-primary dark:text-text-dark-primary px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl text-base font-medium focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-elevation-1 min-h-[48px] hover:border-brand-purple/50"
                  placeholder="Acme Inc."
                  aria-required="true"
                />
              </div>

              <div className="scroll-reveal flex flex-col group" style={{ animationDelay: '0.3s' }}>
                <label
                  htmlFor="job-title"
                  className="text-sm font-bold text-text-light-secondary dark:text-text-dark-secondary mb-3 group-focus-within:text-gradient transition-all duration-300"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  id="job-title"
                  name="job_title"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-light-primary/95 dark:bg-dark-primary/95 border-2 border-brand-slate-200/30 dark:border-brand-slate-700/30 text-text-light-primary dark:text-text-dark-primary px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl text-base font-medium focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-elevation-1 min-h-[48px] hover:border-brand-purple/50"
                  placeholder="Product Manager"
                  aria-required="true"
                />
              </div>

              <div className="scroll-reveal md:col-span-2 relative" style={{ animationDelay: '0.4s' }}>
                <label
                  className="text-sm font-bold text-text-light-secondary dark:text-text-dark-secondary mb-3 block"
                >
                  Service Interest <span className="text-xs font-normal opacity-70">(Select all that apply)</span>
                </label>
                
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsServiceDropdownOpen(!isServiceDropdownOpen)}
                    disabled={isSubmitting}
                    className={`w-full bg-light-primary/95 dark:bg-dark-primary/95 border-2 ${isServiceDropdownOpen ? 'border-brand-purple ring-2 ring-brand-purple/40' : 'border-brand-slate-200/30 dark:border-brand-slate-700/30'} text-text-light-primary dark:text-text-dark-primary px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl text-base font-medium focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-elevation-1 mb-5 md:mb-6 min-h-[48px] hover:border-brand-purple/50 flex items-center justify-between text-left`}
                    aria-haspopup="listbox"
                    aria-expanded={isServiceDropdownOpen}
                  >
                    <span className={selectedServices.length === 0 ? 'text-text-light-secondary/70 dark:text-text-dark-secondary/70' : ''}>
                      {selectedServices.length === 0 
                        ? 'Select services...' 
                        : `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected`}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isServiceDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-light-primary dark:bg-dark-primary border-2 border-brand-slate-200/30 dark:border-brand-slate-700/30 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
                      <ul className="p-2" role="listbox" aria-multiselectable="true">
                        {serviceOptions.map((option) => {
                          const isSelected = selectedServices.includes(option.value);
                          return (
                            <li 
                              key={option.value}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => toggleService(option.value)}
                              className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                                isSelected 
                                  ? 'bg-brand-purple/10 text-brand-purple dark:text-brand-purple-light' 
                                  : 'hover:bg-light-secondary dark:hover:bg-dark-secondary text-text-light-primary dark:text-text-dark-primary'
                              }`}
                            >
                              <span className="font-medium">{option.label}</span>
                              {isSelected && <Check className="w-5 h-5" />}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Selected chips */}
                {selectedServices.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4 -mt-2">
                    {selectedServices.map(value => {
                      const option = serviceOptions.find(o => o.value === value);
                      return (
                        <span 
                          key={value}
                          className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-brand-purple/10 text-brand-purple dark:text-brand-purple-light border border-brand-purple/20 animate-in fade-in zoom-in-95"
                        >
                          {option?.label}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); removeService(value); }}
                            className="hover:bg-brand-purple/20 rounded-full p-0.5 transition-colors"
                            aria-label={`Remove ${option?.label}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      );
                    })}
                  </div>
                )}
                
                {/* Hidden input for validation if needed, though we handle submission manually */}
                <input 
                  type="text" 
                  name="service_interest" 
                  value={selectedServices.join(',')} 
                  required={selectedServices.length === 0}
                  className="sr-only" 
                  onChange={() => {}}
                  tabIndex={-1}
                />
              </div>

              <div className="scroll-reveal md:col-span-2" style={{ animationDelay: '0.5s' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-ripple w-full bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-4 sm:py-5 rounded-xl font-bold text-lg sm:text-xl hover:-translate-y-2 hover:scale-105 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100 shadow-2xl shadow-purple-500/40 hover:shadow-purple-500/60 relative overflow-hidden group border-2 border-white/30 shimmer-effect"
                >
                  <span className="relative z-10">
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Request Consultation'
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
