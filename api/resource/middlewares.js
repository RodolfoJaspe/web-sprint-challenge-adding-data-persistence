const { checkProjectId } = require("../project/middlewares")
const Resources = require("./model")

async function checkResourceId (req,res,next){
    const resource = await Resources.getResourceById(req.params.resource_id)
    if(!resource){
        res.status(404).json({message:"invalid resource_id"})
    }else{
        req.resource = resource
    }
}

module.exports = {checkResourceId}