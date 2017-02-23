var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
module.exports = {
  entry:__dirname + '/src',
  devtool: debug ? "inline-sourcemap" : null,
  
  watch:true,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015','react'],
          plugins: [  'transform-class-properties'],
        }
      }
    ]
  },
  output: {
    path: __dirname + "/public/",
    filename: "bundle.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};