// fetch 请求对象

interface Params {
  [kay: string]: any;
}

interface Config extends RequestInit {
  baseUrl?: string;
  data?: Params;
}

interface InitOption {
  beforeRequest?: (http: Http) => void;
  requested?: () => void;
  beforeResponse?: (http: Http, resp: Response) => void;
  responsed?: () => void;
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

class Http {
  // 全局配置
  public globalConfig: Config;

  // 默认配置
  public static readonly DefaultConfig: Config = {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
    cache: "default",
    mode: "same-origin",
    redirect: "follow",
    referrer: "client",
    credentials: "omit",
  };

  private initOption: InitOption | undefined;

  public constructor(option?: InitOption) {
    this.initOption = option;
    this.globalConfig = {};
  }

  public async request(url: string, config?: Config): Promise<any> {
    try {
      const init = { ...Http.DefaultConfig, ...this.globalConfig, ...config };
      if (init.baseUrl) {
        url = init.baseUrl + url;
      }
      if (init.data) {
        url += `?${qs(init.data)}`;
      }

      this.initOption?.beforeRequest?.call(this, this);

      const resp = await fetch(url, init);
      console.log(resp.status, resp.ok);

      if (!resp.ok) {
        return Promise.reject();
      }
      this.initOption?.beforeResponse?.call(this, this, resp);

      return await resp.json();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public get(url: string, config?: Config): Promise<any> {
    return this.request(url, { ...config, method: "GET" });
  }

  public post(url: string, config?: Config): Promise<any> {
    return this.request(url, { ...config, method: "POST" });
  }
}

export default Http;
