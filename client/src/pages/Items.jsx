import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import DefaultLayout from "../layouts/DefaultLayout"
import { hideLoading, showLoading } from "../redux/alertSlice"
import { useDispatch } from "react-redux"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { Button, Form, Input, Modal, Select, Table } from "antd"

const Items = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const getAllItems = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/items/get-all-items",
        {},
        { withCredentials: true }
      )
      setItems(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  const handleAddForm = async (values) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/items/add-item",
        { ...values },
        {
          withCredentials: true,
        }
      )
      dispatch(hideLoading())
      setShowEditModal(false)
      toast.success(data.message)
      getAllItems()
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error)
    }
  }

  const handleEditForm = async (values) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/items/edit-item",
        { ...values, itemId: editingItem._id },
        {
          withCredentials: true,
        }
      )
      dispatch(hideLoading())
      setShowEditModal(false)
      setEditingItem(null)
      toast.success(data.message)
      getAllItems()
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error)
    }
  }

  const deleteItem = async (item) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/items/delete-item",
        { itemId: item._id },
        {
          withCredentials: true,
        }
      )
      dispatch(hideLoading())
      toast.success(data.message)
      getAllItems()
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error)
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image, record) => (
        <img src={image} alt={record.name} className='h-16 w-24 rounded' />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record) =>
        Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(text),
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className='flex space-x-2'>
          <EditOutlined
            onClick={() => {
              setEditingItem(record)
              setShowEditModal(true)
            }}
          />
          <DeleteOutlined
            onClick={() => {
              deleteItem(record)
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllItems()
  }, [])
  return (
    <DefaultLayout>
      <div className='p-2'>
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold'>Items</h3>
          <Button
            onClick={() => setShowEditModal(!showEditModal)}
            type='default'
            className='bg-orange-400 text-white font-semibold hover:bg-white hover:text-orange-400'
          >
            Add Item
          </Button>
        </div>
        <Table columns={columns} dataSource={items} bordered />
        <Modal
          title={editingItem ? "Edit Item" : "Add New Item"}
          open={showEditModal}
          destroyOnClose={true}
          onCancel={() => {
            setShowEditModal(false)
            setEditingItem(null)
          }}
          footer={false}
        >
          <Form
            layout='vertical'
            initialValues={editingItem}
            onFinish={editingItem ? handleEditForm : handleAddForm}
          >
            <Form.Item
              name='name'
              label='Name'
              className='font-semibold'
              required
            >
              <Input className='font-normal' />
            </Form.Item>
            <Form.Item
              name='price'
              label='Price'
              className='font-semibold'
              required
            >
              <Input className='font-normal' />
            </Form.Item>
            <Form.Item
              name='image'
              label='Image'
              className='font-semibold'
              required
            >
              <Input className='font-normal' />
            </Form.Item>
            <Form.Item
              name='category'
              label='Category'
              className='font-semibold'
              required
            >
              <Select>
                <Select.Option value='fruits'>Fruits</Select.Option>
                <Select.Option value='vegetables'>Vegetables</Select.Option>
                <Select.Option value='meat'>Meat</Select.Option>
              </Select>
            </Form.Item>
            <div className='flex justify-end w-full'>
              <Button
                htmlType='submit'
                type='dashed'
                className='bg-orange-400 text-white font-semibold hover:bg-white hover:text-orange-400'
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </DefaultLayout>
  )
}

export default Items
