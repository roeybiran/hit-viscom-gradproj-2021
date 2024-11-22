const path = require("path");

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
      }
    ],
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
};
