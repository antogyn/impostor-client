import { Client, fetchExchange, subscriptionExchange } from "urql";
import { createClient as createWSClient } from "graphql-ws";
import { cacheExchange } from "@urql/exchange-graphcache";

const wsClient = createWSClient({
  url: "wss://impostor-server.fly.dev/graphql",
  shouldRetry: () => true,
  retryAttempts: Number.POSITIVE_INFINITY,
  retryWait: async (totalAttempts) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.max(0.1 * (2 ** totalAttempts - 1), 2))
    );
  },
});

export const graphqlClient = new Client({
  url: "https://impostor-server.fly.dev/graphql",
  exchanges: [
    cacheExchange({}),
    fetchExchange,
    subscriptionExchange({
      forwardSubscription(request) {
        const input = { ...request, query: request.query || "" };
        return {
          subscribe(sink) {
            const unsubscribe = wsClient.subscribe(input, sink);
            return { unsubscribe };
          },
        };
      },
    }),
  ],
});
