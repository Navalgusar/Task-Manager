const jwt = require('jsonwebtoken');
const UserModel = require('../models/user-model');


async function verifyUser(req, res, next) {
    try{
        const authToken = req.headers['authorization'];
        if(!authToken.startsWith('Bearer ')) return res.json({msg: 'invalid token'});

        const token = authToken.split(' ')[1];
        if(!token) return res.json({msg: "Token not found !!"});

        const {id} = jwt.verify(token, 'JWT');

        const user = await UserModel.findById(id);

        if(!user) return res.json({msg: "Invalid Token !!!"});

        req.user = user;

        return next();
    } catch(e) {
        console.log(e);
        return res.json('some error comes !!!')
    }  
}

module.exports = verifyUser;