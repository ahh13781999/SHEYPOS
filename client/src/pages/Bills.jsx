import { useEffect, useRef, useState } from "react"
import DefaultLayout from "../layouts/DefaultLayout"
import { useDispatch } from "react-redux"
import { showLoading, hideLoading } from "../redux/alertSlice"
import { toast } from "react-hot-toast"
import axios from "axios"
import { Button, Modal, Table } from "antd"
import { EyeOutlined } from "@ant-design/icons"
import { useReactToPrint } from 'react-to-print'

const Bills = () => {
  const dispatch = useDispatch()
  const componentRef = useRef()
  const [bills, setBills] = useState([])
  const [printBillModal, setPrintBillModal] = useState(false)
  const [selectedBill, setSelectedBill] = useState(null)
  
  const getAllBills = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/bills/get-all-bills",
        {},
        {
          withCredentials: true,
        }
      )
      setBills(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
    },
    {
      title: "SubTotal",
      dataIndex: "subTotal",
      render: (text, record) =>
        Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency",
        }).format(text),
    },
    {
      title: "Tax",
      dataIndex: "tax",
      render: (text, record) =>
        Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency",
        }).format(text),
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      render: (text, record) =>
        Intl.NumberFormat("en-US", {
          currency: "USD",
          style: "currency",
        }).format(text),
    },
    {
      title: "Actions",
      dataIndex: "_id",
      render: (id, record) => (
        <div className='d-flex'>
          <EyeOutlined
            className='mx-2'
            onClick={() => {
              setSelectedBill(record)
              setPrintBillModal(true)
            }}
          />
        </div>
      ),
    },
  ]

  const cartcolumns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (number, record) => (
        <p className='font-semibold'>
          {Intl.NumberFormat("en-US", {
            currency: "USD",
            style: "currency",
          }).format(number)}
        </p>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "_id",
      render: (id, record) => (
        <p className='font-semibold'>{record.quantity}</p>
      ),
    },
    {
      title: "Total fare",
      dataIndex: "_id",
      render: (id, record) => (
        <p className='font-semibold'>
          {Intl.NumberFormat("en-US", {
            currency: "USD",
            style: "currency",
          }).format(record.quantity * record.price)}
        </p>
      ),
    },
  ]

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })


  useEffect(() => {
    getAllBills()
  }, [])
  return (
    <DefaultLayout>
      <div className='p-2'>
        <h3 className='mb-4 text-lg font-semibold'>Bills</h3>
        <Table columns={columns} dataSource={bills} bordered />
        <Modal
          title='Bill Details'
          onCancel={() => setPrintBillModal(false)}
          destroyOnClose={true}
          open={printBillModal}
          footer={false}
        >
          <div className='p-3' ref={componentRef}>
            <div className='flex flex-col space-y-2'>
              <div className='flex flex-row justify-between'>
                <h1 className='text-xl font-semibold'>SR MARKET</h1>
                <div className='flex flex-col justify-center text-black'>
                  <p>Tehran</p>
                  <p>Iran 500013</p>
                  <p>9989649278</p>
                </div>
              </div>
            </div>
            <div className='flex flex-col space-y-1'>
              <p>
                <span className='font-semibold'>Name</span> :{" "}
                {selectedBill?.customerName}
              </p>
              <p>
                <span className='font-semibold'>Phone Number</span> :{" "}
                {selectedBill?.customerPhoneNumber}
              </p>
              <p>
                <span className='font-semibold'>Date</span> :{" "}
                {new Date(selectedBill?.createdAt).toLocaleDateString("en-GB")}
              </p>
            </div>
            <Table
              dataSource={selectedBill?.cartItems}
              columns={cartcolumns}
              pagination={false}
              bordered
              className="my-2"
            />
            <div className='flex flex-col space-y-1'>
              <p>
                <span className="font-semibold">SUB TOTAL</span> : {Intl.NumberFormat("en-US",{currency:"USD" ,style:"currency"}).format(selectedBill?.subTotal)}
              </p>
              <p>
                <span className="font-semibold">Tax</span> : {Intl.NumberFormat("en-US",{currency:"USD" ,style:"currency"}).format(selectedBill?.tax)}
              </p>
              <p>
                <span className="font-semibold">GRAND TOTAL</span> : {Intl.NumberFormat("en-US",{currency:"USD" ,style:"currency"}).format(selectedBill?.totalAmount)}
              </p>
            </div>
          </div>

          <div className='flex items-center justify-end'>
            <Button
             onClick={handlePrint}
              type='default'
              className='text-white bg-orange-400 font-semibold hover:bg-white hover:text-orange-400'
            >
              Print Bill
            </Button>
          </div>
        </Modal>
      </div>
    </DefaultLayout>
  )
}

export default Bills
