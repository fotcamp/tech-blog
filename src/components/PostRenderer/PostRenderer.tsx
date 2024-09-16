import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "./mark-down-style.css";
import { BlockQuote, CodeBlock, Anchor, Paragraph, Callout, IndexList } from "./components";
import React, { Fragment } from "react";
import { Heading } from "@radix-ui/themes";

const getChildrenContent = (children: React.ReactNode): string => {
  const childrenArray = React.Children.toArray(children);

  for (const child of childrenArray) {
    if (React.isValidElement(child) && child.type === Paragraph) {
      const paragraphChildren = child.props.children;
      if (typeof paragraphChildren === "string") {
        return paragraphChildren;
      }
    }
  }

  return "";
};

const getHeadingText = (children: React.ReactNode): string => {
  const headingText = React.Children.toArray(children)
    .filter(child => typeof child === "string")
    .join(" ");

  return headingText;
};

export const PostRenderer = ({ content }: { content: string }) => {
  return (
    <Fragment>
      <IndexList content={content} />
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          img: ({ node, ...props }) => (
            <Image
              src={props.src || ""}
              alt={props.alt || ""}
              width={500}
              height={300}
              style={{ width: "100%", height: "auto" }}
            />
          ),
          code: CodeBlock,
          blockquote: ({ node, ...props }) => {
            const content = getChildrenContent(props.children);

            if (content.startsWith("[callout]")) {
              return <Callout>{content.substring("[callout]".length).trim()}</Callout>;
            }

            return <BlockQuote {...props} />;
          },
          a: Anchor,
          p: Paragraph,
          h1: props => (
            <Heading as="h1" id={getHeadingText(props.children)}>
              {props.children}
            </Heading>
          ),
          h2: props => (
            <Heading as="h2" id={getHeadingText(props.children)}>
              {props.children}
            </Heading>
          ),
          h3: props => (
            <Heading as="h3" id={getHeadingText(props.children)}>
              {props.children}
            </Heading>
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </Fragment>
  );
};
