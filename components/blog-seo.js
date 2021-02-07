import {NextSeo, ArticleJsonLd} from "next-seo";

const BlogSeo = ({title, description, publishDate, url, image}) => {

    console.log('publishDate', publishDate);
    const handledPublishDate = publishDate.split(' ')[0];
    console.log('handledPublishDate', handledPublishDate);
    const date = new Date(handledPublishDate).toISOString();
    const featuredImage = {
        url: `https://gabrielbarcelos.com.br${image}`,
        alt: title,
    };

    return (
        <>
            <NextSeo
                title={`${title} – Gabriel Barcelos`}
                description={description}
                canonical={url}
                openGraph={{
                    type: "article",
                    article: {
                        publishedTime: date,
                    },
                    url,
                    title,
                    description: description,
                    images: [featuredImage],
                }}
            />
            <ArticleJsonLd
                authorName="Gabriel Barcelos"
                dateModified={date}
                datePublished={date}
                description={description}
                images={[featuredImage]}
                publisherLogo="/static/favicons/android-chrome-192x192.png"
                publisherName="Gabriel Barcelos"
                title={title}
                url={url}
            />
        </>
    );
};

export default BlogSeo;
