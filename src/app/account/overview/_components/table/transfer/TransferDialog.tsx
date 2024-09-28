import React, { ReactNode, useState } from "react";
import {
  useAccount,
  useSendTransaction,
  useSwitchChain,
  useWriteContract,
} from "wagmi";
import { Address, parseEther } from "viem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TokenSummary } from "@/app/account/overview/_components/types";
import { convertFloatStringToBigInt, getChainIdNumber } from "@/lib/utils";
import { TransferForm } from "@/app/account/overview/_components/table/transfer/TransferForm";

export function TransferDialog({
  children,
  row,
}: {
  children: ReactNode;
  row: TokenSummary;
}) {
  const [inputError, setInputError] = useState("");
  const { chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const rowChainId = getChainIdNumber(row.chainId);

  const {
    sendTransaction,
    error: sendError,
    isPending: isSendLoading,
    isSuccess: isSendSuccess,
  } = useSendTransaction();
  const {
    writeContract,
    error: writeError,
    isPending: isWritePending,
    isSuccess: isWriteSuccess,
  } = useWriteContract();

  const loading = isSendLoading || isWritePending;
  const success = isSendSuccess || isWriteSuccess;
  const error = sendError?.message || writeError?.message || inputError;

  const handleSubmit = (address: string, amount: string) => {
    setInputError("");

    if (!address.startsWith("0x") || address.length !== 42) {
      setInputError(
        "Address must start with 0x and be exactly 42 characters long",
      );
      return;
    }

    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0 || amountNum >= row.balance) {
      setInputError(
        `Amount must be greater than 0 and less than ${row.balance}`,
      );
      return;
    }

    if (row.isNative) {
      sendTransaction({
        to: address as Address,
        value: parseEther(amount),
        chainId: rowChainId,
      });
    } else {
      writeContract({
        address: row.tokenAddress!,
        functionName: "transfer",
        chainId: rowChainId,
        abi: [
          {
            inputs: [
              { internalType: "address", name: "recipient", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" },
            ],
            name: "transfer",
            outputs: [{ internalType: "bool", name: "", type: "bool" }],
            stateMutability: "nonpayable",
            type: "function",
          },
        ],
        args: [
          address as Address,
          convertFloatStringToBigInt(amount, row.decimals!),
        ],
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] text-grey-5 bg-grey-10 border-0">
        <DialogHeader>
          <DialogTitle>Transfer tokens</DialogTitle>
          <DialogDescription>
            You are going to transfer {row.isNative && "native"} tokens.
          </DialogDescription>
        </DialogHeader>
        {chainId !== rowChainId ? (
          <Button
            disabled={loading}
            onClick={() => switchChain({ chainId: rowChainId })}
            type="submit"
          >
            Switch chain
          </Button>
        ) : success ? (
          <p className="text-sm text-green-500 mt-2">
            Transaction submitted successfully!
          </p>
        ) : (
          <TransferForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
