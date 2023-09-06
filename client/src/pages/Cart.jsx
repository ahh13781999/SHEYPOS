import { useDispatch, useSelector } from "react-redux"
import DefaultLayout from "../layouts/DefaultLayout"
import { Button, Form, Input, Modal, Select, Table } from "antd"
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons"
import { deleteCartItem, updateCart } from "../redux/cartSlice"
import { useEffect, useState } from "react"
import { hideLoading, showLoading } from "../redux/alertSlice"
import axios from "axios"
import { toast } from "react-hot-toast"

const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.carts)
  const [subTotal, setSubTotal] = useState(0)
  const [billChargeModal, setBillChargeModal] = useState(false)

  const increaseQuantity = (record) => {
    dispatch(updateCart({ ...record, quantity: record.quantity + 1 }))
  }

  const decreaseQuantity = (record) => {
    if (record.quantity !== 1) {
      dispatch(updateCart({ ...record, quantity: record.quantity - 1 }))
    }
  }

  const deleteItem = (record) => {
    dispatch(deleteCartItem(record))
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
        <img
          src={image}
          alt={record.name}
          height='60'
          width='60'
          className='rounded'
        />
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (text, record) => (
        <p className='font-semibold'>
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(text)}
        </p>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <div className='flex flex-row items-center space-x-1'>
          <PlusCircleOutlined
            style={{ width: "20px" }}
            onClick={() => increaseQuantity(record)}
          />
          <p className='font-bold text-xl'>{record.quantity}</p>
          <MinusCircleOutlined
            style={{ width: "20px" }}
            onClick={() => decreaseQuantity(record)}
          />
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <DeleteOutlined onClick={() => deleteItem(record)} />
      ),
    },
  ]

  const handleChargeBill = async (values) => {
    const newBill = {
      ...values,
      subTotal: +subTotal,
      cartItems,
      tax: +(subTotal * 0.1).toFixed(2),
      totalAmount: +(subTotal + subTotal * 0.1).toFixed(2),
      userId: JSON.parse(localStorage.getItem("pos-user")).userId,
    }
    dispatch(showLoading())
    try {
      const { data } = await axios.post("/api/bills/charge-bill", newBill, {
        withCredentials: true,
      })
      dispatch(hideLoading())
      setBillChargeModal(false)
      toast.success(data.message)
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    let temp = 0
    cartItems.map((item) => {
      return (temp = temp + item.price * item.quantity)
    })
    setSubTotal(temp)
  }, [cartItems])

  return (
    <DefaultLayout>
      <div className='p-2'>
        <h3 className='mb-4 text-lg font-semibold'>Cart</h3>
        <Table columns={columns} dataSource={cartItems} bordered />
        <div className='flex flex-col space-y-4'>
          <div className='flex items-center w-full'>
            <h3 className='text-2xl tracking-tight font-mono'>
              Subtotal :{" "}
              <span className='font-semibold'>
                {Intl.NumberFormat("en-US", {
                  currency: "USD",
                  style: "currency",
                }).format(subTotal)}
              </span>
            </h3>
          </div>
          <Button
            onClick={() => setBillChargeModal(true)}
            type='default'
            size='large'
            className='bg-orange-400 w-1/6 mx-auto font-semibold text-white hover:text-orange-400 hover:bg-white'
          >
            Charge bill
          </Button>
        </div>
        <Modal
          title='Charge Bill'
          open={billChargeModal}
          onCancel={() => setBillChargeModal(false)}
          footer={false}
          destroyOnClose={true}
          centered
        >
          <Form layout='vertical' onFinish={handleChargeBill}>
            <Form.Item
              required
              name='customerName'
              label='Customer Name'
              className='font-semibold text-lg'
            >
              <Input className='font-normal text-base' />
            </Form.Item>
            <Form.Item
              required
              name='customerPhoneNumber'
              label='Phone Number'
              className='font-semibold text-lg'
            >
              <Input className='font-normal text-base' />
            </Form.Item>
            <Form.Item
              required
              name='paymentMode'
              label='Payment Mode'
              className='font-semibold text-lg'
            >
              <Select>
                <Select.Option value='cash'>Cash</Select.Option>
                <Select.Option value='card'>Card</Select.Option>
              </Select>
            </Form.Item>
            <div className='flex flex-col space-y-2'>
              <p className='text-lg'>
                SubTotal :{" "}
                <span className='font-semibold'>
                  {Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency",
                  }).format(subTotal)}
                </span>
              </p>
              <p className='text-lg'>
                Tax :{" "}
                <span className='font-semibold'>
                  {Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency",
                  }).format((subTotal * 0.1).toFixed(2))}
                </span>
              </p>
              <hr />
              <p className='text-lg'>
                Grand Total :{" "}
                <span className='font-semibold'>
                  {Intl.NumberFormat("en-US", {
                    currency: "USD",
                    style: "currency",
                  }).format((subTotal + subTotal * 0.1).toFixed(2))}
                </span>
              </p>
            </div>
            <div className='flex items-center justify-end my-4'>
              <Button
                htmlType='submit'
                type='primary'
                className='bg-orange-400 text-white font-semibold hover:text-orange-400 hover:bg-white'
              >
                Generate Bill
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
    </DefaultLayout>
  )
}

export default Cart
