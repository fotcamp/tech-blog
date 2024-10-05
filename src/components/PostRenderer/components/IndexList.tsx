import { Box, Flex, Link, Text } from "@radix-ui/themes";

export const IndexList = ({ content }: { content: string }) => {
  const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
  const tocItems = headings.map(heading => {
    const level = heading.match(/^#+/)?.[0].length || 0;
    const title = heading.replace(/^#+\s+/, "");
    const id = title.toLowerCase().replace(/\s+/g, "-");
    const pl = (level - 1) * 15;
    return { id, title, level, pl };
  });

  if (tocItems.length === 0) return <></>;
  return (
    <Flex gap={"1"} direction="column">
      <Flex
        gap={"3"}
        direction="column"
        px={"5"}
        py={"6"}
        style={{ backgroundColor: "var(--green-2)", borderRadius: "10px" }}
      >
        <Text
          style={{
            color: "var(--green-11)",
            fontWeight: "bold",
            fontSize: "24px"
          }}
        >
          목차
        </Text>
        <hr />
        {tocItems.map(item => {
          return (
            <Box key={item.id}>
              <Link
                href={`#${item.id}`}
                style={{
                  color: "var(--green-8)",
                  paddingLeft: item.pl,
                  display: "inline",
                  fontWeight: "500",
                  fontSize: "16px"
                }}
              >
                {item.title}
              </Link>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};
