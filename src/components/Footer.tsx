import { Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-light-secondary to-light-primary dark:from-dark-secondary dark:to-dark-primary border-t-2 border-brand-slate-light/30 dark:border-brand-slate/30 transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh-gradient-alt pointer-events-none opacity-20" aria-hidden="true" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-brand-teal-mid/10 to-brand-emerald-mid/8 rounded-full blur-3xl" style={{ animation: 'pulse-glow 15s ease-in-out infinite' }} aria-hidden="true" />
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 relative z-10">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-gradient hover:scale-110 transition-all duration-500 cursor-pointer">
              DashboardX
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 md:gap-8">
              <div className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8 text-sm md:text-base">
                <a href="#services" className="text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 hover:scale-110 min-h-[44px] flex items-center">
                  Services
                </a>
                <a href="#features" className="text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 hover:scale-110 min-h-[44px] flex items-center">
                  Features
                </a>
                <a href="#ag-ui" className="text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 hover:scale-110 min-h-[44px] flex items-center">
                  RAG Data Retrieval
                </a>
                <a href="#demo-form" className="text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 hover:scale-110 min-h-[44px] flex items-center">
                  Contact
                </a>
              </div>

              <div className="flex gap-2.5 sm:gap-3">
                <a
                  href="https://www.linkedin.com/company/agenticoslabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl bg-gradient-to-br from-light-primary/90 to-light-secondary/90 dark:from-dark-tertiary/90 dark:to-dark-secondary/90 backdrop-blur-md border-2 border-brand-slate-light/30 dark:border-brand-slate/30 flex items-center justify-center hover:border-brand-teal-mid hover:scale-110 hover:bg-gradient-to-br hover:from-brand-teal-mid/20 hover:to-brand-emerald-mid/20 transition-all duration-500 group shadow-elevation-1 hover:shadow-glow-emerald hover:rotate-6"
                  aria-label="Visit DashboardX on LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-brand-blue-mid group-hover:text-brand-teal-mid group-hover:scale-110 transition-all duration-500" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/agenticoslabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl bg-gradient-to-br from-light-primary/90 to-light-secondary/90 dark:from-dark-tertiary/90 dark:to-dark-secondary/90 backdrop-blur-md border-2 border-brand-slate-light/30 dark:border-brand-slate/30 flex items-center justify-center hover:border-brand-teal-mid hover:scale-110 hover:bg-gradient-to-br hover:from-brand-teal-mid/20 hover:to-brand-emerald-mid/20 transition-all duration-500 group shadow-elevation-1 hover:shadow-glow-emerald hover:rotate-6"
                  aria-label="Visit DashboardX on Instagram"
                >
                  <Instagram className="w-5 h-5 text-brand-teal-mid group-hover:text-brand-emerald-mid group-hover:scale-110 transition-all duration-500" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-7 md:pt-8 border-t-2 border-brand-slate-light/30 dark:border-brand-slate/30 flex flex-col md:flex-row justify-between items-center gap-5 sm:gap-6">
            <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm md:text-base text-center md:text-left font-medium">
              &copy; {currentYear} DashboardX. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8 text-sm md:text-base">
              <button
                onClick={onOpenPrivacy}
                className="text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 hover:scale-110 min-h-[44px] flex items-center"
              >
                Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
