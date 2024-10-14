"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Flex, Grid, Text, Button } from "@radix-ui/themes";
import { Article } from "../../../api/types";
import { ArticleCard } from "../../../components/ArticleCard/ArticleCard";

interface FilterableArticleListProps {
  initialArticles: Article[];
  roles: string[];
  nextCursor: string | null | undefined;
}

const FilterableArticleList = ({
  initialArticles,
  roles,
  nextCursor
}: FilterableArticleListProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialRole = searchParams.get("role") || "전체";

  const [filteredArticles, setFilteredArticles] = useState<Article[]>(initialArticles);
  const [nextCursorState, setNextCursorState] = useState<string | null | undefined>(nextCursor);
  const [role, setRole] = useState(initialRole);

  const fetchArticles = async (newRole?: string, cursor?: string) => {
    try {
      const response = await fetch(
        `/api/articles?${cursor ? `cursor=${cursor}&` : ""}role=${newRole || role}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles(role);
      if (data) {
        setFilteredArticles(data.articles);
        setNextCursorState(data.nextCursor);
      }
    };
    loadArticles();
  }, [role]);

  const handleRoleClick = (newRole: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("role", newRole);
    router.push(`?${params.toString()}`);
    setRole(newRole);
  };

  const handleLoadMore = async () => {
    if (nextCursorState) {
      const data = await fetchArticles(role, nextCursorState);
      if (data) {
        setFilteredArticles(prev => [...prev, ...data.articles]);
        setNextCursorState(data.nextCursor);
      }
    }
  };

  return (
    <>
      <Flex
        wrap={"wrap"}
        className="responsive-role"
        style={{ margin: "0 auto" }}
        width="70%"
        gap="4"
      >
        {roles.map((role, index) => (
          <Button
            key={index}
            onClick={() => handleRoleClick(role)}
            radius="full"
            style={{
              backgroundColor: role === initialRole ? "#25292C" : "#E6E8EB",
              display: "inline-flex",
              height: "36px",
              padding: "4px 14px",
              cursor: "pointer"
            }}
          >
            <Text
              size="3"
              weight="regular"
              style={{
                color: role === initialRole ? "#FFFFFF" : "#7B8287"
              }}
            >
              {role}
            </Text>
          </Button>
        ))}
      </Flex>
      <Grid
        className="responsive-grid"
        columns="2"
        gap="60px 10%"
        rows="repeat(2, 1fr)"
        width="70%"
        pb="100px"
        style={{ margin: "50px auto 0 auto" }}
      >
        {filteredArticles.map(item => (
          <ArticleCard
            key={item.pageId}
            pageId={item.pageId}
            createdAt={item.createdAt}
            title={item.title}
            thumbnailUrl={item.thumbnailUrl}
            properties={item.properties}
          />
        ))}
      </Grid>
      {nextCursorState && (
        <Button
          onClick={handleLoadMore}
          radius="full"
          style={{
            margin: "0px auto",
            backgroundColor: "#E6E8EB",
            display: "block",
            height: "50px",
            width: "170px",
            padding: "4px 14px",
            cursor: "pointer"
          }}
        >
          <Text
            size="3"
            weight="regular"
            style={{
              color: "#7B8287",
              fontFamily: "Pretendard Variable"
            }}
          >
            게시글 더보기 +
          </Text>
        </Button>
      )}
    </>
  );
};

export default FilterableArticleList;
