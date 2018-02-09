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
    return this.prompt([{
        type: 'input',
        name: 'version',
        message: 'version',
        default: '1.0.0'
      }, {
        type: 'input',
        name: 'description',
        message: 'description',
        default: 'A sample oecloud based application'
      }, {
        type: 'input',
        name: 'author',
        message: 'author',
        default: this.options.author
      },
      {
        type: 'confirm',
        name: 'bowerinstall',
        message: 'Do you want to install ui-components(bower)?',
        default: false
      }
    ]).then((answers) => {
      this.options.author = answers.author || this.options.author;
      this.options.version = answers.version;
      this.options.description = answers.description;
      this.options.bowerinstall = answers.bowerinstall;
    });
  }

  writing() {
    this.fs.copy(
      this.templatePath('client'),
      this.destinationPath('client')
    );
    this.fs.copyTpl(
      this.templatePath('server'),
      this.destinationPath('server')
    );
    this.fs.copyTpl(
      this.templatePath('.bowerrc'),
      this.destinationPath('.bowerrc')
    );
    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'), {
        appName: this.options.appName
      }
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
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
      bower: this.options.bowerinstall,
      yarn: false
    });
  }
};