require("dotenv").config();
import { createClient } from "redis";

export const redis = createClient({ url: process.env.REDIS_URL });

async () => {
  try {
    await redis.connect();
    console.log("Redis Connected");
  } catch (error) {
    console.error("Redis Connection Error:", error);
  }
};
