/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { BrowserRouter, useNavigate, Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import MainPage from './components/mainPage.js'
import LoginPage from './components/loginPage.js'
import MyHeader from './components/MyHeader.js'
import SavedHouses from './components/SavedHouses.js'
import MyMenu from './components/MyMenu.js'

const { Content, Sider } = Layout

const App = () => {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  )
}

function Root () {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [housesSaved, setHousesSaved] = useState('')
  const [userId, setUserId] = useState('')

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
        {isLoggedIn ? <MyMenu setHousesSaved={setHousesSaved} userId={userId}/> : <p></p>}
      </Sider>
      <Layout className="site-layout">
        <MyHeader/>
          <Content>
            <Routes>
              <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} setUserId={setUserId} />} exact />
              <Route path="/MainPage" element={<MainPage setHousesSaved={setHousesSaved} userName={userName} userId={userId} />} />
              <Route path="/SavedHouses" element={<SavedHouses housesSaved={housesSaved} />} />
            </Routes>
          </Content>
      </Layout>
    </Layout>
  )
}

export default App
