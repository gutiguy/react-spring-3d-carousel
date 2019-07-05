const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let config = {
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "bundle.js",
    library: "react-3d-carousel-spring",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  devtool: "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
};

module.exports = (_, argv) => {
  if (argv.mode == "development") {
    config.entry = {
      app: ["./src/dev/index.tsx"]
    };

    config.plugins = [
      new HtmlWebpackPlugin({
        template: "./src/dev/index.html",
        filename: "./index.html"
      })
    ];
  } else if (argv.mode == "production") {
    config.entry = {
      app: ["./src/index.tsx"]
    };
  }

  return config;
};
