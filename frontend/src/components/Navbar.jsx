import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getSiteSettings, getServices } from "../api.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getSiteSettings().then(setSettings).catch(() => {});
    getServices().then(setServices).catch(() => {});
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="brand">
          <img src="/media/logo.png" alt="Digielves Logo" className="navbar-logo" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
          <span className="brand-name fallback-brand" style={{ display: 'none' }}>{settings?.site_name || "Digielves Tech Solutions"}</span>
        </Link>

        <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((o) => !o)}>
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${open ? "is-open" : ""}`}>
          <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/about-us" onClick={() => setOpen(false)}>About Us</NavLink>

          <div
            className="nav-dropdown"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className="nav-dropdown-toggle"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              onClick={() => setServicesOpen((s) => !s)}
            >
              Our Services <span className={`caret ${servicesOpen ? "rotate" : ""}`}>▾</span>
            </button>
            <div className={`nav-dropdown-menu ${servicesOpen ? "show" : ""}`}>
              {services.map((s) => (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  onClick={() => {
                    setOpen(false);
                    setServicesOpen(false);
                  }}
                >
                  {s.title}
                </Link>
              ))}
            </div>
          </div>

          <NavLink to="/projects" onClick={() => setOpen(false)}>Our Works</NavLink>
          <NavLink to="/contact-us" onClick={() => setOpen(false)}>Contact Us</NavLink>
        </nav>
      </div>
    </header>
  );
}
