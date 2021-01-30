import React from "react";
import Validator from "validator";

import { signUpService } from "../services/AuthService";
class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = async (e) => {
    const { name, value } = e.target;
    this.setState((state) => {
      state[name] = value;

      if (this.state.password !== this.state.confirmPassword) {
        this.setState({ error: "Passwords do not match" });
      } else if (!Validator.isLength(this.state.password, { min: 8 })) {
        this.setState({ error: "Password must be at least 8 characters long" });
      } else if (!Validator.isEmail(this.state.email)) {
        this.setState({ error: "Email is not valid" });
      }

      return state;
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;

    if (!(email && password)) {
      this.setState({ error: "Fields are required" });
      return;
    }

    await signUpService
      .signUp(username, email, password)
      .then((error) => this.setState({ error }));
  };

  render() {
    const { username, email, password, confirmPassword, error } = this.state;
    return (
      <div className="login-wrapper md5 col-4">
        <br />
        <h2>Sign in</h2>
        <br />
        <br />
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="form-control"
              onChange={this.handleChange}
              value={username}
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
            <label htmlFor="confirmPpassword">Confirm password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              className="form-control"
              onChange={this.handleChange}
              value={confirmPassword}
            />
          </div>
          <div className="form-group">
            <br />
            <button type="submit" className="btn btn-outline-success">
              Sign up
            </button>
          </div>
          {error && <div className={"alert alert-danger"}>{error}</div>}
        </form>
      </div>
    );
  }
}

export default Home;
