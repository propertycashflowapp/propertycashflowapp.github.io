/* eslint-disable react/prop-types */
import React from 'react'
import { Layout } from 'antd'
const { Header} = Layout

function MyHeader(props) {
    return (
        <Header
            style={{
            background: 'white',
            fontSize: 30,
            color: 'dark navy',
            textAlign: 'center'
            }} >
            Property Cash Flow
        </Header>
    )
};

export default MyHeader


