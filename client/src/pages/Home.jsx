import { Col, Row } from "antd"
import DefaultLayout from "../layouts/DefaultLayout"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Item from "../components/Item"
import { hideLoading, showLoading } from "../redux/alertSlice"
import { useDispatch } from "react-redux"

const Home = () => {
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("fruits")
  const categories = [
    {
      name: "fruits",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/f/fd/Municipal_Market_of_S%C3%A3o_Paulo_city.jpg",
    },
    {
      name: "vegetables",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/2/24/Marketvegetables.jpg",
    },
    {
      name: "meat",
      imageURL:
        "https://upload.wikimedia.org/wikipedia/commons/a/ae/FoodMeat.jpg",
    },
  ]

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

  useEffect(() => {
    getAllItems()
  }, [])

  return (
    <DefaultLayout>
      <div className='flex flex-row space-x-2 mb-6 rounded'>
        {categories.map((category, index) => {
          return (
            <div onClick={() => setSelectedCategory(category.name)} key={index} className={`flex items-center space-x-2 border-2 border-gray-200 rounded hover:bg-gray-200 hover:border-gray-400 cursor-pointer ${selectedCategory === category.name && 'border-gray-800 hover:bg-neutral-50'}`}>
              <p className="text-lg p-2">{category.name}</p>
              <img
                src={category.imageURL}
                className='rounded h-12 w-16'
              />
            </div>
          )
        })}
      </div>
      <Row gutter={[20, 20]}>
        {items.filter(i => i.category === selectedCategory).map((item, index) => {
          return (
            <Col key={index} span={6} xs={24} lg={6} md={12} sm={6}>
              <Item item={item} />
            </Col>
          )
        })}
      </Row>
    </DefaultLayout>
  )
}

export default Home
