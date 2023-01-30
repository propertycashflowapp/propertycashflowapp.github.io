import React from 'react';
import { Space, Table, Tag } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import localListing from './ApiCalls/localListings'


const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
const { Option } = Select;


const onFinish = (values) => {
  console.log(values);
  var houseListings = localListing(values);
  console.log("lisiting", houseListings)
};

function MainPage() {
  const formRef = React.useRef(null);
  const onReset = () => {
    formRef.current?.resetFields();
  };
  
    return (
      <div>
      <Form
      ref={formRef}
      name="control-ref"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        name="area"
        label="Search Area"
        initialValue={"Atlanta Georgia"}
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="min"
        label="Min Price"
        initialValue={"40000"}
        rules={[
          {
            required: true,
          },
        ]}
      >
       <Input />
      </Form.Item>
      <Form.Item
        name="max"
        label="Max Price"
        initialValue={"700000"}
        rules={[
          {
            required: true,
          },
        ]}
      >
       <Input />
      </Form.Item>
      <Form.Item
        name="downpayment"
        label="Downpayment Percentage"
        initialValue={"0.25"}
        rules={[
          {
            required: true,
          },
        ]}
      >
       <Input />
      </Form.Item>
      <Form.Item
        name="interest"
        label="Interest Rate"
        initialValue={"0.0625"}
        rules={[
          {
            required: true,
          },
        ]}
      >
       <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
    {/* <Table columns={columns} dataSource={data} /> */}
    </div>
    );
  }
  
export default MainPage;