import React, { Fragment, useContext } from "react";
import cssClasses from "./styles/LoginButton.module.css";
import AuthContext from "../store/auth-context";
export default function LoginButton(props) {
  const { showHanlder, isLogin, logoutHandler } = useContext(AuthContext);
  return (
    <Fragment>
      {!isLogin && (
        <button className={cssClasses.button} onClick={showHanlder}>
          <span>Login</span>
        </button>
      )}
      {isLogin && (
        <button className={cssClasses.button} onClick={logoutHandler}>
          <span>Logout</span>
        </button>
      )}
    </Fragment>
  );
}
