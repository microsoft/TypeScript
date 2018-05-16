# stream-combiner2

This is a sequel to
[stream-combiner](https://npmjs.org/package/stream-combiner)
for streams3.

``` js
var combine = require('stream-combiner2')
```

## Combine (stream1,...,streamN)

Turn a pipeline into a single stream. `Combine` returns a stream that writes to the first stream
and reads from the last stream. 

Streams1 streams are automatically upgraded to be streams3 streams.

Listening for 'error' will recieve errors from all streams inside the pipe.

```js
var Combine = require('stream-combiner')
var es      = require('event-stream')

Combine(                                  // connect streams together with `pipe`
  process.openStdin(),                    // open stdin
  es.split(),                             // split stream to break on newlines
  es.map(function (data, callback) {      // turn this async function into a stream
    var repr = inspect(JSON.parse(data))  // render it nicely
    callback(null, repr)
  }),
  process.stdout                          // pipe it to stdout !
)
```

## License

MIT
