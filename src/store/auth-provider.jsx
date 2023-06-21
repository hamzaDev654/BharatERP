import React, { useEffect, useState } from "react";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [isOpen, setOpen] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [authData, setAuthData] = useState({});
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const onShowHandler = () => {
      setOpen(true);
    };
    const onCloseHandler = () => {
      setOpen(false);
    };

    if (token) {
      setLogin(true);
    }

    const onLogoutHandler = () => {
      setLogin(false);
      localStorage.removeItem("authToken");
    };

    setAuthData({
      isOpen,
      isLogin,
      token,
      showHanlder: onShowHandler,
      closedHandler: onCloseHandler,
      logoutHandler: onLogoutHandler,
    });
  }, [isLogin, isOpen, token]);
  //   const authData = {
  //     isOpen,
  //     isLogin,
  //     showHanlder: onShowHandler,
  //     closedHandler: onCloseHandler,
  //     logoutHandler: onLogoutHandler,
  //   };
  return (
    <AuthContext.Provider value={authData}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
