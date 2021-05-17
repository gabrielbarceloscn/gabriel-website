import Head from "next/head";
import React from "react";
import { Box, ChakraProvider } from "@chakra-ui/react";
import customTheme from "theme";
import FontFace from "components-mdx/font-face";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import Header from "../components/header";
import Footer from "../components/footer";
import MobileNavigation from "../components/mobile-navigation";
import {LightSoundProvider} from "../components/light-sound-context"

import 'react-notion-x/src/styles.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'styles/notion.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
          <meta name="theme-color" content="#2BB0EC" />
        </Head>
        <DefaultSeo {...SEO} />
        <LightSoundProvider>{/*Provide only sound to prevent memory leak*/}
          <Header />
          <Box as="main" pt={{ base: 16, md: 32 }} pb={{ base: 24, md: 16 }}>
            <Component {...pageProps} />
          </Box>
          <MobileNavigation />
        </LightSoundProvider>
        <Footer />
      </ChakraProvider>
      <FontFace />
    </>
  );
};

export default App;
