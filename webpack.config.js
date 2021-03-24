// const path = require("path");

// module.exports = {
//   entry: "./src/index.js",
//   output: {
//     path: path.resolve(__dirname, "./dist"),
//     filename: "[name].js",
//   },
//   mode: "development",
// };

const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HelloWorldPlugin = require("./myPlugins/helloworld.js");
const webpack = require("webpack");

const txtWebpackPlugin = require("./myPlugins/txt-webpack-plugin.js");

module.exports = {
  entry: {
    index: "./src/index.js",
    list: "./src/list.js",
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  mode: "development",
  // 解析自定义loader的路径
  resolveLoader: {
    modules: ["node_modules", "./myLoaders"],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
        // use: ["custom-style-loader", "custom-css-loader", "custom-less-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "images/", // 输出目录
            publicPath: "../images",
            limit: 1024 * 3, //阈值 超过阈值的图片会独立文件，没有超过会处理成base64
          },
        },
      },
      {
        test: /\.(eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            publicPath: "../",
          },
        },
      },
      {
        test: /\.js$/,
        //自下往上，自右往左
        use: [
          "babel-loader",
          "remove-console",
          "replace-loader",
          {
            loader: "replace-loader-async",
            options: { name: "hohoho" },
          },
        ],
      },
    ],
  },
  devtool: "inline-source-map", //source-map inline-source-map cheap-source-map
  devServer: {
    contentBase: "./dist",
    open: true,
    port: 8081,
    hot: true,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092",
      },
    },
  },
  plugins: [
    new htmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["index"],
    }),
    new htmlWebpackPlugin({
      template: "./src/list.html",
      filename: "list.html",
      chunks: ["list"],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new txtWebpackPlugin({
      name: "kkb",
    }),
    new HelloWorldPlugin({ options: true }),
    new CleanWebpackPlugin(),
  ],
};
