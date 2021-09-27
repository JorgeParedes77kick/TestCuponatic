const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

/**@type {import('next').NextConfig}*/
module.exports = {
  webpack: (config) => {
    // config.output.clean = true;
    config.module.rules.push(
      {
        exclude: /node_modules/,
        test: /.(js|jsx)$/,
        use: "babel-loader",
      },
      {
        type: "asset",
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
      }
    );

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "scss")],
  },
};
