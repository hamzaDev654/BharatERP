import React, { Fragment, useContext, useState } from "react";
import authImg from "../../src/assets/auth.jpg";
import cssClasses from "./styles/Auth.module.css";

import { Modal } from "../UI/Modal";
import OtpForm from "./OtpForm";
import OTPVerifyForm from "./OTPVerifyForm";
import useHttps from "../hooks/useHttps";
import AuthContext from "../store/auth-context";
const AuthUser = (props) => {
  const { closedHandler } = useContext(AuthContext);
  const [enteredMobile, setEnteredMobile] = useState("");
  const {
    isLoading,
    isSucceed,
    error,
    SendRequest: sendOtpRequest,
  } = useHttps();

  const {
    isLoading: loadingOtp,
    error: ErrorOtp,
    isSucceed: SucceedOtp,
    SendRequest: verifyOtpRequest,
  } = useHttps();

  const sendOtpHandler = async (inputMobile) => {
    setEnteredMobile(inputMobile);
    sendOtpRequest({
      url: "https://storebh.bhaaraterp.com/api/login/",
      method: "POST",
      body: { mobile_number: inputMobile },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const verifyOtpHandler = async (inputOtp) => {
    verifyOtpRequest({
      url: "https://storebh.bhaaraterp.com/api/verify-login-otp/",
      method: "POST",
      body: {
        mobile_otp: inputOtp,
        mobile_number: enteredMobile,
        type: "web",
        registration_token: "",
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  localStorage.setItem("authToken", SucceedOtp.token);

  let otpContent = (
    <section className={cssClasses.container}>
      <div className={cssClasses.image}>
        <img src={authImg} alt="Authentiation User PNG" />
      </div>
      <div>
        {isSucceed.status ? (
          <>
            <OTPVerifyForm
              mobileInput={enteredMobile}
              onEnterOtp={verifyOtpHandler}
              loading={loadingOtp}
              message={isSucceed.message}
            />
            {ErrorOtp && <p>{ErrorOtp}</p>}
            {SucceedOtp.status && <p>{SucceedOtp.message}</p>}
          </>
        ) : (
          <>
            <OtpForm onEnterMobile={sendOtpHandler} loading={isLoading} />
            {error && <p>{error}</p>}
          </>
        )}
      </div>
    </section>
  );

  if (SucceedOtp.status) {
    otpContent = (
      <>
        <p>{SucceedOtp.message}</p>
        <button className={cssClasses.closedButton} onClick={closedHandler}>
          Close
        </button>
      </>
    );
  }

  return (
    <Fragment>
      <Modal>{otpContent}</Modal>
    </Fragment>
  );
};

export default AuthUser;
