import mongoose from "mongoose";

const HandoffSchema = new mongoose.Schema({
  reason: {
    type: String,
    enum: [
      "unknown_answer",
      "custom_quote",
      "allergy_question",
      "customer_requested_human",
    ],
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  customerName: {
    type: String,
    trim: true,
  },
  customerPhoneNo: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved"],
    default: "pending",
  },
});

const handOff = mongoose.model("HandOff", HandoffSchema);
export default handOff;
