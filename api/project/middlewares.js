const Projects = require("./model")

function checkProjectId(req,res,next){
    const project = Projects.getProjectById(req.params.project_id)
    if(!project){
        res.status(404).json({message: "invalid project_id"})
    }else{
        req.project = project
        next()
    }
}

module.exports = {checkProjectId}