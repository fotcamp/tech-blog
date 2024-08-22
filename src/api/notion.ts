import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse
} from "@notionhq/client/build/src/api-endpoints";

import { NotionToMarkdown } from "notion-to-md";
import { Article } from "./types";

export const notionClient = new Client({
  auth: process.env.NOTION_TOKEN
});

export const n2m = new NotionToMarkdown({
  notionClient: notionClient,
  config: {
    parseChildPages: false
  }
});

/**
 * get notion database
 */
export async function queryNotionDatabase(): Promise<DatabaseObjectResponse[]> {
  try {
    const response = await notionClient.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        and: [
          {
            property: "exposure",
            checkbox: {
              equals: true
            }
          }
        ]
      }
    });

    return response.results as DatabaseObjectResponse[];
  } catch (error) {
    throw new Error("Error in queryNotionDatabase function");
  }
}

/**
 * get notion page data
 * @param pageId notion page Id
 */
export async function getPageInfo(pageId: string): Promise<PageObjectResponse> {
  try {
    const response = await notionClient.pages.retrieve({ page_id: pageId });
    return response as PageObjectResponse;
  } catch (error) {
    console.error("Error fetching page info:", error);
    throw error;
  }
}

/**
 * get article info list from database
 */
export async function getArticleInfoList(): Promise<Article[]> {
  const database = await queryNotionDatabase();

  const articleList = database.map(item => {
    const itemName = item.properties.name as any;
    const title = itemName.title[0].plain_text;
    const coverImageUrl =
      item.cover?.type === "file" ? item.cover?.file.url : "/default_cover_image.png";
    return {
      pageId: item.id,
      title: title,
      createdAt: new Date(item.created_time),
      thumbnailUrl: coverImageUrl,
      properties: item.properties
    };
  });

  return articleList as Article[];
}

/**
 * get notion page markdown
 * @param pageId notion page id
 */
export const fetchArticleContent = async (pageId: string) => {
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  return n2m.toMarkdownString(mdBlocks);
};
