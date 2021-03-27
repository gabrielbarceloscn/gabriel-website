import React from "react";
import Head from "next/head";
import {
    Button,
    Box,
    VStack,
    HStack,
    Text,
    IconButton,
    Link,
    Heading,
    SimpleGrid,
} from "@chakra-ui/react";
import Container from "../components/container";
import PageTransition from "../components/page-transitions";
import Section from "@/components/section";
import {InstagramLogo, TwitterLogo} from "phosphor-react";
import ProjectCard from "@/components/project-card";
import {getTable} from "@/lib/airtable";

const Home = ({projects}) => (
    <Box>
        <PageTransition>
            <VStack spacing={12}>
                <Section>
                    <VStack spacing={4} align="start" fontSize="2xl">
                        <Heading size="xl">Olá, Me chamo Gabriel Barcelos 👋</Heading>
                        <VStack>
                            <Text>
                                Sou programador, e também me interesso por empreendedorismo, marketing digital, e
                                vendas.
                            </Text>
                            {/*<Text>*/}
                            {/*    Comecei no empreendedorismo através da{" "}*/}
                            {/*    <Link*/}
                            {/*        variant="text"*/}
                            {/*        href="https://www.timesharesolucoes.com.br"*/}
                            {/*        isExternal*/}
                            {/*    >*/}
                            {/*        TimeShare Soluções*/}
                            {/*    </Link>*/}
                            {/*    .*/}
                            {/*</Text>*/}
                            <Text>
                                No{" "}
                                <Link
                                    variant="text"
                                    href="/blog"
                                >
                                    BLOG
                                </Link>{" "}
                                blog do site você encontrará conteúdos de programação/tecnologia e negócios.
                            </Text>
                            <Text>
                                Na minha{" "}
                                <Link
                                    variant="text"
                                    href="/books"
                                >
                                    BIBLIOTECA
                                </Link>{" "}
                                digital, mantenho uma lista de leitura atualizada. Inclusive, aceito sugestões de
                                leitura. 😀
                            </Text>
                        </VStack>
                        <Link href="https://instagram.com/gabrielbarceloscn" isExternal>
                            <Button
                                colorScheme="purple"
                                rounded="xl"
                                size="lg"
                                leftIcon={<InstagramLogo weight="fill"/>}
                                mt={4}
                            >
                                Instagram
                            </Button>
                        </Link>
                    </VStack>
                </Section>
                <Section>
                    <VStack align="start" spacing={8}>
                        <Heading size="lg">Projetos atuais</Heading>

                        <SimpleGrid columns={1} spacing={4} mt={8} w="100%">
                            {projects.map((projects) => (
                                <ProjectCard
                                    key={projects.id}
                                    name={projects.fields.name}
                                    description={projects.fields.description}
                                    logo={projects.fields.logo}
                                    link={projects.fields.link}
                                    type={projects.fields.type}
                                />
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Section>
            </VStack>
        </PageTransition>
    </Box>
);

export async function getStaticProps() {
    const projects = await getTable("Projects");

    return {
        props: {
            projects,
        },
        revalidate: 600,
    };
}

export default Home;
