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
  const roles = properties.role.multi_select;
  return (
    <Link href={`/posts/${pageId}`}>
      <Box>
        <Flex direction="column">
          <Box
            position="relative"
            overflow="hidden"
            style={{ borderRadius: 20, backgroundColor: "#232" }}
            width="100%"
            height="250px"
          >
            <Image
              src={thumbnailUrl || ""}
              alt="article thumnail image"
              layout={"fill"}
              objectFit={"cover"}
            />
          </Box>
          <Text
            style={{
              marginTop: "20px",
              color: "#191B1c",
              fontFamily: "Pretendard Variable",
              fontSize: "24px",
              fontWeight: 700
            }}
          >
            {title}
          </Text>
          {/* <Text>{createdAt.toISOString()}</Text> */}
          <Box mt={"20px"}>
            {roles.map((role: any, index: number) => (
              <Box
                key={index}
                p={"7px 14px"}
                style={{
                  backgroundColor: "#E6E8EB",
                  borderRadius: "20px",
                  display: "inline-flex",
                  height: "36px",
                  padding: "7px 23px"
                }}
              >
                <Text style={{ color: "#7B8287", fontSize: "14px" }}>{role.name}</Text>
              </Box>
            ))}
          </Box>
        </Flex>
      </Box>
    </Link>
  );
};
