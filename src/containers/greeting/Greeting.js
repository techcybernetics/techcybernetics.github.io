import React from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { greeting } from "../../portfolio";

export default function Greeting() {
  return (
    <section className="greeting">
      <div className="greeting__inner">
        <div className="greeting__badge">
          <span className="greeting__badge-dot" />
          Open to select opportunities
        </div>

        <h1 className="greeting__name">{greeting.title}</h1>

        <h2 className="greeting__role">
          Senior Engineering Manager <span className="greeting__role-sep">·</span> VP @ JP Morgan Chase
        </h2>

        <p className="greeting__subtitle">{greeting.subTitle}</p>

        <div className="greeting__actions">
          <a
            className="greeting__btn greeting__btn--primary"
            href={greeting.resumeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fas fa-file-alt" />
            View Resume
          </a>
          <a className="greeting__btn greeting__btn--secondary" href="/contact">
            <i className="fas fa-paper-plane" />
            Get in touch
          </a>
        </div>

        <SocialMedia />
      </div>
    </section>
  );
}
