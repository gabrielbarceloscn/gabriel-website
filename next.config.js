const withMDX = require("@next/mdx")({
    extension: /\.mdx?$/,
});

module.exports = withMDX({
    pageExtensions: ["js", "tsx", "jsx", "mdx"],
    images: {
        domains: [
            "dl.airtable.com",
            "www.notion.so"
        ],
    },
});
