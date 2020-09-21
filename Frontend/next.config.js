const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  publicRuntimeConfig: {
    APP_NAME: "BlOG lEAF",
    API_DEVELOPMENT: "http://localhost:9000/api",
    PRODUCTION: false,
    DOMAIN_DEVElOPMENT: "http://localhost:3000",
    DOMAIN_PRODUCTION: "https:seoblog.com",
    DISQUS_SHORTNAME: "seoblogf",
    GOOGLE_CLIENT_ID:
      "1046784693702-aes6kh0onsvdgq1ks8bjvdcslpu8hkl5.apps.googleusercontent.com",
  },
});
