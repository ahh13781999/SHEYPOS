import { Table } from "antd"
import DefaultLayout from "../layouts/DefaultLayout"
import { useEffect, useState } from "react"
import { hideLoading, showLoading } from "../redux/alertSlice"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useDispatch } from "react-redux"

const Customers = () => {
  const dispatch = useDispatch()
  const [customers, setCustomers] = useState([])

  const getAllCustomers = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/users/get-all-users",
        {},
        {
          withCredentials: true,
        }
      )
      setCustomers(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const columns = [
    {
      title: "User Id",
      dataIndex: "_id",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      render: (value) => <span>{new Date(value).toLocaleDateString("en-GB")}</span>,
    },
  ]

  useEffect(() => {
    getAllCustomers()
  }, [])

  return (
    <DefaultLayout>
      <div className='p-2'>
        <h3 className='mb-4 text-lg font-semibold'>Customers</h3>
        <Table columns={columns} dataSource={customers} bordered />
      </div>
    </DefaultLayout>
  )
}

export default Customers
