const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/app-shell.js',
  output: {
    filename: "./src/app-shell.js",
    path: path.resolve(__dirname, './build/webpack')
  },
  plugins: [
    new CopyPlugin([{
      from: './node_modules/@webcomponents/webcomponentsjs',
      to: 'node_modules/@webcomponents/webcomponentsjs'
    },
    {
      from: 'index.html',
      to: 'index.html'
    },
    {
      from: 'img/',
      to: 'img/'
    },
    {
      from: 'data/',
      to: 'data/'
    },
    {
      from: 'favicon.ico',
      to: 'favicon.ico'
    }
    ])
  ]
}
