import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ChainId } from "@/types/cryptoTypes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenName = (name: string, maxLength: number): string => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength);
};

export const getChainIdNumber = (chain: ChainId): 1 | 10 | 42161 => {
  switch (chain) {
    case ChainId.Ethereum:
      return 1;
    case ChainId.Optimism:
      return 10;
    case ChainId.Arbitrum:
      return 42161;
  }
};

export const convertFloatStringToBigInt = (
  floatStr: string,
  decimals: number,
) => {
  const [integerPart, fractionalPart = ""] = floatStr.split(".");
  const fullNumberStr = integerPart + fractionalPart.padEnd(decimals, "0");
  return BigInt(fullNumberStr.slice(0, integerPart.length + decimals));
};
