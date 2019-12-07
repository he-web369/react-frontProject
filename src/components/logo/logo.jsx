import React from 'react'

import logo from './logo.png'
import './logo.less'

export default function Logo() {
    return (
        <div className='logo-container'>
            <img src={logo} alt="logo图片" className='logo-img'/>
        </div>
    )
}