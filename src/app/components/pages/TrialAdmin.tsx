import { useState, useEffect } from 'react';
import { useTrialStatus, resetTrial, getTrialInfo } from '../../hooks/useTrialStatus';
import { RefreshCw, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

export function TrialAdmin() {
  const trial = useTrialStatus();
  const [serverData, setServerData] = useState<any>(null);

  const loadServerData = async () => {
    const data = await getTrialInfo();
    setServerData(data);
  };

  useEffect(() => {
    loadServerData();
  }, []);

  const handleReset = () => {
    if (confirm('Reset trial? This will clear all trial data.')) {
      resetTrial();
    }
  };

  const simulateExpiredTrial = () => {
    // Set trial start to 8 days ago
    const userId = localStorage.getItem('mentalpath_user_id');
    if (userId) {
      alert('To simulate expired trial, you need to manually set the trial start date in the backend. Use the browser console to call the API directly.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-serif font-bold text-[var(--ink)] mb-2">
          Trial System Admin
        </h1>
        <p className="text-sm text-[var(--ink-muted)]">
          Testing and debugging interface for the 7-day trial system
        </p>
      </div>

      {/* Current Status */}
      <div className="bg-white border border-[var(--border)] rounded-lg p-6 mb-4">
        <h2 className="text-lg font-semibold text-[var(--ink)] mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Current Trial Status
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-[var(--ink-muted)] mb-1">Active</div>
            <div className="flex items-center gap-2">
              {trial.isActive ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
              <span className="font-medium">{trial.isActive ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-[var(--ink-muted)] mb-1">Expired</div>
            <div className="flex items-center gap-2">
              {trial.isExpired ? (
                <XCircle className="w-4 h-4 text-red-500" />
              ) : (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              <span className="font-medium">{trial.isExpired ? 'Yes' : 'No'}</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-[var(--ink-muted)] mb-1">Days Remaining</div>
            <div className="font-medium text-lg">{trial.daysRemaining}</div>
          </div>

          <div>
            <div className="text-xs text-[var(--ink-muted)] mb-1">Hours Remaining</div>
            <div className="font-medium text-lg">{trial.hoursRemaining}</div>
          </div>

          <div>
            <div className="text-xs text-[var(--ink-muted)] mb-1">Start Date</div>
            <div className="font-medium text-sm">
              {trial.startDate ? trial.startDate.toLocaleString() : 'Not started'}
            </div>
          </div>

          <div>
            <div className="text-xs text-[var(--ink-muted)] mb-1">End Date</div>
            <div className="font-medium text-sm">
              {trial.endDate ? trial.endDate.toLocaleString() : 'N/A'}
            </div>
          </div>

          <div>
            <div className="text-xs text-[var(--ink-muted)] mb-1">Has Active Plan</div>
            <div className="flex items-center gap-2">
              {trial.hasActivePlan ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <XCircle className="w-4 h-4 text-gray-400" />
              )}
              <span className="font-medium">{trial.hasActivePlan ? 'Yes' : 'No'}</span>
            </div>
          </div>

          {trial.planType && (
            <div>
              <div className="text-xs text-[var(--ink-muted)] mb-1">Plan Type</div>
              <div className="font-medium capitalize">{trial.planType}</div>
            </div>
          )}
        </div>
      </div>

      {/* Server Data */}
      <div className="bg-white border border-[var(--border)] rounded-lg p-6 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--ink)] flex items-center gap-2">
            Server Data
          </h2>
          <button
            onClick={loadServerData}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-[var(--sage-pale)] text-[var(--sage-deep)] rounded-lg hover:bg-[var(--sage-light)] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
        
        {serverData ? (
          <pre className="bg-[var(--warm)] p-4 rounded-lg text-xs overflow-auto max-h-60">
            {JSON.stringify(serverData, null, 2)}
          </pre>
        ) : (
          <div className="text-sm text-[var(--ink-muted)]">Loading...</div>
        )}
      </div>

      {/* Local Storage */}
      <div className="bg-white border border-[var(--border)] rounded-lg p-6 mb-4">
        <h2 className="text-lg font-semibold text-[var(--ink)] mb-4">
          Local Storage
        </h2>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="text-xs text-[var(--ink-muted)] w-40">User ID:</div>
            <div className="text-sm font-mono text-[var(--ink)]">
              {localStorage.getItem('mentalpath_user_id') || 'Not set'}
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="text-xs text-[var(--ink-muted)] w-40">User Email:</div>
            <div className="text-sm font-mono text-[var(--ink)]">
              {localStorage.getItem('user_email') || 'Not set'}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white border border-[var(--border)] rounded-lg p-6">
        <h2 className="text-lg font-semibold text-[var(--ink)] mb-4">
          Testing Actions
        </h2>
        
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Reset Trial
          </button>

          <button
            onClick={simulateExpiredTrial}
            className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-600 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Simulate Expired Trial
          </button>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>
        </div>

        <div className="mt-4 p-4 bg-[var(--warm)] rounded-lg">
          <h3 className="text-sm font-medium text-[var(--ink)] mb-2">Testing Tips</h3>
          <ul className="text-xs text-[var(--ink-muted)] space-y-1">
            <li>• Use "Reset Trial" to clear all data and start fresh</li>
            <li>• Complete onboarding at /signup to start a new trial</li>
            <li>• Check server logs for API calls and responses</li>
            <li>• Trial status updates every 60 seconds automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
