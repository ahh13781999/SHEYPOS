import { useEffect, useState } from "react"
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons"
import { Layout, Menu, Button, theme } from "antd"
import { Link, useNavigate } from "react-router-dom"
const { Header, Sider, Content } = Layout
import logo from "../assets/logo.svg"
import { useSelector } from "react-redux"
import { toast } from "react-hot-toast"

const DefaultLayout = ({ children }) => {
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.carts)
  const [collapsed, setCollapsed] = useState(false)
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Layout className='min-h-screen'>
      <Sider
        className='flex flex-col'
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <img src={logo} alt='logo' className='my-6' />
        <div className='demo-logo-vertical' />
        <Menu
          theme='dark'
          mode='vertical'
          className='font-semibold space-y-4'
          defaultSelectedKeys={window.location.pathname}
          items={[
            {
              key: "/",
              icon: <HomeOutlined />,
              label: <Link to='/'>Home</Link>,
            },
            {
              key: "/cart",
              icon: <ShoppingCartOutlined />,
              label: <Link to='/cart'>Cart</Link>,
            },
            {
              key: "/bills",
              icon: <CopyOutlined />,
              label: <Link to='/bills'>Bills</Link>,
            },
            {
              key: "/items",
              icon: <UnorderedListOutlined />,
              label: <Link to='/items'>Items</Link>,
            },
            {
              key: "/customers",
              icon: <UserOutlined />,
              label: <Link to='/customers'>Customers</Link>,
            },
            {
              key: "/logout",
              icon: <LoginOutlined />,
              label: (
                <a
                  onClick={() => {
                    localStorage.removeItem("pos-user")
                    toast.loading("Logging out", { duration: 3000 })
                    navigate("/login")
                  }}
                >
                  Logout
                </a>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='p-0 mx-4 shadow-lg flex flex-row justify-between px-2'
          style={{
            background: colorBgContainer,
          }}
        >
          <Button
            type='text'
            className='text-xs w-16 h-16'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
          <div
            onClick={() => navigate("/cart")}
            className='flex flex-row font-semibold text-base items-center cursor-pointer hover:text-gray-400'
            id='cart-counts'
          >
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
        </Header>
        <Content
          className='p-6 min-h-[280] my-6 mx-4 shadow-lg'
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default DefaultLayout
