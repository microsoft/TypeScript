# `gulp-newer`

A [Gulp](http://gulpjs.com/) plugin for passing through only those source files that are newer than corresponding destination files.

## Install

```
npm install gulp-newer --save-dev
```

## Example

### Using `newer` with 1:1 source:dest mappings

The default task in the example below sets up a watch that minifies images on changes.  Piping the source files to `newer` before `imagemin` ensures that only those images that have changed are minified.  The `newer` plugin is configured with the directory path for minified images.

```js
var gulp = require('gulp');
var newer = require('gulp-newer');
var imagemin = require('gulp-imagemin');

var imgSrc = 'src/img/**';
var imgDest = 'build/img';

// Minify any new images
gulp.task('images', function() {

  // Add the newer pipe to pass through newer images only
  return gulp.src(imgSrc)
      .pipe(newer(imgDest))
      .pipe(imagemin())
      .pipe(gulp.dest(imgDest));

});

gulp.task('default', function() {
  gulp.watch(imgSrc, ['images']);
});
```

### Using `newer` with many:1 source:dest mappings

Plugins like `gulp-concat` take many source files and generate a single destination file.  In this case, the `newer` stream will pass through *all* source files if *any one* of them is newer than the destination file.  The `newer` plugin is configured with the destination file path.

```js
var gulp = require('gulp');
var newer = require('gulp-newer');
var concat = require('gulp-concat');

// Concatenate all if any are newer
gulp.task('concat', function() {

  // Add the newer pipe to pass through all sources if any are newer
  return gulp.src('lib/*.js')
      .pipe(newer('dist/all.js'))
      .pipe(concat('all.js'))
      .pipe(gulp.dest('dist'));

});
```


## API

### `newer(dest)`
* **dest** - `string` Path to destination directory or file.

### `newer(options)`

 * **options.dest** - `string` As above, *required*.
 * **options.ext** - `string` Source files will be matched to destination files with the provided extension (e.g. '.css').
 * **options.map** - `function` Map relative source paths to relative destination paths (e.g. `function(relativePath) { return relativePath + '.bak'; }`)
 * **options.extra** - `string` or `array` An extra file, file glob, or list of extra files and/or globs, to check for updated time stamp(s). If any of these files are newer than the destination files, then all source files will be passed into the stream.

Create a [transform stream](http://nodejs.org/api/stream.html#stream_class_stream_transform_1) that passes through files whose modification time is more recent than the corresponding destination file's modification time.

If `dest` is a directory path, the `newer` stream will check for files in the destination directory with the same relative path as source files.  Source files that have been modified more recently than the resolved destination file will be passed through.  If the `dest` directory or resolved destination file does not exist, all source files will be passed through.

If `dest` is a file path, the `newer` stream will pass through *all* files if *any one* of them has been modified more recently than the destination file.  If the `dest` file does not exist, all source files will be passed through.

[![Current Status](https://secure.travis-ci.org/tschaub/gulp-newer.png?branch=master)](https://travis-ci.org/tschaub/gulp-newer)
