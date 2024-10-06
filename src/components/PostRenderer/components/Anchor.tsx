import React from "react";
import { Link } from "@radix-ui/themes";

export const Anchor = (props: any) => {
  const parse = async () => {
    try {
      const response = await fetch(props.href);
      const text = await response.text();

      const title = text.match(/<title[^>]*>(.*?)<\/title>/i);
      if (title && title[1]) return title[1];

      const ogTitle = text.match(/<meta\s+property="og:title"\s+content="(.*?)"/i);
      if (ogTitle && ogTitle[1]) return ogTitle[1];

      return null;
    } catch (error) {
      console.error("Error fetching title:", error);
    }
  };

  return <Link {...props}>{parse() || props.children}</Link>;
};
