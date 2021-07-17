import React from "react";

export const Register: React.FC = () => {
  return (
    <form>
      <label htmlFor="username">用户名</label>
      <input type="text" name="username" id="username" />
      <br />
      <label htmlFor="password">密码</label>
      <input type="password" name="password" id="password" />
      <br />
      <label htmlFor="email">邮箱</label>
      <input type="email" name="email" id="email" />
      <br />
      <label htmlFor="avatar">头像</label>
      <input type="file" name="avatar" id="avatar" />
    </form>
  );
};
