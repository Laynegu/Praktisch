import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { authLogin } = useAuth();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authLogin({
      username,
      password,
    });
  };

  return (
    <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleLogin(e)}>
      <label htmlFor="username">用户名</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
      />
      <br />
      <label htmlFor="password">密码</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button type="submit">提交</button>
    </form>
  );
};
