"use client";
import React from "react";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Image from "next/image";
import { ToggleTheme } from "./toogle-theme";
import { CartComponent } from "./cart/cart";
import { Button } from "../ui/button";
import { cn } from "@/utils/utils";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";

interface RouteProps {
  id: number;
  href: string;
  label: string;
}

const routeList: RouteProps[] = [
  {
    id: 1,
    href: "/company",
    label: "A. Company Profile",
  },
  {
    id: 2,
    href: "/courses",
    label: "B. Course Detail",
  },
  {
    id: 3,
    href: "/standard-packages",
    label: "C. Standard Packages",
  },
  {
    id: 4,
    href: "/course-booking",
    label: "D. Course Booking",
  },
  {
    id: 5,
    href: "/maintenance",
    label: "E. Enquiry",
  },
  {
    id: 6,
    href: "/maintenance",
    label: "F. Contact",
  },
];

export const NavbarNew = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const BackButton = () => (
    <Button
      variant="link"
      size="sm"
      className="flex items-center gap-2 hover:bg-none"
      asChild
    >
      <Link href="/">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>
    </Button>
  );

  return (
    <div className="fixed z-50 w-full">
      {/* Mobile Mode */}
      <div className="lg:hidden md:hidden flex justify-center">
        <header className="shadow-inner bg-opacity-15 mx-auto border border-secondary rounded-md bg-card flex flex-col">
          {/* Top section with logo and actions */}
          <div className="flex flex-col items-center p-2">
            <Link
              href="/"
              className="flex flex-col items-start py-4 mx-2 gap-1"
            >
              <Image
                src={"/company-logo.jpg"}
                width={80}
                height={30}
                alt="Company Logo"
                className="rounded-md"
              />
              <span className="text-xs font-bold">
                Street No, Building No. Name, unit no, Province, City, Country,
                Postal Code
              </span>
            </Link>

            <Separator />
            <Collapsible
              open={isOpen}
              onOpenChange={setIsOpen}
              className="w-full space-y-2"
            >
              {/* Rest of mobile menu code remains the same */}
              <div className="flex items-center justify-between px-4">
                <h4 className="text-sm font-semibold">Menu</h4>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-9 p-0">
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              {isOpen ? <Separator /> : null}

              <CollapsibleContent className="space-y-2">
                <nav className="flex flex-col w-full justify-center items-start py-2 pl-3">
                  {routeList.map(({ id, href, label }) => (
                    <Button
                      key={id}
                      asChild
                      variant={null}
                      size="sm"
                      className={cn(
                        "px-1 sm:px-2 md:px-3",
                        "h-8 sm:h-9 md:h-10",
                        "rounded-md",
                        "whitespace-nowrap",
                        "w-full text-left justify-start"
                      )}
                    >
                      <Link
                        className="hover:underline hover:text-primary"
                        href={href}
                      >
                        {label}
                      </Link>
                    </Button>
                  ))}
                </nav>

                <Separator />

                <div className="flex w-full items-start">
                  <Link
                    href={"mailto:theunifiedgolf@gmail.com"}
                    className="text-xs font-bold"
                  >
                    <Button variant={"link"}>
                      Email: theunifiedgolf@gmail.com
                    </Button>
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </header>
      </div>

      {/* Desktop Mode */}
      <div className="hidden lg:block md:block">
        <header className="shadow-inner bg-opacity-15 border border-secondary rounded-md p-2 bg-card">
          <div className="flex flex-col w-full">
            <div className="flex flex-nowrap justify-between items-center w-full ml-1 mb-2">
              <div className="flex flex-col items-start gap-1">
                <Link href="/" className="flex items-center">
                  <Image
                    src={"/company-logo.jpg"}
                    width={80}
                    height={30}
                    alt=""
                    className="rounded-md"
                  />
                </Link>
                <span className="text-xs font-bold">
                  Street No, Building No. Name, unit no, Province, City,
                  Country, Postal Code
                </span>
              </div>
              <div className="flex h-full mt-14">
                <Link
                  href={"mailto:theunifiedgolf@gmail.com"}
                  className="text-xs font-bold"
                >
                  <Button variant={"link"}>
                    Email: theunifiedgolf@gmail.com
                  </Button>
                </Link>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between items-center mt-1">
              <div className="flex flex-shrink-0 justify-between items-center mt-1">
                <NavigationMenu className="hidden lg:block md:block py-2">
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      {routeList.map(({ href, label }) => (
                        <NavigationMenuLink key={label} asChild>
                          <Link
                            href={href}
                            className="items-center text-base font-bold px-2 py-2 md:text-xs lg:text-base hover:underline hover:text-primary border border-secondary"
                          >
                            {label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              {!isHomePage && <BackButton />}
            </div>
          </div>
        </header>
      </div>
    </div>
  );
};
