"use server";

import { z } from "zod";
import { ethStableNameToAddress, hyperLiquidInfoApiUrl } from "@/config/crypto";
import { getMultipleTokenPrices } from "@/serverActions/moralis/moralisActions";
import { Address } from "viem";

const balanceSchema = z.object({
  coin: z.string(),
  token: z.number(),
  hold: z.string(),
  total: z.string(),
  entryNtl: z.string(),
});

const responseSchema = z.object({
  balances: z.array(balanceSchema),
});

async function fetchHyperLiquidBalances(address: Address) {
  const requestBody = {
    type: "spotClearinghouseState",
    user: address,
  };
  const response = await fetch(hyperLiquidInfoApiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.json();
  return responseSchema.parse(responseData).balances;
}

export async function fetchHyperLiquidBalance(address: Address) {
  const balances = await fetchHyperLiquidBalances(address);

  const tokenAddresses = balances
    .map((balance) => ethStableNameToAddress[balance.coin])
    .filter((address) => !!address);

  const tokenPrices = await getMultipleTokenPrices(tokenAddresses);

  const mergedBalancesWithPrices = balances.map((balance) => ({
    ...balance,
    ...tokenPrices.find((token) => token.tokenSymbol === balance.coin),
  }));

  return mergedBalancesWithPrices
    .map((balance) => ({
      assetName: balance.coin,
      balance: Number(balance.total),
      dollarValue: (balance?.usdPrice || 0) * Number(balance.total),
      logo: balance.tokenLogo,
    }))
    .filter((token) => token.dollarValue > 0);
}
