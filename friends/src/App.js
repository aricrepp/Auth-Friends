import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import FriendsList from './components/FriendsList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="login_con">
          <Link
            style={{
              textDecoration: 'none',
              width: '50%',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'whitesmoke',
              border: '1px solid grey',
            }}
            to="/login"
          >
            Login
          </Link>

          <Link
            style={{
              textDecoration: 'none',
              width: '50%',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'whitesmoke',
              border: '1px solid grey',
            }}
            to="/protected"
          >
            Friends List
          </Link>
        </div>
        <Switch>
          <PrivateRoute exact path="/protected" component={FriendsList} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
