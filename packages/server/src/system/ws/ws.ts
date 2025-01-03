import { applyWSSHandler } from "@trpc/server/adapters/ws";
import { WebSocketServer } from "ws";
import { appRouter } from "@CS/server/src/modules";

const wss = new WebSocketServer({
  port: Number(process.env.WSS_PORT)
});
const handler = applyWSSHandler({
  wss,
  router: appRouter,
  createContext: undefined,
  // Enable heartbeat messages to keep connection open (disabled by default)
  keepAlive: {
    enabled: true,
    // server ping message interval in milliseconds
    pingMs: 30000,
    // connection is terminated if pong message is not received in this many milliseconds
    pongWaitMs: 5000
  }
});

console.log(`🔌 - WebSocket Server listening on ws://localhost:${process.env.WSS_PORT}`);

wss.on("connection", ws => {
  console.log(`✅ -- WebSocket Server Connected (${wss.clients.size})`);
  ws.once("close", () => {
    console.log(`⛔ --- WebSocket Server Disconnected (${wss.clients.size})`);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
