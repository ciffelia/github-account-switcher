import React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import UserListItem from './UserListItem';
import Divider from 'material-ui/Divider';

const UserList = ({ currentUser, savedUsers }) => {
  let userList = [];
  
  if(currentUser) {
    userList.push(
      <Subheader key="currentuser">Current user</Subheader>,
      <UserListItem key={-1} user={currentUser} />
    );
  }
  
  if(savedUsers.length > 0) {
    if(currentUser) userList.push(<Divider key="divider" />);
    
    const savedUserList = savedUsers.map((user, i) => (
      <UserListItem key={i} user={user} />
    ));
    
    userList.push(
      <Subheader key="saveduser">Saved user</Subheader>,
      ...savedUserList
    );
  }
  
  return (
    <div>
      <List>
        {userList}
      </List>
    </div>
  );
};

export default UserList;
