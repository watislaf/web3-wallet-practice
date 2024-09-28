import Chip from "@/components/ui/chip";
import ConnectButton from "@/components/header/ConnectButton";
import React from "react";
import wallet from "../../../../../../public/wallet.svg";

export default function UnreachableWallet() {
  return (
    <div className="h-full bg-grey-12 text-white">
      <div className="py-4 px-6 bg-grey-11 flex flex-row flex-wrap gap-3">
        <Chip iconPath={wallet} name="Balance" isSelected={false} />
      </div>

      <div className="py-10 w-full">
        <ConnectButton className="justify-center" />
      </div>
    </div>
  );
}
