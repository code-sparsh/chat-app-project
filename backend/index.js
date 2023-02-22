const express = require("express")
const {Server} = require("socket.io")
const http = require("http")
const cors = require("cors")

require("dotenv").config();

const app = express()
// app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

io.on("connection", (socket) => {
    console.log(`User connected - ${socket.id}`);

    socket.on("send-message", (message) => {
        socket.broadcast.emit("recieve-message", message)
    })


    socket.on("disconnect", () => {
        console.log("User disconnected - ", socket.id)
    })
})




server.listen(4001, () => {
    console.log("SERVER RUNNING")
})






