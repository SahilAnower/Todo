const express=require("express")
const {getUserInfo, updateUserInfo} = require("../controllers/user")

const router = express.Router()

router.get("/",getUserInfo)
router.put("/",updateUserInfo)

module.exports = router

