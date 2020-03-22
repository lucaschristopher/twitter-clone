import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Timeline from "./pages/Timeline";

// Stateful Component
class App extends Component {
  // Mandatory method => return the HTML content 
  render() {
    return (
      <BrowserRouter>
        {/* Ensures that only one route is called each
         time the user is at a different address */}
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/timeline" component={Timeline}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
