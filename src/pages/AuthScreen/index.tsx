import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
import styled from "@emotion/styled";
import { Button } from "antd";
import React, { useState } from "react";

export const AuthScreen: React.FC = () => {
  const [isShowLogin, setShowLogin] = useState(true);

  return (
    <AuthWrap>
      <Title>Praktish</Title>
      {isShowLogin ? (
        <>
          <Login />
          <Button type="link" onClick={() => setShowLogin(false)}>
            没有账号？立即注册
          </Button>
        </>
      ) : (
        <>
          <Register />
          <Button type="link" onClick={() => setShowLogin(true)}>
            已有账号？登录
          </Button>
        </>
      )}
    </AuthWrap>
  );
};

const AuthWrap = styled.div`
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translate3d(-50%, 0, 0);
  padding: 1rem 3rem;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;
const Title = styled.h1`
  color: rgb(46, 163, 231);
  &:hover {
    color: rgba(46, 163, 231, 0.8);
  }
`;
