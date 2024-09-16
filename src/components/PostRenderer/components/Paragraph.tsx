import { Text } from "@radix-ui/themes";

export const Paragraph = (props: any) => {
  return (
    <Text as="p" className={`${props.className} paragraph`}>
      {props.children}
    </Text>
  );
};
