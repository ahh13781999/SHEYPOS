import { Form, Input, Button, Row, Col } from "antd"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../redux/alertSlice"
import toast from "react-hot-toast"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from "react"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (values) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/users/login",
        { ...values },
        {
          withCredentials: true,
        }
      )
      localStorage.setItem("pos-user", JSON.stringify(data.user))
      dispatch(hideLoading())
      toast.success(data.message)
      toast.loading("Redirecting to home page", { duration: 3000 })
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error)
    }
  }

  useEffect(() => {
    if (localStorage.getItem("pos-user")) {
      navigate("/")
    }
  }, [])

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[url('./auth.svg')]">
      <Row>
        <Col>
          <Form
            layout='vertical'
            onFinish={handleLogin}
            className='shadow p-6 w-full bg-white rounded'
          >
            <p className='font-bold text-3xl tracking-wider'>SHEY-POS</p>
            <hr className='my-4' />
            <p className='mb-4 text-xl font-medium tracking-wide'>Login</p>
            <Form.Item
              name='email'
              label='Email'
              required
              className='w-72 font-semibold'
            >
              <Input className='font-normal' type='email' />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              required
              className='w-72 font-semibold'
            >
              <Input className='font-normal' type='password' />
            </Form.Item>
            <div className='flex items-center justify-between w-72'>
              <Link to='/register' className='underline'>
                Don't have an account yet? click here to register
              </Link>
              <Button
                htmlType='submit'
                className='bg-cyan-800 text-white font-semibold hover:bg-white hover:text-cyan-800'
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Login
