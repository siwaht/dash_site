import { Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
}

export default function Footer({ onOpenPrivacy }: FooterProps) {
  const currentYear = 2025;

  return (
    <footer className="bg-slate-950 border-t border-white/5 relative overflow-hidden pt-16 pb-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-violet-900/20 rounded-full blur-[100px] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <span className="font-display text-2xl font-bold text-white tracking-tight">DashboardX</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mx-auto md:mx-0">
                Intelligent Automation for Modern Business
              </p>
            </div>

            {/* Services Column */}
            <div className="text-center md:text-left">
              <h4 className="font-bold text-white mb-6">Our Services</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Chat Agents', href: '#chat-agents' },
                  { label: 'AI Avatars', href: '#ai-avatars' },
                  { label: 'AI Generated Videos', href: '#video-ads' },
                  { label: 'Voice Agents', href: '#voice-agents' }
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors relative group flex items-center justify-center md:justify-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="text-center md:text-left">
              <h4 className="font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Get Quote', href: '#' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors relative group flex items-center justify-center md:justify-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button onClick={onOpenPrivacy} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors relative group flex items-center justify-center md:justify-start gap-2 w-full md:w-auto">
                    <span className="w-1 h-1 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Follow Us Column */}
            <div className="text-center md:text-left">
              <h4 className="font-bold text-white mb-6">Follow Us</h4>
              <div className="flex gap-4 justify-center md:justify-start">
                {[
                  { icon: Instagram, href: "https://www.instagram.com/agenticoslabs" },
                  { icon: Linkedin, href: "https://www.linkedin.com/company/agenticoslabs" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    aria-label="Social link"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} DashboardX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
