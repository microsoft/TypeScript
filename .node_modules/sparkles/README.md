sparkles
========

[![Build Status](https://travis-ci.org/phated/sparkles.svg?branch=master)](https://travis-ci.org/phated/sparkles)

Namespaced global event emitter

## Usage

Sparkles exports a function that returns a singleton `EventEmitter`.
This EE can be shared across your application, whether or not node loads
multiple copies.

```js
var sparkles = require('sparkles')(); // make sure to call the function

sparkles.on('my-event', function(evt){
  console.log('my-event handled', evt);
});

sparkles.emit('my-event', { my: 'event' });
```

## API

### sparkles(namespace)

Returns an EventEmitter that is shared amongst the provided namespace.  If no namespace
is provided, returns a default EventEmitter.

### sparkles.exists(namespace);

Checks whether a namespace exists and returns true or false.

## Why the name?

This is a "global emitter"; shortened: "glitter" but it was already taken; so we got sparkles instead :smile:

## License

MIT
