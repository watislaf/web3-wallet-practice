"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import pathTree from "@/components/header/pathTree";
import Image from "next/image";

const isActivePath = (pathname: string, href: string) => {
  return pathname.startsWith(href);
};

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-grey-12 border-grey-10 border overflow-y-auto hidden xl:block">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={
          pathTree.find((item) => isActivePath(pathname, item.href))?.href
        }
      >
        {pathTree.map((item) => (
          <AccordionItem className="my-2" key={item.href} value={item.href}>
            <AccordionTrigger
              className={`text-left py-2 px-4 rounded ${
                isActivePath(pathname, item.href)
                  ? "text-noname-8F7D"
                  : "hover:bg-gray-700"
              }`}
            >
              <div className="flex gap-2">
                {isActivePath(pathname, item.href) && (
                  <Image src={item.iconPath} alt={"path"} />
                )}
                {item.label}
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-1 ">
                {item.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className={`block py-2 px-4 pl-10 rounded ${
                        pathname === link.href
                          ? "bg-grey-11 text-noname-8F7D"
                          : "hover:bg-grey-10"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </aside>
  );
};
