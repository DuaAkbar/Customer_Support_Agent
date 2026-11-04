import express from "express";
import { chatWithAgentController, getChatMessagesController } from "../controllers/chatController.js";

const chatRouter = express.Router();
chatRouter.post("/create", chatWithAgentController);
chatRouter.get("/:sessionId", getChatMessagesController);

export default chatRouter;