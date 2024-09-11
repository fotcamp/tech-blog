import { fetchArticleContent, getPostPage } from "@/api/notion";
import { PostRenderer } from "@/components/PostRenderer/PostRenderer";
import { Badge, Box, Flex, Heading } from "@radix-ui/themes";
import { getFormatDate } from "@/utils/getFormatDate";

export default async function PostPage({ params }: { params: { postNo: string } }) {
  const pageId = params.postNo;
  const content = await fetchArticleContent(pageId);
  const postInfo = await getPostPage(pageId);

  return (
    <Flex
      width="100%"
      direction="column"
      align="center"
      px={{ initial: "4", md: "6", lg: "8" }}
      py="5"
    >
      <Flex
        width="100%"
        maxWidth="1200px"
        direction="column"
        gap={{ initial: "3", md: "4", lg: "6" }}
      >
        <p>이미지</p>
        <Heading size={{ initial: "7", md: "8", lg: "9" }}>{postInfo.title}</Heading>
        <Heading size="2" color="gray">
          {getFormatDate(postInfo.createdAt)}
        </Heading>
        <Box maxWidth="200px">
          <Badge size="3" color="gray" radius="full">
            {postInfo.role}
          </Badge>
        </Box>
        <PostRenderer content={content.parent} />
      </Flex>
    </Flex>
  );
}
