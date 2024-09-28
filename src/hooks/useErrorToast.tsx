"use client";
import { useEffect, useRef } from "react";
import { toast } from "@/hooks/useToast";

export const useErrorToast = (error: unknown) => {
  const toastSent = useRef(false);
  useEffect(() => {
    if (error) {
      if (!toastSent) {
        toast({
          title: "Error",
          description:
            "Failed to fetch Metamask tokens. Please try again later.",
          variant: "destructive",
        });
      }
      console.error(error);
      toastSent.current = true;
    } else {
      toastSent.current = false;
    }
  }, [error]);
};
