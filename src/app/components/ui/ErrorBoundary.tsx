import React, { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // Log to monitoring service (e.g., Sentry) in production
    // if (process.env.NODE_ENV === 'production') {
    //   logErrorToService(error, errorInfo);
    // }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--warm)] p-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h2 className="font-[var(--font-display)] text-2xl text-[var(--ink)] mb-2">
              Something went wrong
            </h2>
            
            <p className="text-[var(--ink-soft)] mb-6">
              We're sorry, but something unexpected happened. Your data is safe, but we need to reload the page.
            </p>

            {this.state.error && (
              <div className="bg-[var(--warm)] rounded-lg p-4 mb-6 text-left">
                <p className="text-xs font-mono text-[var(--ink-muted)] break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-[var(--sage)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--sage-deep)] transition-colors"
              >
                Reload Page
              </button>
              
              <button
                onClick={() => this.setState({ hasError: false })}
                className="flex-1 bg-white border border-[var(--border)] text-[var(--ink)] px-6 py-3 rounded-lg font-medium hover:bg-[var(--warm)] transition-colors"
              >
                Try Again
              </button>
            </div>

            <p className="text-xs text-[var(--ink-muted)] mt-6">
              If this persists, please contact support with the error message above.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
