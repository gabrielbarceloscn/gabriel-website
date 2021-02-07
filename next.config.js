const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
});

module.exports = withMDX({
    publicRuntimeConfig: {
        GTagId: process.env.GTAG_ID
    },
    pageExtensions: ["js", "tsx", "jsx", "mdx"],
    images: {
        domains: [
            "dl.airtable.com",
            "www.notion.so"
        ],
    },
});
