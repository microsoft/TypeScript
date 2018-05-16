# labeled-stream-splicer

[stream splicer](https://npmjs.org/package/stream-splicer) with labels

[![build status](https://secure.travis-ci.org/substack/labeled-stream-splicer.png)](http://travis-ci.org/substack/labeled-stream-splicer)

# example

Here's an example that exposes a label for `deps` and `pack`:

``` js
var splicer = require('labeled-stream-splicer');
var through = require('through2');
var deps = require('module-deps');
var pack = require('browser-pack');
var lstream = require('lstream');

var pipeline = splicer.obj([
    'deps', [ deps() ],
    'pack', [ pack({ raw: true }) ]
]);

pipeline.get('deps').unshift(lstream());

pipeline.get('deps').push(through.obj(function (row, enc, next) {
    row.source = row.source.toUpperCase();
    this.push(row);
    next();
}));

process.stdin.pipe(pipeline).pipe(process.stdout);
```

Here the `deps` sub-pipeline is augmented with a post-transformation that
uppercases its source input.

# methods

``` js
var splicer = require('labeled-stream-splicer')
```

The API is the same as
[stream-splicer](https://npmjs.org/package/stream-splicer),
except that `pipeline.get()`, `pipeline.splice()`, and `pipeline.indexOf()` can
accept string labels in addition to numeric indexes.

## var pipeline = splicer(streams, opts)

Create a `pipeline` duplex stream given an array of `streams`. Each `stream`
will be piped to the next. Writes to `pipeline` get written to the first stream
and data for reads from `pipeline` come from the last stream.

To signify a label, a stream may have a `.label` property or a string may be
placed in the `streams` array.

For example, for streams `[ a, 'foo', b, c, 'bar', d ]`, this pipeline is
constructed internally:

```
a.pipe(b).pipe(c).pipe(d)
```

with a label `'foo`' that points to `b` and a label `'bar'` that points to `d`.
If `a` or `c` has a `.label` property, that label would be used for addressing.

Input will get written into `a`. Output will be read from `d`.

If any of the elements in `streams` are arrays, they will be converted into
nested labeled pipelines. This is useful if you want to expose a hookable
pipeline with grouped insertion points.

## var pipeline = splicer.obj(streams, opts)

Create a `pipeline` with `opts.objectMode` set to true for convenience.

## var removed = pipeline.splice(index, howMany, stream, ...)

Splice the pipeline starting at `index`, removing `howMany` streams and
replacing them with each additional `stream` argument provided.

The streams that were removed from the splice and returned.

`index` can be an integer index or a label.

## pipeline.push(stream, ...)

Push one or more streams to the end of the pipeline.

The stream arguments may have a `label` property that will be used for string
lookups.

## var stream = pipeline.pop()

Pop a stream from the end of the pipeline.

## pipeline.unshift(stream, ...)

Unshift one or more streams to the begining of the pipeline.

The stream arguments may have a `label` property that will be used for string
lookups.

## var stream = pipeline.shift()

Shift a stream from the begining of the pipeline.

## var stream = pipeline.get(index)

Return the stream at index `index`.

`index` can be an integer or a string label.

# install

With [npm](https://npmjs.org) do:

```
npm install labeled-stream-splicer
```

# license

MIT
