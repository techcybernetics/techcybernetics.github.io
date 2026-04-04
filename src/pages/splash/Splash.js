import React, { useState, useEffect } from "react";
import "./Splash.css";
import { Redirect } from "react-router-dom";
import LoaderLogo from "../../components/Loader/LoaderLogo.js";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="screen" style={{ backgroundColor: props.theme.splashBg }}>
        <LoaderLogo id="logo" theme={props.theme} />
      </div>
    </div>
  );
}

function Splash(props) {
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setRedirect(true), 5500);

    // Cleanup function to clear the timeout when the component unmounts or re-renders
    return () => clearTimeout(id);
  }, []); // The empty dependency array means this effect runs only once after the initial render

  return redirect ? (
    <Redirect to="/home" />
  ) : (
    <AnimatedSplash theme={props.theme} />
  );
}

export default Splash;
