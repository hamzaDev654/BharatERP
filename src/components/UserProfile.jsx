import React, { useContext, useEffect, useState } from "react";
import cssClasses from "./styles/UserProfile.module.css";
import avatar from "../../src/assets/john-wick.png";

import Card from "../UI/Card";
import useHttps from "../hooks/useHttps";
import AuthContext from "../store/auth-context";
import { ProfileForm } from "./ProfileForm";
export const UserProfile = () => {
  const [refresh, setRefresh] = useState(0);
  const { token } = useContext(AuthContext);
  const { isLoading, error, SendRequest: updateUserProfile } = useHttps();
  const {
    isSucceed,
    error: inforError,
    SendRequest: getUserProfile,
  } = useHttps();

  let transfromUser;
  const loadResolved = !isLoading;
  
  
  const updateUserProfileHandler = async (userData) => {
    updateUserProfile({
      url: "https://storebh.bhaaraterp.com/api/update-profile/",
      method: "POST",
      body: userData,
      headers: {
        Token: token,
        "Content-Type": "application/json",
      },
    });
    setRefresh(refresh + 1);
  };

  if (isSucceed.status) {
    const responseUserData = isSucceed.dataUser;
    transfromUser = Object.assign({}, ...responseUserData);
  }
  const userInfoHandler = async () => {
    getUserProfile({
      url: "https://storebh.bhaaraterp.com/api/my-profile/",
      headers: {
        Token: token,
      },
    });
  };
  useEffect(() => {
    userInfoHandler();
  }, [refresh, loadResolved]);

  const profileDataProps = {
    transfromUser,
    loading: isLoading,
    onUpdateProfile: updateUserProfileHandler,
  };
  
  let content = (
    <Card>
      {inforError && <p>{inforError}</p>}
      <div className={cssClasses.infor}>
        <div className={cssClasses.titleInfo}>
          <h3>Personal Information</h3>
        </div>
        <div className={cssClasses.imageInfo}>
          <img src={avatar} alt="Dummy User Profile" />
        </div>
      </div>
      <ProfileForm {...profileDataProps} />
      {error && <p>{error}</p>}
    </Card>
  );

  if (!isSucceed.status) {
    content = <p className={cssClasses.fallback}>Loading...</p>;
  }

  if (inforError) {
    content = <p className={cssClasses.fallback}>{inforError}</p>;
  }

  return content;
};
