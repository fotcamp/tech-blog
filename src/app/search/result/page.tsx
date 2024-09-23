import { Heading, Text, Flex, Card, Inset, Box } from "@radix-ui/themes";
import { ExclamationTriangleIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { searchArticle } from "@/api/notion";
import { getFormatDate } from "@/utils/getFormatDate";
import { Article } from "@/api/types";
import Link from "next/link";
import Image from "next/image";
import styles from "./SearchResultsPage.module.css";

export default async function SearchResultsPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;

  if (!query) {
    return (
      <Flex direction={"column"} align={"center"} gap={"6"}>
        <Heading>검색어를 입력하지 않으셨군요!</Heading>
        <ExclamationTriangleIcon color="green" width="100" height="100" />
        <Text color="green">검색어를 입력해주세요.</Text>
      </Flex>
    );
  }

  let results: Article[] = [];

  try {
    results = await searchArticle(query);
  } catch (error) {
    console.error("검색 결과를 가져오는 중 오류가 발생했습니다:", error);
  }

  return (
    <Flex direction="column" gap="6" p="6">
      {results.length > 0 ? (
        <Flex direction="column" gap="6" p="6">
          <Heading size="6" mb="4">
            '{query}'에 대한 검색 결과
          </Heading>
          <Flex direction="row" gap="6" wrap="wrap" justify="start">
            {results.map(result => (
              <Link
                key={result.pageId}
                href={`/posts/${result.pageId}`}
                passHref
                style={{
                  textDecoration: "none"
                }}
              >
                <Box width="240px">
                  <Card className={styles.card} size="2">
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
                    <Heading size="4" mb="2" weight="bold" color="gray">
                      {result.title}
                    </Heading>
                    <Text size="1" color="gray">
                      {getFormatDate(result.createdAt)}
                    </Text>
                  </Card>
                </Box>
              </Link>
            ))}
          </Flex>
        </Flex>
      ) : (
        <Flex direction={"column"} align={"center"} gap={"6"}>
          <QuestionMarkCircledIcon color="green" width="100" height="100" />
          <Heading>{query}에 대한 검색 결과가 없어요!</Heading>
          <Text color="green">다른 검색어로 다시 검색해 보세요.</Text>
        </Flex>
      )}
    </Flex>
  );
}
