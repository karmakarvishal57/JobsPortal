"use client";

import { AlignJustify } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Header({ user, profileInfo }) {
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user,
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    {
      label: "Membership",
      path: "/membership",
      show: user,
    },
    {
      label: "Account",
      path: "/account",
      show: user,
    },
  ];

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center ">
        <Sheet>
          <SheetTrigger>
            <Button className="lg:hidden">
              <AlignJustify> </AlignJustify>
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className=" bg-slate-950 text-slate-400">
            <Link
              className="mr-6 hidden lg:flex text-lg font-semibold"
              href="#"
            >
              <h3>JOBSCO</h3>
            </Link>
            <div className="grid gap-2">
              {menuItems?.map((menuItem) =>
                menuItem?.show ? (
                  <Link
                    className="flex w-full items-center py-2 text-lg font-serif"
                    href={menuItem?.path}
                    onClick={() => sessionStorage.removeItem("filterParams")}
                  >
                    {menuItem?.label}
                  </Link>
                ) : null
              )}
            </div>
          </SheetContent>

          <div className="ml-6 w-[100%] flex justify-between lg:hidden">
            <a className=" text-3xl font-semibold " href="/">
              JOBSCO
            </a>
            <UserButton ></UserButton>
          </div>
        </Sheet>
        <Link
          className="mr-5 hidden lg:flex  text-3xl font-semibold  shadow-md shadow-blue-300 rounded-lg px-4 py-2"
          href="/"
        >
          <h3>JOBSCO</h3>
          <div></div>
        </Link>
        <nav className="hidden lg:flex w-full justify-end ">
          {menuItems?.map((menuItem) =>
            menuItem?.show ? (
              <Link
                href={menuItem.path}
                className="group flex items-center  gap-2 w-max h-9 mr-4 px-4  shadow-md shadow-blue-300 text-sm font-medium text-blck rounded-[10px] "
                onClick={() => sessionStorage.removeItem("filterParams")}
              >
                {menuItem?.label}
              </Link>
            ) : null
          )}
          <UserButton></UserButton>
        </nav>
      </header>
    </div>
  );
}
