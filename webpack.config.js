var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  mode: 'development',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.png']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.(png|jpg|gif)$/,
      include: path.join(__dirname, 'src'),
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    }]
  }
};
