# node-chat

## Api Documentation

### setBotName(name)

__Arguments__

* `name` - The name to be set (String).

Sets the name that will appear in the chat whenever the bot sends a message.

### setKey(key)

__Arguments__

* `key` - The key to be set (String).

Sets the Mashape api key that will be used in all future requests.

### sendMessage(opts)

__Arguments__

* `opts.text` - The message to be sent (String).
* `opts.image` - *Optional* The url to an image that will be embedded (String).

Sends a message to the chatroom with the given parameters.
