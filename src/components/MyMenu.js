/* eslint-disable react/prop-types */
import React from 'react'
import { Menu } from 'antd'
import { useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import getSavedProperties from './ApiCalls/getSavedProperties.js'

function MyMenu(props) {
    const navigate = useNavigate();
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
      
    const openSaved = async () => {
        console.log('show saved propeties')
        const houses = await getSavedProperties(props.userId)
        console.log('HOUSES: ', houses)
        console.log('HOUSE.DATA: ', houses.data)
        props.setHousesSaved(houses)
        navigate("/SavedHouses")
    }

    return (        
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={openSaved} />
    )
};

export default MyMenu