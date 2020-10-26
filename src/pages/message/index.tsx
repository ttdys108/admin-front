import React, {useState} from "react";
import Chat, {Message} from "../../components/chat";


const MessageChat = () => {

    return (
        <div>
            <Chat height={'500px'} currentUser={'xuer'} toUser={'tmp'} />
        </div>
    )
}

export default MessageChat;