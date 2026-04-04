import React from "react";
import "./Button.css";

export default function Button({ text, href, newTab }) {
  return (
    <a
      className="btn"
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
    >
      {text}
    </a>
  );
}
