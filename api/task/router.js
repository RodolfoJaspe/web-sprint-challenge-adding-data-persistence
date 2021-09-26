const express = require("express")
const { checkTaskId } = require("./middlewares")

const router = express.Router()

const Tasks = require("./model")

router.get("/", (req,res) => {
    Tasks.getTasks()
        .then(tasks => {
            res.status(200).json(tasks)
        })
        .catch(err => {
            res.status(500).json({message:err})
        })
})

router.get("/:task_id", checkTaskId, async (req,res) => {
    try{
        res.status(200).json(req.task)
    }catch(err){
        res.status(500).json({message: err})}
})

router.post("/", (req,res) => {
    Tasks.createTask(req.body)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
})

router.delete("/:task_id", checkTaskId, (req, res) => {
    Tasks.deleteTask(req.params.task_id)
        .then(task => {
            res.status(200).json(task)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
})

module.exports = router