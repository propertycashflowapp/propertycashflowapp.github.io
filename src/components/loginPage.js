import React from 'react';
import { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'; 
import createUser from './ApiCalls/createUser';
import verifyLogin from './ApiCalls/verifyLogin';

function LoginPage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onCreate = async (values) => {
    var status = await createUser(values);
  };

  const onFinish = async values => {
    const loginResult = await verifyLogin(values);
    const data = loginResult.data._id
    if (loginResult.status === 200){
      props.setIsLoggedIn(true)
      props.setUserName(values.username)
      props.setUserId(data.$oid)
      }
    }
  return (
    <div style={{width: '70%', paddingTop: '5%', paddingLeft: '5%' }}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
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
                  form.resetFields();
                })
                .catch((info) => {
                  console.log('Validate Failed:', info);
                });
           
                setIsModalOpen(false)
            }}
            >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: 'public',
          }}
        >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Please input your Full Name!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Full Name" />
          </Form.Item>
          <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your Email!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
          </Form.Item>
          <Form.Item
          name="createPassword"
          rules={[
            {
              required: true,
              message: 'Please choose a Password!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Password" />
          </Form.Item>
        </Form>
      </Modal>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginPage;