import React from "react";
import cssClasses from "../components/styles/Card.module.css";
const Card = (props) => {
  return (
    <div className={`${cssClasses.card} ${props.className | ""}`}>
      {props.children}
    </div>
  );
};

export default Card;
