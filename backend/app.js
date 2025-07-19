const express = require('express');
const authRouter = require('./routes/auth-route');
const connectToDb = require('./middlewares/conntect-to-db');
const cors = require('cors');
const verifyUser = require('./middlewares/verify-user');
const userRoute = require('./routes/user-route');
const taskRoute = require('./routes/task-route');

const app = express();
app.use(cors({
    origin: '*'
}))

app.use(express.json());
app.use(express.urlencoded());

app.use(connectToDb);

app.use('/api/auth', authRouter)

app.use('/api/user', verifyUser, userRoute)

app.use('/api/task', verifyUser, taskRoute)


app.listen(3000, () => {
    console.log('server is runing on http://localhost:3000')
})