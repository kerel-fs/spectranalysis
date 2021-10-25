let path = require('path');
let CopyPlugin = require("copy-webpack-plugin");
let webpack = require('webpack');
let packagejson = require('./package.json');

// get git info from command line, based on
// https://stackoverflow.com/a/38401256
let commitHash = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim();

let dep_spectroplot = packagejson.dependencies.spectroplot;

module.exports = {
  entry: path.resolve(__dirname, 'src/example.js'),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
  },
  mode: 'development',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "public", to: "" },
      ],
    }),
    new webpack.DefinePlugin({
      __COMMIT_HASH__: JSON.stringify(commitHash),
      __DEP_SPECTROPLOT__: JSON.stringify(dep_spectroplot)
    })
  ],
};
