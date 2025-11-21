import { Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useState, useEffect } from 'react';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 py-3 md:py-4 lg:py-5 bg-light-primary/95 dark:bg-dark-primary/95 backdrop-blur-xl border-b border-brand-slate-light/20 dark:border-brand-slate/20 transition-all duration-300 shadow-elevation-1">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <nav className="flex justify-between items-center gap-3 md:gap-4" role="navigation" aria-label="Main navigation">
          <a
            href="#"
            className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-gradient transition-all hover:scale-105 inline-block duration-500 flex-shrink-0"
            aria-label="DashboardX home"
          >
            DashboardX
          </a>

          <ul className="hidden md:flex gap-4 lg:gap-6 xl:gap-8 items-center flex-wrap justify-end">
            <li>
              <a
                href="#services"
                className="text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brand-teal-mid after:to-brand-emerald-mid after:transition-all after:duration-500 hover:after:w-full"
                aria-label="View services"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#features"
                className="text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brand-teal-mid after:to-brand-emerald-mid after:transition-all after:duration-500 hover:after:w-full"
                aria-label="View features"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#use-cases"
                className="text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-brand-teal-mid after:to-brand-emerald-mid after:transition-all after:duration-500 hover:after:w-full"
                aria-label="View use cases"
              >
                Solutions
              </a>
            </li>
            <li>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-light-secondary/90 dark:bg-dark-secondary/90 hover:scale-105 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-elevation-1 border border-brand-slate-light/20 dark:border-brand-slate/20"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-brand-blue-mid" />
                ) : (
                  <Sun className="w-5 h-5 text-brand-amber-mid" />
                )}
              </button>
            </li>
            <li>
              <a
                href="#demo-form"
                className="btn-ripple inline-block bg-gradient-brand text-white px-6 py-3 rounded-full font-bold hover:-translate-y-1 hover:shadow-glow-lg hover:scale-105 transition-all duration-500 min-h-[44px] flex items-center relative overflow-hidden group shadow-elevation-2 border-2 border-white/20 whitespace-nowrap"
                aria-label="Request a demo"
              >
                <span className="relative z-10">Request Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </a>
            </li>
          </ul>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-light-secondary/90 dark:bg-dark-secondary/90 hover:scale-105 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-elevation-1 border border-brand-slate-light/20 dark:border-brand-slate/20"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-brand-indigo" />
              ) : (
                <Sun className="w-5 h-5 text-brand-amber" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-light-secondary/90 dark:bg-dark-secondary/90 hover:scale-105 transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center shadow-elevation-1 border border-brand-slate-light/20 dark:border-brand-slate/20"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-brand-rose" />
              ) : (
                <Menu className="w-6 h-6 text-brand-teal" />
              )}
            </button>
          </div>
        </nav>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden mt-4 py-4 border-t border-brand-slate-light/20 dark:border-brand-slate/20 animate-fadeInUp bg-light-secondary/30 dark:bg-dark-secondary/30 rounded-b-2xl backdrop-blur-sm">
            <ul className="flex flex-col gap-2" role="menu">
              <li role="none">
                <a
                  href="#services"
                  className="block py-3 px-2 text-base text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 hover:pl-4 min-h-[44px] flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  Services
                </a>
              </li>
              <li role="none">
                <a
                  href="#features"
                  className="block py-3 px-2 text-base text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 hover:pl-4 min-h-[44px] flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  Features
                </a>
              </li>
              <li role="none">
                <a
                  href="#use-cases"
                  className="block py-3 px-2 text-base text-text-light-secondary dark:text-text-dark-secondary font-bold hover:text-gradient transition-all duration-500 hover:pl-4 min-h-[44px] flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  Solutions
                </a>
              </li>
              <li className="mt-3" role="none">
                <a
                  href="#demo-form"
                  className="block text-center bg-gradient-brand text-white px-6 py-3.5 rounded-full font-bold hover:shadow-glow-lg hover:scale-105 transition-all duration-500 min-h-[48px] shadow-elevation-2 border-2 border-white/20 flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                >
                  Request Demo
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
