import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import MessageComponent from "./MessageComponent";

import socketIO from 'socket.io-client'

const Chat = () => {

    const userID = localStorage.getItem('userID')
    const params = useParams()
    const conversationID = params.id;

    const location = useLocation()
    const receiverID = location.state.receiverID

    const [socket, setSocket] = useState(null)
    const [messages, setMessages] = useState([])


    useEffect(() => {
        const startConnection = async () => {
            const newSocket = await socketIO.connect("http://localhost:4001")

            newSocket.on("connect", () => {
                console.log("You connected with socket id: ", newSocket.id)
            })
            setSocket(newSocket);
            console.log(newSocket)
        }

        const fetchMessages = async () => {
            const response = await fetch("http://localhost:4001/api/conversations/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    conversationID: conversationID
                })
            })

            const data = await response.json();

            setMessages(data)
        }

        startConnection()
        fetchMessages()
    }, [])



    useEffect(() => {

        if (socket != null) {
            console.log("useEffect ran")
            socket.on("receive-message", (messageObject) => {
                console.log(messageObject.message)
                setMessages([...messages, messageObject])
            })
        }
    }, [messages, socket])



    const scrollRef = useRef(null)
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const [messageInput, setMessageInput] = useState("")

    const onSendListener = (e) => {
        e.preventDefault()

        // create a new message Object, to send to the server
        const messageObject = {
            message: messageInput,
            senderID: userID,
            receiverID: receiverID,
            conversationID: conversationID
        }
        socket.emit("send-message", messageObject)
        setMessages([...messages, messageObject])

        setMessageInput("")
    }

    return (
        <div>
            <div className="flex border border-neutral-900">
                <div className="border w-full">
                    <div className=" h-96 bg-sky-200 overflow-y-auto">
                        {
                            messages.map((msg, index) => {

                                return (
                                <>
                                {
                                    (msg.senderID === userID)?
                                    <div className="flex justify-end">
                                        <MessageComponent key={index} message={msg.message} />
                                    </div>:<div className="flex justify-start">
                                    <MessageComponent key={index} message={msg.message} />
                                    </div>
                                }
                                </>
                                )
                            })
                        }
                        <div ref={scrollRef} ></div>
                    </div>
                    <form onSubmit={onSendListener} className="flex">
                        <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} className="w-full" />
                        <button className="bg-red-400 p-4 hover:bg-green-600">Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Chat;