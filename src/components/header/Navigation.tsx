import ActiveLink from "./ActiveLink";
import { FC } from "react";
import pathTree from "@/components/header/pathTree";

const Navigation: FC = () => {
  return (
    <nav>
      <ul className="flex space-x-7">
        {pathTree.map((link, index) => (
          <li key={index}>
            <ActiveLink href={link.href} iconPath={link.iconPath}>
              {link.label}
            </ActiveLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
