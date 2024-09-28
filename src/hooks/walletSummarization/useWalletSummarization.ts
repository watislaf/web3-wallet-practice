import { chainsConfig } from "@/config/crypto";
import { useMetamaskWalletSummarization } from "./useMetamaskWalletSummarization";
import type { Address } from "viem";
import { useHyperLiquidBalance } from "@/hooks/walletSummarization/useHyperliquidWalletSummarization";
import {
  ChainSummary,
  TokenSummary,
  WalletSummary,
} from "@/app/account/overview/_components/types";
import { ChainId, WalletName } from "@/types/cryptoTypes";

const sumTokenValues = (tokens: TokenSummary[]) =>
  tokens.reduce((total, { dollarValue }) => total + dollarValue, 0);

const addPercentageToTokens = (tokens: TokenSummary[], totalValue: number) =>
  tokens.map((token) => ({
    ...token,
    percentage: (token.dollarValue / totalValue) * 100,
  }));

const summarizeChainData = (tokens: TokenSummary[]) =>
  Object.entries(chainsConfig).map(([chainId, { iconPath }]) => ({
    id: chainId as ChainId,
    dollarValue: tokens.reduce(
      (total, { chainId: tokenChainId, dollarValue }) =>
        tokenChainId === chainId ? total + dollarValue : total,
      0,
    ),
    iconPath,
  })) as ChainSummary[];

const createWalletSummary = (
  name: WalletName,
  dollarValue: number,
): WalletSummary => ({
  name,
  dollarValue,
});

export default function useWalletSummarization(userAddress: Address) {
  const { tokenSummaries: metamaskTokens, isLoading: isLoadingMetamask } =
    useMetamaskWalletSummarization(userAddress);
  const { tokenSummaries: hyperliquidTokens, isLoading: isLoadingHyperliquid } =
    useHyperLiquidBalance(userAddress);
  const metamaskTotal = sumTokenValues(metamaskTokens);
  const hyperliquidTotal = sumTokenValues(hyperliquidTokens);
  const totalBalance = metamaskTotal + hyperliquidTotal;

  const allTokens = [...metamaskTokens, ...hyperliquidTokens];

  return {
    totalWalletSummary: createWalletSummary(WalletName.Total, totalBalance),
    isLoading: isLoadingMetamask || isLoadingHyperliquid,
    tokenSummaries: addPercentageToTokens(allTokens, totalBalance),
    chainSummaries: summarizeChainData(allTokens),
    walletSummaries: [
      createWalletSummary(WalletName.Metamask, metamaskTotal),
      createWalletSummary(WalletName.HyperLiquid, hyperliquidTotal),
    ] as WalletSummary[],
  };
}
