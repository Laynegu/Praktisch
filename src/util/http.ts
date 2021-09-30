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
): Promise<Response> => {
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
    _config.body = JSON.stringify(_data);
  }
  return window.fetch(`${BASE_URL}/${url}`, _config);
};
