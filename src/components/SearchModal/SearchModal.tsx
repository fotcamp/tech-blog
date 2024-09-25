"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertDialog, Flex, Button, TextField, VisuallyHidden } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (!isComposing && query.trim()) {
      router.push(`/search/result?q=${encodeURIComponent(query)}`);
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <>
      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger onClick={() => setOpen(true)}>
          <Button size="2" color="green" variant="ghost">
            <MagnifyingGlassIcon width="24" height="24" />
          </Button>
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
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            onKeyDown={e => e.key === "Enter" && handleSearch()}
          >
            <TextField.Slot>
              <MagnifyingGlassIcon color="green" height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
              >
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
