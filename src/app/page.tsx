import { getArticleInfoList } from "@/api/notion";
import "./page.css";
import FilterableArticleList from "./FilterableArticleList";
import Banner from "./Banner";

export default async function Home() {
  const notionArticles = await getArticleInfoList();
  const allRoles = Array.from(
    new Set(
      notionArticles.flatMap(article =>
        article.properties.role.multi_select.map((role: any) => role.name)
      )
    )
  );
  const roles = ["전체", ...allRoles];

  return (
    <>
      <Banner />
      <FilterableArticleList articles={notionArticles} roles={roles} />
    </>
  );
}
