import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { toast } from "@/hooks/useToast";
import { useConnect } from "wagmi";

export function ConnectActionButton() {
  const connectWallet = async () => {
    try {
      connect({ connector: connectors[0] });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to your wallet. Please try again.",
        variant: "destructive",
      });
    }
  };
  const { connect, connectors, isPending } = useConnect();

  return (
    <Button onClick={connectWallet} disabled={isPending}>
      {isPending ? (
        <>Connecting...</>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
        </>
      )}
    </Button>
  );
}
