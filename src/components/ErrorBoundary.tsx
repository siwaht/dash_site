import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-light-primary dark:bg-dark-primary flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="max-w-2xl w-full bg-light-secondary/90 dark:bg-dark-secondary/90 backdrop-blur-xl rounded-3xl border-2 border-red-500/30 dark:border-red-400/30 shadow-2xl shadow-red-500/20 p-6 sm:p-8 md:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 shadow-lg border-2 border-white/20">
                <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" aria-hidden="true" />
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4">
                Oops! Something went wrong
              </h1>

              <p className="text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary mb-6 max-w-lg">
                We're sorry for the inconvenience. An unexpected error occurred while loading this page.
              </p>

              {this.state.error && process.env.NODE_ENV === 'development' && (
                <div className="w-full mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-left overflow-auto">
                  <p className="text-sm font-mono text-red-800 dark:text-red-200 break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 text-white px-8 py-4 rounded-full font-bold text-base hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 shadow-lg shadow-indigo-500/30 border-2 border-white/20"
                aria-label="Reload page"
              >
                <RefreshCw className="w-5 h-5" aria-hidden="true" />
                <span>Reload Page</span>
              </button>

              <a
                href="/#demo-form"
                className="mt-4 text-base text-text-light-secondary dark:text-text-dark-secondary hover:text-gradient font-semibold transition-all duration-300"
              >
                Or contact support
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
