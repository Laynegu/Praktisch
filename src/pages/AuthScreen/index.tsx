import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import React, { useState } from "react";

export const AuthScreen: React.FC = () => {
  const [isShowLogin, setShowLogin] = useState(true);

  return (
    <div>
      {isShowLogin ? <Login /> : <Register />}
      <br />
      <div onClick={() => setShowLogin(true)}>登录</div>
      <div onClick={() => setShowLogin(false)}>注册</div>
    </div>
  );
};
