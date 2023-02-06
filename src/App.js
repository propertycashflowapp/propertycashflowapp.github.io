import MainPage from './components/mainPage.js'
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
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
  getItem('Saved Properties')
];

const App = () => {
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
            background: 'white',
            fontSize: 30,
            color: 'dark navy',
            textAlign: 'center',
          }}  >
         Property Cash Flow
        </Header>
        <Content >
          <MainPage/>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
