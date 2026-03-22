const steps = ['Financial Details', 'Loan Details', 'Upload Document'];

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden pb-1 mb-8 sm:mb-10 -mx-1 px-1 sm:mx-0 sm:px-0 sm:overflow-visible touch-pan-x">
      <div className="flex items-start justify-center gap-0 min-w-[min(100%,320px)] sm:min-w-0 mx-auto">
      {steps.map((label, idx) => {
        const step     = idx + 1;
        const done     = step < currentStep;
        const active   = step === currentStep;

        return (
          <div key={label} className="flex items-center">
            {/* Circle */}
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                style={{
                  background: done || active
                    ? 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))'
                    : '#fff',
                  border: done || active ? 'none' : '1.5px solid var(--border-mid)',
                  color:  done || active ? '#fff' : 'var(--text-muted)',
                }}>
                {done
                  ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                  : step}
              </div>
              <span
                className="text-[10px] sm:text-xs font-medium mt-1.5 text-center max-w-[5.5rem] sm:max-w-none sm:whitespace-nowrap leading-tight"
                style={{ color: active ? 'var(--gold-deep)' : 'var(--text-muted)' }}>
                {label}
              </span>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div
                className="w-8 sm:w-16 h-px mx-1 sm:mx-2 mb-5 sm:mb-5 shrink-0 self-center transition-all"
                style={{ background: done ? 'var(--gold-mid)' : 'var(--border-light)' }}
              />
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}
