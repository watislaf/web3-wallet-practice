import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const TransferForm: React.FC<{
  onSubmit: (address: string, amount: string) => void;
  loading: boolean;
  error: string | undefined;
}> = ({ onSubmit, loading, error }) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(address, amount);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="address">User Address</Label>
        <Input
          id="address"
          value={address}
          disabled={loading}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          disabled={loading}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          step="0.01"
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
      <Button disabled={loading} onClick={handleSubmit} type="submit">
        {loading ? "Loading..." : "Transfer"}
      </Button>
    </>
  );
};
