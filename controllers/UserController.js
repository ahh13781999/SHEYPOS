const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")

const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Wrong email or password" })
    }
    const isPasswordCorrect = await user.VerifyPassword(password)
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Wrong email or password" })
    }
    return res.status(StatusCodes.OK).json({
      message: "You logged in successfully!",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const Register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Email already exists!" })
    }
    const user = await User.create({ name, email, password })
    return res.status(StatusCodes.CREATED).json({
      message: "User created successfully!",
      user: { userId: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: "desc" })
    return res
      .status(StatusCodes.OK)
      .json(users)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

module.exports = {
  Login,
  Register,
  GetAllUsers
}
