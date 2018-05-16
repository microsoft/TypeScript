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

var path = require('path')
  , fs = require('fs')
  , existsSync = typeof fs.existsSync == 'function' ?
      fs.existsSync : path.existsSync
  , utils = require('utilities')
  , CoffeeScript
  , LiveScript
  , Loader;


Loader = function () {

  var JAKEFILE_PAT = /\.jake(\.js|\.coffee|\.ls)?$/;

  var _requireCoffee = function () {
        try {
          var cs = require('coffee-script');
          // Ensure we support CoffeeScript versions older than 1.7.0
          if (typeof cs.register == 'function') {
            cs.register();
          }
        }
        catch (e) {
          fail('CoffeeScript is missing! Try `npm install coffee-script`');
        }
        return(cs);
      };

  var _requireLiveScript = function () {
    try {
      return require('livescript');
    } catch (e) {}
    try {
      return require('LiveScript');
    } catch (e) {}
    fail('LiveScript is missing! Try `npm install livescript`');
  };

  this.loadFile = function (file) {
    var jakefile = file ?
            file.replace(/\.js$/, '').replace(/\.coffee$/, '').replace(/\.ls/, '') : 'Jakefile'
      , fileSpecified = !!file
      // Dear God, why?
      , isCoffee = false
      , isLiveScript = false
      // Warning, recursive
      , exists
      , oldCwd = process.cwd();

    exists = function () {
      var cwd = process.cwd();
      if (existsSync(jakefile) || existsSync(jakefile + '.js') ||
        existsSync(jakefile + '.coffee') || existsSync(jakefile + '.ls')) {
        return true;
      }
      if (!fileSpecified) {
        process.chdir("..");
        if (cwd === process.cwd()) {
          // Restore the working directory on failure
          process.chdir(oldCwd);
          return false;
        }
        return exists();
      }
    };

    if (!exists()) {
      return false;
    }

    isCoffee = existsSync(jakefile + '.coffee');
    isLiveScript = existsSync(jakefile + '.ls');
    if (isCoffee) {
      CoffeeScript = _requireCoffee();
    }
    if (isLiveScript) {
        LiveScript = _requireLiveScript();
    }
    require(utils.file.absolutize(jakefile));
    return true;
  };

  this.loadDirectory = function (d) {
    var dirname = d || 'jakelib'
      , dirlist;
    dirname = utils.file.absolutize(dirname);
    if (existsSync(dirname)) {
      dirlist = fs.readdirSync(dirname);
      dirlist.forEach(function (filePath) {
        if (JAKEFILE_PAT.test(filePath)) {
          if (/\.coffee$/.test(filePath)) {
            CoffeeScript = _requireCoffee();
          }
          if (/\.ls$/.test(filePath)) {
            LiveScript = _requireLiveScript();
          }
          require(path.join(dirname, filePath));
        }
      });
      return true;
    }

    return false;
  };
};

module.exports.Loader = Loader;
