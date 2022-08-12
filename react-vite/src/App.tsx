import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useRoutes, RouteObject, Navigate } from 'react-router-dom'
import './App.css'
import routes from './router'
import { Provider } from 'react-redux';
import store from './store'
// import homeChild from './router/homeChild'

function App() {
    const [count, setCount] = useState(0)
    // const element = useRoutes(homeChild)
    const handleRouter = (routeList:RouteObject[]) => {
        return routeList?.map((item)=>{
            let Element = item.element
            
            return (<Route key={item.path} path={item.path} element={Element}>
                {
                   item.children?.length ? handleRouter(item.children) : null
                }
            </Route>)
        })
    }
    return (
        <Provider store={store}>
            <div className="App">
                <Router>
                    <Routes>
                        <Route path='/' element={<Navigate to="/home/test1" />}></Route>
                        {
                            handleRouter(routes)
                        }
                        {/* {element} */}
                        
                    </Routes>
                </Router>
            </div>
        </Provider>
    )
}

export default App
