const express = require('express');
const { SignUp, Login } = require('../controlers/auth-controler')

const authRouter = express.Router();

module.exports = authRouter;


authRouter.post('/sign-up', SignUp);

authRouter.post('/login', Login);