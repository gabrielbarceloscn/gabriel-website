import React from "react";
import Section from "../components/section";
import {
    Heading,
    VStack,
    Box,
} from "@chakra-ui/react";
import ReadingProgress from "../components/reading-progress";
import BlogSeo from "../components/blog-seo";
import AuthorCard from "../components/author-card";
import Image from "next/image";
import PageTransition from "../components/page-transitions";

const getRootUrl = () => window.location.protocol + "//" + window.location.hostname + ((window.location.port) && ":" + window.location.port)

class BlogLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            rootUrl: null,

        };
    }

    componentDidMount() {
        this.setState(old => ({...old, rootUrl: getRootUrl()}));
    }

    render() {
        const target = React.createRef();
        return (
            <PageTransition>
                <>
                    <Section>
                        <BlogSeo
                            publishDate={this.props.meta.publishDate}
                            title={this.props.meta.title}
                            description={this.props.meta.description ?? " "}
                            url={`https://gabrielbarcelos.com.br/blog/${
                                this.props.meta.slug
                            }`}
                            image={this.props.meta.cover ?
                                this.props.meta.cover
                                : "https://gabrielbarcelos.com.br/static/images/banner.jpg"}
                        />
                        <article ref={target}>
                            <VStack w="100%" align="left" spacing={6}>
                                {this.props.meta.cover ? (
                                    <Box
                                        mt={4}
                                        rounded="lg"
                                        shadow="md"
                                        overflow="hidden"
                                        lineHeight={0}
                                    >
                                        {" "}
                                        <Image
                                            alt={this.props.meta.title}
                                            src={
                                                this.props.meta.cover
                                            }
                                            width={2240}
                                            height={1260}
                                        />
                                    </Box>
                                ) : undefined}
                                <VStack align="stretch" spacing={4}>
                                    <Heading as="h1">{this.props.meta.title}</Heading>
                                    <AuthorCard
                                        publishedAt={this.props.meta.publishDate}
                                        url={`${this.state.rootUrl}/blog/${this.props.meta.slug}`}
                                        updatedAt={this.props.meta.updateDate}
                                        // readingTime={this.props.meta.readingTime.text}
                                        tags={this.props.meta.tags}
                                    />
                                </VStack>
                            </VStack>
                            <div>{this.props.children}</div>
                        </article>
                        {/*<TwitterCard*/}
                        {/*  title={this.props.meta.title}*/}
                        {/*  slug={this.props.meta.slug}*/}
                        {/*/>*/}
                        <div ref={(el) => (this.div = el)}></div>
                    </Section>
                    <ReadingProgress target={target}/>
                </>
            </PageTransition>
        );
    }
}

export default BlogLayout;
