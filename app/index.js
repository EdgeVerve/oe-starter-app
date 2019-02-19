const Generator = require('oe-generator');
const path = require('path');
const fullname = require('fullname');
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
        message: 'which oeCloud version you want to use?',
        default: '2.0',
        choices: ['1.0', '2.0']
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
      this.options.bowerInstall = answers.oeCloud === '1.0' ? true : false;
    });
  }

  writing() {
    var version = this.options.oeCloud;
    this.fs.copyTpl(
      this.templatePath(version + '/common'),
      this.destinationPath('common')
    );
    this.fs.copy(
      this.templatePath('1.0/client'),
      this.destinationPath('client')
    );
    this.fs.copyTpl(
      this.templatePath(version + '/server'),
      this.destinationPath('server')
    );
    if (this.options.oeCloud === '2.0') {
      this.fs.copyTpl(
        this.templatePath(version + '/test'),
        this.destinationPath('test')
      );
      this.fs.copyTpl(
        this.templatePath(version + '/lib'),
        this.destinationPath('lib')
      );
    }
    this.fs.copyTpl(
      this.templatePath(version + '/settings'),
      this.destinationPath('./')
    );
    this.fs.copyTpl(
      this.templatePath(version + '/package.json'),
      this.destinationPath('package.json'), {
        appName: this.options.appName,
        description: this.options.description,
        version: this.options.version,
        author: this.options.author
      }
    );
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