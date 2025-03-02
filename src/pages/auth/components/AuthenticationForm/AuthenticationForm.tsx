import React, { useState } from "react";
import styles from "./AuthenticationForm.module.scss";
import SignUpForm from "../SignUpForm/SignUpForm";
import LoginForm from "../LoginForm/LoginForm";

type Props = {};

const AuthenticationForm: React.FC<Props> = () => {
  const [formType, setFormType] = useState("signIn");
  return (
    <div className={styles.mainDiv}>
      {formType == "signIn" ? (
        <LoginForm setFormType={setFormType} />
      ) : (
        <SignUpForm setFormType={setFormType} />
      )}
    </div>
  );
};

export default React.memo(AuthenticationForm);
