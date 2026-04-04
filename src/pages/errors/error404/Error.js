import React, { Component } from "react";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import TopButton from "../../../components/topButton/TopButton";
import "./Error.css";
import { Link } from "react-router-dom";

export default class Error extends Component {
  render() {
    return (
      <div className="error-main">
        <Header theme={this.props.theme} />
        <div className="error-class">
          <h1>Oops!</h1>
          <h1 className="error-404">404</h1>
          <p>The page you're looking for doesn't exist.</p>
          <Link className="btn" to="/home">
            Go Home
          </Link>
        </div>
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}
