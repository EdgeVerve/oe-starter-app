const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const WebpackPreBuildPlugin = require('pre-build-webpack');
const fs = require('fs');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './app-shell.js',
  output: {
    filename: 'app-shell.js',
    path: path.resolve(__dirname, '../build/webpack')
  },
  module: {
    rules: [{
      test: /.*srcgen.*js/,
      use: {
        loader: path.resolve(__dirname, './custom-generator-webpack.js'),
        options: {
          srcPath: './data',
          templatePath: './templates'
        }
      }
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      PathObserver: ['observe-js', 'PathObserver']
    }),
    new WebpackPreBuildPlugin(function (stat) {
      fs.readdir('data', function (err, items) {
        fs.mkdir('srcgen', {
          recursive: true
        }, (err) => {
          items.filter(fileName => fileName.endsWith('.json')).forEach(fileName => {
            let pathData = path.parse(fileName);
            let fullTargetPath = path.resolve(path.join('srcgen', `${pathData.name}.js`));
            if (!fs.existsSync(fullTargetPath)) {
              fs.writeFileSync(fullTargetPath, 'module.exports={}');
            }
          });
        });
      });
    }),
    new CopyPlugin([{
      from: './node_modules/@webcomponents/webcomponentsjs',
      to: 'node_modules/@webcomponents/webcomponentsjs'
    },
    {
      from: './node_modules/lato-font',
      to: 'node_modules/lato-font'
    },
    {
      from: './node_modules/web-animations-js',
      to: 'node_modules/web-animations-js'
    },
    {
      from: 'manifest.json',
      to: 'manifest.json'
    },
    {
      from: 'index.html',
      to: 'index.html'
    }
    ])
  ]
};
