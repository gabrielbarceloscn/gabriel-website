import React from "react";
import {
  chakra,
  Icon,
  VStack,
  HStack,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
  SimpleGrid,
  useTab,
  useStyles,
  Link,
} from "@chakra-ui/react";
import PageTransition from "../components/page-transitions";
import { getTable } from "@/lib/airtable";
import Section from "@/components/section";
import BookCard from "@/components/book-card";

import BookSuggestion from "@/components/book-suggestion";
import { BookOpen, Heart } from "heroicons-react";
import sorter from "sort-isostring";

const Books = ({ books }) => {
  const StyledTab = chakra("button", { themeKey: "Tabs.Tab" });

  return (
    <PageTransition>
      <VStack spacing={8}>
        <Section>
          <VStack>
            <Heading as="h1">Biblioteca</Heading>
            <Text
              fontSize={["xl", "2xl"]}
              color={useColorModeValue("gray.500", "gray.200")}
              maxW="lg"
              textAlign="center"
            >
              Na adolescência lia muito por diversão. Com o passar dos anos foquei em livros de Marketing, Negócios, Mindset e Vendas. Aceito sugestões de novos livros!
            </Text>
            <BookSuggestion />
          </VStack>
        </Section>
        <Section>
          <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            align="center"
            w="100%"
          >
            <TabList>
              <Tab
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.500", "gray.500")}
                _selected={{
                  color: "blue.800",
                  bg: "blue.100",
                }}
                mr={2}
              >
                <HStack spacing={1}>
                  <Icon as={BookOpen} />
                  <Text>Na Lista</Text>
                </HStack>
              </Tab>
              <Tab
                bg={useColorModeValue("gray.100", "gray.800")}
                color={useColorModeValue("gray.600", "gray.500")}
                _selected={{
                  color: "red.800",
                  bg: "red.100",
                }}
              >
                <HStack spacing={1}>
                  <Icon as={Heart} />
                  <Text>Lendo</Text>
                </HStack>
              </Tab>
              <Tab
                  bg={useColorModeValue("gray.100", "gray.800")}
                  color={useColorModeValue("gray.600", "gray.500")}
                  _selected={{
                    color: "red.800",
                    bg: "red.100",
                  }}
              >
                <HStack spacing={1}>
                  <Icon as={Heart} />
                  <Text>Lido</Text>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0}>
                <SimpleGrid columns={[1, 2]} spacingY={8} spacingX={4} mt={8}>
                  {books
                    .filter((b) => b.fields.Status === 'Na Lista')
                    .map((book) => (
                      <BookCard
                        key={book.id}
                        title={book.fields.Title}
                        author={book.fields.Author}
                        rating={book.fields.Rating || 0}
                        isFavorite={book.fields.Favorite}
                        cover={book.fields.Cover}
                        dateRead={book.fields["Date Read"]}
                      />
                    ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel px={0}>
                <SimpleGrid columns={[1, 2]} spacingY={8} spacingX={4} mt={8}>
                  {books
                      .filter((b) => b.fields.Status === 'Lendo')
                    .map((book) => (
                      <BookCard
                        key={book.id}
                        title={book.fields.Title}
                        author={book.fields.Author}
                        rating={book.fields.Rating || 0}
                        isFavorite={book.fields.Favorite}
                        cover={book.fields.Cover}
                        dateRead={book.fields["Date Read"]}
                      />
                    ))}
                </SimpleGrid>
              </TabPanel>
              <TabPanel px={0}>
                <SimpleGrid columns={[1, 2]} spacingY={8} spacingX={4} mt={8}>
                  {books
                      .filter((b) => b.fields.Status === 'Lido')
                      .sort((x, y) =>
                          sorter(y.fields["Date Read"], x.fields["Date Read"])
                      )
                      .map((book) => (
                          <BookCard
                              key={book.id}
                              title={book.fields.Title}
                              author={book.fields.Author}
                              rating={book.fields.Rating}
                              isFavorite={book.fields.Favorite}
                              cover={book.fields.Cover}
                              dateRead={book.fields["Date Read"]}
                          />
                      ))}
                </SimpleGrid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Section>
      </VStack>
    </PageTransition>
  );
};

export async function getStaticProps() {
  const books = await getTable("Books");

  return {
    props: {
      books,
    },
    revalidate: 600,
  };
}

export default Books;
