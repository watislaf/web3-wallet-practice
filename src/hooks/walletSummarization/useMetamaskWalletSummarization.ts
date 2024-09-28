"use client";

import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { MEDIUM_STALE_TIME } from "@/config/other";
import { useErrorToast } from "@/hooks/useErrorToast";
import { fetchMetamaskWalletData } from "@/serverActions/moralis";

export function useMetamaskWalletSummarization(userAddress: Address) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getMetamaskTokens", userAddress],
    queryFn: async () => fetchMetamaskWalletData(userAddress),
    staleTime: MEDIUM_STALE_TIME,
  });

  useErrorToast(error);

  return { isLoading, tokenSummaries: data || [] };
}
