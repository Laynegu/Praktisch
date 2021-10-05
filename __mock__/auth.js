// 登录中间件
const TOKEN = "NKBJSDUWEEWCNSAE==";

const unAuthResp = (res, message) => {
  return res.status(401).json({
    code: 401,
    message,
    data: {
      token: "",
    },
  });
};

module.exports = (req, res, next) => {
  const method = req.method.toLowerCase();
  if (method === "post" && req.path === "/login") {
    if (req.body["username"] === "layne" && req.body["password"] === "layne") {
      // 登录成功
      return res.status(200).json({
        code: 200,
        message: "login successfully",
        data: {
          user: {
            name: req.body["username"],
            avatar: "",
          },
          token: TOKEN,
        },
      });
    } else {
      // 登录失败
      return unAuthResp(res, "login failed");
    }
  } else if (method === "post" && req.path === "/register") {
    const {username, password, avatar} = req.body;
    console.log(password);
    return res.status(200).json({
      code: 200,
      message: "register successfully",
      data: {
        user: {
          name: username,
          avatar,
        },
        token: TOKEN,
      },
    });
  } else {
    const authorization = req.get("Authorization");
    if (!authorization || authorization.indexOf("Bearer") < 0) {
      return unAuthResp(res, "no login");
    }
    const token = authorization.split(" ")[1];
    if (!token || token !== TOKEN) {
      return unAuthResp(res, "token invalid");
    }
    next();
  }
};
