import './App.css';
import MainPage from './components/mainPage.js'
import { FileOutlined, PieChartOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', 'tom'),
    getItem('Bill', 'bill'),
    getItem('Alex', 'alex'),
  ]),
  getItem('Files', <FileOutlined />),
  getItem('Saved Properties')
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout style={{ minHeight: '100vh', }}>
      <Sider>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            fontSize: 25,
            justifyContent: 'center',
          }} >
          Property Cash Flow App
          </Header>
        <Content >
          <MainPage/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
