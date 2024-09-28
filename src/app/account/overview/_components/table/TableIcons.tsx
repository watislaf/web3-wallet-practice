import React from "react";
import Image from "next/image";
import { chainsConfig, walletIcons } from "@/config/crypto";
import { ChainId, WalletName } from "@/types/cryptoTypes";
import { shortenName } from "@/lib/utils";

export const WalletIcon: React.FC<{
  walletName: WalletName;
  makeNameShorter: boolean;
  hideName: boolean;
}> = ({ walletName, makeNameShorter, hideName }) => {
  const iconPath = walletIcons[walletName];
  return (
    <div className="flex items-center">
      {iconPath ? (
        <Image src={iconPath} alt="Wallet" width={24} height={24} />
      ) : (
        <span>❓</span>
      )}
      {!hideName && (
        <span className="ml-2">
          {makeNameShorter ? shortenName(walletName, 3) : walletName}
        </span>
      )}
    </div>
  );
};

export const ChainIcon: React.FC<{
  chainId: ChainId;
  makeNameShort?: boolean;
  hideName?: boolean;
}> = ({ chainId, makeNameShort = false, hideName = false }) => {
  const chainConfig = chainsConfig[chainId];
  return (
    <div className="flex items-center">
      {chainConfig?.iconPath ? (
        <Image src={chainConfig.iconPath} alt="Chain" width={24} height={24} />
      ) : (
        <span>❓</span>
      )}
      {!hideName && chainConfig && (
        <span className="ml-2">
          {makeNameShort ? shortenName(chainConfig.name, 3) : chainConfig.name}
        </span>
      )}
    </div>
  );
};

export const AssetIcon: React.FC<{
  assetName: string;
  logo?: string;
  hideAssetName?: boolean;
}> = ({ assetName, logo, hideAssetName = false }) => (
  <div className="flex items-center">
    {logo ? (
      <Image
        src={logo}
        loading="eager"
        width={20}
        height={20}
        alt={assetName}
      />
    ) : (
      <span>❓</span>
    )}
    {!hideAssetName && <span className="ml-2">{assetName}</span>}
  </div>
);
