import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import SignUpPage from '../pages/SignUpPage'
import SettingPage from '../pages/SettingPage'
import TasksPage from '../pages/TasksPage'
import HomePage from '../pages/HomePage'
import AuthContainer from '../components/other/AuthContainer'
import TaskViewPage from '../pages/TaskViewPage'

export default function Navigation(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/sign-up' element={<SignUpPage/>} />
                {
                    [
                        {path: '/setting', element: <SettingPage/>},
                        {path: '/tasks', element: <TasksPage/>},
                        {path: '/home', element: <HomePage/>},
                        {path: '/tasks/:id', element: <TaskViewPage/>}
                    ].map(item => (
                        <Route path={item.path} element={
                            <AuthContainer>
                                {item.element}
                            </AuthContainer>
                        } />
                    ))
                }
            </Routes>
        </BrowserRouter>
    )
}