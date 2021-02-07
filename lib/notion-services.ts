import {ExtendedRecordMap} from "notion-types";
import {getPageProperty} from "notion-utils";
import {mapNotionImageUrl} from "./notion/map-image-url";
import readingTime from "reading-time";
import {getSiteMaps} from "./notion/get-site-maps";
import {resolveNotionPage} from "./notion/resolve-notion-page";
import {domain} from "./notion/config";
import dateformat from "dateformat";

const timezone = "+0";

export async function getPages(){
    const siteMaps = await getSiteMaps()
    const pageIds = siteMaps.flatMap((siteMap) =>
        siteMap?.canonicalPageMap ?
            Object.keys(siteMap.canonicalPageMap).map((pageId) => (
                pageId
            )) : [])
        .filter((f) => f !== 'my-blog-posts' && f !== 'gb-postswrapper');

    // console.log('\n \n pageIds AFTER filter', pageIds);

    return await Promise.all(pageIds.map(async (rawPageId)=>{
        return {rawPageId, ...(await resolveNotionPage(domain, rawPageId))}
    }))

}

export async function getAllPostMeta(){
    return (await getPages()).map(({rawPageId, recordMap}: any) => {
        return {rawPageId, ...getMetaFromRecordMap(recordMap)}
    });
}

export function getMetaFromRecordMap(recordMap: ExtendedRecordMap){
    const keys = Object.keys(recordMap.block || {})
    const block = recordMap?.block?.[keys[0]]?.value

    //TODO: arrumar esta gambiarra
    const status = getPageProperty('Status', block, recordMap);
    const title = getPageProperty('Name', block, recordMap);
    let description = getPageProperty('Description', block, recordMap);
    if(description == "")
        description = null;
    const tags = getPageProperty('Tags', block, recordMap)?.split(",") ?? null;
    const collectionId = block.parent_id
    const collection = recordMap.collection[collectionId]?.value
    const schemas = collection?.schema
    const publishDateId = schemas ? Object.keys(schemas).find((id) => schemas[id].name === "PublishDate") : null;
    const publishDateCollection = block.properties?.[publishDateId];
    const publishDateProps = publishDateCollection ? publishDateCollection[0][1][0][1] : null;
    let publishDate = publishDateProps?.start_date
    if(publishDate)
        publishDate += publishDateProps?.start_time ? " " + publishDateProps?.start_time : ` 00:00${timezone}`
    const updateDate = block.last_edited_time ? dateformat( new Date(block.last_edited_time ), `yyyy-mm-dd HH:MM${timezone}`) : null;
    const cover_unmaped = (block.format as {page_cover})?.page_cover ?? undefined;
    const cover = mapNotionImageUrl(cover_unmaped, block);
    const slug = getPageProperty('Slug', block, recordMap);
    return {
        status,
        title,
        description,
        tags,
        cover,
        publishDate,
        updateDate,
        slug,
        wordCount: 0,
        readingTime: readingTime(""),
    }
}