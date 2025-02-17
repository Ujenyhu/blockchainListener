require("dotenv").config();
import amqp from "amqplib";

const DEPOSIT_QUEUE = "deposit_events";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(`${process.env.RABBITMQ_URL}`);
  channel = await connection.createChannel();
  await channel.assertQueue(DEPOSIT_QUEUE, { durable: true });
};

// export const publishDepositEvent = (eventMessage: object) => {
//   if (channel) {
//     channel.sendToQueue(
//       DEPOSIT_QUEUE,
//       Buffer.from(JSON.stringify(eventMessage)),
//       {
//         persistent: true,
//       }
//     );
//   }
// };
