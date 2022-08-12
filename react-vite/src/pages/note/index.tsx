import { Button } from 'antd'
import React from 'react';
import LeftMenu from '../../components/LeftMenu';
import NodeList from '../../components/NodeList'


export default function Note() {
  return <div>
    <LeftMenu />
    <NodeList />
  </div>
}