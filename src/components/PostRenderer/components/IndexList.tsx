import { Box, Flex, Heading, Link } from "@radix-ui/themes";

export const IndexList = ({ content }: { content: string }) => {
  const headings = content.match(/^#{1,6}\s+.+$/gm) || [];
  const tocItems = headings.map(heading => {
    const level = heading.match(/^#+/)?.[0].length || 0;
    const title = heading.replace(/^#+\s+/, "");
    const id = title.toLowerCase().replace(/\s+/g, "-");
    const pl = (level - 1) * 5;
    return { id, title, level, pl };
  });

  if (tocItems.length === 0) return <></>;
  return (
    <Flex gap={"3"} direction="column">
      <Heading as="h1">목차</Heading>
      <Flex
        gap={"3"}
        direction="column"
        px={"5"}
        py={"6"}
        style={{ backgroundColor: "#F3FCF2", borderRadius: "10px" }}
      >
        {tocItems.map(item => {
          return (
            <Box key={item.id}>
              <Link
                href={`#${item.id}`}
                style={{ color: "#50BF50", paddingLeft: item.pl, display: "inline" }}
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
