// 本地存储
const localStore: Storage = window.localStorage;

// 登录 token
export const LOGIN_TOKEN_KEY = "__login_token_key__";

export const getLoginToken = () => localStore.getItem(LOGIN_TOKEN_KEY) || "";

export const clearLoginToken = () => localStore.removeItem(LOGIN_TOKEN_KEY);

export const setLoginToken = (key: string, val: string) =>
  localStore.setItem(key, val);

// 登出
export const logout = () => {
  clearLoginToken();
  location.reload();
};
