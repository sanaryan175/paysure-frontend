export default function DeveloperVision() {
  return (
    <section
      id="vision"
      style={{ background: 'var(--bg-white)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="max-w-3xl mx-auto px-8 py-20">
        <h2
          className="text-3xl font-bold text-center mb-12"
          style={{ letterSpacing: '-0.8px', color: 'var(--text-primary)', fontFamily: 'Syne, sans-serif' }}>
          Developer's Vision
        </h2>

        <div className="space-y-6">
          {[
            `I built PaySure after seeing countless people—friends, family, colleagues—fall into financial traps they could have avoided with just a few minutes of analysis.`,
            `The problem isn't lack of information; it's the lack of clarity. Loan agreements are confusing, scam messages look legitimate, and EMI calculations feel overwhelming. Most people don't have time to become financial experts—they just need a simple answer:`,
            `My mission is simple: give everyone access to instant, clear financial risk analysis. No jargon, no hidden agendas—just transparent insights that help you make better decisions with your money.`,
          ].map((para, i) => (
            <p
              key={i}
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}>
              {i === 1 ? (
                <>
                  {para}{' '}
                  <span
                    className="font-semibold"
                    style={{ color: 'var(--text-primary)' }}>
                    "Is this safe?"
                  </span>
                </>
              ) : para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
