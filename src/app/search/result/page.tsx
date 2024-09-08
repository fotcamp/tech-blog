import { Heading, Text, Flex, Card, Inset, Box } from "@radix-ui/themes";
import { searchArticle } from "@/api/notion";
import { getFormatDate } from "@/utils/getFormatDate";
import Link from "next/link";
import { Article } from "@/api/types";
import Image from "next/image";

export default async function SearchResultsPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;

  if (!query) {
    return <Text>검색어를 입력해주세요.</Text>;
  }

  let results: Article[] = [];

  try {
    results = await searchArticle(query);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }

  return (
    <Flex direction="column" gap="4">
      <Heading size="6">'{query}'에 대한 검색 결과</Heading>
      <Flex direction="row" gap="4">
        {results.length > 0 ? (
          results.map(result => (
            <Link key={result.pageId} href={`/posts/${result.pageId}`}>
              <Box width="240px">
                <Card size="2">
                  <Inset clip="padding-box" side="top" pb="current">
                    <Image
                      src={result.thumbnailUrl || ""}
                      alt="article thumnail image"
                      width={200}
                      height={200}
                      style={{
                        display: "block",
                        objectFit: "cover",
                        width: "100%",
                        height: 140,
                        backgroundColor: "var(--gray-5)"
                      }}
                      priority
                    />
                  </Inset>
                  <Heading size="3">{result.title}</Heading>
                  <Text as="p" size="3">
                    {getFormatDate(result.createdAt)}
                  </Text>
                </Card>
              </Box>
            </Link>
          ))
        ) : (
          <Text>검색 결과가 없습니다.</Text>
        )}
      </Flex>
    </Flex>
  );
}
