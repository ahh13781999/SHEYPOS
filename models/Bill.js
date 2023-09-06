const { Schema, model } = require("mongoose")

const BillSchema = new Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhoneNumber: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: String,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Bill", BillSchema)
