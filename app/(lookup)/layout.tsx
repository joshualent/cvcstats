"use client";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function LookupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({});
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>...</>}>{children}</Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
