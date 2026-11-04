import Conversation from "../models/Conversation.js";
import { geminiCall } from "../services/llmService.js";
import { mapStoredMessagesToChatMessages } from "@langchain/core/messages";

export const chatWithAgentController = async (req, res) => {
  const { sessionId, message } = req.body;
  try {
    if (!message) {
      res.status(404).json({
        success: false,
        message: "Message is required!",
      });
      return;
    }
    const { sessionId: newSessionId, response: reply } = await geminiCall(
      sessionId,
      message,
    );
    res.status(200).json({
      success: true,
      sessionId: newSessionId,
      response: reply,
    });
  } catch (e) {
    console.log("Chat error:", e.message);
    if (e.message.includes("You exceeded your current quota")) {
      res.status(429).json({
        success: false,
        message: "You exceeded your current quota",
      });
    } else if (e.status === 503) {
      console.log("Chat error:", e.message);
      res.status(503).json({
        success: false,
        message:
          "The AI service is temporarily busy, please try again in a bit",
      });
    } else {
      console.log("Chat error:", e.message);
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
};

export const getChatMessagesController = async (req, res) => {
  const { sessionId } = req.params;

  try {
    let chatMsgs = await Conversation.findOne({ sessionId }).lean();
    if (!chatMsgs) {
      res.status(404).json({
        success: false,
        message: `No message available on this sessionId ${sessionId}`,
      });
    } else {
      const getMsgs = chatMsgs.messages.filter((m)=> m.type === "human" || m.type === "ai")
      .map((m) => ({
        role: m.type === "human" ? "user" : "model",
        text: typeof m.data.content === "string" ? m.data.content : m.data.content.map((p)=> p.text || "" ).join("")
      }))
        .filter(
          (t) => t.text.trim() != "" 
        );
        

      res.status(200).json({
        success: true,
        message: getMsgs,
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
