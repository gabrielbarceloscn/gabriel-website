import React from 'react'
import {NotionRenderer} from 'react-notion-x'
import BlogLayout from "@/layouts/blog";
import {useColorMode} from "@chakra-ui/react";
import PageTransition from "../../components/page-transitions";
import Section from "../../components/section";
import {getAllPostMeta, getMetaFromRecordMap, getPageRecordMapUnnoficial, getRecordMaps} from "lib/notion-unofficial";
import {mapNotionImageUrl} from "lib/notion-map-image-url";
import {getDatabaseOfficial, getPlainTextFromRichText} from "@/lib/notion-official";

const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV

export default function NotionDomainDynamicPage({recordMap, meta, error}) {
    const {colorMode} = useColorMode();
    const isDarkMode = colorMode === "dark";
    if (error) {
        return (
            <PageTransition>
                <Section>
            <span>
              Erro {error.statusCode}: {error.message}
            </span>
                    <br/>
                    <span>

            </span>
                </Section>
            </PageTransition>
        )
    }

    return (
        <BlogLayout meta={meta}>

            <NotionRenderer
                recordMap={recordMap}
                darkMode={isDarkMode}
                mapImageUrl={mapNotionImageUrl}
                previewImages={false}
            />
        </BlogLayout>
    )

}

export async function getStaticPaths() {
    if (isDev) {
        return {
            paths: [],
            fallback: 'blocking'
        }
    }

    const databaseId = process.env.NOTION_DATABASE_PAGE_ID;
    const notionDatabase = await getDatabaseOfficial(databaseId);
    const allPostsSlugAndPageIdArray = notionDatabase.map((post, index) => {
        return {
            pageId: post["id"],
            slug: getPlainTextFromRichText(post.properties["Slug"]["rich_text"])
        }
    });

    const slugs = allPostsSlugAndPageIdArray.map(x => x.slug).filter(slug => slug);

    // console.log(`🟢 getStaticPaths: ${slugs} \n`)

    // Filtrar para apenas paths de paginas que contenham um slug, removendo null e undefined

    return {
        paths: slugs.map(slug => `/blog/${slug}`),
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params}) => {

    const currentSlug = params.slug.toString();

    try {
        const databaseId = process.env.NOTION_DATABASE_PAGE_ID;
        const notionDatabase = await getDatabaseOfficial(databaseId);
        const allPostsSlugAndPageIdArray = notionDatabase.map((post, index) => {
            return {
                pageId: post["id"],
                slug: getPlainTextFromRichText(post.properties["Slug"]["rich_text"])
            }
        });

        // console.log(`⚠️ SlugsArray: ${JSON.stringify(allPostsSlugAndPageIdArray)} \n`)

        const currentPageId =
            allPostsSlugAndPageIdArray.find(x => x.slug === currentSlug)
                .pageId;

        // console.log(`⚠️ currentPageId: ${currentPageId}`)

        const currentRecordMap =
            await getPageRecordMapUnnoficial(currentPageId);
        const currentMeta =
            getMetaFromRecordMap(currentRecordMap);

        return {
            props: {
                recordMap: currentRecordMap,
                meta: currentMeta
            },
            revalidate: +process.env.NEXTJS_REVALIDATE_TIMEOUT
        }
    } catch (err) {
        console.error('erro na página', currentSlug, err)

        if (currentSlug) {
            throw new Error("Erro na página, não recriada! Veja o log para mais detalhes!");
        }
        return {
            props: {
                error: {
                    statusCode: err.statusCode || 500,
                    message: err.message
                }
            },
            revalidate: +process.env.NEXTJS_REVALIDATE_TIMEOUT
        }
    }
}
