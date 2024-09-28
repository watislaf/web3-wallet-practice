"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ActiveLinkProps {
  href: string;
  children: React.ReactNode;
  iconPath: string;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  href,
  children,
  iconPath,
}) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <a
      href={href}
      className={cn("hover:text-gray-300 flex items-center gap-1", {
        "text-noname-8F7D": isActive,
      })}
    >
      {isActive && <Image src={iconPath} alt={"Active link"} />}
      {children}
    </a>
  );
};

export default ActiveLink;
