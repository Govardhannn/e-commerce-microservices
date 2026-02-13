import { subscribeToQueue } from "./broker.js";
import sendEmail from "../email.js";

export default function () {
  subscribeToQueue("AUTH_NOTIFICATION.USER_CREATED", async (data) => {
    console.log("Reseved the data from the Queue", data);


    // here sending mail with user data
    const emailHTMLTemplate = `
        <h1>Welcome to Our Service!</h1>
        <p>Dear ${data.fullName.firstName + " " + (data.fullName.lastName || "")},</p>
        <p>Thank you for registering with us. We're excited to have you on board!</p>
        <p>Best regards,<br/>The Team</p>
        `;
         await sendEmail(data.email, "Welcome to Our Service", "Thank you for registering with us!", emailHTMLTemplate);
  });
}
