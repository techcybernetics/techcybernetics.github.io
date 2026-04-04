import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import "./EducationComponent.css";
import { degrees } from "../../portfolio";

class Education extends Component {
  render() {
    return (
      <div className="education-page">
        <Header theme={this.props.theme} />
        <main className="education-main">
          <div className="education-main__header">
            <h1 className="education-main__title">Education</h1>
            <p className="education-main__sub">Academic background and qualifications</p>
          </div>

          <div className="degrees-grid">
            {degrees.degrees.map((degree, i) => (
              <div key={i} className="degree-card">
                <div className="degree-card__logo-wrap">
                  <img
                    src={require(`../../assests/images/${degree.logo_path}`)}
                    alt={degree.alt_name}
                    className="degree-card__logo"
                  />
                </div>
                <div className="degree-card__body">
                  <span className="degree-card__duration">
                    <i className="fas fa-calendar-alt" />
                    {degree.duration}
                  </span>
                  <h3 className="degree-card__school">{degree.title}</h3>
                  <p className="degree-card__degree">{degree.subtitle}</p>
                  <ul className="degree-card__bullets">
                    {degree.descriptions.map((desc, j) => (
                      <li key={j}>{desc.replace(/^⚡\s*/, "")}</li>
                    ))}
                  </ul>
                  {degree.website_link && (
                    <a
                      href={degree.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="degree-card__link"
                    >
                      Visit Website
                      <i className="fas fa-arrow-right" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Education;
