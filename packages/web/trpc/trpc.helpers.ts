import { createWSClient, httpBatchLink, TRPCLink, wsLink, splitLink } from "@trpc/client";
import { NextPageContext } from "next";
import type { AppRouter } from "@CS/server/modules";
import SuperJSON from "superjson";

export const getTerminatingLink = (ctx: NextPageContext | undefined): TRPCLink<AppRouter> => {
  return splitLink({
    condition: op => {
      return op.type === "subscription";
    },
    true: wsLink({
      client: createWSClient({
        url: process.env.WSS_URL! + ":" + process.env.WSS_PORT!
      }),
      /**
       * @link https://trpc.io/docs/v11/data-transformers
       */
      transformer: SuperJSON
    }),
    false: httpBatchLink({
      url: "/api/trpc",
      transformer: SuperJSON,
      headers() {
        if (!ctx?.req?.headers) {
          return {};
        }
        // on ssr, forward client's headers to the server
        return {
          ...ctx.req.headers,
          "x-ssr": "1"
        };
      }
    })
  });
};
