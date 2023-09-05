const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "calculator",
          filename: "remoteEntry.js",
          exposes: {
            "./Calculator": "./src/App",  
          },
          shared: {
            react: { singleton: true, eager: false },
            "react-dom": { singleton: true, eager: false },
            "antd": { singleton: true, eager: false}
          },
        })
      );
      return webpackConfig;
    },
  },
};
