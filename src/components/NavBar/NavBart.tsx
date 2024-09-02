"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@radix-ui/themes";
import Image from "next/image";
import { Link } from "@radix-ui/themes";
import { Box, Flex, Text, Strong } from "@radix-ui/themes";
import "./NavBar.css";

export function NavBar() {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => setTheme(theme == "light" ? "dark" : "light");

  return (
    <>
      {/* Your code for the navbar */}
      {/* <Button onClick={toggleMode}> Toggle mode </Button> */}
      <header>
        <Link href="/" underline="none">
          <Flex align={"center"} gap={"20px"}>
            <Image src="/app_icon.svg" alt="app_icon" width={48} height={48}></Image>
            <p style={{ color: "black" }}>
              <Strong>fotcamp </Strong>tech
            </p>
          </Flex>
        </Link>
      </header>
    </>
  );
}
