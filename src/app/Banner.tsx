import { Box, Flex, Text } from "@radix-ui/themes";

export default function Banner() {
  return (
    <Box mx={"30px"} mt={"80px"} mb={"7%"}>
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
      <Flex direction={"column"} mt={"30px"} align={"center"} gap={"15px"}>
        <Text
          className="text_one"
          size={"7"}
          weight={"bold"}
          style={{
            color: "#191B1C",
            fontFamily: "Pretendard Variable"
          }}
        >
          더 쉽게 금융 지식을 쌓자!
        </Text>
        <Text
          className="text_two"
          size={"5"}
          style={{ color: "#7B8287", fontFamily: "Pretendard Variable" }}
        >
          어렵고 딱딱한 금융 지식을 말랑하게 풀어줄 핀허브
        </Text>
      </Flex>
    </Box>
  );
}
