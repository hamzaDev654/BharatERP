import React, { useRef } from "react";
import Input from "../UI/Input";
import cssClasses from "./styles/Form.module.css";

const OtpForm = (props) => {
  const mobileInputRef = useRef("");
  const fromRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredMobile = mobileInputRef.current.value;

    props.onEnterMobile(enteredMobile);

    fromRef.current.reset();
  };
  return (
    <form className={cssClasses.form} onSubmit={submitHandler} ref={fromRef}>
      <div className={cssClasses.content}>
        <h2>Welcome</h2>
        <p>Enter your Mobile Number to start Shopping</p>
      </div>
      <Input
        label="Mobile Number"
        ref={mobileInputRef}
        input={{
          id: "mobile",
          type: "number",
          name: "mobile",
        }}
      />
      <button type="submit">
        {props.loading ? "Sending..." : "Send OTP"}
      </button>
    </form>
  );
};

export default OtpForm;
