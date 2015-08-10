Package.describe({
  name: 'redcap3000:wordpress-json-api',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: "Interacts with the Wordpress JSON API plugin to retrieve wordpress data",
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/redcap3000/meteor-wordpress-json-api/',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.on_use(function(api){
  api.versionsFrom('1.1.0.3');
  api.use(["underscore","templating"],"client");
  api.use("http","server");
  api.add_files("server.js","server");
  api.add_files(["client.js"],"client");
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('redcap3000:wordpress-json-api');
  api.addFiles('wordpress-json-api-tests.js');
});
