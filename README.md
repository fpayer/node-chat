# node-chat

## Api Documentation

### setBotName(name)

Sets the name that will appear in the chat whenever the bot sends a message.

__Arguments__

* `name` - The name to be set (String).

__Examples__

```js
api.setBotName('My First Bot');
```

### setKey(key)

Sets the Mashape api key that will be used in all future requests.

__Arguments__

* `key` - The key to be set (String).

__Examples__

```js
api.setKey('BOyIiMiZzomshffKd7brLSjmUYzap12VOgajsnWcXXXXXXXXXX');
```

### sendMessage(opts)

Sends a message to the chatroom with the given parameters.

__Arguments__

* `opts.text` - The message to be sent (String).
* `opts.image` - *Optional* The url to an image that will be embedded (String).

__Examples__

```js
api.sendMessage({
  text : 'this is a test' ,
});
```

```js
api.sendMessage({
  text : 'Look at this lamb' ,
	image : 'http://lambsblog.com/wp-content/uploads/2013/10/Chilled-Lamb.jpg'
});
```
