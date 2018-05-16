# stream-splicer

streaming pipeline with a mutable configuration

This module is similar to
[stream-combiner](https://npmjs.org/package/stream-combiner),
but with a pipeline configuration that can be changed at runtime.

[![build status](https://travis-ci.org/substack/stream-splicer.png?branch=master)](http://travis-ci.org/substack/stream-splicer)

# example

This example begins with an HTTP header parser that waits for an empty line to
signify the end of the header. At that point, it switches to a streaming json
parser to operate on the HTTP body.

``` js
var splicer = require('stream-splicer');
var through = require('through2');
var JSONStream = require('JSONStream');
var split = require('split');

var headerData = {};
var headers = through.obj(function (buf, enc, next) {
    var line = buf.toString('utf8');
    if (line === '') {
        this.push(headerData);
        pipeline.splice(1, 1, JSONStream.parse([ 'rows', true ]));
    }
    else {
        var m = /^(\S+):(.+)/.exec(line);
        var key = m && m[1].trim();
        var value = m && m[2].trim();
        if (m) headerData[key] = value;
    }
    next();
});
var pipeline = splicer([ split(), headers, JSONStream.stringify() ]);
process.stdin.pipe(pipeline).pipe(process.stdout);
```

intput:

```
GET / HTTP/1.1
Host: substack.net
User-Agent: echo

{"rows":["beep","boop"]}
```

output:

```
$ echo -ne 'GET / HTTP/1.1\nHost: substack.net\nUser-Agent: echo\n\n{"rows":["beep","boop"]}\n' | node example/header.js
[
{"Host":"substack.net","User-Agent":"echo"}
,
"beep"
,
"boop"
]
```

# methods

``` js
var splicer = require('stream-splicer')
```

## var pipeline = splicer(streams, opts)

Create a `pipeline` duplex stream given an array of `streams`. Each `stream`
will be piped to the next. Writes to `pipeline` get written to the first stream
and data for reads from `pipeline` come from the last stream.

For example, for streams `[ a, b, c, d ]`, this pipeline is constructed
internally:

```
a.pipe(b).pipe(c).pipe(d)
```

Input will get written into `a`. Output will be read from `d`.

If any of the elements in `streams` are arrays, they will be converted into
nested pipelines. This is useful if you want to expose a hookable pipeline with
grouped insertion points.

## var pipeline = splicer.obj(streams, opts)

Create a `pipeline` with `opts.objectMode` set to true for convenience.

## var removed = pipeline.splice(index, howMany, stream, ...)

Splice the pipeline starting at `index`, removing `howMany` streams and
replacing them with each additional `stream` argument provided.

The streams that were removed from the splice and returned.

## pipeline.push(stream, ...)

Push one or more streams to the end of the pipeline.

## var stream = pipeline.pop()

Pop a stream from the end of the pipeline.

## pipeline.unshift(stream, ...)

Unshift one or more streams to the begining of the pipeline.

## var stream = pipeline.shift()

Shift a stream from the begining of the pipeline.

## var stream = pipeline.get(index, ...)

Return the stream at index `index, ...`. Indexes can be negative.

Multiple indexes will traverse into nested pipelines.

# attributes

## pipeline.length

The number of streams in the pipeline

# install

With [npm](https://npmjs.org) do:

```
npm install stream-splicer
```

# license

MIT
