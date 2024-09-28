"use client";

import { WagmiProvider } from "wagmi";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

import { wagmi } from "@/config/wagmi";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useState } from "react";
import { CookieSynchronization } from "@/app/_components/CookieSynchronization";

const localStoragePersistor = createSyncStoragePersister({
  storage: typeof window !== "undefined" ? window.localStorage : undefined,
});

export default function ClientSideWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1_000 * 60 * 60 * 24,
          },
        },
      }),
  );
  return (
    <WagmiProvider config={wagmi}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: localStoragePersistor,
        }}
      >
        {children}
        <CookieSynchronization />
      </PersistQueryClientProvider>
    </WagmiProvider>
  );
}
