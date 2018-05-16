## gulp-sourcemaps  [![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][coveralls-image]][coveralls-url]

### Branching

__2.X now supports node 0.10+ due to switching out a dependency.__

### Usage

#### Write inline source maps
Inline source maps are embedded in the source file.

Example:
```javascript
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
```

All plugins between `sourcemaps.init()` and `sourcemaps.write()` need to have support for `gulp-sourcemaps`. You can find a list of such plugins in the [wiki](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support).


#### Write external source map files

To write external source map files, pass a path relative to the destination to `sourcemaps.write()`.

Example:
```javascript
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'));
});
```

#### Load existing source maps

To load existing source maps, pass the option `loadMaps: true` to `sourcemaps.init()`.

Example:
```javascript
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
```

#### Handle large files

To handle large files, pass the option `largeFile: true` to `sourcemaps.init()`.

Example:
```javascript
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
  gulp.src('src/**/*.js')
    .pipe(sourcemaps.init({largeFile: true}))
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
```

#### Handle source files from different directories

Use the `base` option on `gulp.src` to make sure all files are relative to a common base directory.

Example:
```javascript
var gulp = require('gulp');
var plugin1 = require('gulp-plugin1');
var plugin2 = require('gulp-plugin2');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('javascript', function() {
gulp.src(['src/test.js', 'src/testdir/test2.js'], { base: 'src' })
    .pipe(sourcemaps.init())
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('dist'));
});
```

#### Alter `sources` property on sourcemaps

The exported `mapSources` method gives full control over the source paths. It takes a function that is called for every source and receives the default source path as a parameter and the original vinyl file.

Example:
```javascript
gulp.task('javascript', function() {
  var stream = gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(plugin1())
      .pipe(plugin2())
      // be careful with the sources returned otherwise contents might not be loaded properly
      .pipe(sourcemaps.mapSources(function(sourcePath, file) {
        // source paths are prefixed with '../src/'
        return '../src/' + sourcePath;
      }))
    .pipe(sourcemaps.write('../maps')
    .pipe(gulp.dest('public/scripts'));
});
```

#### Generate Identity Sourcemap

The exported `identityMap` method allows you to generate a full valid source map encoding no changes (slower, only for Javascript and CSS) instead of the default empty source map (no mappings, fast). __Use this option if you get missing or incorrect mappings, e.g. when debugging.__

Example:
```javascript
gulp.task('javascript', function() {
  var stream = gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      // An identity sourcemap will be generated at this step
      .pipe(sourcemaps.identityMap())
      .pipe(plugin1())
      .pipe(plugin2())
    .pipe(sourcemaps.write('../maps')
    .pipe(gulp.dest('public/scripts'));
});
```


### Init Options

- `loadMaps`

  Set to true to load existing maps for source files. Supports the following:
    - inline source maps
    - source map files referenced by a `sourceMappingURL=` comment
    - source map files with the same name (plus .map) in the same directory


- `identityMap`

  __This option is deprecated. Upgrade to use our [`sourcemap.identityMap`](#generate-identity-sourcemap) API.__


### Write Options

- `addComment`

  By default a comment containing / referencing the source map is added. Set this to `false` to disable the comment (e.g. if you want to load the source maps by header).

  Example:
  ```javascript
  gulp.task('javascript', function() {
    var stream = gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
        .pipe(plugin1())
        .pipe(plugin2())
      .pipe(sourcemaps.write('../maps', {addComment: false}))
      .pipe(gulp.dest('dist'));
  });
  ```

- `includeContent`

  By default the source maps include the source code. Pass `false` to use the original files.

  Including the content is the recommended way, because it "just works". When setting this to `false` you have to host the source files and set the correct `sourceRoot`.

- `sourceRoot`

  Set the location where the source files are hosted (use this when `includeContent` is set to `false`). This is usually a URL (or an absolute URL path), not a local file system path.
  By default the source root is '' or in case `destPath` is set, the relative path from the source map to the source base directory (this should work for many dev environments).
  If a relative path is used (empty string or one starting with a `.`), it is interpreted as a path relative to the destination. The plugin rewrites it to a path relative to each source map.

  Example:
  ```javascript
  gulp.task('javascript', function() {
    var stream = gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
        .pipe(plugin1())
        .pipe(plugin2())
      .pipe(sourcemaps.write({includeContent: false, sourceRoot: '/src'}))
      .pipe(gulp.dest('dist'));
  });
  ```

  Example (using a function):
  ```javascript
  gulp.task('javascript', function() {
    var stream = gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
        .pipe(plugin1())
        .pipe(plugin2())
      .pipe(sourcemaps.write({
        includeContent: false,
        sourceRoot: function(file) {
          return '/src';
        }
       }))
      .pipe(gulp.dest('dist'));
  });
  ```

  Example (relative path):
  ```javascript
  gulp.task('javascript', function() {
    var stream = gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
        .pipe(plugin1())
        .pipe(plugin2())
      .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))
      .pipe(gulp.dest('dist'));
  });
  ```
  In this case for a file written to `dist/subdir/example.js`, the source map is written to `dist/subdir/example.js.map` and the sourceRoot will be `../../src` (resulting in the full source path `../../src/subdir/example.js`).

- `destPath`

  Set the destination path (the same you pass to `gulp.dest()`). If the source map destination path is not a sub path of the destination path, this is needed to get the correct path in the `file` property of the source map.
  In addition, it allows to automatically set a relative `sourceRoot` if none is set explicitly.

- `sourceMappingURLPrefix`

  Specify a prefix to be prepended onto the source map URL when writing external source maps. Relative paths will have their leading dots stripped.

  Example:
  ```javascript
  gulp.task('javascript', function() {
    var stream = gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
        .pipe(plugin1())
        .pipe(plugin2())
      .pipe(sourcemaps.write('../maps', {
        sourceMappingURLPrefix: 'https://asset-host.example.com/assets'
      }))
      .pipe(gulp.dest('public/scripts'));
  });
  ```

  This will result in a source mapping URL comment like `sourceMappingURL=https://asset-host.example.com/assets/maps/helloworld.js.map`.

- `sourceMappingURL`

  If you need full control over the source map URL you can pass a function to this option. The output of the function must be the full URL to the source map (in function of the output file).

  Example:
  ```javascript
  gulp.task('javascript', function() {
    var stream = gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
        .pipe(plugin1())
        .pipe(plugin2())
      .pipe(sourcemaps.write('../maps', {
        sourceMappingURL: function(file) {
          return 'https://asset-host.example.com/' + file.relative + '.map';
        }
      }))
      .pipe(gulp.dest('public/scripts'));
  });
  ```

  This will result in a source mapping URL comment like `sourceMappingURL=https://asset-host.example.com/helloworld.js.map`.

- `mapFile`

  This option allows to rename the map file. It takes a function that is called for every map and receives the default map path as a parameter.

  Example:
  ```javascript
  gulp.task('javascript', function() {
    var stream = gulp.src('src/**/*.js')
      .pipe(sourcemaps.init())
        .pipe(plugin1())
        .pipe(plugin2())
      .pipe(sourcemaps.write('../maps', {
        mapFile: function(mapFilePath) {
          // source map files are named *.map instead of *.js.map
          return mapFilePath.replace('.js.map', '.map');
        }
      }))
      .pipe(gulp.dest('public/scripts'));
  });
  ```

- `mapSources`

  __This option is deprecated. Upgrade to use our [`sourcemap.mapSources`](#alter-sources-property-on-sourcemaps) API.__

- `charset`

  Sets the charset for inline source maps. Default: `utf8`

- `clone`

  Clones the original file for creation of the map file. Could be important if file history is important. See [file.clone()](https://github.com/gulpjs/vinyl#filecloneoptions) for possible options. Default: `{deep:false, contents:false}`

### Plugin developers only:

- **How to add source map support to plugins**

  - Generate a source map for the transformation the plugin is applying
  - **Important**: Make sure the paths in the generated source map (`file` and `sources`) are relative to `file.base` (e.g. use `file.relative`).
  - Apply this source map to the vinyl `file`. E.g. by using [vinyl-sourcemaps-apply](https://github.com/gulp-sourcemaps/vinyl-sourcemaps-apply).
    This combines the source map of this plugin with the source maps coming from plugins further up the chain.
  - Add your plugin to the [wiki page](https://github.com/gulp-sourcemaps/gulp-sourcemaps/wiki/Plugins-with-gulp-sourcemaps-support)

  #### Example:

  ```js
  var through = require('through2');
  var applySourceMap = require('vinyl-sourcemaps-apply');
  var myTransform = require('myTransform');

  module.exports = function(options) {

    function transform(file, encoding, callback) {
      // generate source maps if plugin source-map present
      if (file.sourceMap) {
        options.makeSourceMaps = true;
      }

      // do normal plugin logic
      var result = myTransform(file.contents, options);
      file.contents = new Buffer(result.code);

      // apply source map to the chain
      if (file.sourceMap) {
        applySourceMap(file, result.map);
      }

      this.push(file);
      callback();
    }

    return through.obj(transform);
  };
  ```

  - **Verify sourcemaps are working**

    See example below or refer to [test/write.js](./test/write.js)

  #### Example:
  ```js
  var stream = plugin();
  var init = sourcemaps.init();
  var write = sourcemaps.write();

  init.pipe(stream).pipe(write);

  write.on('data', function (file) {
    assert(...);
    cb();
  });

  init.write(new gutil.File(...));
  init.end();
  ```

### Debugging

All debugging output relies on [visionmedia/debug](https://github.com/visionmedia/debug). Follow the directions to set the
environment variable `$DEBUG`.

For a few examples of debug you could use:

```sh
  DEBUG='gulp-sourcemaps:*' #everything
  DEBUG='gulp-sourcemaps:init' #init/index.js
  DEBUG='gulp-sourcemaps:init:*' #init/index.internals.js
  DEBUG='gulp-sourcemaps:write:' #write/index.js
  DEBUG='gulp-sourcemaps:write:*' #write/index.internals.js
  DEBUG='gulp-sourcemaps:write:,gulp-sourcemaps:init:**' #write/index.internals.js and init/index.internals.js
```

[npm-image]: https://img.shields.io/npm/v/gulp-sourcemaps.svg
[npm-url]: https://www.npmjs.com/package/gulp-sourcemaps
[travis-image]: https://img.shields.io/travis/gulp-sourcemaps/gulp-sourcemaps.svg
[travis-url]: https://travis-ci.org/gulp-sourcemaps/gulp-sourcemaps
[coveralls-image]: https://img.shields.io/coveralls/gulp-sourcemaps/gulp-sourcemaps.svg
[coveralls-url]: https://coveralls.io/r/gulp-sourcemaps/gulp-sourcemaps?branch=master
