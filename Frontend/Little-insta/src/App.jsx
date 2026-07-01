import React from 'react'
import CreatePost from './pages/CreatePost'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/createPost' replace />} />
        <Route path='/createPost' element={<CreatePost />} />
      </Routes>
    </Router>
  )
}

export default App