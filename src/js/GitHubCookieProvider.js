export default class GitHubCookieProvider {
  gitHubCookieUrl = 'https://github.com';
  
  get = name => new Promise((resolve, reject) => {
    chrome.cookies.get({
      url: this.gitHubCookieUrl,
      name
    }, cookie => {
      if(cookie) {
        resolve(cookie.value);
      } else {
        reject(`Cookie ${name} not found.`);
      }
    });
  });
  
  set = (name, value) => new Promise((resolve, reject) => {
    chrome.cookies.set({
      url: this.gitHubCookieUrl,
      name, value,
      domain: 'github.com',
      path: '/',
      secure: true,
      httpOnly: true,
      expirationDate: null
    }, cookie => {
      if(!cookie) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(cookie);
      }
    });
  });
  
  getCurrentUser = () => new Promise((resolve, reject) => {
    Promise.all([this.get('dotcom_user'), this.get('user_session')])
      .then(values => {
        resolve({ userName: values[0], session: values[1], saved: false });
      }, err => {
        resolve(err);
      });
  });
}
