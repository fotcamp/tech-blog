import { Box, Flex, Text } from "@radix-ui/themes";
import Image from "next/image";

export default function Banner() {
  return (
    <Flex
      direction={"column"}
      position={"relative"}
      style={{ width: "100%", margin: "0 auto 70px auto" }}
    >
      <Box style={{ position: "relative", width: "100%", height: "300px" }}>
        <Image
          src="/img.svg"
          alt="img"
          fill
          sizes="(max-width: 768px) 100vw, 500px"
          style={{ objectFit: "contain", borderRadius: "30px" }}
        />
      </Box>
      <Flex
        direction={"column"}
        mt={"30px"}
        align={"center"}
        gap={"15px"}
        style={{ width: "100%" }}
      >
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
    </Flex>
  );
}
