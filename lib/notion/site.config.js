module.exports = {
  // where it all starts -- the site's root Notion page (required)
  rootNotionPageId: '2cda41d93f6743b0ab3fd98724f7f0ef',

  // basic site info (required)
  name: 'Gabriel Barcelos',
  domain: 'Gb-PostsWrapper',
  author: 'Gabriel Barcelos',

  // open graph metadata (optional)
  // description: 'Example site description',
  // socialImageTitle: 'Transitive Bullshit',
  // socialImageSubtitle: 'Hello World! 👋',

  // social usernames (optional)
  // twitter: 'transitive_bs',
  // github: 'transitive-bullshit',
  // linkedin: 'fisch2',

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null, // URL
  defaultPageCover: null, // URL
  defaultPageCoverPosition: 0.5,

  // image CDN host to proxy all image requests through (optional)
  // NOTE: this requires you to set up an external image proxy
  imageCDNHost: null,

  // Utteranc.es comments via GitHub issue comments (optional)
  utterancesGitHubRepo: null,

  // whether or not to enable support for LQIP preview images (optional)
  // NOTE: this requires you to set up Google Firebase and add the environment
  // variables specified in .env.example
  isPreviewImageSupportEnabled: false
}
