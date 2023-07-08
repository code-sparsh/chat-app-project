const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require('./routes/conversationRoutes')
const {createMessage} = require('./controllers/chatController')


require("dotenv").config();

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/conversations', router);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("DB connected")
})
.catch((error)=> {
    console.log(error);

})



const server = http.createServer(app);

app.use((req,res,next) => {
    console.log(req.path, req.method);
    next();
})

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`User connected - ${socket.id}`);

    socket.on("send-message", (messageObject) => {
        try {
            createMessage(messageObject)
            socket.broadcast.emit("receive-message", messageObject)
        }
        catch(error) {
            console.log(error)
        }
    })


    socket.on("disconnect", () => {
        console.log("User disconnected - ", socket.id)
    })
})




server.listen(4001, () => {
    console.log("SERVER RUNNING")
})






