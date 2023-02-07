import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Form, Space, Table, Modal  } from 'antd';
import { useRef, useState } from 'react';
import localListing from './ApiCalls/localListings'


function MainPage() {
  // functions for column data 
  const formRef = React.useRef(null);
  const onReset = () => {
    formRef.current?.resetFields();
    setData([])
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <p
          searchWords={[searchText]}
          autoEscape
        />
      ) : (
        text
      ),
  });
  const [columns, setColumns] = useState([
    {
        "title": "Id",
        "dataIndex": "id",
        "key": "id",
        "fixed": "left",
        "width": 100
    },
    {
        "title": "Full Address",
        "dataIndex": "fullAddress",
        "key": "fullAddress",
        "width": 150
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
        "width": 100
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
        "width": 100
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

  //functions for searching within table  -> fix not currently working 
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

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
    console.log(values);
    setOpen(false);
    var houseListings = await localListing(values);
    var lists = houseListings?.data?.data;
    setData(lists);
    
  };

    // main page contents
    return (
    <div>
      <div style={{
            paddingTop: 20,
            paddingLeft: 20,
            paddingBottom: 20,
          }} >
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
        <Table columns={columns} dataSource={data} scroll= {{x:'max-content'}} /> 
     </div>
    </div>
    );
  }
  
export default MainPage;