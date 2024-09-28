import React, { cache } from "react";
import { Wallet } from "@/app/account/overview/_components/wallet/Wallet";
import { getAddress } from "@/lib/server/utils";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchHyperLiquidWalledData } from "@/serverActions/hyperLiquid";
import { fetchMetamaskWalletData } from "@/serverActions/moralis";
import { MEDIUM_STALE_TIME } from "@/config/other";

const queryClient = cache(() => new QueryClient());

export default async function Page() {
  const address = getAddress();

  if (address === undefined) return <Wallet />;

  await Promise.all([
    queryClient().prefetchQuery({
      queryKey: ["getHyperLiquidTokens", address],
      queryFn: () => fetchHyperLiquidWalledData(address),
      staleTime: MEDIUM_STALE_TIME,
    }),

    queryClient().prefetchQuery({
      queryKey: ["getMetamaskTokens", address],
      queryFn: async () => fetchMetamaskWalletData(address),
      staleTime: MEDIUM_STALE_TIME,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient())}>
      <Wallet />
    </HydrationBoundary>
  );
}
