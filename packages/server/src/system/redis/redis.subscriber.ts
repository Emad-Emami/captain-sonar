import { createClient } from "redis";

export const subscriber = await createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_SOCKET_HOST,
    port: Number(process.env.REDIS_SOCKET_PORT)
  }
})
  .on("connect", () => console.log("🔌 - Subscriber Connected"))
  .on("ready", () => console.log(`✅ -- Subscriber Ready ${process.env.REDIS_SOCKET_HOST}:${process.env.REDIS_SOCKET_PORT}`))
  .on("reconnecting", () => console.log("🔄 --- Subscriber Reconnecting"))
  .on("error", err => console.log(`❌ ---- Subscriber Error: ${process.env.REDIS_SOCKET_HOST}:${process.env.REDIS_SOCKET_PORT}`, err))
  .on("end", () => console.log("⛔ ----- Subscriber Ended"))
  .connect();
