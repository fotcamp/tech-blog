"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Flex, Button, TextField, VisuallyHidden } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search/result?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <MagnifyingGlassIcon color="green" width="32" height="32" />
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <VisuallyHidden>
            <AlertDialog.Title>검색 모달</AlertDialog.Title>
            <AlertDialog.Description>검색어를 입력하세요</AlertDialog.Description>
          </VisuallyHidden>
          <TextField.Root
            color="green"
            variant="soft"
            placeholder="검색어를 입력하세요"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon color="green" height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                돌아가기
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="green" onClick={handleSearch}>
                검색하기
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
