const { Router } = require("express")
const { ChargeBill, GetAllBills } = require("../controllers/BillController")
const router = Router()

router.post("/charge-bill", ChargeBill)
router.post("/get-all-bills", GetAllBills)

module.exports = router
