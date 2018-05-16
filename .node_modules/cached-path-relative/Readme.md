
# cached-path-relative

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Memoize the results of the path.relative function. `path.relative` can be an expensive operation if it happens a lot, and its results shouldn't change for the same arguments.

## Installation

    $ npm install cached-path-relative

## Usage

Use it just like your normal path.relative, but it's memoized:

```javascript
var relative = require('cached-path-relative')


relative('test/index.js', '.') === '../..'
```

## Shim

If you want to shim path.relative globally so that you can optimize things that don't know about this module (browserify rebuild times are a good use-case here), you can just import the shim:

`require('cached-path-relative/shim')`

This will globally shim `path.relative` so that its results are cached.

## License

The MIT License

Copyright &copy; 2016, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
