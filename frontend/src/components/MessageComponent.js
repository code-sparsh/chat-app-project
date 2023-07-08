
const MessageComponent = ({message}) => {

    return (
        <div className =" my-8 mx-4 bg-blue-500 max-w-sm p-3 rounded-md flex justify-end mr-16 ml-16">
             <p>{message}</p>
        </div>
    )
}

export default MessageComponent;