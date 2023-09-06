const { StatusCodes } = require("http-status-codes")
const Item = require("../models/Item")

const getAllItems = async (req, res) => {
  try {
    const items = await Item.find({}).sort({ createdAt: "desc" })
    res.status(StatusCodes.OK).json(items)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something wnt wrong try again later!" })
  }
}

const addItem = async (req, res) => {
  try {
    const item = new Item(req.body)
    await item.save()
    res.status(StatusCodes.OK).json({ message: "Item added successfully!" })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something wnt wrong try again later!" })
  }
}

const editItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.body.itemId,req.body,{
      new: true,
      runValidators: true
    })
    res.status(StatusCodes.OK).json({ message: "Item updated successfully!" })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something wnt wrong try again later!" })
  }
}

const deleteItem = async(req,res) => {
  try {
    await Item.findByIdAndDelete(req.body.itemId)
    res.status(StatusCodes.OK).json({ message: "Item deleted successfully!" })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something wnt wrong try again later!" })
  }
}

module.exports = {
  getAllItems,
  addItem,
  editItem,
  deleteItem
}
