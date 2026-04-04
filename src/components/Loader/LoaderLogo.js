import React from 'react';
import './LoaderLogo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faJava, faRProject, faNodeJs, faPython, faBrave } from '@fortawesome/free-brands-svg-icons'; // Import faAtom from FontAwesome

const LogoLoader = ({ theme }) => {
  const keyframesStyle = `
  @keyframes orbit {
    0% {
      transform: rotate(0deg) translateX(100px) rotate(0deg);
    }
    100% {
      transform: rotate(360deg) translateX(100px) rotate(-360deg);
    }
  }
  `;

  const electronStyle = {
    animation: 'orbit 6s linear infinite',
    transformOrigin: 'center',
  };

  const iconSize = '2x'; // You might want to adjust this for the central icon

  return (
    <>
      <style>{keyframesStyle}</style>
      <svg width="800" height="800" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* FontAwesome Atom Icon as Central Motif */}
        <g transform="translate(200 200)">
          <foreignObject x="-15" y="-15" width="30" height="30">
            <FontAwesomeIcon icon={faBrave} size={iconSize} color={theme.body} />
          </foreignObject>
        </g>

        {/* Orbit paths */}
        <circle cx="200" cy="200" r="80" fill="none" stroke={theme.body} strokeWidth="2" />

        {/* FontAwesome icons positioned as electrons */}
        <g style={electronStyle}>
          <foreignObject x="185" y="105" width="30" height="30">
            <FontAwesomeIcon icon={faJava} size={iconSize} color={theme.body} />
          </foreignObject>
        </g>

        <g style={{ ...electronStyle, animationDelay: '1.5s' }}>
          <foreignObject x="185" y="265" width="30" height="30">
            <FontAwesomeIcon icon={faRProject} size={iconSize} color={theme.body} />
          </foreignObject>
        </g>

        <g style={{ ...electronStyle, animationDelay: '3s' }}>
          <foreignObject x="105" y="185" width="30" height="30">
            <FontAwesomeIcon icon={faNodeJs} size={iconSize} color={theme.body} />
          </foreignObject>
        </g>

        <g style={{ ...electronStyle, animationDelay: '4.5s' }}>
          <foreignObject x="265" y="185" width="30" height="30">
            <FontAwesomeIcon icon={faPython} size={iconSize} color={theme.body} />
          </foreignObject>
        </g>
      </svg>
    </>
  );
};

export default LogoLoader;
