import { getArticleInfoList } from "@/api/notion";
import "./page.css";
import FilterableArticleList from "./_component/main/FilterableArticleList";
import Banner from "./_component/main/Banner";
import { Suspense } from "react";

export default async function Home() {
  const notionArticles = await getArticleInfoList();
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
      <Banner />
      <Suspense>
        <FilterableArticleList articles={notionArticles} roles={roles} />
      </Suspense>
    </>
  );
}
