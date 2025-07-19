const UserModel = require("../models/user-model");

async function getUser(req, res) {
    try {
        const user = req.user ?? {};
        return res.json({user})
    } catch(e) {
        console.log(e);
        return res.json({msg: "Internal server error !!!"})
    }
}


async function updatePassword(req, res) {
    try{
        const {oldPassword, newPassword} = req.body ?? {};
        const {_id} = req.body.user;

        if(!(oldPassword && newPassword)) return res.json({msg: "Incomplite information !!!"});

        const user = UserModel.findById(_id).selected('+password');

        if(!user.isValidPassword(oldPassword)) return res.json({msg: 'Invalid old password !!!'});

        user.password = newPassword;

        await user.save();

        return res.json({msg: "password was updated"})

    }catch(e) {
        console.log(e)
        return res.json({msg: "internal server error"})
    }
} 


async function getAllUsers(req, res) {
    try{
        const {user} = req
        
        const roles = ['user'];
        if(user.role === 'admin') roles.push('manager');

        const users = await UserModel.find({role: {'$in': roles}});
        return res.json({users});

    } catch(e) {
        console.log(e);
        return res.json({msg: 'Internal server error !!!'})
    }
}


async function getUserById(req, res) {
    try {
        const {id} = req.params;
        const {user: reqUser} = req;

        const roles = ['user'];
        if(reqUser.role === 'admin') roles.push('manager');

        const user = await UserModel.findOne({_id: id, role: {'$in': roles}});

        return res.json({user})
    } catch(e) {
        console.log(e);
        res.status(500).json({msg: 'Internal server error !!!'})
    }
}


async function updateRole(req, res) {
    try {
        const {role, id} = req.body;

        if(role === 'admin')
            return res.status(400).json({msg: 'invalid requiest !!!'})

        const user = await UserModel.findByIdAndUpdate(id, {role: role})

        if(!user) return res.status(400).json({msg: "not update"});
        return res.json({msg: 'updated'}); 
    }catch(e) {
        console.log(e);
        return res.status(500).json({msg: "INternal server error"})
    }
}

module.exports = { getUser, updatePassword, getAllUsers, getUserById, updateRole }