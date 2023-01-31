import React from 'react';
import { useState } from 'react';
import { Space, Table, Tag } from 'antd';
import { Button, Form, Input, Select } from 'antd';
import localListing from './ApiCalls/localListings'

function MainPage() {
  const formRef = React.useRef(null);
  const onReset = () => {
    formRef.current?.resetFields();
    setData([])
  };
  const [columns, setColumns] = useState([
    {
        "title": "Id",
        "dataIndex": "id",
        "key": "id"
    },
    {
        "title": "Full Address",
        "dataIndex": "fullAddress",
        "key": "fullAddress"
    },
    {
        "title": "City",
        "dataIndex": "city",
        "key": "city"
    },
    {
        "title": "State",
        "dataIndex": "state",
        "key": "state"
    },
    {
        "title": "Zip Code",
        "dataIndex": "zipcode",
        "key": "zipcode"
    },
    {
        "title": "Home Price",
        "dataIndex": "homePrice",
        "key": "homePrice",
        sorter: (a,b) => a.homePrice - b.homePrice,
    },
    {
        "title": "Property Tax",
        "dataIndex": "propertyTax",
        "key": "propertyTax"
    },
    {
        "title": "Insurance",
        "dataIndex": "insurance",
        "key": "insurance"
    },
    {
        "title": "Hoa",
        "dataIndex": "hoa",
        "key": "hoa",
    },
    {
        "title": "Mortgage",
        "dataIndex": "mortgage",
        "key": "mortgage",
        sorter: (a,b) => a.mortgage - b.mortgage,
    },
    {
        "title": "Rent",
        "dataIndex": "rent",
        "key": "rent"
    },
    {
        "title": "Monthly Cash Flow",
        "dataIndex": "monthlyCashFlow",
        "key": "monthlyCashFlow",
        sorter: (a,b) => a.monthlyCashFlow - b.monthlyCashFlow,
    },
    {
        "title": "Break Even Price",
        "dataIndex": "breakEvenPrice",
        "key": "breakEvenPrice"
    }
])
  const [data, setData] = useState([])

  const onFinish = async (values) => {
    var houseListings = await localListing(values);
    var lists = houseListings.data.data
    setData(lists)
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
    <div className="App">
    </div>
    <Table columns={columns} dataSource={data} /> 
     </div>
    );
  }
  
export default MainPage;