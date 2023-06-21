import React, { Fragment } from "react";
import LoginButton from "./LoginButton";
import cssClasses from "./styles/Header.module.css";
export default function Header(props) {
  return (
    <Fragment>
      <header className={cssClasses.header}>
        <LoginButton />
      </header>
    </Fragment>
  );
}
