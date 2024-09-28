import { cookies } from "next/headers";
import { isAddress } from "viem";

export function getAddress() {
  const address = cookies().get("address")?.value;
  if (!address) return undefined;
  if (isAddress(address)) return address;
  return undefined;
}
