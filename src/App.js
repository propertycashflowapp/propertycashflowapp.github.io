import './App.css';
import { Layout, Space } from 'antd';
import Table from './components/table.js'
const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header> Property Cash App</Header>
        <Layout>
          <Sider></Sider>
          <Table></Table>
        </Layout>
      </Layout>

    </div>
  );
}

export default App;
