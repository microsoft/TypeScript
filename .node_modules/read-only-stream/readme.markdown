# read-only-stream

wrap a readable/writable stream to be read-only
to prevent mucking up the input side

[![build status](https://secure.travis-ci.org/substack/read-only-stream.png)](http://travis-ci.org/substack/read-only-stream)

# example

Suppose you have a module that uses a readable/writable stream internally but
want to expose just the readable part of that internal stream. This is common if
you use the writable side internally and expose the readable side as the
interface.

Now we can write some code like this with a `through` stream internally for
convenience:

``` js
var through = require('through2');
var readonly = require('read-only-stream');

module.exports = function () {
    var stream = through();
    stream.end('wooooo\n');
    return readonly(stream);
};
```

but consumers won't be able to write to the input side and break the api:

``` js
var wrap = require('./wrap.js');
var ro = wrap(); // can't write to `ro` and muck up internal state
ro.pipe(process.stdout);
```

# methods

``` js
var readonly = require('read-only-stream')
```

## var ro = readonly(stream)

Return a readable stream `ro` that wraps the readable/writable `stream` argument
given to only expose the readable side.

`stream` can be a streams1 or streams2 stream.

# install

With [npm](https://npmjs.org) do:

```
npm install read-only-stream
```

# license

MIT
