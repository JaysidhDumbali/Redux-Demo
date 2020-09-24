import React, { useState } from "react";
import PostList from "./postlist";
import "../css/app.css";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { Layout, Menu, Breadcrumb, Space, Switch } from "antd";
import DarkModeToggle from "react-dark-mode-toggle";

import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  BulbTwoTone,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState();

  const { switcher, currentTheme, status, themes } = useThemeSwitcher();
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked);
    switcher({ theme: isChecked ? themes.dark : themes.light });
  };

  // Avoid theme change flicker
  if (status === "loading") {
    return null;
  }
  return (
    <>
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            theme={currentTheme}
          >
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3" style={{ float: "right" }}>
              <Switch
                unCheckedChildren={<BulbTwoTone twoToneColor="#000000" />}
                checkedChildren={<BulbTwoTone twoToneColor="#FCC12D" />}
                onChange={toggleTheme}
                checked={isDarkMode}
                size="large"
              />
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            width={200}
            theme={currentTheme}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              theme={currentTheme}
              style={{ height: "100%", borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                <Menu.Item key="1"></Menu.Item>
                <Menu.Item key="2">option2</Menu.Item>
                <Menu.Item key="3">option3</Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                icon={<NotificationOutlined />}
                title="subnav 3"
              >
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>

            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <PostList />
            </Content>
            <Footer style={{ textAlign: "center" }}></Footer>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default App;
