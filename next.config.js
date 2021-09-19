const path = require("path");

module.exports = {
  images: {
    domains: ["dl.airtable.com"],
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.alias.react = path.resolve("./node_modules/react");
    config.resolve.alias["styled-components"] = path.resolve(
      "./node_modules/styled-components"
    );
    return config;
  },
};
