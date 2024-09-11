import path from 'path'
import express from 'express';
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import authRoute from '../backEnd/routes/auth.route.js'
import messageRoute from './routes/message.route.js';
import userRoutes from './routes/user.route.js';
import connectToMongoDb from './Db/connectToMongoDb.js';
import cookieParser from 'cookie-parser';
import {app,server} from './Socket/socket.js'


const PORT = process.env.PORT || 7000;

const __dirName = path.resolve()

dotenv.config();

// using cors pakage
app.use(express.json());
app.use(bodyParser.json()); // or app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/api/auth/",authRoute)
app.use("/api/messages/",messageRoute)
app.use("/api/users",userRoutes)
app.use(express.static(path.join(__dirName, '/frontEnd/chat-app/dist')))

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirName,"frontEnd","chat-app","dist","index.html"))
})

server.listen(PORT, (e)=>{
    connectToMongoDb();
    console.log(`server is running at port ${PORT}`)
})