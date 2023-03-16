/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import MainPage from './components/mainPage.js'
import LoginPage from './components/loginPage.js'
import { UserOutlined } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import getSavedProperties from './components/ApiCalls/getSavedProperties.js'

const { Header, Content, Sider } = Layout
function getItem (label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label
  }
}

const items = [
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', 'tom'),
    getItem('Bill', 'bill'),
    getItem('Alex', 'alex')
  ]),
  getItem('Saved Properties')
]

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [userId, setUserId] = useState('')

  const openSaved = async () => {
    console.log('show saved propeties')
    const houses = await getSavedProperties(userId)
    console.log('HOUSES: ', houses)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)'
          }}
        />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={openSaved} />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            background: 'white',
            fontSize: 30,
            color: 'dark navy',
            textAlign: 'center'
          }} >
         Property Cash Flow
        </Header>
        <Content >
          {!isLoggedIn ? (<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} setUserId={setUserId} />) : (<MainPage userName={userName} userId={userId} />)}
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
