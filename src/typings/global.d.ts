// 用户信息 (来自注册)
interface UserInfo {
  name: string;
  password: number;
  avatar: string;
  email: string;
}

// 登录表单信息
interface LoginForm {
  username: string;
  password: string;
}

// 接口返回数据结构
interface RespData {
  code: number;
  message: string;
  data: any;
}

// 登录接口
interface LoginData extends RespData {
  data: {
    user: {
      name: string;
      avatar: string;
    };
    token: string;
  };
}

// 注册接口
interface RegisterData extends RespData {

}
