import Link from "next/link";
import { NextSeo } from "next-seo";
import { Center, Heading, VStack, Text } from "@chakra-ui/react";
import Container from "../components/container";

export default function NotFound() {
  return (
    <Container>
      <Center>
        <NextSeo
          title="404 – Gabriel Barcelos"
          canonical="https://gabrielbarcelos.com.br/404"
          openGraph={{
            url: "https://gabrielbarcelos.com.br/404",
            title: "404 – Gabriel Barcelos",
          }}
        />
        <VStack>
          <Heading size="3xl">404</Heading>
          <Text mb={8}>Página não encontrada</Text>
          <Link href="/">Voltar ao início</Link>
        </VStack>
      </Center>
    </Container>
  );
}
