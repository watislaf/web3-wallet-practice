import { useMemo, useState } from "react";
import { TokenSummary } from "@/app/account/overview/_components/types";

enum Direction {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

function useSortableData(items: TokenSummary[] = []) {
  const [sortConfig, setSortConfig] = useState<{
    key: "percentage" | "balance";
    direction: Direction;
  }>({
    key: "percentage",
    direction: Direction.ASCENDING,
  });

  const sortedItems = useMemo(() => {
    const sortableData = [...items];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue === undefined || bValue === undefined) {
          return 0;
        }
        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [items, sortConfig]);

  const requestSort = (key: "percentage" | "balance") => {
    let direction: Direction = Direction.ASCENDING;
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === Direction.ASCENDING
    ) {
      direction = Direction.DESCENDING;
    }
    setSortConfig({ key, direction });
  };

  return { sortedItems, requestSort, sortConfig };
}

export default useSortableData;
