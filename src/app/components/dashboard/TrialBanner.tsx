import { AlertCircle, Crown, Clock, X } from 'lucide-react';
import { useTrialStatus } from '../../hooks/useTrialStatus';
import { Link } from 'react-router';
import { useState } from 'react';

export function TrialBanner() {
  const trial = useTrialStatus();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if user has active paid plan
  if (trial.hasActivePlan) return null;

  // Don't show if trial hasn't started
  if (!trial.startDate) return null;

  // Don't show if dismissed
  if (dismissed) return null;

  // Show different messages based on trial status
  if (trial.isExpired) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 text-red-700 hover:text-red-900"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-red-900 mb-1">
              Your 7-Day Free Trial Has Ended
            </h3>
            <p className="text-sm text-red-700 mb-3">
              To continue accessing your client data and all premium features, please upgrade to a paid plan.
            </p>
            <Link
              to="/checkout?plan=solo"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
            >
              <Crown className="w-4 h-4" />
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show warning if less than 2 days remaining
  if (trial.daysRemaining <= 2) {
    return (
      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-r-lg relative">
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 text-amber-700 hover:text-amber-900"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-semibold text-amber-900 mb-1">
              Trial Ending Soon
            </h3>
            <p className="text-sm text-amber-700 mb-3">
              {trial.daysRemaining === 0 
                ? `Only ${trial.hoursRemaining} hours remaining in your free trial!`
                : `Only ${trial.daysRemaining} ${trial.daysRemaining === 1 ? 'day' : 'days'} remaining in your free trial!`
              }
              {' '}Upgrade now to keep your data and continue managing your practice.
            </p>
            <Link
              to="/checkout?plan=solo"
              className="inline-flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
            >
              <Crown className="w-4 h-4" />
              Upgrade Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show info banner for active trial
  return (
    <div className="bg-blue-50 border-l-4 border-[var(--sage-medium)] p-4 mb-6 rounded-r-lg relative">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-4 right-4 text-[var(--sage-deep)] hover:text-[var(--sage-darker)]"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-start gap-3">
        <Crown className="w-5 h-5 text-[var(--sage-medium)] mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--sage-deep)] mb-1">
            Free Trial Active
          </h3>
          <p className="text-sm text-[var(--sage-deep)] opacity-90">
            You have {trial.daysRemaining} {trial.daysRemaining === 1 ? 'day' : 'days'} remaining in your free trial. 
            Enjoying MentalPath?{' '}
            <Link to="/checkout?plan=solo" className="underline font-medium hover:text-[var(--sage-darker)]">
              Upgrade now
            </Link>
            {' '}to unlock unlimited access.
          </p>
        </div>
      </div>
    </div>
  );
}
