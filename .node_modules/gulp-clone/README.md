# [gulp](https://github.com/wearefractal/gulp)-clone [![Build Status](https://secure.travis-ci.org/mariocasciaro/gulp-clone.png?branch=master)](https://travis-ci.org/mariocasciaro/gulp-clone) [![NPM version](https://badge.fury.io/js/gulp-clone.png)](http://badge.fury.io/js/gulp-clone) [![Dependency Status](https://gemnasium.com/mariocasciaro/gulp-clone.png)](https://gemnasium.com/mariocasciaro/gulp-clone)

> Duplicate files in memory.

## Install

Install with [npm](https://npmjs.org/package/gulp-clone).

```
npm install --save-dev gulp-clone
```

## Changelog
* 2.0.0: **Possible Breaking change** - The dependency from gutil has been dropped, this has been reported to cause a breaking change in some circumstances. Please continue to use the 1.0 branch if that would cause problems in your setup.
* 1.0.0: **Breaking change** - There is a new operating mode, as explained in the 1st example. The old
 operating mode is still available under the `clone.sink()` property.

## Example

gulp-clone is useful in all those situations where you perform a destructive operation on your files (as for example concat) and you want to keep your original files for further processing or saving.

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var clone = require('gulp-clone');
var es = require('event-stream');

gulp.task('default', function () {
    var scripts = gulp.src('assets/**/*.js');

    var bundle = scripts.pipe(clone())
      .pipe(concat('bundle.js'));

    // Merge the streams together, then write them to the out folder
    return es.merge(scripts, bundle).pipe(gulp.dest('out'));
});
```

##Example - Bypass mode

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var clone = require('gulp-clone');

var cloneSink = clone.sink();

gulp.task('default', function () {
  gulp.src('assets/**/*.js')
    .pipe(cloneSink)                //<- clone objects streaming through this point
    .pipe(concat("bundle.js"))
    .pipe(cloneSink.tap())          //<- output cloned objects + bundle.js
    .pipe(gulp.dest('out/'));       //<- saves bundle.js + original files in one pass
});
```

## License

[MIT](http://en.wikipedia.org/wiki/MIT_License) @ Mario Casciaro
