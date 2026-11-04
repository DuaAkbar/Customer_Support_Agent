import { searchKnowledge } from "../rag/retriever.js";
import { tool } from "langchain";
import { z } from "zod";

export const search_knowledge = tool(
  async ({ question }) => {
    const result = await searchKnowledge(question, 3);
    if (!result || result.length === 0) {
      return "No relevant information found";   
    } else {
      const text = result.map(([doc]) => doc.pageContent).join("\n\n");
      return text;
    }
  },
  {
    name: "search_knowledge",
    description:
      "Use this tool to search the Saffron & Sage Home Kitchen information for menu items and prices, ordering rules, delivery areas and charges, pickup, and policies. Use it for any question about the business before answering. Search one topic per call, and call it again if the question covers more than one topic (for example, once for the food price and once for the delivery charges).",
    schema: z.object({
      question: z.string().describe(
          "A short search phrase about one topic, for example 'DHA delivery charge' or 'Chicken Biryani price'.",
        ),
    }),
  },
);


