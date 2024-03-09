"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Menu, Sparkles } from "lucide-react";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { ModeToggle } from "@/components/theme-toggle";
import MobileSideBar from "./MobileSideBar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});
const NavBar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-primary/10 bg-gray-900 h-16">
      <div className="flex items-center">
        {/* <Menu className="block md:hidden" /> */}
        <MobileSideBar />
        <Link href="/">
          <h1
            className={cn("hidden md:block text-2xl font-bold", font.className)}
          >
            THUNDER.ai
          </h1>
        </Link>
      </div>
      <div className="flex flex-row gap-x-3">
        <Button variant="premium" size="sm">
          Upgrade
          <Sparkles className="h-4 w-4 fill-black text-white ml-1" />
        </Button>
        <ModeToggle />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </div>
  );
};

export default NavBar;
