import React, { useReducer, useState } from "react";
import styles from "./SignUpForm.module.scss";
import { Button, DatePicker, Input, Select } from "antd";
import {
  UserOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import apiClient from "../../../../apiClient";

type Props = {
  setFormType: React.Dispatch<React.SetStateAction<string>>;
};

type CheckFields = {
  field: string;
  message: string;
};
type CheckFields1 = {
  field: string;
  flag: Boolean;
};

const SignUpForm: React.FC<Props> = ({ setFormType }) => {
  const [signUpStates, signUpUpdateEvent] = useReducer(
    (prev, next): any => {
      const data = { ...prev, ...next };
      return data;
    },
    {
      firstName: "",
      lastName: "",
      userName: "",
      emailId: "",
      dob: "",
      gender: null,
      country: "",
      password: "",
      passwordConfirmation: "",
    }
  );

  const [checkBoolean, setChecksBoolean] = useState({
    passwordCheck: false,
    userNameCheck: false,
    emailIdCheck: false,
    passwordConfirmationCheck: false,
    genderValueCheck: false,
  });

  const emptyChecks = (objectToCheck: any, fields: Array<CheckFields>) => {
    for (let fieldData of fields) {
      const value = objectToCheck?.[fieldData.field];
      const message = fieldData.message;
      if (typeof objectToCheck?.[fieldData.field] == "string") {
        if (value.trim() == "") {
          // openNotificationWithIcon("error", message, "");
          return { flag: false, field: fieldData.field };
        }
      }

      if (!value) {
        return { flag: false, field: fieldData.field };
      }
    }

    return { flag: true, field: "" };
  };

  const signUpConditionChecks = () => {
    const emptyCheck: CheckFields1 = emptyChecks(signUpStates, [
      { field: "userName", message: "Please Enter User Name" },
      { field: "emailId", message: "Please Enter Email Address" },
      { field: "password", message: "Please Enter Password" },
      {
        field: "passwordConfirmation",
        message: "Please Enter Confirmation Password",
      },
      {
        field: "gender",
        message: "Please Enter Gender",
      },
    ]);

    if (!emptyCheck.flag) {
      if (emptyCheck.field == "password") {
        setChecksBoolean((prev) => ({ ...prev, passwordCheck: true }));
      } else if (emptyCheck.field == "userName") {
        setChecksBoolean((prev) => ({ ...prev, userNameCheck: true }));
      } else if (emptyCheck.field == "emailId") {
        setChecksBoolean((prev) => ({ ...prev, emailIdCheck: true }));
      } else if (emptyCheck.field == "gender") {
        setChecksBoolean((prev) => ({ ...prev, genderValueCheck: true }));
      } else if (emptyCheck.field == "passwordConfirmation") {
        setChecksBoolean((prev) => ({
          ...prev,
          passwordConfirmationCheck: true,
        }));
      }
      return;
    }

    if (signUpStates?.passwordConfirmation?.trim() === "") {
      // openNotificationWithIcon(
      //   "error",
      //   "Please Enter Confirmation Password",
      //   ""
      // );
      return false;
    } else if (signUpStates?.password != signUpStates?.passwordConfirmation) {
      // openNotificationWithIcon(
      //   "error",
      //   "Please Check Confirmation Password it is not Matching with the password",
      //   ""
      // );
      return false;
    }

    return true;
  };

  const onSignUpSubmit = async () => {
    try {
      const checks = signUpConditionChecks();

      if (!checks) {
        return;
      }

      const response = await apiClient.post("/api/auth/signup", signUpStates);
    } catch (error) {
      console.log({ error });
    }
  };

  const onFocusUndo = (field: string) => {
    setChecksBoolean((prev) => ({ ...prev, [field]: false }));
  };

  return (
    <div className={styles.signUpDiv}>
      <div className={styles.signUpTitle}>Sign Up</div>
      <div className={styles.inputsContainer}>
        <Input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={signUpStates.firstName}
          onChange={(e) =>
            signUpUpdateEvent({ firstName: e?.target?.value ?? "" })
          }
          style={{
            width: "100%",
          }}
        />
        <Input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={signUpStates.lastName}
          onChange={(e) => signUpUpdateEvent({ lastName: e.target.value })}
          style={{
            width: "100%",
          }}
        />
      </div>
      <div className={styles.userNameInputDiv}>
        <Input
          type="text"
          placeholder="User Name"
          name="userName"
          value={signUpStates.userName}
          onChange={(e) => signUpUpdateEvent({ userName: e.target.value })}
          style={{
            width: "100%",
          }}
          prefix={<UserOutlined />}
          status={checkBoolean.userNameCheck ? "error" : ""}
          onFocus={() => onFocusUndo("userNameCheck")}
        />
        <Input
          type="text"
          placeholder="Email Address"
          name="userName"
          value={signUpStates.emailId}
          onChange={(e) => signUpUpdateEvent({ emailId: e.target.value })}
          style={{
            width: "100%",
          }}
          status={checkBoolean.emailIdCheck ? "error" : ""}
          onFocus={() => onFocusUndo("emailIdCheck")}
        />
        <Input.Password
          type="text"
          placeholder="Password"
          name="password"
          value={signUpStates.password}
          onChange={(e) => signUpUpdateEvent({ password: e.target.value })}
          style={{
            width: "100%",
          }}
          iconRender={(visible: any) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          status={checkBoolean.passwordCheck ? "error" : ""}
          onFocus={() => onFocusUndo("passwordCheck")}
        />
        <Input.Password
          type="text"
          placeholder="Password Confirmation"
          name="passwordConfirmation"
          value={signUpStates.passwordConfirmation}
          onChange={(e) =>
            signUpUpdateEvent({ passwordConfirmation: e.target.value })
          }
          style={{
            width: "100%",
          }}
          iconRender={(visible: any) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          status={checkBoolean.passwordConfirmationCheck ? "error" : ""}
          onFocus={() => onFocusUndo("passwordConfirmationCheck")}
        />
      </div>
      <div className={styles.dobAndGender}>
        <Select
          style={{ width: "100%" }}
          onChange={(value: string) => signUpUpdateEvent({ gender: value })}
          value={signUpStates.gender}
          options={[
            { value: "Male", label: "Male" },
            { value: "Female", label: "Female" },
          ]}
          placeholder="Gender"
          allowClear
          status={checkBoolean.genderValueCheck ? "error" : ""}
          onFocus={() => onFocusUndo("genderValueCheck")}
        />
        <DatePicker
          placeholder="DOB"
          onChange={(date, dateString) =>
            signUpUpdateEvent({ dob: dateString })
          }
          style={{ width: "100%" }}
        />
      </div>
      <div className={styles.submitBtnDiv}>
        <Button
          type="primary"
          style={{ width: "100%" }}
          onClick={onSignUpSubmit}
        >
          Sign Up
        </Button>
      </div>
      <div className={styles.footer}>
        <p className={styles.signin}>
          Already have an account ?{" "}
          <a href="#" onClick={() => setFormType("signIn")}>
            Signin
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default React.memo(SignUpForm);
