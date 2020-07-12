import React from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import './FriendsList.css';

class FriendsList extends React.Component {
  state = {
    friendsList: [],
    addFriend: {
      id: Date.now(),
      name: '',
      age: '',
      email: '',
    },
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get('/friends')
      .then((res) => {
        console.log({ res });
        this.setState({
          friendsList: res.data,
        });
      })
      .catch((err) => console.log({ err }));
  };

  formatData = () => {
    const formattedData = [];
    this.state.friendsList.forEach((friends) => {
      formattedData.push({
        name: friends.name,
        age: `${friends.age} years old`,
        email: friends.email,
      });
    });
    return formattedData;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      addFriend: { name: '', age: '', email: '' },
    });
    axiosWithAuth()
      .post('/friends', this.state.addFriend)
      .then((res) => {
        this.setState({
          addFriend: res.data,
        });
        this.props.history.push('/protected');
        this.getData();
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({
      addFriend: {
        ...this.state.addFriend,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const friendsList = this.formatData();
    return (
      <div className="friendsList">
        <div>
          <h1>Friends List!</h1>

          <form className="friends_form" onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input
              className="friends_input"
              type="text"
              name="name"
              value={this.state.addFriend.name}
              onChange={this.handleChange}
            />
            <label>Age</label>
            <input
              className="friends_input"
              type="age"
              name="age"
              value={this.state.addFriend.age}
              onChange={this.handleChange}
            />
            <label>Email</label>
            <input
              className="friends_input"
              type="email"
              name="email"
              value={this.state.addFriend.email}
              onChange={this.handleChange}
            />
            <button>Add Friend</button>
          </form>
        </div>
        {this.props.fetchingData && (
          <div className="key spinner">
            <p>Loading Data</p>
          </div>
        )}
        {friendsList.length > 0 && (
          <div>
            {friendsList.map((friend, key) => (
              <div key={friend.id}>
                <h2>{friend.name}</h2>

                <h4>{friend.email}</h4>

                <h4>{friend.age}</h4>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default FriendsList;
