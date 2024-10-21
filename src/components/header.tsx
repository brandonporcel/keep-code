"use client";
import { createRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HamburgerMenuIcon,
  ReloadIcon,
  ViewHorizontalIcon,
} from "@radix-ui/react-icons";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { ThemeToggle } from "./theme-toggle";
import IconWrapper from "./header/IconWrapper";
import { useSnippetContext } from "@/app/contexts/SnippetContext";
import ProgressActivity from "@/icons/ProgressActivity";
import CloudDone from "@/icons/CloudDone";
import { getSnippets } from "@/actions/actions";
import { Button } from "./ui/button";

const Header = () => {
  const { isLoading, setIsLoading, setSnippets } = useSnippetContext();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showFinalizedIcon, setShowFinalizedIcon] = useState(false);
  const headerRef = createRef<HTMLInputElement>();
  const inputRef = createRef<HTMLInputElement>();

  const handleFinalizationLoad = () => {
    setShowFinalizedIcon(true);
    setTimeout(() => {
      setShowFinalizedIcon(false);
    }, 1000);
  };

  const reloadSnippets = async () => {
    setIsLoading(true);
    const res = await getSnippets();
    setSnippets(res);
    setIsLoading(false);

    handleFinalizationLoad();
  };

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
        className="bg-backgroundStrong p-4 pl-10 pr-10 sticky top-0 w-full bg-opacity-80 flex justify-between items-center shadow-header-custom z-[49]"
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
          {!isLoading && !showFinalizedIcon && (
            <div onClick={reloadSnippets}>
              <IconWrapper icon={ReloadIcon} text="Refresh" />
            </div>
          )}
          {showFinalizedIcon && <CloudDone />}
          {isLoading && <ProgressActivity className="cursor-pointer" />}
          <IconWrapper icon={ViewHorizontalIcon} text="List View" />
          <ThemeToggle />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
      <div className="absolute left-9 top-24 transition-all duration-300 delay-100 lg:hidden">
        {showSideBar && <p>sidebar</p>}
      </div>
    </>
  );
};

export default Header;
