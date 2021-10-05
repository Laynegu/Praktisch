import { useAuth } from "@/hooks/useAuth";
import { logout } from "./jwt";

const BASE_URL = "/api";

interface Params {
  [kay: string]: any;
}

interface RequestConfig extends RequestInit {
  token?: string;
  data?: object;
}

export const clearParams = (obj: Params) => {
  Object.keys(obj).forEach((key) => {
    if (!obj[key]) {
      delete obj[key];
    }
  });
};

export const qs = (data: Params): string => {
  clearParams(data);
  return Object.keys(data)
    .reduce((preVal, curKey) => preVal + `&${curKey}=${data[curKey]}`, "")
    .substr(1);
};

export const http = async (
  url: string,
  config?: RequestConfig
): Promise<RespData> => {
  let _token, _data, _customConfig;
  if (config) {
    const { token, data, ...customConfig } = config;
    _token = token;
    _data = data;
    _customConfig = customConfig;
  }
  const _config = {
    method: "GET",
    headers: {
      Authorization: `bearer ${_token}`,
      ["Content-Type"]: _data ? "application/json" : "",
    },
    ..._customConfig,
  };
  if (_config.method.toLowerCase() === "get") {
    if (_data) {
      url += `?${qs(_data)}`;
    }
  } else {
    _config.body = JSON.stringify(_data || {});
  }
  return await window.fetch(`${BASE_URL}/${url}`, _config).then(async response => {
    if (response.status === 401) {
      // 鉴权失败
      logout();
      return Promise.reject({
        code: 401,
        message: 'login failed',
        data: {},
      });
    }
    const res: RespData = await response.json();
    if (response.ok) {
      // 返回 2xx 状态码
      return Promise.resolve(res);
    }
    // 手动抛出错误
    return Promise.reject(res);
  });
};

export const useHttp = () => {
  const {user} = useAuth();
  const token = user?.token;
  return (...[url, config]: Parameters<typeof http>) => http(url, {token, ...config});
}
