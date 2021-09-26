const Resources = require("./model")

const express = require("express")
const { checkResourceId } = require("./middlewares")

const router = express.Router()

router.get("/", (req,res) => {
    Resources.getResources()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(err => {
            res.status(500).json({message: err})
        })
})

router.get("/:resource_id", checkResourceId, async (req,res) => {
    try{
        res.status(200).json(req.resource)
    }catch(err){
        res.status(500).json({message:err})
    }
})

router.post("/", (req,res) => {
    Resources.createResource(req.body)
        .then(resource => {
            res.status(201).json(resource)
        })
        .catch(err => {
            res.status(500).json({message:err})
        }) 
})

router.delete("/", (req,res) => {
    Resources.deleteResource(req.params_resource_id)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(err => {
            res.status(500).json({message:err})
        })
})

module.exports = router