import React from "react";

import { signInService } from "../services/AuthService";
class Home extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((state) => {
      state[name] = value;
      return state;
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!(email && password)) {
      this.setState({ error: "Fields are required" });
      return;
    }

    signInService
      .signIn(email, password)
      .then((error) => this.setState({ error }));
  };

  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login-wrapper col-4">
        <h2>Sign in</h2>
        <form name="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              name="email"
              placeholder="your email"
              className="form-control"
              onChange={this.handleChange}
              value={email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              className="form-control"
              onChange={this.handleChange}
              value={password}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </div>
          {error && <div className={"alert alert-danger"}>{error}</div>}
        </form>
      </div>
    );
  }
}

export default Home;
