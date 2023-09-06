const { StatusCodes } = require("http-status-codes")
const Bill = require("../models/Bill")

const ChargeBill = async (req, res) => {
  try {
    const newBill = await Bill.create(req.body)
    return res.status(StatusCodes.OK).json({
      message: "Bill charged successfully!",
    })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const GetAllBills = async (req, res) => {
  try {
    const bills = await Bill.find({}).sort({ createdAt: "desc" })
    return res.status(StatusCodes.OK).json(bills)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

module.exports = {
  ChargeBill,
  GetAllBills,
}
