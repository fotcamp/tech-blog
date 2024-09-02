import { Box, Button, Flex, Grid, Text } from "@radix-ui/themes";
import { getArticleInfoList } from "@/api/notion";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import "./page.css";
import FilterableArticleList from "./FilterableArticleList";

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
  console.log(roles);

  return (
    <>
      <Box mx={"30px"} mt={"80px"} mb={"80px"}>
        <img
          className="section-photo"
          src="/img.svg"
          alt="img"
          width={"100%"}
          style={{ maxHeight: "500px", borderRadius: "30px" }}
        />
        <Flex
          className="section-photo_one"
          pl={"60px"}
          pt={"60px"}
          direction={"row"}
          width={"100%"}
          height={"350px"}
          style={{
            backgroundColor: "#50BF50",
            position: "relative",
            overflow: "hidden",
            justifyContent: "space-between",
            borderRadius: "30px"
          }}
        >
          <Flex direction={"column"} gap={"50px"}>
            <Text
              size={"8"}
              style={{
                color: "#FFF",
                fontFamily: "GmarketSansTTF",
                whiteSpace: "pre-line",
                lineHeight: "1.2",
                transform: "scaleY(0.9)"
              }}
            >
              더 쉽게 금융{"\n"}지식을 쌓자!
            </Text>
            <img src="/finhub_logo.png" alt="logo" width={225} height={50} />
          </Flex>
          <img src="/iphone.svg" alt="iphone" style={{ zIndex: "1" }} />
          <Box
            width={"666px"}
            height={"666px"}
            style={{
              borderRadius: "666px",
              background: "#38B238",
              position: "absolute",
              right: "-250px",
              top: "-15%"
            }}
          ></Box>
        </Flex>
        <Flex direction={"column"} mt={"40px"} align={"center"} gap={"20px"}>
          <Text
            size={"7"}
            weight={"bold"}
            style={{
              color: "#191B1C",
              fontFamily: "Pretendard Variable"
            }}
          >
            더 쉽게 금융 지식을 쌓자!
          </Text>
          <Text size={"5"} style={{ color: "#7B8287", fontFamily: "Pretendard Variable" }}>
            어렵고 딱딱한 금융 지식을 말랑하게 풀어줄 핀허브
          </Text>
        </Flex>
      </Box>

      {/* role모음 */}
      {/* <Flex style={{ margin: "0 auto" }} width="70%" gap={"4"}>
        {roles.map((role: any, index: number) => (
          <Button
            key={index}
            style={{
              backgroundColor: "#E6E8EB",
              borderRadius: "20px",
              display: "inline-flex",
              height: "36px"
            }}
          >
            <Text style={{ color: "#7B8287", fontSize: "14px", fontWeight: "400" }}>{role}</Text>
          </Button>
        ))}
      </Flex> */}
      <FilterableArticleList articles={notionArticles} roles={roles} />

      {/* content */}
      {/* <Grid
        className="responsive-grid"
        style={{ margin: "50px auto 0 auto" }}
        columns="2"
        gap={"80px"}
        rows="repeat(2, 1fr)"
        width="70%"
      >
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
      </Grid> */}
    </>
  );
}
