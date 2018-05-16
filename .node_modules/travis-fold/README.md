travis-fold
===========

[![NPM version](https://badge.fury.io/js/travis-fold.png)](http://badge.fury.io/js/travis-fold)
[![Build Status](https://api.travis-ci.org/macbre/travis-fold.png)](http://travis-ci.org/macbre/travis-fold)

Tiny module for emitting folding syntax for Travis CI output

### Example

The following code will add [folding for Travis CI output](http://about.travis-ci.org/blog/2013-05-22-improving-build-visibility-log-folds/) when the module detects [a proper environment](http://about.travis-ci.org/docs/user/ci-environment/#Environment-variables):

```
npm install travis-fold
```

```js
var fold = require('travis-fold'),
	out = [];

// prepare output
out.push('Output begins...');

fold.pushStart(out, 'fold');
out.push('next line');

fold.pushStart(out, 'bar'); // nested
out.push('next line');
out.push('next line');
out.push('next line');
fold.pushEnd(out, 'bar');

out.push('next line');
out.push('next line');
fold.pushEnd(out, 'fold');

// and emit it
console.log(out.join('\n').trim());
```

### In action

* [Live example on Travis CI](https://travis-ci.org/macbre/travis-fold)
* ``node demo.js`` vs ``TRAVIS=true node demo.js``
