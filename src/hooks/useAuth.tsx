import { login, logout, register } from "@/api/auth";
import React, { ReactNode, useContext, useState } from "react";

interface User {
  name: string;
  avatar: string;
}

type LoginContext = {
  user: User | null;
  authLogin: (loginInfo: LoginForm) => Promise<void>;
  authLogout: () => Promise<void>;
  authRegister: (user: UserInfo) => Promise<void>;
};

const AuthContext = React.createContext<LoginContext | null>(null);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const authLogin = async (loginInfo: LoginForm) => {
    try {
      const res = await login(loginInfo);
      setUser({ ...res.data.user });
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

  const authLogout = () => logout();

  const authRegister = async () => {};

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
