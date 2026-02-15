import amqplib from "amqplib";

let channel;
let connection;

// // connection -> represnt the whole RABBIT AMQP - console how thing will work  - like storing the message
// // connection -> it also mean Represent the connction between the Notification service and RabbitMQP
// // channel -> the conncetion between the -> notification service & RabbitMQ -> in both the connction is created ->
// // there we can create a channel , with multiple as well  ( we can use channel for other use for othe channel )- we can increse it
// Connect (Singleton)
export const connect = async () => {
  if (channel) return channel;

  try {
    connection = await amqplib.connect(process.env.RABBIT_URI);
    channel = await connection.createChannel();

    console.log("✅ Connected to RabbitMQ");

    return channel;
  } catch (error) {
    console.error("❌ RabbitMQ connection failed:", error);
    process.exit(1); // fail-fast (senior practice)
  }
};

// Publish
export const publishToQueue = async (queueName, data = {}) => {
  const ch = await connect();

  await ch.assertQueue(queueName, { durable: true });

  ch.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });

  console.log("📨 Message sent:", queueName);
};

// Subscribe
export const subscribeToQueue = async (queueName, callback) => {
  const ch = await connect();

  await ch.assertQueue(queueName, { durable: true });

  ch.consume(queueName, async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());

      await callback(data);

      ch.ack(msg);
    } catch (err) {
      console.error("Consumer error:", err);

      // prevents infinite retry loop
      ch.nack(msg, false, false);
    }
  });

  console.log("👂 Listening to:", queueName);
};
