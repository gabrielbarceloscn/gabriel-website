import React from 'react'
import {NotionRenderer} from 'react-notion-x'
import BlogLayout from "@/layouts/blog";
import {useColorMode} from "@chakra-ui/react";
import PageTransition from "@/components/page-transitions";
import Section from "@/components/section";
import {getAllPostMeta, getMetaFromRecordMap, getRecordMaps} from "./services";

import slugify from 'slugify';

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
    const slugs = (await getAllPostMeta()).map(meta => {
        return meta.slug || (meta.title ? slugify(meta.title) : null);
    }).filter(slug => slug);

    console.log(`🟢 getStaticPaths: ${slugs} \n`)

    // Filtrar para apenas paths de paginas que contenham um slug, removendo null e undefined
    return {
        paths: slugs.map(slug => `/blog/${slug}`),
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params}) => {
    const config = require("./config.json");

    console.log(JSON.stringify(params));

    const fullSlug = params.slug.toString().concat("/");

    console.log(`🟡 getStaticProps for fullSlug => ${fullSlug} \n`);

    try {
        const recordMaps = await getRecordMaps();
        const paginaEncontrada = Object.entries(recordMaps).find(([_, recordMap]) => {
            const meta = getMetaFromRecordMap(recordMap);
            console.log(`metaData: ${JSON.stringify(meta)}`)
            // return meta.slug?.toLowerCase() == fullSlug?.toLowerCase() || (meta.title && slugify(meta.title)?.toLowerCase() == fullSlug?.toLowerCase());
            return meta.slug?.toLowerCase() == params.slug.toString().toLowerCase();
        })
        if (paginaEncontrada) {
            const [_, recordMap] = paginaEncontrada;
            //console.log(JSON.stringify(recordMap));
            const meta = getMetaFromRecordMap(recordMap);
            const props = {recordMap, meta};
            return {
                props,
                revalidate: config.cache_timeout_seconds
            }
        }
        return {
            props: {
                error: {
                    statusCode: 404,
                    message: "Not Found"
                }
            },
            revalidate: config.cache_timeout_seconds
        }
    } catch (err) {
        console.error('erro na página', fullSlug, err)

        if (fullSlug) {
            throw new Error("Erro na página, não recriada! Veja o log para mais detalhes!");
        }
        return {
            props: {
                error: {
                    statusCode: err.statusCode || 500,
                    message: err.message
                }
            },
            revalidate: config.cache_timeout_seconds
        }
    }
}
