import { useAuth } from "@/hooks/useAuth";
import { Form, Button, Input } from "antd";
import React from "react";

export const Register: React.FC = () => {
  const { authRegister } = useAuth();

  const handleRegister = (values: any) => {
    const { username, password, email } = values;
    authRegister({
      username,
      password,
      email,
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18, offset: 1 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 4,
      },
    },
  };

  return (
    <Form {...formItemLayout} name="register" onFinish={handleRegister}>
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "请确认密码",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { type: "email", message: "请输入正确的邮箱" },
          { required: true, message: "请输入邮箱" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "150%", marginLeft: "-4.7rem" }}
        >
          注册
        </Button>
      </Form.Item>
    </Form>
  );
};
