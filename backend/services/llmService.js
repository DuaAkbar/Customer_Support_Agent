import { createAgent } from "langchain";
import { systemPrompts } from "../prompts/systemPrompt.js";
import "dotenv/config";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { escalate_to_human } from "../tools/escalateToHuman.js";
import { save_Lead } from "../tools/saveLead.js";
import { search_knowledge } from "../tools/searchKnowledge.js";
import { saveBothMessage, saveUserMessage } from "./conversationService.js";

const tools = [ 
  escalate_to_human,
  save_Lead,
  search_knowledge
];

export async function geminiCall(sessionId, message) {
  const { sessionId: newSessionId, history: history } = await saveUserMessage(
    sessionId,
    message,
  );

  const model = new ChatGoogleGenerativeAI({
    model: "gemini-3.1-flash-lite",
    temperature: 0.2,
  });

  const agent = createAgent({
    model: model,
    tools: tools,
    systemPrompt: systemPrompts(),
  });

  const response = await agent.invoke({
    messages: history,
  });

  // console.log("/////// new console");
  const newMsgs = response.messages.slice(history.length);
  console.log(newMsgs.length);
  // console.log("//label");
  
  // console.log(newMsgs.map((m) => m.type));

  // console.log("SAVE NEW MSGSS");

  await saveBothMessage(newSessionId, newMsgs);
  return {
    sessionId: newSessionId,
    response: response.messages.at(-1).content, // this is llm response
  };
}
