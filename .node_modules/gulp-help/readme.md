# [gulp](https://github.com/gulpjs/gulp)-help [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> Adds a default help task to gulp and provides the ability to add custom help messages to your gulp tasks

## Install

```bash
$ npm install --save-dev gulp-help
```

## Usage

Before defining any tasks, add `gulp help` to your gulp instance

```js
// gulpfile.js
var gulp = require('gulp-help')(require('gulp'));
```

Next, define help text for each custom task

```js
// gulpfile.js
gulp.task('lint', 'Lints all server side js', function () {
    gulp.src('./lib/**/*.js')
      .pipe(jshint());
});
```

Now show that help via `gulp help`

![](screenshot.png)

## New task API

### gulp.task(name[, help, deps, fn, taskOptions])

#### [name](https://github.com/gulpjs/gulp/blob/master/docs/API.md#name)

Type: `string`

#### help

Type: `string | boolean`

Custom help message as a string.

If you want to hide the task from the help menu, supply `false`

```js
gulp.task('task-hidden-from-help', false, function () {
  // ...
});
```

However, if the `--all` flag is provided, even these tasks will be shown. (i.e. `gulp help --all`)

#### [deps](https://github.com/gulpjs/gulp/blob/master/docs/API.md#deps)

Type: `Array`

#### [fn](https://github.com/gulpjs/gulp/blob/master/docs/API.md#fn)

Type: `function`

#### taskOptions.aliases

Type: `Array`

List of aliases for this task

```js
gulp.task('version', 'prints the version.', [], function() {
  // ...
}, {
  aliases: ['v', 'V']
});
```

which results in

![](screenshot-aliases.png)

#### taskOptions.options

Type: `Object`

Object documenting options which can be passed to your task

```js
gulp.task('version', 'prints the version.', [], function () {
  // ...
}, {
  options: {
    'env=prod': 'description of env, perhaps with available values',
    'key=val': 'description of key & val',
    'key': 'description of key'
  }
});
```
which results in

![](screenshot-options.png)

## require('gulp-help')(require('gulp'), options);

These are all the options available to be passed to the `gulp-help` instance, NOT individual tasks.

- `description` - modifies the default help message
- `aliases` - adds aliases to the default help task
- `hideEmpty` - hide all tasks with no help message defined. Useful when including 3rd party tasks
- `hideDepsMessage` - hide all task dependencies
- `afterPrintCallback` - a function to run after the default help task runs

## License

MIT © [Chris Montgomery](http://www.chrismontgomery.info/)

[npm-url]: https://npmjs.org/package/gulp-help
[npm-image]: http://img.shields.io/npm/v/gulp-help.svg
[travis-image]: https://travis-ci.org/chmontgomery/gulp-help.svg?branch=master
[travis-url]: https://travis-ci.org/chmontgomery/gulp-help
