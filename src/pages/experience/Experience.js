import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import "./Experience.css";
import { experience } from "../../portfolio.js";

class Experience extends Component {
  render() {
    return (
      <div className="experience-page">
        <Header theme={this.props.theme} />
        <main className="experience-main">
          <div className="experience-main__header">
            <h1 className="experience-main__title">Experience</h1>
            <p className="experience-main__desc">{experience.description}</p>
          </div>

          {experience.sections.map((section, si) => (
            <div key={si} className="experience-section__timeline">
              {section.experiences.map((exp, i) => (
                <div key={i} className="exp-card">
                  <div className="exp-card__dot" />
                  <div className="exp-card__body">
                    <div className="exp-card__top">
                      <div className="exp-card__logo-wrap">
                        <img
                          src={require("../../assests/images/se.png")}
                          alt={exp.company}
                          className="exp-card__logo"
                        />
                      </div>
                      <div className="exp-card__meta">
                        <h3 className="exp-card__title">{exp.title}</h3>
                        <a
                          href={exp.company_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="exp-card__company"
                        >
                          {exp.company}
                          <i className="fas fa-external-link-alt" />
                        </a>
                        <div className="exp-card__details">
                          <span>
                            <i className="fas fa-calendar-alt" />
                            {exp.duration}
                          </span>
                          <span>
                            <i className="fas fa-map-marker-alt" />
                            {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="exp-card__desc">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </main>
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Experience;
