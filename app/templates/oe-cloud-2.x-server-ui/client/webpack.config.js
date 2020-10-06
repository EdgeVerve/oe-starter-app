const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const appconfig = {
  copyFiles : [
    'node_modules/@webcomponents/webcomponentsjs',
    'index.html',
    'login.html',
    'img/',
    'data/',
    'favicon.ico'
  ],
  chunks : {
    index : {
      entry : './src/app-shell.js'
    },
    login : {
      entry : './src/login-shell.js'
    }
  },
  outputPath : path.resolve(__dirname, '../build/webpack')
};


function generateWebConfig(config,env){

  let entryPoints = {};
  let outputPoints = {};
  
  Object.keys(config.chunks).forEach(name => {
    let chunkConf = config.chunks[name];
    entryPoints[name] = [chunkConf.entry];
    outputPoints[name] = chunkConf.output || chunkConf.entry;
  });

  return {
    mode: env || 'development',
    entry : entryPoints,
    output : {
      filename : settings => outputPoints[settings.chunk.name],
      path: config.outputPath
    },
    plugins : [
      new CopyPlugin(config.copyFiles.map(fpath => {
        return {
          from : fpath,
          to : fpath
        }
      }))
    ]
  }
}

module.exports = generateWebConfig(appconfig,process.env.NODE_ENV);

/* module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    index : ['./src/app-shell.js'],
    login : ['./src/login-shell.js']
  },
  output: {
    filename:function(conf){
      if(conf.chunk.name === "index"){
        return './src/app-shell.js';
      }else{
        return './src/login-shell.js';
      }
    },
    path: path.resolve(__dirname, '../build/webpack')
  },
  plugins: [
    new CopyPlugin([{
      from: 'node_modules/@webcomponents/webcomponentsjs',
      to: 'node_modules/@webcomponents/webcomponentsjs'
    },
    {
      from: 'index.html',
      to: 'index.html'
    },
    {
      from: 'login.html',
      to: 'login.html'
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
}; */
