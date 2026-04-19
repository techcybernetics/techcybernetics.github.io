import React from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Contact from "../pages/contact/ContactComponent";
import News from "../pages/news/NewsComponent";
import AIMastery from "../pages/aiMastery/AIMastery";
import { settings } from "../portfolio.js";
import Error404 from "../pages/errors/error404/Error";

const Main = (props) => {
  return (
    <BrowserRouter basename="/">
      <Switch>
        <Route
          path="/"
          exact
          render={(routeProps) =>
            settings.isSplash ? (
              <Splash {...routeProps} theme={props.theme} />
            ) : (
              <Home {...routeProps} theme={props.theme} />
            )
          }
        />
        <Route
          path="/home"
          render={(routeProps) => <Home {...routeProps} theme={props.theme} />}
        />
        <Route
          path="/experience"
          exact
          render={(routeProps) => <Experience {...routeProps} theme={props.theme} />}
        />
        <Route
          path="/education"
          render={(routeProps) => <Education {...routeProps} theme={props.theme} />}
        />
        <Route
          path="/contact"
          render={(routeProps) => <Contact {...routeProps} theme={props.theme} />}
        />
        <Route
          path="/news"
          render={(routeProps) => <News {...routeProps} theme={props.theme} />}
        />
        <Route
          path="/ai-mastery"
          render={(routeProps) => <AIMastery {...routeProps} theme={props.theme} />}
        />
        {settings.isSplash && (
          <Route
            path="/splash"
            render={(routeProps) => <Splash {...routeProps} theme={props.theme} />}
          />
        )}
        <Route
          path="*"
          render={(routeProps) => <Error404 {...routeProps} theme={props.theme} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Main;
