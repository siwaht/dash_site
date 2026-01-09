import { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import VideoFeatureSection from './components/VideoFeatureSection';
import { ThemeProvider } from './contexts/ThemeContext';
import { VideoProvider } from './contexts/VideoContext';

// Lazy load components for better performance
const Features = lazy(() => import('./components/Features'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const UseCases = lazy(() => import('./components/UseCases'));
const DemoForm = lazy(() => import('./components/DemoForm'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));
const AGUISection = lazy(() => import('./components/AGUISection'));
const WorkflowSection = lazy(() => import('./components/WorkflowSection'));
const FAQ = lazy(() => import('./components/FAQ'));
const Admin = lazy(() => import('./pages/Admin'));
const Login = lazy(() => import('./pages/Login'));

// Loading fallback component
const SectionLoader = () => (
  <div className="py-24 flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Video section IDs for cleaner mapping
const VIDEO_SECTIONS = [
  { id: 'chat-agents', alignment: 'left' as const },
  { id: 'ai-avatars', alignment: 'right' as const },
  { id: 'video-ads', alignment: 'left' as const },
  { id: 'voice-agents', alignment: 'right' as const },
] as const;

function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setIsAdminRoute(true);
      setIsAuthenticated(localStorage.getItem('siwaht_admin_session') === 'true');
    }
  }, []);

  const handleLogin = useCallback(() => {
    localStorage.setItem('siwaht_admin_session', 'true');
    setIsAuthenticated(true);
  }, []);

  const openPrivacy = useCallback(() => setIsPrivacyOpen(true), []);
  const closePrivacy = useCallback(() => setIsPrivacyOpen(false), []);

  useEffect(() => {
    const lenis = new Lenis();
    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <VideoProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <Suspense fallback={<SectionLoader />}>
            {isAdminRoute ? (
              isAuthenticated ? <Admin /> : <Login onLogin={handleLogin} />
            ) : (
              <div className="min-h-screen bg-slate-950 transition-colors duration-300">
                <Header />
                <main>
                  <Hero />

                  <div id="services" className="space-y-0">
                    {VIDEO_SECTIONS.map(({ id, alignment }) => (
                      <VideoFeatureSection key={id} sectionId={id} alignment={alignment} />
                    ))}
                  </div>

                  <Suspense fallback={<SectionLoader />}>
                    <HowItWorks />
                    <AGUISection />
                    <WorkflowSection />
                    <Features />
                    <UseCases />
                    <FAQ />
                    <DemoForm />
                  </Suspense>
                </main>
                <Footer onOpenPrivacy={openPrivacy} />

                {isPrivacyOpen && (
                  <Suspense fallback={null}>
                    <PrivacyPolicy onClose={closePrivacy} />
                  </Suspense>
                )}
              </div>
            )}
          </Suspense>
        </ErrorBoundary>
      </ThemeProvider>
    </VideoProvider>
  );
}

export default App;
