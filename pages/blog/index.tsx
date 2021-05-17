
import React from "react";
import { VStack, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import PageTransition from "../../components/page-transitions";
import Section from "../../components/section";
import BlogCard from "../../components/blog-card";
import {getAllPostMeta} from "lib/notion-unofficial";
import {getDatabaseOfficial, getPlainTextFromRichText} from "lib/notion-official";
import StandardSeo from "../../components/standard-seo";

export default function Blog({ posts }: { posts: { slug, publishDate, description, title }[]}) {
    return (
        <PageTransition>
            <StandardSeo
                title="Blog – Gabriel Barcelos"
                description = "Produtividade, Tecnologia e Empreendedorismo"
                url = "https://gabrielbarcelos.com.br/blog"
            />
            <Section>
                <VStack spacing={8}>
                    <VStack>
                        <Heading as="h1">Blog</Heading>
                        <Text
                            fontSize="2xl"
                            color={useColorModeValue("gray.500", "gray.200")}
                            maxW="lg"
                            textAlign="center"
                        >
                            Produtividade, Tecnologia e Empreendedorismo
                        </Text>
                    </VStack>

                    {!posts.length && "Sem posts no momento."}
                    <VStack w="100%" align="start" spacing={4}>
                        {posts
                            .map((post: any, index) => {
                                return <BlogCard key={index} {...post}/>;
                            })}
                    </VStack>
                </VStack>
            </Section>
        </PageTransition>
    );
}

const comparePostDate = ({publishDate:strDateA, updateDate:strUpdateDateA, pinned:pinnedA}:{publishDate: string, updateDate: string, pinned:boolean},
                         {publishDate:strDateB, updateDate:strUpdateDateB, pinned:pinnedB}:{publishDate: string, updateDate: string, pinned:boolean}) => {
    if(pinnedA && !pinnedB)
        return -1
    if(pinnedB && !pinnedA)
        return 1


    let dateA = new Date(strDateA);
    let dateB = new Date(strDateB);

    if(pinnedA && pinnedB){
        dateA = new Date(strUpdateDateA);
        dateB = new Date(strUpdateDateB);
    }

    if(!strDateA)
        return 1;
    else if(!strDateB)
        return -1;

    if (dateA < dateB) {
        return 1;
    }
    if (dateA > dateB) {
        return -1;
    }
    // a must be equal to b
    return 0;
}

export const getStaticProps = async () => {
    const databaseId = process.env.NOTION_DATABASE_PAGE_ID;
    const notionDatabase = await getDatabaseOfficial(databaseId);

    // console.log(`DATABASE: ${JSON.stringify(notionDatabase)}`)

    const posts = notionDatabase.map((post, index) => {

        return {
            pageId: post["id"],
            title: getPlainTextFromRichText(post.properties["Name"]["title"]),
            description: getPlainTextFromRichText(post.properties["Description"]["rich_text"]),
            slug: getPlainTextFromRichText(post.properties["Slug"]["rich_text"]),
            publishDate: post["created_time"],
            updateDate: post["last_edited_time"],
            pinned: post.properties["Pinned"]["checkbox"],
            status: post.properties["Status"]["select"]["name"]
        }
    });

    const orderedPosts = posts.sort(comparePostDate);

    const filteredPosts = orderedPosts.filter(post => post.status === 'Postado');

    return {
        props: {
            posts: filteredPosts
        },
        revalidate: +process.env.NEXTJS_REVALIDATE_TIMEOUT
    }
}
