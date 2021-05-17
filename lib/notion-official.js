import { Client } from "@notionhq/client";

const notionClientOfficial = new Client({
    auth: process.env.NOTION_TOKEN,
});

export const getDatabaseOfficial = async (databaseId) => {
    const response = await notionClientOfficial.databases.query({
        database_id: databaseId,
    });
    return response.results;
};

export const getPageOfficial = async (pageId) => {
    const response = await notionClientOfficial.pages.retrieve({ page_id: pageId });
    return response;
};

export const getBlocksOfficial = async (blockId) => {
    const response = await notionClientOfficial.blocks.children.list({
        block_id: blockId,
        page_size: 50,
    });
    return response.results;
};

export const getPlainTextFromRichText = (richTextArray) => {
    let concat = "";

    if (richTextArray)
        richTextArray.map((obj, idx) => {
            concat += obj.plain_text;
        })

    return concat;
}