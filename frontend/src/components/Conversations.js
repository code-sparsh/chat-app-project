import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const Conversations = ({ socket }) => {

    const [conversations, setConversations] = useState([])

    const fetchConversations = async () => {

        try {

            const userID = localStorage.getItem('userID')
            console.log(userID)

            const response = await fetch("http://localhost:4001/api/conversations", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userID: userID
                })
            })

            const data = await response.json()

            if (response.ok) {
                setConversations(data)
                console.log(data)
            }


        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchConversations()
    }, [])

    return (
        <div className="flex h-screen">
            <div className="bg-blue-200 h-96 overflow-y-auto w-full">
                {
                    conversations.map((conversation) => {
                        return (
                        <Link key={conversation._id} to={"/chat/" + conversation._id} state={{receiverID: conversation.senderID}}>
                            <div className="bg-green-400 p-8 border-b-4 border-black hover:bg-green-500">
                                <div>{conversation.senderID}</div>
                            </div>
                        </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Conversations