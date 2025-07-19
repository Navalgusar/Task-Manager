const TaskModel = require("../models/task-model");
const UserModel = require("../models/user-model");

async function getAllTasks(req, res) {
    try{
        const {user} = req;
        const tasks = await TaskModel.find({assignTo: user._id});
        return res.json({tasks});
    } catch(e) {
        console.log(e);
        return res.json({msg: 'Internal server error'})
    }
}

async function getAllAssignTasks(req, res) {
    try{
        const {user} = req;
        const tasks = await TaskModel.find({assignBy: user._id});
        return res.json({tasks});
    } catch(e) {
        console.log(e);
        return res.json({msg: 'Internal server error'})
    }
}


async function createTask(req, res) {
    try {
        const {title, description, assignTo} = req.body ?? {};
        if(!title && !assignTo) return res.json({msg: "Incomplite information !!!"});

        const {user} = req;

        let taskAssignUser = UserModel.findById(assignTo);
        if(!taskAssignUser) return res.json({msg: "Invalid assign user id !!!"});

        if(user.role === taskAssignUser.role || taskAssignUser.role === 'admin')
            return res.json({msg: "Dont assign task to same and higher role user"});

        await TaskModel.create({title, description, assignTo, assignBy: user._id});

        return res.json({msg: "task was created."})

    }catch(e) {
        console.log(e);
        return res.json({msg: "Internal server error"})
    }
}


async function deleteTask(req, res) {
    try {
        const {id} = req.params;
        const {user} = req;

        if(!id) return res.json({msg: 'id was not found !!'});

        await TaskModel.findOneAndDelete({_id: id, assignBy: user._id});

        return res.json({msg: 'task was deleted'})
    } catch(e) {
        console.log(e);
        return res.json({msg: "INternal server error !!!"})
    }
}


async function updateTask(req, res) {
    try {
        const {id} = req.params;
        const {user} = req;
        const {title, description, assignTo} = req.body;

        if(!(title && assignTo)) 
            return res.status(401).json({msg: 'Incomplite information !!!'})

        if(!id) return res.status(401).json({msg: 'id was not found !!'});

        const task = await TaskModel.findOneAndUpdate(
            {_id: id, assignBy: user._id}, {title, description, assignTo}
        );

        console.log(task)

        return res.json({msg: 'task was updated'})
    } catch(e) {
        console.log(e);
        return res.status(500).json({msg: "INternal server error !!!"})
    }
}


module.exports = {getAllTasks, createTask, deleteTask, getAllAssignTasks, updateTask}