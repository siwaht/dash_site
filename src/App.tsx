import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import UseCases from './components/UseCases';
import DemoForm from './components/DemoForm';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import ErrorBoundary from './components/ErrorBoundary';
import VideoFeatureSection from './components/VideoFeatureSection';
import Admin from './pages/Admin';
import { ThemeProvider } from './contexts/ThemeContext';
import { VideoProvider } from './contexts/VideoContext';
import AGUISection from './components/AGUISection';
import WorkflowSection from './components/WorkflowSection';
import FAQ from './components/FAQ';

import Login from './pages/Login';

function App() {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for admin route
    if (window.location.pathname === '/admin') {
      setIsAdminRoute(true);
      // Check for existing session
      const session = localStorage.getItem('siwaht_admin_session');
      if (session === 'true') {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem('siwaht_admin_session', 'true');
    setIsAuthenticated(true);
  };

  if (isAdminRoute) {
    return (
      <VideoProvider>
        <ThemeProvider>
          {isAuthenticated ? (
            <Admin />
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </ThemeProvider>
      </VideoProvider>
    );
  }

  return (
    <VideoProvider>
      <ThemeProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-slate-950 transition-colors duration-300">
            <Header />
            <main>
              <Hero />

              {/* New Video Sections */}
              <div id="services" className="space-y-0">
                <VideoFeatureSection sectionId="chat-agents" alignment="left" />
                <VideoFeatureSection sectionId="ai-avatars" alignment="right" />
                <VideoFeatureSection sectionId="video-ads" alignment="left" />
                <VideoFeatureSection sectionId="voice-agents" alignment="right" />
              </div>

              <HowItWorks />
              <AGUISection />
              <WorkflowSection />
              <Features />
              <UseCases />
              <FAQ />
              <DemoForm />
            </main>
            <Footer onOpenPrivacy={() => setIsPrivacyOpen(true)} />

            {isPrivacyOpen && (
              <PrivacyPolicy onClose={() => setIsPrivacyOpen(false)} />
            )}
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </VideoProvider>
  );
}

export default App;
