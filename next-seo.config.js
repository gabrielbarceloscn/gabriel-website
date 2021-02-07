const title = "Gabriel Barcelos";
const description = "Programador e Empresário. ";

const SEO = {
  title,
  description,
  canonical: "https://gabrielbarcelos.com.br",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://gabrielbarcelos.com.br",
    title,
    description,
    images: [
      {
        url: "https://gabrielbarcelos.com.br/static/images/banner.jpg",
        alt: title,
        width: 2240,
        height: 1260,
      },
    ],
  },
  twitter: {
    handle: "@gabrielrb",
    site: "@gabrielrb",
    cardType: "summary_large_image",
  },
};

export default SEO;
