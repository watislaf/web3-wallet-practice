"use client";
import { useAccount } from "wagmi";
import { cn } from "@/lib/utils";
import LoggedInUserButtons from "@/components/header/LoggedInUserButtons";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { ConnectActionButton } from "@/components/header/ConnectActionButton";

export default function ConnectButton({ className }: { className?: string }) {
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, unsetCookie] = useCookies(["address"]);

  useEffect(() => {
    if (address === undefined) unsetCookie("address");
    else setCookie("address", address);
  }, [address, setCookie, unsetCookie]);

  return (
    <div className={cn(className, "flex items-center space-x-4")}>
      {address === undefined ? (
        <ConnectActionButton />
      ) : (
        <LoggedInUserButtons address={address} />
      )}
    </div>
  );
}
