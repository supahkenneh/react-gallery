import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: ''
    }
  }

  handleUsernameInput = (event) => {
    this.setState({ username: event.target.value })
  }

  handlePasswordInput = (event) => {
    this.setState({ password: event.target.value })
  }

  handleEmailInput = (event) => {
    this.setState({ email: event.target.value })
  }

  render() {
    return (
      <div className="auth-form-container">
        <form>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            onChange={this.handleUsernameInput}
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            onChange={this.handlePasswordInput}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            onChange={this.handleEmailInput}
          />
          <div className="button-container">
            <button className="action-button">Register</button>
            <Link to="/">
              <button className="cancel-button">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;