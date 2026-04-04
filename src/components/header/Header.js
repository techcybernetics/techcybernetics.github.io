import React, { useState, useEffect } from "react";
import "./Header.css";
import { NavLink, Link } from "react-router-dom";
import { greeting, settings } from "../../portfolio.js";
import SeoHeader from "../seoHeader/SeoHeader";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const link = settings.isSplash ? "/splash" : "/home";

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/education", label: "Education" },
    { to: "/experience", label: "Experience" },
    { to: "/contact", label: "Contact" },
    { to: "/news", label: "AI News" },
  ];

  return (
    <>
      <SeoHeader />
      <header className={`header${scrolled ? " header--scrolled" : ""}`}>
        <div className="header__inner">
          <NavLink to={link} tag={Link} className="header__logo">
            <span className="header__logo-bracket">&lt;</span>
            <span className="header__logo-name">{greeting.logo_name}</span>
            <span className="header__logo-bracket">/&gt;</span>
          </NavLink>

          <nav className={`header__nav${menuOpen ? " header__nav--open" : ""}`}>
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                tag={Link}
                className="header__nav-link"
                activeClassName="header__nav-link--active"
                onClick={() => setMenuOpen(false)}
              >
                {label === "AI News" ? (
                  <span className="header__nav-link-new">{label} <span className="header__nav-badge">NEW</span></span>
                ) : label}
              </NavLink>
            ))}
          </nav>

          <button
            className={`header__hamburger${menuOpen ? " header__hamburger--open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
