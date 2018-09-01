import GitHubCookieProvider from './GitHubCookieProvider';
import GitHubSavedUserManager from './GitHubSavedUserManager';

export default class GitHubUserProvider {
  gitHubCookieProvider = new GitHubCookieProvider();
  gitHubSavedUserManager = new GitHubSavedUserManager();
  
  getUsers = () => new Promise(async (resolve, reject) => {
    let currentUser = null;
    let savedUsers = [];
    
    try {
      currentUser = await this.gitHubCookieProvider.getCurrentUser();
    } catch(err) {}
    
    try {
      savedUsers = (await this.gitHubSavedUserManager.getSavedUsers()).map(val => ({ ...val, saved: true }));
    } catch(err) {
      console.log(err);
    }
    
    resolve({ currentUser, savedUsers });
  });
  
  saveUser = this.gitHubSavedUserManager.saveUser;
  
  removeSavedUser = this.gitHubSavedUserManager.removeSavedUser;
}
