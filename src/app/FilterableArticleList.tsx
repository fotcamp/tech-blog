"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Flex, Grid, Text, Button } from "@radix-ui/themes";
import { Article } from "../api/types";
import { ArticleCard } from "../components/ArticleCard/ArticleCard";

interface FilterableArticleListProps {
  articles: Article[];
  roles: string[];
}

const FilterableArticleList = ({ articles, roles }: FilterableArticleListProps) => {
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role") || "전체";

  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);

  useEffect(() => {
    const initialRoleToFilter = initialRole === "전체" ? null : initialRole;
    const roleToFilter = selectedRole === "전체" ? null : selectedRole;
    const effectiveRoleToFilter = roleToFilter || initialRoleToFilter;

    if (!effectiveRoleToFilter) {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter(article =>
          article.properties.role.multi_select.some(
            (roleObj: any) => roleObj.name === effectiveRoleToFilter
          )
        )
      );
    }
  }, [selectedRole, initialRole, articles]);

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    const params = new URLSearchParams(window.location.search);
    params.set("role", role);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, "", newUrl);
  };

  return (
    <>
      <Flex
        wrap={"wrap"}
        className="responsive-role"
        style={{ margin: "0 auto" }}
        width="70%"
        gap={"4"}
      >
        {roles.map((role, index) => (
          <Button
            key={index}
            onClick={() => handleRoleClick(role)}
            style={{
              backgroundColor: selectedRole === role ? "#25292C" : "#E6E8EB",
              borderRadius: "20px",
              display: "inline-flex",
              height: "36px",
              padding: "4px 14px"
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
        gap={"60px 10%"}
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
