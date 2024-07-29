"use client";

import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

// const queryClient = new QueryClient({
//   defaultOptions: { queries: { retry: 5, } },
// });

const queryClient = new QueryClient();

type QueryClientProviderProps = {
  children: React.ReactNode;
};

function QueryClientProvider({ children }: QueryClientProviderProps) {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
}

export default QueryClientProvider;
