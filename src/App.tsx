import { ThemeProvider } from './contexts/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import AGUISection from './components/AGUISection';
import WorkflowSection from './components/WorkflowSection';
import Features from './components/Features';
import UseCases from './components/UseCases';
import DemoForm from './components/DemoForm';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import { useState } from 'react';

function App() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-light-primary dark:bg-dark-primary text-text-light-primary dark:text-text-dark-primary transition-colors" itemScope itemType="https://schema.org/WebSite">
          <meta itemProp="name" content="DashboardX - AI Agent Platform" />
          <meta itemProp="description" content="Enterprise AI agent platform with voice, chat, avatars, and RAG-powered automation" />
          <meta itemProp="url" content="https://agenticoslabs.com" />

          <Header />
          <main id="main-content" role="main" itemScope itemType="https://schema.org/WebPageElement">
            <Hero />
            <HowItWorks />
            <AGUISection />
            <WorkflowSection />
            <Features />
            <UseCases />
            <DemoForm />
          </main>
          <Footer onOpenPrivacy={() => setShowPrivacyModal(true)} />

          {showPrivacyModal && (
            <PrivacyPolicy onClose={() => setShowPrivacyModal(false)} />
          )}
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
