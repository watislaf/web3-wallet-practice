import { fetchTokensForChains } from "@/serverActions/moralis/moralisActions";
import { TokenSummary } from "@/app/account/overview/_components/types";
import { ChainId, WalletName } from "@/types/cryptoTypes";
import { Address } from "viem";
import { chainsConfig } from "@/config/crypto";

type MetamaskTokens = Awaited<ReturnType<typeof fetchTokensForChains>>;

function transformTokenData(chainTokens: MetamaskTokens): TokenSummary[] {
  return chainTokens.flatMap(({ chainId, tokens }) =>
    tokens.map((token) => ({
      walletName: WalletName.Metamask,
      chainId,
      ...token,
    })),
  );
}

const supportedChainId = Object.values(chainsConfig).map(
  (chain) => chain.id as ChainId,
);

export const fetchMetamaskWalletData = (userAddress: Address) =>
  fetchTokensForChains(userAddress, supportedChainId).then(transformTokenData);
