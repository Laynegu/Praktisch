// 鉴权相关
import { http } from "@/util/http";
import { LOGIN_TOKEN_KEY, setLoginToken } from "@/util/jwt";

// 登录
export const login = async (loginInfo: LoginForm): Promise<LoginData> => {
  try {
    const res: LoginData = await http("/login", {
      method: 'POST',
      data: loginInfo,
    });
    setLoginToken(LOGIN_TOKEN_KEY, res.data.token);
    return res;
  } catch (error: any) {
    return error;
  }
};

// 注册
export const register = async (user: UserInfo): Promise<RegisterData> => {
  try {
    const res: RegisterData = await http("/register", {
      method: 'POST',
      data: user,
    });
    return res;
  } catch (error: any) {
    return error;
  }
};
