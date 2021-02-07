import React from 'react'
import {isDev, domain} from 'lib/notion/config'
import {NotionRenderer} from 'react-notion-x'
import {mapNotionImageUrl} from "lib/notion/map-image-url";
import BlogLayout from "@/layouts/blog";
import {useColorMode} from "@chakra-ui/react";
import {getMetaFromRecordMap, getPages} from "lib/notion-services";
import PageTransition from "@/components/page-transitions";
import Section from "@/components/section";

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
    const slugs = (await getPages()).map(page => {
        const meta = getMetaFromRecordMap((page as { recordMap }).recordMap);
        return meta.slug;
    }).filter(id => id);// Filtrar para apenas paths de paginas que contenham um slug, removendo null e undefined
    return {
        paths: slugs.map(slug => `/blog/${slug}`),
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params}) => {

    // console.log('\n params', params);

    let notionPages = await getPages();

    // console.log('\n notionPages', notionPages);

    const currentPage =
        notionPages.find(page => page.rawPageId = params.slug);

    const currentPageRecordMap = (currentPage as { recordMap }).recordMap;
    const currentPageMeta = getMetaFromRecordMap(currentPageRecordMap);
    const currentPageProps = {...currentPage, meta: currentPageMeta};

    // console.log('\n 🟡 currentPageProps', currentPageProps);

    return {
        props: currentPageProps,
        revalidate: 600
    }

}
