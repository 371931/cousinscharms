import React, { useReducer } from "react";
import { Button, Input } from "antd";
import styles from "./LoginForm.module.scss";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

type Props = {
  setFormType: React.Dispatch<React.SetStateAction<string>>;
};

const LoginForm: React.FC<Props> = ({ setFormType }) => {
  const [loginFormStates, loginUpdateEvent] = useReducer(
    (prev, next): any => {
      const data = { ...prev, ...next };

      //   console.log({ prev, next, data });

      if (data?.emailId) {
        data.emailId = data.emailId.trim();
      }

      return data;
    },
    {
      emailId: "",
      password: "",
    }
  );

  const onSignIn = () => {
    try {
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className={styles.loginDiv}>
      <div className={styles.title}>Sign Up</div>
      <div className={styles.userNameInputDiv}>
        <Input
          type="text"
          placeholder="Email Address"
          name="userName"
          value={loginFormStates.emailId}
          onChange={(e) => loginUpdateEvent({ emailId: e.target.value })}
          style={{
            width: "100%",
          }}
        />
        <Input.Password
          type="text"
          placeholder="Password"
          name="password"
          value={loginFormStates.password}
          onChange={(e) => loginUpdateEvent({ password: e.target.value })}
          style={{
            width: "100%",
          }}
          iconRender={(visible: any) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
        />
      </div>
      <div className={styles.submitBtnDiv}>
        <Button type="primary" style={{ width: "100%" }}>
          Sign In
        </Button>
      </div>
      <div className={styles.footer}>
        <p className={styles.signin}>
          Don't have an account?
          <a href="#" onClick={() => setFormType("signUp")}>
            {" "}
            Sign up now
          </a>
        </p>
      </div>
    </div>
  );
};

export default React.memo(LoginForm);
