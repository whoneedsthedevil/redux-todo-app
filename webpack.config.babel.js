import path from 'path';

export default {
  devtool: 'eval',
  entry: './src/index',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  resolved_paths: ['assets'],
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css' }, 
      { test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname,
      }],
  },
};
