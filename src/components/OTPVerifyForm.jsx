import React, { useRef } from "react";
import cssClasses from "./styles/Form.module.css";
import Input from "../UI/Input";

const OTPVerifyForm = (props) => {
  const otpInputRef = useRef("");
  const fromRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredOtp = otpInputRef.current.value;
    props.onEnterOtp(enteredOtp);
    fromRef.current.reset();
  };
  return (
    <form className={cssClasses.form} onSubmit={submitHandler} ref={fromRef}>
      <div className={cssClasses.content}>
        <h2>OTP Verify</h2>
        <p>{`${props.message} ${props.mobileInput}`}</p>
      </div>
      <Input
        label="Enter OTP"
        ref={otpInputRef}
        input={{
          id: "mobile",
          type: "number",
          name: "mobile",
        }}
      />

      <button type="submit">{props.loading? 'Verifying....': 'Verify OTP'}</button>
    </form>
  );
};

export default OTPVerifyForm;
