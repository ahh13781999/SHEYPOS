const { genSalt, hash, compare } = require("bcryptjs")
const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

UserSchema.methods.VerifyPassword = async function (UserEnteredPassword) {
  const IsPasswordCorrect = compare(UserEnteredPassword, this.password)
  return IsPasswordCorrect
}

module.exports = model("User", UserSchema)
