const { Router } = require("express")
const {
  Login,
  Register,
  GetAllUsers,
} = require("../controllers/UserController")
const router = Router()

router.post("/login", Login)
router.post("/register", Register)
router.post("/get-all-users", GetAllUsers)

module.exports = router
