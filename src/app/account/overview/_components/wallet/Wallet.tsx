"use client";
import { useAccount } from "wagmi";
import HidderWallet from "@/app/account/overview/_components/wallet/UnreachableWallet";
import LoggedInWallet from "@/app/account/overview/_components/wallet/CryptoWallet";

export const Wallet = () => {
  const { address } = useAccount();
  if (address === undefined) return <HidderWallet />;
  return <LoggedInWallet address={address} />;
};
