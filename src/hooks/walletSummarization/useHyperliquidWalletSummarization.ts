import { Address } from "viem";
import { useQuery } from "@tanstack/react-query";
import { MEDIUM_STALE_TIME } from "@/config/other";
import { useErrorToast } from "@/hooks/useErrorToast";
import { fetchHyperLiquidWalledData } from "@/serverActions/hyperLiquid";

export function useHyperLiquidBalance(userAddress: Address) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getHyperLiquidTokens", userAddress],
    queryFn: () => fetchHyperLiquidWalledData(userAddress),
    staleTime: MEDIUM_STALE_TIME,
  });
  useErrorToast(error);

  return { isLoading, tokenSummaries: data || [] };
}
