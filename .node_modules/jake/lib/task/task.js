var util = require('util') // Native Node util module
  , path = require('path')
  , EventEmitter = require('events').EventEmitter
  , Task
  , TaskBase
  , utils = require('../utils')
  , async = require('async')
  , rule; // Lazy-require this at the bottom

var UNDEFINED_VALUE;

/**
  @name jake
  @namespace jake
*/
/**
  @name jake.Task
  @constructor
  @augments EventEmitter
  @description A Jake Task

  @param {String} name The name of the Task
  @param {Array} [prereqs] Prerequisites to be run before this task
  @param {Function} [action] The action to perform for this task
  @param {Object} [opts]
    @param {Array} [opts.asyc=false] Perform this task asynchronously.
    If you flag a task with this option, you must call the global
    `complete` method inside the task's action, for execution to proceed
    to the next task.
 */
Task = function () {
  // Do constructor-work only on actual instances, not when used
  // for inheritance
  if (arguments.length) {
    this.init.apply(this, arguments);
  }
};

util.inherits(Task, EventEmitter);

TaskBase = new (function () {

  // Parse any positional args attached to the task-name
  var parsePrereqName = function (name) {
        var taskArr = name.split('[')
          , taskName = taskArr[0]
          , taskArgs = [];
        if (taskArr[1]) {
          taskArgs = taskArr[1].replace(/\]$/, '');
          taskArgs = taskArgs.split(',');
        }
        return {
          name: taskName
        , args: taskArgs
        };
      };

  /**
    @name jake.Task#event:complete
    @event
   */

  this.init = function (name, prereqs, action, options) {
    var opts = options || {};

    this._currentPrereqIndex = 0;

    this.name = name;
    this.prereqs = prereqs;
    this.action = action;
    this.async = false;
    this.taskStatus = Task.runStatuses.UNSTARTED;
    this.fullName = null;
    this.description = null;
    this.args = [];
    this.value = UNDEFINED_VALUE;
    this.namespace = null;
    this.parallelLimit = 1;

    // Support legacy async-flag -- if not explicitly passed or falsy, will
    // be set to empty-object
    if (typeof opts == 'boolean' && opts === true) {
      this.async = true;
    }
    else {
      if (opts.async) {
        this.async = true;
      }
      if (opts.parallelLimit) {
        this.parallelLimit = opts.parallelLimit;
      }
    }

    //Do a test on self dependencies for this task
    if(Array.isArray(this.prereqs) && this.prereqs.indexOf(this.name) !== -1) {
      throw new Error("Cannot use prereq " + this.name + " as a dependency of itself");
    }

  };

  /**
    @name jake.Task#invoke
    @function
    @description Runs prerequisites, then this task. If the task has already
    been run, will not run the task again.
   */
  this.invoke = function () {
    jake._invocationChain.push(this);
    this.args = Array.prototype.slice.call(arguments);
    this.runPrereqs();
  };

  /**
    @name jake.Task#execute
    @function
    @description Runs prerequisites, then this task. If the task has already
    been run, will not run the task again.
   */
  this.execute = function () {
    jake._invocationChain.push(this);
    this.args = Array.prototype.slice.call(arguments);
    this.reenable();
    this.run();
  };

  this.runPrereqs = function () {
    if (this.prereqs && this.prereqs.length) {
      if(this.parallelLimit > 1) {
        var currenttask = this;
        async.eachLimit(currenttask.prereqs,currenttask.parallelLimit,function(name, cb) {

          var parsed = parsePrereqName(name);

          var prereq = currenttask.namespace.resolveTask(parsed.name) ||
          jake.attemptRule(name, currenttask.namespace, 0) ||
          jake.createPlaceholderFileTask(name, currenttask.namespace);

          if (!prereq) {
            throw new Error('Unknown task "' + name + '"');
          }

          //Test for circular invocation
          if(prereq === currenttask) {
            cb(new Error("Cannot use prereq " + prereq.name + " as a dependency of itself"));
          }

          if (prereq.taskStatus === Task.runStatuses.DONE) {
            //prereq already done, return
            cb();
          } else {
            //wait for complete before calling cb
            prereq.once('complete', function () {
              cb();
            });
            //start te prereq if we are the first to encounter it
            if(prereq.taskStatus === Task.runStatuses.UNSTARTED) {
              prereq.taskStatus = Task.runStatuses.STARTED;
              prereq.invoke.apply(prereq, parsed.args);
            }
          }
        }, function(err) {
          //async callback is called after all prereqs have run.
          if(err) {
            throw err;
          } else {
            currenttask.run();
          }
        });
      } else {
        this.nextPrereq();
      }
    }
    else {
      this.run();
    }
  };

  this.nextPrereq = function () {
    var self = this
      , index = this._currentPrereqIndex
      , name = this.prereqs[index]
      , prereq
      , parsed
      , filePath
      , stats;

    if (name) {

      parsed = parsePrereqName(name);

      prereq = this.namespace.resolveTask(parsed.name) ||
          jake.attemptRule(name, this.namespace, 0) ||
          jake.createPlaceholderFileTask(name, this.namespace);

      if (!prereq) {
        throw new Error('Unknown task "' + name + '"');
      }

      // Do when done
      if (prereq.taskStatus === Task.runStatuses.DONE) {
        self.handlePrereqComplete(prereq);
      } else {
        prereq.once('complete', function () {
          self.handlePrereqComplete(prereq);
        });
        if(prereq.taskStatus === Task.runStatuses.UNSTARTED) {
           prereq.taskStatus = Task.runStatuses.STARTED;
           prereq.invoke.apply(prereq, parsed.args);
        }
      }
    }
  };

  /**
    @name jake.Task#reenable
    @function
    @description Reenables a task so that it can be run again.
   */
  this.reenable = function (deep) {
    var prereqs
      , prereq;
    this.taskStatus = Task.runStatuses.UNSTARTED;
    this.value = UNDEFINED_VALUE;
    if (deep && this.prereqs) {
      prereqs = this.prereqs;
      for (var i = 0, ii = prereqs.length; i < ii; i++) {
        prereq = jake.Task[prereqs[i]];
        if (prereq) {
          prereq.reenable(deep);
        }
      }
    }
  };

  this.handlePrereqComplete = function (prereq) {
    var self = this;
    this._currentPrereqIndex++;
    if (this._currentPrereqIndex < this.prereqs.length) {
      setImmediate(function () {
        self.nextPrereq();
      });
    }
    else {
      this.run();
    }
  };

  this.isNeeded = function () {
    if (this.taskStatus === Task.runStatuses.DONE || typeof this.action != 'function') {
      return false;
    }
    return true;
  };

  this.run = function () {
    var runAction = this.isNeeded()
      , val;

    if (runAction) {
      this.emit('start');
      try {
        val = this.action.apply(this, this.args);

        if (typeof val == 'object' && typeof val.then == 'function') {
          this.async = true;

          val.then(
            function(result) {
              setImmediate(function() {
                  complete(result);
                });
            },
            function(err) {
              setImmediate(function() {
                  fail(err);
                });
            });
        }
      }
      catch (e) {
        this.emit('error', e);
        return; // Bail out, not complete
      }
    }
    else {
      this.emit('skip');
    }

    if (!(runAction && this.async)) {
      this.complete(val);
    }
  };

  this.complete = function (val) {
    jake._invocationChain.splice(jake._invocationChain.indexOf(this),1);

    this._currentPrereqIndex = 0;
    this.taskStatus = Task.runStatuses.DONE;

    // If 'complete' getting called because task has been
    // run already, value will not be passed -- leave in place
    if (typeof val != 'undefined') {
      this.value = val;
    }

    this.emit('complete', this.value);
  };

})();
utils.mixin(Task.prototype, TaskBase);

Task.getBaseNamespacePath = function (fullName) {
  return fullName.split(':').slice(0, -1).join(':');
};

Task.getBaseTaskName = function (fullName) {
  return fullName.split(':').pop();
};

//The task is in one of three states
Task.runStatuses = {UNSTARTED: 'unstarted', DONE: 'done', STARTED: 'started'};

exports.Task = Task;

// Lazy-require
rule = require('../rule');

