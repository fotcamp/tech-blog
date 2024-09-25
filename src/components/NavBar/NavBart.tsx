"use client";

import { useTheme } from "next-themes";
import { Button, Link, Flex, Strong } from "@radix-ui/themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import "./NavBar.css";
import SearchModal from "../SearchModal/SearchModal";

export function NavBar() {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => setTheme(theme == "light" ? "dark" : "light");

  return (
    <>
      <header className="navBar">
        <Flex align="center" width={"100%"} justify={"between"}>
          <Link
            href="/"
            underline="none"
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
          >
            <div style={{ position: "relative", width: "48px", height: "48px" }}>
              <Image src="/app_icon.svg" alt="app_icon" fill style={{ objectFit: "contain" }} />
            </div>
            <span style={{ color: "black" }}>
              <Strong>fotcamp </Strong>tech
            </span>
          </Link>
          <Flex align="center" gap="20px">
            <SearchModal />
            <Button size="2" color="green" variant="ghost" onClick={toggleMode}>
              {theme === "dark" ? (
                <MoonIcon width="24" height="24" />
              ) : (
                <SunIcon width="24" height="24" />
              )}
            </Button>
          </Flex>
        </Flex>
      </header>
    </>
  );
}
