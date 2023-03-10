import React from 'react';
import { Button, Input, Form, Table, Modal  } from 'antd';
import { useState } from 'react';

import GetColumnSearchProps from './GetColumnSearchProps'
import localListing from './ApiCalls/localListings'
import saveProperties from './ApiCalls/saveProperties'
import Highlighter from 'react-highlight-words';

function MainPage(props) {
  const [columns] = useState([
    {
        "title": "Id",
        "dataIndex": "key",
        "key": "key",
        "fixed": "left",
        "width": 100
    },
    {
        "title": "Full Address",
        "dataIndex": "fullAddress",
        "key": "fullAddress",
        "width": 150,
        ...GetColumnSearchProps(
          'fullAddress'
        )
    },
    {
      "title": "Zillow URL",
      "dataIndex": "url",
      "key": "url",
      "width": 100
   },
    {
        "title": "City",
        "dataIndex": "city",
        "key": "city",
        "width": 100,
        ...GetColumnSearchProps(
          'city')
    },
    {
        "title": "State",
        "dataIndex": "state",
        "key": "state",
        "width": 100
    },
    {
        "title": "Zip Code",
        "dataIndex": "zipcode",
        "key": "zipcode",
        "width": 100,
        ...GetColumnSearchProps('zipcode')
    },
    {
        "title": "Home Price",
        "dataIndex": "homePrice",
        "key": "homePrice",
        sorter: (a,b) => a.homePrice - b.homePrice,
        "width": 100
    },
    {
      "title": "Bedrooms",
      "dataIndex": "beds",
      "key": "beds",
      sorter: (a,b) => a.beds - b.beds,
      "width": 100
    },
    {
      "title": "Bathrooms",
      "dataIndex": "baths",
      "key": "baths",
      sorter: (a,b) => a.baths - b.baths,
    },
    {
        "title": "Property Tax",
        "dataIndex": "propertyTax",
        "key": "propertyTax",
        "width": 100
    },
    {
        "title": "Insurance",
        "dataIndex": "insurance",
        "key": "insurance",
        "width": 100
    },
    {
        "title": "Mortgage",
        "dataIndex": "mortgage",
        "key": "mortgage",
        sorter: (a,b) => a.mortgage - b.mortgage,
        "width": 100
    },
    {
        "title": "Rent",
        "dataIndex": "rent",
        "key": "rent",
        "width": 100
    },
    {
        "title": "Monthly Cash Flow",
        "dataIndex": "monthlyCashFlow",
        "key": "monthlyCashFlow",
        sorter: (a,b) => a.monthlyCashFlow - b.monthlyCashFlow,
        "width": 100
    },
    {
        "title": "Break Even Price",
        "dataIndex": "breakEvenPrice",
        "key": "breakEvenPrice",
        "width": 100
    }
  ])
  const [data, setData] = useState([])

  // Modal functions
  const [open, setOpen] = useState(false);
  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="Enter Property Details"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
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
        </Form>
      </Modal>
    );
  };
  const onCreate = async (values) => {
    setOpen(false);
    var houseListings = await localListing(values);
    var lists = houseListings?.data?.data;
    setData(lists);
  };

  // code for selecting rows 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const saveChosenProperties = () => {
    saveProperties(props.userId, selectedRowKeys)
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

    // main page contents
    return (
    <div>
      <div style={{
            paddingTop: 20,
            paddingLeft: 20,
            paddingBottom: 20,
          }} >
      <p> Hello {props.userName} </p>
      <p> Your User Id is: {props.userId} </p>
      <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={["and", "or", "the"]}
        autoEscape={true}
        textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
      />
      <Button style= {{background: 'white', color: 'black', height: 80, width: 200, fontSize: 16, border: '1px solid black'}}
        type="primary" 
        onClick={() => {
          setOpen(true);
        }}
      >
        Select Property Details
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
      <div className="App">
      <Button type="primary" onClick={saveChosenProperties} disabled={!hasSelected} loading={loading}>
          Save Selected Properties
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Table 
            rowSelection={rowSelection}
          columns={columns} 
          dataSource={data} 
          scroll= {{x:'max-content'}} 
        /> 
     </div>
    </div>
    );
  }
  
export default MainPage;