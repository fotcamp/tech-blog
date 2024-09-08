import { Heading, Text, Flex, Card, Inset, Box } from "@radix-ui/themes";
import { searchArticle } from "@/api/notion";
import { getFormatDate } from "@/utils/getFormatDate";
import { Article } from "@/api/types";
import Link from "next/link";
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
    console.error("검색 결과를 가져오는 중 오류가 발생했습니다:", error);
  }

  return (
    <Flex direction="column" gap="4">
      <Heading size="6">'{query}'에 대한 검색 결과</Heading>
      {results.length > 0 ? (
        <Flex direction="row" gap="4" wrap="wrap">
          {results.map(result => (
            <Link key={result.pageId} href={`/posts/${result.pageId}`} passHref>
              <Box width="240px">
                <Card size="2">
                  <Inset clip="padding-box" side="top" pb="current">
                    <Image
                      src={result.thumbnailUrl || ""}
                      alt={`${result.title}의 썸네일 이미지`}
                      width={200}
                      height={200}
                      style={{ objectFit: "cover", width: "100%", height: 140 }}
                      priority
                    />
                  </Inset>
                  <Heading size="3">{result.title}</Heading>
                  <Text size="3">{getFormatDate(result.createdAt)}</Text>
                </Card>
              </Box>
            </Link>
          ))}
        </Flex>
      ) : (
        <Text>검색 결과가 없습니다.</Text>
      )}
    </Flex>
  );
}
