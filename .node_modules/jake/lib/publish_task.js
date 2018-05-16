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

var fs = require('fs')
  , path = require('path')
  , exec = require('child_process').exec
  , utils = require('utilities')
  , FileList = require('filelist').FileList;

var PublishTask = function () {
  var args = Array.prototype.slice.call(arguments).filter(function (item) {
        return typeof item != 'undefined';
      })
    , arg
    , opts = {}
    , definition
    , prereqs = []
    , createDef = function (arg) {
        return function () {
          this.packageFiles.include(arg);
        };
      };

  this.name = args.shift();

  // Old API, just name + list of files
  if (args.length == 1 && (Array.isArray(args[0]) || typeof args[0] == 'string')) {
    definition = createDef(args.pop());
  }
  // Current API, name + [prereqs] + [opts] + definition
  else {
    while ((arg = args.pop())) {
      // Definition func
      if (typeof arg == 'function') {
        definition = arg;
      }
      // Prereqs
      else if (Array.isArray(arg) || typeof arg == 'string') {
        prereqs = arg;
      }
      // Opts
      else {
        opts = arg;
      }
    }
  }

  this.prereqs = prereqs;
  this.packageFiles = new FileList();
  this.publishCmd = opts.publishCmd || 'npm publish %filename';
  this.publishMessage = opts.publishMessage || 'BOOM! Published.';
  this.gitCmd = opts.gitCmd || 'git';
  this.versionFiles = opts.versionFiles || ['package.json'];
  this.scheduleDelay = 5000;

  // Override utility funcs for testing
  this._ensureRepoClean = function (stdout) {
    if (stdout.length) {
      fail(new Error('Git repository is not clean.'));
    }
  };
  this._getCurrentBranch = function (stdout) {
    return utils.string.trim(stdout);
  };

  if (typeof definition == 'function') {
    definition.call(this);
  }
  this.define();
};


PublishTask.prototype = new (function () {

  var _currentBranch = null;

  var getPackage = function () {
        var pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(),
            '/package.json')).toString());
        return pkg;
      }
    , getPackageVersionNumber = function () {
        return getPackage().version;
      };

  this.define = function () {
    var self = this;

    namespace('publish', function () {
      task('fetchTags', {async: true}, function () {
        // Make sure local tags are up to date
        var cmds = [
          self.gitCmd + ' fetch --tags'
        ];
        jake.exec(cmds, function () {
          console.log('Fetched remote tags.');
          complete();
        });
      });

      task('getCurrentBranch', {async: true}, function () {
        // Figure out what branch to push to
        exec(self.gitCmd + ' symbolic-ref --short HEAD',
            function (err, stdout, stderr) {
          if (err) {
            fail(err);
          }
          if (stderr) {
            fail(new Error(stderr));
          }
          if (!stdout) {
            fail(new Error('No current Git branch found'));
          }
          _currentBranch = self._getCurrentBranch(stdout);
          console.log('On branch ' + _currentBranch);
          complete();
        });
      });

      task('ensureClean', {async: true}, function () {
        // Only bump, push, and tag if the Git repo is clean
        exec(self.gitCmd + ' status --porcelain --untracked-files=no',
            function (err, stdout, stderr) {
          if (err) {
            fail(err);
          }
          if (stderr) {
            fail(new Error(stderr));
          }

          // Throw if there's output
          self._ensureRepoClean(stdout);

          complete();
        });
      });

      task('updateVersionFiles', function () {
        var pkg
          , version
          , arr
          , patch;

        // Grab the current version-string
        pkg = getPackage();
        version = pkg.version;
        // Increment the patch-number for the version
        arr = version.split('.');
        patch = parseInt(arr.pop(), 10) + 1;
        arr.push(patch);
        version = arr.join('.');

        // Update package.json or other files with the new version-info
        self.versionFiles.forEach(function (file) {
          var p = path.join(process.cwd(), file)
            , data = JSON.parse(fs.readFileSync(p).toString());
          data.version = version;
          fs.writeFileSync(p, JSON.stringify(data, true, 2) + '\n');
        });
        // Return the version string so that listeners for the 'complete' event
        // for this task can use it (e.g., to update other files before pushing
        // to Git)
        return version;
      });

      task('pushVersion', ['ensureClean', 'updateVersionFiles'], {async: true},
          function () {
        var version = getPackageVersionNumber()
          , message = 'Version ' + version
          , cmds = [
              self.gitCmd + ' commit -a -m "' + message + '"'
            , self.gitCmd + ' push origin ' + _currentBranch
            , self.gitCmd + ' tag -a v' + version + ' -m "' + message + '"'
            , self.gitCmd + ' push --tags'
            ];

        var execOpts = {};
        if (process.platform == 'win32') {
          // Windows won't like the quotes in our cmdline
          execOpts.windowsVerbatimArguments = true;
        }

        jake.exec(cmds, function () {
          var version = getPackageVersionNumber();
          console.log('Bumped version number to v' + version + '.');
          complete();
        }, execOpts);

      });

      task('definePackage', function () {
        var version = getPackageVersionNumber()
          , t;
        t = new jake.PackageTask(self.name, 'v' + version, self.prereqs, function () {
          // Replace the PackageTask's FileList with the PublishTask's FileList
          this.packageFiles = self.packageFiles;
          this.needTarGz = true; // Default to tar.gz
          // If any of the need<CompressionFormat> or archive opts are set
          // proxy them to the PackageTask
          for (var p in this) {
            if (p.indexOf('need') === 0 || p.indexOf('archive') === 0) {
              if (typeof self[p] != 'undefined') {
                this[p] = self[p];
              }
            }
          }
        });
      });

      task('package', {async: true}, function () {
        var definePack = jake.Task['publish:definePackage']
          , pack = jake.Task.package
          , version = getPackageVersionNumber();

        // May have already been run
        definePack.reenable(true);
        definePack.addListener('complete', function () {
          pack.addListener('complete', function () {
            console.log('Created package for ' + self.name + ' v' + version);
            complete();
          });
          pack.invoke();
        });
        definePack.invoke();
      });

      task('publish', {async: true}, function () {
        var version = getPackageVersionNumber()
          , filename
          , cmd;

        console.log('Publishing ' + self.name + ' v' + version);

        if (typeof self.createPublishCommand == 'function') {
          cmd = self.createPublishCommand(version);
        }
        else {
          filename = './pkg/' + self.name + '-v' + version + '.tar.gz';
          cmd = self.publishCmd.replace(/%filename/gi, filename);
        }

        if (typeof cmd == 'function') {
          cmd(function (err) {
            if (err) {
              throw err;
            }
            console.log(self.publishMessage);
            complete();
          });
        }
        else {
          // Hackity hack -- NPM publish sometimes returns errror like:
          // Error sending version data\nnpm ERR!
          // Error: forbidden 0.2.4 is modified, should match modified time
          setTimeout(function () {
            jake.exec(cmd, function () {
              console.log(self.publishMessage);
              complete();
            }, {printStdout: true, printStderr: true});
          }, self.scheduleDelay);
        }
      });

      task('cleanup', {async: true}, function () {
        var clobber = jake.Task.clobber;
        clobber.reenable(true);
        clobber.on('complete', function () {
          console.log('Cleaned up package');
          complete();
        });
        clobber.invoke();
      });

    });

    var prefixNs = function (item) {
      return 'publish:' + item;
    };

    // Create aliases in the default namespace
    desc('Create a new version and release.');
    task('publish', self.prereqs.concat(['version', 'release']
        .map(prefixNs)));

    desc('Release the existing version.');
    task('publishExisting', self.prereqs.concat(['release']
        .map(prefixNs)));

    task('version', ['fetchTags', 'getCurrentBranch', 'pushVersion']
        .map(prefixNs));

    task('release', ['package', 'publish', 'cleanup']
        .map(prefixNs));

    // Invoke proactively so there will be a callable 'package' task
    // which can be used apart from 'publish'
    jake.Task['publish:definePackage'].invoke();
  };

})();

jake.PublishTask = PublishTask;
exports.PublishTask = PublishTask;

