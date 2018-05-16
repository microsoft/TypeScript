/*
 * Jake JavaScript build tool
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var EventEmitter = require('events').EventEmitter;
// And so it begins
global.jake = new EventEmitter();

var fs = require('fs')
  , path = require('path')
  , chalk = require('chalk')
  , taskNs = require('./task')
  , Task = taskNs.Task
  , FileTask = taskNs.FileTask
  , DirectoryTask = taskNs.DirectoryTask
  , Rule = require('./rule').Rule
  , Namespace = require('./namespace').Namespace
  , api = require('./api')
  , utils = require('./utils')
  , Program = require('./program').Program
  , Loader = require('./loader').Loader
  , pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json').toString());

var MAX_RULE_RECURSION_LEVEL = 16;

var Invocation = function (taskName, args) {
  this.taskName = taskName;
  this.args = args;
};

// Globalize jake and top-level API methods (e.g., `task`, `desc`)
utils.mixin(global, api);

// Copy utils onto base jake
utils.mixin(jake, utils);
// File utils should be aliased directly on base jake as well
utils.mixin(jake, utils.file);

// Also add top-level API methods to exported object for those who don't want to
//   use the globals (`file` here will overwrite the 'file' utils namespace)
utils.mixin(jake, api);

utils.mixin(jake, new (function () {

  this._invocationChain = [];

  // Private variables
  // =================
  // Local reference for scopage
  var self = this;

  // Public properties
  // =================
  this.version = pkg.version;
  // Used when Jake exits with a specific error-code
  this.errorCode = undefined;
  // Loads Jakefiles/jakelibdirs
  this.loader = new Loader();
  // Name/value map of all the various tasks defined in a Jakefile.
  // Non-namespaced tasks are placed into 'default.'
  this.defaultNamespace = new Namespace('default', null);
  // For namespaced tasks -- tasks with no namespace are put into the
  // 'default' namespace so lookup code can work the same for both
  // namespaced and non-namespaced.
  this.currentNamespace = this.defaultNamespace;
  // Saves the description created by a 'desc' call that prefaces a
  // 'task' call that defines a task.
  this.currentTaskDescription = null;
  this.program = new Program();
  this.FileList = require('filelist').FileList;
  this.PackageTask = require('./package_task').PackageTask;
  this.PublishTask = require('./publish_task').PublishTask;
  this.WatchTask = require('./watch_task').WatchTask;
  this.TestTask = require('./test_task').TestTask;
  this.Task = Task;
  this.FileTask = FileTask;
  this.DirectoryTask = DirectoryTask;
  this.Namespace = Namespace;
  this.Rule = Rule;

  this.parseAllTasks = function () {
    var _parseNs = function (name, ns) {
      var nsTasks = ns.tasks
        , task
        , nsNamespaces = ns.childNamespaces
        , fullName;
      // Iterate through the tasks in each namespace
      for (var q in nsTasks) {
        task = nsTasks[q];
        // Prefix namespaced tasks
        fullName = name == 'default' ? q : name + ':' + q;
        // Save with 'taskname' or 'namespace:taskname' key
        task.fullName = fullName;
        jake.Task[fullName] = task;
      }
      for (var p in nsNamespaces) {
        fullName = (name == 'default') ? p : name + ':' + p;
        _parseNs(fullName, nsNamespaces[p]);
      }
    };

    _parseNs('default', jake.defaultNamespace);
  };

  /**
   * Displays the list of descriptions avaliable for tasks defined in
   * a Jakefile
   */
  this.showAllTaskDescriptions = function (f) {
    var p
      , maxTaskNameLength = 0
      , task
      , str = ''
      , padding
      , name
      , descr
      , filter = typeof f == 'string' ? f : null;

    for (p in jake.Task) {
      task = jake.Task[p];
      // Record the length of the longest task name -- used for
      // pretty alignment of the task descriptions
      maxTaskNameLength = p.length > maxTaskNameLength ?
        p.length : maxTaskNameLength;
    }
    // Print out each entry with descriptions neatly aligned
    for (p in jake.Task) {
      if (filter && p.indexOf(filter) == -1) {
        continue;
      }
      task = jake.Task[p];

      //name = '\033[32m' + p + '\033[39m ';
      name = chalk.green(p);

      // Create padding-string with calculated length
      padding = (new Array(maxTaskNameLength - p.length + 2)).join(' ');

      descr = task.description;
      if (descr) {
        descr = chalk.gray(descr);
        console.log('jake ' + name + padding + descr);
      }
    }
  };

  this.createTask = function () {
    var args = Array.prototype.slice.call(arguments)
      , arg
      , obj
      , task
      , type
      , name
      , action
      , opts = {}
      , prereqs = [];

      type = args.shift();

    // name, [deps], [action]
    // Name (string) + deps (array) format
    if (typeof args[0] == 'string') {
      name = args.shift();
      if (Array.isArray(args[0])) {
        prereqs = args.shift();
      }
    }
    // name:deps, [action]
    // Legacy object-literal syntax, e.g.: {'name': ['depA', 'depB']}
    else {
      obj = args.shift();
      for (var p in obj) {
        prereqs = prereqs.concat(obj[p]);
        name = p;
      }
    }

    // Optional opts/callback or callback/opts
    while ((arg = args.shift())) {
      if (typeof arg == 'function') {
        action = arg;
      }
      else {
        opts = arg;
      }
    }

    task = jake.currentNamespace.resolveTask(name);
    if (task && !action) {
      // Task already exists and no action, just update prereqs, and return it.
      task.prereqs = task.prereqs.concat(prereqs);
      return task;
    }

    switch (type) {
      case 'directory':
        action = function () {
          jake.mkdirP(name);
        };
        task = new DirectoryTask(name, prereqs, action, opts);
        break;
      case 'file':
        task = new FileTask(name, prereqs, action, opts);
        break;
      default:
        task = new Task(name, prereqs, action, opts);
    }

    if (jake.currentTaskDescription) {
      task.description = jake.currentTaskDescription;
      jake.currentTaskDescription = null;
    }
    jake.currentNamespace.tasks[name] = task;
    task.namespace = jake.currentNamespace;

    // FIXME: Should only need to add a new entry for the current
    // task-definition, not reparse the entire structure
    jake.parseAllTasks();

    return task;
  };

  this.attemptRule = function (name, ns, level) {
    var prereqRule
      , prereq;
    if (level > MAX_RULE_RECURSION_LEVEL) {
      return null;
    }
    // Check Rule
    prereqRule = ns.matchRule(name);
    if (prereqRule) {
      prereq = prereqRule.createTask(name, level);
    }
    return prereq || null;
  };

  this.createPlaceholderFileTask = function (name, namespace) {
    var nsPath = ''
      , filePath = name.split(':').pop() // Strip any namespace
      , parts
      , fileTaskName
      , task
      , stats;

    if (namespace) {
      if (typeof namespace == 'string') {
        nsPath = namespace;
      }
      else {
        nsPath = namespace.path;
      }
    }

    parts = nsPath.length ? nsPath.split(':') : [];
    parts.push(filePath);
    fileTaskName = parts.join(':');

    task = jake.Task[fileTaskName];

    // If there's not already an existing dummy FileTask for it,
    // create one
    if (!task) {
      // Create a dummy FileTask only if file actually exists
      if (fs.existsSync(filePath)) {
        stats = fs.statSync(filePath);
        task = new jake.FileTask(filePath);
        task.fullName = fileTaskName;
        task.modTime = stats.mtime;
        task.dummy = true;
        // Put this dummy Task in the global Tasks list so
        // modTime will be eval'd correctly
        jake.Task[fileTaskName] = task;
      }
    }

    return task || null;
  };


  this.init = function () {
    var self = this;
    process.addListener('uncaughtException', function (err) {
      self.program.handleErr(err);
    });

  };

  this.run = function () {
    var args = Array.prototype.slice.call(arguments)
      , program = this.program
      , loader = this.loader
      , preempt
      , opts;

    program.parseArgs(args);
    program.init();

    preempt = program.firstPreemptiveOption();
    if (preempt) {
      preempt();
    }
    else {
      opts = program.opts;
      // jakefile flag set but no jakefile yet
      if (opts.autocomplete && opts.jakefile === true) {
        process.stdout.write('no-complete');
        return;
      }
      // Load Jakefile and jakelibdir files
      var jakefileLoaded = loader.loadFile(opts.jakefile);
      var jakelibdirLoaded = loader.loadDirectory(opts.jakelibdir);

      if(!jakefileLoaded && !jakelibdirLoaded && !opts.autocomplete) {
        fail('No Jakefile. Specify a valid path with -f/--jakefile, ' +
            'or place one in the current directory.');
      }

      program.run();
    }
  };

})());

module.exports = jake;
