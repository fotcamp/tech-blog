import { fetchArticleContent } from "@/api/notion";
import { PostRenderer } from "@/components/PostRenderer/PostRenderer";
import { Flex } from "@radix-ui/themes";

export default async function PostPage({ params }: { params: { postNo: string } }) {
  const pageId = params.postNo;
  const content = await fetchArticleContent(pageId);

  return (
    <Flex width="100%" direction="column" align="center">
      <Flex px="5" direction="column" maxWidth="540px">
        <PostRenderer content={content.parent} />
      </Flex>
    </Flex>
  );
}
