// app/search/result/page.tsx (서버 컴포넌트)
import { Heading, Text, Flex, Card } from "@radix-ui/themes";
import { searchArticle } from "@/api/notion"; // searchArticle 함수 가져오기

// 검색 결과 타입 정의
type SearchResult = {
  pageId: string;
  title: string;
};

interface SearchResultsPageProps {
  query: string;
}

export default async function SearchResultsPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;

  if (!query) {
    return <Text>검색어를 입력해주세요.</Text>;
  }

  let results: SearchResult[] = [];

  try {
    // searchArticle 함수를 사용해 노션에서 검색 결과 가져오기
    results = await searchArticle(query);
  } catch (error) {
    console.error("Error fetching search results:", error);
  }

  return (
    <Flex direction="column" gap="4">
      <Heading size="6">'{query}'에 대한 검색 결과</Heading>

      {results.length > 0 ? (
        results.map(result => (
          <Card key={result.pageId}>
            <Heading size="3">{result.title}</Heading>
          </Card>
        ))
      ) : (
        <Text>검색 결과가 없습니다.</Text>
      )}
    </Flex>
  );
}
