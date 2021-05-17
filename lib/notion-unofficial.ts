import {ExtendedRecordMap} from "notion-types";
import {getAllPagesInSpace, getPageProperty} from "notion-utils";
import dateformat from "dateformat";
import moment from "moment";
import {NotionAPI} from "notion-client";
import {defaultMapImageUrl} from "react-notion-x";
import {Block} from "react-notion-x/src/types";
import {mapNotionImageUrl} from "./notion-map-image-url";

const notion = new NotionAPI()

const timezone = moment().format("Z");


export async function getRecordMaps(){
    return await getAllPagesInSpace(
        process.env.NOTION_ROOT_PAGE_ID,
        undefined,
        notion.getPage.bind(notion),
        {
            traverseCollections: false
        }
    );
}

export async function getPageRecordMapUnnoficial(pageId){
    return await notion.getPage(pageId);
}

export async function getAllPostMeta(){
    const recordMaps = await getRecordMaps();
    return Object.entries(recordMaps).map(([_, recordMap]) => {
        return getMetaFromRecordMap(recordMap)
    });
}

export function getMetaFromRecordMap(recordMap){
    const keys = Object.keys(recordMap.block || {})
    const block = recordMap?.block?.[keys[0]]?.value

    const status = getPageProperty('Status', block, recordMap);
    const title = getPageProperty('Name', block, recordMap);
    const slug = getPageProperty('Slug', block, recordMap);

    const tags = getPageProperty('Tags', block, recordMap)?.split(",") ?? null;
    let description = getPageProperty('Description', block, recordMap);
    if(description == "")
        description = null;
    const collectionId = block.parent_id
    const collection = recordMap.collection[collectionId]?.value
    const schemas = collection?.schema

    const pinnedId = schemas ? Object.keys(schemas).find((id) => schemas[id].name === "Pinned") : null;
    const pinnedCollection = block.properties?.[pinnedId];
    const pinned = pinnedCollection ? pinnedCollection[0][0] === "Yes" : false;

    const publishDateId = schemas ? Object.keys(schemas).find((id) => schemas[id].name === "PublishDate") : null;
    const publishDateCollection = block.properties?.[publishDateId];
    const publishDateProps = publishDateCollection ? publishDateCollection[0][1][0][1] : null;
    let publishDate = publishDateProps?.start_date || null
    if(publishDate)
        publishDate += publishDateProps?.start_time ? "T" + publishDateProps?.start_time : `T00:00${timezone}`
    const updateDate = block.last_edited_time ? dateformat( new Date(block.last_edited_time ), `yyyy-mm-dd"T"HH:MM${timezone}`) : null;
    const cover_unmaped = (block.format as {page_cover})?.page_cover ?? undefined;
    const cover = mapNotionImageUrl(cover_unmaped,block);

    // console.log(`\n 👀 getMetaFromRecordMap for slug: ${slug} and cover: ${cover}`);

    return {
        pinned,
        status,
        title,
        description,
        tags,
        cover,
        publishDate,
        updateDate,
        slug
    }
}