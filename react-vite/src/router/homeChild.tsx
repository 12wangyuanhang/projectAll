import Test1 from '../pages/homeChild/test1'
import Test2 from '../pages/homeChild/test2'
import { RouteObject } from 'react-router-dom'

const routes:RouteObject[]= [
  {
    path: '/home/test1',
    element: <Test1 />,
  },
  {
    path: '/home/test2',
    element: <Test2 />
  }
]

export default routes
