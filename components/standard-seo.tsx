import {NextSeo} from "next-seo";
import Section from "@/components/section";

import SEO from "../next-seo.config";

export default  function StandardSeo(
    {
        title= SEO.title,
        description= SEO.description,
        url= SEO.canonical,
        imagePath= "static/images/banner.jpg",
        width= SEO.openGraph.images[0].width,
        height= SEO.openGraph.images[0].height,
    }){
    return (

        <NextSeo
            title={title}
            description={description}
            canonical={url}
            openGraph={{
                url,
                title,
                description,
                images:[
                    {
                        url: `https://gabrielbarcelos.com.br/${imagePath}`,
                        alt: title,
                        width,
                        height,
                    }]
            }}
        />
    )
}