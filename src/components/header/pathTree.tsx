import trade from "../../../public/trade.svg";
import account from "../../../public/account.svg";
import competitions from "../../../public/competitions.svg";
import stats from "../../../public/stats.svg";

interface PathTree {
  href: string;
  label: string;
  iconPath: string;
  links: { name: string; href: string }[];
}

const pathTree: PathTree[] = [
  {
    href: "/trade",
    iconPath: trade,
    label: "Trade",
    links: [
      { name: "Placeholder A", href: "/trade/placeA" },
      { name: "Placeholder B", href: "/trade/placeB" },
      { name: "Placeholder C", href: "/trade/placeC" },
    ],
  },
  {
    href: "/account",
    iconPath: account,
    label: "Account",
    links: [
      { name: "Overview", href: "/account/overview" },
      { name: "Rewards", href: "/account/rewards" },
      { name: "Referrals", href: "/account/referrals" },
      { name: "Deposit", href: "/account/deposit" },
      { name: "Withdraw", href: "/account/withdraw" },
      { name: "Transfer", href: "/account/transfer" },
      { name: "History", href: "/account/history" },
    ],
  },
  {
    href: "/competitions",
    iconPath: competitions,
    label: "Competitions",
    links: [
      { name: "Placeholder A", href: "/competitions/placeA" },
      { name: "Placeholder B", href: "/competitions/placeB" },
      { name: "Placeholder C", href: "/competitions/placeC" },
    ],
  },
  {
    href: "/stats",
    iconPath: stats,
    label: "Stats",
    links: [
      { name: "Placeholder A", href: "/stats/placeA" },
      { name: "Placeholder B", href: "/stats/placeB" },
      { name: "Placeholder C", href: "/stats/placeC" },
    ],
  },
] as const;

export default pathTree;
