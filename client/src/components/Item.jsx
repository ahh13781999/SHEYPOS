import { Button } from "antd"
import {useDispatch} from 'react-redux'
import { addToCart } from "../redux/cartSlice"
import { toast } from "react-hot-toast"

const Item = ({ item }) => {
  const dispatch = useDispatch()
  
  return (
    <div className="flex flex-col items-center space-y-4 border-2 p-2 w-full hover:bg-gray-100 rounded">
      <p className="text-orange-400 text-xl font-medium w-full">{item?.name}</p>
      <img src={item?.image} alt={item?.name} className="rounded w-66 h-48" />
      <p className="text-gray-800 text-base">
        <span className="text-gray-600 text-lg font-semibold">Price : </span>
        {Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item?.price)}
      </p>
      <div className="flex flex-row flex-shrink w-full items-end justify-end">
        <Button onClick={() => {
          dispatch(addToCart({...item, quantity: 1}))
          toast.success("Item added to cart")
          }}  size="large" type="dashed" className="bg-orange-400 text-white hover:bg-white hover:text-orange-400 font-semibold">Add To Cart</Button>
      </div>
    </div>
  )
}

export default Item
