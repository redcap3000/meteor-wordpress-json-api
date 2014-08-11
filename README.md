meteor-wordpress-json-api
=========================
**Ronaldo Barbachano**

Interacts with the [Wordpress JSON API plugin](https://wordpress.org/plugins/json-api/) to retrieve [Wordpress](http://wordpress.org) data.

Comes with very bare bones templates and sends back all the data/fields to all publications. Includes a basic template with single post view functionality (as well as a way to go back.)

###Publications

####Meteor.publish("wordpress",function(site,directive))

The main publication where site is the wordpress site (with the plugin installed) including slash. If no directive is provided it will default to the latest posts response (?json). Your plugin installation may support the 'pretty urls' or not. Otherwise provide it with the appropriate query string for the data you'd like to retrieve. 

####Meteor.publish("wpPost",function(id){})

This may not play nice with use of the "main" wordpress publication. So its recommended using one or the other.

###Templates

Included are templates **{{>wordpress}}** and **{{>wordpress_single}}**, and some javascript to 'select' a single post using a selectedPost session variable. 

####Handlebar helper

**selectedPost** - use this helper to return the id of the 'selected' post, optionally pass it an id to return a true/false value (handy in each loops) **{{selectedPost _id}}**


###Extra notes
The wordpress ID is used as the mongo _id.
For now posts with **matching ID's aren't reinserted**.
Subscriptions return all fields to the client.
