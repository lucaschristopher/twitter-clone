import React, { Component } from "react";

import twitterLogo from "../assets/twitter.svg";
import "./Login.css";

export default class Login extends Component {
  // State of Component
  state = {
    username: ""
  };

  handleSubmit = event => {
    // Avoids standard form behavior, such as reloading the page
    event.preventDefault();

    const { username } = this.state;
    if (!username.length) return;

    localStorage.setItem("@TwitterClone:username", username);

    // Sends properties to /timeline
    this.props.history.push("/timeline");
    
  };

  // Function in the arrow function model
  // so as not to lose the scope of the class (this)
  handleInputChange = event => {
    this.setState({ username: event.target.value });
  };

  render() {
    return (
      <div className="login-wrapper">
        <img src={twitterLogo} alt="TwitterClone" />
        <form onSubmit={this.handleSubmit}>
          <input
            // One way data binding
            value={this.state.username}
            onChange={this.handleInputChange}
            placeholder="Nome de usuário"
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    );
  }
}
