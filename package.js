Package.describe({
  summary: "Interacts with the Wordpress JSON API plugin to retrieve wordpress data"
});

Package.on_use(function(api){
  api.use(["underscore","templating"],"client");
  api.use("http","server");
  api.add_files("server.js","server");
  api.add_files(["templates.html","client.js"],"client");
});