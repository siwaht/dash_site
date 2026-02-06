/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0B0F1A',
          secondary: '#141925',
          tertiary: '#1F2433',
          accent: '#2A3142',
        },
        light: {
          primary: '#FFFFFF',
          secondary: '#F9FAFB',
          tertiary: '#F3F4F6',
          accent: '#E5E7EB',
        },
        brand: {
          indigo: {
            light: '#818CF8',
            DEFAULT: '#6366F1',
            dark: '#4F46E5',
            darker: '#4338CA',
          },
          violet: {
            light: '#A78BFA',
            DEFAULT: '#8B5CF6',
            dark: '#7C3AED',
            darker: '#6D28D9',
          },
          purple: {
            light: '#C084FC',
            DEFAULT: '#A855F7',
            dark: '#9333EA',
            darker: '#7E22CE',
          },
          pink: {
            light: '#F472B6',
            DEFAULT: '#EC4899',
            dark: '#DB2777',
            darker: '#BE185D',
          },
          rose: {
            light: '#FB7185',
            DEFAULT: '#F43F5E',
            dark: '#E11D48',
            darker: '#BE123C',
          },
          blue: {
            light: '#60A5FA',
            DEFAULT: '#3B82F6',
            dark: '#2563EB',
            darker: '#1D4ED8',
          },
          cyan: {
            light: '#22D3EE',
            DEFAULT: '#06B6D4',
            dark: '#0891B2',
            darker: '#0E7490',
          },
          teal: {
            light: '#2DD4BF',
            DEFAULT: '#14B8A6',
            dark: '#0D9488',
            darker: '#0F766E',
          },
          emerald: {
            light: '#34D399',
            DEFAULT: '#10B981',
            dark: '#059669',
            darker: '#047857',
          },
          amber: {
            light: '#FCD34D',
            DEFAULT: '#F59E0B',
            dark: '#D97706',
            darker: '#B45309',
          },
          orange: {
            light: '#FB923C',
            DEFAULT: '#F97316',
            dark: '#EA580C',
            darker: '#C2410C',
          },
          slate: {
            100: '#F1F5F9',
            200: '#E2E8F0',
            300: '#CBD5E1',
            400: '#94A3B8',
            500: '#64748B',
            600: '#475569',
            700: '#334155',
            800: '#1E293B',
          },
        },
        text: {
          dark: {
            primary: '#F8FAFC',
            secondary: '#E2E8F0',
            tertiary: '#CBD5E1',
            muted: '#94A3B8',
          },
          light: {
            primary: '#0F172A',
            secondary: '#334155',
            tertiary: '#475569',
            muted: '#64748B',
          },
        },
        border: {
          dark: {
            DEFAULT: '#334155',
            light: '#475569',
          },
          light: {
            DEFAULT: '#E5E7EB',
            dark: '#D1D5DB',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        // Primary brand gradients
        'gradient-brand': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 25%, #A855F7 50%, #EC4899 75%, #F43F5E 100%)',
        'gradient-brand-alt': 'linear-gradient(135deg, #3B82F6 0%, #6366F1 33%, #8B5CF6 66%, #A855F7 100%)',
        'gradient-purple': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)',
        'gradient-pink': 'linear-gradient(135deg, #EC4899 0%, #F472B6 50%, #FCA5A5 100%)',
        'gradient-blue': 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)',

        // Warm gradients
        'gradient-sunset': 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #FDE68A 100%)',
        'gradient-fire': 'linear-gradient(135deg, #F43F5E 0%, #FB7185 50%, #FBBF24 100%)',
        'gradient-amber': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 50%, #FCD34D 100%)',

        // Cool gradients
        'gradient-ocean': 'linear-gradient(135deg, #0891B2 0%, #06B6D4 50%, #22D3EE 100%)',
        'gradient-emerald': 'linear-gradient(135deg, #059669 0%, #10B981 50%, #34D399 100%)',
        'gradient-sky': 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #14B8A6 100%)',

        // Multi-color vibrant gradients
        'gradient-rainbow': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 20%, #EC4899 40%, #F59E0B 60%, #10B981 80%, #06B6D4 100%)',
        'gradient-aurora': 'linear-gradient(135deg, #6366F1 0%, #A855F7 25%, #EC4899 50%, #F97316 75%, #FBBF24 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 33%, #DB2777 66%, #E11D48 100%)',

        // Utility gradients
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',

        // Mesh backgrounds
        'mesh-gradient': 'radial-gradient(at 0% 0%, #6366F120 0px, transparent 50%), radial-gradient(at 100% 0%, #EC489920 0px, transparent 50%), radial-gradient(at 100% 100%, #8B5CF620 0px, transparent 50%), radial-gradient(at 0% 100%, #3B82F620 0px, transparent 50%)',
        'mesh-gradient-alt': 'radial-gradient(at 20% 30%, #6366F115 0px, transparent 50%), radial-gradient(at 80% 20%, #EC489915 0px, transparent 50%), radial-gradient(at 70% 80%, #A855F715 0px, transparent 50%), radial-gradient(at 30% 70%, #3B82F615 0px, transparent 50%)',
      },
      boxShadow: {
        // Glass effects
        'glass': '0 8px 32px 0 rgba(99, 102, 241, 0.15), 0 4px 16px 0 rgba(139, 92, 246, 0.1)',
        'glass-light': '0 8px 32px 0 rgba(99, 102, 241, 0.08)',
        'glass-purple': '0 8px 32px 0 rgba(139, 92, 246, 0.15), 0 4px 16px 0 rgba(168, 85, 247, 0.1)',

        // Glow effects - Indigo/Purple
        'glow-sm': '0 0 15px rgba(99, 102, 241, 0.4)',
        'glow': '0 0 25px rgba(139, 92, 246, 0.5), 0 0 50px rgba(168, 85, 247, 0.2)',
        'glow-lg': '0 0 40px rgba(139, 92, 246, 0.6), 0 0 80px rgba(168, 85, 247, 0.3)',

        // Color-specific glows
        'glow-indigo': '0 0 30px rgba(99, 102, 241, 0.5), 0 0 60px rgba(129, 140, 248, 0.2)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.5), 0 0 60px rgba(168, 85, 247, 0.2)',
        'glow-pink': '0 0 30px rgba(236, 72, 153, 0.5), 0 0 60px rgba(244, 114, 182, 0.2)',
        'glow-blue': '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(96, 165, 250, 0.2)',
        'glow-emerald': '0 0 30px rgba(16, 185, 129, 0.5), 0 0 60px rgba(52, 211, 153, 0.2)',
        'glow-orange': '0 0 30px rgba(249, 115, 22, 0.5), 0 0 60px rgba(251, 146, 60, 0.2)',

        // Multi-color glows
        'glow-rainbow': '0 0 20px rgba(99, 102, 241, 0.4), 0 0 40px rgba(236, 72, 153, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)',
        'glow-cosmic': '0 0 20px rgba(79, 70, 229, 0.5), 0 0 40px rgba(219, 39, 119, 0.3), 0 0 60px rgba(124, 58, 237, 0.2)',

        // Inner shadows
        'inner-glow': 'inset 0 0 20px rgba(139, 92, 246, 0.15)',
        'inner-glow-sm': 'inset 0 0 10px rgba(99, 102, 241, 0.1)',

        // Elevation system
        'elevation-1': '0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'elevation-2': '0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.1)',
        'elevation-3': '0 8px 20px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(0, 0, 0, 0.12)',
        'elevation-4': '0 16px 40px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.15)',
        'elevation-5': '0 24px 60px rgba(0, 0, 0, 0.12), 0 12px 30px rgba(0, 0, 0, 0.18)',

        // Colored elevations
        'elevation-purple': '0 10px 30px rgba(139, 92, 246, 0.15), 0 5px 15px rgba(168, 85, 247, 0.1)',
        'elevation-pink': '0 10px 30px rgba(236, 72, 153, 0.15), 0 5px 15px rgba(244, 114, 182, 0.1)',
        'elevation-blue': '0 10px 30px rgba(59, 130, 246, 0.15), 0 5px 15px rgba(96, 165, 250, 0.1)',
      },
      backdropBlur: {
        'glass': '10px',
        'xl': '20px',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'fadeInScale': 'fadeInScale 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
