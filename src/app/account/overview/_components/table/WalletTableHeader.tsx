import React from "react";
import { TableHead, TableRow } from "@/components/ui/table";
import { SortArrow } from "./SortArrow";

interface WalletTableHeaderProps {
  requestSort: (key: "percentage" | "balance") => void;
  sortConfig: { key: string; direction: string } | null;
}

export const WalletTableHeader: React.FC<WalletTableHeaderProps> = ({
  requestSort,
  sortConfig,
}) => (
  <TableRow className="border-t border-t-grey-10 border-b-grey-11 cursor-default bg-grey-11 hover:bg-grey-11">
    <TableHead>Wallet</TableHead>
    <TableHead
      className="cursor-pointer"
      onClick={() => requestSort("percentage")}
    >
      <div className="flex gap-2 items-center">
        <span className="inline-flex gap-2 items-center rounded-full bg-grey-10 px-2 py-1 text-xs font-medium text-grey-5">
          100% <SortArrow sortKey="percentage" sortConfig={sortConfig} />
        </span>
      </div>
    </TableHead>
    <TableHead className="px-0"></TableHead>
    <TableHead>Chain</TableHead>
    <TableHead>Asset</TableHead>
    <TableHead className="px-0"></TableHead>
    <TableHead
      className="cursor-pointer"
      onClick={() => requestSort("balance")}
    >
      <div className="flex gap-2 items-center">
        <div>Balance</div>
        <SortArrow sortKey="balance" sortConfig={sortConfig} />
      </div>
    </TableHead>
    <TableHead>Transfer</TableHead>
  </TableRow>
);
