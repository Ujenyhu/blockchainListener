import amqp from "amqplib";
import VarHelper from "../helpers/varHelper";

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  const connection = await amqp.connect(`${process.env.RABBITMQ_URL}`);
  channel = await connection.createChannel();

  await channel.assertExchange("DepositExchange", "direct", { durable: true });

  await channel.assertQueue(VarHelper.QueueNames.DEPOSIT_ETH_NATIVE, {
    durable: true,
  });
  await channel.assertQueue(VarHelper.QueueNames.DEPOSIT_ETH_USDT, {
    durable: true,
  });
  await channel.assertQueue(VarHelper.QueueNames.DEPOSIT_ETH_USDC, {
    durable: true,
  });

  await channel.bindQueue(
    VarHelper.QueueNames.DEPOSIT_ETH_NATIVE,
    "DepositExchange",
    VarHelper.QueueRoutingKeys.ETH_NATIVE_KEY
  );

  await channel.bindQueue(
    VarHelper.QueueNames.DEPOSIT_ETH_USDT,
    "DepositExchange",
    VarHelper.QueueRoutingKeys.ETH_USDT_KEY
  );

  await channel.bindQueue(
    VarHelper.QueueNames.DEPOSIT_ETH_USDC,
    "DepositExchange",
    VarHelper.QueueRoutingKeys.ETH_USDC_KEY
  );
};

export const publishDepositEvent = async (
  eventMessage: object,
  routingKey: string
) => {
  if (channel) {
    await channel.publish(
      "depositExchange",
      routingKey,
      Buffer.from(JSON.stringify(eventMessage)),
      { persistent: true }
    );
  }
};
