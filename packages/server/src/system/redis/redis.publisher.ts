import { createClient } from "redis";

export const publisher = await createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_SOCKET_HOST,
    port: Number(process.env.REDIS_SOCKET_PORT)
  }
})
  .on("connect", () => console.log("🔌 - Publisher Connected"))
  .on("ready", () => console.log(`✅ -- Publisher Ready: ${process.env.REDIS_SOCKET_HOST}:${process.env.REDIS_SOCKET_PORT}`))
  .on("reconnecting", () => console.log("🔄 --- Publisher Reconnecting"))
  .on("error", err => console.log(`❌ ---- Publisher Error: ${process.env.REDIS_SOCKET_HOST}:${process.env.REDIS_SOCKET_PORT}`, err))
  .on("end", () => console.log("⛔ ----- Publisher Ended"))
  .connect();
