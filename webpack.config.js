const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // Define the entry point of your application
  entry: './src/index.js',

  // Define the output path and filename
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  // Set up your module rules
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  // Add plugins
  plugins: [
    new BundleAnalyzerPlugin(),
  ],

  // Optional: Set up source maps for easier debugging
  devtool: 'source-map',
};
