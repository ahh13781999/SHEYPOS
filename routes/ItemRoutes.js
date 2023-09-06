const { Router } = require("express")
const {
  getAllItems,
  addItem,
  editItem,
  deleteItem
} = require("../controllers/ItemController")
const router = Router()

router.post("/get-all-items", getAllItems)
router.post("/add-item", addItem)
router.post("/edit-item", editItem)
router.post("/delete-item", deleteItem)


module.exports = router
