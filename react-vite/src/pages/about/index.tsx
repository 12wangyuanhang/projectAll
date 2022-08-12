import { Button } from 'antd'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Editor from '../../components/Editor'
import './index.less'

export default function About() {
  return <div className='home'>
    <Editor />
    <div className='home_con'>
        <Outlet />
    </div>
    
  </div>
}