import { tool } from "langchain";
import { z } from "zod";
import handOff from "../models/Handoff.js";
import { notifyHumanService } from "../services/notifyService.js";

export const escalate_to_human = tool(
  async ({ reason, summary, customerName, customerPhoneNo }) => {
    try {
       await handOff.create({
        reason,
        summary,
        customerName,
        customerPhoneNo,
      });
    } catch (e) {
      console.log("Database save failed:", e);
      return "The handoff could not be saved to the database.";
    }

    try {
      await notifyHumanService(reason, summary, customerName, customerPhoneNo);
      return "The handoff was saved and the email was sent.";
    } catch (e) {
      console.log("Email failed:", e);
      return "The handoff was saved, but the email failed.";
    }
  },
  {
    name: "escalate_to_human",
    description:
      "This tool is used to notify the Chef directly when there is the following situation : Allergy or ingredient-safety questions requiring confirmation. " +
      "Questions the knowledge base cannot answer reliably. " +
      "Custom quotes requiring the chef. " +
      "Customers explicitly requesting a human.",
    schema: z.object({
      reason: z
        .enum([
          "unknown_answer",
          "custom_quote",
          "allergy_question",
          "customer_requested_human",
        ])
        .describe(
          " Describes why there is a need to notify the chef directly.",
        ),
      summary: z
        .string()
        .describe(
          " Gives a summary of conversation with the user for the Chef to understand",
        ),
      customerName: z
        .string()
        .describe("Provides name of the customer who needs human assistance")
        .optional(),
      customerPhoneNo: z
        .string()
        .describe(
          "Provides phone number of the customer who needs human assistance",
        )
        .optional(),
    }),
  },
);
