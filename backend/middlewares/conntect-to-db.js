const mongoose = require('mongoose');

async function connectToDb(req, res, next){
    try{
        if(mongoose.connections[0].readyState) return next();

        await mongoose.connect('mongodb://localhost:27017/');
        console.log('Connnet to database');

        next()
    } catch(e) {
        res.json({msg: 'fail to connnet to db'});
        console.log(e)
    }
}


module.exports = connectToDb;