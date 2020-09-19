export default class Auth {
  authenticatedUser: object;
  constructor() {
    this.authenticatedUser = {};
  }

  // set token
  setToken(token: string, expiration: string) {
    //localStorage es el almacenamiento local del navegador del cliente (?)
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expiration);
  }
  // get token
  getToken() {
    const token = localStorage.getItem("token");
    const expiration = localStorage.getItem("expiration");

    if (!token || !expiration) return null;

    if (Date.now() > parseInt(expiration)) {
      this.destroyToken();
      return null;
    }
    return token;
  }
  // destroy token
  destroyToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }
  // isAuthenticated

  isAuthenticated() {
    if (this.getToken()) return true;
    return false;
  }

  setAuthenticatedUser(data: any) {
    this.authenticatedUser = data;
  }

  getAuthenticatedUser() {
    return this.authenticatedUser;
  }
}

// Object.defineProperties(Vue.prototype, {
//   $auth: {
//     get() {
//       return Vue.auth;
//     },
//   },
// });
// }
