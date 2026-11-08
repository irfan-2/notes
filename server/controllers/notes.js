import express from "express"
import noteModel from "../models/Notes.js"

const router = express.Router()

router.post("/create", async (req,res) =>{
    try {
        const {content} = req.body

        if(content.length == 0){
            return res.status(400).json({
                "msg" : "note cannot be empty"
            })
        }

        await noteModel.create({content})

        return res.status(201).json({
            "msg" : "node added successfully"
        })

    } catch (error) {
          console.log(error);
        res.status(500).json({
            "msg" : "internal server error :("
        })
    }
})

export default router