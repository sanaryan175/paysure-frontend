const links = {
  Features: ['Loan Risk Analyzer', 'Scam Detector', 'Agreement Analyzer', 'How it Works'],
  Company:  ["Developer's Vision", 'About', 'Contact'],
  Legal:    ['Privacy Policy', 'Terms of Service', 'Support'],
};

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg-darker)', padding: '56px 52px 28px' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, var(--gold-mid), var(--gold-light))' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" />
                </svg>
              </div>
              <span style={{ fontFamily: 'Syne, sans-serif', fontSize: '17px', fontWeight: 800, color: '#e0bb42' }}>PaySure</span>
            </div>
            <p style={{ fontSize: '13.5px', color: '#a09880', lineHeight: '1.75', maxWidth: '200px' }}>
              Know the risk before you commit money.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([heading, items]) => (
            <div key={heading}>
              <p style={{ fontSize: '10px', fontWeight: 700, color: '#e0bb42', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '16px' }}>
                {heading}
              </p>
              <ul style={{ listStyle: 'none' }}>
                {items.map(item => (
                  <li key={item} style={{ marginBottom: '10px' }}>
                    <a href="#"
                      style={{ fontSize: '13.5px', color: '#a09880', textDecoration: 'none', transition: 'color .15s' }}
                      onMouseEnter={e => e.target.style.color = '#e0bb42'}
                      onMouseLeave={e => e.target.style.color = '#a09880'}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #2e2c28', paddingTop: '22px', textAlign: 'center', fontSize: '12.5px', color: '#a09880' }}>
          © 2026 PaySure. All rights reserved. Built to help people make safer financial decisions.
        </div>
      </div>
    </footer>
  );
}
