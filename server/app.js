import express from "express"
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
import "./config/database.js"
import notesRouter from "./controllers/notes.js"

const app = express()

app.use(cors({
      origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
}))

app.use(express.json())

const port =  process.env.PORT

app.get("/health", (req,res) =>{
    res.status(200).json({
        "msg" : "APIs are eating apple >_<"
    })
})

app.use("/notes", notesRouter)

app.listen(port, () =>{
    console.log("Server is running ");
    
})