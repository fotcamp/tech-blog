import { Box } from "@radix-ui/themes";
import React from "react";

export default function ArticleDetailPage({ params }: { params: { articleNo: string } }) {
  const articleNo = params.articleNo;
  return <Box>Article Page - {articleNo}</Box>;
}
