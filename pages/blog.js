import React from "react";
// import fs from "fs";
import { VStack, Text, Heading, useColorModeValue } from "@chakra-ui/react";
import PageTransition from "../components/page-transitions";
import Section from "@/components/section";
import BlogCard from "@/components/blog-card";
import sorter from "sort-isostring";
import NewsletterDrawer from "@/components/newsletter-drawer";
// import generateRss from "@/lib/rss";
import { NotionAPI } from 'notion-client';
import { getPageTitle, getAllPagesInSpace, getPageProperty } from 'notion-utils';
import {getAllPostMeta} from "@/lib/notion-services";

export default function Blog({ posts }) {
  return (
    <PageTransition>
      <Section>
        <VStack spacing={8}>
          {/*<VStack>*/}
          {/*  <Heading as="h1">Blog</Heading>*/}
          {/*  <Text*/}
          {/*    fontSize="2xl"*/}
          {/*    color={useColorModeValue("gray.500", "gray.200")}*/}
          {/*    maxW="lg"*/}
          {/*    textAlign="center"*/}
          {/*  >*/}
          {/*    Welcome to my blog. Here I share some of my thinking, insights and*/}
          {/*    views on life.*/}
          {/*  </Text>*/}
          {/*  <NewsletterDrawer placement="blog" />*/}
          {/*</VStack>*/}

          {!posts.length && "No posts found."}
          <VStack w="100%" align="start" spacing={4}>
            {posts
              // .filter((p) => p.Status === "Publicado")
              // .sort((x, y) =>
              //   sorter(y.fields.publishDate, x.fields.publishDate)
              // )
              .map((post, index) => {
                return <BlogCard key={index} {...post} />;
              })}
          </VStack>
        </VStack>
      </Section>
    </PageTransition>
  );
}

const comparePostDate = (strDateA, strDateB) => {
  const dateA = new Date(strDateA);
  const dateB = new Date(strDateB);

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

export async function getStaticProps(){
  const notionPosts = await getAllPostMeta();

  const notionPostsToShow =
      notionPosts
          .sort((a, b) => comparePostDate(a.publishDate, b.publishDate))
          .filter(criteria => criteria.status === "Publicado");

  return {
    props: {
      posts: notionPostsToShow
    },
    revalidate: 600
  }
}

export async function getStaticProps_teste() {

  // const posts = await getAllPosts();

  // const rss = await generateRss(posts);

  // fs.writeFileSync("./public/rss.xml", rss);

  // return {
  //   props: {
  //     posts,
  //   },
  //   // revalidate: 600,
  // };
}
