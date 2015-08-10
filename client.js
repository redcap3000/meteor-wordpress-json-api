Handlebars.registerHelper("wpPosts",function(id){
  if(typeof id == "undefined")
    return wordpress.find();
  else
    return wordpress.find({_id : id});
});


