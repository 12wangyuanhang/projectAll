import Home from '../pages/home'
import About from '../pages/about'
import Test1 from '../pages/homeChild/test1'
import Test2 from '../pages/homeChild/test2'
import Login from '../pages/login'
import Register from '../pages/register'
import { RouteObject } from 'react-router-dom'
import React from 'react'
import Note from '../pages/note'
import Photo from '../pages/photo'
const routes = [
  {
    path: '/home',
    element: <Home />,
    name:'Home',
    children:[
        {
            path: '/home/test1',
            element: <Test1 />,
            name: 'Test1',
            icon: 'AppstoreOutlined'
        },
        {
            path: '/home/test2',
            name: 'Test2',
            element: <Test2 />,
            icon: 'SettingOutlined'
        }
    ]
  },
  {
    path: '/about',
    element: <About />,
    children:[
        {
            path: '/about/note',
            element: <Note />,
            name: 'Note',
        },
        {
            path: '/about/photo',
            name: 'Photo',
            element: <Photo />,
        }
    ]
  },{
    path: '/register',
    element: <Register />
  },{
    path: '/login',
    element: <Login />
  },
//   {
//     path: '*',
//     element:
//   }
]

export default routes
