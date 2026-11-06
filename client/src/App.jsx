import React from 'react'
import { BrowserRouter , Routes , Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import Adminpanel from './pages/Adminpanel'
import AdminHome from './pages/admin/AdminHome'
import Session from './pages/admin/Session'
import { Complain }  from './pages/admin/Complain'
import College from './pages/admin/College'
import Dashboard from './pages/admin/Dashboard'
import UserManagement from './pages/admin/UserManagement'
import BlokedUsers from './pages/admin/BlokedUsers'
import Discussion from './pages/admin/Discussion'
import Account from './pages/admin/Account'
import Logout from './pages/admin/Logout'
import UserDashborad from './pages/user/UserDashborad'
import AddComplaint from './pages/user/AddComplaint'
import UserComplaints from './pages/user/UserComplaints'
import Userdiscussion from './pages/user/Userdiscussion'
import Updateprofile from './pages/user/Updateprofile'
import Password from './pages/user/Password'







const App = () => {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/adminlogin' element={<AdminLogin/>}></Route>
        <Route path='/adminpanel' element={<Adminpanel/>}></Route>
        <Route path='/userlogin'  element={<UserLogin/>}></Route>
        <Route path='/userregister' element={<UserRegister/>}></Route>
        
        {/* admin route start*/}
        <Route path='/admin' element={<AdminDashboard/>}>
          <Route index element={<AdminHome/>}></Route>
          
          <Route path='session' element={<Session/>}></Route>
          <Route path='complaint' element={<Complain/>}></Route>
          <Route path='college management' element={<College/>}></Route>
          <Route path='dashboard' element={<Dashboard/>}></Route>
          <Route path='usermanagement' element={<UserManagement/>}></Route>
          <Route path='blockedusers' element={<BlokedUsers/>}></Route>
          <Route path='discussion' element={<Discussion/>}></Route>
          <Route path='account' element={<Account/>}></Route>
          <Route path='logout' element={<Logout/>}></Route>
          
         
        </Route>
        <Route path='/user' element={<Navigate to='/user/dashboard' replace />}></Route>
        <Route path='/user/dashboard' element={<UserDashborad/>}></Route>
        <Route path='/user/add-complaint' element={<AddComplaint/>}></Route>
        <Route path='/user/my-complaints' element={<UserComplaints/>}></Route>
        <Route path='/user/pending' element={<UserComplaints status='pending'/>}></Route>
        <Route path='/user/closed' element={<UserComplaints status='closed'/>}></Route>
        <Route path='/user/discussion-forum' element={<Userdiscussion/>}></Route>
        <Route path='/user/update-profile' element={<Updateprofile/>}></Route>
        <Route path='/user/change-password' element={<Password/>}></Route>
        <Route path='/user/profile' element={<Navigate to='/user/update-profile' replace />} />
        <Route path='/user/password' element={<Navigate to='/user/change-password' replace />} />
        {/* admin route end*/}

        
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
