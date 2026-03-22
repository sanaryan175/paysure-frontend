export default function FormField({ label, hint, error, children }) {
  return (
    <div className="mb-5">
      <label
        className="block text-sm font-semibold mb-1.5"
        style={{ color: 'var(--text-faint)' }}>
        {label}
        {hint && (
          <span className="ml-2 font-normal text-xs" style={{ color: 'var(--text-muted)' }}>
            {hint}
          </span>
        )}
      </label>
      {children}
      {error && (
        <p className="text-xs mt-1.5 font-medium" style={{ color: 'var(--red)' }}>
          {error}
        </p>
      )}
    </div>
  );
}

// Reusable styled input
export function Input({ prefix, ...props }) {
  return (
    <div className="relative flex items-center">
      {prefix && (
        <span
          className="absolute left-3 text-sm font-medium"
          style={{ color: 'var(--text-muted)' }}>
          {prefix}
        </span>
      )}
      <input
        {...props}
        className="w-full h-11 rounded-xl text-sm outline-none transition-all"
        style={{
          paddingLeft:   prefix ? '28px' : '14px',
          paddingRight:  '14px',
          border:        '1.5px solid var(--border-mid)',
          background:    '#fff',
          color:         'var(--text-primary)',
          fontFamily:    'DM Sans, sans-serif',
        }}
        onFocus={e  => e.target.style.borderColor  = 'var(--gold-mid)'}
        onBlur={e   => e.target.style.borderColor  = 'var(--border-mid)'}
      />
    </div>
  );
}

export function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full h-11 rounded-xl text-sm outline-none transition-all px-3"
      style={{
        border:     '1.5px solid var(--border-mid)',
        background: '#fff',
        color:      'var(--text-primary)',
        fontFamily: 'DM Sans, sans-serif',
        cursor:     'pointer',
      }}
      onFocus={e => e.target.style.borderColor = 'var(--gold-mid)'}
      onBlur={e  => e.target.style.borderColor = 'var(--border-mid)'}>
      {children}
    </select>
  );
}
