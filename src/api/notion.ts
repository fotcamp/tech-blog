import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse
} from "@notionhq/client/build/src/api-endpoints";
import { NotionToMarkdown } from "notion-to-md";
import { Article, MultiSelectOption } from "./types";

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
 * 조회수를 증가시키는 함수
 */
export async function incrementPageView(pageId: string): Promise<number> {
  const page: any = await notionClient.pages.retrieve({ page_id: pageId });

  console.log(
    `-------------------Page Data-------------------
    `,
    JSON.stringify(page, null, 2)
  );

  // 'views' 속성이 존재하고 number 타입인 경우 조회수 증가
  if (page.properties.views) {
    const views = page.properties.views.number || 0;

    // 조회수를 1 증가시켜 업데이트
    await notionClient.pages.update({
      page_id: pageId,
      properties: {
        views: {
          number: views + 1
        }
      }
    });

    return views + 1;
  } else {
    throw new Error("views 필드를 찾을 수 없습니다.");
  }
}

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

    const titleList = result.map(item => {
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
    const coverImageUrl =
      pageInfo.cover?.type === "file" && pageInfo.cover.file
        ? pageInfo.cover.file.url
        : "/default_cover_image.png";
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
