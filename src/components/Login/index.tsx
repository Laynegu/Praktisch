import { useAuth } from "@/hooks/useAuth";
import { Button, Form, Input } from "antd";
import React from "react";

export const Login: React.FC = () => {
  const { authLogin } = useAuth();

  const handleLogin = (values: any) => {
    const { username, password } = values;
    authLogin({
      username,
      password,
    });
  };

  return (
    <Form name="login" onFinish={handleLogin}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" placeholder="请输入用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="password" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};
