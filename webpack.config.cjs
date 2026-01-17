const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const Dotenv = require("dotenv-webpack");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  mode: isProduction ? "production" : "development",
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProduction
      ? "assets/js/[name].[contenthash:8].js"
      : "assets/js/[name].js",
    chunkFilename: isProduction
      ? "assets/js/[name].[contenthash:8].chunk.js"
      : "assets/js/[name].chunk.js",
    assetModuleFilename: "assets/[name].[hash:8][ext]",
    publicPath: "/nexis-proj/",
    clean: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".scss", ".sass", ".css"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              compilerOptions: {
                jsx: "react-jsx",
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.module\.(scss|sass|css)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              esModule: false,
              modules: {
                mode: "local",
                localIdentName: isProduction
                  ? "[hash:base64:8]"
                  : "[path][name]__[local]--[hash:base64:5]",
                exportLocalsConvention: "camelCase",
                namedExport: false,
                exportOnlyLocals: false,
              },
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.cjs"),
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                silenceDeprecations: ["legacy-js-api"],
              },
            },
          },
        ],
      },
      {
        test: /\.(scss|sass|css)$/,
        exclude: /\.module\.(scss|sass|css)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.cjs"),
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                silenceDeprecations: ["legacy-js-api"],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name].[hash:8][ext]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[hash:8][ext]",
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, ".env"),
      systemvars: true,
      safe: false,
      defaults: false,
    }),
        new HtmlWebpackPlugin({
          template: "./index.html",
          filename: "index.html",
          inject: true,
          favicon: "./src/assets/iconnex.png",
          minify: isProduction
            ? {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              }
            : false,
        }),
    new DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        isProduction ? "production" : "development",
      ),
      "process.env.VITE_WEATHER_API_KEY": JSON.stringify(
        process.env.VITE_WEATHER_API_KEY || "b5a58d50de78775c12219b245a475147",
      ),
    }),
    ...(isProduction
      ? [
          new MiniCssExtractPlugin({
            filename: "assets/css/[name].[contenthash:8].css",
            chunkFilename: "assets/css/[name].[contenthash:8].chunk.css",
          }),
        ]
      : []),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: {
      index: "/nexis-proj/index.html",
    },
    compress: true,
  },
  devtool: isProduction ? "source-map" : "eval-source-map",
  optimization: {
    minimize: isProduction,
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: "vendor",
          chunks: "all",
          test: /node_modules/,
          priority: 20,
        },
        common: {
          name: "common",
          minChunks: 2,
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
  },
  performance: {
    hints: isProduction ? "warning" : false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
