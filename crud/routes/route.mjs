import express from "express"
import controller from "../controllers/productController.mjs"
const router = express.Router()

router
.get("/",controller.getAllProducts)

export default router