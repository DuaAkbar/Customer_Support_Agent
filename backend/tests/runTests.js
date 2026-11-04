import { searchKnowledge } from "../rag/retriever.js";
import { save_Lead } from "../tools/saveLead.js";
import ConnectToDb from "../config/dbConnection.js";
import {
  saveBothMessage,
  saveUserMessage,
} from "../services/conversationService.js";
import { AIMessage } from "@langchain/core/messages";
import { geminiCall } from "../services/llmService.js";
import Conversation from "../models/Conversation.js";
import Leads from "../models/Lead.js";
import handOff from "../models/Handoff.js";

//>>>>>>>>>>>> Testing retriever file
// async function testingRetriever() {
//   try {
//     let questions = [R
//       "How much is the delievery time?",
//       "What includes in your desserts?",
//       "What is your advance payment policy?",
//       "Can you bring food to my house?",
//       "How is the weather like?",
//       "Do you do weddings?"
//     ];

//     for (const question of questions) {
//       console.log(`Question : ${question}`);
//       const results = await searchKnowledge(question, 1);

//       for (const [doc, score] of results) {
//         console.log(`The Score is : ${score}`);
//         console.log(`The Content is : ${doc.pageContent}`);
//         console.log(`The metaData is : ${doc.metadata.source}`);
//       }
//     }
//   } catch (e) {
//     console.log(`Error is : ${e.message}`);
//   } finally {
//     process.exit();
//   }
// }

// testingRetriever();

//>>>>>>>>>>>> Testing SaveLeadTool file
// async function testingSaveLeadTool() {
//  await ConnectToDb();
//   try {
//     const result = await save_Lead.invoke({
//   customerName: "Maria",
//   customerPhoneNo: "05478908654",
//   deliveryOrPickup: "delivery",
//   orderDetails: "Beef Biryani",
//   eventDate: "3 Nov",
//   guestCount : 34
// });

// console.log(result);

//   } catch (e) {
//     console.log(`Error is : ${e.message}`);
//   }
// }
// testingSaveLeadTool();

//>>>>>>>>>>>> Testing ConversationServiceSaveUserMessage file
// async function testingConversationServiceSaveUserMessage() {

//   try {
//     await ConnectToDb();

//     const result = await saveUserMessage(
//       undefined,
//       "testing by human"
//     );

//     console.log( result);
//   } catch (e) {
//     console.error("ERROR:", e);
//   }
// }
// testingConversationServiceSaveUserMessage();

//>>>>>>>>>>>> Testing ConversationServiceSaveBothMessage file
// async function testingConversationServiceSaveBothMessage() {

//   try {
//     await ConnectToDb();

//     const result = await saveBothMessage(
//       "8022ae1a-82aa-4b01-97c7-bac2f46841fa" ,
//       [new AIMessage("some reply from Agent")]
//     );

//     console.log(result);
//   } catch (e) {
//     console.error("ERROR:", e);
//   }
// }
// testingConversationServiceSaveBothMessage();

// >>>>>>>>>>>> Testing geminicall from llmService file
async function testingllmService() {
  try {
    await ConnectToDb();
    const result = await geminiCall(
      "62fddf06-1eb2-4a06-a92f-6723786125ed",
      " Oh my God i apologize for the error, its 03444654378",
    );
    console.log("RESULTS ARE: ", result);
  } catch (e) {
    console.error("ERROR:", e);
  }
}
testingllmService();

// >>>>>>>>>>>> DELETES ANY COLLECTION'S DATA
// async function clearStuffInDb () {
//   await ConnectToDb();
  
//   const deleteAllConvo = await Conversation.deleteMany({});
//   console.log(deleteAllConvo);

// }
// clearStuffInDb();

