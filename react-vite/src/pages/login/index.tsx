import { Button } from 'antd'
import React from 'react';
import LoginK from 'login-k-lenovo';

const Login:React.FC = ()=> {
  return <div>
    这是login页面
    <LoginK />
    <Button>这是button</Button>
  </div>
}

export default Login