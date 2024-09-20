"use client";

import { useTheme } from "next-themes";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { Link } from "@radix-ui/themes";
import { Flex, Strong } from "@radix-ui/themes";
import "./NavBar.css";

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
            <Link href="/search" underline="none" style={{ width: 32, height: 32 }}>
              <Image src="/search.svg" alt="search" width={32} height={32}></Image>
            </Link>
            <Button onClick={toggleMode}> Toggle mode </Button>
          </Flex>
        </Flex>
      </header>
    </>
  );
}
