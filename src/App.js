import React, { Fragment, useContext } from "react";
import Header from "./components/Header";
import AuthUser from "./components/AuthUser";
import AuthContext from "./store/auth-context";
import { UserProfile } from "./components/UserProfile";
function App() {
  const { isOpen, isLogin } = useContext(AuthContext);

  return (
    <Fragment>
      {isOpen && <AuthUser />}
      <Header />
      {isLogin && <UserProfile />}
    </Fragment>
  );
}

export default App;
