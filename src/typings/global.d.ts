// 用户信息 (来自注册)
interface UserInfo {
  username: string;
  password: string;
  email: string;
}

// 登录表单信息
interface LoginForm {
  username: string;
  password: string;
}

// 接口返回数据结构
interface RespData<T> {
  code: number;
  message: string;
  data: T;
}

// 登录接口返回数据
interface LoginData {
  user: {
    name: string;
  };
  token: string;
}

// 注册接口返回数据
interface RegisterData {
  user: {
    name: string;
    password: string;
    email: string;
  };
  token: string;
}

type ErrorHandler = (error: any) => void;
