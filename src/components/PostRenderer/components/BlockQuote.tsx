import { Blockquote } from "@radix-ui/themes";

type Props = React.ComponentPropsWithoutRef<"blockquote">;

export const BlockQuote = ({ children, ...props }: Props) => {
  return <Blockquote>{children}</Blockquote>;
};
