import { randomUUID } from "crypto";
import Conversation from "../models/Conversation.js";
import { HumanMessage } from "@langchain/core/messages";
import {mapChatMessagesToStoredMessages} from "@langchain/core/messages";
import { mapStoredMessagesToChatMessages } from "@langchain/core/messages";


export const saveUserMessage = async (sessionId, message) => {
  if (!sessionId) {
    sessionId = randomUUID();
  }

  const humanMsg = new HumanMessage(message);
  const storeMsg = mapChatMessagesToStoredMessages([humanMsg]);
  console.log(storeMsg);

let chatConversation = await Conversation.findOneAndUpdate(
    {sessionId},
    {
        $push:{
            messages : {
                $each : storeMsg
            },
        },
    },
    {
        upsert : true,
        returnDocument: "after",
    },
).lean();
  
    const history = mapStoredMessagesToChatMessages(chatConversation.messages);
    return {
        sessionId,
        history
    };
  }


export const saveBothMessage = async (sessionId , messages)=>{
    const conversationWithSessionId = await Conversation.findOne({sessionId});
    if(!conversationWithSessionId){
        throw new Error(`Conversation with sessionId : ${sessionId} doesn't exist`);
    }
    
    const storeBothMsgs = mapChatMessagesToStoredMessages(messages);
    const saveBothMsgs = await Conversation.updateOne(
        {sessionId}, 
        {
            $push : {
                messages : {
                    $each: storeBothMsgs
                },
            },
        },
    )
};
