"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { walletIcons } from "@/config/crypto";
import { Copy, LogOut } from "lucide-react";
import React from "react";
import useWalletSummarization from "@/hooks/walletSummarization/useWalletSummarization";
import { toast } from "@/hooks/useToast";
import { useDisconnect } from "wagmi";
import { Address } from "viem";
import { WalletName } from "@/types/cryptoTypes";
import Image from "next/image";
import icon from "../../../public/metamask.svg";

export default function LoggedInUserButtons({ address }: { address: Address }) {
  const { totalWalletSummary, isLoading } = useWalletSummarization(address);
  const { disconnect, isPending: isDisconnecting } = useDisconnect();

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard.",
      });
    }
  };

  const logout = () => {
    disconnect();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="p-2" disabled={isLoading}>
            <div className="mr-2">
              <Image src={walletIcons[WalletName.Total]} alt={"wallet"} />
            </div>
            {isLoading
              ? "Loading..."
              : `$${totalWalletSummary.dollarValue.toFixed(2)}`}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 mt-1 bg-grey-10 p-3 border-0 flex gap-2 flex-col"
          align="start"
        >
          <div className="flex flex-row justify-between items-center">
            <Image width={35} height={35} src={icon} alt="MetamaskIcon" />
            <span className="text-grey-4">{`${address?.slice(0, 6)}...${address?.slice(-5)}`}</span>
            <Copy
              onClick={copyAddress}
              color={"#8F7DF8"}
              fill={"#8F7DF8"}
              className="mr-2 h-4 w-4"
            />
          </div>
          <Button className="w-full" variant="shiny" onClick={logout}>
            Disconnect
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        onClick={logout}
        className="content-center"
        disabled={isDisconnecting}
      >
        {isDisconnecting ? (
          "Disconnecting..."
        ) : (
          <>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </>
        )}
      </Button>
    </>
  );
}
