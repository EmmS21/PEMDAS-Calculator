const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "calculator",
          filename: "remoteEntry.js",
          exposes: {
            "./Calculator": require.resolve("./src/App"),  
          },
          shared: {
            react: { 
              singleton: true,
            },
            "antd": {
              singleton: true
            }
          },          
        })
      );
      return webpackConfig;
    },
  },
};
