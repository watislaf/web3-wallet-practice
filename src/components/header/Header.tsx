import logoPath from "../../../public/logo.svg";
import Navigation from "@/components/header/Navigation";
import ConnectButton from "@/components/header/ConnectButton";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="w-full bg-grey-12 px-3 py-5  flex items-center justify-between space-x-5">
      <div
        className={
          "flex flex-1 max-w-2xl items-center space-x-2 justify-between"
        }
      >
        <div className="hidden md:flex items-center space-x-4">
          <Image priority src={logoPath} alt="LogoIcon" />
          <span className="text-xl font-JetBrainsMono">RAGE TRADE</span>
        </div>
        <Navigation />
      </div>
      <ConnectButton />
    </header>
  );
};
