import { BrowserRouter } from 'react-router-dom'
import AllRoutes from './allRoutes'
import './App.css'
import { Toaster } from 'react-hot-toast' // ✅ Import it

function App() {
  return (
    <BrowserRouter>
      {/* ✅ Global toast component */}
      <Toaster position="top-right" reverseOrder={false} />
      
      {/* Your routes */}
      <AllRoutes />
    </BrowserRouter>
  )
}

export default App
