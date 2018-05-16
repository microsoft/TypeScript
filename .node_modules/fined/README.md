# Fined [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage][coveralls-img]][coveralls-url]

> Find a file given a declaration of locations

[![NPM][npm-img]][npm-url]

## Usage

```js
var fined = require('fined');

fined({ path: 'path/to/file', extensions: ['.js', '.json'] });
// => { path: '/absolute/path/to/file.js', extension: '.js' }  (if file exists)
// => null  (if file does not exist)

var opts = {
  name: '.app',
  cwd: '.',
  extensions: {
    'rc': 'default-rc-loader', 
    '.yml': 'default-yml-loader',
  },
};

fined({ path: '.' }, opts);
// => { path: '/absolute/of/cwd/.app.yml', extension: { '.yml': 'default-yml-loader' } }

fined({ path: '~', extensions: { 'rc': 'some-special-rc-loader' } }, opts);
// => { path: '/User/home/.apprc', extension: { 'rc': 'some-special-rc-loader' } }
```

## API

### fined(pathObj, opts) => object | null

#### Arguments:

* **pathObj** [string | object] : a path setting for finding a file.
* **opts** [object] : a plain object supplements `pathObj`.

   `pathObj` and `opts` can have same properties:

   * **path** [string] : a path string.
   * **name** [string] : a basename.
   * **extensions**: [string | array | object] : extensions.
   * **cwd**: a base directory of `path` and for finding up.
   * **findUp**: [boolean] : a flag to find up.

#### Return:

This function returns a plain object which consists of following properties if a file exists otherwise null.

   * **path** : an absolute path
   * **extension** : a string or a plain object of extension.


## License

MIT

[npm-img]: https://nodei.co/npm/fined.png
[npm-url]: https://nodei.co/npm/fined/
[travis-img]: https://travis-ci.org/js-cli/fined.svg?branch=master
[travis-url]: https://travis-ci.org/js-cli/fined
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/js-cli/fined?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/js-cli/fined
[coveralls-img]: https://coveralls.io/repos/github/js-cli/fined/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/js-cli/fined?branch=master
