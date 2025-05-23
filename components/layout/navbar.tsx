// "use client";
// import { ChevronsDown, Github, Menu, ShoppingCart } from "lucide-react";
// import React from "react";
// import {
//   Sheet,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "../ui/sheet";
// import { Separator } from "../ui/separator";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
// } from "../ui/navigation-menu";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { ToggleTheme } from "./toogle-theme";
// import { CartComponent } from "./cart/cart";

// interface RouteProps {
//   href: string;
//   label: string;
// }

// interface FeatureProps {
//   title: string;
//   href: string;
// }

// const routeList: RouteProps[] = [
//   // {
//   //   href: "#contact",
//   //   label: "Contact Me",
//   // },
//   {
//     href: "/about",
//     label: "About Us",
//   },
//   {
//     href: "#contact",
//     label: "Contact",
//   },
//   {
//     href: "#faq",
//     label: "FAQ",
//   },
// ];

// const featureList: FeatureProps[] = [
//   {
//     title: "Indonesia",
//     href: "/locations",
//   },
//   {
//     title: "Malaysia",
//     href: "/locations",
//   },
//   {
//     title: "Thailand",
//     href: "/locations",
//   },
//   {
//     title: "Singapore",
//     href: "/locations",
//   },
//   {
//     title: "Kamboja",
//     href: "/locations",
//   },
//   {
//     title: "Vietnam",
//     href: "/locations",
//   },
// ];

// export const Navbar = () => {
//   const [isOpen, setIsOpen] = React.useState(false);
//   return (
//     <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-xl flex justify-between items-center p-2 bg-card">
//       <Link href="/" className="font-bold text-lg flex items-center p-3">
//         Unified Golf
//       </Link>
//       {/* <!-- Mobile --> */}
//       <div className="flex items-center lg:hidden">
//         <Sheet open={isOpen} onOpenChange={setIsOpen}>
//           <SheetTrigger asChild>
//             <Menu
//               onClick={() => setIsOpen(!isOpen)}
//               className="cursor-pointer lg:hidden"
//             />
//           </SheetTrigger>

//           <SheetContent
//             side="left"
//             className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
//           >
//             <div>
//               <SheetHeader className="mb-4 ml-4">
//                 <SheetTitle className="flex items-center">
//                   <Link href="/" className="flex items-center">
//                     Unified
//                   </Link>
//                 </SheetTitle>
//               </SheetHeader>

//               <div className="flex flex-col gap-2">
//                 {routeList.map(({ href, label }) => (
//                   <Button
//                     key={href}
//                     onClick={() => setIsOpen(false)}
//                     asChild
//                     variant="ghost"
//                     className="justify-start text-base"
//                   >
//                     <Link href={href}>{label}</Link>
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             <SheetFooter className="flex-col sm:flex-col justify-start items-start">
//               <Separator className="mb-2" />
//               <div className="flex flex-col justify-between items-start gap-3">
//                 <ToggleTheme />
//                 <CartComponent />
//               </div>
//             </SheetFooter>
//           </SheetContent>
//         </Sheet>
//       </div>

//       {/* <!-- Desktop --> */}
//       <NavigationMenu className="hidden lg:block mx-auto">
//         <NavigationMenuList>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger className="bg-card text-base">
//               Select Your Country
//             </NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <div className="grid w-[600px] grid-cols-1 gap-5 p-4">
//                 <ul className="flex flex-row gap-2">
//                   {featureList.map(({ href, title }) => (
//                     <Button
//                       key={href}
//                       variant={"link"}
//                       className="rounded-md p-3 text-sm hover:bg-muted"
//                     >
//                       <Link
//                         href={href}
//                         className="mb-1 font-semibold leading-none text-foreground"
//                       >
//                         {title}
//                       </Link>
//                     </Button>
//                   ))}
//                 </ul>
//               </div>
//             </NavigationMenuContent>
//           </NavigationMenuItem>

//           <NavigationMenuItem>
//             {routeList.map(({ href, label }) => (
//               <NavigationMenuLink key={href} asChild>
//                 <Link href={href} className="text-base px-2">
//                   {label}
//                 </Link>
//               </NavigationMenuLink>
//             ))}
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>

//       <div className="hidden lg:flex flex-row gap-2 justify-between items-center mr-2">
//         <ToggleTheme />
//         <CartComponent />
//       </div>
//     </header>
//   );
// };
