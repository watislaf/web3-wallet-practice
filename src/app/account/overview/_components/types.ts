import { ChainId, WalletName } from "@/types/cryptoTypes";
import { Address } from "viem";

export interface WalletSummary {
  name: WalletName;
  dollarValue: number;
}

export interface DisplayedChains {
  id: ChainId;
  dollarValue: number;
  iconPath: string;
}

export interface TokenSummary {
  walletName: WalletName;
  percentage?: number;
  chainId: ChainId;
  tokenAddress?: Address;
  assetName: string;
  balance: number;
  dollarValue: number;
  logo?: string;
  isNative?: boolean;
  decimals?: number;
}

export interface ChainSummary {
  id: ChainId;
  dollarValue: number;
  iconPath: string;
}
