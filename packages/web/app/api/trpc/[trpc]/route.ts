import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { appRouter, AppRouter } from "@CS/server/modules";

export function GET(req: NextRequest) {
  return fetchRequestHandler<AppRouter>({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error }) => {
      console.error(error);
    }
  });
}

export function POST(req: NextRequest) {
  return fetchRequestHandler<AppRouter>({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    onError: ({ error }) => {
      console.error(error);
    }
  });
}
