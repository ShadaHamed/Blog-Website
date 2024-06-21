class AuthService {
    constructor() {
        if (AuthService.instance) {
            return AuthService.instance;
        }
        AuthService.instance = this;
    }

    login(user, token) {
        return new Promise((resolve, reject) => {
          try {
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.token = token;
            this.user = user;
            this.isAuthenticated = true;
            resolve();
          } catch (error) {
            reject(error);
          }
        });
      }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.isAuthenticated = false;
    }

    getAuthStatus() {
        return this.isAuthenticated;
    }

    getUser() {
        if (this.user) {
            return this.user;
        }
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    getToken() {
        const token = localStorage.getItem('token');
        return token;
    }

    initialize() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            this.token = token;
            this.user = JSON.parse(user);
            
        }
    }
}

const authServiceInstance = new AuthService();
export default authServiceInstance;
