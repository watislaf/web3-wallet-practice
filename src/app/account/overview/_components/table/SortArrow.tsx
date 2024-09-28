import React from "react";
import Image from "next/image";
import arrowPath from "../../../../../../public/arrow.svg";

interface SortArrowProps {
  sortKey: string;
  sortConfig: { key: string; direction: string } | null;
}

export const SortArrow: React.FC<SortArrowProps> = ({
  sortKey,
  sortConfig,
}) => {
  if (!sortConfig || sortConfig.key !== sortKey) {
    return <span className="text-grey-5">⛗</span>;
  }
  return (
    <Image
      priority
      src={arrowPath}
      alt={
        sortConfig.direction === "ascending" ? "ArrowUpIcon" : "ArrowDownIcon"
      }
      className={
        sortConfig.direction === "descending" ? "transform rotate-180" : ""
      }
    />
  );
};
