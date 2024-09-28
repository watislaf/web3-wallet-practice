"use client";
import React, { FC } from "react";
import Image from "next/image";

interface ChipProps {
  iconPath: string;
  name: string;
  amount?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

const Chip: FC<ChipProps> = ({
  iconPath,
  name,
  amount,
  isSelected = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={`flex select-none border rounded border-grey-10 items-center cursor-pointer p-2 ${isSelected ? "hover:bg-grey-10 bg-grey-9" : "hover:bg-grey-10"}`}
      onClick={onClick}
    >
      <span className="mr-2">{<Image src={iconPath} alt={"chip"} />}</span>
      <div className={"sm:flex sm:items-center sm:gap-2"}>
        <div className="text-sm text-gray-400">{name}</div>
        {amount !== undefined && (
          <div className="font-bold">${amount.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};

export default Chip;
