import { getArticleInfoList, getTopFiveArticles } from "@/api/notion";
import "./page.css";
import FilterableArticleList from "./_component/main/FilterableArticleList";
import Popular from "./_component/main/Popular";
import { Suspense } from "react";

export default async function Home() {
  const notionArticles = await getArticleInfoList();
  const topFiveArticles = getTopFiveArticles(notionArticles);

  const allRoles = Array.from(
    new Set(
      notionArticles.flatMap(article =>
        article.properties.role?.multi_select.map((role: any) => role.name)
      )
    )
  );
  const roles = ["전체", ...allRoles];

  return (
    <>
      <Popular topArticles={topFiveArticles} />
      <Suspense>
        <FilterableArticleList articles={notionArticles} roles={roles} />
      </Suspense>
    </>
  );
}
