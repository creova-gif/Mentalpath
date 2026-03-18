import { ReactNode } from 'react';
import { useTrialStatus } from '../../hooks/useTrialStatus';
import { Link } from 'react-router';
import { Crown, Lock, ArrowRight } from 'lucide-react';

interface TrialGateProps {
  children: ReactNode;
  fallbackMessage?: string;
}

export function TrialGate({ children, fallbackMessage }: TrialGateProps) {
  const trial = useTrialStatus();

  // If trial is expired and no active plan, show upgrade screen
  if (trial.isExpired && !trial.hasActivePlan) {
    return (
      <div className="flex items-center justify-center min-h-[500px] p-8">
        <div className="max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-serif font-bold text-[var(--sage-deep)] mb-3">
            Trial Expired
          </h2>
          
          <p className="text-[var(--sage-deep)] opacity-80 mb-6">
            {fallbackMessage || 'Your 7-day free trial has ended. Upgrade to continue accessing your practice management tools and client data.'}
          </p>

          <div className="bg-[var(--sage-lightest)] border border-[var(--sage-light)] rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-[var(--sage-deep)] mb-3">
              Why upgrade to MentalPath?
            </h3>
            <ul className="text-sm text-left space-y-2 text-[var(--sage-deep)] opacity-90">
              <li className="flex items-start gap-2">
                <span className="text-[var(--sage-medium)] mt-1">✓</span>
                <span>Unlimited clients and session notes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--sage-medium)] mt-1">✓</span>
                <span>PHIPA-compliant Canadian data storage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--sage-medium)] mt-1">✓</span>
                <span>AI-powered session note assistance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--sage-medium)] mt-1">✓</span>
                <span>Billing & T2125 tax export for CRA</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--sage-medium)] mt-1">✓</span>
                <span>Priority email & phone support</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/checkout?plan=solo"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-[var(--sage-medium)] text-white px-6 py-3 rounded-lg hover:bg-[var(--sage-deep)] transition-colors font-medium"
            >
              <Crown className="w-5 h-5" />
              Upgrade to Solo - $49 CAD/mo
            </Link>
            <Link
              to="/checkout?plan=group"
              className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-[var(--sage-medium)] text-[var(--sage-deep)] px-6 py-3 rounded-lg hover:bg-[var(--sage-lightest)] transition-colors font-medium"
            >
              Group Plan - $79 CAD/mo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <p className="text-xs text-[var(--sage-deep)] opacity-60 mt-4">
            Questions? <Link to="/contact" className="underline hover:opacity-100">Contact our team</Link>
          </p>
        </div>
      </div>
    );
  }

  // Otherwise, show the protected content
  return <>{children}</>;
}
