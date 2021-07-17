// 鉴权相关

import request from "./request";

// 本地存储
const localStore: Storage = window.localStorage;

// 登录 token
export const LOGIN_TOKEN_KEY = "__login_token_key__";

export const getLoginToken = () => localStore.getItem(LOGIN_TOKEN_KEY) || "";

export const clearLoginToken = () => localStore.removeItem(LOGIN_TOKEN_KEY);

export const setLoginToken = (key: string, val: string) =>
  localStore.setItem(key, val);

// 登录
export const login = async (loginInfo: LoginForm): Promise<UserToken> => {
  try {
    const res: UserToken = await request.post("/login", {
      body: JSON.stringify({ ...loginInfo }),
    });
    setLoginToken(LOGIN_TOKEN_KEY, res.data.token);
    return res;
  } catch (error) {
    return error;
  }
};

// 登出
export const logout = async (): Promise<any> => {
  clearLoginToken();
  location.reload();
};

// 注册
export const register = async (user: UserInfo): Promise<any> => {
  try {
    const res = await request.post("/register", {
      body: JSON.stringify({ ...user }),
    });
    return res;
  } catch (error) {
    return error;
  }
};
