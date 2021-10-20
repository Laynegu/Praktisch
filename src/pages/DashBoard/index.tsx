import PersonList from "@/components/PersonList";
import { useAuth } from "@/hooks/useAuth";
import styled from "@emotion/styled";
import { Dropdown, Menu } from "antd";
import React from "react";

export const DashBoard = () => {
  const { authLogout } = useAuth();

  const FuncMenu = (
    <Menu
      mode="horizontal"
      style={{ border: "none" }}
      selectedKeys={["projects"]}
    >
      <Menu.Item key="logo">LOGO</Menu.Item>
      <Menu.Item key="projects">项目</Menu.Item>
      <Menu.Item key="users">用户</Menu.Item>
    </Menu>
  );

  const AuthMenu = (
    <Menu style={{ textAlign: "center" }} onClick={authLogout}>
      <Menu.Item key="logout">登出</Menu.Item>
    </Menu>
  );

  return (
    <Container>
      <Header>
        <HeaderLeft>{FuncMenu}</HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={AuthMenu}>
            <a onClick={(e) => e.preventDefault()}>Hi, Layne</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <PersonList />
      </Main>
      <Footer></Footer>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-auto-rows: 1fr auto 1fr;
  grid-template-areas:
    "Header Header Header"
    "Main Main Main"
    "Footer Footer Footer";
  row-gap: 2rem;
  min-height: 100vh;
`;

const Header = styled.div`
  grid-area: Header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8rem 1rem 8rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled.div`
  flex: 1;
  & li {
    font-size: 2.4rem !important;
    font-weight: 600;
    margin-left: -2rem;
    margin-right: 4rem;
  }
`;

const HeaderRight = styled.div`
  font-size: 2rem;
`;

const Main = styled.div`
  grid-area: Main;
  padding: 0 8rem;
`;

const Footer = styled.div`
  grid-area: Footer;
  border-top: 1px solid #cccccc86;
`;
