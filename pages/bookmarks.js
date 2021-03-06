import React from "react";
import {
  VStack,
  Text,
  Heading,
  useColorModeValue,
  SimpleGrid,
  Grid,
} from "@chakra-ui/react";
import PageTransition from "../components/page-transitions";
import Section from "../components/section";
import sorter from "sort-isostring";

import BookmarkCard from "../components/bookmark-card";

const Bookmarks = ({ bookmarks }) => {
  return (
    <PageTransition>
      <VStack spacing={8}>
        <Section>
          <VStack>
            <Heading as="h1">Links úteis</Heading>
            <Text
              fontSize={["xl", "2xl"]}
              color={useColorModeValue("gray.500", "gray.200")}
              maxW="lg"
              textAlign="center"
            >
              Links que não posso perder de vista.
            </Text>
          </VStack>
        </Section>
        <Section>
          <SimpleGrid columns={[2, 3]} spacing={4}>
            {bookmarks.items
              .sort((x, y) => sorter(y.created, x.created))
              .map((bookmark) => (
                <BookmarkCard
                  key={bookmark.title}
                  title={bookmark.title}
                  cover={bookmark.cover}
                  created={bookmark.created}
                  excerpt={bookmark.excerpt}
                  type={bookmark.type}
                  link={bookmark.link}
                />
              ))}
          </SimpleGrid>
        </Section>
      </VStack>
    </PageTransition>
  );
};

export async function getStaticProps() {
  // const url = `https://api.raindrop.io/rest/v1/raindrops/0?search=[{"key":"important"}]
  const url = `https://api.raindrop.io/rest/v1/raindrops/0`;

  const res = await fetch(url, {
    method: "get",
    headers: new Headers({
      Authorization: `Bearer ${process.env.RAINDROP_ACCESS_TOKEN}`,
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  });

  const bookmarks = await res.json();

  // console.log(`bookMarks`, bookmarks);
  // console.log(`bookMarks[0].collection[0]`, bookmarks.items[0].collection);

  if (!bookmarks) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      bookmarks,
    },
    revalidate: 60,
  };
}

export default Bookmarks;
