import React from "react";
import { WalletSummary } from "../types";
import Chip from "@/components/ui/chip";
import { walletIcons } from "@/config/crypto";
import { WalletName } from "@/types/cryptoTypes";

interface WalletFiltersProps {
  wallets: WalletSummary[];
  selectedWallets: WalletName[];
  onWalletClick: (walletName: WalletName) => void;
}

const WalletFilters: React.FC<WalletFiltersProps> = ({
  wallets,
  selectedWallets,
  onWalletClick,
}) => {
  return (
    <>
      {wallets.map((wallet) => (
        <Chip
          key={wallet.name}
          iconPath={walletIcons[wallet.name]}
          name={wallet.name}
          amount={wallet.dollarValue}
          isSelected={selectedWallets.includes(wallet.name)}
          onClick={() => onWalletClick(wallet.name)}
        />
      ))}
    </>
  );
};

export default WalletFilters;
