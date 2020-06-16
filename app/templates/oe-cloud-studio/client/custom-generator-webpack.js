const path = require('path');
const fs = require('fs');
const generator = require('./custom-generator');

module.exports = function (source) {
  let options = Object.assign({}, {
    srcPath: './client/data',
    templatePath: './client/templates'
  }, this.query);

  let fileName = path.parse(this.resourcePath).name;

  let jsonPath = path.resolve(path.join('.', options.srcPath, `${fileName}.json`));
  let viewConfig = JSON.parse(fs.readFileSync(jsonPath).toString());
  this.addDependency(jsonPath);

  let jsPath = path.resolve(path.join('.', options.srcPath, `${fileName}.js`));

  /* Delete from require-cache so that we load the JS file again */
  delete require.cache[jsPath];
  let jsModule = fs.existsSync(jsPath) ? require(jsPath) : {};
  this.addDependency(jsPath);

  let templatePath = path.resolve(path.join('.', options.templatePath, `${viewConfig.meta.templateName || 'list-view-edit.js'}`));
  let templateContent = fs.readFileSync(templatePath).toString();
  this.addDependency(templatePath);

  source = generator(fileName, viewConfig, jsModule, templateContent);
  return source;
}
;