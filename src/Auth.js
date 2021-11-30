
const authChecking = {
  isLoggued: false,
  checkLogin: () => {
    authChecking.isLoggued = true;
  },
  logout: () => {
    authChecking.isLoggued = false;
  }
};

export default { authChecking }
