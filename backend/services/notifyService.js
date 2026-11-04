import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.SENDER_PASSWORD,
    },
  });

export async function notifyHumanService(
  reason,
  summary,
  customerName,
  customerPhoneNo,
) {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: reason,
    text: `
     Reason: ${reason}

     Summary: ${summary}

     Customer Phone: ${customerPhoneNo}
     Customer Name: ${customerName}
`,
  };

  async function sendEmailToHuman() {
      try {
        await transporter.verify();
      const emailInfo = await transporter.sendMail(mailOptions);
      console.log("email has been sent successfully!");
      return emailInfo;
    } catch (e) {
      console.log(`Error message : ${e.message}`);
      throw e;
    }
  }
  return await sendEmailToHuman();
}

export async function notifyNewLeads(
        customerName,
        customerPhoneNo,
        deliveryArea,
        deliveryOrPickup,
        orderDetails,
        guestCount,
        eventDate,) {

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: process.env.RECIPIENT_EMAIL,
    subject: "New Order Leads for Chef Noor",
    text: `
    Customer Name: ${customerName}
    Customer Phone: ${customerPhoneNo}
    Delivery Area: ${deliveryArea || "Not provided"}
    Delivery Or Pickup: ${deliveryOrPickup || "Not provided"}
    Details of Order: ${orderDetails}
    Guests Count: ${guestCount || "Not provided"}
    Event's date: ${eventDate}
`,
  };
   async function sendLeadsToHuman() {
      try {
        await transporter.verify();
      const emailInfo = await transporter.sendMail(mailOptions);
      console.log("Leads have been sent successfully to the Chef!");
      return emailInfo;
    } catch (e) {
      console.log(`Error message : ${e.message}`);
      throw e;
    }
  }
  return await sendLeadsToHuman();
  
}


