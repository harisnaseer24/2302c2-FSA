import express from "express"
import controller from "../controllers/productController.mjs"
const router = express.Router()

router
//GET REQUESTs

.get("/",controller.getAllProducts)
.get("/product/:id",controller.getProduct)

//POST REQUESTs
.post("/addproduct",controller.addProduct)

export default router