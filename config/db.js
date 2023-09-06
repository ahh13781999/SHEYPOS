const { connect } = require("mongoose")

const connectDB = (uri) => {
  return connect(uri)
    .then(() => console.log("CONNECTED TO DATABASE SUCCESSFULLY!"))
    .catch((error) => console.log(error))
}

module.exports = connectDB
