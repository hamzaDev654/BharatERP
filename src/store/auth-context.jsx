import React from "react";
const AuthContext = React.createContext({
  isOpen: "",
  isLogin: "",
  token: "",
  showHanlder: () => {},
  closedHandler: () => {},
  logoutHandler: () => {},
});

export default AuthContext;
