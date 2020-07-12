import React from 'react';
import axios from 'axios';
import './Login.css';

class Login extends React.Component {
  state = {
    credentials: {
      username: '',
      password: '',
    },
  };

  handleChange = (e) => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();
    // make a post request to the login endpoint on the server
    axios
      .post('http://localhost:5000/api/login', this.state.credentials)
      .then((res) => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        // redirect the user to the app's main logged in page
        this.props.history.push('/protected');
      })
      .catch((err) => console.log({ err }));
  };

  render() {
    return (
      <div className="input_con">
        <form className="login_form" onSubmit={this.login}>
          <input
            className="login_input"
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            className="login_input"
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
