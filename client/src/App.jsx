import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Items from "./pages/Items"
import Cart from "./pages/Cart"
import Loader from "./components/Loader"
import { useSelector } from "react-redux"
import { Toaster } from "react-hot-toast"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Bills from "./pages/Bills"
import Customers from "./pages/Customers"

function App() {
  const { loading } = useSelector((state) => state.alerts)

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/items' element={<ProtectedRoute><Items /></ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/bills' element={<ProtectedRoute><Bills /></ProtectedRoute>} />
        <Route path='/customers' element={<ProtectedRoute><Customers /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("pos-user")) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}
