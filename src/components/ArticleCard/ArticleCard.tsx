import { Box, Flex, Link, Text } from "@radix-ui/themes";
import Image from "next/image";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { Article } from "@/api/types";

type ArticleCardProps = Article;

export const ArticleCard = ({
  pageId,
  title,
  createdAt,
  thumbnailUrl,
  properties
}: ArticleCardProps) => {
  return (
    <Link href={`/posts/${pageId}`}>
      <Box>
        <Flex direction="column">
          <Box
            position="relative"
            overflow="hidden"
            style={{ borderRadius: 20, backgroundColor: "#FFF" }}
            width="200px"
            height="200px"
          >
            <Image
              src={thumbnailUrl || ""}
              alt="article thumnail image"
              width={200}
              height={200}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
              }}
            />
          </Box>
          <Text>{title}</Text>
          <Text>{createdAt.toISOString()}</Text>
        </Flex>
      </Box>
    </Link>
  );
};
