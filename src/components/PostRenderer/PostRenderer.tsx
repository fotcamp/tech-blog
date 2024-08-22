import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";
import "./mark-down-style.css";
import { BlockQuote, CodeBlock } from "./components";

export const PostRenderer = ({ content }: { content: string }) => {
  return (
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
        blockquote: BlockQuote
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
