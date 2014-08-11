Meteor.methods ({'callWordpress' : 
  // takes site WITH slash and directive .. just appends the two together
  function(site,directive){
      if(typeof site != "undefined" && typeof site == "string" && site != '' && typeof directive != "undefined" && typeof directive == "string" && directive != '')
        var q = HTTP.get(site + directive,{headers: {"Accept":"application/json"} });
        if(q.statusCode==200){
          var respJson = JSON.parse(q.content);
          return respJson;
        }else{
          return {error: q.statusCode};
        }
      return false;
  }
});

Meteor.publish("wordpress",function(site,directive){
    
        if(typeof site != "undefined" && typeof site == "string" && site != ''){
          if(typeof directive == "undefined" || typeof directive != "string" || directive == ''){
            directive = "json=1";
          }
          var q = HTTP.get(site + '?' + directive,{headers: {"Accept":"application/json"} });
          if(q.statusCode==200){
            var respJson = JSON.parse(q.content);
            respJson.posts.filter(function(arr){
            // avoid entering same id?
                arr._id = arr.id + '';
                // delete old key? aghhh why bother!
                if(wordpress.findOne({_id : arr._id})){
                  ;
                }else{
                  wordpress.insert(arr);
                }
            });
            return wordpress.find();
          }else{
            this.ready();
            return {error: q.statusCode};
          }
        }
        this.ready();
        //return wordpress.find({},{fields: {categories:1,date : 1,excerpt : 1,tags:1,thumbnail:1,title:1,url:1} });
     
});

Meteor.publish("wpPost",function(id){
        return wordpress.find({_id : id + ""});
});