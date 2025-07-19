const UserModel = require("../models/user-model");

async function SignUp(req, res) {
    try {
        const {username, password, name} = req.body ?? {};

        if(!(username && password && name)) return res.json({msg: 'Incomplite information'});

        if(await UserModel.findOne({username})) return res.json({msg: "user was already exist"});

        const user = await UserModel.create({username, password, name});
        
        const token = user.createToken();
        return res.json({msg: 'user was created', token});
    } catch(e) {
        console.log(e)
        return res.json({msg: 'some error comes !!!'})
    }
}

async function Login(req, res) {
     try {
        const {username, password} = req.body ?? {};

        if(!(username && password)) return res.json({msg: 'Incomplite information'});

        const user = await UserModel.findOne({username}).select('+password');
   
        if(!user || !user.isValidPassword(password)) return res.json({msg: "Invalid username and password !!!"})
        
        const token = user.createToken();
        return res.json({msg: 'user was created', token});
    } catch(e) {
        console.log(e)
        return res.json({msg: 'some error comes !!!'})
    }
}


module.exports = {SignUp, Login}