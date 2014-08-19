meteor-wordpress-json-api
=========================
**Ronaldo Barbachano**

Interacts with the [Wordpress JSON API plugin](https://wordpress.org/plugins/json-api/) to retrieve [Wordpress](http://wordpress.org) data.

Comes with very bare bones templates and sends back all the data/fields to all publications. Includes a basic template with single post view functionality (as well as a way to go back.)
###Quickstart

Add

```javascript
wordpress = new Meteor.Collection("wordpress");
```
To a shared file. And then
```javascript
Meteor.subscribe("wordpress","http://yourwpsite.com/");
```
To a clientside file. Finally;
```
{{>wordpress}}
```
In a template (html) file.
###Publications
```javascript
Meteor.publish("wordpress",function(site,directive))
```
The main publication where site is the wordpress site (with the plugin installed) including slash. If no directive is provided it will default to the latest posts response (?json). Your plugin installation may support the 'pretty urls' or not. Otherwise provide it with the appropriate query string for the data you'd like to retrieve. 

```javascript
Meteor.publish("wpPost",function(id){})
```

This may not play nice with use of the "main" wordpress publication. So its recommended using one or the other.
###Methods

```javascript
Meteor.call("callWordpress","http://mysite.com/");
Meteor.call("callWordpress","http://mysite.com/","json=get_post&post_id=47");
```
This is like the publication except it returns the raw response (as an object). Check [this document](http://wordpress.org/plugins/json-api/other_notes/) for more on how to query the api. For now it **appends the question mark(?).** 
###Templates

Included are templates **{{>wordpress}}** and **{{>wordpress_single}}**, and some javascript to 'select' a single post using a selectedPost session variable. 

####Handlebar helper

**selectedPost** - use this helper to return the id of the 'selected' post, optionally pass it an id to return a true/false value (handy in each loops) **{{selectedPost _id}}**


###Extra notes
The wordpress ID is used as the mongo _id.
For now posts with **matching ID's aren't reinserted**.
Subscriptions return all fields to the client.
