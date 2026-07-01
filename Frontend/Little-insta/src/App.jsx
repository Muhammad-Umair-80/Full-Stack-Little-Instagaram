import React from 'react'
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
const App = () => {
  return (
    
      <Router>
        <Routes>
          
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </Router>
   
  )
}

export default App