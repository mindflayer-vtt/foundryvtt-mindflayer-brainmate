"use strict";
/**
 * This file is part of the Foundry VTT Module Mindflayer Brainmate.
 *
 * The Foundry VTT Module Mindflayer Brainmate is free software: you can redistribute it and/or modify it under the terms of the GNU
 * General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * The Foundry VTT Module Mindflayer Brainmate is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even
 * the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along with the Foundry VTT Module Mindflayer Brainmate. If not,
 * see <https://www.gnu.org/licenses/>.
 */
const path = require("path");
const packages = require("./package.json");
const fs = require("fs");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

class ModuleJsonWebpackPlugin {
  static defaultOptions = {
    srcFile: "src/js/module.tmpl.json",
    outputFile: "module.json",
  };
  constructor(options = {}) {
    this.options = { ...ModuleJsonWebpackPlugin.defaultOptions, ...options };
  }
  apply(compiler) {
    const pluginName = ModuleJsonWebpackPlugin.name;
    const { webpack } = compiler;
    const { Compilation } = webpack;
    const { RawSource } = webpack.sources;
    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        (assets) => {
          const content = JSON.parse(
            fs
              .readFileSync(this.options.srcFile)
              .toString()
              .replaceAll("{{version}}", packages.version)
          );
          content.version = packages.version;

          // Adding new asset to the compilation, so it would be automatically
          // generated by the webpack in the output directory.
          compilation.emitAsset(
            this.options.outputFile,
            new RawSource(JSON.stringify(content))
          );
        }
      );
    });
  }
}

let devDomain = "localhost";
if (fs.existsSync(".devDomain")) {
  devDomain = fs.readFileSync(".devDomain");
}

module.exports = {
  mode: process.env.NODE_ENV == "production" ? "production" : "development",
  entry: "./src/js/index.js",
  output: {
    filename: "Brainmate.js",
    path: path.resolve(
      __dirname,
      process.env.NODE_ENV == "production"
        ? "dist"
        : "chrome-overrides/" + devDomain + "/modules/mindflayer-brainmate"
    ),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/lang", to: "lang" },
        { from: "LICENSE", to: "." },
        { from: "README.md", to: "." },
      ],
    }),
    new ModuleJsonWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "Brainmate.css",
    }),
  ],
  optimization: {
    minimize: process.env.NODE_ENV == "production",
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
  devtool: "source-map",
};
