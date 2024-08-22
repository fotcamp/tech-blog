type Props = React.ComponentPropsWithoutRef<"code">;

export const CodeBlock = ({ children, className, ...props }: Props) => {
  return (
    <code className={`${className} code-block`} {...props}>
      {children}
    </code>
  );
};
