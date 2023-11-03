import { useEffect, useState } from "react"
import {io} from "socket.io-client"

export const Conversations = (conversations) => {
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