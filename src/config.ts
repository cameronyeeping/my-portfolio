export const SITE = {
  website: "https://cameronyeeping.github.io/", // replace this with your deployed domain
  author: "Cameron Yee-Ping",
  profile: "https://github.com/cameronyeeping",
  desc: "Computer Science student at SFU interested in Deep Learning and Graphics",
  title: "Cameron Yee-Ping",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 4,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "https://github.com/cameronyeeping/my-portfolio/edit/main/src/content/blog/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "America/Vancouver", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
