import React from "react";
import AuthenticationForm from "./components/AuthenticationForm/AuthenticationForm";

type Props = {};

const AuthPage: React.FC<Props> = ({}) => {
  return (
    <div>
      <AuthenticationForm />
    </div>
  );
};

export default React.memo(AuthPage);
