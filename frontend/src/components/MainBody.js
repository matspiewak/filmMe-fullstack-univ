import React from "react";
import { Route } from "react-router-dom";

import Movies from "../apis/movies";
import MovieDetail from "../apis/movieDetail";
import Home from "../apis/home";
import SignIn from "../apis/signIn";
import SignUp from "../apis/signUp";

class MainBody extends React.Component {
  render() {
    return (
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route exact path="/movies" component={Movies} />
        <Route exact path="/movies/:id" component={MovieDetail} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </div>
    );
  }
}


export default MainBody;
