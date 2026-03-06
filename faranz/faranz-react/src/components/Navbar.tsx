import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'About' },
  { to: '/projects', label: 'Work' },
  { to: '/research', label: 'Research' },
  { to: '/experience', label: 'Experience' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <NavLink to="/" className="nav-title" onClick={() => setMenuOpen(false)}>
          faran zafar
        </NavLink>

        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <i className={`fa-solid ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
