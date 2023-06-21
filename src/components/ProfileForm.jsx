import React, { useRef, useState } from "react";
import cssClasses from "./styles/ProfileForm.module.css";
import Input from "../UI/Input";

export const ProfileForm = (props) => {
  const [selectedGender, setselectedGender] = useState(props.transfromUser.gender);
  const firstNameRef = useRef("");
  const lastNameRef = useRef("");
  const emailRef = useRef("");
  const genderRef = useRef("");
  const dobRef = useRef("");
  const mobileRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      gender: genderRef.current.value,
      date_of_birth: dobRef.current.value,
    };
    props.onUpdateProfile(userData);
    const genderSelect =
      props.transfromUser.gender === userData.gender
        ? props.transfromUser.gender
        : props.transfromUser.gender;
    setselectedGender(genderSelect);
  };

  return (
    <form className={cssClasses.formUser} onSubmit={submitHandler}>
      <Input
        label="First Name"
        ref={firstNameRef}
        input={{
          id: "fName",
          type: "text",
          name: "fName",
          defaultValue: props.transfromUser.first_name,
        }}
      />

      <Input
        label="Last Name"
        ref={lastNameRef}
        input={{
          id: "lName",
          type: "text",
          name: "lName",
          defaultValue: props.transfromUser.last_name,
        }}
      />

      <Input
        label="Email"
        ref={emailRef}
        input={{
          id: "email",
          type: "email",
          name: "email",
          defaultValue: props.transfromUser.email,
        }}
      />

      <div className={cssClasses.SelectInput}>
        <label htmlFor="gender">Gender</label>
        <select id="gender" ref={genderRef} defaultValue={selectedGender}>
          <option value="">--Selece--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <Input
        label="Date Of Birth"
        ref={dobRef}
        input={{
          id: "dob",
          type: "date",
          name: "date",
          defaultValue: props.transfromUser.date_of_birth,
        }}
      />

      <Input
        label="Mobile Number"
        ref={mobileRef}
        input={{
          id: "mobileNo",
          type: "number",
          name: "mobile",
          defaultValue: props.transfromUser.mobile_no,
        }}
      />

      <button>{props.loading ? "Changing.." : "Save Changes"}</button>
    </form>
  );
};
