# gulp changelog

## 3.9.0

- add babel support
- add transpiler fallback support
- add support for some renamed transpilers (livescript, etc)
- add JSCS
- update dependecies (liftoff, interpret)
- documentation tweaks

## 3.8.11

- fix node 0.12/iojs problems
- add node 0.12 and iojs to travis
- update dependencies (liftoff, v8flags)
- documentation tweaks

## 3.8.10

- add link to spanish docs
- update dependencies (archy, semver, mocha, etc)
- documentation tweaks

## 3.8.9

- fix local version undefined output
- add completion for fish shell
- fix powershell completion line splitting
- add support for arbitrary node flags (oops, should have been a minor bump)
- add v8flags dependency
- update dependencies (liftoff)
- documentation tweaks

## 3.8.8

- update dependencies (minimist, tildify)
- documentation tweaks

## 3.8.7

- handle errors a bit better
- update dependencies (gulp-util, semver, etc)
- documentation tweaks

## 3.8.6

- remove executable flag from LICENSE
- update dependencies (chalk, minimist, liftoff, etc)
- documentation tweaks

## 3.8.5

- simplify --silent and --tasks-simple
- fix bug in autocomplete where errors would come out

## 3.8.4

- CLI will use exit code 1 on exit when any task fails during the lifetime of the process


## 3.8.3

- Tweak error formatting to work better with PluginErrors and strings

## 3.8.2

- add manpage generation

## 3.8.1

- the CLI now adds process.env.INIT_CWD which is the original cwd it was launched from

## 3.8.0

- update vinyl-fs
  - gulp.src is now a writable passthrough, this means you can use it to add files to your pipeline at any point
  - gulp.dest can now take a function to determine the folder

This is now possible!

```js
gulp.src('lib/*.js')
  .pipe(uglify())
  .pipe(gulp.src('styles/*.css'))
  .pipe(gulp.dest(function(file){
    // I don't know, you can do something cool here
    return 'build/whatever';
  }));
```

## 3.7.0

- update vinyl-fs to remove BOM from UTF8 files
- add --tasks-simple flag for plaintext task listings
- updated autocomplete scripts to be simpler and use new --tasks-simple flag
- added support for transpilers via liftoff 0.11 and interpret
  - just npm install your compiler (coffee-script for example) and it will work out of the box

## 3.5.5

- update deps
- gulp.dest now support mode option, uses source file mode by default (file.stat.mode)
- use chalk for colors in bin
- update gulp.env deprecation msg to be more helpful


## 3.5.2

- add -V for version on CLI (unix standard)
- -v is deprecated, use -V
- add -T as an alias for --tasks
- documentation

## 3.5

- added `gulp.watch(globs, tasksArray)` sugar
- remove gulp.taskQueue
- deprecate gulp.run
- deprecate gulp.env
- add engineStrict to prevent people with node < 0.9 from installing

## 3.4

- added `--tasks` that prints out the tree of tasks + deps
- global cli + local install mismatch is no longer fatal
- remove tests for fs stuff
- switch core src, dest, and watch to vinyl-fs
- internal cleaning

## 3.3.4

- `--base` is now `--cwd`

## 3.3.3

- support for `--base` CLI arg to change where the search for gulpfile/`--require`s starts
- support for `--gulpfile` CLI arg to point to a gulpfile specifically

## 3.3.0

- file.contents streams are no longer paused coming out of src
- dest now passes files through before they are empty to fix passing to multiple dests

## 3.2.4

- Bug fix - we didn't have any CLI tests

## 3.2.3

- Update dependencies for bug fixes
- autocomplete stuff in the completion folder

## 3.2

- File object is now [vinyl](https://github.com/wearefractal/vinyl)
- .watch() is now [glob-watcher](https://github.com/wearefractal/glob-watcher)
- Fix CLI -v when no gulpfile found
- gulp-util updated
- Logging moved to CLI bin file
  - Will cause double logging if you update global CLI to 3.2 but not local
  - Will cause no logging if you update local to 3.1 but not global CLI
- Drop support for < 0.9

## 3.1.3

- Move isStream and isBuffer to gulp-util

## 3.1

- Move file class to gulp-util

## 3.0

- Ability to pass multiple globs and glob negations to glob-stream
- Breaking change to the way glob-stream works
- File object is now a class
- file.shortened changed to file.relative
- file.cwd added
- Break out getStats to avoid nesting
- Major code reorganization

## 2.7

- Breaking change to the way options are passed to glob-stream
- Introduce new File object to ease pain of computing shortened names (now a getter)

## 2.4 - 2.6

- Moved stuff to gulp-util
- Quit exposing createGlobStream (just use the glob-stream module)
- More logging
- Prettier time durations
- Tons of documentation changes
- gulp.trigger(tasks...) as a through stream

## 1.2-2.4 (11/12/13)

- src buffer=false fixed for 0.8 and 0.9 (remember to .resume() on these versions before consuming)
- CLI completely rewritten
  - Colorful logging
  - Uses local version of gulp to run tasks
  - Uses findup to locate gulpfile (so you can run it anywhere in your project)
  - chdir to gulpfile directory before loading it
  - Correct exit codes on errors
- silent flag added to gulp to disable logging
- Fixes to task orchestration (3rd party)
- Better support for globbed directories (thanks @robrich)

## 1.2 (10/28/13)

- Can specify buffer=false on src streams to make file.content a stream
- Can specify read=false on src streams to disable file.content

## 1.1 (10/21/13)

- Can specify run callback
- Can specify task dependencies
- Tasks can accept callback or return promise
- `gulp.verbose` exposes run-time internals

## 1.0 (9/26/13)

- Specify dependency versions
- Updated docs

## 0.2 (8/6/13)

- Rename .files() to .src() and .folder() to .dest()

## 0.1 (7/18/13)

- Initial Release
