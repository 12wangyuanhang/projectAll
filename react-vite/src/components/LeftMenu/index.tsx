import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom'
import './index.less';

export default function leftMenu() {
  return <div className='left-nav'>
    <div className='left-nav_avatar'>
        <img src="/src/favicon.svg" alt="" />
    </div>
    <Link to="/about/note">
        <div className='left-nav_item'>
            <div className='left-nav_icon'>
                <img src="/src/favicon.svg" alt="" />
            </div>
            <div className=''>
                笔记
            </div>
        </div>
    </Link>
    <Link to="/about/photo">
        <div className='left-nav_item'>
            <div className='left-nav_icon'>
                <img src="/src/favicon.svg" alt="" />
            </div>
            <div className=''>
                图片
            </div>
        </div>
    </Link>
    <Link to="/about/audio">
        <div className='left-nav_item'>
            <div className='left-nav_icon'>
                <img src="/src/favicon.svg" alt="" />
            </div>
            <div className=''>
                音频
            </div>
        </div>
    </Link>
    <Link to="/about/star">
        <div className='left-nav_item'>
            <div className='left-nav_icon'>
                <img src="/src/favicon.svg" alt="" />
            </div>
            <div className=''>
                星标
            </div>
        </div>
    </Link>
  </div>
}