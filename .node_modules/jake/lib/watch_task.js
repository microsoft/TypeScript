var fs = require('fs')
  , FileList = require('filelist').FileList;

var THROTTLE = 5000;

/**
  @name WatchTask
  @constructor
  @description  Watches specified files for changes, and runs a
      set of tasks each time there's a change
  @param {String} [name] Name of the WatchTask -- defaults to 'watch'
      if not specified
  @param {Array} taskNames The list of tasks to run with each change
  @param {Function} definition Function to set up the WatchTask --
      invoked on `this` after the initial construction
*/
var WatchTask = function () {
  var self = this
    , args = Array.prototype.slice.call(arguments)
    , arg
    , definition
    , taskNames
    , name
    , last = (new Date()).getTime() - THROTTLE;

  args = args.filter(function (a) {
    return !!a;
  });

  while ((arg = args.shift())) {
    if (typeof arg == 'string') {
      name = arg;
    }
    else if (typeof arg == 'object' && Array.isArray(arg)) {
      taskNames = arg;
    }
    else if (typeof arg == 'function') {
      definition = arg;
    }
  }

  if (!(taskNames && taskNames.length)) {
    throw new Error('Watch task needs some tasks to run');
  }

  name = name || 'watch';
  definition = definition || function () {};

  if (jake.Task[name]) {
    throw new Error('WatchTask named "' + name + '" already exists. ' +
      'Please use a different name.');
  }

  this.watchTasks = Array.isArray(taskNames) ? taskNames : [taskNames];
  this.watchFiles = new FileList();
  this.rootTask = task('watchTasks', this.watchTasks);
  this.throttle = THROTTLE;

  this.watchFiles.include(WatchTask.DEFAULT_INCLUDE_FILES);
  this.watchFiles.exclude(WatchTask.DEFAULT_EXCLUDE_FILES);

  if (typeof definition == 'function') {
    definition.call(this);
  }

  desc('Runs these tasks: ' + this.watchTasks.join(', '));
  task(name, function () {
    console.log('WatchTask started for: ' + self.watchTasks.join(', '));
    jake.watch('.', {includePattern: /.+/}, function (filePath) {
      var fileMatch = self.watchFiles.toArray().some(function (item) {
        return item == filePath;
      });
      if (fileMatch && ((new Date()).getTime() - last) > self.throttle) {
        last = (new Date()).getTime();
        self.rootTask.reenable(true);
        self.rootTask.invoke();
      }
    });
  });
};

WatchTask.DEFAULT_INCLUDE_FILES = [
  './**/*.js'
, './**/*.coffee'
, './**/*.ls'
, './**/*.css'
, './**/*.less'
, './**/*.scss'
];

WatchTask.DEFAULT_EXCLUDE_FILES = [];
if (fs.existsSync('node_modules')) {
  WatchTask.DEFAULT_EXCLUDE_FILES.push(/(^|[\/\\])node_modules([\/\\]|$)/);
}

exports.WatchTask = WatchTask;

