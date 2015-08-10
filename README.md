meteor-wordpress-json-api
=========================
**Ronaldo Barbachano**

Interacts with the [Wordpress JSON API plugin](https://wordpress.org/plugins/json-api/) to retrieve [Wordpress](http://wordpress.org) data.

Comes with very bare bones templates and sends back all the data/fields to all publications. Includes a basic template with single post view functionality (as well as a way to go back.)
###Quickstart

Subscribe to data that is available via global mongo collection Wordpress

```javascript
Meteor.subscribe("wordpress","http://yourwpsite.com/");
```

Use global template helper to fetch results of subscription

```
{{#each wpPosts}}
  {{{content}}}
{{/each}}
```

Make your own structures/queries  by directly accessing the Wordpress collection

```
Wordpress.find();

```

Optionally, use Session variable "wp-json-api-url" to dynamically change subscription data,
an example can be used with template 'wordpress_posts'


**client.js**
```javascript
Meteor.startup(function(){
	Session.setDefault('wp-json-api-url',"http://wordpressJsonUrl");
});
```

***template.html***
```
<template name="myWordpressPosts">
	{{>wp_posts}}
</template>
```
Note this is mostly for testing purposes.. the outputted template is very basic.

Publications
===============
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

####Handlebar helper

**wpPost** - use this helper to fetch the data from the collection wordpress, if provided with an ID should only return a single post of that ID. **{{wpPost _id}}**


###Extra notes
The wordpress ID is used as the mongo _id.
For now posts with **matching ID's aren't upserted**.
Subscriptions return all fields to the client.
