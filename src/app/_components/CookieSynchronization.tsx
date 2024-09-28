import { useAccount } from "wagmi";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

export function CookieSynchronization() {
  const { address } = useAccount();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie, unsetCookie] = useCookies(["address"]);

  useEffect(() => {
    if (address === undefined) unsetCookie("address");
    else setCookie("address", address);
  }, [address, setCookie, unsetCookie]);

  return <></>;
}
