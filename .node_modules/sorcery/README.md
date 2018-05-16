# sorcery.js

Sourcemaps are great - if you have a JavaScript file, and you minify it, your minifier can generate a map that lets you debug as though you were looking at the original uncompressed code.

But if you have more than one transformation - say you want to transpile your JavaScript, concatenate several files into one, and minify the result - it gets a little trickier. Each intermediate step needs to be able to both *ingest* a sourcemap and *generate* one, all the time pointing back to the original source.

Most compilers don't do that. ([UglifyJS](https://github.com/mishoo/UglifyJS2) is an honourable exception.) So when you fire up devtools, instead of looking at the original source you find yourself looking at the final intermediate step in the chain of transformations.

**Sorcery aims to fix that.** Given an file at the end of a transformation chain (e.g., your minified JavaScript), it will follow the entire chain back to the original source, and generate a new sourcemap that describes the whole process. How? Magic.

This is a work-in-progress - suitable for playing around with, but don't rely on it to debug air traffic control software or medical equipment. Other than that, it can't do much harm.


## Usage

### As a node module

Install sorcery locally:

```bash
npm install sorcery
```

```js
var sorcery = require( 'sorcery' );

sorcery.load( 'some/generated/code.min.js' ).then( function ( chain ) {
  // generate a flattened sourcemap
  var map = chain.apply(); // { version: 3, file: 'code.min.js', ... }

  // get a JSON representation of the sourcemap
  map.toString(); // '{"version":3,"file":"code.min.js",...}'

  // get a data URI representation
  map.toUrl(); // 'data:application/json;charset=utf-8;base64,eyJ2ZXJ...'

  // write to a new file - this will create `output.js` and
  // `output.js.map`, and will preserve relative paths. It
  // returns a Promise
  chain.write( 'output.js' );

  // write to a new file but use an absolute path for the
  // sourceMappingURL
  chain.write( 'output.js', { absolutePath: true });

  // write to a new file, but append the flattened sourcemap as a data URI
  chain.write( 'output.js', { inline: true });

  // overwrite the existing file
  chain.write();
  chain.write({ inline: true });

  // find the origin of line x, column y. Returns an object with
  // `source`, `line`, `column` and (if applicable) `name` properties.
  // Note - for consistency with other tools, line numbers are always
  // one-based, column numbers are always zero-based. It's daft, I know.
  var loc = chain.trace( x, y );
});

// You can also use sorcery synchronously:
var chain = sorcery.loadSync( 'some/generated/code.min.js' );
var map = chain.apply();
var loc = chain.trace( x, y );
chain.writeSync();
```

#### Advanced options

You can pass an optional second argument to `sorcery.load()` and `sorcery.loadSync()`, with zero or more of the following properties:

* `content` - a map of `filename: contents` pairs. `filename` will be resolved against the current working directory if needs be
* `sourcemaps` - a map of `filename: sourcemap` pairs, where `filename` is the name of the file the sourcemap is related to. This will override any `sourceMappingURL` comments in the file itself.

For example:

```js
sorcery.load( 'some/generated/code.min.js', {
  content: {
    'some/minified/code.min.js': '...',
    'some/transpiled/code.js': '...',
    'some/original/code.js': '...'
  },
  sourcemaps: {
    'some/minified/code.min.js': {...},
    'some/transpiled/code.js': {...}
  }
}).then( chain => {
  /* ... */
});
```

Any files not found will be read from the filesystem as normal.

### On the command line

First, install sorcery globally:

```bash
npm install -g sorcery
```

```
Usage:
  sorcery [options]

Options:
  -h, --help               Show help message
  -v, --version            Show version
  -i, --input <file>       Input file
  -o, --output <file>      Output file (if absent, will overwrite input)
  -d, --datauri            Append map as a data URI, rather than separate file
  -x, --excludeContent     Don't populate the sourcesContent array
```

Examples:

```bash
# overwrite sourcemap in place (will write map to
# some/generated/code.min.js.map, and update
# sourceMappingURL comment if necessary
sorcery -i some/generated/code.min.js

# append flattened sourcemap as an inline data URI
# (will delete existing .map file, if applicable)
sorcery -d -i some/generated/code.min.js

# write to a new file (will create newfile.js and
# newfile.js.map)
sorcery -i some/generated/code.min.js -o newfile.js
```


## License

MIT
