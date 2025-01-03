import { createTRPCNext } from "@trpc/next";
import { ssrPrepass } from "@trpc/next/ssrPrepass";
import { loggerLink } from "@trpc/client";
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@CS/server/modules";
import { getTerminatingLink } from "@CS/web/trpc/trpc.helpers";
import SuperJSON from "superjson";
import { inferReactQueryProcedureOptions } from "@trpc/react-query";

export const trpc = createTRPCNext<AppRouter>({
  ssr: true,
  ssrPrepass,
  transformer: SuperJSON,
  config: ({ ctx }) => {
    return {
      links: [
        loggerLink({
          enabled: opts =>
            (process.env.NODE_ENV === "development" && typeof window !== "undefined") ||
            (opts.direction === "down" && opts.result instanceof Error)
        }),
        getTerminatingLink(ctx)
      ],
      /**
       * @link https://tanstack.com/query/v5/docs/reference/QueryClient
       */
      queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } }
    };
  }
});

export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
