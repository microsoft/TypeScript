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


var util = require('util') // Native Node util module
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn
  , EventEmitter = require('events').EventEmitter
  , utils = require('utilities')
  , logger = require('./logger')
  , Exec;

var parseArgs = function (argumentsObj) {
    var args
      , arg
      , cmds
      , callback
      , opts = {
          interactive: false
        , printStdout: false
        , printStderr: false
        , breakOnError: true
        };

    args = Array.prototype.slice.call(argumentsObj);

    cmds = args.shift();
    // Arrayize if passed a single string command
    if (typeof cmds == 'string') {
      cmds = [cmds];
    }
    // Make a copy if it's an actual list
    else {
      cmds = cmds.slice();
    }

    // Get optional callback or opts
    while((arg = args.shift())) {
      if (typeof arg == 'function') {
        callback = arg;
      }
      else if (typeof arg == 'object') {
        utils.mixin(opts, arg);
      }
    }

    // Backward-compat shim
    if (typeof opts.stdout != 'undefined') {
      opts.printStdout = opts.stdout;
      delete opts.stdout;
    }
    if (typeof opts.stderr != 'undefined') {
      opts.printStderr = opts.stderr;
      delete opts.stderr;
    }

    return {
      cmds: cmds
    , opts: opts
    , callback: callback
    };
};

/**
  @name jake
  @namespace jake
*/
utils.mixin(utils, new (function () {
  /**
    @name jake.exec
    @static
    @function
    @description Executes shell-commands asynchronously with an optional
    final callback.
    `
    @param {String[]} cmds The list of shell-commands to execute
    @param {Object} [opts]
      @param {Boolean} [opts.printStdout=false] Print stdout from each command
      @param {Boolean} [opts.printStderr=false] Print stderr from each command
      @param {Boolean} [opts.breakOnError=true] Stop further execution on
      the first error.
      @param {Boolean} [opts.windowsVerbatimArguments=false] Don't translate
      arguments on Windows.
    @param {Function} [callback] Callback to run after executing  the
    commands

    @example
    var cmds = [
          'echo "showing directories"'
        , 'ls -al | grep ^d'
        , 'echo "moving up a directory"'
        , 'cd ../'
        ]
      , callback = function () {
          console.log('Finished running commands.');
        }
    jake.exec(cmds, {stdout: true}, callback);
   */
  this.exec = function (a, b, c) {
    var parsed = parseArgs(arguments)
      , cmds = parsed.cmds
      , opts = parsed.opts
      , callback = parsed.callback;

    var ex = new Exec(cmds, opts, callback);

    ex.addListener('error', function (msg, code) {
      if (opts.breakOnError) {
        fail(msg, code);
      }
    });
    ex.run();

    return ex;
  };

  this.createExec = function (a, b, c) {
    return new Exec(a, b, c);
  };

})());

Exec = function () {
  var parsed = parseArgs(arguments)
    , cmds = parsed.cmds
    , opts = parsed.opts
    , callback = parsed.callback;

  this._cmds = cmds;
  this._callback = callback;
  this._config = opts;
};

util.inherits(Exec, EventEmitter);

utils.mixin(Exec.prototype, new (function () {

  var _run = function () {
        var self = this
          , sh
          , cmd
          , args
          , next = this._cmds.shift()
          , config = this._config
          , errData = ''
          , shStdio
          , handleStdoutData = function (data) {
              self.emit('stdout', data);
            }
          , handleStderrData = function (data) {
              var d = data.toString();
              self.emit('stderr', data);
              // Accumulate the error-data so we can use it as the
              // stack if the process exits with an error
              errData += d;
            };

        // Keep running as long as there are commands in the array
        if (next) {
          var spawnOpts = {};
          this.emit('cmdStart', next);

          // Ganking part of Node's child_process.exec to get cmdline args parsed
          if (process.platform == 'win32') {
            cmd = 'cmd';
            args = ['/c', next];
            if (config.windowsVerbatimArguments) {
              spawnOpts.windowsVerbatimArguments = true;
            }
          }
          else {
            cmd = '/bin/sh';
            args = ['-c', next];
          }

          if (config.interactive) {
            spawnOpts.stdio = 'inherit';
            sh = spawn(cmd, args, spawnOpts);
          }
          else {
            shStdio = [
              process.stdin
            ];
            if (config.printStdout) {
              shStdio.push(process.stdout);
            }
            else {
              shStdio.push('pipe');
            }
            if (config.printStderr) {
              shStdio.push(process.stderr);
            }
            else {
              shStdio.push('pipe');
            }
            spawnOpts.stdio = shStdio;
            sh = spawn(cmd, args, spawnOpts);
            if (!config.printStdout) {
              sh.stdout.addListener('data', handleStdoutData);
            }
            if (!config.printStderr) {
              sh.stderr.addListener('data', handleStderrData);
            }
          }

          // Exit, handle err or run next
          sh.on('exit', function (code) {
            var msg;
            if (code !== 0) {
              msg = errData || 'Process exited with error.';
              msg = utils.string.trim(msg);
              self.emit('error', msg, code);
            }
            if (code === 0 || !config.breakOnError) {
              self.emit('cmdEnd', next);
              setTimeout(function () { _run.call(self); }, 0);
            }
          });

        }
        else {
          self.emit('end');
          if (typeof self._callback == 'function') {
            self._callback();
          }
        }
      };

  this.append = function (cmd) {
    this._cmds.push(cmd);
  };

  this.run = function () {
    _run.call(this);
  };

})());

utils.Exec = Exec;
utils.logger = logger;

module.exports = utils;

