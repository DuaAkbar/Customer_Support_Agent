import { tool } from "langchain";
import { z } from "zod";
import Leads from "../models/Lead.js";
import { notifyNewLeads } from "../services/notifyService.js";

export const save_Lead = tool(
  async ({
    customerName,
    customerPhoneNo,
    deliveryArea,
    deliveryOrPickup,
    orderDetails,
    guestCount,
    eventDate,
  }) => {
    try {

      const localPakNumberRegex = /^03\d{9}$/;
      if(localPakNumberRegex.test(customerPhoneNo)){
      }else{
        return "The phone number doesn't look like a valid Pakistani mobile number. Please re-check it";
      }

      await Leads.create({
        customerName,
        customerPhoneNo,
        deliveryArea,
        deliveryOrPickup,
        orderDetails,
        guestCount,
        eventDate,
      });
    } catch (e) {
      console.error(e);
      return "Could not save the details right now. Suggest the customer message Chef Noor directly on WhatsApp.";
    }
    try {
      await notifyNewLeads(
        customerName,
        customerPhoneNo,
        deliveryArea,
        deliveryOrPickup,
        orderDetails,
        guestCount,
        eventDate,
      );
      return "Details have been saved and shared with the Chef"
    }catch (e) {
      console.log("Email failed:", e);
      return "The lead was saved, but the email failed.";
    }
  },
  {
    name: "save_Lead",
    description:
      "Save a customer's order details so Chef Noor can contact them on WhatsApp. Use it only when the customer clearly wants to place an order or be contacted, you already have their name and phone number, and they have confirmed the details you repeated back. Never use it for plain questions, and never invent or guess any value.",
    schema: z.object({
      customerName: z
        .string()
        .describe("The customer's name, exactly as they gave it"),
      customerPhoneNo: z
        .string()
        .describe("The customer's WhatsApp number, exactly as they gave it, phone must be 11 digits starting with 03”"),
      deliveryArea: z
        .string()
        .describe(
          "The delivery area, only if the customer chose delivery and named it",
        )
        .optional(),
      deliveryOrPickup: z
        .enum(["delivery", "pickup"])
        .describe(
          "Whether the customer wants delivery or pickup. Only include it if they said so",
        )
        .optional(),
      orderDetails: z
        .string()
        .describe(
          "What the customer wants to order (dishes and any special requests), in their own words",
        ),
      guestCount: z
        .number()
        .describe("Number of guests, only if the customer gave it")
        .optional(),
      eventDate: z
        .string()
        .describe(
          "The event date as a real calendar date in YYYY-MM-DD format. Work it out from today's date if the customer used words like 'tomorrow'. Ask if you are unsure, never guess.",
        ),
    }),
  },
);
