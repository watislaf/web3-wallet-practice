"use server";

import Moralis from "moralis";
import { Address } from "viem";
import { ChainId } from "@/types/cryptoTypes";

let isMoralisInitialized = false;

async function initializeMoralis() {
  if (!isMoralisInitialized) {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    isMoralisInitialized = true;
  }
}

export async function fetchTokensForChains(
  address: Address,
  chains: ChainId[],
) {
  await initializeMoralis();

  return await Promise.all(
    chains.map(async (chain) => {
      const response = await Moralis.EvmApi.wallets.getWalletTokenBalancesPrice(
        {
          chain,
          address,
        },
      );
      return {
        chainId: chain,
        tokens: response.result
          .map((token) => ({
            assetName: token.symbol,
            balance: Number(token.balanceFormatted),
            logo: token.logo,
            dollarValue: token.usdValue,
            tokenAddress: token.tokenAddress?.lowercase as Address,
            isNative: token.nativeToken,
            decimals: token.decimals,
          }))
          .filter((t) => !!t.dollarValue),
      };
    }),
  );
}

export async function getMultipleTokenPrices(
  tokenAddresses: string[],
  chain: string = ChainId.Ethereum,
) {
  await initializeMoralis();

  const tokensPrices = await Moralis.EvmApi.token.getMultipleTokenPrices(
    { chain },
    { tokens: tokenAddresses.map((address) => ({ tokenAddress: address })) },
  );

  return tokensPrices.result;
}
