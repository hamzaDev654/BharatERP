import React, { Fragment, useContext } from "react";
import ReactDOM from "react-dom";
import cssClasses from "../components/styles/Modal.module.css";
import AuthContext from "../store/auth-context";

const Backdrop = () => {
  const { closedHandler } = useContext(AuthContext);
  return <div className={cssClasses.backdrop} onClick={closedHandler}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={cssClasses.modal}>
      <div className={cssClasses.content}>{props.children}</div>
    </div>
  );
};
export const Modal = (props) => {
  const portalElement = document.getElementById("overlays");
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};
