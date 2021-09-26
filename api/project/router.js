// build your `/api/projects` router here
const express = require("express")
const { checkProjectId } = require("./middlewares")

const router = express.Router()

const Projects = require("./model")

router.get("/", (req,res) => {
    Projects.getProjects()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
})

router.get("/:project_id", checkProjectId, async (req,res) => {
    try{
        res.status(200).json(req.project)
    }catch(err){
        res.status(500).json({message:err})
    }
})

router.post("/", (req,res) => {
    Projects.createProject(req.body)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({message:err})
        })
})

router.delete("/:project_id", checkProjectId,(req,res) => {
    Projects.deleteProject(req.params.project_id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
module.exports = router