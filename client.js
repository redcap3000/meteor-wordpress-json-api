
wpSelectedId = function(q){
 var sess = Session.get("selectedPost");
  if(typeof sess != "undefined"){
    return (typeof q == "undefined"?sess:{_id:sess});
  }else{
    return (typeof q == "undefined"?false:{});
  }
};
// use this helper in handlebars to return the id of the 'selected' post,
// optionally pass it an id to return a true/false value (handy in each loops) {{selectedPost _id}}
Handlebars.registerHelper('selectedPost',function(_id){
	if(typeof _id == "undefined"){
		return Session.get("selectedPost");
	}
	else if( Session.equals("selectedPost",_id)){
	  return true;
	}
	else{
	  return false
	}
});

Template.wordpress.entries = function(){
    return wordpress.find(wpSelectedId(true));
};

Template.wordpress.events = {
  "click .postMain" : function(){
    Session.set("selectedPost", this._id);
  },
  "click .goBack" : function(){
    Session.set("selectedPost",undefined);
  }
};

Template.wordpress_single.events = Template.wordpress.events;