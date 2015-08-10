meteor-wordpress-json-api
=========================
**Ronaldo Barbachano**

Interacts with the [Wordpress JSON API plugin](https://wordpress.org/plugins/json-api/) to retrieve [Wordpress](http://wordpress.org) data.

Comes with very bare bones templates and sends back all the data/fields to all publications. Includes a basic template with single post view functionality (as well as a way to go back.)
###Quickstart

**HTML Template File that references built in template 'wordpress_posts'**

***main.html***

```
<head>
  <title>testWordpress</title>
</head>

<body>
{{>wordpress_posts}}
</body>
```
**Client JS file that sets session variable used to fetch wordpress posts**
**main.js**

```
if (Meteor.isClient) {
  Session.setDefault("wp-json-api-url","http://www.mywordpresssite.com/?json=get_posts&count=10");
}
```
Changing the Session variable ```wp-json-api-url``` will update the subscription with the new data (if applicable.)

###Bring your own template


```
Meteor.subscribe("wordpress","http://www.mywordpresssite.com/?json=get_posts&count=10");
```


1. Subscribe to data that is available via global mongo collection Wordpress

2. Use built in global handlebar helper ```wpPosts``` to iterate through data in Wordpress mongo collection


```
{{#each wpPosts}}
  {{{content}}}
{{/each}}
```


Make your own structures/queries  by directly accessing the Wordpress collection

```
Wordpress.find();

```

Publications
===============
```
Meteor.publish("wordpress",function(site,directive))
```
The main publication where site is the wordpress site (with the plugin installed) including slash. If no directive is provided it will default to the latest posts response (?json). Your plugin installation may support the 'pretty urls' or not. Otherwise provide it with the appropriate query string for the data you'd like to retrieve. 

```
Meteor.publish("wpPost",function(id){})
```

This may not play nice with use of the "main" wordpress publication. So its recommended using one or the other.
###Methods

```
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
