import { Box } from "@radix-ui/themes";

export const checkIsCallout = () => {};

export const Callout = (props: any) => {
  return <Box className={`${props.className} callout`}>{props.children}</Box>;
};
