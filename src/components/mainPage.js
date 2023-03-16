/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, Input, Form, Table, Modal, Checkbox } from 'antd'

import GetColumnSearchProps from './GetColumnSearchProps'
import localListing from './ApiCalls/localListings'
import saveProperties from './ApiCalls/saveProperties'

function MainPage (props) {
  const [columns] = useState([
    {
      title: 'Id',
      dataIndex: 'key',
      key: 'key',
      fixed: 'left',
      width: 100
    },
    {
      title: 'Full Address',
      dataIndex: 'fullAddress',
      key: 'fullAddress',
      width: 150,
      ...GetColumnSearchProps(
        'fullAddress'
      )
    },
    {
      title: 'Zillow URL',
      dataIndex: 'url',
      key: 'url',
      width: 100
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 100,
      ...GetColumnSearchProps(
        'city')
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      width: 100
    },
    {
      title: 'Zip Code',
      dataIndex: 'zipcode',
      key: 'zipcode',
      width: 100,
      ...GetColumnSearchProps('zipcode')
    },
    {
      title: 'Home Price',
      dataIndex: 'homePrice',
      key: 'homePrice',
      sorter: (a, b) => a.homePrice - b.homePrice,
      width: 100
    },
    {
      title: 'Bedrooms',
      dataIndex: 'beds',
      key: 'beds',
      sorter: (a, b) => a.beds - b.beds,
      width: 100
    },
    {
      title: 'Bathrooms',
      dataIndex: 'baths',
      key: 'baths',
      sorter: (a, b) => a.baths - b.baths
    },
    {
      title: 'Property Tax',
      dataIndex: 'propertyTax',
      key: 'propertyTax',
      width: 100
    },
    {
      title: 'Insurance',
      dataIndex: 'insurance',
      key: 'insurance',
      width: 100
    },
    {
      title: 'Mortgage',
      dataIndex: 'mortgage',
      key: 'mortgage',
      sorter: (a, b) => a.mortgage - b.mortgage,
      width: 100
    },
    {
      title: 'Rent',
      dataIndex: 'rent',
      key: 'rent',
      width: 100
    },
    {
      title: 'Monthly Cash Flow',
      dataIndex: 'monthlyCashFlow',
      key: 'monthlyCashFlow',
      sorter: (a, b) => a.monthlyCashFlow - b.monthlyCashFlow,
      width: 100
    },
    {
      title: 'Break Even Price',
      dataIndex: 'breakEvenPrice',
      key: 'breakEvenPrice',
      width: 100
    }
  ])
  const [data, setData] = useState([])

  // Modal functions
  const [open, setOpen] = useState(false)

  const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm()
    const onChange = (e) => {
      form.setFieldsValue({
        isCheckedInput: `${e.target.checked}`
      })
      console.log(`checked = ${e.target.checked}`)
    }
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
              form.resetFields()
              onCreate(values)
            })
            .catch((info) => {
              console.log('Validate Failed:', info)
            })
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
            name="area"
            label="Search Area"
            // initialValue={'Atlanta Georgia'}
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input placeholder="Input search term"/>
          </Form.Item>
          <Form.Item
            name="mortgage"
            style={{
              marginBottom: 0
            }}
          >
            <Form.Item
              name="downpayment"
              label="Down Payment Percentage"
              rules={[
                {
                  required: true
                }
              ]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)'
              }}
            >
              <Input placeholder="Input down payment percentage" />
            </Form.Item>
            <Form.Item
              name="interest"
              label="Interest Rate"
              rules={[
                {
                  required: true
                }
              ]}
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 8px'
              }}
            >
              <Input placeholder="Input interest rate" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            name="isCheckedInput"
            style={{
              display: 'none'
            }}
          >
            <Input/>
          </Form.Item>
          <Form.Item name="showAdvancedFilters">
            <Checkbox onChange={onChange}>Show advanced filters</Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(prevValues, currentValues) => prevValues.showAdvancedFilters !== currentValues.showAdvancedFilters}
          >
            {({ getFieldValue }) =>
              getFieldValue('isCheckedInput') === 'true'
                ? (
            <><Form.Item
                    name="price"
                    style={{
                      marginBottom: 0,
                      display: 'block'
                    }}
                  >
                    <Form.Item
                      name="minPrice"
                      label="Min Price"
                      rules={[
                        {
                          required: false
                        }
                      ]}
                      style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)'
                      }}
                    >
                      <Input placeholder="Input min price" />
                    </Form.Item>
                    <Form.Item
                      name="maxPrice"
                      label="Max Price"
                      rules={[
                        {
                          required: false
                        }
                      ]}
                      style={{
                        display: 'inline-block',
                        width: 'calc(50% - 8px)',
                        margin: '0 8px'
                      }}
                    >
                      <Input placeholder="Input max price" />
                    </Form.Item>
                  </Form.Item><Form.Item
                    name="maxHoa"
                    label="Max Hoa"
                    rules={[
                      {
                        required: false
                      }
                    ]}
                    style={{
                      display: 'block'
                    }}
                  >
                      <Input placeholder="Input max hoa" />
                    </Form.Item><Form.Item
                      name="singleStoryOnly"
                      valuePropName="checked"
                      style={{
                        display: 'block'
                      }}
                    >
                      <Checkbox>
                        Single story only
                      </Checkbox>
                    </Form.Item><Form.Item
                      name="bedrooms"
                      style={{
                        marginBottom: 0,
                        display: 'block'
                      }}
                    >
                      <Form.Item
                        name="minBedrooms"
                        label="Min Bedrooms"
                        rules={[
                          {
                            required: false
                          }
                        ]}
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)'
                        }}
                      >
                        <Input placeholder="Input min bedrooms" />
                      </Form.Item>
                      <Form.Item
                        name="maxBedrooms"
                        label="Max Bedrooms"
                        rules={[
                          {
                            required: false
                          }
                        ]}
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)',
                          margin: '0 8px'
                        }}
                      >
                        <Input placeholder="Input max bedrooms" />
                      </Form.Item>
                    </Form.Item><Form.Item
                      name="bathrooms"
                      style={{
                        marginBottom: 0,
                        display: 'block'
                      }}
                    >
                      <Form.Item
                        name="minBathrooms"
                        label="Min Bathrooms"
                        rules={[
                          {
                            required: false
                          }
                        ]}
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)'
                        }}
                      >
                        <Input placeholder="Input min bathrooms" />
                      </Form.Item>
                      <Form.Item
                        name="maxBathrooms"
                        label="Max Bathrooms"
                        rules={[
                          {
                            required: false
                          }
                        ]}
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)',
                          margin: '0 8px'
                        }}
                      >
                        <Input placeholder="Input max bathrooms" />
                      </Form.Item>
                    </Form.Item><Form.Item
                      name="yearBuilt"
                      style={{
                        marginBottom: 0,
                        display: 'block'
                      }}
                    >
                      <Form.Item
                        name="minYearBuilt"
                        label="Min Year Built"
                        rules={[
                          {
                            required: false
                          }
                        ]}
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)'
                        }}
                      >
                        <Input placeholder="Input min year built" />
                      </Form.Item>
                      <Form.Item
                        name="maxYearBuilt"
                        label="Max Year Built"
                        rules={[
                          {
                            required: false
                          }
                        ]}
                        style={{
                          display: 'inline-block',
                          width: 'calc(50% - 8px)',
                          margin: '0 8px'
                        }}
                      >
                        <Input placeholder="Input max year built" />
                      </Form.Item>
                    </Form.Item></>
                  )
                : null
  }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
  const onCreate = async (values) => {
    setOpen(false)
    const houseListings = await localListing(Object.fromEntries(Object.entries(values).filter(([_, v]) => v !== undefined)))
    const lists = houseListings?.data?.data
    setData(lists)
  }

  // code for selecting rows
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [loading, setLoading] = useState(false)
  const saveChosenProperties = () => {
    saveProperties(props.userId, selectedRowKeys)
    setLoading(true)
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  }
  const hasSelected = selectedRowKeys.length > 0

  // main page contents
  return (
    <div>
      <div style={{
        paddingTop: 20,
        paddingLeft: 20,
        paddingBottom: 20
      }} >
      <p> Hello {props.userName} </p>
      <p> Your User Id is: {props.userId} </p>
      {/* <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={["and", "or", "the"]}
        autoEscape={true}
        textToHighlight="The dog is chasing the cat. Or perhaps they're just playing?"
      /> */}
      <Button style= {{ background: 'white', color: 'black', height: 80, width: 200, fontSize: 16, border: '1px solid black' }}
        type="primary"
        onClick={() => {
          setOpen(true)
        }}
      >
        Select Property Details
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
        }}
      />
    </div>
      <div className="App">
      <Button type="primary" onClick={saveChosenProperties} disabled={!hasSelected} loading={loading}>
          Save Selected Properties
        </Button>
        <span
          style={{
            marginLeft: 8
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        <Table
            rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
          scroll= {{ x: 'max-content' }}
        />
     </div>
    </div>
  )
}

export default MainPage
