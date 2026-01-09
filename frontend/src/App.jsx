import React from 'react'
import "./components/style/style.css"
import { RouterProvider } from 'react-router-dom'
import routes from './components/routes/routes'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
<>
    <Toaster position="top-right" />
    <RouterProvider router={routes}></RouterProvider>
</>
  )
}

export default App