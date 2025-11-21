import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
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
    <header className="sticky top-0 z-50 py-4 transition-all duration-300">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/5"></div>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <nav className="flex justify-between items-center gap-3 md:gap-4" role="navigation" aria-label="Main navigation">
          <a
            href="#"
            className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2"
            aria-label="DashboardX home"
          >

            DashboardX
          </a>

          <ul className="hidden md:flex gap-8 items-center">
            {[
              { label: 'Services', href: '#services' },
              { label: 'Features', href: '#features' },
              { label: 'Solutions', href: '#use-cases' }
            ].map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}

            <li>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300"
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </li>
            <li>
              <a
                href="#demo-form"
                className="group inline-flex items-center gap-2 bg-white text-slate-950 px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-slate-200 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
                aria-label="Request a demo"
              >
                Request Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </li>
          </ul>

          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>


        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-slate-950/95 backdrop-blur-xl border-b border-white/5 animate-fadeInUp">
            <ul className="flex flex-col gap-2">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Features', href: '#features' },
                { label: 'Solutions', href: '#use-cases' }
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="block py-3 px-4 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 pt-2 border-t border-white/5">
                <a
                  href="#demo-form"
                  className="block text-center bg-white text-slate-950 px-4 py-3 rounded-lg font-bold hover:bg-slate-200 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
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
