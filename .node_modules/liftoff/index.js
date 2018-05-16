const fs = require('fs');
const util = require('util');
const path = require('path');
const EE = require('events').EventEmitter;

const extend = require('extend');
const resolve = require('resolve');
const flaggedRespawn = require('flagged-respawn');
const isPlainObject = require('is-plain-object');
const mapValues = require('object.map');
const fined = require('fined');

const findCwd = require('./lib/find_cwd');
const findConfig = require('./lib/find_config');
const fileSearch = require('./lib/file_search');
const parseOptions = require('./lib/parse_options');
const silentRequire = require('./lib/silent_require');
const buildConfigName = require('./lib/build_config_name');
const registerLoader = require('./lib/register_loader');
const getNodeFlags = require('./lib/get_node_flags');


function Liftoff (opts) {
  EE.call(this);
  extend(this, parseOptions(opts));
}
util.inherits(Liftoff, EE);

Liftoff.prototype.requireLocal = function (module, basedir) {
  try {
    var result = require(resolve.sync(module, {basedir: basedir}));
    this.emit('require', module, result);
    return result;
  } catch (e) {
    this.emit('requireFail', module, e);
  }
};

Liftoff.prototype.buildEnvironment = function (opts) {
  opts = opts || {};

  // get modules we want to preload
  var preload = opts.require || [];

  // ensure items to preload is an array
  if (!Array.isArray(preload)) {
    preload = [preload];
  }

  // make a copy of search paths that can be mutated for this run
  var searchPaths = this.searchPaths.slice();

  // calculate current cwd
  var cwd = findCwd(opts);

  // if cwd was provided explicitly, only use it for searching config
  if (opts.cwd) {
    searchPaths = [cwd];
  } else {
    // otherwise just search in cwd first
    searchPaths.unshift(cwd);
  }

  // calculate the regex to use for finding the config file
  var configNameSearch = buildConfigName({
    configName: this.configName,
    extensions: Object.keys(this.extensions)
  });

  // calculate configPath
  var configPath = findConfig({
    configNameSearch: configNameSearch,
    searchPaths: searchPaths,
    configPath: opts.configPath
  });

  // if we have a config path, save the directory it resides in.
  var configBase;
  if (configPath) {
    configBase = path.dirname(configPath);
    // if cwd wasn't provided explicitly, it should match configBase
    if (!opts.cwd) {
      cwd = configBase;
    }
    // resolve symlink if needed
    if (fs.lstatSync(configPath).isSymbolicLink()) {
      configPath = fs.realpathSync(configPath);
    }
  }

  // TODO: break this out into lib/
  // locate local module and package next to config or explicitly provided cwd
  var modulePath, modulePackage;
  try {
    var delim = path.delimiter,
        paths = (process.env.NODE_PATH ? process.env.NODE_PATH.split(delim) : []);
    modulePath = resolve.sync(this.moduleName, {basedir: configBase || cwd, paths: paths});
    modulePackage = silentRequire(fileSearch('package.json', [modulePath]));
  } catch (e) {}

  // if we have a configuration but we failed to find a local module, maybe
  // we are developing against ourselves?
  if (!modulePath && configPath) {
    // check the package.json sibling to our config to see if its `name`
    // matches the module we're looking for
    var modulePackagePath = fileSearch('package.json', [configBase]);
    modulePackage = silentRequire(modulePackagePath);
    if (modulePackage && modulePackage.name === this.moduleName) {
      // if it does, our module path is `main` inside package.json
      modulePath = path.join(path.dirname(modulePackagePath), modulePackage.main || 'index.js');
      cwd = configBase;
    } else {
      // clear if we just required a package for some other project
      modulePackage = {};
    }
  }

  // load any modules which were requested to be required
  if (preload.length) {
    // unique results first
    preload.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (dep) {
      this.requireLocal(dep, findCwd(opts));
    }, this);
  }

  var exts = this.extensions;
  var eventEmitter = this;
  registerLoader(eventEmitter, exts, configPath, cwd);

  var configFiles = {};
  if (isPlainObject(this.configFiles)) {
    var notfound = { path: null };
    configFiles = mapValues(this.configFiles, function(prop, name) {
      var defaultObj = { name: name, cwd: cwd, extensions: exts };
      return mapValues(prop, function(pathObj) {
        var found = fined(pathObj, defaultObj) || notfound;
        if (isPlainObject(found.extension)) {
          registerLoader(eventEmitter, found.extension, found.path, cwd);
        }
        return found.path;
      });
    });
  }

  return {
    cwd: cwd,
    require: preload,
    configNameSearch: configNameSearch,
    configPath: configPath,
    configBase: configBase,
    modulePath: modulePath,
    modulePackage: modulePackage || {},
    configFiles: configFiles
  };
};

Liftoff.prototype.handleFlags = function (cb) {
  if (typeof this.v8flags === 'function') {
    this.v8flags(function (err, flags) {
      if (err) {
        cb(err);
      } else {
        cb(null, flags);
      }
    });
  } else {
    process.nextTick(function () {
      cb(null, this.v8flags);
    }.bind(this));
  }
};

Liftoff.prototype.launch = function (opts, fn) {
  if (typeof fn !== 'function') {
    throw new Error('You must provide a callback function.');
  }
  process.title = this.processTitle;

  var completion = opts.completion;
  if (completion && this.completions) {
    return this.completions(completion);
  }

  this.handleFlags(function (err, flags) {
    if (err) {
      throw err;
    }
    flags = flags || [];

    var env = this.buildEnvironment(opts);

    var forcedFlags = getNodeFlags.arrayOrFunction(opts.forcedFlags, env);
    flaggedRespawn(flags, process.argv, forcedFlags, execute.bind(this));

    function execute(ready, child, argv) {
      if (child !== process) {
        var execArgv = getNodeFlags.fromReorderedArgv(argv);
        this.emit('respawn', execArgv, child);
      }
      if (ready) {
        fn.call(this, env, argv);
      }
    }
  }.bind(this));
};



module.exports = Liftoff;
