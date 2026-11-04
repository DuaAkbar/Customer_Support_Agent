import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    customerPhoneNo: {
      type: String,
      required: true,
      trim: true,
    },
    deliveryArea: {
      type: String,
    },
    deliveryOrPickup: {
      type: String,
      enum: ["delivery", "pickup"],
    },
    orderDetails: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
    },
    eventDate :{
      type: String,
      required: true,
    }
  },
  { timestamps: true },
);

const Leads = mongoose.model("Lead", leadSchema);
export default Leads;
