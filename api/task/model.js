const db = require("../../data/dbConfig")

const adjustedTasks = (tasks) => {
    return tasks.map(adjustedTask)
}

const adjustedTask = (task) => {
    task.task_completed = task.task_completed == 0?false:true
    return task
}
function getTasks (){
    return db("tasks as t")
        .leftJoin("projects as p","t.project_id","p.project_id")
        .select("p.project_name","p.project_description","t.*")
        .then(adjustedTasks)
}

function getTaskById(task_id){
    return db("tasks as t")
        .leftJoin("projects as p","t.project_id","p.project_id")
        .select("p.project_name","p.project_description","t.*")
        .where({task_id})
        .first()
    .then(adjustedTask)
}

async function createTask(task){
    const [id] = await db("tasks").insert(task)

    return getTaskById(id)
}

function deleteTask(task_id){
    return db("tasks").where({task_id}).del()
}

module.exports = {getTasks,getTaskById,createTask, deleteTask}