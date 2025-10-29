import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import LoginPage from './pages/LoginPage/LoginPage'
import Register from './components/Register/Register'
import JobPage from './pages/JobPage/JobPage'
import DashboardLayout from './components/layout/DashboardLayout'
import ProfileSettingsPage from './components/ProfileSettingsPage/ProfileSettingsPage'
import PostedJobsPage from './components/PostedJobsPage/PostedJobsPage'
import JobApplicantsPage from './components/JobApplications/JobApplicantsPage'
import MyApplicationsPage from './components/MyApplicationsPage/MyApplicationsPage'
import UsersPage from './components/Users/UsersPage'
import AdminAllJobsPage from './components/AdminAllJobsPage/AdminAllJobsPage'

function App() {

  return (
    <>
      <Routes >
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/jobs' element={<JobPage />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="profile" element={<ProfileSettingsPage />} />
          <Route path="jobs" element={<PostedJobsPage />} />
          <Route path="my-applications" element={<JobApplicantsPage />} />
          <Route path="my-applications-user" element={<MyApplicationsPage />} />

          <Route path="users" element={<UsersPage />} />
          <Route path="all-jobs" element={<AdminAllJobsPage />} />
          <Route index element={<Navigate to="profile" replace />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
