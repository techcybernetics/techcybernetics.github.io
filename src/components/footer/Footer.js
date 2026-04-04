import React from "react";
import "./Footer.css";
import { greeting, socialMediaLinks } from "../../portfolio.js";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">
          &copy; {new Date().getFullYear()} {greeting.title}. Built with React.
        </p>
        <div className="footer__links">
          {socialMediaLinks.map((media, i) => (
            <a
              key={i}
              href={media.link}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link"
              aria-label={media.name}
            >
              <i className={`fab ${media.fontAwesomeIcon}`} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
