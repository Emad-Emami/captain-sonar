import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";

const t = initTRPC.create({
  /**
   * @link https://trpc.io/docs/v11/data-transformers
   */
  transformer: SuperJSON,
  /**
   * @link https://trpc.io/docs/v11/error-formatting
   */
  errorFormatter({ shape }) {
    return shape;
  }
});
export const config = t._config;
export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const middleware = t.middleware;
export const createCallerFactory = t.createCallerFactory;
export const publicProcedure = t.procedure;
