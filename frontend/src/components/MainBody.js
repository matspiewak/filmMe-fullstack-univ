import React from "react";
import { Route } from "react-router-dom";

import Movies from "../apis/movies";
import Home from "../apis/home";
import SignIn from "../apis/signIn";

class MainBody extends React.Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/signin" component={SignIn} />
      </div>
    );
  }
}

export default MainBody;
