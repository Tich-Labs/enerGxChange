'use client';

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

const stepLabels = ['Who I Am', 'What I Offer', 'What I Want'];

export default function ProgressBar({ currentStep, totalSteps = 3 }: ProgressBarProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8 px-6">
      <div className="flex items-center justify-between mb-3">
        {stepLabels.map((label, index) => {
          const stepNum = index + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div
              key={label}
              className={`flex flex-col items-center flex-1 ${
                index < stepLabels.length - 1 ? 'relative' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-[DM_Sans] font-medium transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[var(--ember)] text-[var(--cream)]'
                    : isActive
                    ? 'bg-[var(--warm)] text-[var(--sun)] border-2 border-[var(--ember)]'
                    : 'bg-[var(--bark)] text-[var(--sand)] border border-[var(--warm)]'
                }`}
              >
                {isCompleted ? '✓' : stepNum}
              </div>
              <span
                className={`mt-2 text-[0.65rem] uppercase tracking-[0.15em] transition-colors duration-300 ${
                  isActive ? 'text-[var(--sun)]' : 'text-[var(--sand)]'
                }`}
              >
                {label}
              </span>

              {index < stepLabels.length - 1 && (
                <div className="absolute top-4 left-[calc(50%+1rem)] right-[calc(50%+1rem)] h-[2px] -translate-y-1/2">
                  <div className="h-full bg-[var(--warm)] rounded-full" />
                  {isCompleted && (
                    <div
                      className="absolute top-0 left-0 h-full bg-[var(--ember)] rounded-full transition-all duration-500"
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
