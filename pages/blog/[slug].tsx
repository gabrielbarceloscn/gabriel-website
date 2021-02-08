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
    }).filter(id => id === undefined);// Filtrar para apenas paths de paginas que contenham um slug, removendo null e undefined
    return {
        paths: slugs.map(slug => `/blog/${slug}`),
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params}) => {
    const fullSlug = params.slug;
    console.log('fullSlug', fullSlug);

    try {
        const page = (await getPages()).find(page =>{
            const meta = getMetaFromRecordMap((page as {recordMap}).recordMap);
            return meta.slug?.toLowerCase() == fullSlug?.toLowerCase();
        } )
        if(page){
            const recordMap = (page as {recordMap})?.recordMap;
            //console.log(JSON.stringify(recordMap));
            const meta = getMetaFromRecordMap(recordMap);
            const props = {...page, meta};
            return {
                props,
                revalidate: 600
            }
        }
        return {
            props: {
                error: {
                    statusCode: 404,
                    message: "Not Found"
                }
            },
            revalidate: 600
        }
    } catch (err) {
        console.error('page error', domain, fullSlug, err)

        if(fullSlug){
            throw new Error("Page error, not recreated! See log for more detail!");
        }
        return {
            props: {
                error: {
                    statusCode: err.statusCode || 500,
                    message: err.message
                }
            },
            revalidate: 600
        }
    }
};

// export const getStaticProps = async ({params}) => {
//
//     console.log('Slug to find', params.slug);
//     let notionPages = await getPages();
//     // console.log('Pages', notionPages);
//
//     const currentPage =
//         notionPages.find(page => page.rawPageId = params.slug);
//     // console.log('currentPage', currentPage);
//
//     const currentPageRecordMap = (currentPage as { recordMap }).recordMap;
//     const currentPageMeta = getMetaFromRecordMap(currentPageRecordMap);
//     console.log('🟡currentPageMeta', currentPageMeta, '👆');
//     const currentPageProps = {...currentPage, meta: currentPageMeta};
//     // console.log('currentPageProps', currentPageProps);
//
//     return {
//         props: currentPageProps,
//         revalidate: 600
//     }

// }
