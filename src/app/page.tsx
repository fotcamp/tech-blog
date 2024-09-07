import { Box, Grid } from "@radix-ui/themes";
import { getArticleInfoList } from "@/api/notion";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";

export default async function Home() {
  const notionArticles = await getArticleInfoList();
  return (
    <>
      <Box>Tech Blog Main Page</Box>
      <Grid columns="3" gap="3" rows="repeat(2, 1fr)" width="auto">
        {notionArticles.map(item => (
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
}
