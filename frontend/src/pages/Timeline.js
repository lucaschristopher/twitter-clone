import React, { Component } from "react";
import api from "../services/api";
import socket from "socket.io-client";

import twitterLogo from "../assets/twitter.svg";
import "./Timeline.css";

import Tweet from "../components/Tweet";

const ENTER_KEY = 13;

export default class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: ""
  };

  // Called immediately after a component is mounted
  // Setting state here will trigger re-rendering
  async componentDidMount() {
    this.subscribeToEvents();

    const response = await api.get("/tweets");
    this.setState({ tweets: response.data });
  }

  handleInputChange = event => {
    this.setState({ newTweet: event.target.value });
  };

  handleNewTweet = async event => {
    // if the Enter key was pressed...
    if (event.keyCode !== ENTER_KEY) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem("@TwitterClone:username");

    await api.post("/tweets", { content, author });

    // After save Tweet
    this.setState({ newTweet: "" });
  };

  // Real time
  subscribeToEvents = () => {
    const io = socket("http://localhost:3030");

    io.on("tweet", data => {
      this.setState({ tweets: [data, ...this.state.tweets] });
    });

    io.on("like", data => {
      this.setState({
        tweets: this.state.tweets.map(tweet =>
          tweet._id === data._id ? data : tweet
        )
      });
    });
  };

  render() {
    return (
      <div className="timeline-wrapper">
        <img height={24} src={twitterLogo} alt="TwitterClone" />
        <form>
          <textarea
            value={this.state.newTweet}
            onChange={this.handleInputChange}
            onKeyDown={this.handleNewTweet}
            placeholder="O que está acontecendo?"
          />
        </form>

        <ul className="tweet-list">
          {this.state.tweets.map(tweet => (
            // Sending tweet for Tweet via props
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}
