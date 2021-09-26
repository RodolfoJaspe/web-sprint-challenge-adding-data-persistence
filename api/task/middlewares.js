const Tasks = require("./model")

async function checkTaskId (req,res,next){
    const task = await Tasks.getTaskById(req.params.task_id)
    if(!task){
        res.status(404).json({message:"invalid task_id"})
    }else{
        req.task = task
        next()
    }
}

module.exports = {checkTaskId}