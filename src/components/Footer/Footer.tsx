"use client";

import { useTheme } from "next-themes";
import { Button, Link, Flex, Text, Strong } from "@radix-ui/themes";
import { SunIcon, MoonIcon, GitHubLogoIcon, DownloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import "./Footer.css";
import SearchModal from "../SearchModal/SearchModal";

export function Footer() {
  return (
    <footer className="footer">
      <Flex align="center" justify="center" width={"100%"}>
        <Link
          href="https://github.com/fotcamp"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            textDecoration: "none",
            color: "var(--gray-12)"
          }}
        >
          <GitHubLogoIcon width={"32px"} height={"32px"} />
          <Text size={"1"}>© 2024 fotcamp</Text>
        </Link>
      </Flex>
      <Text size={"1"} color="gray">
        Download Finhub
      </Text>
      <Flex align="center" justify="center" gap="20px">
        <Link href="https://play.google.com/store/apps/details?id=com.fotcamp.finhub">
          <Button
            size="1"
            color="gray"
            variant="outline"
            style={{ width: "100px", height: "32px", padding: "0", cursor: "pointer" }}
          >
            <DownloadIcon />
            Google Play
          </Button>
        </Link>
        <Link href="https://apps.apple.com/kr/app/%ED%95%80%ED%97%88%EB%B8%8C-%EB%8B%B9%EC%8B%A0%EB%A7%8C%EC%9D%98-%EA%B8%88%EC%9C%B5-%EC%9C%84%ED%82%A4/id6477758774">
          <Button
            size="1"
            color="gray"
            variant="outline"
            style={{ width: "100px", height: "32px", padding: "0", cursor: "pointer" }}
          >
            <DownloadIcon />
            App Store
          </Button>
        </Link>
      </Flex>
    </footer>
  );
}
