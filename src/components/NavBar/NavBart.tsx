"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@radix-ui/themes";

export function NavBar() {
  const { theme, setTheme } = useTheme();
  const toggleMode = () => setTheme(theme == "light" ? "dark" : "light");

  return (
    <>
      {/* Your code for the navbar */}
      <Button onClick={toggleMode}> Toggle mode </Button>
    </>
  );
}
