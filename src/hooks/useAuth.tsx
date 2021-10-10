import { login, register } from "@/api/auth";
import { http } from "@/util/http";
import { getLoginToken, logout } from "@/util/jwt";
import { useMount } from "@/hooks/useMount";
import React, { useContext, useState } from "react";
import { message } from "antd";

interface User {
  name: string;
  token: string;
}

type LoginContext = {
  user: User | null;
  authLogin: (loginInfo: LoginForm, callback?: ErrorHandler) => void;
  authLogout: () => void;
  authRegister: (user: UserInfo, callback?: ErrorHandler) => void;
};

const AuthContext = React.createContext<LoginContext | null>(null);

// 初始化 user
const initUser = (callback: (...args: any) => void) => {
  const token = getLoginToken();
  if (token) {
    http("/me", { token, method: "GET" })
      .then(({ data }) => {
        callback(data);
      })
      .catch(console.log);
  }
};

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const authLogin = async (loginInfo: LoginForm) => {
    try {
      const { user, token }: LoginData = await login(loginInfo);
      setUser({
        token,
        name: user.name,
      });
      message.success("登录成功");
    } catch (error) {
      message.error("用户名或密码错误");
    }
  };

  const authLogout = () => logout();

  const authRegister = async (userInfo: UserInfo) => {
    try {
      const { user, token }: RegisterData = await register(userInfo);
      setUser({
        token,
        name: user.name,
      });
      message.success("注册成功");
    } catch (error) {
      message.error("注册失败");
    }
  };

  useMount(() => {
    initUser((data: LoginData) => {
      setUser({
        name: data.user.name,
        token: data.token,
      });
    });
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
