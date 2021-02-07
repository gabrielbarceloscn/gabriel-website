import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap, SearchParams, SearchResults } from 'notion-types'
import { mapNotionImageUrl } from './map-image-url'
import {getPageDescription} from "./get-page-description";
import {getPageProperty} from "notion-utils";

const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL
})

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId)
  const blockIds = Object.keys(recordMap.block)
  //console.log(JSON.stringify(recordMap, null, 2));
  //console.log(recordMap);
  const imageUrls: string[] = blockIds
    .map((blockId) => {
      const block = recordMap.block[blockId]?.value

      if (block) {
        if (block.type === 'image') {
          const source = block.properties?.source?.[0]?.[0]

          if (source) {
            return {
              block,
              url: source
            }
          }
        }

        if ((block.format as any)?.page_cover) {
          const source = (block.format as any).page_cover

          return {
            block,
            url: source
          }
        }
      }

      return null
    })
    .filter(Boolean)
    .map(({ block, url }) => mapNotionImageUrl(url, block))
    .filter(Boolean)

  // const urls = Array.from(new Set(imageUrls))
  // const previewImageMap = await getPreviewImages(urls)
  // ;(recordMap as any).preview_images = previewImageMap

  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  return notion.search(params)
}
