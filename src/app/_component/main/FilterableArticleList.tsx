"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
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
  const initialRole = searchParams.get("role") || "전체";

  const [filteredArticles, setFilteredArticles] = useState<Article[]>(initialArticles);
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [nextCursorState, setNextCursorState] = useState<string | null | undefined>(nextCursor);

  const handleLoadMore = async () => {
    if (nextCursorState) {
      try {
        const response = await fetch(
          `/api/articles?cursor=${nextCursorState}&role=${selectedRole}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { articles, nextCursor: newNextCursor } = await response.json();

        setFilteredArticles(prev => [...prev, ...articles]);
        setNextCursorState(newNextCursor);

        console.log(newNextCursor);
      } catch (error) {
        console.error("Error loading more articles:", error);
      }
    }
  };

  const handleRoleClick = (role: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("role", role);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, "", newUrl);

    window.location.reload();
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
              backgroundColor: selectedRole === role ? "#25292C" : "#E6E8EB",
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
                color: selectedRole === role ? "#FFFFFF" : "#7B8287"
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
      {nextCursor && (
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
