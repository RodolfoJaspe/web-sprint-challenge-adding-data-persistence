const db = require("../../data/dbConfig")

function getResources () {
    return db("resources")
}

function getResourceById (resource_id) {
    return db("resources").where({resource_id}).first()
}

async function createResource (resource) {
    const [id] = await db("resources").insert(resource)
    return getResourceById(id)
}

function deleteResource (resource_id){
    return db("resources").where({resource_id}).del()
}

module.exports = {getResources,getResourceById,createResource,deleteResource}