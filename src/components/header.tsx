"use client";
import { createRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HamburgerMenuIcon,
  ReloadIcon,
  ViewHorizontalIcon,
} from "@radix-ui/react-icons";
import { Search } from "lucide-react";
import Sidebar from "./sidebar";
import { Input } from "./ui/input";
import { ThemeToggle } from "./theme-toggle";
import { Avatar } from "./header/avatar";
import IconWrapper from "./header/IconWrapper";

const Header = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const headerRef = createRef<HTMLInputElement>();
  const inputRef = createRef<HTMLInputElement>();
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 0) {
        headerRef.current.classList.remove("shadow-header-custom");
        headerRef.current.classList.add("shadow-header-custom-scroll");
      } else {
        headerRef.current.classList.remove("shadow-header-custom-scroll");
        headerRef.current.classList.add("shadow-header-custom");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerRef]);

  return (
    <>
      <header
        ref={headerRef}
        className="bg-backgroundStrong p-4 pl-10 pr-10 sticky top-0 z-50 w-full bg-opacity-80 flex justify-between items-center shadow-header-custom"
      >
        <div className="flex items-center  ">
          <HamburgerMenuIcon
            className="w-12 h-12 mr-2 cursor-pointer transition-all duration-100 ease-in-out delay-100 hover:bg-[#262525] hover:text-yellow-500 rounded-l lg:hidden"
            onClick={() => setShowSideBar(!showSideBar)}
          />
          <Link href="/">
            <section className="flex items-center gap-2 transition-all duration-500 ease-in-out delay-500">
              <Image
                src="/logo.png"
                alt="keep-code logo"
                width={60}
                height={60}
                className="object-contain"
              />
              <h1 className="hidden sm:block text-gray-300 text-2xl tracking-widest font-bold ">
                KEEP
              </h1>
            </section>
          </Link>
        </div>
        <div className="w-full flex justify-center">
          <div className="w-6/12">
            <Input
              startIconSize="22"
              iconCtnClassName="left-3"
              className="h-16 pl-12 text-xl"
              startIcon={Search}
              type="text"
              ref={inputRef}
              placeholder="Search"
            />
          </div>
        </div>
        <nav className="flex gap-8 items-center">
          <IconWrapper icon={ReloadIcon} text="Refresh" />
          <IconWrapper icon={ViewHorizontalIcon} text="List View" />
          <ThemeToggle />
          <Avatar />
        </nav>
      </header>
      <div className="absolute left-9 top-24 transition-all duration-300 delay-100 lg:hidden">
        {showSideBar && <Sidebar />}
      </div>
    </>
  );
};

export default Header;
