"use client";

import { useState } from "react";
import { Box, Flex, Grid, Text, Button } from "@radix-ui/themes";
import { Article } from "@/api/types";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";

interface FilterableArticleListProps {
  articles: Article[];
  roles: string[];
}

const FilterableArticleList = ({ articles, roles }: FilterableArticleListProps) => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [selectedRole, setSelectedRole] = useState<string>("전체");

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    if (role === "전체") {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter(article =>
          article.properties.role.multi_select.some((roleObj: any) => roleObj.name === role)
        )
      );
    }
  };

  return (
    <>
      <Flex style={{ margin: "0 auto" }} width="70%" gap={"4"}>
        {roles.map((role: any, index: number) => (
          <Button
            key={index}
            onClick={() => handleRoleClick(role)}
            style={{
              backgroundColor: selectedRole === role ? "#25292C" : "#E6E8EB",
              borderRadius: "20px",
              display: "inline-flex",
              height: "36px",
              padding: "7px 23px"
            }}
          >
            <Text
              style={{
                color: selectedRole === role ? "#FFFFFF" : "#7B8287",
                fontSize: "14px",
                fontWeight: "400"
              }}
            >
              {role}
            </Text>
          </Button>
        ))}
      </Flex>
      <Grid
        className="responsive-grid"
        style={{ margin: "50px auto 0 auto" }}
        columns="2"
        gap={"80px"}
        rows="repeat(2, 1fr)"
        width="70%"
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
    </>
  );
};

export default FilterableArticleList;
