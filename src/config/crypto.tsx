import { ChainConfig, ChainId, WalletName } from "@/types/cryptoTypes";
import arbitrum from "../../public/arbitrum.svg";
import etherium from "../../public/etherium.svg";
import optimism from "../../public/optimism.svg";
import balance from "../../public/balance.svg";
import hyperliquid from "../../public/hyperliquid.svg";
import metamask from "../../public/metamask.svg";

export const chainsConfig: Record<ChainId, ChainConfig> = {
  [ChainId.Arbitrum]: {
    id: "0xa4b1",
    iconPath: arbitrum,
    name: "Arbitrum",
  },
  [ChainId.Optimism]: {
    id: "0xa",
    iconPath: optimism,
    name: "Optimism",
  },
  [ChainId.Ethereum]: {
    id: "0x1",
    iconPath: etherium,
    name: "Ethereum",
  },
};

export const walletIcons: Record<WalletName, string> = {
  [WalletName.Total]: balance,
  [WalletName.Metamask]: metamask,
  [WalletName.HyperLiquid]: hyperliquid,
};

export const hyperLiquidInfoApiUrl = "https://api.hyperliquid.xyz/info";

export const ethStableNameToAddress: Record<string, string> = {
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  USDT: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
};
