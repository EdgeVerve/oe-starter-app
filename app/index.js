const Generator = require('oe-generator');
const path = require('path');
const fullname = require('fullname');
const merge = require('merge-package-json');
var async = require('async');
var appListArray = [];
var stack = [];
const util = require('util');
const inquirer = require('inquirer');
const exec = util.promisify(require('child_process').exec);


//const { exec } = require('child_process');
module.exports = class extends Generator {
  initializing() {
    var done = this.async();
    fullname().then(name => {
      // Checking name should contain some value, not undefined or null
      name = (name ? name : '');
      // Checking whether there are any newlines/line breaks
      let match = /\r|\n/.exec(name);
      if (match) {
        // Replacing with empty value for all newlines/line breaks
        name = name.replace(/[\r\n]+/g, '');
      }
      this.options.author = name;
      done();
    });
  }
  prompting() {
    return this.prompt([
      {
        type: 'list',
        name: 'oeCloud',
        message: 'Select which type of application you want to use?',
        default: 'oe-cloud-2.x',
        choices: ['oe-cloud-1.x', 'oe-cloud-2.x', 'oe-cloud-ui']
      }, {
        type: 'input',
        name: 'version',
        message: 'Your application version?',
        default: '1.0.0'
      }, {
        type: 'input',
        name: 'description',
        message: 'Your application description?',
        default: 'A sample oecloud based application'
      }, {

        type: 'input',
        name: 'author',
        message: 'author',
        default: this.options.author
      }
      
    ]).then((answers) => {
      this.options.author = answers.author || this.options.author;
      this.options.version = answers.version;
      this.options.description = answers.description;
      this.options.oeCloud = answers.oeCloud;
      this.options.bowerInstall = answers.oeCloud === 'oe-cloud-1.x' ? true : false;
    });
  }


  prompting_2x() {
    if(this.options.oeCloud === 'oe-cloud-2.x'){
    return inquirer.prompt([
	  {
      type: "checkbox",
      name: "modules",
      message: "Up/Down to navigate and Space bar to select oe-cloud modules you want to use in your app.", 
      choices: ["oe-multi-tenancy: Enables multi-tenancy",
       "oe-component-passport: Enables passport authentication for third party support, JWT, oAuth etc",
       "oe-common-mixins: Enables commonly used functionalities such as Version Mixin, Audit Field Mixin, Soft Delete Mixin, etc which can be attached to models",
       "oe-model-composite: Enables user to combine non related models and do similar operation you do with single model",
       "oe-personalization: Enables personalize records",
       "oe-expression: Enables expression language functionality in oecloud that could be used further for validations.",
       "oe-business-rule: Enables business rule functionality",
       "oe-validation: Enables validations to be attached to models like Property level, Embedded Model, Relation Validations etc.",
       "oe-node-red: Enables Node-RED integration with oe-Cloud",
       "oe-master-job-executor: Enables to run a function once in a randomly selected master app-instance (from a cluster).",
       "oe-job-scheduler: Enables to schedule jobs based on business rules for scheduling dates and times.",
       "oe-metadata-ui: Enables support for holding and serving metadata used by oe-ui framework.",
       "oe-workflow: Enables workflow",
       "oe-migration: Enables migration",
       "oe-studio-service: Enables the usage of oe-studio in the application",
       "oe-batch-processing: Enables to load data into the application database from flat (text) files"
      ]
      },
    ]).then((answers) => {

    var list = answers.modules;
    var moduleListObject ={};
      for(var i = 0;i<list.length;i++){
      
      var key = list[i].split(':')[0];
         stack.push(key);
        var appListObject = {};
        appListObject["path"] = key;
        appListObject["enabled"] = true;
        appListArray.push(appListObject);
   
      }
      let dependencyObj = {"dependencies": moduleListObject};
      this.options.modules = dependencyObj; 
    });
  }
  }

  async updatePackageJson(){
   if(this.options.oeCloud === 'oe-cloud-2.x'){
    var versionList = [];
    var res = {};
    for(var i =0;i<stack.length;i++){
     var command = "npm info " + stack[i] + " version";
      const { stdout, stderr } = await exec(command);
      versionList.push('^'+stdout);
  }
   stack.forEach((key, i) => res[key] = versionList[i].replace('\n', ''));
   let dependencyObj = {"dependencies": res};
    this.options.modules = dependencyObj;
   }
  }

  writing() {

    var version = this.options.oeCloud;
    if(this.options.oeCloud === 'oe-cloud-2.x' || this.options.oeCloud === 'oe-cloud-1.x'){
    this.fs.copyTpl(
      this.templatePath(version + '/common'),
      this.destinationPath('common')
    );
  }
    if (this.options.oeCloud === 'oe-cloud-2.x'){
      this.fs.copy(
        this.templatePath('oe-cloud-2.x/client'),
        this.destinationPath('client')
      );
    }
     else 
     if (this.options.oeCloud === 'oe-cloud-1.x'){
    this.fs.copy(
      this.templatePath('oe-cloud-1.x/client'),
      this.destinationPath('client')
    );
  }
  if(this.options.oeCloud === 'oe-cloud-2.x' || this.options.oeCloud === 'oe-cloud-1.x'){
    this.fs.copyTpl(
      this.templatePath(version + '/server'),
      this.destinationPath('server')
    );
  }
 
    if(this.options.oeCloud === 'oe-cloud-2.x' || this.options.oeCloud === 'oe-cloud-1.x'){
    this.fs.copyTpl(
      this.templatePath(version + '/settings'),
      this.destinationPath('./')
    );
  }
    if (this.options.oeCloud === 'oe-cloud-2.x') {
    this.fs.copyTpl(
      this.templatePath(version + '/polymer.json'),
      this.destinationPath('polymer.json')
    );
  }

  if (this.options.oeCloud === 'oe-cloud-2.x') {
    let existingappList= this.fs.readJSON(
      this.destinationPath('server/app-list.json')
    );
   let list= existingappList.concat(appListArray);
    this.fs.writeJSON(
      this.destinationPath('server/app-list.json'),
      list
     );

  }
  if (this.options.oeCloud === 'oe-cloud-2.x') {
    var existingDataSources= this.fs.readJSON(
      this.destinationPath('server/datasources.json')
    );
    var updatedDataSources = JSON.stringify(existingDataSources)
    var re = new RegExp('commondb', 'g');
    updatedDataSources = updatedDataSources.replace(re,this.options.appName);
    this.fs.writeJSON(
      this.destinationPath('server/datasources.json'),
      JSON.parse(updatedDataSources)
     );

}
    
    this.fs.copyTpl(
      this.templatePath(version + '/package.json'),
      this.destinationPath('package.json'), {
        appName: this.options.appName,
        description: this.options.description,
        version: this.options.version,
        author: this.options.author
      }
    );
    if (this.options.oeCloud === 'oe-cloud-2.x') {
  
      let existingPkg= this.fs.readJSON(
         this.destinationPath('package.json')
       );
    
       existingPkg = merge(existingPkg,this.options.modules);
     
      this.fs.writeJSON(
         this.destinationPath('package.json'),
        JSON.parse(existingPkg)
        );
       }

       if(this.options.oeCloud === 'oe-cloud-ui') {
        this.fs.copyTpl(
          this.templatePath(version + '/data'),
          this.destinationPath('data')
        );
        this.fs.copyTpl(
          this.templatePath(version + '/src'),
          this.destinationPath('src')
        );
        this.fs.copyTpl(
          this.templatePath(version + '/polymer.json'),
          this.destinationPath('polymer.json')
        );
        this.fs.copyTpl(
          this.templatePath(version + '/index.html'),
          this.destinationPath('index.html')
        );

       }
   
  }

  install() {
    this.installDependencies({
      npm: {
        'no-optional': true
      },
      bower: this.options.bowerInstall,
      yarn: false
    });
  }
};