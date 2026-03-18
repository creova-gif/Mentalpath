import { useTrialStatus } from '../../hooks/useTrialStatus';
import { Crown, Clock } from 'lucide-react';
import { Link } from 'react-router';

export function TrialStatusBadge() {
  const trial = useTrialStatus();

  // Don't show if user has active paid plan
  if (trial.hasActivePlan) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[var(--sage-pale)] border border-[var(--sage-light)] rounded-lg">
        <Crown className="w-3.5 h-3.5 text-[var(--sage)]" />
        <span className="text-xs font-medium text-[var(--sage-deep)] capitalize">
          {trial.planType} Plan
        </span>
      </div>
    );
  }

  // Don't show if trial hasn't started
  if (!trial.startDate) {
    return null;
  }

  // Show warning if expired
  if (trial.isExpired) {
    return (
      <Link
        to="/checkout?plan=solo"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
      >
        <Clock className="w-3.5 h-3.5 text-red-600" />
        <span className="text-xs font-medium text-red-600">
          Trial Expired
        </span>
      </Link>
    );
  }

  // Show warning if less than 3 days remaining
  if (trial.daysRemaining <= 2) {
    return (
      <Link
        to="/checkout?plan=solo"
        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
      >
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        <span className="text-xs font-medium text-amber-600">
          {trial.daysRemaining === 0 
            ? `${trial.hoursRemaining}h left`
            : `${trial.daysRemaining}d left`
          }
        </span>
      </Link>
    );
  }

  // Show normal trial badge
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg">
      <Clock className="w-3.5 h-3.5 text-blue-600" />
      <span className="text-xs font-medium text-blue-600">
        Trial: {trial.daysRemaining}d left
      </span>
    </div>
  );
}
