import { subscribeToQueue } from "./broker.js";
import sendEmail from "../email.js";

export default function () {
  subscribeToQueue("AUTH_NOTIFICATION.USER_CREATED", async (data) => {
    console.log("Reseved the data from the Queue", data);

    // here sending mail with user data      ---- For------ Auth-Services----
    const emailHTMLTemplate = `
        <h1>Welcome to Our Service!</h1>
        <p>Dear ${data.fullName.firstName + " " + (data.fullName.lastName || "")},</p>
        <p>Thank you for registering with us. We're excited to have you on board!</p>
        <p>Best regards,<br/>The Team</p>
        `;
    await sendEmail(
      data.email,
      "Welcome to Our Service",
      "Thank you for registering with us!",
      emailHTMLTemplate,
    );
  });

  /// This form the Payment services is Payment is Success Or Fails

  subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED", async (data) => {
    const emailHTMLTemplate = `
        <h1>Payment Successful!</h1>
        <p>Dear ${data.username},</p>
        <p>We have received your payment of ${data.currency} ${data.amount} for the order ID: ${data.orderId}.</p>
        <p>Thank you for your purchase!</p>
        <p>Best regards,<br/>The Team</p>
        `;
    await sendEmail(
      data.email,
      "Payment Successful",
      "We have received your payment",
      emailHTMLTemplate,
    );
  });

  // If Payment is Fails - the Email will send from here ---- Payemnt-Fails -------

  subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED", async (data) => {
    const emailHTMLTemplate = `
        <h1>Payment Failed</h1>
        <p>Dear ${data.username},</p>
        <p>Unfortunately, your payment for the order ID: ${data.orderId} has failed.</p>
        <p>Please try again or contact support if the issue persists.</p>
        <p>Best regards,<br/>The Team</p>
        `;
    await sendEmail(
      data.email,
      "Payment Failed",
      "Your payment could not be processed",
      emailHTMLTemplate,
    );
  });
}
