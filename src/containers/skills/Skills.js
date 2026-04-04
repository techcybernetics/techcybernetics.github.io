import React from "react";
import "./Skills.css";
import { skills } from "../../portfolio";

const iconMap = {
  "simple-icons:html5": { icon: "fab fa-html5", color: "#E34F26" },
  "fa-css3": { icon: "fab fa-css3-alt", color: "#1572B6" },
  "fa-java": { icon: "fab fa-java", color: "#007396" },
  "simple-icons:javascript": { icon: "fab fa-js", color: "#F7DF1E" },
  "simple-icons:react": { icon: "fab fa-react", color: "#61DAFB" },
  "simple-icons:node-dot-js": { icon: "fab fa-node-js", color: "#339933" },
  "simple-icons:npm": { icon: "fab fa-npm", color: "#CB3837" },
  "simple-icons:docker": { icon: "fab fa-docker", color: "#1488C6" },
  "simple-icons:amazonaws": { icon: "fab fa-aws", color: "#FF9900" },
  "simple-icons:microsoftazure": { icon: "fab fa-microsoft", color: "#0089D6" },
  "simple-icons:googlecloud": { icon: "fas fa-cloud", color: "#4285F4" },
  "simple-icons:kubernetes": { icon: "fas fa-dharmachakra", color: "#326CE5" },
  "simple-icons:postgresql": { icon: "fas fa-database", color: "#336791" },
  "simple-icons:mongodb": { icon: "fas fa-leaf", color: "#47A248" },
  "simple-icons:firebase": { icon: "fas fa-fire", color: "#FFCA28" },
  "simple-icons:yarn": { icon: "fas fa-box", color: "#2C8EBB" },
};

const categoryIcons = {
  "Engineering Management": "fas fa-users-cog",
  "Backend Developement": "fas fa-server",
  "Cloud Infra-Architecture": "fas fa-cloud",
};

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <div className="skills__container">
        <div className="skills__header">
          <h2 className="skills__title">Expertise</h2>
          <p className="skills__subtitle">
            Spanning engineering leadership, backend systems, and cloud infrastructure
          </p>
        </div>

        <div className="skills__grid">
          {skills.data.map((skill, i) => (
            <div key={i} className="skill-card">
              <div className="skill-card__icon-wrap">
                <i className={categoryIcons[skill.title] || "fas fa-code"} />
              </div>
              <h3 className="skill-card__title">{skill.title}</h3>
              <ul className="skill-card__bullets">
                {skill.skills.map((s, j) => (
                  <li key={j}>{s.replace(/^⚡\s*/, "")}</li>
                ))}
              </ul>
              {skill.softwareSkills && skill.softwareSkills.length > 0 && (
                <div className="skill-card__tech">
                  {skill.softwareSkills.map((tech, k) => {
                    const mapped = iconMap[tech.fontAwesomeClassname];
                    return (
                      <span key={k} className="skill-card__tech-badge" title={tech.skillName}>
                        {mapped ? (
                          <i className={mapped.icon} style={{ color: mapped.color }} />
                        ) : (
                          <span
                            className="iconify"
                            data-icon={tech.fontAwesomeClassname}
                            style={tech.style}
                          />
                        )}
                        <span>{tech.skillName}</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
