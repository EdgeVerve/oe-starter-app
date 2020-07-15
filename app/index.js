const Generator = require('oe-generator');
const fullname = require('fullname');
const merge = require('lodash/fp/merge');
var appListArray = [];
var stack = [];
const util = require('util');
const inquirer = require('inquirer');
const exec = util.promisify(require('child_process').exec);
var isProvider = false;


// const { exec } = require('child_process');
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
      if (answers.oeCloud === 'oe-cloud-2.x') {
        return inquirer.prompt([
          {
            type: 'list',
            name: 'oeCloud2x',
            message: 'Select which type of oe-cloud 2.x application you want to use?',
            default: 'oe-cloud-2.x-server',
            choices: ['oe-cloud-2.x-server', 'oe-cloud-2.x-server-ui']
          }
        ]).then((results) => {
          if (results.oeCloud2x === 'oe-cloud-2.x-server') {
            this.options.oeCloud = 'oe-cloud-2.x-server';
          }
          if (results.oeCloud2x === 'oe-cloud-2.x-server-ui') {
            return inquirer.prompt([
              {
                type: 'confirm',
                name: 'electronApp',
                message: 'Enable oe-studio?',
                default: 'oe-cloud-2.x-server'
              }
            ]).then((res) => {
              if (res.electronApp === true) {
                this.options.oeCloud = 'oe-cloud-studio';
              }
              else {
                this.options.oeCloud = 'oe-cloud-2.x-server-ui';
              }
            })
          }
        })
      }
    });
  }

  selectOeCloudModules() {
    if (this.options.oeCloud === 'oe-cloud-2.x-server' || this.options.oeCloud === 'oe-cloud-2.x-server-ui' || this.options.oeCloud === 'oe-cloud-studio') {
      return inquirer.prompt([
        {
          type: 'checkbox',
          name: 'modules',
          message: 'Up/Down to navigate and Space bar to select oe-cloud modules you want to use in your app. Hit enter to complete module selection.',
          choices: ['oe-multi-tenancy: Enables multi-tenancy',
            'oe-component-passport: Enables passport authentication for third party support, JWT, oAuth etc',
            'oe-common-mixins: Enables commonly used functionalities such as Version Mixin, Audit Field Mixin, Soft Delete Mixin, etc which can be attached to models',
            'oe-model-composite: Enables user to combine non related models and do similar operation you do with single model',
            'oe-personalization: Enables personalize records',
            'oe-expression: Enables expression language functionality in oecloud that could be used further for validations.',
            'oe-business-rule: Enables business rule functionality',
            'oe-validation: Enables validations to be attached to models like Property level, Embedded Model, Relation Validations etc.',
            'oe-node-red: Enables Node-RED integration with oe-Cloud',
            'oe-master-job-executor: Enables to run a function once in a randomly selected master app-instance (from a cluster).',
            'oe-job-scheduler: Enables to schedule jobs based on business rules for scheduling dates and times.',
            'oe-metadata-ui: Enables support for holding and serving metadata used by oe-ui framework.',
            'oe-workflow: Enables workflow',
            'oe-migration: Enables migration',
            'oe-studio-service: Enables the usage of oe-studio in the application',
            'oe-batch-processing: Enables to load data into the application database from flat (text) files'
          ]
        }
      ]).then((answers) => {
        var list = answers.modules;
        var moduleListObject = {};
        for (var i = 0; i < list.length; i++) {
          var key = list[i].split(':')[0];
          if (key === 'oe-component-passport') {
            isProvider = true;
          }
          stack.push(key);
          var appListObject = {};
          appListObject.path = key;
          appListObject.autoEnableMixins = true;
          appListObject.enabled = true;
          appListArray.push(appListObject);
        }
        let dependencyObj = { 'dependencies': moduleListObject };
        this.options.modules = dependencyObj;
      });
    }
  }

  async updatePackageJson() {
    if (this.options.oeCloud === 'oe-cloud-2.x-server' || this.options.oeCloud === 'oe-cloud-2.x-server-ui' || this.options.oeCloud === 'oe-cloud-studio') {
      console.log('\n Scaffolding of oe-cloud application in progress!! \n');
      var versionList = [];
      var res = {};
      for (var i = 0; i < stack.length; i++) {
        var command = 'npm info ' + stack[i] + ' version';
        const { stdout } = await exec(command);
        versionList.push('^' + stdout);
      }
      stack.forEach((key, i) => res[key] = versionList[i].replace('\n', ''));
      let dependencyObj = { 'dependencies': res };
      this.options.modules = dependencyObj;
    }
  }

  writing() {
    var version = this.options.oeCloud;
    if (this.options.oeCloud === 'oe-cloud-studio') {
      this.fs.copyTpl(
        this.templatePath(version + '/common'),
        this.destinationPath('common')
      );

      this.fs.copyTpl(
        this.templatePath(version + '/server'),
        this.destinationPath('server')
      );

      this.fs.copyTpl(
        this.templatePath(version + '/settings'),
        this.destinationPath('settings')
      );

      this.fs.copy(
        this.templatePath('oe-cloud-studio/client'),
        this.destinationPath('client')
      );

      this.fs.copy(
        this.templatePath('oe-cloud-studio/lib'),
        this.destinationPath('lib')
      );

      this.fs.copy(
        this.templatePath('oe-cloud-studio/db'),
        this.destinationPath('db')
      );

      this.fs.copyTpl(
        this.templatePath(version + '/designer-config.js'),
        this.destinationPath('designer-config.js')
      );

      this.fs.copyTpl(
        this.templatePath(version + '/polymer.json'),
        this.destinationPath('polymer.json')
      );

      this.fs.copyTpl(
        this.templatePath(version + '/client/package.json'),
        this.destinationPath('client/package.json'), {
        appName: this.options.appName,
        description: this.options.description,
        version: this.options.version,
        author: this.options.author
      }
      );

    }
    if (this.options.oeCloud === 'oe-cloud-2.x-server' || this.options.oeCloud === 'oe-cloud-2.x-server-ui' || this.options.oeCloud === 'oe-cloud-1.x') {
      this.fs.copyTpl(
        this.templatePath(version + '/common'),
        this.destinationPath('common')
      );

      this.fs.copyTpl(
        this.templatePath(version + '/server'),
        this.destinationPath('server')
      );

      this.fs.copyTpl(
        this.templatePath(version + '/settings'),
        this.destinationPath('settings')
      );
    }
    if (this.options.oeCloud === 'oe-cloud-2.x-server-ui') {
      this.fs.copy(
        this.templatePath('oe-cloud-2.x-server-ui/client'),
        this.destinationPath('client')
      );
      
      this.fs.copyTpl(
        this.templatePath(version + '/client/package.json'),
        this.destinationPath('client/package.json'), {
        appName: this.options.appName,
        description: this.options.description,
        version: this.options.version,
        author: this.options.author
      }
      );
    } else
      if (this.options.oeCloud === 'oe-cloud-1.x') {
        this.fs.copy(
          this.templatePath('oe-cloud-1.x/client'),
          this.destinationPath('client')
        );
      }

    if ((this.options.oeCloud === 'oe-cloud-2.x-server' || this.options.oeCloud === 'oe-cloud-2.x-server-ui' || this.options.oeCloud === 'oe-cloud-studio') && isProvider) {
      this.fs.copy(
        this.templatePath(version + '/providers.json'),
        this.destinationPath('providers.json')
      );
    }

    if (this.options.oeCloud === 'oe-cloud-2.x-server' || this.options.oeCloud === 'oe-cloud-2.x-server-ui' || this.options.oeCloud === 'oe-cloud-studio') {
      let existingappList = this.fs.readJSON(
        this.destinationPath('server/app-list.json')
      );
      let list = existingappList.concat(appListArray);
      let rootElementList = list.splice(1, 1);
      let finalAppList = list.concat(rootElementList);

      this.fs.writeJSON(
        this.destinationPath('server/app-list.json'),
        finalAppList
      );

      var existingDataSources = this.fs.readJSON(
        this.destinationPath('server/datasources.json')
      );
      var updatedDataSources = JSON.stringify(existingDataSources);
      var re = new RegExp('commondb', 'g');
      updatedDataSources = updatedDataSources.replace(re, this.options.appName);
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
    if (this.options.oeCloud === 'oe-cloud-2.x-server' || this.options.oeCloud === 'oe-cloud-2.x-server-ui' || this.options.oeCloud === 'oe-cloud-studio') {
      let existingPkg = this.fs.readJSON(
        this.destinationPath('package.json')
      );
      existingPkg = merge(existingPkg, this.options.modules);

      this.fs.writeJSON(
        this.destinationPath('package.json'),
        existingPkg
      );
    }

    if (this.options.oeCloud === 'oe-cloud-ui') {
      this.fs.copy(
        this.templatePath(version + '/data'),
        this.destinationPath('data')
      );
      this.fs.copy(
        this.templatePath(version + '/src'),
        this.destinationPath('src')
      );
      this.fs.copy(
        this.templatePath(version + '/img'),
        this.destinationPath('img')
      );
      this.fs.copy(
        this.templatePath(version + '/favicon.ico'),
        this.destinationPath('favicon.ico')
      );
      this.fs.copy(
        this.templatePath(version + '/index.html'),
        this.destinationPath('index.html')
      );
      this.fs.copy(
        this.templatePath(version + '/webpack.config.js'),
        this.destinationPath('webpack.config.js')
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
