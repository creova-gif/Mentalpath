import { Progress } from './progress';
import { motion } from 'motion/react';

interface ProgressBarProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  variant?: 'default' | 'success' | 'warning';
}

export function ProgressBar({ 
  value, 
  label, 
  showPercentage = true,
  variant = 'default' 
}: ProgressBarProps) {
  const colors = {
    default: 'bg-[var(--sage)]',
    success: 'bg-green-600',
    warning: 'bg-amber-500'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-medium text-[var(--ink-soft)]">{label}</span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-[var(--ink-muted)]">{value}%</span>
          )}
        </div>
      )}
      
      <div className="w-full h-2 bg-[var(--border)] rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${colors[variant]} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

interface OnboardingProgressProps {
  currentStep: number;
  totalSteps: number;
  stepLabels?: string[];
}

export function OnboardingProgress({ 
  currentStep, 
  totalSteps,
  stepLabels 
}: OnboardingProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-[var(--ink-soft)]">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm text-[var(--ink-muted)]">
          {Math.round(progress)}% complete
        </span>
      </div>

      <div className="flex gap-2 mb-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          
          return (
            <div
              key={step}
              className={`flex-1 h-2 rounded-full transition-colors ${
                isCompleted
                  ? 'bg-[var(--sage)]'
                  : isCurrent
                  ? 'bg-[var(--sage-light)]'
                  : 'bg-[var(--border)]'
              }`}
            />
          );
        })}
      </div>

      {stepLabels && stepLabels[currentStep - 1] && (
        <p className="text-xs text-[var(--ink-muted)] text-center mt-2">
          {stepLabels[currentStep - 1]}
        </p>
      )}
    </div>
  );
}
