/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Modal, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import createUser from './ApiCalls/createUser'
import verifyLogin from './ApiCalls/verifyLogin'

function LoginPage (props) {
  // functions for generating messages for login
  const navigate = useNavigate()
  const [messageApi, contextHolder] = message.useMessage()
  // code for success and failure pop-ups
  const loadingIcon = (message) => {
    messageApi.open({
      type: 'loading',
      content: message,
      duration: 0
    })
    // Dismiss manually and asynchronously
    setTimeout(messageApi.destroy, 2500)
  }
  const success = (message) => {
    messageApi.open({
      type: 'success',
      content: message
    })
    navigate('/MainPage')
  }

  const error = (message) => {
    messageApi.open({
      type: 'error',
      content: message
    })
  }

  const warning = (message) => {
    messageApi.open({
      type: 'warning',
      content: message
    })
  }

  // functions for modal opening/closing
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onCreate = async (values) => {
    const status = await createUser(values)
    console.log(status)
  }

  const onFinish = async values => {
    loadingIcon('Loggin You In..')
    const loginResult = await verifyLogin(values)
    if (loginResult.status === 200) {
      const data = loginResult.data
      if (data === null) {
        warning('user not found- check credentials')
      } else {
        const dataId = loginResult.data._id
        props.setIsLoggedIn(true)
        props.setUserName(values.username)
        props.setUserId(dataId.$oid)
        success('logged in!')
      }
    } else {
      error('you have entered the wrong password')
    }
  }
  return (
    <div style={{ width: '70%', paddingTop: '5%', paddingLeft: '5%' }}>
    {contextHolder}
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!'
          }
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!'
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <br></br>
        <p> Or </p>
        <Button type="primary" onClick={showModal}>
        Register Now
      </Button>
      <Modal title="Create Account" open={isModalOpen} onCancel={handleCancel}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                onCreate(values)
                form.resetFields()
              })
              .catch((info) => {
                console.log('Validate Failed:', info)
              })

            setIsModalOpen(false)
          }}
            >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public'
          }}
        >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Full Name!'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
          </Form.Item>
          <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
          name="createPassword"
          rules={[
            {
              required: true,
              message: 'Please choose a Password!'
            }
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
      </Form.Item>
    </Form>
    </div>
  )
};

export default LoginPage
