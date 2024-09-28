"use client";
import React, { useState } from "react";
import { walletIcons } from "@/config/crypto";
import Chip from "@/components/ui/chip";
import WalletFilters from "@/app/account/overview/_components/filters/WalletFilters";
import ChainFilters from "@/app/account/overview/_components/filters/ChainFilters";
import WalletTable from "@/app/account/overview/_components/table/WalletTable";
import useWalletSummarization from "@/hooks/walletSummarization/useWalletSummarization";
import { ChainId, WalletName } from "@/types/cryptoTypes";
import { Address } from "viem";

export default function CryptoWallet({ address }: { address: Address }) {
  const [selectedChains, setSelectedChains] = useState<ChainId[]>([]);
  const [selectedWallets, setSelectedWallets] = useState<WalletName[]>([]);
  const {
    totalWalletSummary,
    walletSummaries,
    chainSummaries,
    tokenSummaries,
  } = useWalletSummarization(address as Address);

  const handleChainClick = (chainName: ChainId): void => {
    setSelectedChains((prev) =>
      prev.includes(chainName)
        ? prev.filter((chain) => chain !== chainName)
        : [...prev, chainName],
    );
  };

  const handleWalletClick = (walletName: WalletName): void => {
    setSelectedWallets((prev) =>
      prev.includes(walletName)
        ? prev.filter((wallet) => wallet !== walletName)
        : [...prev, walletName],
    );
  };

  const handleTotalClick = (): void => {
    setSelectedChains([]);
    setSelectedWallets([]);
  };

  const filteredWalletData = tokenSummaries.filter((row) => {
    const chainMatch =
      selectedChains.length === 0 || selectedChains.includes(row.chainId);
    const walletMatch =
      selectedWallets.length === 0 || selectedWallets.includes(row.walletName);
    return chainMatch && walletMatch;
  });

  return (
    <div className="h-full bg-grey-12 text-white">
      <div className="py-4 px-6 bg-grey-11 flex flex-row flex-wrap gap-3">
        <Chip
          iconPath={walletIcons.Total}
          name={totalWalletSummary.name}
          amount={totalWalletSummary.dollarValue}
          isSelected={selectedChains.length + selectedWallets.length === 0}
          onClick={handleTotalClick}
        />
        <WalletFilters
          wallets={walletSummaries}
          selectedWallets={selectedWallets}
          onWalletClick={handleWalletClick}
        />
        <ChainFilters
          chains={chainSummaries}
          selectedChains={selectedChains}
          onChainClick={handleChainClick}
        />
      </div>
      <WalletTable walletData={filteredWalletData} />
    </div>
  );
}
