<p align="center">
  <a href="http://gulpjs.com">
    <img height="257" width="114" src="https://raw.githubusercontent.com/gulpjs/artwork/master/gulp-2x.png">
  </a>
</p>

# vinyl

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor Build Status][appveyor-image]][appveyor-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Gitter chat][gitter-image]][gitter-url]

Virtual file format.

## What is Vinyl?

Vinyl is a very simple metadata object that describes a file. When you think of a file, two attributes come to mind: `path` and `contents`. These are the main attributes on a Vinyl object. A file does not necessarily represent something on your computer’s file system. You have files on S3, FTP, Dropbox, Box, CloudThingly.io and other services. Vinyl can be used to describe files from all of these sources.

## What is a Vinyl Adapter?

While Vinyl provides a clean way to describe a file, we also need a way to access these files. Each file source needs what I call a "Vinyl adapter". A Vinyl adapter simply exposes a `src(globs)` and a `dest(folder)` method. Each return a stream. The `src` stream produces Vinyl objects, and the `dest` stream consumes Vinyl objects. Vinyl adapters can expose extra methods that might be specific to their input/output medium, such as the `symlink` method [`vinyl-fs`][vinyl-fs] provides.

## Usage

```js
var Vinyl = require('vinyl');

var jsFile = new Vinyl({
  cwd: '/',
  base: '/test/',
  path: '/test/file.js',
  contents: new Buffer('var x = 123')
});
```

## API

### `new Vinyl([options])`

The constructor is used to create a new instance of `Vinyl`. Each instance represents a separate file, directory or symlink.

All internally managed paths (`cwd`, `base`, `path`, `history`) are normalized and have trailing separators removed. See [Normalization and concatenation][normalization] for more information.

Options may be passed upon instantiation to create a file with specific properties.

#### `options`

Options are not mutated by the constructor.

##### `options.cwd`

The current working directory of the file.

Type: `String`

Default: `process.cwd()`

##### `options.base`

Used for calculating the `relative` property. This is typically where a glob starts.

Type: `String`

Default: `options.cwd`

##### `options.path`

The full path to the file.

Type: `String`

Default: `undefined`

##### `options.history`

Stores the path history. If `options.path` and `options.history` are both passed, `options.path` is appended to `options.history`. All `options.history` paths are normalized by the `file.path` setter.

Type: `Array`

Default: `[]` (or `[options.path]` if `options.path` is passed)

##### `options.stat`

The result of an `fs.stat` call. This is how you mark the file as a directory or symbolic link. See [isDirectory()][is-directory], [isSymbolic()][is-symbolic] and [fs.Stats][fs-stats] for more information.

Type: [`fs.Stats`][fs-stats]

Default: `undefined`

##### `options.contents`

The contents of the file.  If `options.contents` is a [`Stream`][stream], it is wrapped in a [`cloneable-readable`][cloneable-readable] stream.

Type: [`Stream`][stream], [`Buffer`][buffer], or `null`

Default: `null`

##### `options.{custom}`

Any other option properties will be directly assigned to the new Vinyl object.

```js
var Vinyl = require('vinyl');

var file = new Vinyl({ foo: 'bar' });
file.foo === 'bar'; // true
```

### Instance methods

Each Vinyl object will have instance methods. Every method will be available but may return differently based on what properties were set upon instantiation or modified since.

#### `file.isBuffer()`

Returns `true` if the file contents are a [`Buffer`][buffer], otherwise `false`.

#### `file.isStream()`

Returns `true` if the file contents are a [`Stream`][stream], otherwise `false`.

#### `file.isNull()`

Returns `true` if the file contents are `null`, otherwise `false`.

#### `file.isDirectory()`

Returns `true` if the file represents a directory, otherwise `false`.

A file is considered a directory when:

- `file.isNull()` is `true`
- `file.stat` is an object
- `file.stat.isDirectory()` returns `true`

When constructing a Vinyl object, pass in a valid [`fs.Stats`][fs-stats] object via `options.stat`. If you are mocking the [`fs.Stats`][fs-stats] object, you may need to stub the `isDirectory()` method.

#### `file.isSymbolic()`

Returns `true` if the file represents a symbolic link, otherwise `false`.

A file is considered symbolic when:

- `file.isNull()` is `true`
- `file.stat` is an object
- `file.stat.isSymbolicLink()` returns `true`

When constructing a Vinyl object, pass in a valid [`fs.Stats`][fs-stats] object via `options.stat`. If you are mocking the [`fs.Stats`][fs-stats] object, you may need to stub the `isSymbolicLink()` method.

#### `file.clone([options])`

Returns a new Vinyl object with all attributes cloned.

__By default custom attributes are cloned deeply.__

If `options` or `options.deep` is `false`, custom attributes will not be cloned deeply.

If `file.contents` is a [`Buffer`][buffer] and `options.contents` is `false`, the [`Buffer`][buffer] reference will be reused instead of copied.

#### `file.inspect()`

Returns a formatted-string interpretation of the Vinyl object. Automatically called by node's `console.log`.

### Instance properties

Each Vinyl object will have instance properties. Some may be unavailable based on what properties were set upon instantiation or modified since.

#### `file.contents`

Gets and sets the contents of the file. If set to a [`Stream`][stream], it is wrapped in a [`cloneable-readable`][cloneable-readable] stream.

Throws when set to any value other than a [`Stream`][stream], a [`Buffer`][buffer] or `null`.

Type: [`Stream`][stream], [`Buffer`][buffer] or `null`

#### `file.cwd`

Gets and sets current working directory. Will always be normalized and have trailing separators removed.

Throws when set to any value other than non-empty strings.

Type: `String`

#### `file.base`

Gets and sets base directory. Used for relative pathing (typically where a glob starts).
When `null` or `undefined`, it simply proxies the `file.cwd` property. Will always be normalized and have trailing separators removed.

Throws when set to any value other than non-empty strings or `null`/`undefined`.

Type: `String`

#### `file.path`

Gets and sets the absolute pathname string or `undefined`. Setting to a different value appends the new path to `file.history`. If set to the same value as the current path, it is ignored. All new values are normalized and have trailing separators removed.

Throws when set to any value other than a string.

Type: `String`

#### `file.history`

Array of `file.path` values the Vinyl object has had, from `file.history[0]` (original) through `file.history[file.history.length - 1]` (current). `file.history` and its elements should normally be treated as read-only and only altered indirectly by setting `file.path`.

Type: `Array`

#### `file.relative`

Gets the result of `path.relative(file.base, file.path)`.

Throws when set or when `file.path` is not set.

Type: `String`

Example:

```js
var file = new File({
  cwd: '/',
  base: '/test/',
  path: '/test/file.js'
});

console.log(file.relative); // file.js
```

#### `file.dirname`

Gets and sets the dirname of `file.path`. Will always be normalized and have trailing separators removed.

Throws when `file.path` is not set.

Type: `String`

Example:

```js
var file = new File({
  cwd: '/',
  base: '/test/',
  path: '/test/file.js'
});

console.log(file.dirname); // /test

file.dirname = '/specs';

console.log(file.dirname); // /specs
console.log(file.path); // /specs/file.js
```

#### `file.basename`

Gets and sets the basename of `file.path`.

Throws when `file.path` is not set.

Type: `String`

Example:

```js
var file = new File({
  cwd: '/',
  base: '/test/',
  path: '/test/file.js'
});

console.log(file.basename); // file.js

file.basename = 'file.txt';

console.log(file.basename); // file.txt
console.log(file.path); // /test/file.txt
```

#### `file.stem`

Gets and sets stem (filename without suffix) of `file.path`.

Throws when `file.path` is not set.

Type: `String`

Example:

```js
var file = new File({
  cwd: '/',
  base: '/test/',
  path: '/test/file.js'
});

console.log(file.stem); // file

file.stem = 'foo';

console.log(file.stem); // foo
console.log(file.path); // /test/foo.js
```

#### `file.extname`

Gets and sets extname of `file.path`.

Throws when `file.path` is not set.

Type: `String`

Example:

```js
var file = new File({
  cwd: '/',
  base: '/test/',
  path: '/test/file.js'
});

console.log(file.extname); // .js

file.extname = '.txt';

console.log(file.extname); // .txt
console.log(file.path); // /test/file.txt
```

#### `file.symlink`

Gets and sets the path where the file points to if it's a symbolic link. Will always be normalized and have trailing separators removed.

Throws when set to any value other than a string.

Type: `String`

### `Vinyl.isVinyl(file)`

Static method used for checking if an object is a Vinyl file. Use this method instead of `instanceof`.

Takes an object and returns `true` if it is a Vinyl file, otherwise returns `false`.

__Note: This method uses an internal flag that some older versions of Vinyl didn't expose.__

Example:

```js
var Vinyl = require('vinyl');

var file = new Vinyl();
var notAFile = {};

Vinyl.isVinyl(file); // true
Vinyl.isVinyl(notAFile); // false
```

### `Vinyl.isCustomProp(property)`

Static method used by Vinyl when setting values inside the constructor or when copying properties in `file.clone()`.

Takes a string `property` and returns `true` if the property is not used internally, otherwise returns `false`.

This method is usefuly for inheritting from the Vinyl constructor. Read more in [Extending Vinyl][extending-vinyl].

Example:

```js
var Vinyl = require('vinyl');

Vinyl.isCustomProp('sourceMap'); // true
Vinyl.isCustomProp('path'); // false -> internal getter/setter
```

## Normalization and concatenation

Since all properties are normalized in their setters, you can just concatenate with `/`, and normalization takes care of it properly on all platforms.

Example:

```js
var file = new File();
file.path = '/' + 'test' + '/' + 'foo.bar';

console.log(file.path);
// posix => /test/foo.bar
// win32 => \\test\\foo.bar
```

But never concatenate with `\`, since that is a valid filename character on posix system.

## Extending Vinyl

When extending Vinyl into your own class with extra features, you need to think about a few things.

When you have your own properties that are managed internally, you need to extend the static `isCustomProp` method to return `false` when one of these properties is queried.

```js
var Vinyl = require('vinyl');

var builtInProps = ['foo', '_foo'];

class SuperFile extends Vinyl {
  constructor(options) {
    super(options);
    this._foo = 'example internal read-only value';
  }

  get foo() {
    return this._foo;
  }

  static isCustomProp(name) {
    return super.isCustomProp(name) && builtInProps.indexOf(name) === -1;
  }
}
```

This makes properties `foo` and `_foo` ignored when cloning, and when passed in options to `constructor(options)` so they don't get assigned to the new object.

Same goes for `clone()`. If you have your own internal stuff that needs special handling during cloning, you should extend it to do so.

## License

MIT

[is-symbolic]: #issymbolic
[is-directory]: #isdirectory
[normalization]: #normalization-and-concatenation
[extending-vinyl]: #extending-vinyl
[stream]: https://nodejs.org/api/stream.html#stream_stream
[buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer
[fs-stats]: http://nodejs.org/api/fs.html#fs_class_fs_stats
[vinyl-fs]: https://github.com/gulpjs/vinyl-fs
[cloneable-readable]: https://github.com/mcollina/cloneable-readable

[downloads-image]: http://img.shields.io/npm/dm/vinyl.svg
[npm-url]: https://www.npmjs.com/package/vinyl
[npm-image]: http://img.shields.io/npm/v/vinyl.svg

[travis-url]: https://travis-ci.org/gulpjs/vinyl
[travis-image]: http://img.shields.io/travis/gulpjs/vinyl.svg?label=travis-ci

[appveyor-url]: https://ci.appveyor.com/project/gulpjs/vinyl
[appveyor-image]: https://img.shields.io/appveyor/ci/gulpjs/vinyl.svg?label=appveyor

[coveralls-url]: https://coveralls.io/r/gulpjs/vinyl
[coveralls-image]: http://img.shields.io/coveralls/gulpjs/vinyl/master.svg

[gitter-url]: https://gitter.im/gulpjs/gulp
[gitter-image]: https://badges.gitter.im/gulpjs/gulp.svg
