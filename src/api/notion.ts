import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse
} from "@notionhq/client/build/src/api-endpoints";

import { NotionToMarkdown } from "notion-to-md";
import { Article, MultiSelectOption } from "./types";
import { convertImageUrl } from "./s3Image";

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

  const articleList = await Promise.all(
    database.map(async item => {
      const itemName = item.properties.name as any;
      const title = itemName.title[0].plain_text;
      let coverImageUrl = "/default_cover_image.png";

      if (item.cover?.type === "file") {
        coverImageUrl = await convertImageUrl(item.cover.file.url);
      }

      return {
        pageId: item.id,
        title: title,
        createdAt: new Date(item.created_time),
        thumbnailUrl: coverImageUrl,
        properties: item.properties
      };
    })
  );

  return articleList as Article[];
}

/**
 * get notion page markdown
 * @param pageId notion page id
 */
export const fetchArticleContent = async (pageId: string) => {
  const mdBlocks = await n2m.pageToMarkdown(pageId);

  const convertedMdBlocks = await Promise.all(
    mdBlocks.map(async block => {
      if (block.type === "image") {
        const imageUrlMatch = block.parent.match(/\((https:\/\/.*?)\)/);
        if (
          imageUrlMatch &&
          imageUrlMatch[1].includes("prod-files-secure.s3.us-west-2.amazonaws.com")
        ) {
          const originalUrl = imageUrlMatch[1];
          const convertedUrl = await convertImageUrl(originalUrl);
          block.parent = block.parent.replace(originalUrl, convertedUrl);
        }
      }
      return block;
    })
  );

  return n2m.toMarkdownString(convertedMdBlocks);
};

export const searchArticle = async (key: string) => {
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
          },
          {
            property: "title",
            rich_text: {
              contains: key
            }
          }
        ]
      }
    });

    const result = response.results as DatabaseObjectResponse[];

    const titleList = result.map(async item => {
      const itemName = item.properties.name as any;
      const title = itemName.title[0].plain_text;
      let coverImageUrl = "/default_cover_image.png";

      if (item.cover?.type === "file") {
        coverImageUrl = await convertImageUrl(item.cover.file.url);
      }

      return {
        pageId: item.id,
        title: title,
        createdAt: new Date(item.created_time),
        thumbnailUrl: coverImageUrl,
        properties: item.properties
      };
    });
    return titleList;
  } catch (error) {
    console.error("Error in searchArticle function:", error);
    throw new Error("Error in searchArticle function");
  }
};

/*
 * pageId로 title, createdAt, role, coverImage를 가져오는 함수
 */
interface PostPage extends Article {
  role: string;
}

export async function getPostPage(pageId: string): Promise<PostPage> {
  try {
    const pageInfo = await getPageInfo(pageId);
    const nameProperty = pageInfo.properties.name;
    const title =
      nameProperty?.type === "title" && nameProperty.title?.[0]?.plain_text
        ? nameProperty.title[0].plain_text
        : "제목 없음";
    const createdAt = new Date(pageInfo.created_time);
    const roleProperty = pageInfo.properties.role;
    const role =
      roleProperty?.type === "multi_select" && roleProperty.multi_select
        ? roleProperty.multi_select
            .map((selectItem: MultiSelectOption) => selectItem.name)
            .join(", ")
        : "None";
    let coverImageUrl = "/default_cover_image.png";
    if (pageInfo.cover?.type === "file") {
      coverImageUrl = await convertImageUrl(pageInfo.cover.file.url);
    }

    return {
      pageId,
      title,
      createdAt,
      thumbnailUrl: coverImageUrl,
      properties: pageInfo.properties,
      role
    };
  } catch (error) {
    console.error("Error fetching postPage:", error);
    throw error;
  }
}
