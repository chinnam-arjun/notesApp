import React from 'react'
import {BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import UserDashboard from './pages/UserDashboard'
import AdminDashboard from './pages/AdminDashboard'

const App = () => {
  return (
    <Router>
      <div className='bg-white'>
        <Routes>
          <Route path='/dashboard' element={<UserDashboard/> }/>
          <Route path='/' element={<IntroPage/>}></Route>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/admin' element={
          <AdminDashboard/>
          }/>
        </Routes>
      </div>
    </Router>
  )
}

export default App