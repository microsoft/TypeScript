# parents

Return all the parent directories of a directory, inclusive of that directory.

[![build status](https://secure.travis-ci.org/substack/node-parents.png)](http://travis-ci.org/substack/node-parents)

# example

## dirname

``` js
var parents = require('parents');
var dirs = parents(__dirname);
console.dir(dirs);
```

***

```
[ '/home/substack/projects/node-parents/example',
  '/home/substack/projects/node-parents',
  '/home/substack/projects',
  '/home/substack',
  '/home',
  '/' ]
```

## win32

``` js
var parents = require('parents');
var dir = 'C:\\Program Files\\Maxis\\Sim City 2000\\cities';

var dirs = parents(dir, { platform : 'win32' });
console.dir(dirs);
```

***

```
[ 'C:\\Program Files\\Maxis\\Sim City 2000\\cities',
  'C:\\Program Files\\Maxis\\Sim City 2000',
  'C:\\Program Files\\Maxis',
  'C:\\Program Files',
  'C:' ]
```

# methods

``` js
var parents = require('parents')
```

## parents(dir, opts)

Return an array of the parent directories of `dir`, including and starting with
`dir`. If a `dir` isn't specified, `process.cwd()` will be used.

Optionally specify an `opts.platform` to control whether the separator and paths
works the unixy way with `'/'` or the windowsy way where sometimes things use
`'/'` and sometimes they use `'\\'` and also there are leading drive letters and
other exotic features. If `opts.platform` isn't specified, `process.platform`
will be used. Anything that matches `/^win/` will use the windowsy behavior.

# install

With [npm](http://npmjs.org) do:

```
npm install parents
```

# licence

MIT
