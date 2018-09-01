import React from 'react';
import GitHubUserProvider from '../GitHubUserProvider';
import Loading from './Loading';
import UserList from './UserList';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { users: null };
    
    this.gitHubUserProvider = new GitHubUserProvider();
    this.gitHubUserProvider.getUsers()
      .then(users => {
        this.setState({ users });
      });
  }
  render() {
    if(!this.state.users) {
      return <Loading />;
    } else {
      return (
        <UserList
          currentUser={this.state.users.currentUser}
          savedUsers={this.state.users.savedUsers}
        />
      );
    }
  }
}

export default App;
