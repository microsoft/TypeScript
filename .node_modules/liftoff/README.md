<p align="center">
  <a href="http://liftoffjs.com">
    <img height="100" width="297" src="https://cdn.rawgit.com/tkellen/js-liftoff/master/artwork/liftoff.svg"/>
  </a>
</p>

# liftoff [![Build Status](http://img.shields.io/travis/js-cli/js-liftoff.svg?label=travis-ci)](http://travis-ci.org/js-cli/js-liftoff) [![Build status](https://img.shields.io/appveyor/ci/phated/js-liftoff.svg?label=appveyor)](https://ci.appveyor.com/project/phated/js-liftoff)


> Launch your command line tool with ease.

[![NPM](https://nodei.co/npm/liftoff.png)](https://nodei.co/npm/liftoff/)

## What is it?
[See this blog post](http://weblog.bocoup.com/building-command-line-tools-in-node-with-liftoff/), [check out this proof of concept](https://github.com/js-cli/js-hacker), or read on.

Say you're writing a CLI tool.  Let's call it [hacker](https://github.com/js-cli/js-hacker).  You want to configure it using a `Hackerfile`.  This is node, so you install `hacker` locally for each project you use it in.  But, in order to get the `hacker` command in your PATH, you also install it globally.

Now, when you run `hacker`, you want to configure what it does using the `Hackerfile` in your current directory, and you want it to execute using the local installation of your tool.  Also, it'd be nice if the `hacker` command was smart enough to traverse up your folders until it finds a `Hackerfile`&mdash;for those times when you're not in the root directory of your project.  Heck, you might even want to launch `hacker` from a folder outside of your project by manually specifying a working directory.  Liftoff manages this for you.

So, everything is working great.  Now you can find your local `hacker` and `Hackerfile` with ease.  Unfortunately, it turns out you've authored your `Hackerfile` in coffee-script, or some other JS variant.  In order to support *that*, you have to load the compiler for it, and then register the extension for it with node.  Good news, Liftoff can do that, and a whole lot more, too.

## API

### constructor(opts)

Create an instance of Liftoff to invoke your application.

An example utilizing all options:
```js
const Hacker = new Liftoff({
  name: 'hacker',
  processTitle: 'hacker',
  moduleName: 'hacker',
  configName: 'hackerfile',
  extensions: {
    '.js': null,
    '.json': null,
    '.coffee': 'coffee-script/register'
  },
  v8flags: ['--harmony'] // or v8flags: require('v8flags')
});
```

#### opts.name

Sugar for setting `processTitle`, `moduleName`, `configName` automatically.

Type: `String`  
Default: `null`

These are equivalent:
```js
const Hacker = Liftoff({
  processTitle: 'hacker',
  moduleName: 'hacker',
  configName: 'hackerfile'
});
```
```js
const Hacker = Liftoff({name:'hacker'});
```

#### opts.moduleName

Sets which module your application expects to find locally when being run.

Type: `String`  
Default: `null`

#### opts.configName

Sets the name of the configuration file Liftoff will attempt to find.  Case-insensitive.

Type: `String`  
Default: `null`

#### opts.extensions

Set extensions to include when searching for a configuration file.  If an external module is needed to load a given extension (e.g. `.coffee`), the module name should be specified as the value for the key.

Type: `Object`  
Default: `{".js":null,".json":null}`

**Examples:**

In this example Liftoff will look for `myappfile{.js,.json,.coffee}`.  If a config with the extension `.coffee` is found, Liftoff will try to require `coffee-script/require` from the current working directory.
```js
const MyApp = new Liftoff({
  name: 'myapp',
  extensions: {
    '.js': null,
    '.json': null,
    '.coffee': 'coffee-script/register'
  }
});
```

In this example, Liftoff will look for `.myapp{rc}`.
```js
const MyApp = new Liftoff({
  name: 'myapp',
  configName: '.myapp',
  extensions: {
    'rc': null
  }
});
```

In this example, Liftoff will automatically attempt to load the correct module for any javascript variant supported by [interpret](https://github.com/js-cli/js-interpret) (as long as it does not require a register method).

```js
const MyApp = new Liftoff({
  name: 'myapp',
  extensions: require('interpret').jsVariants
});
```
#### opts.v8flags

Any flag specified here will be applied to node, not your program.  Useful for supporting invocations like `myapp --harmony command`, where `--harmony` should be passed to node, not your program. This functionality is implemented using [flagged-respawn](http://github.com/js-cli/js-flagged-respawn). To support all v8flags, see [v8flags](https://github.com/js-cli/js-v8flags).

Type: `Array|Function`  
Default: `null`

If this method is a function, it should take a node-style callback that yields an array of flags.

#### opts.processTitle

Sets what the [process title](http://nodejs.org/api/process.html#process_process_title) will be.

Type: `String`  
Default: `null`

#### opts.completions(type)

A method to handle bash/zsh/whatever completions.

Type: `Function`  
Default: `null`

#### opts.configFiles

An object of configuration files to find. Each property is keyed by the default basename of the file being found, and the value is an object of [path arguments](#path-arguments) keyed by unique names.

__Note:__ This option is useful if, for example, you want to support an `.apprc` file in addition to an `appfile.js`. If you only need a single configuration file, you probably don't need this. In addition to letting you find multiple files, this option allows more fine-grained control over how configuration files are located.

Type: `Object`  
Default: `null`

#### Path arguments

The [`fined`](https://github.com/js-cli/fined) module accepts a string representing the path to search or an object with the following keys:

* `path` __(required)__

  The path to search. Using only a string expands to this property.

  Type: `String`  
  Default: `null`

* `name`

  The basename of the file to find. Extensions are appended during lookup.

  Type: `String`  
  Default: Top-level key in `configFiles`

* `extensions`

  The extensions to append to `name` during lookup. See also: [`opts.extensions`](#optsextensions).

  Type: `String|Array|Object`  
  Default: The value of [`opts.extensions`](#optsextensions)

* `cwd` 

  The base directory of `path` (if relative).

  Type: `String`  
  Default: The value of [`opts.cwd`](#optscwd)

* `findUp`

  Whether the `path` should be traversed up to find the file.

  Type: `Boolean`  
  Default: `false`

**Examples:**

In this example Liftoff will look for the `.hacker.js` file relative to the `cwd` as declared in `configFiles`.
```js
const MyApp = new Liftoff({
  name: 'hacker',
  configFiles: {
    '.hacker': {
      cwd: '.'
    }
  }
});
```

In this example, Liftoff will look for `.hackerrc` in the home directory.
```js
const MyApp = new Liftoff({
  name: 'hacker',
  configFiles: {
    '.hacker': {
      home: {
        path: '~',
        extensions: {
          'rc': null
        }
      }
    }
  }
});
```

In this example, Liftoff will look in the `cwd` and then lookup the tree for the `.hacker.js` file.
```js
const MyApp = new Liftoff({
  name: 'hacker',
  configFiles: {
    '.hacker': {
      up: {
        path: '.',
        findUp: true
      }
    }
  }
});
```

In this example, the `name` is overridden and the key is ignored so Liftoff looks for `.override.js`.
```js
const MyApp = new Liftoff({
  name: 'hacker',
  configFiles: {
    hacker: {
      override: {
        path: '.',
        name: '.override'
      }
    }
  }
});
```

In this example, Liftoff will use the home directory as the `cwd` and looks for `~/.hacker.js`.
```js
const MyApp = new Liftoff({
  name: 'hacker',
  configFiles: {
    '.hacker': {
      home: {
        path: '.',
        cwd: '~'
      }
    }
  }
});
```

## launch(opts, callback(env))
Launches your application with provided options, builds an environment, and invokes your callback, passing the calculated environment as the first argument.

##### Example Configuration w/ Options Parsing:
```js
const Liftoff = require('liftoff');
const MyApp = new Liftoff({name:'myapp'});
const argv = require('minimist')(process.argv.slice(2));
const invoke = function (env) {
  console.log('my environment is:', env);
  console.log('my cli options are:', argv);
  console.log('my liftoff config is:', this);
};
MyApp.launch({
  cwd: argv.cwd,
  configPath: argv.myappfile,
  require: argv.require,
  completion: argv.completion
}, invoke);
```

#### opts.cwd

Change the current working directory for this launch. Relative paths are calculated against `process.cwd()`.

Type: `String`  
Default: `process.cwd()`

**Example Configuration:**
```js
const argv = require('minimist')(process.argv.slice(2));
MyApp.launch({
  cwd: argv.cwd
}, invoke);
```

**Matching CLI Invocation:**
```
myapp --cwd ../
```

#### opts.configPath

Don't search for a config, use the one provided. **Note:** Liftoff will assume the current working directory is the directory containing the config file unless an alternate location is explicitly specified using `cwd`.

Type: `String`  
Default: `null`

**Example Configuration:**
```js
var argv = require('minimist')(process.argv.slice(2));
MyApp.launch({
  configPath: argv.myappfile
}, invoke);
```

**Matching CLI Invocation:**
```
myapp --myappfile /var/www/project/Myappfile.js
```

**Examples using `cwd` and `configPath` together:**

These are functionally identical:
```
myapp --myappfile /var/www/project/Myappfile.js
myapp --cwd /var/www/project
```

These can run myapp from a shared directory as though it were located in another project:
```
myapp --myappfile /Users/name/Myappfile.js --cwd /var/www/project1
myapp --myappfile /Users/name/Myappfile.js --cwd /var/www/project2
```

#### opts.require

A string or array of modules to attempt requiring from the local working directory before invoking the launch callback.

Type: `String|Array`  
Default: `null`

**Example Configuration:**
```js
var argv = require('minimist')(process.argv.slice(2));
MyApp.launch({
  require: argv.require
}, invoke);
```

**Matching CLI Invocation:**
```js
myapp --require coffee-script/register
```

#### opts.forcedFlags

Allows you to force node or V8 flags during the launch. This is useful if you need to make sure certain flags will always be enabled or if you need to enable flags that don't show up in `opts.v8flags` (as these flags aren't validated against `opts.v8flags`).

If this is specified as a function, it will receive the built `env` as its only argument and must return a string or array of flags to force.

Type: `String|Array|Function`  
Default: `null`

**Example Configuration:**
```js
MyApp.launch({
  forcedFlags: ['--trace-deprecation']
}, invoke);
```

**Matching CLI Invocation:**
```js
myapp --trace-deprecation
```

#### callback(env)

A function to start your application.  When invoked, `this` will be your instance of Liftoff. The `env` param will contain the following keys:

- `cwd`: the current working directory
- `require`: an array of modules that liftoff tried to pre-load
- `configNameSearch`: the config files searched for
- `configPath`: the full path to your configuration file (if found)
- `configBase`: the base directory of your configuration file (if found)
- `modulePath`: the full path to the local module your project relies on (if found)
- `modulePackage`: the contents of the local module's package.json (if found)
- `configFiles`: an object of filepaths for each found config file (filepath values will be null if not found)

### events

#### require(name, module)

Emitted when a module is pre-loaded.

```js
var Hacker = new Liftoff({name:'hacker'});
Hacker.on('require', function (name, module) {
  console.log('Requiring external module: '+name+'...');
  // automatically register coffee-script extensions
  if (name === 'coffee-script') {
    module.register();
  }
});
```

#### requireFail(name, err)

Emitted when a requested module cannot be preloaded.

```js
var Hacker = new Liftoff({name:'hacker'});
Hacker.on('requireFail', function (name, err) {
  console.log('Unable to load:', name, err);
});
```

#### respawn(flags, child)

Emitted when Liftoff re-spawns your process (when a [`v8flags`](#optsv8flags) is detected).

```js
var Hacker = new Liftoff({
  name: 'hacker',
  v8flags: ['--harmony']
});
Hacker.on('respawn', function (flags, child) {
  console.log('Detected node flags:', flags);
  console.log('Respawned to PID:', child.pid);
});
```

Event will be triggered for this command:
`hacker --harmony commmand`

## Examples

Check out how [gulp](https://github.com/gulpjs/gulp-cli/blob/master/index.js) uses Liftoff.

For a bare-bones example, try [the hacker project](https://github.com/js-cli/js-hacker/blob/master/bin/hacker.js).

To try the example, do the following:

1. Install the sample project `hacker` with `npm install -g hacker`.
2. Make a `Hackerfile.js` with some arbitrary javascript it.
3. Install hacker next to it with `npm install hacker`.
3. Run `hacker` while in the same parent folder.
