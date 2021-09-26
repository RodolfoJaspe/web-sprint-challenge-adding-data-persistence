const db = require("../../data/dbConfig")

const adjustedProjects = (projects) => {
    return projects.map(adjustedProject)
}

const adjustedProject = (project) => {
    project.project_completed = project.project_completed === 0? false:true
    return project
}
function getProjects(){
    return db("projects").then(adjustedProjects)
}

function getProjectById(project_id){
    return db("projects").where({project_id}).first().then(adjustedProject)
}

async function createProject(project){
    const [id] = await db("projects").insert(project)

    return getProjectById(id)
}

async function deleteProject(project_id){
    return db("projects").where({project_id}).del()
}

module.exports = {getProjects,getProjectById,createProject,deleteProject}