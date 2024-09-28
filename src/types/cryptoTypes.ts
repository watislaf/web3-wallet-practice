export enum WalletName {
  Total = "Total",
  Metamask = "Metamask",
  HyperLiquid = "HyperLiquid",
}

export enum ChainId {
  Arbitrum = "0xa4b1",
  Optimism = "0xa",
  Ethereum = "0x1",
}

export type ChainConfig = {
  iconPath: string;
  id: string;
  name: string;
};
