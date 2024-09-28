import React, { useEffect, useState } from "react";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import { TokenSummary } from "../types";
import { WalletTableHeader } from "./WalletTableHeader";
import { WalletTableRow } from "./WalletTableRow";
import useSortableData from "../hooks/useSortableData";

interface WalletTableProps {
  walletData?: TokenSummary[];
}

const WalletTable: React.FC<WalletTableProps> = ({ walletData }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSuperSmallScreen, setIsSuperSmallScreen] = useState(false);
  const { sortedItems, requestSort, sortConfig } = useSortableData(walletData);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1568);
      setIsSuperSmallScreen(window.innerWidth <= 1080);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Table>
      <TableHeader>
        <WalletTableHeader requestSort={requestSort} sortConfig={sortConfig} />
      </TableHeader>
      <TableBody>
        {sortedItems.map((row) => (
          <WalletTableRow
            key={`${row.chainId}-${row.assetName}`}
            row={row}
            isSmallScreen={isSmallScreen}
            isSuperSmallScreen={isSuperSmallScreen}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default WalletTable;
