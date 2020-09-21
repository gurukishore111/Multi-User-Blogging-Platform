import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
  ? "https://seoblog.com"
  : "http://localhost:9000/api";

export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
  ? publicRuntimeConfig.DOMAIN_DEVElOPMENT
  : publicRuntimeConfig.DOMAIN_PRODUCTION;

export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;
export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID;
