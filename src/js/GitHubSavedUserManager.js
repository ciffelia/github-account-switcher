export default class GitHubSavedUserManager {
  getSavedUsers = () => new Promise((resolve, reject) => {
    chrome.storage.local.get('users', ({ users }) => {
      if(chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if(!Array.isArray(users)) {
        reject('No user saved');
      } else {
        resolve(users);
      }
    });
  });
  
  updateSavedUser = users => new Promise(async (resolve, reject) => {
    chrome.storage.local.set({
      users
    }, () => {
      if(chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve();
      }
    });
  });
  
  saveUser = user => new Promise(async (resolve, reject) => {
    let savedUsers;
    try {
      savedUsers = await this.getSavedUsers();
    } catch(e) {
      savedUsers = [];
    }
    
    for(const [i, savedUser] of savedUsers.entries()) {
      if(savedUser.session === user.session) {
        return reject('User already exists');
      } else if(savedUser.userName === user.userName) {
        let newUserList = savedUsers;
        newUserList[i] = user;
        
        try {
          await this.updateSavedUser(newUserList);
        } catch(err) {
          return reject(err);
        }
        resolve();
      }
    }
    
    try {
      await this.updateSavedUser([...savedUsers, user]);
    } catch(err) {
      return reject(err);
    }
    resolve();
  });
  
  removeSavedUser = user => new Promise(async (resolve, reject) => {
    // TODO
    reject('Not implemented');
  });
}
