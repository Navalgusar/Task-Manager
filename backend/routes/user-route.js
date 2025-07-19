const express = require('express');
const { getUser, updatePassword, getAllUsers, getUserById, updateRole } = require('../controlers/user-controler');
const isAllow = require('../middlewares/is-allow');


const userRoute = express.Router();
module.exports = userRoute;


userRoute.get('/', getUser);

userRoute.get('/all', isAllow('admin', 'manager'), getAllUsers);

userRoute.get('/:id', getUserById);

userRoute.put('/', getUser);

userRoute.post('/update-password', updatePassword);
userRoute.patch('/role', isAllow('admin'), updateRole);