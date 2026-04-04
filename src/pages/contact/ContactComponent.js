import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import "./ContactComponent.css";
import { greeting, contactPageData, socialMediaLinks } from "../../portfolio.js";

class Contact extends Component {
  render() {
    const { contactSection } = contactPageData;
    return (
      <div className="contact-page">
        <Header theme={this.props.theme} />
        <main className="contact-main">
          <div className="contact-hero">
            <h1 className="contact-hero__title">Let's Connect</h1>
            <p className="contact-hero__sub">{contactSection.description}</p>
          </div>

          <div className="contact-grid">
            <a href="mailto:mail.tiqbal@gmail.com" className="contact-card contact-card--email">
              <div className="contact-card__icon">
                <i className="fas fa-envelope" />
              </div>
              <div>
                <p className="contact-card__label">Email</p>
                <p className="contact-card__value">mail.tiqbal@gmail.com</p>
              </div>
              <i className="fas fa-arrow-right contact-card__arrow" />
            </a>

            {socialMediaLinks.map((media, i) => (
              <a
                key={i}
                href={media.link}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card"
              >
                <div className="contact-card__icon">
                  <i className={`fab ${media.fontAwesomeIcon}`} />
                </div>
                <div>
                  <p className="contact-card__label">{media.name}</p>
                  <p className="contact-card__value">Connect on {media.name}</p>
                </div>
                <i className="fas fa-arrow-right contact-card__arrow" />
              </a>
            ))}
          </div>

          <div className="contact-cta">
            <p className="contact-cta__text">Prefer a formal introduction?</p>
            <a
              href={greeting.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-cta__btn"
            >
              <i className="fas fa-file-alt" />
              Download Resume
            </a>
          </div>
        </main>
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Contact;
