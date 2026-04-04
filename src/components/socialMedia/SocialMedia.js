import React from "react";
import "./SocialMedia.css";
import { socialMediaLinks } from "../../portfolio";

export default function SocialMedia() {
  return (
    <div className="social-media">
      {socialMediaLinks.map((media, i) => (
        <a
          key={i}
          href={media.link}
          className="social-media__link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={media.name}
          title={media.name}
        >
          <i className={`fab ${media.fontAwesomeIcon}`} />
        </a>
      ))}
    </div>
  );
}
