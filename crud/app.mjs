import dotenv from "dotenv"
import express from "express"
import router from "./routes/route.mjs"
import mongoose from "mongoose"


const app = express()
//body parser
app.use(express.json())
dotenv.config()
const port = process.env.PORT


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_CONNECTION_URL);
  console.log("db connected")
}


app.use("/",router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
