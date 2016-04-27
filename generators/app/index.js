'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'confirm',
      name: 'Shared',
      message: 'A shared helpers file will be created in lib/',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

   writing: {
    meteor: function () {
      this.fs.copy(
        this.templatePath('.meteor/release'),
        this.destinationPath('.meteor/release')
      );
      this.fs.copy(
        this.templatePath('lib/mithril.min.js'),
        this.destinationPath('lib/mithril.min.js')
      );
      this.fs.copy(
        this.templatePath('lib/shared.js'),
        this.destinationPath('lib/shared.js')
      );
      this.fs.copy(
        this.templatePath('lib/collections/messages.js'),
        this.destinationPath('lib/collections/messages.js')
      );
    },

    clientfiles: function () {
      
      this.fs.copy(
        this.templatePath('client/app.js'),
        this.destinationPath('client/app.js')
      );
      this.fs.copy(
        this.templatePath('client/styles/app.css'),
        this.destinationPath('client/styles/app.css')
      );
      this.fs.copy(
        this.templatePath('client/styles/bootstrap.css'),
        this.destinationPath('client/styles/bootstrap.css')
      );
      this.fs.copy(
        this.templatePath('client/home.js'),
        this.destinationPath('client/home.js')
      );
      this.fs.copy(
        this.templatePath('client/about.js'),
        this.destinationPath('client/about.js')
      );
      this.fs.copy(
        this.templatePath('client/contact.js'),
        this.destinationPath('client/contact.js')
      );
      this.fs.copy(
        this.templatePath('client/auth.js'),
        this.destinationPath('client/auth.js')
      );
      this.fs.copy(
        this.templatePath('client/results.js'),
        this.destinationPath('client/results.js')
      );
    },
    
    serverfiles: function() {
      this.fs.copy(
        this.templatePath('server/server.js'),
        this.destinationPath('server/server.js')
      );
      this.fs.copy(
        this.templatePath('server/seeder.js'),
        this.destinationPath('server/seeder.js')
      );
      this.fs.copy(
        this.templatePath('server/publications.js'),
        this.destinationPath('server/publications.js')
      );      
    }
  },

  initializing: function () {
    this.packages = [
   'meteor-base',
   'mobile-experience',
   'mongo',
   'session',
   'jquery',
   'tracker',
   'standard-minifier-css',
   'standard-minifier-js',
   'es5-shim',
   'ecmascript',
   'accounts-base',
   'accounts-password',
   'autopublish',
   'insecure',
   'http',
   'anti:fake',
   'dburles:factory'
    ];
  },

  install: function () {
    this.write('.meteor/packages', this.packages.join('\n'));
    this.spawnCommand('meteor', ['update']);
  }
});
