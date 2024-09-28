import React, { Fragment } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TokenSummary } from "../types";
import { AssetIcon, ChainIcon, WalletIcon } from "./TableIcons";
import { TransferDialog } from "@/app/account/overview/_components/table/transfer/TransferDialog";
import { WalletName } from "@/types/cryptoTypes";

interface WalletTableRowProps {
  row: TokenSummary;
  isSmallScreen: boolean;
  isSuperSmallScreen: boolean;
}

function isTransactional(row: TokenSummary) {
  return (
    row.walletName === WalletName.Metamask && row.tokenAddress !== undefined
  );
}

export const WalletTableRow: React.FC<WalletTableRowProps> = ({
  row,
  isSmallScreen,
  isSuperSmallScreen,
}) => (
  <Fragment>
    <TableRow className="group">
      <TableCell className="text-grey-5 group-hover:text-grey-1 font-medium">
        <WalletIcon
          walletName={row.walletName}
          makeNameShorter={isSmallScreen}
          hideName={isSuperSmallScreen}
        />
      </TableCell>
      <TableCell>
        <span className="inline-flex items-center rounded-full bg-grey-11 group-hover:bg-grey-9 group-hover:text-grey-1 px-2 py-1 text-xs font-medium text-grey-5">
          {row.percentage?.toFixed(2)}%
        </span>
      </TableCell>
      <TableCell className="px-0"></TableCell>
      <TableCell>
        <ChainIcon
          chainId={row.chainId}
          makeNameShort={isSmallScreen}
          hideName={isSuperSmallScreen}
        />
      </TableCell>
      <TableCell>
        <AssetIcon
          assetName={row.assetName}
          logo={row.logo}
          hideAssetName={isSuperSmallScreen}
        />
      </TableCell>
      <TableCell className="px-0"></TableCell>
      <TableCell>
        {row.balance?.toFixed(4) || "??"} {row.assetName}
        <div className="text-sm text-grey-5">${row.dollarValue.toFixed(4)}</div>
      </TableCell>
      <TableCell>
        {isTransactional(row) && (
          <TransferDialog row={row}>
            <Button variant="simple" size="sm">
              Transfer
            </Button>
          </TransferDialog>
        )}
      </TableCell>
    </TableRow>
    <TableRow className="hover:bg-grey-12">
      <TableCell colSpan={8}>
        <hr className="my-0.1 h-0.5 border-t-0 bg-grey-10 " />
      </TableCell>
    </TableRow>
  </Fragment>
);
