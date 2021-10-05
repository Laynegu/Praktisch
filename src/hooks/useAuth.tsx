import { login, register } from "@/api/auth";
import { http } from "@/util/http";
import { getLoginToken, logout } from "@/util/jwt";
import {useMount} from "@/hooks/useMount";
import React, { useContext, useState } from "react";

interface User {
  name: string;
  avatar: string;
  token: string;
}

type LoginContext = {
  user: User | null;
  authLogin: (loginInfo: LoginForm) => void;
  authLogout: () => void;
  authRegister: (user: UserInfo) => void;
};

const AuthContext = React.createContext<LoginContext | null>(null);

// 初始化 user
const initUser = (callback: (...args: any) => void) => {
  const token = getLoginToken();
  if (token) {
    http('/me', {token})
    .then(({data}) => callback(data))
    .catch(console.log);
  }
}

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const authLogin = async (loginInfo: LoginForm) => {
    try {
      const {data: {user, token}}: LoginData = await login(loginInfo);
      setUser({
        token,
        ...user,
      });
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  const authLogout = () => logout();

  const authRegister = async () => {};

  useMount(() => {
    initUser(setUser);
  });

  return (
    <AuthContext.Provider value={{ user, authLogin, authLogout, authRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): LoginContext => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used in AuthContext");
  }

  return authContext;
};
