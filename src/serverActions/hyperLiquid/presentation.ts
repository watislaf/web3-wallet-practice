import { TokenSummary } from "@/app/account/overview/_components/types";
import { ChainId, WalletName } from "@/types/cryptoTypes";
import { fetchHyperLiquidBalance } from "@/serverActions/hyperLiquid/actions";
import { Address } from "viem";

type HyperLiquidTokens = Awaited<ReturnType<typeof fetchHyperLiquidBalance>>;

function transformHyperLiquidData(tokens: HyperLiquidTokens): TokenSummary[] {
  return tokens.map((token) => ({
    walletName: WalletName.HyperLiquid,
    chainId: ChainId.Ethereum,
    ...token,
  }));
}

export const fetchHyperLiquidWalledData = (userAddress: Address) =>
  fetchHyperLiquidBalance(userAddress).then(transformHyperLiquidData);
