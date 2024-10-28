const path = require('path')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './public/main.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  devtool: 'inline-source-map',
  devServer: {
      static: './dist',
  },
}