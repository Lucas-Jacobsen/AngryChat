export const Conversations = (conversations) => {
    console.log(conversations.conversations)
    return (
        <div>
            {conversations.conversations.map((conversation) => {
                return (
                    <div key={conversation.recipient_id}>
                        <h1>{conversation.recipient_id}</h1>
                    </div>
                )
            })}
        </div>
    )
}