import React, { FC } from "react";
import { DisplayedChains } from "../types";
import Chip from "@/components/ui/chip";

import { ChainId } from "@/types/cryptoTypes";
import { chainsConfig } from "@/config/crypto";

interface ChainFiltersProps {
  chains: DisplayedChains[];
  selectedChains: ChainId[];
  onChainClick: (chainName: ChainId) => void;
}

const ChainFilters: FC<ChainFiltersProps> = ({
  chains,
  selectedChains,
  onChainClick,
}) => {
  return (
    <>
      {chains.map((chain) => (
        <Chip
          key={chain.id}
          iconPath={chain.iconPath}
          name={chainsConfig[chain.id].name}
          amount={chain.dollarValue}
          isSelected={selectedChains.includes(chain.id)}
          onClick={() => onChainClick(chain.id)}
        />
      ))}
    </>
  );
};

export default ChainFilters;
