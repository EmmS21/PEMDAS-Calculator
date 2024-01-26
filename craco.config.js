/* eslint-disable prefer-destructuring */
/* eslint-disable quotes */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.target = 'web';
      webpackConfig.devtool = 'source-map'; // Add this line
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "calculator",
          filename: "remoteEntry.js",
          exposes: {
            "./Calculator": require.resolve("./src/App"),
          },
          // shared: {
          //   "antd": {
          //     eager: true,
          //     singleton: true,
          //     requiredVersion: '^5.8.6',
          //     import: 'async',
          //   },
          // },
        }),
      );
      return webpackConfig;
    },
  },
};
