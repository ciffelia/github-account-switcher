import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import GitHubUserProvider from '../GitHubUserProvider';

const style = {
  avatar: {
    borderRadius: '4px'
  }
};

const UserListItem = ({ user }) => {
  const gitHubUserProvider = new GitHubUserProvider();
  
  const rightIconButton = (
    <IconButton
      onTouchTap={async (e) => {
        try {
          if(user.saved) {
            await gitHubUserProvider.removeSavedUser(user);
          } else {
            await gitHubUserProvider.saveUser(user);
          }
        } catch(err) {
          console.error(err);
        }
      }}
      children={user.saved ? <ContentRemove /> : <ContentAdd />}
    />
  );
  
  return (
      <ListItem
      primaryText={user.userName}
      secondaryText={user.session}
      leftAvatar={<Avatar style={style.avatar} src={'https://avatars.githubusercontent.com/' + user.userName} />}
      rightIconButton={rightIconButton}
    />
  );
};

export default UserListItem;
