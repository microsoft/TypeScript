/**
 * @license r.js 2.1.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*
 * This is a bootstrap script to allow running RequireJS in the command line
 * in either a Java/Rhino or Node environment. It is modified by the top-level
 * dist.js file to inject other files to completely enable this file. It is
 * the shell of the r.js file.
 */

/*jslint evil: true, nomen: true, sloppy: true */
/*global readFile: true, process: false, Packages: false, print: false,
console: false, java: false, module: false, requirejsVars, navigator,
document, importScripts, self, location, Components, FileUtils */

var requirejs, require, define, xpcUtil;
(function (console, args, readFileFunc) {
    var fileName, env, fs, vm, path, exec, rhinoContext, dir, nodeRequire,
        nodeDefine, exists, reqMain, loadedOptimizedLib, existsForNode, Cc, Ci,
        version = '2.1.5',
        jsSuffixRegExp = /\.js$/,
        commandOption = '',
        useLibLoaded = {},
        //Used by jslib/rhino/args.js
        rhinoArgs = args,
        //Used by jslib/xpconnect/args.js
        xpconnectArgs = args,
        readFile = typeof readFileFunc !== 'undefined' ? readFileFunc : null;

    function showHelp() {
        console.log('See https://github.com/jrburke/r.js for usage.');
    }

    if ((typeof navigator !== 'undefined' && typeof document !== 'undefined') ||
            (typeof importScripts !== 'undefined' && typeof self !== 'undefined')) {
        env = 'browser';

        readFile = function (path) {
            return fs.readFileSync(path, 'utf8');
        };

        exec = function (string) {
            return eval(string);
        };

        exists = function () {
            console.log('x.js exists not applicable in browser env');
            return false;
        };

    } else if (typeof Packages !== 'undefined') {
        env = 'rhino';

        fileName = args[0];

        if (fileName && fileName.indexOf('-') === 0) {
            commandOption = fileName.substring(1);
            fileName = args[1];
        }

        //Set up execution context.
        rhinoContext = Packages.org.mozilla.javascript.ContextFactory.getGlobal().enterContext();

        exec = function (string, name) {
            return rhinoContext.evaluateString(this, string, name, 0, null);
        };

        exists = function (fileName) {
            return (new java.io.File(fileName)).exists();
        };

        //Define a console.log for easier logging. Don't
        //get fancy though.
        if (typeof console === 'undefined') {
            console = {
                log: function () {
                    print.apply(undefined, arguments);
                }
            };
        }
    } else if (typeof process !== 'undefined') {
        env = 'node';

        //Get the fs module via Node's require before it
        //gets replaced. Used in require/node.js
        fs = require('fs');
        vm = require('vm');
        path = require('path');
        //In Node 0.7+ existsSync is on fs.
        existsForNode = fs.existsSync || path.existsSync;

        nodeRequire = require;
        nodeDefine = define;
        reqMain = require.main;

        //Temporarily hide require and define to allow require.js to define
        //them.
        require = undefined;
        define = undefined;

        readFile = function (path) {
            return fs.readFileSync(path, 'utf8');
        };

        exec = function (string, name) {
            return vm.runInThisContext(this.requirejsVars.require.makeNodeWrapper(string),
                                       name ? fs.realpathSync(name) : '');
        };

        exists = function (fileName) {
            return existsForNode(fileName);
        };


        fileName = process.argv[2];

        if (fileName && fileName.indexOf('-') === 0) {
            commandOption = fileName.substring(1);
            fileName = process.argv[3];
        }
    } else if (typeof Components !== 'undefined' && Components.classes && Components.interfaces) {
        env = 'xpconnect';

        Components.utils['import']('resource://gre/modules/FileUtils.jsm');
        Cc = Components.classes;
        Ci = Components.interfaces;

        fileName = args[0];

        if (fileName && fileName.indexOf('-') === 0) {
            commandOption = fileName.substring(1);
            fileName = args[1];
        }

        xpcUtil = {
            cwd: function () {
                return FileUtils.getFile("CurWorkD", []).path;
            },

            //Remove . and .. from paths, normalize on front slashes
            normalize: function (path) {
                //There has to be an easier way to do this.
                var i, part, ary,
                    firstChar = path.charAt(0);

                if (firstChar !== '/' &&
                        firstChar !== '\\' &&
                        path.indexOf(':') === -1) {
                    //A relative path. Use the current working directory.
                    path = xpcUtil.cwd() + '/' + path;
                }

                ary = path.replace(/\\/g, '/').split('/');

                for (i = 0; i < ary.length; i += 1) {
                    part = ary[i];
                    if (part === '.') {
                        ary.splice(i, 1);
                        i -= 1;
                    } else if (part === '..') {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
                return ary.join('/');
            },

            xpfile: function (path) {
                try {
                    return new FileUtils.File(xpcUtil.normalize(path));
                } catch (e) {
                    throw new Error(path + ' failed: ' + e);
                }
            },

            readFile: function (/*String*/path, /*String?*/encoding) {
                //A file read function that can deal with BOMs
                encoding = encoding || "utf-8";

                var inStream, convertStream,
                    readData = {},
                    fileObj = xpcUtil.xpfile(path);

                //XPCOM, you so crazy
                try {
                    inStream = Cc['@mozilla.org/network/file-input-stream;1']
                               .createInstance(Ci.nsIFileInputStream);
                    inStream.init(fileObj, 1, 0, false);

                    convertStream = Cc['@mozilla.org/intl/converter-input-stream;1']
                                    .createInstance(Ci.nsIConverterInputStream);
                    convertStream.init(inStream, encoding, inStream.available(),
                    Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);

                    convertStream.readString(inStream.available(), readData);
                    return readData.value;
                } catch (e) {
                    throw new Error((fileObj && fileObj.path || '') + ': ' + e);
                } finally {
                    if (convertStream) {
                        convertStream.close();
                    }
                    if (inStream) {
                        inStream.close();
                    }
                }
            }
        };

        readFile = xpcUtil.readFile;

        exec = function (string) {
            return eval(string);
        };

        exists = function (fileName) {
            return xpcUtil.xpfile(fileName).exists();
        };

        //Define a console.log for easier logging. Don't
        //get fancy though.
        if (typeof console === 'undefined') {
            console = {
                log: function () {
                    print.apply(undefined, arguments);
                }
            };
        }
    }

    /** vim: et:ts=4:sw=4:sts=4
 * @license RequireJS 2.1.5 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Not using strict: uneven strict support in browsers, #392, and causes
//problems with requirejs.exec()/transpiler plugins that may not be strict.
/*jslint regexp: true, nomen: true, sloppy: true */
/*global window, navigator, document, importScripts, setTimeout, opera */


(function (global) {
    var req, s, head, baseElement, dataMain, src,
        interactiveScript, currentlyAddingScript, mainScript, subPath,
        version = '2.1.5',
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,
        jsSuffixRegExp = /\.js$/,
        currDirRegExp = /^\.\//,
        op = Object.prototype,
        ostring = op.toString,
        hasOwn = op.hasOwnProperty,
        ap = Array.prototype,
        apsp = ap.splice,
        isBrowser = !!(typeof window !== 'undefined' && navigator && document),
        isWebWorker = !isBrowser && typeof importScripts !== 'undefined',
        //PS3 indicates loaded and complete, but need to wait for complete
        //specifically. Sequence is 'loading', 'loaded', execution,
        // then 'complete'. The UA check is unfortunate, but not sure how
        //to feature test w/o causing perf issues.
        readyRegExp = isBrowser && navigator.platform === 'PLAYSTATION 3' ?
                      /^complete$/ : /^(complete|loaded)$/,
        defContextName = '_',
        //Oh the tragedy, detecting opera. See the usage of isOpera for reason.
        isOpera = typeof opera !== 'undefined' && opera.toString() === '[object Opera]',
        contexts = {},
        cfg = {},
        globalDefQueue = [],
        useInteractive = false;

    function isFunction(it) {
        return ostring.call(it) === '[object Function]';
    }

    function isArray(it) {
        return ostring.call(it) === '[object Array]';
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    /**
     * Helper function for iterating over an array backwards. If the func
     * returns a true value, it will break out of the loop.
     */
    function eachReverse(ary, func) {
        if (ary) {
            var i;
            for (i = ary.length - 1; i > -1; i -= 1) {
                if (ary[i] && func(ary[i], i, ary)) {
                    break;
                }
            }
        }
    }

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function getOwn(obj, prop) {
        return hasProp(obj, prop) && obj[prop];
    }

    /**
     * Cycles over properties in an object and calls a function for each
     * property value. If the function returns a truthy value, then the
     * iteration is stopped.
     */
    function eachProp(obj, func) {
        var prop;
        for (prop in obj) {
            if (hasProp(obj, prop)) {
                if (func(obj[prop], prop)) {
                    break;
                }
            }
        }
    }

    /**
     * Simple function to mix in properties from source into target,
     * but only if target does not already have a property of the same name.
     */
    function mixin(target, source, force, deepStringMixin) {
        if (source) {
            eachProp(source, function (value, prop) {
                if (force || !hasProp(target, prop)) {
                    if (deepStringMixin && typeof value !== 'string') {
                        if (!target[prop]) {
                            target[prop] = {};
                        }
                        mixin(target[prop], value, force, deepStringMixin);
                    } else {
                        target[prop] = value;
                    }
                }
            });
        }
        return target;
    }

    //Similar to Function.prototype.bind, but the 'this' object is specified
    //first, since it is easier to read/figure out what 'this' will be.
    function bind(obj, fn) {
        return function () {
            return fn.apply(obj, arguments);
        };
    }

    function scripts() {
        return document.getElementsByTagName('script');
    }

    //Allow getting a global that expressed in
    //dot notation, like 'a.b.c'.
    function getGlobal(value) {
        if (!value) {
            return value;
        }
        var g = global;
        each(value.split('.'), function (part) {
            g = g[part];
        });
        return g;
    }

    /**
     * Constructs an error with a pointer to an URL with more information.
     * @param {String} id the error ID that maps to an ID on a web page.
     * @param {String} message human readable error.
     * @param {Error} [err] the original error, if there is one.
     *
     * @returns {Error}
     */
    function makeError(id, msg, err, requireModules) {
        var e = new Error(msg + '\nhttp://requirejs.org/docs/errors.html#' + id);
        e.requireType = id;
        e.requireModules = requireModules;
        if (err) {
            e.originalError = err;
        }
        return e;
    }

    if (typeof define !== 'undefined') {
        //If a define is already in play via another AMD loader,
        //do not overwrite.
        return;
    }

    if (typeof requirejs !== 'undefined') {
        if (isFunction(requirejs)) {
            //Do not overwrite and existing requirejs instance.
            return;
        }
        cfg = requirejs;
        requirejs = undefined;
    }

    //Allow for a require config object
    if (typeof require !== 'undefined' && !isFunction(require)) {
        //assume it is a config object.
        cfg = require;
        require = undefined;
    }

    function newContext(contextName) {
        var inCheckLoaded, Module, context, handlers,
            checkLoadedTimeoutId,
            config = {
                //Defaults. Do not set a default for map
                //config to speed up normalize(), which
                //will run faster if there is no default.
                waitSeconds: 7,
                baseUrl: './',
                paths: {},
                pkgs: {},
                shim: {},
                config: {}
            },
            registry = {},
            //registry of just enabled modules, to speed
            //cycle breaking code when lots of modules
            //are registered, but not activated.
            enabledRegistry = {},
            undefEvents = {},
            defQueue = [],
            defined = {},
            urlFetched = {},
            requireCounter = 1,
            unnormalizedCounter = 1;

        /**
         * Trims the . and .. from an array of path segments.
         * It will keep a leading path segment if a .. will become
         * the first path segment, to help with module name lookups,
         * which act like paths, but can be remapped. But the end result,
         * all paths that use this function should look normalized.
         * NOTE: this method MODIFIES the input array.
         * @param {Array} ary the array of path segments.
         */
        function trimDots(ary) {
            var i, part;
            for (i = 0; ary[i]; i += 1) {
                part = ary[i];
                if (part === '.') {
                    ary.splice(i, 1);
                    i -= 1;
                } else if (part === '..') {
                    if (i === 1 && (ary[2] === '..' || ary[0] === '..')) {
                        //End of the line. Keep at least one non-dot
                        //path segment at the front so it can be mapped
                        //correctly to disk. Otherwise, there is likely
                        //no path mapping for a path starting with '..'.
                        //This can still fail, but catches the most reasonable
                        //uses of ..
                        break;
                    } else if (i > 0) {
                        ary.splice(i - 1, 2);
                        i -= 2;
                    }
                }
            }
        }

        /**
         * Given a relative module name, like ./something, normalize it to
         * a real name that can be mapped to a path.
         * @param {String} name the relative name
         * @param {String} baseName a real name that the name arg is relative
         * to.
         * @param {Boolean} applyMap apply the map config to the value. Should
         * only be done if this normalization is for a dependency ID.
         * @returns {String} normalized name
         */
        function normalize(name, baseName, applyMap) {
            var pkgName, pkgConfig, mapValue, nameParts, i, j, nameSegment,
                foundMap, foundI, foundStarMap, starI,
                baseParts = baseName && baseName.split('/'),
                normalizedBaseParts = baseParts,
                map = config.map,
                starMap = map && map['*'];

            //Adjust any relative paths.
            if (name && name.charAt(0) === '.') {
                //If have a base name, try to normalize against it,
                //otherwise, assume it is a top-level require that will
                //be relative to baseUrl in the end.
                if (baseName) {
                    if (getOwn(config.pkgs, baseName)) {
                        //If the baseName is a package name, then just treat it as one
                        //name to concat the name with.
                        normalizedBaseParts = baseParts = [baseName];
                    } else {
                        //Convert baseName to array, and lop off the last part,
                        //so that . matches that 'directory' and not name of the baseName's
                        //module. For instance, baseName of 'one/two/three', maps to
                        //'one/two/three.js', but we want the directory, 'one/two' for
                        //this normalization.
                        normalizedBaseParts = baseParts.slice(0, baseParts.length - 1);
                    }

                    name = normalizedBaseParts.concat(name.split('/'));
                    trimDots(name);

                    //Some use of packages may use a . path to reference the
                    //'main' module name, so normalize for that.
                    pkgConfig = getOwn(config.pkgs, (pkgName = name[0]));
                    name = name.join('/');
                    if (pkgConfig && name === pkgName + '/' + pkgConfig.main) {
                        name = pkgName;
                    }
                } else if (name.indexOf('./') === 0) {
                    // No baseName, so this is ID is resolved relative
                    // to baseUrl, pull off the leading dot.
                    name = name.substring(2);
                }
            }

            //Apply map config if available.
            if (applyMap && map && (baseParts || starMap)) {
                nameParts = name.split('/');

                for (i = nameParts.length; i > 0; i -= 1) {
                    nameSegment = nameParts.slice(0, i).join('/');

                    if (baseParts) {
                        //Find the longest baseName segment match in the config.
                        //So, do joins on the biggest to smallest lengths of baseParts.
                        for (j = baseParts.length; j > 0; j -= 1) {
                            mapValue = getOwn(map, baseParts.slice(0, j).join('/'));

                            //baseName segment has config, find if it has one for
                            //this name.
                            if (mapValue) {
                                mapValue = getOwn(mapValue, nameSegment);
                                if (mapValue) {
                                    //Match, update name to the new value.
                                    foundMap = mapValue;
                                    foundI = i;
                                    break;
                                }
                            }
                        }
                    }

                    if (foundMap) {
                        break;
                    }

                    //Check for a star map match, but just hold on to it,
                    //if there is a shorter segment match later in a matching
                    //config, then favor over this star map.
                    if (!foundStarMap && starMap && getOwn(starMap, nameSegment)) {
                        foundStarMap = getOwn(starMap, nameSegment);
                        starI = i;
                    }
                }

                if (!foundMap && foundStarMap) {
                    foundMap = foundStarMap;
                    foundI = starI;
                }

                if (foundMap) {
                    nameParts.splice(0, foundI, foundMap);
                    name = nameParts.join('/');
                }
            }

            return name;
        }

        function removeScript(name) {
            if (isBrowser) {
                each(scripts(), function (scriptNode) {
                    if (scriptNode.getAttribute('data-requiremodule') === name &&
                            scriptNode.getAttribute('data-requirecontext') === context.contextName) {
                        scriptNode.parentNode.removeChild(scriptNode);
                        return true;
                    }
                });
            }
        }

        function hasPathFallback(id) {
            var pathConfig = getOwn(config.paths, id);
            if (pathConfig && isArray(pathConfig) && pathConfig.length > 1) {
                removeScript(id);
                //Pop off the first array value, since it failed, and
                //retry
                pathConfig.shift();
                context.require.undef(id);
                context.require([id]);
                return true;
            }
        }

        //Turns a plugin!resource to [plugin, resource]
        //with the plugin being undefined if the name
        //did not have a plugin prefix.
        function splitPrefix(name) {
            var prefix,
                index = name ? name.indexOf('!') : -1;
            if (index > -1) {
                prefix = name.substring(0, index);
                name = name.substring(index + 1, name.length);
            }
            return [prefix, name];
        }

        /**
         * Creates a module mapping that includes plugin prefix, module
         * name, and path. If parentModuleMap is provided it will
         * also normalize the name via require.normalize()
         *
         * @param {String} name the module name
         * @param {String} [parentModuleMap] parent module map
         * for the module name, used to resolve relative names.
         * @param {Boolean} isNormalized: is the ID already normalized.
         * This is true if this call is done for a define() module ID.
         * @param {Boolean} applyMap: apply the map config to the ID.
         * Should only be true if this map is for a dependency.
         *
         * @returns {Object}
         */
        function makeModuleMap(name, parentModuleMap, isNormalized, applyMap) {
            var url, pluginModule, suffix, nameParts,
                prefix = null,
                parentName = parentModuleMap ? parentModuleMap.name : null,
                originalName = name,
                isDefine = true,
                normalizedName = '';

            //If no name, then it means it is a require call, generate an
            //internal name.
            if (!name) {
                isDefine = false;
                name = '_@r' + (requireCounter += 1);
            }

            nameParts = splitPrefix(name);
            prefix = nameParts[0];
            name = nameParts[1];

            if (prefix) {
                prefix = normalize(prefix, parentName, applyMap);
                pluginModule = getOwn(defined, prefix);
            }

            //Account for relative paths if there is a base name.
            if (name) {
                if (prefix) {
                    if (pluginModule && pluginModule.normalize) {
                        //Plugin is loaded, use its normalize method.
                        normalizedName = pluginModule.normalize(name, function (name) {
                            return normalize(name, parentName, applyMap);
                        });
                    } else {
                        normalizedName = normalize(name, parentName, applyMap);
                    }
                } else {
                    //A regular module.
                    normalizedName = normalize(name, parentName, applyMap);

                    //Normalized name may be a plugin ID due to map config
                    //application in normalize. The map config values must
                    //already be normalized, so do not need to redo that part.
                    nameParts = splitPrefix(normalizedName);
                    prefix = nameParts[0];
                    normalizedName = nameParts[1];
                    isNormalized = true;

                    url = context.nameToUrl(normalizedName);
                }
            }

            //If the id is a plugin id that cannot be determined if it needs
            //normalization, stamp it with a unique ID so two matching relative
            //ids that may conflict can be separate.
            suffix = prefix && !pluginModule && !isNormalized ?
                     '_unnormalized' + (unnormalizedCounter += 1) :
                     '';

            return {
                prefix: prefix,
                name: normalizedName,
                parentMap: parentModuleMap,
                unnormalized: !!suffix,
                url: url,
                originalName: originalName,
                isDefine: isDefine,
                id: (prefix ?
                        prefix + '!' + normalizedName :
                        normalizedName) + suffix
            };
        }

        function getModule(depMap) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (!mod) {
                mod = registry[id] = new context.Module(depMap);
            }

            return mod;
        }

        function on(depMap, name, fn) {
            var id = depMap.id,
                mod = getOwn(registry, id);

            if (hasProp(defined, id) &&
                    (!mod || mod.defineEmitComplete)) {
                if (name === 'defined') {
                    fn(defined[id]);
                }
            } else {
                getModule(depMap).on(name, fn);
            }
        }

        function onError(err, errback) {
            var ids = err.requireModules,
                notified = false;

            if (errback) {
                errback(err);
            } else {
                each(ids, function (id) {
                    var mod = getOwn(registry, id);
                    if (mod) {
                        //Set error on module, so it skips timeout checks.
                        mod.error = err;
                        if (mod.events.error) {
                            notified = true;
                            mod.emit('error', err);
                        }
                    }
                });

                if (!notified) {
                    req.onError(err);
                }
            }
        }

        /**
         * Internal method to transfer globalQueue items to this context's
         * defQueue.
         */
        function takeGlobalQueue() {
            //Push all the globalDefQueue items into the context's defQueue
            if (globalDefQueue.length) {
                //Array splice in the values since the context code has a
                //local var ref to defQueue, so cannot just reassign the one
                //on context.
                apsp.apply(defQueue,
                           [defQueue.length - 1, 0].concat(globalDefQueue));
                globalDefQueue = [];
            }
        }

        handlers = {
            'require': function (mod) {
                if (mod.require) {
                    return mod.require;
                } else {
                    return (mod.require = context.makeRequire(mod.map));
                }
            },
            'exports': function (mod) {
                mod.usingExports = true;
                if (mod.map.isDefine) {
                    if (mod.exports) {
                        return mod.exports;
                    } else {
                        return (mod.exports = defined[mod.map.id] = {});
                    }
                }
            },
            'module': function (mod) {
                if (mod.module) {
                    return mod.module;
                } else {
                    return (mod.module = {
                        id: mod.map.id,
                        uri: mod.map.url,
                        config: function () {
                            return (config.config && getOwn(config.config, mod.map.id)) || {};
                        },
                        exports: defined[mod.map.id]
                    });
                }
            }
        };

        function cleanRegistry(id) {
            //Clean up machinery used for waiting modules.
            delete registry[id];
            delete enabledRegistry[id];
        }

        function breakCycle(mod, traced, processed) {
            var id = mod.map.id;

            if (mod.error) {
                mod.emit('error', mod.error);
            } else {
                traced[id] = true;
                each(mod.depMaps, function (depMap, i) {
                    var depId = depMap.id,
                        dep = getOwn(registry, depId);

                    //Only force things that have not completed
                    //being defined, so still in the registry,
                    //and only if it has not been matched up
                    //in the module already.
                    if (dep && !mod.depMatched[i] && !processed[depId]) {
                        if (getOwn(traced, depId)) {
                            mod.defineDep(i, defined[depId]);
                            mod.check(); //pass false?
                        } else {
                            breakCycle(dep, traced, processed);
                        }
                    }
                });
                processed[id] = true;
            }
        }

        function checkLoaded() {
            var map, modId, err, usingPathFallback,
                waitInterval = config.waitSeconds * 1000,
                //It is possible to disable the wait interval by using waitSeconds of 0.
                expired = waitInterval && (context.startTime + waitInterval) < new Date().getTime(),
                noLoads = [],
                reqCalls = [],
                stillLoading = false,
                needCycleCheck = true;

            //Do not bother if this call was a result of a cycle break.
            if (inCheckLoaded) {
                return;
            }

            inCheckLoaded = true;

            //Figure out the state of all the modules.
            eachProp(enabledRegistry, function (mod) {
                map = mod.map;
                modId = map.id;

                //Skip things that are not enabled or in error state.
                if (!mod.enabled) {
                    return;
                }

                if (!map.isDefine) {
                    reqCalls.push(mod);
                }

                if (!mod.error) {
                    //If the module should be executed, and it has not
                    //been inited and time is up, remember it.
                    if (!mod.inited && expired) {
                        if (hasPathFallback(modId)) {
                            usingPathFallback = true;
                            stillLoading = true;
                        } else {
                            noLoads.push(modId);
                            removeScript(modId);
                        }
                    } else if (!mod.inited && mod.fetched && map.isDefine) {
                        stillLoading = true;
                        if (!map.prefix) {
                            //No reason to keep looking for unfinished
                            //loading. If the only stillLoading is a
                            //plugin resource though, keep going,
                            //because it may be that a plugin resource
                            //is waiting on a non-plugin cycle.
                            return (needCycleCheck = false);
                        }
                    }
                }
            });

            if (expired && noLoads.length) {
                //If wait time expired, throw error of unloaded modules.
                err = makeError('timeout', 'Load timeout for modules: ' + noLoads, null, noLoads);
                err.contextName = context.contextName;
                return onError(err);
            }

            //Not expired, check for a cycle.
            if (needCycleCheck) {
                each(reqCalls, function (mod) {
                    breakCycle(mod, {}, {});
                });
            }

            //If still waiting on loads, and the waiting load is something
            //other than a plugin resource, or there are still outstanding
            //scripts, then just try back later.
            if ((!expired || usingPathFallback) && stillLoading) {
                //Something is still waiting to load. Wait for it, but only
                //if a timeout is not already in effect.
                if ((isBrowser || isWebWorker) && !checkLoadedTimeoutId) {
                    checkLoadedTimeoutId = setTimeout(function () {
                        checkLoadedTimeoutId = 0;
                        checkLoaded();
                    }, 50);
                }
            }

            inCheckLoaded = false;
        }

        Module = function (map) {
            this.events = getOwn(undefEvents, map.id) || {};
            this.map = map;
            this.shim = getOwn(config.shim, map.id);
            this.depExports = [];
            this.depMaps = [];
            this.depMatched = [];
            this.pluginMaps = {};
            this.depCount = 0;

            /* this.exports this.factory
               this.depMaps = [],
               this.enabled, this.fetched
            */
        };

        Module.prototype = {
            init: function (depMaps, factory, errback, options) {
                options = options || {};

                //Do not do more inits if already done. Can happen if there
                //are multiple define calls for the same module. That is not
                //a normal, common case, but it is also not unexpected.
                if (this.inited) {
                    return;
                }

                this.factory = factory;

                if (errback) {
                    //Register for errors on this module.
                    this.on('error', errback);
                } else if (this.events.error) {
                    //If no errback already, but there are error listeners
                    //on this module, set up an errback to pass to the deps.
                    errback = bind(this, function (err) {
                        this.emit('error', err);
                    });
                }

                //Do a copy of the dependency array, so that
                //source inputs are not modified. For example
                //"shim" deps are passed in here directly, and
                //doing a direct modification of the depMaps array
                //would affect that config.
                this.depMaps = depMaps && depMaps.slice(0);

                this.errback = errback;

                //Indicate this module has be initialized
                this.inited = true;

                this.ignore = options.ignore;

                //Could have option to init this module in enabled mode,
                //or could have been previously marked as enabled. However,
                //the dependencies are not known until init is called. So
                //if enabled previously, now trigger dependencies as enabled.
                if (options.enabled || this.enabled) {
                    //Enable this module and dependencies.
                    //Will call this.check()
                    this.enable();
                } else {
                    this.check();
                }
            },

            defineDep: function (i, depExports) {
                //Because of cycles, defined callback for a given
                //export can be called more than once.
                if (!this.depMatched[i]) {
                    this.depMatched[i] = true;
                    this.depCount -= 1;
                    this.depExports[i] = depExports;
                }
            },

            fetch: function () {
                if (this.fetched) {
                    return;
                }
                this.fetched = true;

                context.startTime = (new Date()).getTime();

                var map = this.map;

                //If the manager is for a plugin managed resource,
                //ask the plugin to load it now.
                if (this.shim) {
                    context.makeRequire(this.map, {
                        enableBuildCallback: true
                    })(this.shim.deps || [], bind(this, function () {
                        return map.prefix ? this.callPlugin() : this.load();
                    }));
                } else {
                    //Regular dependency.
                    return map.prefix ? this.callPlugin() : this.load();
                }
            },

            load: function () {
                var url = this.map.url;

                //Regular dependency.
                if (!urlFetched[url]) {
                    urlFetched[url] = true;
                    context.load(this.map.id, url);
                }
            },

            /**
             * Checks if the module is ready to define itself, and if so,
             * define it.
             */
            check: function () {
                if (!this.enabled || this.enabling) {
                    return;
                }

                var err, cjsModule,
                    id = this.map.id,
                    depExports = this.depExports,
                    exports = this.exports,
                    factory = this.factory;

                if (!this.inited) {
                    this.fetch();
                } else if (this.error) {
                    this.emit('error', this.error);
                } else if (!this.defining) {
                    //The factory could trigger another require call
                    //that would result in checking this module to
                    //define itself again. If already in the process
                    //of doing that, skip this work.
                    this.defining = true;

                    if (this.depCount < 1 && !this.defined) {
                        if (isFunction(factory)) {
                            //If there is an error listener, favor passing
                            //to that instead of throwing an error.
                            if (this.events.error) {
                                try {
                                    exports = context.execCb(id, factory, depExports, exports);
                                } catch (e) {
                                    err = e;
                                }
                            } else {
                                exports = context.execCb(id, factory, depExports, exports);
                            }

                            if (this.map.isDefine) {
                                //If setting exports via 'module' is in play,
                                //favor that over return value and exports. After that,
                                //favor a non-undefined return value over exports use.
                                cjsModule = this.module;
                                if (cjsModule &&
                                        cjsModule.exports !== undefined &&
                                        //Make sure it is not already the exports value
                                        cjsModule.exports !== this.exports) {
                                    exports = cjsModule.exports;
                                } else if (exports === undefined && this.usingExports) {
                                    //exports already set the defined value.
                                    exports = this.exports;
                                }
                            }

                            if (err) {
                                err.requireMap = this.map;
                                err.requireModules = [this.map.id];
                                err.requireType = 'define';
                                return onError((this.error = err));
                            }

                        } else {
                            //Just a literal value
                            exports = factory;
                        }

                        this.exports = exports;

                        if (this.map.isDefine && !this.ignore) {
                            defined[id] = exports;

                            if (req.onResourceLoad) {
                                req.onResourceLoad(context, this.map, this.depMaps);
                            }
                        }

                        //Clean up
                        cleanRegistry(id);

                        this.defined = true;
                    }

                    //Finished the define stage. Allow calling check again
                    //to allow define notifications below in the case of a
                    //cycle.
                    this.defining = false;

                    if (this.defined && !this.defineEmitted) {
                        this.defineEmitted = true;
                        this.emit('defined', this.exports);
                        this.defineEmitComplete = true;
                    }

                }
            },

            callPlugin: function () {
                var map = this.map,
                    id = map.id,
                    //Map already normalized the prefix.
                    pluginMap = makeModuleMap(map.prefix);

                //Mark this as a dependency for this plugin, so it
                //can be traced for cycles.
                this.depMaps.push(pluginMap);

                on(pluginMap, 'defined', bind(this, function (plugin) {
                    var load, normalizedMap, normalizedMod,
                        name = this.map.name,
                        parentName = this.map.parentMap ? this.map.parentMap.name : null,
                        localRequire = context.makeRequire(map.parentMap, {
                            enableBuildCallback: true
                        });

                    //If current map is not normalized, wait for that
                    //normalized name to load instead of continuing.
                    if (this.map.unnormalized) {
                        //Normalize the ID if the plugin allows it.
                        if (plugin.normalize) {
                            name = plugin.normalize(name, function (name) {
                                return normalize(name, parentName, true);
                            }) || '';
                        }

                        //prefix and name should already be normalized, no need
                        //for applying map config again either.
                        normalizedMap = makeModuleMap(map.prefix + '!' + name,
                                                      this.map.parentMap);
                        on(normalizedMap,
                            'defined', bind(this, function (value) {
                                this.init([], function () { return value; }, null, {
                                    enabled: true,
                                    ignore: true
                                });
                            }));

                        normalizedMod = getOwn(registry, normalizedMap.id);
                        if (normalizedMod) {
                            //Mark this as a dependency for this plugin, so it
                            //can be traced for cycles.
                            this.depMaps.push(normalizedMap);

                            if (this.events.error) {
                                normalizedMod.on('error', bind(this, function (err) {
                                    this.emit('error', err);
                                }));
                            }
                            normalizedMod.enable();
                        }

                        return;
                    }

                    load = bind(this, function (value) {
                        this.init([], function () { return value; }, null, {
                            enabled: true
                        });
                    });

                    load.error = bind(this, function (err) {
                        this.inited = true;
                        this.error = err;
                        err.requireModules = [id];

                        //Remove temp unnormalized modules for this module,
                        //since they will never be resolved otherwise now.
                        eachProp(registry, function (mod) {
                            if (mod.map.id.indexOf(id + '_unnormalized') === 0) {
                                cleanRegistry(mod.map.id);
                            }
                        });

                        onError(err);
                    });

                    //Allow plugins to load other code without having to know the
                    //context or how to 'complete' the load.
                    load.fromText = bind(this, function (text, textAlt) {
                        /*jslint evil: true */
                        var moduleName = map.name,
                            moduleMap = makeModuleMap(moduleName),
                            hasInteractive = useInteractive;

                        //As of 2.1.0, support just passing the text, to reinforce
                        //fromText only being called once per resource. Still
                        //support old style of passing moduleName but discard
                        //that moduleName in favor of the internal ref.
                        if (textAlt) {
                            text = textAlt;
                        }

                        //Turn off interactive script matching for IE for any define
                        //calls in the text, then turn it back on at the end.
                        if (hasInteractive) {
                            useInteractive = false;
                        }

                        //Prime the system by creating a module instance for
                        //it.
                        getModule(moduleMap);

                        //Transfer any config to this other module.
                        if (hasProp(config.config, id)) {
                            config.config[moduleName] = config.config[id];
                        }

                        try {
                            req.exec(text);
                        } catch (e) {
                            return onError(makeError('fromtexteval',
                                             'fromText eval for ' + id +
                                            ' failed: ' + e,
                                             e,
                                             [id]));
                        }

                        if (hasInteractive) {
                            useInteractive = true;
                        }

                        //Mark this as a dependency for the plugin
                        //resource
                        this.depMaps.push(moduleMap);

                        //Support anonymous modules.
                        context.completeLoad(moduleName);

                        //Bind the value of that module to the value for this
                        //resource ID.
                        localRequire([moduleName], load);
                    });

                    //Use parentName here since the plugin's name is not reliable,
                    //could be some weird string with no path that actually wants to
                    //reference the parentName's path.
                    plugin.load(map.name, localRequire, load, config);
                }));

                context.enable(pluginMap, this);
                this.pluginMaps[pluginMap.id] = pluginMap;
            },

            enable: function () {
                enabledRegistry[this.map.id] = this;
                this.enabled = true;

                //Set flag mentioning that the module is enabling,
                //so that immediate calls to the defined callbacks
                //for dependencies do not trigger inadvertent load
                //with the depCount still being zero.
                this.enabling = true;

                //Enable each dependency
                each(this.depMaps, bind(this, function (depMap, i) {
                    var id, mod, handler;

                    if (typeof depMap === 'string') {
                        //Dependency needs to be converted to a depMap
                        //and wired up to this module.
                        depMap = makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap),
                                               false,
                                               !this.skipMap);
                        this.depMaps[i] = depMap;

                        handler = getOwn(handlers, depMap.id);

                        if (handler) {
                            this.depExports[i] = handler(this);
                            return;
                        }

                        this.depCount += 1;

                        on(depMap, 'defined', bind(this, function (depExports) {
                            this.defineDep(i, depExports);
                            this.check();
                        }));

                        if (this.errback) {
                            on(depMap, 'error', this.errback);
                        }
                    }

                    id = depMap.id;
                    mod = registry[id];

                    //Skip special modules like 'require', 'exports', 'module'
                    //Also, don't call enable if it is already enabled,
                    //important in circular dependency cases.
                    if (!hasProp(handlers, id) && mod && !mod.enabled) {
                        context.enable(depMap, this);
                    }
                }));

                //Enable each plugin that is used in
                //a dependency
                eachProp(this.pluginMaps, bind(this, function (pluginMap) {
                    var mod = getOwn(registry, pluginMap.id);
                    if (mod && !mod.enabled) {
                        context.enable(pluginMap, this);
                    }
                }));

                this.enabling = false;

                this.check();
            },

            on: function (name, cb) {
                var cbs = this.events[name];
                if (!cbs) {
                    cbs = this.events[name] = [];
                }
                cbs.push(cb);
            },

            emit: function (name, evt) {
                each(this.events[name], function (cb) {
                    cb(evt);
                });
                if (name === 'error') {
                    //Now that the error handler was triggered, remove
                    //the listeners, since this broken Module instance
                    //can stay around for a while in the registry.
                    delete this.events[name];
                }
            }
        };

        function callGetModule(args) {
            //Skip modules already defined.
            if (!hasProp(defined, args[0])) {
                getModule(makeModuleMap(args[0], null, true)).init(args[1], args[2]);
            }
        }

        function removeListener(node, func, name, ieName) {
            //Favor detachEvent because of IE9
            //issue, see attachEvent/addEventListener comment elsewhere
            //in this file.
            if (node.detachEvent && !isOpera) {
                //Probably IE. If not it will throw an error, which will be
                //useful to know.
                if (ieName) {
                    node.detachEvent(ieName, func);
                }
            } else {
                node.removeEventListener(name, func, false);
            }
        }

        /**
         * Given an event from a script node, get the requirejs info from it,
         * and then removes the event listeners on the node.
         * @param {Event} evt
         * @returns {Object}
         */
        function getScriptData(evt) {
            //Using currentTarget instead of target for Firefox 2.0's sake. Not
            //all old browsers will be supported, but this one was easy enough
            //to support and still makes sense.
            var node = evt.currentTarget || evt.srcElement;

            //Remove the listeners once here.
            removeListener(node, context.onScriptLoad, 'load', 'onreadystatechange');
            removeListener(node, context.onScriptError, 'error');

            return {
                node: node,
                id: node && node.getAttribute('data-requiremodule')
            };
        }

        function intakeDefines() {
            var args;

            //Any defined modules in the global queue, intake them now.
            takeGlobalQueue();

            //Make sure any remaining defQueue items get properly processed.
            while (defQueue.length) {
                args = defQueue.shift();
                if (args[0] === null) {
                    return onError(makeError('mismatch', 'Mismatched anonymous define() module: ' + args[args.length - 1]));
                } else {
                    //args are id, deps, factory. Should be normalized by the
                    //define() function.
                    callGetModule(args);
                }
            }
        }

        context = {
            config: config,
            contextName: contextName,
            registry: registry,
            defined: defined,
            urlFetched: urlFetched,
            defQueue: defQueue,
            Module: Module,
            makeModuleMap: makeModuleMap,
            nextTick: req.nextTick,
            onError: onError,

            /**
             * Set a configuration for the context.
             * @param {Object} cfg config object to integrate.
             */
            configure: function (cfg) {
                //Make sure the baseUrl ends in a slash.
                if (cfg.baseUrl) {
                    if (cfg.baseUrl.charAt(cfg.baseUrl.length - 1) !== '/') {
                        cfg.baseUrl += '/';
                    }
                }

                //Save off the paths and packages since they require special processing,
                //they are additive.
                var pkgs = config.pkgs,
                    shim = config.shim,
                    objs = {
                        paths: true,
                        config: true,
                        map: true
                    };

                eachProp(cfg, function (value, prop) {
                    if (objs[prop]) {
                        if (prop === 'map') {
                            if (!config.map) {
                                config.map = {};
                            }
                            mixin(config[prop], value, true, true);
                        } else {
                            mixin(config[prop], value, true);
                        }
                    } else {
                        config[prop] = value;
                    }
                });

                //Merge shim
                if (cfg.shim) {
                    eachProp(cfg.shim, function (value, id) {
                        //Normalize the structure
                        if (isArray(value)) {
                            value = {
                                deps: value
                            };
                        }
                        if ((value.exports || value.init) && !value.exportsFn) {
                            value.exportsFn = context.makeShimExports(value);
                        }
                        shim[id] = value;
                    });
                    config.shim = shim;
                }

                //Adjust packages if necessary.
                if (cfg.packages) {
                    each(cfg.packages, function (pkgObj) {
                        var location;

                        pkgObj = typeof pkgObj === 'string' ? { name: pkgObj } : pkgObj;
                        location = pkgObj.location;

                        //Create a brand new object on pkgs, since currentPackages can
                        //be passed in again, and config.pkgs is the internal transformed
                        //state for all package configs.
                        pkgs[pkgObj.name] = {
                            name: pkgObj.name,
                            location: location || pkgObj.name,
                            //Remove leading dot in main, so main paths are normalized,
                            //and remove any trailing .js, since different package
                            //envs have different conventions: some use a module name,
                            //some use a file name.
                            main: (pkgObj.main || 'main')
                                  .replace(currDirRegExp, '')
                                  .replace(jsSuffixRegExp, '')
                        };
                    });

                    //Done with modifications, assing packages back to context config
                    config.pkgs = pkgs;
                }

                //If there are any "waiting to execute" modules in the registry,
                //update the maps for them, since their info, like URLs to load,
                //may have changed.
                eachProp(registry, function (mod, id) {
                    //If module already has init called, since it is too
                    //late to modify them, and ignore unnormalized ones
                    //since they are transient.
                    if (!mod.inited && !mod.map.unnormalized) {
                        mod.map = makeModuleMap(id);
                    }
                });

                //If a deps array or a config callback is specified, then call
                //require with those args. This is useful when require is defined as a
                //config object before require.js is loaded.
                if (cfg.deps || cfg.callback) {
                    context.require(cfg.deps || [], cfg.callback);
                }
            },

            makeShimExports: function (value) {
                function fn() {
                    var ret;
                    if (value.init) {
                        ret = value.init.apply(global, arguments);
                    }
                    return ret || (value.exports && getGlobal(value.exports));
                }
                return fn;
            },

            makeRequire: function (relMap, options) {
                options = options || {};

                function localRequire(deps, callback, errback) {
                    var id, map, requireMod;

                    if (options.enableBuildCallback && callback && isFunction(callback)) {
                        callback.__requireJsBuild = true;
                    }

                    if (typeof deps === 'string') {
                        if (isFunction(callback)) {
                            //Invalid call
                            return onError(makeError('requireargs', 'Invalid require call'), errback);
                        }

                        //If require|exports|module are requested, get the
                        //value for them from the special handlers. Caveat:
                        //this only works while module is being defined.
                        if (relMap && hasProp(handlers, deps)) {
                            return handlers[deps](registry[relMap.id]);
                        }

                        //Synchronous access to one module. If require.get is
                        //available (as in the Node adapter), prefer that.
                        if (req.get) {
                            return req.get(context, deps, relMap, localRequire);
                        }

                        //Normalize module name, if it contains . or ..
                        map = makeModuleMap(deps, relMap, false, true);
                        id = map.id;

                        if (!hasProp(defined, id)) {
                            return onError(makeError('notloaded', 'Module name "' +
                                        id +
                                        '" has not been loaded yet for context: ' +
                                        contextName +
                                        (relMap ? '' : '. Use require([])')));
                        }
                        return defined[id];
                    }

                    //Grab defines waiting in the global queue.
                    intakeDefines();

                    //Mark all the dependencies as needing to be loaded.
                    context.nextTick(function () {
                        //Some defines could have been added since the
                        //require call, collect them.
                        intakeDefines();

                        requireMod = getModule(makeModuleMap(null, relMap));

                        //Store if map config should be applied to this require
                        //call for dependencies.
                        requireMod.skipMap = options.skipMap;

                        requireMod.init(deps, callback, errback, {
                            enabled: true
                        });

                        checkLoaded();
                    });

                    return localRequire;
                }

                mixin(localRequire, {
                    isBrowser: isBrowser,

                    /**
                     * Converts a module name + .extension into an URL path.
                     * *Requires* the use of a module name. It does not support using
                     * plain URLs like nameToUrl.
                     */
                    toUrl: function (moduleNamePlusExt) {
                        var ext,
                            index = moduleNamePlusExt.lastIndexOf('.'),
                            segment = moduleNamePlusExt.split('/')[0],
                            isRelative = segment === '.' || segment === '..';

                        //Have a file extension alias, and it is not the
                        //dots from a relative path.
                        if (index !== -1 && (!isRelative || index > 1)) {
                            ext = moduleNamePlusExt.substring(index, moduleNamePlusExt.length);
                            moduleNamePlusExt = moduleNamePlusExt.substring(0, index);
                        }

                        return context.nameToUrl(normalize(moduleNamePlusExt,
                                                relMap && relMap.id, true), ext,  true);
                    },

                    defined: function (id) {
                        return hasProp(defined, makeModuleMap(id, relMap, false, true).id);
                    },

                    specified: function (id) {
                        id = makeModuleMap(id, relMap, false, true).id;
                        return hasProp(defined, id) || hasProp(registry, id);
                    }
                });

                //Only allow undef on top level require calls
                if (!relMap) {
                    localRequire.undef = function (id) {
                        //Bind any waiting define() calls to this context,
                        //fix for #408
                        takeGlobalQueue();

                        var map = makeModuleMap(id, relMap, true),
                            mod = getOwn(registry, id);

                        delete defined[id];
                        delete urlFetched[map.url];
                        delete undefEvents[id];

                        if (mod) {
                            //Hold on to listeners in case the
                            //module will be attempted to be reloaded
                            //using a different config.
                            if (mod.events.defined) {
                                undefEvents[id] = mod.events;
                            }

                            cleanRegistry(id);
                        }
                    };
                }

                return localRequire;
            },

            /**
             * Called to enable a module if it is still in the registry
             * awaiting enablement. A second arg, parent, the parent module,
             * is passed in for context, when this method is overriden by
             * the optimizer. Not shown here to keep code compact.
             */
            enable: function (depMap) {
                var mod = getOwn(registry, depMap.id);
                if (mod) {
                    getModule(depMap).enable();
                }
            },

            /**
             * Internal method used by environment adapters to complete a load event.
             * A load event could be a script load or just a load pass from a synchronous
             * load call.
             * @param {String} moduleName the name of the module to potentially complete.
             */
            completeLoad: function (moduleName) {
                var found, args, mod,
                    shim = getOwn(config.shim, moduleName) || {},
                    shExports = shim.exports;

                takeGlobalQueue();

                while (defQueue.length) {
                    args = defQueue.shift();
                    if (args[0] === null) {
                        args[0] = moduleName;
                        //If already found an anonymous module and bound it
                        //to this name, then this is some other anon module
                        //waiting for its completeLoad to fire.
                        if (found) {
                            break;
                        }
                        found = true;
                    } else if (args[0] === moduleName) {
                        //Found matching define call for this script!
                        found = true;
                    }

                    callGetModule(args);
                }

                //Do this after the cycle of callGetModule in case the result
                //of those calls/init calls changes the registry.
                mod = getOwn(registry, moduleName);

                if (!found && !hasProp(defined, moduleName) && mod && !mod.inited) {
                    if (config.enforceDefine && (!shExports || !getGlobal(shExports))) {
                        if (hasPathFallback(moduleName)) {
                            return;
                        } else {
                            return onError(makeError('nodefine',
                                             'No define call for ' + moduleName,
                                             null,
                                             [moduleName]));
                        }
                    } else {
                        //A script that does not call define(), so just simulate
                        //the call for it.
                        callGetModule([moduleName, (shim.deps || []), shim.exportsFn]);
                    }
                }

                checkLoaded();
            },

            /**
             * Converts a module name to a file path. Supports cases where
             * moduleName may actually be just an URL.
             * Note that it **does not** call normalize on the moduleName,
             * it is assumed to have already been normalized. This is an
             * internal API, not a public one. Use toUrl for the public API.
             */
            nameToUrl: function (moduleName, ext, skipExt) {
                var paths, pkgs, pkg, pkgPath, syms, i, parentModule, url,
                    parentPath;

                //If a colon is in the URL, it indicates a protocol is used and it is just
                //an URL to a file, or if it starts with a slash, contains a query arg (i.e. ?)
                //or ends with .js, then assume the user meant to use an url and not a module id.
                //The slash is important for protocol-less URLs as well as full paths.
                if (req.jsExtRegExp.test(moduleName)) {
                    //Just a plain path, not module name lookup, so just return it.
                    //Add extension if it is included. This is a bit wonky, only non-.js things pass
                    //an extension, this method probably needs to be reworked.
                    url = moduleName + (ext || '');
                } else {
                    //A module that needs to be converted to a path.
                    paths = config.paths;
                    pkgs = config.pkgs;

                    syms = moduleName.split('/');
                    //For each module name segment, see if there is a path
                    //registered for it. Start with most specific name
                    //and work up from it.
                    for (i = syms.length; i > 0; i -= 1) {
                        parentModule = syms.slice(0, i).join('/');
                        pkg = getOwn(pkgs, parentModule);
                        parentPath = getOwn(paths, parentModule);
                        if (parentPath) {
                            //If an array, it means there are a few choices,
                            //Choose the one that is desired
                            if (isArray(parentPath)) {
                                parentPath = parentPath[0];
                            }
                            syms.splice(0, i, parentPath);
                            break;
                        } else if (pkg) {
                            //If module name is just the package name, then looking
                            //for the main module.
                            if (moduleName === pkg.name) {
                                pkgPath = pkg.location + '/' + pkg.main;
                            } else {
                                pkgPath = pkg.location;
                            }
                            syms.splice(0, i, pkgPath);
                            break;
                        }
                    }

                    //Join the path parts together, then figure out if baseUrl is needed.
                    url = syms.join('/');
                    url += (ext || (/\?/.test(url) || skipExt ? '' : '.js'));
                    url = (url.charAt(0) === '/' || url.match(/^[\w\+\.\-]+:/) ? '' : config.baseUrl) + url;
                }

                return config.urlArgs ? url +
                                        ((url.indexOf('?') === -1 ? '?' : '&') +
                                         config.urlArgs) : url;
            },

            //Delegates to req.load. Broken out as a separate function to
            //allow overriding in the optimizer.
            load: function (id, url) {
                req.load(context, id, url);
            },

            /**
             * Executes a module callack function. Broken out as a separate function
             * solely to allow the build system to sequence the files in the built
             * layer in the right sequence.
             *
             * @private
             */
            execCb: function (name, callback, args, exports) {
                return callback.apply(exports, args);
            },

            /**
             * callback for script loads, used to check status of loading.
             *
             * @param {Event} evt the event from the browser for the script
             * that was loaded.
             */
            onScriptLoad: function (evt) {
                //Using currentTarget instead of target for Firefox 2.0's sake. Not
                //all old browsers will be supported, but this one was easy enough
                //to support and still makes sense.
                if (evt.type === 'load' ||
                        (readyRegExp.test((evt.currentTarget || evt.srcElement).readyState))) {
                    //Reset interactive script so a script node is not held onto for
                    //to long.
                    interactiveScript = null;

                    //Pull out the name of the module and the context.
                    var data = getScriptData(evt);
                    context.completeLoad(data.id);
                }
            },

            /**
             * Callback for script errors.
             */
            onScriptError: function (evt) {
                var data = getScriptData(evt);
                if (!hasPathFallback(data.id)) {
                    return onError(makeError('scripterror', 'Script error', evt, [data.id]));
                }
            }
        };

        context.require = context.makeRequire();
        return context;
    }

    /**
     * Main entry point.
     *
     * If the only argument to require is a string, then the module that
     * is represented by that string is fetched for the appropriate context.
     *
     * If the first argument is an array, then it will be treated as an array
     * of dependency string names to fetch. An optional function callback can
     * be specified to execute when all of those dependencies are available.
     *
     * Make a local req variable to help Caja compliance (it assumes things
     * on a require that are not standardized), and to give a short
     * name for minification/local scope use.
     */
    req = requirejs = function (deps, callback, errback, optional) {

        //Find the right context, use default
        var context, config,
            contextName = defContextName;

        // Determine if have config object in the call.
        if (!isArray(deps) && typeof deps !== 'string') {
            // deps is a config object
            config = deps;
            if (isArray(callback)) {
                // Adjust args if there are dependencies
                deps = callback;
                callback = errback;
                errback = optional;
            } else {
                deps = [];
            }
        }

        if (config && config.context) {
            contextName = config.context;
        }

        context = getOwn(contexts, contextName);
        if (!context) {
            context = contexts[contextName] = req.s.newContext(contextName);
        }

        if (config) {
            context.configure(config);
        }

        return context.require(deps, callback, errback);
    };

    /**
     * Support require.config() to make it easier to cooperate with other
     * AMD loaders on globally agreed names.
     */
    req.config = function (config) {
        return req(config);
    };

    /**
     * Execute something after the current tick
     * of the event loop. Override for other envs
     * that have a better solution than setTimeout.
     * @param  {Function} fn function to execute later.
     */
    req.nextTick = typeof setTimeout !== 'undefined' ? function (fn) {
        setTimeout(fn, 4);
    } : function (fn) { fn(); };

    /**
     * Export require as a global, but only if it does not already exist.
     */
    if (!require) {
        require = req;
    }

    req.version = version;

    //Used to filter out dependencies that are already paths.
    req.jsExtRegExp = /^\/|:|\?|\.js$/;
    req.isBrowser = isBrowser;
    s = req.s = {
        contexts: contexts,
        newContext: newContext
    };

    //Create default context.
    req({});

    //Exports some context-sensitive methods on global require.
    each([
        'toUrl',
        'undef',
        'defined',
        'specified'
    ], function (prop) {
        //Reference from contexts instead of early binding to default context,
        //so that during builds, the latest instance of the default context
        //with its config gets used.
        req[prop] = function () {
            var ctx = contexts[defContextName];
            return ctx.require[prop].apply(ctx, arguments);
        };
    });

    if (isBrowser) {
        head = s.head = document.getElementsByTagName('head')[0];
        //If BASE tag is in play, using appendChild is a problem for IE6.
        //When that browser dies, this can be removed. Details in this jQuery bug:
        //http://dev.jquery.com/ticket/2709
        baseElement = document.getElementsByTagName('base')[0];
        if (baseElement) {
            head = s.head = baseElement.parentNode;
        }
    }

    /**
     * Any errors that require explicitly generates will be passed to this
     * function. Intercept/override it if you want custom error handling.
     * @param {Error} err the error object.
     */
    req.onError = function (err) {
        throw err;
    };

    /**
     * Does the request to load a module for the browser case.
     * Make this a separate function to allow other environments
     * to override it.
     *
     * @param {Object} context the require context to find state.
     * @param {String} moduleName the name of the module.
     * @param {Object} url the URL to the module.
     */
    req.load = function (context, moduleName, url) {
        var config = (context && context.config) || {},
            node;
        if (isBrowser) {
            //In the browser so use a script tag
            node = config.xhtml ?
                    document.createElementNS('http://www.w3.org/1999/xhtml', 'html:script') :
                    document.createElement('script');
            node.type = config.scriptType || 'text/javascript';
            node.charset = 'utf-8';
            node.async = true;

            node.setAttribute('data-requirecontext', context.contextName);
            node.setAttribute('data-requiremodule', moduleName);

            //Set up load listener. Test attachEvent first because IE9 has
            //a subtle issue in its addEventListener and script onload firings
            //that do not match the behavior of all other browsers with
            //addEventListener support, which fire the onload event for a
            //script right after the script execution. See:
            //https://connect.microsoft.com/IE/feedback/details/648057/script-onload-event-is-not-fired-immediately-after-script-execution
            //UNFORTUNATELY Opera implements attachEvent but does not follow the script
            //script execution mode.
            if (node.attachEvent &&
                    //Check if node.attachEvent is artificially added by custom script or
                    //natively supported by browser
                    //read https://github.com/jrburke/requirejs/issues/187
                    //if we can NOT find [native code] then it must NOT natively supported.
                    //in IE8, node.attachEvent does not have toString()
                    //Note the test for "[native code" with no closing brace, see:
                    //https://github.com/jrburke/requirejs/issues/273
                    !(node.attachEvent.toString && node.attachEvent.toString().indexOf('[native code') < 0) &&
                    !isOpera) {
                //Probably IE. IE (at least 6-8) do not fire
                //script onload right after executing the script, so
                //we cannot tie the anonymous define call to a name.
                //However, IE reports the script as being in 'interactive'
                //readyState at the time of the define call.
                useInteractive = true;

                node.attachEvent('onreadystatechange', context.onScriptLoad);
                //It would be great to add an error handler here to catch
                //404s in IE9+. However, onreadystatechange will fire before
                //the error handler, so that does not help. If addEventListener
                //is used, then IE will fire error before load, but we cannot
                //use that pathway given the connect.microsoft.com issue
                //mentioned above about not doing the 'script execute,
                //then fire the script load event listener before execute
                //next script' that other browsers do.
                //Best hope: IE10 fixes the issues,
                //and then destroys all installs of IE 6-9.
                //node.attachEvent('onerror', context.onScriptError);
            } else {
                node.addEventListener('load', context.onScriptLoad, false);
                node.addEventListener('error', context.onScriptError, false);
            }
            node.src = url;

            //For some cache cases in IE 6-8, the script executes before the end
            //of the appendChild execution, so to tie an anonymous define
            //call to the module name (which is stored on the node), hold on
            //to a reference to this node, but clear after the DOM insertion.
            currentlyAddingScript = node;
            if (baseElement) {
                head.insertBefore(node, baseElement);
            } else {
                head.appendChild(node);
            }
            currentlyAddingScript = null;

            return node;
        } else if (isWebWorker) {
            try {
                //In a web worker, use importScripts. This is not a very
                //efficient use of importScripts, importScripts will block until
                //its script is downloaded and evaluated. However, if web workers
                //are in play, the expectation that a build has been done so that
                //only one script needs to be loaded anyway. This may need to be
                //reevaluated if other use cases become common.
                importScripts(url);

                //Account for anonymous modules
                context.completeLoad(moduleName);
            } catch (e) {
                context.onError(makeError('importscripts',
                                'importScripts failed for ' +
                                    moduleName + ' at ' + url,
                                e,
                                [moduleName]));
            }
        }
    };

    function getInteractiveScript() {
        if (interactiveScript && interactiveScript.readyState === 'interactive') {
            return interactiveScript;
        }

        eachReverse(scripts(), function (script) {
            if (script.readyState === 'interactive') {
                return (interactiveScript = script);
            }
        });
        return interactiveScript;
    }

    //Look for a data-main script attribute, which could also adjust the baseUrl.
    if (isBrowser) {
        //Figure out baseUrl. Get it from the script tag with require.js in it.
        eachReverse(scripts(), function (script) {
            //Set the 'head' where we can append children by
            //using the script's parent.
            if (!head) {
                head = script.parentNode;
            }

            //Look for a data-main attribute to set main script for the page
            //to load. If it is there, the path to data main becomes the
            //baseUrl, if it is not already set.
            dataMain = script.getAttribute('data-main');
            if (dataMain) {
                //Set final baseUrl if there is not already an explicit one.
                if (!cfg.baseUrl) {
                    //Pull off the directory of data-main for use as the
                    //baseUrl.
                    src = dataMain.split('/');
                    mainScript = src.pop();
                    subPath = src.length ? src.join('/')  + '/' : './';

                    cfg.baseUrl = subPath;
                    dataMain = mainScript;
                }

                //Strip off any trailing .js since dataMain is now
                //like a module name.
                dataMain = dataMain.replace(jsSuffixRegExp, '');

                //Put the data-main script in the files to load.
                cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [dataMain];

                return true;
            }
        });
    }

    /**
     * The function that handles definitions of modules. Differs from
     * require() in that a string for the module should be the first argument,
     * and the function to execute after dependencies are loaded should
     * return a value to define the module corresponding to the first argument's
     * name.
     */
    define = function (name, deps, callback) {
        var node, context;

        //Allow for anonymous modules
        if (typeof name !== 'string') {
            //Adjust args appropriately
            callback = deps;
            deps = name;
            name = null;
        }

        //This module may not have dependencies
        if (!isArray(deps)) {
            callback = deps;
            deps = [];
        }

        //If no name, and callback is a function, then figure out if it a
        //CommonJS thing with dependencies.
        if (!deps.length && isFunction(callback)) {
            //Remove comments from the callback string,
            //look for require calls, and pull them into the dependencies,
            //but only if there are function args.
            if (callback.length) {
                callback
                    .toString()
                    .replace(commentRegExp, '')
                    .replace(cjsRequireRegExp, function (match, dep) {
                        deps.push(dep);
                    });

                //May be a CommonJS thing even without require calls, but still
                //could use exports, and module. Avoid doing exports and module
                //work though if it just needs require.
                //REQUIRES the function to expect the CommonJS variables in the
                //order listed below.
                deps = (callback.length === 1 ? ['require'] : ['require', 'exports', 'module']).concat(deps);
            }
        }

        //If in IE 6-8 and hit an anonymous define() call, do the interactive
        //work.
        if (useInteractive) {
            node = currentlyAddingScript || getInteractiveScript();
            if (node) {
                if (!name) {
                    name = node.getAttribute('data-requiremodule');
                }
                context = contexts[node.getAttribute('data-requirecontext')];
            }
        }

        //Always save off evaluating the def call until the script onload handler.
        //This allows multiple modules to be in a file without prematurely
        //tracing dependencies, and allows for anonymous module support,
        //where the module name is not known until the script onload event
        //occurs. If no context, use the global queue, and get it processed
        //in the onscript load callback.
        (context ? context.defQueue : globalDefQueue).push([name, deps, callback]);
    };

    define.amd = {
        jQuery: true
    };


    /**
     * Executes the text. Normally just uses eval, but can be modified
     * to use a better, environment-specific call. Only used for transpiling
     * loader plugins, not for plain JS modules.
     * @param {String} text the text to execute/evaluate.
     */
    req.exec = function (text) {
        /*jslint evil: true */
        return eval(text);
    };

    //Set up with config info.
    req(cfg);
}(this));



    this.requirejsVars = {
        require: require,
        requirejs: require,
        define: define
    };

    if (env === 'browser') {
        /**
 * @license RequireJS rhino Copyright (c) 2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

//sloppy since eval enclosed with use strict causes problems if the source
//text is not strict-compliant.
/*jslint sloppy: true, evil: true */
/*global require, XMLHttpRequest */

(function () {
    require.load = function (context, moduleName, url) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.send();

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                eval(xhr.responseText);

                //Support anonymous modules.
                context.completeLoad(moduleName);
            }
        };
    };
}());
    } else if (env === 'rhino') {
        /**
 * @license RequireJS rhino Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint */
/*global require: false, java: false, load: false */

(function () {
    'use strict';
    require.load = function (context, moduleName, url) {

        load(url);

        //Support anonymous modules.
        context.completeLoad(moduleName);
    };

}());
    } else if (env === 'node') {
        this.requirejsVars.nodeRequire = nodeRequire;
        require.nodeRequire = nodeRequire;

        /**
 * @license RequireJS node Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint regexp: false */
/*global require: false, define: false, requirejsVars: false, process: false */

/**
 * This adapter assumes that x.js has loaded it and set up
 * some variables. This adapter just allows limited RequireJS
 * usage from within the requirejs directory. The general
 * node adapater is r.js.
 */

(function () {
    'use strict';

    var nodeReq = requirejsVars.nodeRequire,
        req = requirejsVars.require,
        def = requirejsVars.define,
        fs = nodeReq('fs'),
        path = nodeReq('path'),
        vm = nodeReq('vm'),
        //In Node 0.7+ existsSync is on fs.
        exists = fs.existsSync || path.existsSync,
        hasOwn = Object.prototype.hasOwnProperty;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    function syncTick(fn) {
        fn();
    }

    //Supply an implementation that allows synchronous get of a module.
    req.get = function (context, moduleName, relModuleMap, localRequire) {
        if (moduleName === "require" || moduleName === "exports" || moduleName === "module") {
            req.onError(new Error("Explicit require of " + moduleName + " is not allowed."));
        }

        var ret, oldTick,
            moduleMap = context.makeModuleMap(moduleName, relModuleMap, false, true);

        //Normalize module name, if it contains . or ..
        moduleName = moduleMap.id;

        if (hasProp(context.defined, moduleName)) {
            ret = context.defined[moduleName];
        } else {
            if (ret === undefined) {
                //Make sure nextTick for this type of call is sync-based.
                oldTick = context.nextTick;
                context.nextTick = syncTick;
                try {
                    if (moduleMap.prefix) {
                        //A plugin, call requirejs to handle it. Now that
                        //nextTick is syncTick, the require will complete
                        //synchronously.
                        localRequire([moduleMap.originalName]);

                        //Now that plugin is loaded, can regenerate the moduleMap
                        //to get the final, normalized ID.
                        moduleMap = context.makeModuleMap(moduleMap.originalName, relModuleMap, false, true);
                        moduleName = moduleMap.id;
                    } else {
                        //Try to dynamically fetch it.
                        req.load(context, moduleName, moduleMap.url);

                        //Enable the module
                        context.enable(moduleMap, relModuleMap);
                    }

                    //Break any cycles by requiring it normally, but this will
                    //finish synchronously
                    require([moduleName]);

                    //The above calls are sync, so can do the next thing safely.
                    ret = context.defined[moduleName];
                } finally {
                    context.nextTick = oldTick;
                }
            }
        }

        return ret;
    };

    req.nextTick = function (fn) {
        process.nextTick(fn);
    };

    //Add wrapper around the code so that it gets the requirejs
    //API instead of the Node API, and it is done lexically so
    //that it survives later execution.
    req.makeNodeWrapper = function (contents) {
        return '(function (require, requirejs, define) { ' +
                contents +
                '\n}(requirejsVars.require, requirejsVars.requirejs, requirejsVars.define));';
    };

    req.load = function (context, moduleName, url) {
        var contents, err;

        if (exists(url)) {
            contents = fs.readFileSync(url, 'utf8');

            contents = req.makeNodeWrapper(contents);
            try {
                vm.runInThisContext(contents, fs.realpathSync(url));
            } catch (e) {
                err = new Error('Evaluating ' + url + ' as module "' +
                                moduleName + '" failed with error: ' + e);
                err.originalError = e;
                err.moduleName = moduleName;
                err.fileName = url;
                return req.onError(err);
            }
        } else {
            def(moduleName, function () {
                //Get the original name, since relative requires may be
                //resolved differently in node (issue #202)
                var originalName = hasProp(context.registry, moduleName) &&
                            context.registry[moduleName].map.originalName;

                try {
                    return (context.config.nodeRequire || req.nodeRequire)(originalName);
                } catch (e) {
                    err = new Error('Calling node\'s require("' +
                                        originalName + '") failed with error: ' + e);
                    err.originalError = e;
                    err.moduleName = originalName;
                    return req.onError(err);
                }
            });
        }

        //Support anonymous modules.
        context.completeLoad(moduleName);
    };

    //Override to provide the function wrapper for define/require.
    req.exec = function (text) {
        /*jslint evil: true */
        text = req.makeNodeWrapper(text);
        return eval(text);
    };
}());

    } else if (env === 'xpconnect') {
        /**
 * @license RequireJS xpconnect Copyright (c) 2013, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint */
/*global require, load */

(function () {
    'use strict';
    require.load = function (context, moduleName, url) {

        load(url);

        //Support anonymous modules.
        context.completeLoad(moduleName);
    };

}());

    }

    //Support a default file name to execute. Useful for hosted envs
    //like Joyent where it defaults to a server.js as the only executed
    //script. But only do it if this is not an optimization run.
    if (commandOption !== 'o' && (!fileName || !jsSuffixRegExp.test(fileName))) {
        fileName = 'main.js';
    }

    /**
     * Loads the library files that can be used for the optimizer, or for other
     * tasks.
     */
    function loadLib() {
        /**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global Packages: false, process: false, window: false, navigator: false,
  document: false, define: false */

/**
 * A plugin that modifies any /env/ path to be the right path based on
 * the host environment. Right now only works for Node, Rhino and browser.
 */
(function () {
    var pathRegExp = /(\/|^)env\/|\{env\}/,
        env = 'unknown';

    if (typeof Packages !== 'undefined') {
        env = 'rhino';
    } else if (typeof process !== 'undefined') {
        env = 'node';
    } else if ((typeof navigator !== 'undefined' && typeof document !== 'undefined') ||
            (typeof importScripts !== 'undefined' && typeof self !== 'undefined')) {
        env = 'browser';
    } else if (typeof Components !== 'undefined' && Components.classes && Components.interfaces) {
        env = 'xpconnect';
    }

    define('env', {
        get: function () {
            return env;
        },

        load: function (name, req, load, config) {
            //Allow override in the config.
            if (config.env) {
                env = config.env;
            }

            name = name.replace(pathRegExp, function (match, prefix) {
                if (match.indexOf('{') === -1) {
                    return prefix + env + '/';
                } else {
                    return env;
                }
            });

            req([name], function (mod) {
                load(mod);
            });
        }
    });
}());/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint plusplus: true */
/*global define */

define('lang', function () {
    'use strict';

    var lang,
        hasOwn = Object.prototype.hasOwnProperty;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    lang = {
        backSlashRegExp: /\\/g,
        ostring: Object.prototype.toString,

        isArray: Array.isArray || function (it) {
            return lang.ostring.call(it) === "[object Array]";
        },

        isFunction: function(it) {
            return lang.ostring.call(it) === "[object Function]";
        },

        isRegExp: function(it) {
            return it && it instanceof RegExp;
        },

        hasProp: hasProp,

        //returns true if the object does not have an own property prop,
        //or if it does, it is a falsy value.
        falseProp: function (obj, prop) {
            return !hasProp(obj, prop) || !obj[prop];
        },

        //gets own property value for given prop on object
        getOwn: function (obj, prop) {
            return hasProp(obj, prop) && obj[prop];
        },

        _mixin: function(dest, source, override){
            var name;
            for (name in source) {
                if(source.hasOwnProperty(name)
                    && (override || !dest.hasOwnProperty(name))) {
                    dest[name] = source[name];
                }
            }

            return dest; // Object
        },

        /**
         * mixin({}, obj1, obj2) is allowed. If the last argument is a boolean,
         * then the source objects properties are force copied over to dest.
         */
        mixin: function(dest){
            var parameters = Array.prototype.slice.call(arguments),
                override, i, l;

            if (!dest) { dest = {}; }

            if (parameters.length > 2 && typeof arguments[parameters.length-1] === 'boolean') {
                override = parameters.pop();
            }

            for (i = 1, l = parameters.length; i < l; i++) {
                lang._mixin(dest, parameters[i], override);
            }
            return dest; // Object
        },

        delegate: (function () {
            // boodman/crockford delegation w/ cornford optimization
            function TMP() {}
            return function (obj, props) {
                TMP.prototype = obj;
                var tmp = new TMP();
                TMP.prototype = null;
                if (props) {
                    lang.mixin(tmp, props);
                }
                return tmp; // Object
            };
        }()),

        /**
         * Helper function for iterating over an array. If the func returns
         * a true value, it will break out of the loop.
         */
        each: function each(ary, func) {
            if (ary) {
                var i;
                for (i = 0; i < ary.length; i += 1) {
                    if (func(ary[i], i, ary)) {
                        break;
                    }
                }
            }
        },

        /**
         * Cycles over properties in an object and calls a function for each
         * property value. If the function returns a truthy value, then the
         * iteration is stopped.
         */
        eachProp: function eachProp(obj, func) {
            var prop;
            for (prop in obj) {
                if (hasProp(obj, prop)) {
                    if (func(obj[prop], prop)) {
                        break;
                    }
                }
            }
        },

        //Similar to Function.prototype.bind, but the "this" object is specified
        //first, since it is easier to read/figure out what "this" will be.
        bind: function bind(obj, fn) {
            return function () {
                return fn.apply(obj, arguments);
            };
        },

        //Escapes a content string to be be a string that has characters escaped
        //for inclusion as part of a JS string.
        jsEscape: function (content) {
            return content.replace(/(["'\\])/g, '\\$1')
                .replace(/[\f]/g, "\\f")
                .replace(/[\b]/g, "\\b")
                .replace(/[\n]/g, "\\n")
                .replace(/[\t]/g, "\\t")
                .replace(/[\r]/g, "\\r");
        }
    };
    return lang;
});
/**
 * prim 0.0.1 Copyright (c) 2012-2013, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/prim for details
 */

/*global setImmediate, process, setTimeout, define, module */

//Set prime.hideResolutionConflict = true to allow "resolution-races"
//in promise-tests to pass.
//Since the goal of prim is to be a small impl for trusted code, it is
//more important to normally throw in this case so that we can find
//logic errors quicker.

var prim;
(function () {
    'use strict';
    var op = Object.prototype,
        hasOwn = op.hasOwnProperty;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Helper function for iterating over an array. If the func returns
     * a true value, it will break out of the loop.
     */
    function each(ary, func) {
        if (ary) {
            var i;
            for (i = 0; i < ary.length; i += 1) {
                if (ary[i]) {
                    func(ary[i], i, ary);
                }
            }
        }
    }

    function check(p) {
        if (hasProp(p, 'e') || hasProp(p, 'v')) {
            if (!prim.hideResolutionConflict) {
                throw new Error('nope');
            }
            return false;
        }
        return true;
    }

    function notify(ary, value) {
        prim.nextTick(function () {
            each(ary, function (item) {
                item(value);
            });
        });
    }

    prim = function prim() {
        var p,
            ok = [],
            fail = [];

        return (p = {
            callback: function (yes, no) {
                if (no) {
                    p.errback(no);
                }

                if (hasProp(p, 'v')) {
                    prim.nextTick(function () {
                        yes(p.v);
                    });
                } else {
                    ok.push(yes);
                }
            },

            errback: function (no) {
                if (hasProp(p, 'e')) {
                    prim.nextTick(function () {
                        no(p.e);
                    });
                } else {
                    fail.push(no);
                }
            },

            finished: function () {
                return hasProp(p, 'e') || hasProp(p, 'v');
            },

            rejected: function () {
                return hasProp(p, 'e');
            },

            resolve: function (v) {
                if (check(p)) {
                    p.v = v;
                    notify(ok, v);
                }
                return p;
            },
            reject: function (e) {
                if (check(p)) {
                    p.e = e;
                    notify(fail, e);
                }
                return p;
            },

            start: function (fn) {
                p.resolve();
                return p.promise.then(fn);
            },

            promise: {
                then: function (yes, no) {
                    var next = prim();

                    p.callback(function (v) {
                        try {
                            if (yes && typeof yes === 'function') {
                                v = yes(v);
                            }

                            if (v && v.then) {
                                v.then(next.resolve, next.reject);
                            } else {
                                next.resolve(v);
                            }
                        } catch (e) {
                            next.reject(e);
                        }
                    }, function (e) {
                        var err;

                        try {
                            if (!no || typeof no !== 'function') {
                                next.reject(e);
                            } else {
                                err = no(e);

                                if (err && err.then) {
                                    err.then(next.resolve, next.reject);
                                } else {
                                    next.resolve(err);
                                }
                            }
                        } catch (e2) {
                            next.reject(e2);
                        }
                    });

                    return next.promise;
                },

                fail: function (no) {
                    return p.promise.then(null, no);
                },

                end: function () {
                    p.errback(function (e) {
                        throw e;
                    });
                }
            }
        });
    };

    prim.serial = function (ary) {
        var result = prim().resolve().promise;
        each(ary, function (item) {
            result = result.then(function () {
                return item();
            });
        });
        return result;
    };

    prim.nextTick = typeof setImmediate === 'function' ? setImmediate :
        (typeof process !== 'undefined' && process.nextTick ?
            process.nextTick : (typeof setTimeout !== 'undefined' ?
                function (fn) {
                setTimeout(fn, 0);
            } : function (fn) {
        fn();
    }));

    if (typeof define === 'function' && define.amd) {
        define('prim', function () { return prim; });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = prim;
    }
}());
if(env === 'browser') {
/**
 * @license RequireJS Copyright (c) 2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, load: false */

//Just a stub for use with uglify's consolidator.js
define('browser/assert', function () {
    return {};
});

}

if(env === 'node') {
/**
 * @license RequireJS Copyright (c) 2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, load: false */

//Needed so that rhino/assert can return a stub for uglify's consolidator.js
define('node/assert', ['assert'], function (assert) {
    return assert;
});

}

if(env === 'rhino') {
/**
 * @license RequireJS Copyright (c) 2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, load: false */

//Just a stub for use with uglify's consolidator.js
define('rhino/assert', function () {
    return {};
});

}

if(env === 'xpconnect') {
/**
 * @license RequireJS Copyright (c) 2013, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, load: false */

//Just a stub for use with uglify's consolidator.js
define('xpconnect/assert', function () {
    return {};
});

}

if(env === 'browser') {
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, process: false */

define('browser/args', function () {
    //Always expect config via an API call
    return [];
});

}

if(env === 'node') {
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, process: false */

define('node/args', function () {
    //Do not return the "node" or "r.js" arguments
    var args = process.argv.slice(2);

    //Ignore any command option used for rq.js
    if (args[0] && args[0].indexOf('-' === 0)) {
        args = args.slice(1);
    }

    return args;
});

}

if(env === 'rhino') {
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, process: false */

var jsLibRhinoArgs = (typeof rhinoArgs !== 'undefined' && rhinoArgs) || [].concat(Array.prototype.slice.call(arguments, 0));

define('rhino/args', function () {
    var args = jsLibRhinoArgs;

    //Ignore any command option used for r.js
    if (args[0] && args[0].indexOf('-' === 0)) {
        args = args.slice(1);
    }

    return args;
});

}

if(env === 'xpconnect') {
/**
 * @license Copyright (c) 2013, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define, xpconnectArgs */

var jsLibXpConnectArgs = (typeof xpconnectArgs !== 'undefined' && xpconnectArgs) || [].concat(Array.prototype.slice.call(arguments, 0));

define('xpconnect/args', function () {
    var args = jsLibXpConnectArgs;

    //Ignore any command option used for r.js
    if (args[0] && args[0].indexOf('-' === 0)) {
        args = args.slice(1);
    }

    return args;
});

}

if(env === 'browser') {
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, console: false */

define('browser/load', ['./file'], function (file) {
    function load(fileName) {
        eval(file.readFile(fileName));
    }

    return load;
});

}

if(env === 'node') {
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, console: false */

define('node/load', ['fs'], function (fs) {
    function load(fileName) {
        var contents = fs.readFileSync(fileName, 'utf8');
        process.compile(contents, fileName);
    }

    return load;
});

}

if(env === 'rhino') {
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, load: false */

define('rhino/load', function () {
    return load;
});

}

if(env === 'xpconnect') {
/**
 * @license RequireJS Copyright (c) 2013, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, load: false */

define('xpconnect/load', function () {
    return load;
});

}

if(env === 'browser') {
/**
 * @license Copyright (c) 2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint sloppy: true, nomen: true */
/*global require, define, console, XMLHttpRequest, requirejs, location */

define('browser/file', ['prim'], function (prim) {

    var file,
        currDirRegExp = /^\.(\/|$)/;

    function frontSlash(path) {
        return path.replace(/\\/g, '/');
    }

    function exists(path) {
        var status, xhr = new XMLHttpRequest();

        //Oh yeah, that is right SYNC IO. Behold its glory
        //and horrible blocking behavior.
        xhr.open('HEAD', path, false);
        xhr.send();
        status = xhr.status;

        return status === 200 || status === 304;
    }

    function mkDir(dir) {
        console.log('mkDir is no-op in browser');
    }

    function mkFullDir(dir) {
        console.log('mkFullDir is no-op in browser');
    }

    file = {
        backSlashRegExp: /\\/g,
        exclusionRegExp: /^\./,
        getLineSeparator: function () {
            return '/';
        },

        exists: function (fileName) {
            return exists(fileName);
        },

        parent: function (fileName) {
            var parts = fileName.split('/');
            parts.pop();
            return parts.join('/');
        },

        /**
         * Gets the absolute file path as a string, normalized
         * to using front slashes for path separators.
         * @param {String} fileName
         */
        absPath: function (fileName) {
            var dir;
            if (currDirRegExp.test(fileName)) {
                dir = frontSlash(location.href);
                if (dir.indexOf('/') !== -1) {
                    dir = dir.split('/');

                    //Pull off protocol and host, just want
                    //to allow paths (other build parts, like
                    //require._isSupportedBuildUrl do not support
                    //full URLs), but a full path from
                    //the root.
                    dir.splice(0, 3);

                    dir.pop();
                    dir = '/' + dir.join('/');
                }

                fileName = dir + fileName.substring(1);
            }

            return fileName;
        },

        normalize: function (fileName) {
            return fileName;
        },

        isFile: function (path) {
            return true;
        },

        isDirectory: function (path) {
            return false;
        },

        getFilteredFileList: function (startDir, regExpFilters, makeUnixPaths) {
            console.log('file.getFilteredFileList is no-op in browser');
        },

        copyDir: function (srcDir, destDir, regExpFilter, onlyCopyNew) {
            console.log('file.copyDir is no-op in browser');

        },

        copyFile: function (srcFileName, destFileName, onlyCopyNew) {
            console.log('file.copyFile is no-op in browser');
        },

        /**
         * Renames a file. May fail if "to" already exists or is on another drive.
         */
        renameFile: function (from, to) {
            console.log('file.renameFile is no-op in browser');
        },

        /**
         * Reads a *text* file.
         */
        readFile: function (path, encoding) {
            var xhr = new XMLHttpRequest();

            //Oh yeah, that is right SYNC IO. Behold its glory
            //and horrible blocking behavior.
            xhr.open('GET', path, false);
            xhr.send();

            return xhr.responseText;
        },

        readFileAsync: function (path, encoding) {
            var xhr = new XMLHttpRequest(),
                d = prim();

            xhr.open('GET', path, true);
            xhr.send();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status > 400) {
                        d.reject(new Error('Status: ' + xhr.status + ': ' + xhr.statusText));
                    } else {
                        d.resolve(xhr.responseText);
                    }
                }
            };

            return d.promise;
        },

        saveUtf8File: function (fileName, fileContents) {
            //summary: saves a *text* file using UTF-8 encoding.
            file.saveFile(fileName, fileContents, "utf8");
        },

        saveFile: function (fileName, fileContents, encoding) {
            requirejs.browser.saveFile(fileName, fileContents, encoding);
        },

        deleteFile: function (fileName) {
            console.log('file.deleteFile is no-op in browser');
        },

        /**
         * Deletes any empty directories under the given directory.
         */
        deleteEmptyDirs: function (startDir) {
            console.log('file.deleteEmptyDirs is no-op in browser');
        }
    };

    return file;

});

}

if(env === 'node') {
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint plusplus: false, octal:false, strict: false */
/*global define: false, process: false */

define('node/file', ['fs', 'path', 'prim'], function (fs, path, prim) {

    var isWindows = process.platform === 'win32',
        windowsDriveRegExp = /^[a-zA-Z]\:\/$/,
        file;

    function frontSlash(path) {
        return path.replace(/\\/g, '/');
    }

    function exists(path) {
        if (isWindows && path.charAt(path.length - 1) === '/' &&
            path.charAt(path.length - 2) !== ':') {
            path = path.substring(0, path.length - 1);
        }

        try {
            fs.statSync(path);
            return true;
        } catch (e) {
            return false;
        }
    }

    function mkDir(dir) {
        if (!exists(dir) && (!isWindows || !windowsDriveRegExp.test(dir))) {
            fs.mkdirSync(dir, 511);
        }
    }

    function mkFullDir(dir) {
        var parts = dir.split('/'),
            currDir = '',
            first = true;

        parts.forEach(function (part) {
            //First part may be empty string if path starts with a slash.
            currDir += part + '/';
            first = false;

            if (part) {
                mkDir(currDir);
            }
        });
    }

    file = {
        backSlashRegExp: /\\/g,
        exclusionRegExp: /^\./,
        getLineSeparator: function () {
            return '/';
        },

        exists: function (fileName) {
            return exists(fileName);
        },

        parent: function (fileName) {
            var parts = fileName.split('/');
            parts.pop();
            return parts.join('/');
        },

        /**
         * Gets the absolute file path as a string, normalized
         * to using front slashes for path separators.
         * @param {String} fileName
         */
        absPath: function (fileName) {
            return frontSlash(path.normalize(frontSlash(fs.realpathSync(fileName))));
        },

        normalize: function (fileName) {
            return frontSlash(path.normalize(fileName));
        },

        isFile: function (path) {
            return fs.statSync(path).isFile();
        },

        isDirectory: function (path) {
            return fs.statSync(path).isDirectory();
        },

        getFilteredFileList: function (/*String*/startDir, /*RegExp*/regExpFilters, /*boolean?*/makeUnixPaths) {
            //summary: Recurses startDir and finds matches to the files that match regExpFilters.include
            //and do not match regExpFilters.exclude. Or just one regexp can be passed in for regExpFilters,
            //and it will be treated as the "include" case.
            //Ignores files/directories that start with a period (.) unless exclusionRegExp
            //is set to another value.
            var files = [], topDir, regExpInclude, regExpExclude, dirFileArray,
                i, stat, filePath, ok, dirFiles, fileName;

            topDir = startDir;

            regExpInclude = regExpFilters.include || regExpFilters;
            regExpExclude = regExpFilters.exclude || null;

            if (file.exists(topDir)) {
                dirFileArray = fs.readdirSync(topDir);
                for (i = 0; i < dirFileArray.length; i++) {
                    fileName = dirFileArray[i];
                    filePath = path.join(topDir, fileName);
                    stat = fs.statSync(filePath);
                    if (stat.isFile()) {
                        if (makeUnixPaths) {
                            //Make sure we have a JS string.
                            if (filePath.indexOf("/") === -1) {
                                filePath = frontSlash(filePath);
                            }
                        }

                        ok = true;
                        if (regExpInclude) {
                            ok = filePath.match(regExpInclude);
                        }
                        if (ok && regExpExclude) {
                            ok = !filePath.match(regExpExclude);
                        }

                        if (ok && (!file.exclusionRegExp ||
                            !file.exclusionRegExp.test(fileName))) {
                            files.push(filePath);
                        }
                    } else if (stat.isDirectory() &&
                              (!file.exclusionRegExp || !file.exclusionRegExp.test(fileName))) {
                        dirFiles = this.getFilteredFileList(filePath, regExpFilters, makeUnixPaths);
                        files.push.apply(files, dirFiles);
                    }
                }
            }

            return files; //Array
        },

        copyDir: function (/*String*/srcDir, /*String*/destDir, /*RegExp?*/regExpFilter, /*boolean?*/onlyCopyNew) {
            //summary: copies files from srcDir to destDir using the regExpFilter to determine if the
            //file should be copied. Returns a list file name strings of the destinations that were copied.
            regExpFilter = regExpFilter || /\w/;

            //Normalize th directory names, but keep front slashes.
            //path module on windows now returns backslashed paths.
            srcDir = frontSlash(path.normalize(srcDir));
            destDir = frontSlash(path.normalize(destDir));

            var fileNames = file.getFilteredFileList(srcDir, regExpFilter, true),
            copiedFiles = [], i, srcFileName, destFileName;

            for (i = 0; i < fileNames.length; i++) {
                srcFileName = fileNames[i];
                destFileName = srcFileName.replace(srcDir, destDir);

                if (file.copyFile(srcFileName, destFileName, onlyCopyNew)) {
                    copiedFiles.push(destFileName);
                }
            }

            return copiedFiles.length ? copiedFiles : null; //Array or null
        },

        copyFile: function (/*String*/srcFileName, /*String*/destFileName, /*boolean?*/onlyCopyNew) {
            //summary: copies srcFileName to destFileName. If onlyCopyNew is set, it only copies the file if
            //srcFileName is newer than destFileName. Returns a boolean indicating if the copy occurred.
            var parentDir;

            //logger.trace("Src filename: " + srcFileName);
            //logger.trace("Dest filename: " + destFileName);

            //If onlyCopyNew is true, then compare dates and only copy if the src is newer
            //than dest.
            if (onlyCopyNew) {
                if (file.exists(destFileName) && fs.statSync(destFileName).mtime.getTime() >= fs.statSync(srcFileName).mtime.getTime()) {
                    return false; //Boolean
                }
            }

            //Make sure destination dir exists.
            parentDir = path.dirname(destFileName);
            if (!file.exists(parentDir)) {
                mkFullDir(parentDir);
            }

            fs.writeFileSync(destFileName, fs.readFileSync(srcFileName, 'binary'), 'binary');

            return true; //Boolean
        },

        /**
         * Renames a file. May fail if "to" already exists or is on another drive.
         */
        renameFile: function (from, to) {
            return fs.renameSync(from, to);
        },

        /**
         * Reads a *text* file.
         */
        readFile: function (/*String*/path, /*String?*/encoding) {
            if (encoding === 'utf-8') {
                encoding = 'utf8';
            }
            if (!encoding) {
                encoding = 'utf8';
            }

            var text = fs.readFileSync(path, encoding);

            //Hmm, would not expect to get A BOM, but it seems to happen,
            //remove it just in case.
            if (text.indexOf('\uFEFF') === 0) {
                text = text.substring(1, text.length);
            }

            return text;
        },

        readFileAsync: function (path, encoding) {
            var d = prim();
            try {
                d.resolve(file.readFile(path, encoding));
            } catch (e) {
                d.reject(e);
            }
            return d.promise;
        },

        saveUtf8File: function (/*String*/fileName, /*String*/fileContents) {
            //summary: saves a *text* file using UTF-8 encoding.
            file.saveFile(fileName, fileContents, "utf8");
        },

        saveFile: function (/*String*/fileName, /*String*/fileContents, /*String?*/encoding) {
            //summary: saves a *text* file.
            var parentDir;

            if (encoding === 'utf-8') {
                encoding = 'utf8';
            }
            if (!encoding) {
                encoding = 'utf8';
            }

            //Make sure destination directories exist.
            parentDir = path.dirname(fileName);
            if (!file.exists(parentDir)) {
                mkFullDir(parentDir);
            }

            fs.writeFileSync(fileName, fileContents, encoding);
        },

        deleteFile: function (/*String*/fileName) {
            //summary: deletes a file or directory if it exists.
            var files, i, stat;
            if (file.exists(fileName)) {
                stat = fs.statSync(fileName);
                if (stat.isDirectory()) {
                    files = fs.readdirSync(fileName);
                    for (i = 0; i < files.length; i++) {
                        this.deleteFile(path.join(fileName, files[i]));
                    }
                    fs.rmdirSync(fileName);
                } else {
                    fs.unlinkSync(fileName);
                }
            }
        },


        /**
         * Deletes any empty directories under the given directory.
         */
        deleteEmptyDirs: function (startDir) {
            var dirFileArray, i, fileName, filePath, stat;

            if (file.exists(startDir)) {
                dirFileArray = fs.readdirSync(startDir);
                for (i = 0; i < dirFileArray.length; i++) {
                    fileName = dirFileArray[i];
                    filePath = path.join(startDir, fileName);
                    stat = fs.statSync(filePath);
                    if (stat.isDirectory()) {
                        file.deleteEmptyDirs(filePath);
                    }
                }

                //If directory is now empty, remove it.
                if (fs.readdirSync(startDir).length ===  0) {
                    file.deleteFile(startDir);
                }
            }
        }
    };

    return file;

});

}

if(env === 'rhino') {
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Helper functions to deal with file I/O.

/*jslint plusplus: false */
/*global java: false, define: false */

define('rhino/file', ['prim'], function (prim) {
    var file = {
        backSlashRegExp: /\\/g,

        exclusionRegExp: /^\./,

        getLineSeparator: function () {
            return file.lineSeparator;
        },

        lineSeparator: java.lang.System.getProperty("line.separator"), //Java String

        exists: function (fileName) {
            return (new java.io.File(fileName)).exists();
        },

        parent: function (fileName) {
            return file.absPath((new java.io.File(fileName)).getParentFile());
        },

        normalize: function (fileName) {
            return file.absPath(fileName);
        },

        isFile: function (path) {
            return (new java.io.File(path)).isFile();
        },

        isDirectory: function (path) {
            return (new java.io.File(path)).isDirectory();
        },

        /**
         * Gets the absolute file path as a string, normalized
         * to using front slashes for path separators.
         * @param {java.io.File||String} file
         */
        absPath: function (fileObj) {
            if (typeof fileObj === "string") {
                fileObj = new java.io.File(fileObj);
            }
            return (fileObj.getCanonicalPath() + "").replace(file.backSlashRegExp, "/");
        },

        getFilteredFileList: function (/*String*/startDir, /*RegExp*/regExpFilters, /*boolean?*/makeUnixPaths, /*boolean?*/startDirIsJavaObject) {
            //summary: Recurses startDir and finds matches to the files that match regExpFilters.include
            //and do not match regExpFilters.exclude. Or just one regexp can be passed in for regExpFilters,
            //and it will be treated as the "include" case.
            //Ignores files/directories that start with a period (.) unless exclusionRegExp
            //is set to another value.
            var files = [], topDir, regExpInclude, regExpExclude, dirFileArray,
                i, fileObj, filePath, ok, dirFiles;

            topDir = startDir;
            if (!startDirIsJavaObject) {
                topDir = new java.io.File(startDir);
            }

            regExpInclude = regExpFilters.include || regExpFilters;
            regExpExclude = regExpFilters.exclude || null;

            if (topDir.exists()) {
                dirFileArray = topDir.listFiles();
                for (i = 0; i < dirFileArray.length; i++) {
                    fileObj = dirFileArray[i];
                    if (fileObj.isFile()) {
                        filePath = fileObj.getPath();
                        if (makeUnixPaths) {
                            //Make sure we have a JS string.
                            filePath = String(filePath);
                            if (filePath.indexOf("/") === -1) {
                                filePath = filePath.replace(/\\/g, "/");
                            }
                        }

                        ok = true;
                        if (regExpInclude) {
                            ok = filePath.match(regExpInclude);
                        }
                        if (ok && regExpExclude) {
                            ok = !filePath.match(regExpExclude);
                        }

                        if (ok && (!file.exclusionRegExp ||
                            !file.exclusionRegExp.test(fileObj.getName()))) {
                            files.push(filePath);
                        }
                    } else if (fileObj.isDirectory() &&
                              (!file.exclusionRegExp || !file.exclusionRegExp.test(fileObj.getName()))) {
                        dirFiles = this.getFilteredFileList(fileObj, regExpFilters, makeUnixPaths, true);
                        files.push.apply(files, dirFiles);
                    }
                }
            }

            return files; //Array
        },

        copyDir: function (/*String*/srcDir, /*String*/destDir, /*RegExp?*/regExpFilter, /*boolean?*/onlyCopyNew) {
            //summary: copies files from srcDir to destDir using the regExpFilter to determine if the
            //file should be copied. Returns a list file name strings of the destinations that were copied.
            regExpFilter = regExpFilter || /\w/;

            var fileNames = file.getFilteredFileList(srcDir, regExpFilter, true),
            copiedFiles = [], i, srcFileName, destFileName;

            for (i = 0; i < fileNames.length; i++) {
                srcFileName = fileNames[i];
                destFileName = srcFileName.replace(srcDir, destDir);

                if (file.copyFile(srcFileName, destFileName, onlyCopyNew)) {
                    copiedFiles.push(destFileName);
                }
            }

            return copiedFiles.length ? copiedFiles : null; //Array or null
        },

        copyFile: function (/*String*/srcFileName, /*String*/destFileName, /*boolean?*/onlyCopyNew) {
            //summary: copies srcFileName to destFileName. If onlyCopyNew is set, it only copies the file if
            //srcFileName is newer than destFileName. Returns a boolean indicating if the copy occurred.
            var destFile = new java.io.File(destFileName), srcFile, parentDir,
            srcChannel, destChannel;

            //logger.trace("Src filename: " + srcFileName);
            //logger.trace("Dest filename: " + destFileName);

            //If onlyCopyNew is true, then compare dates and only copy if the src is newer
            //than dest.
            if (onlyCopyNew) {
                srcFile = new java.io.File(srcFileName);
                if (destFile.exists() && destFile.lastModified() >= srcFile.lastModified()) {
                    return false; //Boolean
                }
            }

            //Make sure destination dir exists.
            parentDir = destFile.getParentFile();
            if (!parentDir.exists()) {
                if (!parentDir.mkdirs()) {
                    throw "Could not create directory: " + parentDir.getCanonicalPath();
                }
            }

            //Java's version of copy file.
            srcChannel = new java.io.FileInputStream(srcFileName).getChannel();
            destChannel = new java.io.FileOutputStream(destFileName).getChannel();
            destChannel.transferFrom(srcChannel, 0, srcChannel.size());
            srcChannel.close();
            destChannel.close();

            return true; //Boolean
        },

        /**
         * Renames a file. May fail if "to" already exists or is on another drive.
         */
        renameFile: function (from, to) {
            return (new java.io.File(from)).renameTo((new java.io.File(to)));
        },

        readFile: function (/*String*/path, /*String?*/encoding) {
            //A file read function that can deal with BOMs
            encoding = encoding || "utf-8";
            var fileObj = new java.io.File(path),
                    input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(fileObj), encoding)),
                    stringBuffer, line;
            try {
                stringBuffer = new java.lang.StringBuffer();
                line = input.readLine();

                // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
                // http://www.unicode.org/faq/utf_bom.html

                // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
                // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
                if (line && line.length() && line.charAt(0) === 0xfeff) {
                    // Eat the BOM, since we've already found the encoding on this file,
                    // and we plan to concatenating this buffer with others; the BOM should
                    // only appear at the top of a file.
                    line = line.substring(1);
                }
                while (line !== null) {
                    stringBuffer.append(line);
                    stringBuffer.append(file.lineSeparator);
                    line = input.readLine();
                }
                //Make sure we return a JavaScript string and not a Java string.
                return String(stringBuffer.toString()); //String
            } finally {
                input.close();
            }
        },

        readFileAsync: function (path, encoding) {
            var d = prim();
            try {
                d.resolve(file.readFile(path, encoding));
            } catch (e) {
                d.reject(e);
            }
            return d.promise;
        },

        saveUtf8File: function (/*String*/fileName, /*String*/fileContents) {
            //summary: saves a file using UTF-8 encoding.
            file.saveFile(fileName, fileContents, "utf-8");
        },

        saveFile: function (/*String*/fileName, /*String*/fileContents, /*String?*/encoding) {
            //summary: saves a file.
            var outFile = new java.io.File(fileName), outWriter, parentDir, os;

            parentDir = outFile.getAbsoluteFile().getParentFile();
            if (!parentDir.exists()) {
                if (!parentDir.mkdirs()) {
                    throw "Could not create directory: " + parentDir.getAbsolutePath();
                }
            }

            if (encoding) {
                outWriter = new java.io.OutputStreamWriter(new java.io.FileOutputStream(outFile), encoding);
            } else {
                outWriter = new java.io.OutputStreamWriter(new java.io.FileOutputStream(outFile));
            }

            os = new java.io.BufferedWriter(outWriter);
            try {
                os.write(fileContents);
            } finally {
                os.close();
            }
        },

        deleteFile: function (/*String*/fileName) {
            //summary: deletes a file or directory if it exists.
            var fileObj = new java.io.File(fileName), files, i;
            if (fileObj.exists()) {
                if (fileObj.isDirectory()) {
                    files = fileObj.listFiles();
                    for (i = 0; i < files.length; i++) {
                        this.deleteFile(files[i]);
                    }
                }
                fileObj["delete"]();
            }
        },

        /**
         * Deletes any empty directories under the given directory.
         * The startDirIsJavaObject is private to this implementation's
         * recursion needs.
         */
        deleteEmptyDirs: function (startDir, startDirIsJavaObject) {
            var topDir = startDir,
                dirFileArray, i, fileObj;

            if (!startDirIsJavaObject) {
                topDir = new java.io.File(startDir);
            }

            if (topDir.exists()) {
                dirFileArray = topDir.listFiles();
                for (i = 0; i < dirFileArray.length; i++) {
                    fileObj = dirFileArray[i];
                    if (fileObj.isDirectory()) {
                        file.deleteEmptyDirs(fileObj, true);
                    }
                }

                //If the directory is empty now, delete it.
                if (topDir.listFiles().length === 0) {
                    file.deleteFile(String(topDir.getPath()));
                }
            }
        }
    };

    return file;
});

}

if(env === 'xpconnect') {
/**
 * @license RequireJS Copyright (c) 2013, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
//Helper functions to deal with file I/O.

/*jslint plusplus: false */
/*global define, Components, xpcUtil */

define('xpconnect/file', ['prim'], function (prim) {
    var file,
        Cc = Components.classes,
        Ci = Components.interfaces,
        //Depends on xpcUtil which is set up in x.js
        xpfile = xpcUtil.xpfile;

    function mkFullDir(dirObj) {
        //1 is DIRECTORY_TYPE, 511 is 0777 permissions
        if (!dirObj.exists()) {
            dirObj.create(1, 511);
        }
    }

    file = {
        backSlashRegExp: /\\/g,

        exclusionRegExp: /^\./,

        getLineSeparator: function () {
            return file.lineSeparator;
        },

        lineSeparator: ('@mozilla.org/windows-registry-key;1' in Cc) ?
                        '\r\n' : '\n',

        exists: function (fileName) {
            return xpfile(fileName).exists();
        },

        parent: function (fileName) {
            return xpfile(fileName).parent;
        },

        normalize: function (fileName) {
            return file.absPath(fileName);
        },

        isFile: function (path) {
            return xpfile(path).isFile();
        },

        isDirectory: function (path) {
            return xpfile(path).isDirectory();
        },

        /**
         * Gets the absolute file path as a string, normalized
         * to using front slashes for path separators.
         * @param {java.io.File||String} file
         */
        absPath: function (fileObj) {
            if (typeof fileObj === "string") {
                fileObj = xpfile(fileObj);
            }
            return fileObj.path;
        },

        getFilteredFileList: function (/*String*/startDir, /*RegExp*/regExpFilters, /*boolean?*/makeUnixPaths, /*boolean?*/startDirIsObject) {
            //summary: Recurses startDir and finds matches to the files that match regExpFilters.include
            //and do not match regExpFilters.exclude. Or just one regexp can be passed in for regExpFilters,
            //and it will be treated as the "include" case.
            //Ignores files/directories that start with a period (.) unless exclusionRegExp
            //is set to another value.
            var files = [], topDir, regExpInclude, regExpExclude, dirFileArray,
                fileObj, filePath, ok, dirFiles;

            topDir = startDir;
            if (!startDirIsObject) {
                topDir = xpfile(startDir);
            }

            regExpInclude = regExpFilters.include || regExpFilters;
            regExpExclude = regExpFilters.exclude || null;

            if (topDir.exists()) {
                dirFileArray = topDir.directoryEntries;
                while (dirFileArray.hasMoreElements()) {
                    fileObj = dirFileArray.getNext().QueryInterface(Ci.nsILocalFile);
                    if (fileObj.isFile()) {
                        filePath = fileObj.path;
                        if (makeUnixPaths) {
                            if (filePath.indexOf("/") === -1) {
                                filePath = filePath.replace(/\\/g, "/");
                            }
                        }

                        ok = true;
                        if (regExpInclude) {
                            ok = filePath.match(regExpInclude);
                        }
                        if (ok && regExpExclude) {
                            ok = !filePath.match(regExpExclude);
                        }

                        if (ok && (!file.exclusionRegExp ||
                            !file.exclusionRegExp.test(fileObj.leafName))) {
                            files.push(filePath);
                        }
                    } else if (fileObj.isDirectory() &&
                              (!file.exclusionRegExp || !file.exclusionRegExp.test(fileObj.leafName))) {
                        dirFiles = this.getFilteredFileList(fileObj, regExpFilters, makeUnixPaths, true);
                        files.push.apply(files, dirFiles);
                    }
                }
            }

            return files; //Array
        },

        copyDir: function (/*String*/srcDir, /*String*/destDir, /*RegExp?*/regExpFilter, /*boolean?*/onlyCopyNew) {
            //summary: copies files from srcDir to destDir using the regExpFilter to determine if the
            //file should be copied. Returns a list file name strings of the destinations that were copied.
            regExpFilter = regExpFilter || /\w/;

            var fileNames = file.getFilteredFileList(srcDir, regExpFilter, true),
            copiedFiles = [], i, srcFileName, destFileName;

            for (i = 0; i < fileNames.length; i += 1) {
                srcFileName = fileNames[i];
                destFileName = srcFileName.replace(srcDir, destDir);

                if (file.copyFile(srcFileName, destFileName, onlyCopyNew)) {
                    copiedFiles.push(destFileName);
                }
            }

            return copiedFiles.length ? copiedFiles : null; //Array or null
        },

        copyFile: function (/*String*/srcFileName, /*String*/destFileName, /*boolean?*/onlyCopyNew) {
            //summary: copies srcFileName to destFileName. If onlyCopyNew is set, it only copies the file if
            //srcFileName is newer than destFileName. Returns a boolean indicating if the copy occurred.
            var destFile = xpfile(destFileName),
            srcFile = xpfile(srcFileName);

            //logger.trace("Src filename: " + srcFileName);
            //logger.trace("Dest filename: " + destFileName);

            //If onlyCopyNew is true, then compare dates and only copy if the src is newer
            //than dest.
            if (onlyCopyNew) {
                if (destFile.exists() && destFile.lastModifiedTime >= srcFile.lastModifiedTime) {
                    return false; //Boolean
                }
            }

            srcFile.copyTo(destFile.parent, destFile.leafName);

            return true; //Boolean
        },

        /**
         * Renames a file. May fail if "to" already exists or is on another drive.
         */
        renameFile: function (from, to) {
            var toFile = xpfile(to);
            return xpfile(from).moveTo(toFile.parent, toFile.leafName);
        },

        readFile: xpcUtil.readFile,

        readFileAsync: function (path, encoding) {
            var d = prim();
            try {
                d.resolve(file.readFile(path, encoding));
            } catch (e) {
                d.reject(e);
            }
            return d.promise;
        },

        saveUtf8File: function (/*String*/fileName, /*String*/fileContents) {
            //summary: saves a file using UTF-8 encoding.
            file.saveFile(fileName, fileContents, "utf-8");
        },

        saveFile: function (/*String*/fileName, /*String*/fileContents, /*String?*/encoding) {
            var outStream, convertStream,
                fileObj = xpfile(fileName);

            mkFullDir(fileObj.parent);

            try {
                outStream = Cc['@mozilla.org/network/file-output-stream;1']
                             .createInstance(Ci.nsIFileOutputStream);
                //438 is decimal for 0777
                outStream.init(fileObj, 0x02 | 0x08 | 0x20, 511, 0);

                convertStream = Cc['@mozilla.org/intl/converter-output-stream;1']
                                  .createInstance(Ci.nsIConverterOutputStream);

                convertStream.init(outStream, encoding, 0, 0);
                convertStream.writeString(fileContents);
            } catch (e) {
                throw new Error((fileObj && fileObj.path || '') + ': ' + e);
            } finally {
                if (convertStream) {
                    convertStream.close();
                }
                if (outStream) {
                    outStream.close();
                }
            }
        },

        deleteFile: function (/*String*/fileName) {
            //summary: deletes a file or directory if it exists.
            var fileObj = xpfile(fileName);
            if (fileObj.exists()) {
                fileObj.remove(true);
            }
        },

        /**
         * Deletes any empty directories under the given directory.
         * The startDirIsJavaObject is private to this implementation's
         * recursion needs.
         */
        deleteEmptyDirs: function (startDir, startDirIsObject) {
            var topDir = startDir,
                dirFileArray, fileObj;

            if (!startDirIsObject) {
                topDir = xpfile(startDir);
            }

            if (topDir.exists()) {
                dirFileArray = topDir.directoryEntries;
                while (dirFileArray.hasMoreElements()) {
                    fileObj = dirFileArray.getNext().QueryInterface(Ci.nsILocalFile);

                    if (fileObj.isDirectory()) {
                        file.deleteEmptyDirs(fileObj, true);
                    }
                }

                //If the directory is empty now, delete it.
                dirFileArray = topDir.directoryEntries;
                if (!dirFileArray.hasMoreElements()) {
                    file.deleteFile(topDir.path);
                }
            }
        }
    };

    return file;
});

}

if(env === 'browser') {
/*global process */
define('browser/quit', function () {
    'use strict';
    return function (code) {
    };
});
}

if(env === 'node') {
/*global process */
define('node/quit', function () {
    'use strict';
    return function (code) {
        return process.exit(code);
    };
});
}

if(env === 'rhino') {
/*global quit */
define('rhino/quit', function () {
    'use strict';
    return function (code) {
        return quit(code);
    };
});

}

if(env === 'xpconnect') {
/*global quit */
define('xpconnect/quit', function () {
    'use strict';
    return function (code) {
        return quit(code);
    };
});

}

if(env === 'browser') {
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, console: false */

define('browser/print', function () {
    function print(msg) {
        console.log(msg);
    }

    return print;
});

}

if(env === 'node') {
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, console: false */

define('node/print', function () {
    function print(msg) {
        console.log(msg);
    }

    return print;
});

}

if(env === 'rhino') {
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, print: false */

define('rhino/print', function () {
    return print;
});

}

if(env === 'xpconnect') {
/**
 * @license RequireJS Copyright (c) 2013, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false, print: false */

define('xpconnect/print', function () {
    return print;
});

}
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint nomen: false, strict: false */
/*global define: false */

define('logger', ['env!env/print'], function (print) {
    var logger = {
        TRACE: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        SILENT: 4,
        level: 0,
        logPrefix: "",

        logLevel: function( level ) {
            this.level = level;
        },

        trace: function (message) {
            if (this.level <= this.TRACE) {
                this._print(message);
            }
        },

        info: function (message) {
            if (this.level <= this.INFO) {
                this._print(message);
            }
        },

        warn: function (message) {
            if (this.level <= this.WARN) {
                this._print(message);
            }
        },

        error: function (message) {
            if (this.level <= this.ERROR) {
                this._print(message);
            }
        },

        _print: function (message) {
            this._sysPrint((this.logPrefix ? (this.logPrefix + " ") : "") + message);
        },

        _sysPrint: function (message) {
            print(message);
        }
    };

    return logger;
});
//Just a blank file to use when building the optimizer with the optimizer,
//so that the build does not attempt to inline some env modules,
//like Node's fs and path.

//Commit 465a4eae86c7bae191b1ee427571543ace777117 on July 19, 2012
define('esprima', ['exports'], function(exports) {
/*
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Copyright (C) 2012 Mathias Bynens <mathias@qiwi.be>
  Copyright (C) 2012 Joost-Wim Boekesteijn <joost-wim@boekesteijn.nl>
  Copyright (C) 2012 Kris Kowal <kris.kowal@cixar.com>
  Copyright (C) 2012 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2012 Arpad Borsos <arpad.borsos@googlemail.com>
  Copyright (C) 2011 Ariya Hidayat <ariya.hidayat@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*jslint bitwise:true plusplus:true */
/*global esprima:true, exports:true,
throwError: true, createLiteral: true, generateStatement: true,
parseAssignmentExpression: true, parseBlock: true, parseExpression: true,
parseFunctionDeclaration: true, parseFunctionExpression: true,
parseFunctionSourceElements: true, parseVariableIdentifier: true,
parseLeftHandSideExpression: true,
parseStatement: true, parseSourceElement: true */

(function (exports) {
    'use strict';

    var Token,
        TokenName,
        Syntax,
        PropertyKind,
        Messages,
        Regex,
        source,
        strict,
        index,
        lineNumber,
        lineStart,
        length,
        buffer,
        state,
        extra;

    Token = {
        BooleanLiteral: 1,
        EOF: 2,
        Identifier: 3,
        Keyword: 4,
        NullLiteral: 5,
        NumericLiteral: 6,
        Punctuator: 7,
        StringLiteral: 8
    };

    TokenName = {};
    TokenName[Token.BooleanLiteral] = 'Boolean';
    TokenName[Token.EOF] = '<end>';
    TokenName[Token.Identifier] = 'Identifier';
    TokenName[Token.Keyword] = 'Keyword';
    TokenName[Token.NullLiteral] = 'Null';
    TokenName[Token.NumericLiteral] = 'Numeric';
    TokenName[Token.Punctuator] = 'Punctuator';
    TokenName[Token.StringLiteral] = 'String';

    Syntax = {
        AssignmentExpression: 'AssignmentExpression',
        ArrayExpression: 'ArrayExpression',
        BlockStatement: 'BlockStatement',
        BinaryExpression: 'BinaryExpression',
        BreakStatement: 'BreakStatement',
        CallExpression: 'CallExpression',
        CatchClause: 'CatchClause',
        ConditionalExpression: 'ConditionalExpression',
        ContinueStatement: 'ContinueStatement',
        DoWhileStatement: 'DoWhileStatement',
        DebuggerStatement: 'DebuggerStatement',
        EmptyStatement: 'EmptyStatement',
        ExpressionStatement: 'ExpressionStatement',
        ForStatement: 'ForStatement',
        ForInStatement: 'ForInStatement',
        FunctionDeclaration: 'FunctionDeclaration',
        FunctionExpression: 'FunctionExpression',
        Identifier: 'Identifier',
        IfStatement: 'IfStatement',
        Literal: 'Literal',
        LabeledStatement: 'LabeledStatement',
        LogicalExpression: 'LogicalExpression',
        MemberExpression: 'MemberExpression',
        NewExpression: 'NewExpression',
        ObjectExpression: 'ObjectExpression',
        Program: 'Program',
        Property: 'Property',
        ReturnStatement: 'ReturnStatement',
        SequenceExpression: 'SequenceExpression',
        SwitchStatement: 'SwitchStatement',
        SwitchCase: 'SwitchCase',
        ThisExpression: 'ThisExpression',
        ThrowStatement: 'ThrowStatement',
        TryStatement: 'TryStatement',
        UnaryExpression: 'UnaryExpression',
        UpdateExpression: 'UpdateExpression',
        VariableDeclaration: 'VariableDeclaration',
        VariableDeclarator: 'VariableDeclarator',
        WhileStatement: 'WhileStatement',
        WithStatement: 'WithStatement'
    };

    PropertyKind = {
        Data: 1,
        Get: 2,
        Set: 4
    };

    // Error messages should be identical to V8.
    Messages = {
        UnexpectedToken:  'Unexpected token %0',
        UnexpectedNumber:  'Unexpected number',
        UnexpectedString:  'Unexpected string',
        UnexpectedIdentifier:  'Unexpected identifier',
        UnexpectedReserved:  'Unexpected reserved word',
        UnexpectedEOS:  'Unexpected end of input',
        NewlineAfterThrow:  'Illegal newline after throw',
        InvalidRegExp: 'Invalid regular expression',
        UnterminatedRegExp:  'Invalid regular expression: missing /',
        InvalidLHSInAssignment:  'Invalid left-hand side in assignment',
        InvalidLHSInForIn:  'Invalid left-hand side in for-in',
        NoCatchOrFinally:  'Missing catch or finally after try',
        UnknownLabel: 'Undefined label \'%0\'',
        Redeclaration: '%0 \'%1\' has already been declared',
        IllegalContinue: 'Illegal continue statement',
        IllegalBreak: 'Illegal break statement',
        IllegalReturn: 'Illegal return statement',
        StrictModeWith:  'Strict mode code may not include a with statement',
        StrictCatchVariable:  'Catch variable may not be eval or arguments in strict mode',
        StrictVarName:  'Variable name may not be eval or arguments in strict mode',
        StrictParamName:  'Parameter name eval or arguments is not allowed in strict mode',
        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
        StrictFunctionName:  'Function name may not be eval or arguments in strict mode',
        StrictOctalLiteral:  'Octal literals are not allowed in strict mode.',
        StrictDelete:  'Delete of an unqualified identifier in strict mode.',
        StrictDuplicateProperty:  'Duplicate data property in object literal not allowed in strict mode',
        AccessorDataProperty:  'Object literal may not have data and accessor property with the same name',
        AccessorGetSet:  'Object literal may not have multiple get/set accessors with the same name',
        StrictLHSAssignment:  'Assignment to eval or arguments is not allowed in strict mode',
        StrictLHSPostfix:  'Postfix increment/decrement may not have eval or arguments operand in strict mode',
        StrictLHSPrefix:  'Prefix increment/decrement may not have eval or arguments operand in strict mode',
        StrictReservedWord:  'Use of future reserved word in strict mode'
    };

    // See also tools/generate-unicode-regex.py.
    Regex = {
        NonAsciiIdentifierStart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]'),
        NonAsciiIdentifierPart: new RegExp('[\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0300-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u0483-\u0487\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u05d0-\u05ea\u05f0-\u05f2\u0610-\u061a\u0620-\u0669\u066e-\u06d3\u06d5-\u06dc\u06df-\u06e8\u06ea-\u06fc\u06ff\u0710-\u074a\u074d-\u07b1\u07c0-\u07f5\u07fa\u0800-\u082d\u0840-\u085b\u08a0\u08a2-\u08ac\u08e4-\u08fe\u0900-\u0963\u0966-\u096f\u0971-\u0977\u0979-\u097f\u0981-\u0983\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bc-\u09c4\u09c7\u09c8\u09cb-\u09ce\u09d7\u09dc\u09dd\u09df-\u09e3\u09e6-\u09f1\u0a01-\u0a03\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a59-\u0a5c\u0a5e\u0a66-\u0a75\u0a81-\u0a83\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abc-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ad0\u0ae0-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3c-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5c\u0b5d\u0b5f-\u0b63\u0b66-\u0b6f\u0b71\u0b82\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd0\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c58\u0c59\u0c60-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbc-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0cde\u0ce0-\u0ce3\u0ce6-\u0cef\u0cf1\u0cf2\u0d02\u0d03\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d-\u0d44\u0d46-\u0d48\u0d4a-\u0d4e\u0d57\u0d60-\u0d63\u0d66-\u0d6f\u0d7a-\u0d7f\u0d82\u0d83\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e01-\u0e3a\u0e40-\u0e4e\u0e50-\u0e59\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb9\u0ebb-\u0ebd\u0ec0-\u0ec4\u0ec6\u0ec8-\u0ecd\u0ed0-\u0ed9\u0edc-\u0edf\u0f00\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e-\u0f47\u0f49-\u0f6c\u0f71-\u0f84\u0f86-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1049\u1050-\u109d\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u135d-\u135f\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176c\u176e-\u1770\u1772\u1773\u1780-\u17d3\u17d7\u17dc\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1820-\u1877\u1880-\u18aa\u18b0-\u18f5\u1900-\u191c\u1920-\u192b\u1930-\u193b\u1946-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u19d0-\u19d9\u1a00-\u1a1b\u1a20-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1aa7\u1b00-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1bf3\u1c00-\u1c37\u1c40-\u1c49\u1c4d-\u1c7d\u1cd0-\u1cd2\u1cd4-\u1cf6\u1d00-\u1de6\u1dfc-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u200c\u200d\u203f\u2040\u2054\u2071\u207f\u2090-\u209c\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d7f-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2de0-\u2dff\u2e2f\u3005-\u3007\u3021-\u302f\u3031-\u3035\u3038-\u303c\u3041-\u3096\u3099\u309a\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua62b\ua640-\ua66f\ua674-\ua67d\ua67f-\ua697\ua69f-\ua6f1\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua827\ua840-\ua873\ua880-\ua8c4\ua8d0-\ua8d9\ua8e0-\ua8f7\ua8fb\ua900-\ua92d\ua930-\ua953\ua960-\ua97c\ua980-\ua9c0\ua9cf-\ua9d9\uaa00-\uaa36\uaa40-\uaa4d\uaa50-\uaa59\uaa60-\uaa76\uaa7a\uaa7b\uaa80-\uaac2\uaadb-\uaadd\uaae0-\uaaef\uaaf2-\uaaf6\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabea\uabec\uabed\uabf0-\uabf9\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\ufe70-\ufe74\ufe76-\ufefc\uff10-\uff19\uff21-\uff3a\uff3f\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc]')
    };

    // Ensure the condition is true, otherwise throw an error.
    // This is only to have a better contract semantic, i.e. another safety net
    // to catch a logic error. The condition shall be fulfilled in normal case.
    // Do NOT use this to enforce a certain condition on any user input.

    function assert(condition, message) {
        if (!condition) {
            throw new Error('ASSERT: ' + message);
        }
    }

    function sliceSource(from, to) {
        return source.slice(from, to);
    }

    if (typeof 'esprima'[0] === 'undefined') {
        sliceSource = function sliceArraySource(from, to) {
            return source.slice(from, to).join('');
        };
    }

    function isDecimalDigit(ch) {
        return '0123456789'.indexOf(ch) >= 0;
    }

    function isHexDigit(ch) {
        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
    }

    function isOctalDigit(ch) {
        return '01234567'.indexOf(ch) >= 0;
    }


    // 7.2 White Space

    function isWhiteSpace(ch) {
        return (ch === ' ') || (ch === '\u0009') || (ch === '\u000B') ||
            (ch === '\u000C') || (ch === '\u00A0') ||
            (ch.charCodeAt(0) >= 0x1680 &&
             '\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\uFEFF'.indexOf(ch) >= 0);
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return (ch === '\n' || ch === '\r' || ch === '\u2028' || ch === '\u2029');
    }

    // 7.6 Identifier Names and Identifiers

    function isIdentifierStart(ch) {
        return (ch === '$') || (ch === '_') || (ch === '\\') ||
            (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
            ((ch.charCodeAt(0) >= 0x80) && Regex.NonAsciiIdentifierStart.test(ch));
    }

    function isIdentifierPart(ch) {
        return (ch === '$') || (ch === '_') || (ch === '\\') ||
            (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') ||
            ((ch >= '0') && (ch <= '9')) ||
            ((ch.charCodeAt(0) >= 0x80) && Regex.NonAsciiIdentifierPart.test(ch));
    }

    // 7.6.1.2 Future Reserved Words

    function isFutureReservedWord(id) {
        switch (id) {

        // Future reserved words.
        case 'class':
        case 'enum':
        case 'export':
        case 'extends':
        case 'import':
        case 'super':
            return true;
        }

        return false;
    }

    function isStrictModeReservedWord(id) {
        switch (id) {

        // Strict Mode reserved words.
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'yield':
        case 'let':
            return true;
        }

        return false;
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    // 7.6.1.1 Keywords

    function isKeyword(id) {
        var keyword = false;
        switch (id.length) {
        case 2:
            keyword = (id === 'if') || (id === 'in') || (id === 'do');
            break;
        case 3:
            keyword = (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
            break;
        case 4:
            keyword = (id === 'this') || (id === 'else') || (id === 'case') || (id === 'void') || (id === 'with');
            break;
        case 5:
            keyword = (id === 'while') || (id === 'break') || (id === 'catch') || (id === 'throw');
            break;
        case 6:
            keyword = (id === 'return') || (id === 'typeof') || (id === 'delete') || (id === 'switch');
            break;
        case 7:
            keyword = (id === 'default') || (id === 'finally');
            break;
        case 8:
            keyword = (id === 'function') || (id === 'continue') || (id === 'debugger');
            break;
        case 10:
            keyword = (id === 'instanceof');
            break;
        }

        if (keyword) {
            return true;
        }

        switch (id) {
        // Future reserved words.
        // 'const' is specialized as Keyword in V8.
        case 'const':
            return true;

        // For compatiblity to SpiderMonkey and ES.next
        case 'yield':
        case 'let':
            return true;
        }

        if (strict && isStrictModeReservedWord(id)) {
            return true;
        }

        return isFutureReservedWord(id);
    }

    // Return the next character and move forward.

    function nextChar() {
        return source[index++];
    }

    // 7.4 Comments

    function skipComment() {
        var ch, blockComment, lineComment;

        blockComment = false;
        lineComment = false;

        while (index < length) {
            ch = source[index];

            if (lineComment) {
                ch = nextChar();
                if (isLineTerminator(ch)) {
                    lineComment = false;
                    if (ch === '\r' && source[index] === '\n') {
                        ++index;
                    }
                    ++lineNumber;
                    lineStart = index;
                }
            } else if (blockComment) {
                if (isLineTerminator(ch)) {
                    if (ch === '\r' && source[index + 1] === '\n') {
                        ++index;
                    }
                    ++lineNumber;
                    ++index;
                    lineStart = index;
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    ch = nextChar();
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                    if (ch === '*') {
                        ch = source[index];
                        if (ch === '/') {
                            ++index;
                            blockComment = false;
                        }
                    }
                }
            } else if (ch === '/') {
                ch = source[index + 1];
                if (ch === '/') {
                    index += 2;
                    lineComment = true;
                } else if (ch === '*') {
                    index += 2;
                    blockComment = true;
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    break;
                }
            } else if (isWhiteSpace(ch)) {
                ++index;
            } else if (isLineTerminator(ch)) {
                ++index;
                if (ch ===  '\r' && source[index] === '\n') {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
            } else {
                break;
            }
        }
    }

    function scanHexEscape(prefix) {
        var i, len, ch, code = 0;

        len = (prefix === 'u') ? 4 : 2;
        for (i = 0; i < len; ++i) {
            if (index < length && isHexDigit(source[index])) {
                ch = nextChar();
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    }

    function scanIdentifier() {
        var ch, start, id, restore;

        ch = source[index];
        if (!isIdentifierStart(ch)) {
            return;
        }

        start = index;
        if (ch === '\\') {
            ++index;
            if (source[index] !== 'u') {
                return;
            }
            ++index;
            restore = index;
            ch = scanHexEscape('u');
            if (ch) {
                if (ch === '\\' || !isIdentifierStart(ch)) {
                    return;
                }
                id = ch;
            } else {
                index = restore;
                id = 'u';
            }
        } else {
            id = nextChar();
        }

        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch)) {
                break;
            }
            if (ch === '\\') {
                ++index;
                if (source[index] !== 'u') {
                    return;
                }
                ++index;
                restore = index;
                ch = scanHexEscape('u');
                if (ch) {
                    if (ch === '\\' || !isIdentifierPart(ch)) {
                        return;
                    }
                    id += ch;
                } else {
                    index = restore;
                    id += 'u';
                }
            } else {
                id += nextChar();
            }
        }

        // There is no keyword or literal with only one character.
        // Thus, it must be an identifier.
        if (id.length === 1) {
            return {
                type: Token.Identifier,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (isKeyword(id)) {
            return {
                type: Token.Keyword,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // 7.8.1 Null Literals

        if (id === 'null') {
            return {
                type: Token.NullLiteral,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // 7.8.2 Boolean Literals

        if (id === 'true' || id === 'false') {
            return {
                type: Token.BooleanLiteral,
                value: id,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        return {
            type: Token.Identifier,
            value: id,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // 7.7 Punctuators

    function scanPunctuator() {
        var start = index,
            ch1 = source[index],
            ch2,
            ch3,
            ch4;

        // Check for most common single-character punctuators.

        if (ch1 === ';' || ch1 === '{' || ch1 === '}') {
            ++index;
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === ',' || ch1 === '(' || ch1 === ')') {
            ++index;
            return {
                type: Token.Punctuator,
                value: ch1,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // Dot (.) can also start a floating-point number, hence the need
        // to check the next character.

        ch2 = source[index + 1];
        if (ch1 === '.' && !isDecimalDigit(ch2)) {
            return {
                type: Token.Punctuator,
                value: nextChar(),
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // Peek more characters.

        ch3 = source[index + 2];
        ch4 = source[index + 3];

        // 4-character punctuator: >>>=

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            if (ch4 === '=') {
                index += 4;
                return {
                    type: Token.Punctuator,
                    value: '>>>=',
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
                };
            }
        }

        // 3-character punctuators: === !== >>> <<= >>=

        if (ch1 === '=' && ch2 === '=' && ch3 === '=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '===',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '!' && ch2 === '=' && ch3 === '=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '!==',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '>') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '>>>',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '<' && ch2 === '<' && ch3 === '=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '<<=',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        if (ch1 === '>' && ch2 === '>' && ch3 === '=') {
            index += 3;
            return {
                type: Token.Punctuator,
                value: '>>=',
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }

        // 2-character punctuators: <= >= == != ++ -- << >> && ||
        // += -= *= %= &= |= ^= /=

        if (ch2 === '=') {
            if ('<>=!+-*%&|^/'.indexOf(ch1) >= 0) {
                index += 2;
                return {
                    type: Token.Punctuator,
                    value: ch1 + ch2,
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
                };
            }
        }

        if (ch1 === ch2 && ('+-<>&|'.indexOf(ch1) >= 0)) {
            if ('+-<>&|'.indexOf(ch2) >= 0) {
                index += 2;
                return {
                    type: Token.Punctuator,
                    value: ch1 + ch2,
                    lineNumber: lineNumber,
                    lineStart: lineStart,
                    range: [start, index]
                };
            }
        }

        // The remaining 1-character punctuators.

        if ('[]<>+-*%&|^!~?:=/'.indexOf(ch1) >= 0) {
            return {
                type: Token.Punctuator,
                value: nextChar(),
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [start, index]
            };
        }
    }

    // 7.8.3 Numeric Literals

    function scanNumericLiteral() {
        var number, start, ch;

        ch = source[index];
        assert(isDecimalDigit(ch) || (ch === '.'),
            'Numeric literal must start with a decimal digit or a decimal point');

        start = index;
        number = '';
        if (ch !== '.') {
            number = nextChar();
            ch = source[index];

            // Hex number starts with '0x'.
            // Octal number starts with '0'.
            if (number === '0') {
                if (ch === 'x' || ch === 'X') {
                    number += nextChar();
                    while (index < length) {
                        ch = source[index];
                        if (!isHexDigit(ch)) {
                            break;
                        }
                        number += nextChar();
                    }

                    if (number.length <= 2) {
                        // only 0x
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }

                    if (index < length) {
                        ch = source[index];
                        if (isIdentifierStart(ch)) {
                            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    }
                    return {
                        type: Token.NumericLiteral,
                        value: parseInt(number, 16),
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [start, index]
                    };
                } else if (isOctalDigit(ch)) {
                    number += nextChar();
                    while (index < length) {
                        ch = source[index];
                        if (!isOctalDigit(ch)) {
                            break;
                        }
                        number += nextChar();
                    }

                    if (index < length) {
                        ch = source[index];
                        if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
                            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                        }
                    }
                    return {
                        type: Token.NumericLiteral,
                        value: parseInt(number, 8),
                        octal: true,
                        lineNumber: lineNumber,
                        lineStart: lineStart,
                        range: [start, index]
                    };
                }

                // decimal number starts with '0' such as '09' is illegal.
                if (isDecimalDigit(ch)) {
                    throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                }
            }

            while (index < length) {
                ch = source[index];
                if (!isDecimalDigit(ch)) {
                    break;
                }
                number += nextChar();
            }
        }

        if (ch === '.') {
            number += nextChar();
            while (index < length) {
                ch = source[index];
                if (!isDecimalDigit(ch)) {
                    break;
                }
                number += nextChar();
            }
        }

        if (ch === 'e' || ch === 'E') {
            number += nextChar();

            ch = source[index];
            if (ch === '+' || ch === '-') {
                number += nextChar();
            }

            ch = source[index];
            if (isDecimalDigit(ch)) {
                number += nextChar();
                while (index < length) {
                    ch = source[index];
                    if (!isDecimalDigit(ch)) {
                        break;
                    }
                    number += nextChar();
                }
            } else {
                ch = 'character ' + ch;
                if (index >= length) {
                    ch = '<end>';
                }
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        if (index < length) {
            ch = source[index];
            if (isIdentifierStart(ch)) {
                throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
            }
        }

        return {
            type: Token.NumericLiteral,
            value: parseFloat(number),
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    // 7.8.4 String Literals

    function scanStringLiteral() {
        var str = '', quote, start, ch, code, unescaped, restore, octal = false;

        quote = source[index];
        assert((quote === '\'' || quote === '"'),
            'String literal must starts with a quote');

        start = index;
        ++index;

        while (index < length) {
            ch = nextChar();

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = nextChar();
                if (!isLineTerminator(ch)) {
                    switch (ch) {
                    case 'n':
                        str += '\n';
                        break;
                    case 'r':
                        str += '\r';
                        break;
                    case 't':
                        str += '\t';
                        break;
                    case 'u':
                    case 'x':
                        restore = index;
                        unescaped = scanHexEscape(ch);
                        if (unescaped) {
                            str += unescaped;
                        } else {
                            index = restore;
                            str += ch;
                        }
                        break;
                    case 'b':
                        str += '\b';
                        break;
                    case 'f':
                        str += '\f';
                        break;
                    case 'v':
                        str += '\v';
                        break;

                    default:
                        if (isOctalDigit(ch)) {
                            code = '01234567'.indexOf(ch);

                            // \0 is not octal escape sequence
                            if (code !== 0) {
                                octal = true;
                            }

                            if (index < length && isOctalDigit(source[index])) {
                                octal = true;
                                code = code * 8 + '01234567'.indexOf(nextChar());

                                // 3 digits are only allowed when string starts
                                // with 0, 1, 2, 3
                                if ('0123'.indexOf(ch) >= 0 &&
                                        index < length &&
                                        isOctalDigit(source[index])) {
                                    code = code * 8 + '01234567'.indexOf(nextChar());
                                }
                            }
                            str += String.fromCharCode(code);
                        } else {
                            str += ch;
                        }
                        break;
                    }
                } else {
                    ++lineNumber;
                    if (ch ===  '\r' && source[index] === '\n') {
                        ++index;
                    }
                }
            } else if (isLineTerminator(ch)) {
                break;
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
        }

        return {
            type: Token.StringLiteral,
            value: str,
            octal: octal,
            lineNumber: lineNumber,
            lineStart: lineStart,
            range: [start, index]
        };
    }

    function scanRegExp() {
        var str = '', ch, start, pattern, flags, value, classMarker = false, restore;

        buffer = null;
        skipComment();

        start = index;
        ch = source[index];
        assert(ch === '/', 'Regular expression literal must start with a slash');
        str = nextChar();

        while (index < length) {
            ch = nextChar();
            str += ch;
            if (classMarker) {
                if (ch === ']') {
                    classMarker = false;
                }
            } else {
                if (ch === '\\') {
                    ch = nextChar();
                    // ECMA-262 7.8.5
                    if (isLineTerminator(ch)) {
                        throwError({}, Messages.UnterminatedRegExp);
                    }
                    str += ch;
                } else if (ch === '/') {
                    break;
                } else if (ch === '[') {
                    classMarker = true;
                } else if (isLineTerminator(ch)) {
                    throwError({}, Messages.UnterminatedRegExp);
                }
            }
        }

        if (str.length === 1) {
            throwError({}, Messages.UnterminatedRegExp);
        }

        // Exclude leading and trailing slash.
        pattern = str.substr(1, str.length - 2);

        flags = '';
        while (index < length) {
            ch = source[index];
            if (!isIdentifierPart(ch)) {
                break;
            }

            ++index;
            if (ch === '\\' && index < length) {
                ch = source[index];
                if (ch === 'u') {
                    ++index;
                    restore = index;
                    ch = scanHexEscape('u');
                    if (ch) {
                        flags += ch;
                        str += '\\u';
                        for (; restore < index; ++restore) {
                            str += source[restore];
                        }
                    } else {
                        index = restore;
                        flags += 'u';
                        str += '\\u';
                    }
                } else {
                    str += '\\';
                }
            } else {
                flags += ch;
                str += ch;
            }
        }

        try {
            value = new RegExp(pattern, flags);
        } catch (e) {
            throwError({}, Messages.InvalidRegExp);
        }

        return {
            literal: str,
            value: value,
            range: [start, index]
        };
    }

    function isIdentifierName(token) {
        return token.type === Token.Identifier ||
            token.type === Token.Keyword ||
            token.type === Token.BooleanLiteral ||
            token.type === Token.NullLiteral;
    }

    function advance() {
        var ch, token;

        skipComment();

        if (index >= length) {
            return {
                type: Token.EOF,
                lineNumber: lineNumber,
                lineStart: lineStart,
                range: [index, index]
            };
        }

        token = scanPunctuator();
        if (typeof token !== 'undefined') {
            return token;
        }

        ch = source[index];

        if (ch === '\'' || ch === '"') {
            return scanStringLiteral();
        }

        if (ch === '.' || isDecimalDigit(ch)) {
            return scanNumericLiteral();
        }

        token = scanIdentifier();
        if (typeof token !== 'undefined') {
            return token;
        }

        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
    }

    function lex() {
        var token;

        if (buffer) {
            index = buffer.range[1];
            lineNumber = buffer.lineNumber;
            lineStart = buffer.lineStart;
            token = buffer;
            buffer = null;
            return token;
        }

        buffer = null;
        return advance();
    }

    function lookahead() {
        var pos, line, start;

        if (buffer !== null) {
            return buffer;
        }

        pos = index;
        line = lineNumber;
        start = lineStart;
        buffer = advance();
        index = pos;
        lineNumber = line;
        lineStart = start;

        return buffer;
    }

    // Return true if there is a line terminator before the next token.

    function peekLineTerminator() {
        var pos, line, start, found;

        pos = index;
        line = lineNumber;
        start = lineStart;
        skipComment();
        found = lineNumber !== line;
        index = pos;
        lineNumber = line;
        lineStart = start;

        return found;
    }

    // Throw an exception

    function throwError(token, messageFormat) {
        var error,
            args = Array.prototype.slice.call(arguments, 2),
            msg = messageFormat.replace(
                /%(\d)/g,
                function (whole, index) {
                    return args[index] || '';
                }
            );

        if (typeof token.lineNumber === 'number') {
            error = new Error('Line ' + token.lineNumber + ': ' + msg);
            error.index = token.range[0];
            error.lineNumber = token.lineNumber;
            error.column = token.range[0] - lineStart + 1;
        } else {
            error = new Error('Line ' + lineNumber + ': ' + msg);
            error.index = index;
            error.lineNumber = lineNumber;
            error.column = index - lineStart + 1;
        }

        throw error;
    }

    function throwErrorTolerant() {
        var error;
        try {
            throwError.apply(null, arguments);
        } catch (e) {
            if (extra.errors) {
                extra.errors.push(e);
            } else {
                throw e;
            }
        }
    }


    // Throw an exception because of the token.

    function throwUnexpected(token) {
        var s;

        if (token.type === Token.EOF) {
            throwError(token, Messages.UnexpectedEOS);
        }

        if (token.type === Token.NumericLiteral) {
            throwError(token, Messages.UnexpectedNumber);
        }

        if (token.type === Token.StringLiteral) {
            throwError(token, Messages.UnexpectedString);
        }

        if (token.type === Token.Identifier) {
            throwError(token, Messages.UnexpectedIdentifier);
        }

        if (token.type === Token.Keyword) {
            if (isFutureReservedWord(token.value)) {
                throwError(token, Messages.UnexpectedReserved);
            } else if (strict && isStrictModeReservedWord(token.value)) {
                throwError(token, Messages.StrictReservedWord);
            }
            throwError(token, Messages.UnexpectedToken, token.value);
        }

        // BooleanLiteral, NullLiteral, or Punctuator.
        throwError(token, Messages.UnexpectedToken, token.value);
    }

    // Expect the next token to match the specified punctuator.
    // If not, an exception will be thrown.

    function expect(value) {
        var token = lex();
        if (token.type !== Token.Punctuator || token.value !== value) {
            throwUnexpected(token);
        }
    }

    // Expect the next token to match the specified keyword.
    // If not, an exception will be thrown.

    function expectKeyword(keyword) {
        var token = lex();
        if (token.type !== Token.Keyword || token.value !== keyword) {
            throwUnexpected(token);
        }
    }

    // Return true if the next token matches the specified punctuator.

    function match(value) {
        var token = lookahead();
        return token.type === Token.Punctuator && token.value === value;
    }

    // Return true if the next token matches the specified keyword

    function matchKeyword(keyword) {
        var token = lookahead();
        return token.type === Token.Keyword && token.value === keyword;
    }

    // Return true if the next token is an assignment operator

    function matchAssign() {
        var token = lookahead(),
            op = token.value;

        if (token.type !== Token.Punctuator) {
            return false;
        }
        return op === '=' ||
            op === '*=' ||
            op === '/=' ||
            op === '%=' ||
            op === '+=' ||
            op === '-=' ||
            op === '<<=' ||
            op === '>>=' ||
            op === '>>>=' ||
            op === '&=' ||
            op === '^=' ||
            op === '|=';
    }

    function consumeSemicolon() {
        var token, line;

        // Catch the very common case first.
        if (source[index] === ';') {
            lex();
            return;
        }

        line = lineNumber;
        skipComment();
        if (lineNumber !== line) {
            return;
        }

        if (match(';')) {
            lex();
            return;
        }

        token = lookahead();
        if (token.type !== Token.EOF && !match('}')) {
            throwUnexpected(token);
        }
        return;
    }

    // Return true if provided expression is LeftHandSideExpression

    function isLeftHandSide(expr) {
        return expr.type === Syntax.Identifier || expr.type === Syntax.MemberExpression;
    }

    // 11.1.4 Array Initialiser

    function parseArrayInitialiser() {
        var elements = [],
            undef;

        expect('[');

        while (!match(']')) {
            if (match(',')) {
                lex();
                elements.push(undef);
            } else {
                elements.push(parseAssignmentExpression());

                if (!match(']')) {
                    expect(',');
                }
            }
        }

        expect(']');

        return {
            type: Syntax.ArrayExpression,
            elements: elements
        };
    }

    // 11.1.5 Object Initialiser

    function parsePropertyFunction(param, first) {
        var previousStrict, body;

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (first && strict && isRestrictedWord(param[0].name)) {
            throwError(first, Messages.StrictParamName);
        }
        strict = previousStrict;

        return {
            type: Syntax.FunctionExpression,
            id: null,
            params: param,
            body: body
        };
    }

    function parseObjectPropertyKey() {
        var token = lex();

        // Note: This function is called only from parseObjectProperty(), where
        // EOF and Punctuator tokens are already filtered out.

        if (token.type === Token.StringLiteral || token.type === Token.NumericLiteral) {
            if (strict && token.octal) {
                throwError(token, Messages.StrictOctalLiteral);
            }
            return createLiteral(token);
        }

        return {
            type: Syntax.Identifier,
            name: token.value
        };
    }

    function parseObjectProperty() {
        var token, key, id, param;

        token = lookahead();

        if (token.type === Token.Identifier) {

            id = parseObjectPropertyKey();

            // Property Assignment: Getter and Setter.

            if (token.value === 'get' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                expect(')');
                return {
                    type: Syntax.Property,
                    key: key,
                    value: parsePropertyFunction([]),
                    kind: 'get'
                };
            } else if (token.value === 'set' && !match(':')) {
                key = parseObjectPropertyKey();
                expect('(');
                token = lookahead();
                if (token.type !== Token.Identifier) {
                    throwUnexpected(lex());
                }
                param = [ parseVariableIdentifier() ];
                expect(')');
                return {
                    type: Syntax.Property,
                    key: key,
                    value: parsePropertyFunction(param, token),
                    kind: 'set'
                };
            } else {
                expect(':');
                return {
                    type: Syntax.Property,
                    key: id,
                    value: parseAssignmentExpression(),
                    kind: 'init'
                };
            }
        } else if (token.type === Token.EOF || token.type === Token.Punctuator) {
            throwUnexpected(token);
        } else {
            key = parseObjectPropertyKey();
            expect(':');
            return {
                type: Syntax.Property,
                key: key,
                value: parseAssignmentExpression(),
                kind: 'init'
            };
        }
    }

    function parseObjectInitialiser() {
        var token, properties = [], property, name, kind, map = {}, toString = String;

        expect('{');

        while (!match('}')) {
            property = parseObjectProperty();

            if (property.key.type === Syntax.Identifier) {
                name = property.key.name;
            } else {
                name = toString(property.key.value);
            }
            kind = (property.kind === 'init') ? PropertyKind.Data : (property.kind === 'get') ? PropertyKind.Get : PropertyKind.Set;
            if (Object.prototype.hasOwnProperty.call(map, name)) {
                if (map[name] === PropertyKind.Data) {
                    if (strict && kind === PropertyKind.Data) {
                        throwErrorTolerant({}, Messages.StrictDuplicateProperty);
                    } else if (kind !== PropertyKind.Data) {
                        throwError({}, Messages.AccessorDataProperty);
                    }
                } else {
                    if (kind === PropertyKind.Data) {
                        throwError({}, Messages.AccessorDataProperty);
                    } else if (map[name] & kind) {
                        throwError({}, Messages.AccessorGetSet);
                    }
                }
                map[name] |= kind;
            } else {
                map[name] = kind;
            }

            properties.push(property);

            if (!match('}')) {
                expect(',');
            }
        }

        expect('}');

        return {
            type: Syntax.ObjectExpression,
            properties: properties
        };
    }

    // 11.1 Primary Expressions

    function parsePrimaryExpression() {
        var expr,
            token = lookahead(),
            type = token.type;

        if (type === Token.Identifier) {
            return {
                type: Syntax.Identifier,
                name: lex().value
            };
        }

        if (type === Token.StringLiteral || type === Token.NumericLiteral) {
            if (strict && token.octal) {
                throwErrorTolerant(token, Messages.StrictOctalLiteral);
            }
            return createLiteral(lex());
        }

        if (type === Token.Keyword) {
            if (matchKeyword('this')) {
                lex();
                return {
                    type: Syntax.ThisExpression
                };
            }

            if (matchKeyword('function')) {
                return parseFunctionExpression();
            }
        }

        if (type === Token.BooleanLiteral) {
            lex();
            token.value = (token.value === 'true');
            return createLiteral(token);
        }

        if (type === Token.NullLiteral) {
            lex();
            token.value = null;
            return createLiteral(token);
        }

        if (match('[')) {
            return parseArrayInitialiser();
        }

        if (match('{')) {
            return parseObjectInitialiser();
        }

        if (match('(')) {
            lex();
            state.lastParenthesized = expr = parseExpression();
            expect(')');
            return expr;
        }

        if (match('/') || match('/=')) {
            return createLiteral(scanRegExp());
        }

        return throwUnexpected(lex());
    }

    // 11.2 Left-Hand-Side Expressions

    function parseArguments() {
        var args = [];

        expect('(');

        if (!match(')')) {
            while (index < length) {
                args.push(parseAssignmentExpression());
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        return args;
    }

    function parseNonComputedProperty() {
        var token = lex();

        if (!isIdentifierName(token)) {
            throwUnexpected(token);
        }

        return {
            type: Syntax.Identifier,
            name: token.value
        };
    }

    function parseNonComputedMember(object) {
        return {
            type: Syntax.MemberExpression,
            computed: false,
            object: object,
            property: parseNonComputedProperty()
        };
    }

    function parseComputedMember(object) {
        var property, expr;

        expect('[');
        property = parseExpression();
        expr = {
            type: Syntax.MemberExpression,
            computed: true,
            object: object,
            property: property
        };
        expect(']');
        return expr;
    }

    function parseCallMember(object) {
        return {
            type: Syntax.CallExpression,
            callee: object,
            'arguments': parseArguments()
        };
    }

    function parseNewExpression() {
        var expr;

        expectKeyword('new');

        expr = {
            type: Syntax.NewExpression,
            callee: parseLeftHandSideExpression(),
            'arguments': []
        };

        if (match('(')) {
            expr['arguments'] = parseArguments();
        }

        return expr;
    }

    function parseLeftHandSideExpressionAllowCall() {
        var useNew, expr;

        useNew = matchKeyword('new');
        expr = useNew ? parseNewExpression() : parsePrimaryExpression();

        while (index < length) {
            if (match('.')) {
                lex();
                expr = parseNonComputedMember(expr);
            } else if (match('[')) {
                expr = parseComputedMember(expr);
            } else if (match('(')) {
                expr = parseCallMember(expr);
            } else {
                break;
            }
        }

        return expr;
    }

    function parseLeftHandSideExpression() {
        var useNew, expr;

        useNew = matchKeyword('new');
        expr = useNew ? parseNewExpression() : parsePrimaryExpression();

        while (index < length) {
            if (match('.')) {
                lex();
                expr = parseNonComputedMember(expr);
            } else if (match('[')) {
                expr = parseComputedMember(expr);
            } else {
                break;
            }
        }

        return expr;
    }

    // 11.3 Postfix Expressions

    function parsePostfixExpression() {
        var expr = parseLeftHandSideExpressionAllowCall();

        if ((match('++') || match('--')) && !peekLineTerminator()) {
            // 11.3.1, 11.3.2
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwError({}, Messages.StrictLHSPostfix);
            }

            if (!isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }

            expr = {
                type: Syntax.UpdateExpression,
                operator: lex().value,
                argument: expr,
                prefix: false
            };
        }

        return expr;
    }

    // 11.4 Unary Operators

    function parseUnaryExpression() {
        var token, expr;

        if (match('++') || match('--')) {
            token = lex();
            expr = parseUnaryExpression();
            // 11.4.4, 11.4.5
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwError({}, Messages.StrictLHSPrefix);
            }

            if (!isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }

            expr = {
                type: Syntax.UpdateExpression,
                operator: token.value,
                argument: expr,
                prefix: true
            };
            return expr;
        }

        if (match('+') || match('-') || match('~') || match('!')) {
            expr = {
                type: Syntax.UnaryExpression,
                operator: lex().value,
                argument: parseUnaryExpression()
            };
            return expr;
        }

        if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
            expr = {
                type: Syntax.UnaryExpression,
                operator: lex().value,
                argument: parseUnaryExpression()
            };
            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
                throwErrorTolerant({}, Messages.StrictDelete);
            }
            return expr;
        }

        return parsePostfixExpression();
    }

    // 11.5 Multiplicative Operators

    function parseMultiplicativeExpression() {
        var expr = parseUnaryExpression();

        while (match('*') || match('/') || match('%')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseUnaryExpression()
            };
        }

        return expr;
    }

    // 11.6 Additive Operators

    function parseAdditiveExpression() {
        var expr = parseMultiplicativeExpression();

        while (match('+') || match('-')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseMultiplicativeExpression()
            };
        }

        return expr;
    }

    // 11.7 Bitwise Shift Operators

    function parseShiftExpression() {
        var expr = parseAdditiveExpression();

        while (match('<<') || match('>>') || match('>>>')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseAdditiveExpression()
            };
        }

        return expr;
    }
    // 11.8 Relational Operators

    function parseRelationalExpression() {
        var expr, previousAllowIn;

        previousAllowIn = state.allowIn;
        state.allowIn = true;

        expr = parseShiftExpression();

        while (match('<') || match('>') || match('<=') || match('>=') || (previousAllowIn && matchKeyword('in')) || matchKeyword('instanceof')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseShiftExpression()
            };
        }

        state.allowIn = previousAllowIn;
        return expr;
    }

    // 11.9 Equality Operators

    function parseEqualityExpression() {
        var expr = parseRelationalExpression();

        while (match('==') || match('!=') || match('===') || match('!==')) {
            expr = {
                type: Syntax.BinaryExpression,
                operator: lex().value,
                left: expr,
                right: parseRelationalExpression()
            };
        }

        return expr;
    }

    // 11.10 Binary Bitwise Operators

    function parseBitwiseANDExpression() {
        var expr = parseEqualityExpression();

        while (match('&')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: '&',
                left: expr,
                right: parseEqualityExpression()
            };
        }

        return expr;
    }

    function parseBitwiseXORExpression() {
        var expr = parseBitwiseANDExpression();

        while (match('^')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: '^',
                left: expr,
                right: parseBitwiseANDExpression()
            };
        }

        return expr;
    }

    function parseBitwiseORExpression() {
        var expr = parseBitwiseXORExpression();

        while (match('|')) {
            lex();
            expr = {
                type: Syntax.BinaryExpression,
                operator: '|',
                left: expr,
                right: parseBitwiseXORExpression()
            };
        }

        return expr;
    }

    // 11.11 Binary Logical Operators

    function parseLogicalANDExpression() {
        var expr = parseBitwiseORExpression();

        while (match('&&')) {
            lex();
            expr = {
                type: Syntax.LogicalExpression,
                operator: '&&',
                left: expr,
                right: parseBitwiseORExpression()
            };
        }

        return expr;
    }

    function parseLogicalORExpression() {
        var expr = parseLogicalANDExpression();

        while (match('||')) {
            lex();
            expr = {
                type: Syntax.LogicalExpression,
                operator: '||',
                left: expr,
                right: parseLogicalANDExpression()
            };
        }

        return expr;
    }

    // 11.12 Conditional Operator

    function parseConditionalExpression() {
        var expr, previousAllowIn, consequent;

        expr = parseLogicalORExpression();

        if (match('?')) {
            lex();
            previousAllowIn = state.allowIn;
            state.allowIn = true;
            consequent = parseAssignmentExpression();
            state.allowIn = previousAllowIn;
            expect(':');

            expr = {
                type: Syntax.ConditionalExpression,
                test: expr,
                consequent: consequent,
                alternate: parseAssignmentExpression()
            };
        }

        return expr;
    }

    // 11.13 Assignment Operators

    function parseAssignmentExpression() {
        var expr;

        expr = parseConditionalExpression();

        if (matchAssign()) {
            // LeftHandSideExpression
            if (!isLeftHandSide(expr)) {
                throwError({}, Messages.InvalidLHSInAssignment);
            }

            // 11.13.1
            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
                throwError({}, Messages.StrictLHSAssignment);
            }

            expr = {
                type: Syntax.AssignmentExpression,
                operator: lex().value,
                left: expr,
                right: parseAssignmentExpression()
            };
        }

        return expr;
    }

    // 11.14 Comma Operator

    function parseExpression() {
        var expr = parseAssignmentExpression();

        if (match(',')) {
            expr = {
                type: Syntax.SequenceExpression,
                expressions: [ expr ]
            };

            while (index < length) {
                if (!match(',')) {
                    break;
                }
                lex();
                expr.expressions.push(parseAssignmentExpression());
            }

        }
        return expr;
    }

    // 12.1 Block

    function parseStatementList() {
        var list = [],
            statement;

        while (index < length) {
            if (match('}')) {
                break;
            }
            statement = parseSourceElement();
            if (typeof statement === 'undefined') {
                break;
            }
            list.push(statement);
        }

        return list;
    }

    function parseBlock() {
        var block;

        expect('{');

        block = parseStatementList();

        expect('}');

        return {
            type: Syntax.BlockStatement,
            body: block
        };
    }

    // 12.2 Variable Statement

    function parseVariableIdentifier() {
        var token = lex();

        if (token.type !== Token.Identifier) {
            throwUnexpected(token);
        }

        return {
            type: Syntax.Identifier,
            name: token.value
        };
    }

    function parseVariableDeclaration(kind) {
        var id = parseVariableIdentifier(),
            init = null;

        // 12.2.1
        if (strict && isRestrictedWord(id.name)) {
            throwErrorTolerant({}, Messages.StrictVarName);
        }

        if (kind === 'const') {
            expect('=');
            init = parseAssignmentExpression();
        } else if (match('=')) {
            lex();
            init = parseAssignmentExpression();
        }

        return {
            type: Syntax.VariableDeclarator,
            id: id,
            init: init
        };
    }

    function parseVariableDeclarationList(kind) {
        var list = [];

        while (index < length) {
            list.push(parseVariableDeclaration(kind));
            if (!match(',')) {
                break;
            }
            lex();
        }

        return list;
    }

    function parseVariableStatement() {
        var declarations;

        expectKeyword('var');

        declarations = parseVariableDeclarationList();

        consumeSemicolon();

        return {
            type: Syntax.VariableDeclaration,
            declarations: declarations,
            kind: 'var'
        };
    }

    // kind may be `const` or `let`
    // Both are experimental and not in the specification yet.
    // see http://wiki.ecmascript.org/doku.php?id=harmony:const
    // and http://wiki.ecmascript.org/doku.php?id=harmony:let
    function parseConstLetDeclaration(kind) {
        var declarations;

        expectKeyword(kind);

        declarations = parseVariableDeclarationList(kind);

        consumeSemicolon();

        return {
            type: Syntax.VariableDeclaration,
            declarations: declarations,
            kind: kind
        };
    }

    // 12.3 Empty Statement

    function parseEmptyStatement() {
        expect(';');

        return {
            type: Syntax.EmptyStatement
        };
    }

    // 12.4 Expression Statement

    function parseExpressionStatement() {
        var expr = parseExpression();

        consumeSemicolon();

        return {
            type: Syntax.ExpressionStatement,
            expression: expr
        };
    }

    // 12.5 If statement

    function parseIfStatement() {
        var test, consequent, alternate;

        expectKeyword('if');

        expect('(');

        test = parseExpression();

        expect(')');

        consequent = parseStatement();

        if (matchKeyword('else')) {
            lex();
            alternate = parseStatement();
        } else {
            alternate = null;
        }

        return {
            type: Syntax.IfStatement,
            test: test,
            consequent: consequent,
            alternate: alternate
        };
    }

    // 12.6 Iteration Statements

    function parseDoWhileStatement() {
        var body, test, oldInIteration;

        expectKeyword('do');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        if (match(';')) {
            lex();
        }

        return {
            type: Syntax.DoWhileStatement,
            body: body,
            test: test
        };
    }

    function parseWhileStatement() {
        var test, body, oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        return {
            type: Syntax.WhileStatement,
            test: test,
            body: body
        };
    }

    function parseForVariableDeclaration() {
        var token = lex();

        return {
            type: Syntax.VariableDeclaration,
            declarations: parseVariableDeclarationList(),
            kind: token.value
        };
    }

    function parseForStatement() {
        var init, test, update, left, right, body, oldInIteration;

        init = test = update = null;

        expectKeyword('for');

        expect('(');

        if (match(';')) {
            lex();
        } else {
            if (matchKeyword('var') || matchKeyword('let')) {
                state.allowIn = false;
                init = parseForVariableDeclaration();
                state.allowIn = true;

                if (init.declarations.length === 1 && matchKeyword('in')) {
                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            } else {
                state.allowIn = false;
                init = parseExpression();
                state.allowIn = true;

                if (matchKeyword('in')) {
                    // LeftHandSideExpression
                    if (!isLeftHandSide(init)) {
                        throwError({}, Messages.InvalidLHSInForIn);
                    }

                    lex();
                    left = init;
                    right = parseExpression();
                    init = null;
                }
            }

            if (typeof left === 'undefined') {
                expect(';');
            }
        }

        if (typeof left === 'undefined') {

            if (!match(';')) {
                test = parseExpression();
            }
            expect(';');

            if (!match(')')) {
                update = parseExpression();
            }
        }

        expect(')');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        if (typeof left === 'undefined') {
            return {
                type: Syntax.ForStatement,
                init: init,
                test: test,
                update: update,
                body: body
            };
        }

        return {
            type: Syntax.ForInStatement,
            left: left,
            right: right,
            body: body,
            each: false
        };
    }

    // 12.7 The continue statement

    function parseContinueStatement() {
        var token, label = null;

        expectKeyword('continue');

        // Optimize the most common form: 'continue;'.
        if (source[index] === ';') {
            lex();

            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return {
                type: Syntax.ContinueStatement,
                label: null
            };
        }

        if (peekLineTerminator()) {
            if (!state.inIteration) {
                throwError({}, Messages.IllegalContinue);
            }

            return {
                type: Syntax.ContinueStatement,
                label: null
            };
        }

        token = lookahead();
        if (token.type === Token.Identifier) {
            label = parseVariableIdentifier();

            if (!Object.prototype.hasOwnProperty.call(state.labelSet, label.name)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !state.inIteration) {
            throwError({}, Messages.IllegalContinue);
        }

        return {
            type: Syntax.ContinueStatement,
            label: label
        };
    }

    // 12.8 The break statement

    function parseBreakStatement() {
        var token, label = null;

        expectKeyword('break');

        // Optimize the most common form: 'break;'.
        if (source[index] === ';') {
            lex();

            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return {
                type: Syntax.BreakStatement,
                label: null
            };
        }

        if (peekLineTerminator()) {
            if (!(state.inIteration || state.inSwitch)) {
                throwError({}, Messages.IllegalBreak);
            }

            return {
                type: Syntax.BreakStatement,
                label: null
            };
        }

        token = lookahead();
        if (token.type === Token.Identifier) {
            label = parseVariableIdentifier();

            if (!Object.prototype.hasOwnProperty.call(state.labelSet, label.name)) {
                throwError({}, Messages.UnknownLabel, label.name);
            }
        }

        consumeSemicolon();

        if (label === null && !(state.inIteration || state.inSwitch)) {
            throwError({}, Messages.IllegalBreak);
        }

        return {
            type: Syntax.BreakStatement,
            label: label
        };
    }

    // 12.9 The return statement

    function parseReturnStatement() {
        var token, argument = null;

        expectKeyword('return');

        if (!state.inFunctionBody) {
            throwErrorTolerant({}, Messages.IllegalReturn);
        }

        // 'return' followed by a space and an identifier is very common.
        if (source[index] === ' ') {
            if (isIdentifierStart(source[index + 1])) {
                argument = parseExpression();
                consumeSemicolon();
                return {
                    type: Syntax.ReturnStatement,
                    argument: argument
                };
            }
        }

        if (peekLineTerminator()) {
            return {
                type: Syntax.ReturnStatement,
                argument: null
            };
        }

        if (!match(';')) {
            token = lookahead();
            if (!match('}') && token.type !== Token.EOF) {
                argument = parseExpression();
            }
        }

        consumeSemicolon();

        return {
            type: Syntax.ReturnStatement,
            argument: argument
        };
    }

    // 12.10 The with statement

    function parseWithStatement() {
        var object, body;

        if (strict) {
            throwErrorTolerant({}, Messages.StrictModeWith);
        }

        expectKeyword('with');

        expect('(');

        object = parseExpression();

        expect(')');

        body = parseStatement();

        return {
            type: Syntax.WithStatement,
            object: object,
            body: body
        };
    }

    // 12.10 The swith statement

    function parseSwitchCase() {
        var test,
            consequent = [],
            statement;

        if (matchKeyword('default')) {
            lex();
            test = null;
        } else {
            expectKeyword('case');
            test = parseExpression();
        }
        expect(':');

        while (index < length) {
            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
                break;
            }
            statement = parseStatement();
            if (typeof statement === 'undefined') {
                break;
            }
            consequent.push(statement);
        }

        return {
            type: Syntax.SwitchCase,
            test: test,
            consequent: consequent
        };
    }

    function parseSwitchStatement() {
        var discriminant, cases, oldInSwitch;

        expectKeyword('switch');

        expect('(');

        discriminant = parseExpression();

        expect(')');

        expect('{');

        if (match('}')) {
            lex();
            return {
                type: Syntax.SwitchStatement,
                discriminant: discriminant
            };
        }

        cases = [];

        oldInSwitch = state.inSwitch;
        state.inSwitch = true;

        while (index < length) {
            if (match('}')) {
                break;
            }
            cases.push(parseSwitchCase());
        }

        state.inSwitch = oldInSwitch;

        expect('}');

        return {
            type: Syntax.SwitchStatement,
            discriminant: discriminant,
            cases: cases
        };
    }

    // 12.13 The throw statement

    function parseThrowStatement() {
        var argument;

        expectKeyword('throw');

        if (peekLineTerminator()) {
            throwError({}, Messages.NewlineAfterThrow);
        }

        argument = parseExpression();

        consumeSemicolon();

        return {
            type: Syntax.ThrowStatement,
            argument: argument
        };
    }

    // 12.14 The try statement

    function parseCatchClause() {
        var param;

        expectKeyword('catch');

        expect('(');
        if (!match(')')) {
            param = parseExpression();
            // 12.14.1
            if (strict && param.type === Syntax.Identifier && isRestrictedWord(param.name)) {
                throwErrorTolerant({}, Messages.StrictCatchVariable);
            }
        }
        expect(')');

        return {
            type: Syntax.CatchClause,
            param: param,
            guard: null,
            body: parseBlock()
        };
    }

    function parseTryStatement() {
        var block, handlers = [], finalizer = null;

        expectKeyword('try');

        block = parseBlock();

        if (matchKeyword('catch')) {
            handlers.push(parseCatchClause());
        }

        if (matchKeyword('finally')) {
            lex();
            finalizer = parseBlock();
        }

        if (handlers.length === 0 && !finalizer) {
            throwError({}, Messages.NoCatchOrFinally);
        }

        return {
            type: Syntax.TryStatement,
            block: block,
            handlers: handlers,
            finalizer: finalizer
        };
    }

    // 12.15 The debugger statement

    function parseDebuggerStatement() {
        expectKeyword('debugger');

        consumeSemicolon();

        return {
            type: Syntax.DebuggerStatement
        };
    }

    // 12 Statements

    function parseStatement() {
        var token = lookahead(),
            expr,
            labeledBody;

        if (token.type === Token.EOF) {
            throwUnexpected(token);
        }

        if (token.type === Token.Punctuator) {
            switch (token.value) {
            case ';':
                return parseEmptyStatement();
            case '{':
                return parseBlock();
            case '(':
                return parseExpressionStatement();
            default:
                break;
            }
        }

        if (token.type === Token.Keyword) {
            switch (token.value) {
            case 'break':
                return parseBreakStatement();
            case 'continue':
                return parseContinueStatement();
            case 'debugger':
                return parseDebuggerStatement();
            case 'do':
                return parseDoWhileStatement();
            case 'for':
                return parseForStatement();
            case 'function':
                return parseFunctionDeclaration();
            case 'if':
                return parseIfStatement();
            case 'return':
                return parseReturnStatement();
            case 'switch':
                return parseSwitchStatement();
            case 'throw':
                return parseThrowStatement();
            case 'try':
                return parseTryStatement();
            case 'var':
                return parseVariableStatement();
            case 'while':
                return parseWhileStatement();
            case 'with':
                return parseWithStatement();
            default:
                break;
            }
        }

        expr = parseExpression();

        // 12.12 Labelled Statements
        if ((expr.type === Syntax.Identifier) && match(':')) {
            lex();

            if (Object.prototype.hasOwnProperty.call(state.labelSet, expr.name)) {
                throwError({}, Messages.Redeclaration, 'Label', expr.name);
            }

            state.labelSet[expr.name] = true;
            labeledBody = parseStatement();
            delete state.labelSet[expr.name];

            return {
                type: Syntax.LabeledStatement,
                label: expr,
                body: labeledBody
            };
        }

        consumeSemicolon();

        return {
            type: Syntax.ExpressionStatement,
            expression: expr
        };
    }

    // 13 Function Definition

    function parseFunctionSourceElements() {
        var sourceElement, sourceElements = [], token, directive, firstRestricted,
            oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody;

        expect('{');

        while (index < length) {
            token = lookahead();
            if (token.type !== Token.StringLiteral) {
                break;
            }

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwError(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        oldLabelSet = state.labelSet;
        oldInIteration = state.inIteration;
        oldInSwitch = state.inSwitch;
        oldInFunctionBody = state.inFunctionBody;

        state.labelSet = {};
        state.inIteration = false;
        state.inSwitch = false;
        state.inFunctionBody = true;

        while (index < length) {
            if (match('}')) {
                break;
            }
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }

        expect('}');

        state.labelSet = oldLabelSet;
        state.inIteration = oldInIteration;
        state.inSwitch = oldInSwitch;
        state.inFunctionBody = oldInFunctionBody;

        return {
            type: Syntax.BlockStatement,
            body: sourceElements
        };
    }

    function parseFunctionDeclaration() {
        var id, param, params = [], body, token, firstRestricted, message, previousStrict, paramSet;

        expectKeyword('function');
        token = lookahead();
        id = parseVariableIdentifier();
        if (strict) {
            if (isRestrictedWord(token.value)) {
                throwError(token, Messages.StrictFunctionName);
            }
        } else {
            if (isRestrictedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictFunctionName;
            } else if (isStrictModeReservedWord(token.value)) {
                firstRestricted = token;
                message = Messages.StrictReservedWord;
            }
        }

        expect('(');

        if (!match(')')) {
            paramSet = {};
            while (index < length) {
                token = lookahead();
                param = parseVariableIdentifier();
                if (strict) {
                    if (isRestrictedWord(token.value)) {
                        throwError(token, Messages.StrictParamName);
                    }
                    if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
                        throwError(token, Messages.StrictParamDupe);
                    }
                } else if (!firstRestricted) {
                    if (isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamName;
                    } else if (isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictReservedWord;
                    } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamDupe;
                    }
                }
                params.push(param);
                paramSet[param.name] = true;
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        strict = previousStrict;

        return {
            type: Syntax.FunctionDeclaration,
            id: id,
            params: params,
            body: body
        };
    }

    function parseFunctionExpression() {
        var token, id = null, firstRestricted, message, param, params = [], body, previousStrict, paramSet;

        expectKeyword('function');

        if (!match('(')) {
            token = lookahead();
            id = parseVariableIdentifier();
            if (strict) {
                if (isRestrictedWord(token.value)) {
                    throwError(token, Messages.StrictFunctionName);
                }
            } else {
                if (isRestrictedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictFunctionName;
                } else if (isStrictModeReservedWord(token.value)) {
                    firstRestricted = token;
                    message = Messages.StrictReservedWord;
                }
            }
        }

        expect('(');

        if (!match(')')) {
            paramSet = {};
            while (index < length) {
                token = lookahead();
                param = parseVariableIdentifier();
                if (strict) {
                    if (isRestrictedWord(token.value)) {
                        throwError(token, Messages.StrictParamName);
                    }
                    if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
                        throwError(token, Messages.StrictParamDupe);
                    }
                } else if (!firstRestricted) {
                    if (isRestrictedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamName;
                    } else if (isStrictModeReservedWord(token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictReservedWord;
                    } else if (Object.prototype.hasOwnProperty.call(paramSet, token.value)) {
                        firstRestricted = token;
                        message = Messages.StrictParamDupe;
                    }
                }
                params.push(param);
                paramSet[param.name] = true;
                if (match(')')) {
                    break;
                }
                expect(',');
            }
        }

        expect(')');

        previousStrict = strict;
        body = parseFunctionSourceElements();
        if (strict && firstRestricted) {
            throwError(firstRestricted, message);
        }
        strict = previousStrict;

        return {
            type: Syntax.FunctionExpression,
            id: id,
            params: params,
            body: body
        };
    }

    // 14 Program

    function parseSourceElement() {
        var token = lookahead();

        if (token.type === Token.Keyword) {
            switch (token.value) {
            case 'const':
            case 'let':
                return parseConstLetDeclaration(token.value);
            case 'function':
                return parseFunctionDeclaration();
            default:
                return parseStatement();
            }
        }

        if (token.type !== Token.EOF) {
            return parseStatement();
        }
    }

    function parseSourceElements() {
        var sourceElement, sourceElements = [], token, directive, firstRestricted;

        while (index < length) {
            token = lookahead();
            if (token.type !== Token.StringLiteral) {
                break;
            }

            sourceElement = parseSourceElement();
            sourceElements.push(sourceElement);
            if (sourceElement.expression.type !== Syntax.Literal) {
                // this is not directive
                break;
            }
            directive = sliceSource(token.range[0] + 1, token.range[1] - 1);
            if (directive === 'use strict') {
                strict = true;
                if (firstRestricted) {
                    throwError(firstRestricted, Messages.StrictOctalLiteral);
                }
            } else {
                if (!firstRestricted && token.octal) {
                    firstRestricted = token;
                }
            }
        }

        while (index < length) {
            sourceElement = parseSourceElement();
            if (typeof sourceElement === 'undefined') {
                break;
            }
            sourceElements.push(sourceElement);
        }
        return sourceElements;
    }

    function parseProgram() {
        var program;
        strict = false;
        program = {
            type: Syntax.Program,
            body: parseSourceElements()
        };
        return program;
    }

    // The following functions are needed only when the option to preserve
    // the comments is active.

    function addComment(start, end, type, value) {
        assert(typeof start === 'number', 'Comment must have valid position');

        // Because the way the actual token is scanned, often the comments
        // (if any) are skipped twice during the lexical analysis.
        // Thus, we need to skip adding a comment if the comment array already
        // handled it.
        if (extra.comments.length > 0) {
            if (extra.comments[extra.comments.length - 1].range[1] > start) {
                return;
            }
        }

        extra.comments.push({
            range: [start, end],
            type: type,
            value: value
        });
    }

    function scanComment() {
        var comment, ch, start, blockComment, lineComment;

        comment = '';
        blockComment = false;
        lineComment = false;

        while (index < length) {
            ch = source[index];

            if (lineComment) {
                ch = nextChar();
                if (index >= length) {
                    lineComment = false;
                    comment += ch;
                    addComment(start, index, 'Line', comment);
                } else if (isLineTerminator(ch)) {
                    lineComment = false;
                    addComment(start, index, 'Line', comment);
                    if (ch === '\r' && source[index] === '\n') {
                        ++index;
                    }
                    ++lineNumber;
                    lineStart = index;
                    comment = '';
                } else {
                    comment += ch;
                }
            } else if (blockComment) {
                if (isLineTerminator(ch)) {
                    if (ch === '\r' && source[index + 1] === '\n') {
                        ++index;
                        comment += '\r\n';
                    } else {
                        comment += ch;
                    }
                    ++lineNumber;
                    ++index;
                    lineStart = index;
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    ch = nextChar();
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                    comment += ch;
                    if (ch === '*') {
                        ch = source[index];
                        if (ch === '/') {
                            comment = comment.substr(0, comment.length - 1);
                            blockComment = false;
                            ++index;
                            addComment(start, index, 'Block', comment);
                            comment = '';
                        }
                    }
                }
            } else if (ch === '/') {
                ch = source[index + 1];
                if (ch === '/') {
                    start = index;
                    index += 2;
                    lineComment = true;
                } else if (ch === '*') {
                    start = index;
                    index += 2;
                    blockComment = true;
                    if (index >= length) {
                        throwError({}, Messages.UnexpectedToken, 'ILLEGAL');
                    }
                } else {
                    break;
                }
            } else if (isWhiteSpace(ch)) {
                ++index;
            } else if (isLineTerminator(ch)) {
                ++index;
                if (ch ===  '\r' && source[index] === '\n') {
                    ++index;
                }
                ++lineNumber;
                lineStart = index;
            } else {
                break;
            }
        }
    }

    function collectToken() {
        var token = extra.advance(),
            range,
            value;

        if (token.type !== Token.EOF) {
            range = [token.range[0], token.range[1]];
            value = sliceSource(token.range[0], token.range[1]);
            extra.tokens.push({
                type: TokenName[token.type],
                value: value,
                range: range
            });
        }

        return token;
    }

    function collectRegex() {
        var pos, regex, token;

        skipComment();

        pos = index;
        regex = extra.scanRegExp();

        // Pop the previous token, which is likely '/' or '/='
        if (extra.tokens.length > 0) {
            token = extra.tokens[extra.tokens.length - 1];
            if (token.range[0] === pos && token.type === 'Punctuator') {
                if (token.value === '/' || token.value === '/=') {
                    extra.tokens.pop();
                }
            }
        }

        extra.tokens.push({
            type: 'RegularExpression',
            value: regex.literal,
            range: [pos, index]
        });

        return regex;
    }

    function createLiteral(token) {
        return {
            type: Syntax.Literal,
            value: token.value
        };
    }

    function createRawLiteral(token) {
        return {
            type: Syntax.Literal,
            value: token.value,
            raw: sliceSource(token.range[0], token.range[1])
        };
    }

    function wrapTrackingFunction(range, loc) {

        return function (parseFunction) {

            function isBinary(node) {
                return node.type === Syntax.LogicalExpression ||
                    node.type === Syntax.BinaryExpression;
            }

            function visit(node) {
                if (isBinary(node.left)) {
                    visit(node.left);
                }
                if (isBinary(node.right)) {
                    visit(node.right);
                }

                if (range && typeof node.range === 'undefined') {
                    node.range = [node.left.range[0], node.right.range[1]];
                }
                if (loc && typeof node.loc === 'undefined') {
                    node.loc = {
                        start: node.left.loc.start,
                        end: node.right.loc.end
                    };
                }
            }

            return function () {
                var node, rangeInfo, locInfo;

                skipComment();
                rangeInfo = [index, 0];
                locInfo = {
                    start: {
                        line: lineNumber,
                        column: index - lineStart
                    }
                };

                node = parseFunction.apply(null, arguments);
                if (typeof node !== 'undefined') {

                    if (range) {
                        rangeInfo[1] = index;
                        node.range = rangeInfo;
                    }

                    if (loc) {
                        locInfo.end = {
                            line: lineNumber,
                            column: index - lineStart
                        };
                        node.loc = locInfo;
                    }

                    if (isBinary(node)) {
                        visit(node);
                    }

                    if (node.type === Syntax.MemberExpression) {
                        if (typeof node.object.range !== 'undefined') {
                            node.range[0] = node.object.range[0];
                        }
                        if (typeof node.object.loc !== 'undefined') {
                            node.loc.start = node.object.loc.start;
                        }
                    }

                    if (node.type === Syntax.CallExpression) {
                        if (typeof node.callee.range !== 'undefined') {
                            node.range[0] = node.callee.range[0];
                        }
                        if (typeof node.callee.loc !== 'undefined') {
                            node.loc.start = node.callee.loc.start;
                        }
                    }
                    return node;
                }
            };

        };
    }

    function patch() {

        var wrapTracking;

        if (extra.comments) {
            extra.skipComment = skipComment;
            skipComment = scanComment;
        }

        if (extra.raw) {
            extra.createLiteral = createLiteral;
            createLiteral = createRawLiteral;
        }

        if (extra.range || extra.loc) {

            wrapTracking = wrapTrackingFunction(extra.range, extra.loc);

            extra.parseAdditiveExpression = parseAdditiveExpression;
            extra.parseAssignmentExpression = parseAssignmentExpression;
            extra.parseBitwiseANDExpression = parseBitwiseANDExpression;
            extra.parseBitwiseORExpression = parseBitwiseORExpression;
            extra.parseBitwiseXORExpression = parseBitwiseXORExpression;
            extra.parseBlock = parseBlock;
            extra.parseFunctionSourceElements = parseFunctionSourceElements;
            extra.parseCallMember = parseCallMember;
            extra.parseCatchClause = parseCatchClause;
            extra.parseComputedMember = parseComputedMember;
            extra.parseConditionalExpression = parseConditionalExpression;
            extra.parseConstLetDeclaration = parseConstLetDeclaration;
            extra.parseEqualityExpression = parseEqualityExpression;
            extra.parseExpression = parseExpression;
            extra.parseForVariableDeclaration = parseForVariableDeclaration;
            extra.parseFunctionDeclaration = parseFunctionDeclaration;
            extra.parseFunctionExpression = parseFunctionExpression;
            extra.parseLogicalANDExpression = parseLogicalANDExpression;
            extra.parseLogicalORExpression = parseLogicalORExpression;
            extra.parseMultiplicativeExpression = parseMultiplicativeExpression;
            extra.parseNewExpression = parseNewExpression;
            extra.parseNonComputedMember = parseNonComputedMember;
            extra.parseNonComputedProperty = parseNonComputedProperty;
            extra.parseObjectProperty = parseObjectProperty;
            extra.parseObjectPropertyKey = parseObjectPropertyKey;
            extra.parsePostfixExpression = parsePostfixExpression;
            extra.parsePrimaryExpression = parsePrimaryExpression;
            extra.parseProgram = parseProgram;
            extra.parsePropertyFunction = parsePropertyFunction;
            extra.parseRelationalExpression = parseRelationalExpression;
            extra.parseStatement = parseStatement;
            extra.parseShiftExpression = parseShiftExpression;
            extra.parseSwitchCase = parseSwitchCase;
            extra.parseUnaryExpression = parseUnaryExpression;
            extra.parseVariableDeclaration = parseVariableDeclaration;
            extra.parseVariableIdentifier = parseVariableIdentifier;

            parseAdditiveExpression = wrapTracking(extra.parseAdditiveExpression);
            parseAssignmentExpression = wrapTracking(extra.parseAssignmentExpression);
            parseBitwiseANDExpression = wrapTracking(extra.parseBitwiseANDExpression);
            parseBitwiseORExpression = wrapTracking(extra.parseBitwiseORExpression);
            parseBitwiseXORExpression = wrapTracking(extra.parseBitwiseXORExpression);
            parseBlock = wrapTracking(extra.parseBlock);
            parseFunctionSourceElements = wrapTracking(extra.parseFunctionSourceElements);
            parseCallMember = wrapTracking(extra.parseCallMember);
            parseCatchClause = wrapTracking(extra.parseCatchClause);
            parseComputedMember = wrapTracking(extra.parseComputedMember);
            parseConditionalExpression = wrapTracking(extra.parseConditionalExpression);
            parseConstLetDeclaration = wrapTracking(extra.parseConstLetDeclaration);
            parseEqualityExpression = wrapTracking(extra.parseEqualityExpression);
            parseExpression = wrapTracking(extra.parseExpression);
            parseForVariableDeclaration = wrapTracking(extra.parseForVariableDeclaration);
            parseFunctionDeclaration = wrapTracking(extra.parseFunctionDeclaration);
            parseFunctionExpression = wrapTracking(extra.parseFunctionExpression);
            parseLogicalANDExpression = wrapTracking(extra.parseLogicalANDExpression);
            parseLogicalORExpression = wrapTracking(extra.parseLogicalORExpression);
            parseMultiplicativeExpression = wrapTracking(extra.parseMultiplicativeExpression);
            parseNewExpression = wrapTracking(extra.parseNewExpression);
            parseNonComputedMember = wrapTracking(extra.parseNonComputedMember);
            parseNonComputedProperty = wrapTracking(extra.parseNonComputedProperty);
            parseObjectProperty = wrapTracking(extra.parseObjectProperty);
            parseObjectPropertyKey = wrapTracking(extra.parseObjectPropertyKey);
            parsePostfixExpression = wrapTracking(extra.parsePostfixExpression);
            parsePrimaryExpression = wrapTracking(extra.parsePrimaryExpression);
            parseProgram = wrapTracking(extra.parseProgram);
            parsePropertyFunction = wrapTracking(extra.parsePropertyFunction);
            parseRelationalExpression = wrapTracking(extra.parseRelationalExpression);
            parseStatement = wrapTracking(extra.parseStatement);
            parseShiftExpression = wrapTracking(extra.parseShiftExpression);
            parseSwitchCase = wrapTracking(extra.parseSwitchCase);
            parseUnaryExpression = wrapTracking(extra.parseUnaryExpression);
            parseVariableDeclaration = wrapTracking(extra.parseVariableDeclaration);
            parseVariableIdentifier = wrapTracking(extra.parseVariableIdentifier);
        }

        if (typeof extra.tokens !== 'undefined') {
            extra.advance = advance;
            extra.scanRegExp = scanRegExp;

            advance = collectToken;
            scanRegExp = collectRegex;
        }
    }

    function unpatch() {
        if (typeof extra.skipComment === 'function') {
            skipComment = extra.skipComment;
        }

        if (extra.raw) {
            createLiteral = extra.createLiteral;
        }

        if (extra.range || extra.loc) {
            parseAdditiveExpression = extra.parseAdditiveExpression;
            parseAssignmentExpression = extra.parseAssignmentExpression;
            parseBitwiseANDExpression = extra.parseBitwiseANDExpression;
            parseBitwiseORExpression = extra.parseBitwiseORExpression;
            parseBitwiseXORExpression = extra.parseBitwiseXORExpression;
            parseBlock = extra.parseBlock;
            parseFunctionSourceElements = extra.parseFunctionSourceElements;
            parseCallMember = extra.parseCallMember;
            parseCatchClause = extra.parseCatchClause;
            parseComputedMember = extra.parseComputedMember;
            parseConditionalExpression = extra.parseConditionalExpression;
            parseConstLetDeclaration = extra.parseConstLetDeclaration;
            parseEqualityExpression = extra.parseEqualityExpression;
            parseExpression = extra.parseExpression;
            parseForVariableDeclaration = extra.parseForVariableDeclaration;
            parseFunctionDeclaration = extra.parseFunctionDeclaration;
            parseFunctionExpression = extra.parseFunctionExpression;
            parseLogicalANDExpression = extra.parseLogicalANDExpression;
            parseLogicalORExpression = extra.parseLogicalORExpression;
            parseMultiplicativeExpression = extra.parseMultiplicativeExpression;
            parseNewExpression = extra.parseNewExpression;
            parseNonComputedMember = extra.parseNonComputedMember;
            parseNonComputedProperty = extra.parseNonComputedProperty;
            parseObjectProperty = extra.parseObjectProperty;
            parseObjectPropertyKey = extra.parseObjectPropertyKey;
            parsePrimaryExpression = extra.parsePrimaryExpression;
            parsePostfixExpression = extra.parsePostfixExpression;
            parseProgram = extra.parseProgram;
            parsePropertyFunction = extra.parsePropertyFunction;
            parseRelationalExpression = extra.parseRelationalExpression;
            parseStatement = extra.parseStatement;
            parseShiftExpression = extra.parseShiftExpression;
            parseSwitchCase = extra.parseSwitchCase;
            parseUnaryExpression = extra.parseUnaryExpression;
            parseVariableDeclaration = extra.parseVariableDeclaration;
            parseVariableIdentifier = extra.parseVariableIdentifier;
        }

        if (typeof extra.scanRegExp === 'function') {
            advance = extra.advance;
            scanRegExp = extra.scanRegExp;
        }
    }

    function stringToArray(str) {
        var length = str.length,
            result = [],
            i;
        for (i = 0; i < length; ++i) {
            result[i] = str.charAt(i);
        }
        return result;
    }

    function parse(code, options) {
        var program, toString;

        toString = String;
        if (typeof code !== 'string' && !(code instanceof String)) {
            code = toString(code);
        }

        source = code;
        index = 0;
        lineNumber = (source.length > 0) ? 1 : 0;
        lineStart = 0;
        length = source.length;
        buffer = null;
        state = {
            allowIn: true,
            labelSet: {},
            lastParenthesized: null,
            inFunctionBody: false,
            inIteration: false,
            inSwitch: false
        };

        extra = {};
        if (typeof options !== 'undefined') {
            extra.range = (typeof options.range === 'boolean') && options.range;
            extra.loc = (typeof options.loc === 'boolean') && options.loc;
            extra.raw = (typeof options.raw === 'boolean') && options.raw;
            if (typeof options.tokens === 'boolean' && options.tokens) {
                extra.tokens = [];
            }
            if (typeof options.comment === 'boolean' && options.comment) {
                extra.comments = [];
            }
            if (typeof options.tolerant === 'boolean' && options.tolerant) {
                extra.errors = [];
            }
        }

        if (length > 0) {
            if (typeof source[0] === 'undefined') {
                // Try first to convert to a string. This is good as fast path
                // for old IE which understands string indexing for string
                // literals only and not for string object.
                if (code instanceof String) {
                    source = code.valueOf();
                }

                // Force accessing the characters via an array.
                if (typeof source[0] === 'undefined') {
                    source = stringToArray(code);
                }
            }
        }

        patch();
        try {
            program = parseProgram();
            if (typeof extra.comments !== 'undefined') {
                program.comments = extra.comments;
            }
            if (typeof extra.tokens !== 'undefined') {
                program.tokens = extra.tokens;
            }
            if (typeof extra.errors !== 'undefined') {
                program.errors = extra.errors;
            }
        } catch (e) {
            throw e;
        } finally {
            unpatch();
            extra = {};
        }

        return program;
    }

    // Sync with package.json.
    exports.version = '1.0.0-dev';

    exports.parse = parse;

    // Deep copy.
    exports.Syntax = (function () {
        var name, types = {};

        if (typeof Object.create === 'function') {
            types = Object.create(null);
        }

        for (name in Syntax) {
            if (Syntax.hasOwnProperty(name)) {
                types[name] = Syntax[name];
            }
        }

        if (typeof Object.freeze === 'function') {
            Object.freeze(types);
        }

        return types;
    }());

}(typeof exports === 'undefined' ? (esprima = {}) : exports));
/* vim: set sw=4 ts=4 et tw=80 : */

});define('uglifyjs/consolidator', ["require", "exports", "module", "./parse-js", "./process"], function(require, exports, module) {
/**
 * @preserve Copyright 2012 Robert Gust-Bardon <http://robert.gust-bardon.org/>.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 *     * Redistributions of source code must retain the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer.
 *
 *     * Redistributions in binary form must reproduce the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer in the documentation and/or other materials
 *       provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
 * TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
 * THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 */

/**
 * @fileoverview Enhances <a href="https://github.com/mishoo/UglifyJS/"
 * >UglifyJS</a> with consolidation of null, Boolean, and String values.
 * <p>Also known as aliasing, this feature has been deprecated in <a href=
 * "http://closure-compiler.googlecode.com/">the Closure Compiler</a> since its
 * initial release, where it is unavailable from the <abbr title=
 * "command line interface">CLI</a>. The Closure Compiler allows one to log and
 * influence this process. In contrast, this implementation does not introduce
 * any variable declarations in global code and derives String values from
 * identifier names used as property accessors.</p>
 * <p>Consolidating literals may worsen the data compression ratio when an <a
 * href="http://tools.ietf.org/html/rfc2616#section-3.5">encoding
 * transformation</a> is applied. For instance, <a href=
 * "http://code.jquery.com/jquery-1.7.1.js">jQuery 1.7.1</a> takes 248235 bytes.
 * Building it with <a href="https://github.com/mishoo/UglifyJS/tarball/v1.2.5">
 * UglifyJS v1.2.5</a> results in 93647 bytes (37.73% of the original) which are
 * then compressed to 33154 bytes (13.36% of the original) using <a href=
 * "http://linux.die.net/man/1/gzip">gzip(1)</a>. Building it with the same
 * version of UglifyJS 1.2.5 patched with the implementation of consolidation
 * results in 80784 bytes (a decrease of 12863 bytes, i.e. 13.74%, in comparison
 * to the aforementioned 93647 bytes) which are then compressed to 34013 bytes
 * (an increase of 859 bytes, i.e. 2.59%, in comparison to the aforementioned
 * 33154 bytes).</p>
 * <p>Written in <a href="http://es5.github.com/#x4.2.2">the strict variant</a>
 * of <a href="http://es5.github.com/">ECMA-262 5.1 Edition</a>. Encoded in <a
 * href="http://tools.ietf.org/html/rfc3629">UTF-8</a>. Follows <a href=
 * "http://google-styleguide.googlecode.com/svn-history/r76/trunk/javascriptguide.xml"
 * >Revision 2.28 of the Google JavaScript Style Guide</a> (except for the
 * discouraged use of the {@code function} tag and the {@code namespace} tag).
 * 100% typed for the <a href=
 * "http://closure-compiler.googlecode.com/files/compiler-20120123.tar.gz"
 * >Closure Compiler Version 1741</a>.</p>
 * <p>Should you find this software useful, please consider <a href=
 * "https://paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JZLW72X8FD4WG"
 * >a donation</a>.</p>
 * @author follow.me@RGustBardon (Robert Gust-Bardon)
 * @supported Tested with:
 *     <ul>
 *     <li><a href="http://nodejs.org/dist/v0.6.10/">Node v0.6.10</a>,</li>
 *     <li><a href="https://github.com/mishoo/UglifyJS/tarball/v1.2.5">UglifyJS
 *       v1.2.5</a>.</li>
 *     </ul>
 */

/*global console:false, exports:true, module:false, require:false */
/*jshint sub:true */
/**
 * Consolidates null, Boolean, and String values found inside an <abbr title=
 * "abstract syntax tree">AST</abbr>.
 * @param {!TSyntacticCodeUnit} oAbstractSyntaxTree An array-like object
 *     representing an <abbr title="abstract syntax tree">AST</abbr>.
 * @return {!TSyntacticCodeUnit} An array-like object representing an <abbr
 *     title="abstract syntax tree">AST</abbr> with its null, Boolean, and
 *     String values consolidated.
 */
// TODO(user) Consolidation of mathematical values found in numeric literals.
// TODO(user) Unconsolidation.
// TODO(user) Consolidation of ECMA-262 6th Edition programs.
// TODO(user) Rewrite in ECMA-262 6th Edition.
exports['ast_consolidate'] = function(oAbstractSyntaxTree) {
  'use strict';
  /*jshint bitwise:true, curly:true, eqeqeq:true, forin:true, immed:true,
        latedef:true, newcap:true, noarge:true, noempty:true, nonew:true,
        onevar:true, plusplus:true, regexp:true, undef:true, strict:true,
        sub:false, trailing:true */

  var _,
      /**
       * A record consisting of data about one or more source elements.
       * @constructor
       * @nosideeffects
       */
      TSourceElementsData = function() {
        /**
         * The category of the elements.
         * @type {number}
         * @see ESourceElementCategories
         */
        this.nCategory = ESourceElementCategories.N_OTHER;
        /**
         * The number of occurrences (within the elements) of each primitive
         * value that could be consolidated.
         * @type {!Array.<!Object.<string, number>>}
         */
        this.aCount = [];
        this.aCount[EPrimaryExpressionCategories.N_IDENTIFIER_NAMES] = {};
        this.aCount[EPrimaryExpressionCategories.N_STRING_LITERALS] = {};
        this.aCount[EPrimaryExpressionCategories.N_NULL_AND_BOOLEAN_LITERALS] =
            {};
        /**
         * Identifier names found within the elements.
         * @type {!Array.<string>}
         */
        this.aIdentifiers = [];
        /**
         * Prefixed representation Strings of each primitive value that could be
         * consolidated within the elements.
         * @type {!Array.<string>}
         */
        this.aPrimitiveValues = [];
      },
      /**
       * A record consisting of data about a primitive value that could be
       * consolidated.
       * @constructor
       * @nosideeffects
       */
      TPrimitiveValue = function() {
        /**
         * The difference in the number of terminal symbols between the original
         * source text and the one with the primitive value consolidated. If the
         * difference is positive, the primitive value is considered worthwhile.
         * @type {number}
         */
        this.nSaving = 0;
        /**
         * An identifier name of the variable that will be declared and assigned
         * the primitive value if the primitive value is consolidated.
         * @type {string}
         */
        this.sName = '';
      },
      /**
       * A record consisting of data on what to consolidate within the range of
       * source elements that is currently being considered.
       * @constructor
       * @nosideeffects
       */
      TSolution = function() {
        /**
         * An object whose keys are prefixed representation Strings of each
         * primitive value that could be consolidated within the elements and
         * whose values are corresponding data about those primitive values.
         * @type {!Object.<string, {nSaving: number, sName: string}>}
         * @see TPrimitiveValue
         */
        this.oPrimitiveValues = {};
        /**
         * The difference in the number of terminal symbols between the original
         * source text and the one with all the worthwhile primitive values
         * consolidated.
         * @type {number}
         * @see TPrimitiveValue#nSaving
         */
        this.nSavings = 0;
      },
      /**
       * The processor of <abbr title="abstract syntax tree">AST</abbr>s found
       * in UglifyJS.
       * @namespace
       * @type {!TProcessor}
       */
      oProcessor = (/** @type {!TProcessor} */ require('./process')),
      /**
       * A record consisting of a number of constants that represent the
       * difference in the number of terminal symbols between a source text with
       * a modified syntactic code unit and the original one.
       * @namespace
       * @type {!Object.<string, number>}
       */
      oWeights = {
        /**
         * The difference in the number of punctuators required by the bracket
         * notation and the dot notation.
         * <p><code>'[]'.length - '.'.length</code></p>
         * @const
         * @type {number}
         */
        N_PROPERTY_ACCESSOR: 1,
        /**
         * The number of punctuators required by a variable declaration with an
         * initialiser.
         * <p><code>':'.length + ';'.length</code></p>
         * @const
         * @type {number}
         */
        N_VARIABLE_DECLARATION: 2,
        /**
         * The number of terminal symbols required to introduce a variable
         * statement (excluding its variable declaration list).
         * <p><code>'var '.length</code></p>
         * @const
         * @type {number}
         */
        N_VARIABLE_STATEMENT_AFFIXATION: 4,
        /**
         * The number of terminal symbols needed to enclose source elements
         * within a function call with no argument values to a function with an
         * empty parameter list.
         * <p><code>'(function(){}());'.length</code></p>
         * @const
         * @type {number}
         */
        N_CLOSURE: 17
      },
      /**
       * Categories of primary expressions from which primitive values that
       * could be consolidated are derivable.
       * @namespace
       * @enum {number}
       */
      EPrimaryExpressionCategories = {
        /**
         * Identifier names used as property accessors.
         * @type {number}
         */
        N_IDENTIFIER_NAMES: 0,
        /**
         * String literals.
         * @type {number}
         */
        N_STRING_LITERALS: 1,
        /**
         * Null and Boolean literals.
         * @type {number}
         */
        N_NULL_AND_BOOLEAN_LITERALS: 2
      },
      /**
       * Prefixes of primitive values that could be consolidated.
       * The String values of the prefixes must have same number of characters.
       * The prefixes must not be used in any properties defined in any version
       * of <a href=
       * "http://www.ecma-international.org/publications/standards/Ecma-262.htm"
       * >ECMA-262</a>.
       * @namespace
       * @enum {string}
       */
      EValuePrefixes = {
        /**
         * Identifies String values.
         * @type {string}
         */
        S_STRING: '#S',
        /**
         * Identifies null and Boolean values.
         * @type {string}
         */
        S_SYMBOLIC: '#O'
      },
      /**
       * Categories of source elements in terms of their appropriateness of
       * having their primitive values consolidated.
       * @namespace
       * @enum {number}
       */
      ESourceElementCategories = {
        /**
         * Identifies a source element that includes the <a href=
         * "http://es5.github.com/#x12.10">{@code with}</a> statement.
         * @type {number}
         */
        N_WITH: 0,
        /**
         * Identifies a source element that includes the <a href=
         * "http://es5.github.com/#x15.1.2.1">{@code eval}</a> identifier name.
         * @type {number}
         */
        N_EVAL: 1,
        /**
         * Identifies a source element that must be excluded from the process
         * unless its whole scope is examined.
         * @type {number}
         */
        N_EXCLUDABLE: 2,
        /**
         * Identifies source elements not posing any problems.
         * @type {number}
         */
        N_OTHER: 3
      },
      /**
       * The list of literals (other than the String ones) whose primitive
       * values can be consolidated.
       * @const
       * @type {!Array.<string>}
       */
      A_OTHER_SUBSTITUTABLE_LITERALS = [
        'null',   // The null literal.
        'false',  // The Boolean literal {@code false}.
        'true'    // The Boolean literal {@code true}.
      ];

  (/**
    * Consolidates all worthwhile primitive values in a syntactic code unit.
    * @param {!TSyntacticCodeUnit} oSyntacticCodeUnit An array-like object
    *     representing the branch of the abstract syntax tree representing the
    *     syntactic code unit along with its scope.
    * @see TPrimitiveValue#nSaving
    */
   function fExamineSyntacticCodeUnit(oSyntacticCodeUnit) {
     var _,
         /**
          * Indicates whether the syntactic code unit represents global code.
          * @type {boolean}
          */
         bIsGlobal = 'toplevel' === oSyntacticCodeUnit[0],
         /**
          * Indicates whether the whole scope is being examined.
          * @type {boolean}
          */
         bIsWhollyExaminable = !bIsGlobal,
         /**
          * An array-like object representing source elements that constitute a
          * syntactic code unit.
          * @type {!TSyntacticCodeUnit}
          */
         oSourceElements,
         /**
          * A record consisting of data about the source element that is
          * currently being examined.
          * @type {!TSourceElementsData}
          */
         oSourceElementData,
         /**
          * The scope of the syntactic code unit.
          * @type {!TScope}
          */
         oScope,
         /**
          * An instance of an object that allows the traversal of an <abbr
          * title="abstract syntax tree">AST</abbr>.
          * @type {!TWalker}
          */
         oWalker,
         /**
          * An object encompassing collections of functions used during the
          * traversal of an <abbr title="abstract syntax tree">AST</abbr>.
          * @namespace
          * @type {!Object.<string, !Object.<string, function(...[*])>>}
          */
         oWalkers = {
           /**
            * A collection of functions used during the surveyance of source
            * elements.
            * @namespace
            * @type {!Object.<string, function(...[*])>}
            */
           oSurveySourceElement: {
             /**#nocode+*/  // JsDoc Toolkit 2.4.0 hides some of the keys.
             /**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name. Adds the identifier of the function and its formal
              * parameters to the list of identifier names found.
              * @param {string} sIdentifier The identifier of the function.
              * @param {!Array.<string>} aFormalParameterList Formal parameters.
              * @param {!TSyntacticCodeUnit} oFunctionBody Function code.
              */
             'defun': function(
                 sIdentifier,
                 aFormalParameterList,
                 oFunctionBody) {
               fClassifyAsExcludable();
               fAddIdentifier(sIdentifier);
               aFormalParameterList.forEach(fAddIdentifier);
             },
             /**
              * Increments the count of the number of occurrences of the String
              * value that is equivalent to the sequence of terminal symbols
              * that constitute the encountered identifier name.
              * @param {!TSyntacticCodeUnit} oExpression The nonterminal
              *     MemberExpression.
              * @param {string} sIdentifierName The identifier name used as the
              *     property accessor.
              * @return {!Array} The encountered branch of an <abbr title=
              *     "abstract syntax tree">AST</abbr> with its nonterminal
              *     MemberExpression traversed.
              */
             'dot': function(oExpression, sIdentifierName) {
               fCountPrimaryExpression(
                   EPrimaryExpressionCategories.N_IDENTIFIER_NAMES,
                   EValuePrefixes.S_STRING + sIdentifierName);
               return ['dot', oWalker.walk(oExpression), sIdentifierName];
             },
             /**
              * Adds the optional identifier of the function and its formal
              * parameters to the list of identifier names found.
              * @param {?string} sIdentifier The optional identifier of the
              *     function.
              * @param {!Array.<string>} aFormalParameterList Formal parameters.
              * @param {!TSyntacticCodeUnit} oFunctionBody Function code.
              */
             'function': function(
                 sIdentifier,
                 aFormalParameterList,
                 oFunctionBody) {
               if ('string' === typeof sIdentifier) {
                 fAddIdentifier(sIdentifier);
               }
               aFormalParameterList.forEach(fAddIdentifier);
             },
             /**
              * Either increments the count of the number of occurrences of the
              * encountered null or Boolean value or classifies a source element
              * as containing the {@code eval} identifier name.
              * @param {string} sIdentifier The identifier encountered.
              */
             'name': function(sIdentifier) {
               if (-1 !== A_OTHER_SUBSTITUTABLE_LITERALS.indexOf(sIdentifier)) {
                 fCountPrimaryExpression(
                     EPrimaryExpressionCategories.N_NULL_AND_BOOLEAN_LITERALS,
                     EValuePrefixes.S_SYMBOLIC + sIdentifier);
               } else {
                 if ('eval' === sIdentifier) {
                   oSourceElementData.nCategory =
                       ESourceElementCategories.N_EVAL;
                 }
                 fAddIdentifier(sIdentifier);
               }
             },
             /**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name.
              * @param {TSyntacticCodeUnit} oExpression The expression whose
              *     value is to be returned.
              */
             'return': function(oExpression) {
               fClassifyAsExcludable();
             },
             /**
              * Increments the count of the number of occurrences of the
              * encountered String value.
              * @param {string} sStringValue The String value of the string
              *     literal encountered.
              */
             'string': function(sStringValue) {
               if (sStringValue.length > 0) {
                 fCountPrimaryExpression(
                     EPrimaryExpressionCategories.N_STRING_LITERALS,
                     EValuePrefixes.S_STRING + sStringValue);
               }
             },
             /**
              * Adds the identifier reserved for an exception to the list of
              * identifier names found.
              * @param {!TSyntacticCodeUnit} oTry A block of code in which an
              *     exception can occur.
              * @param {Array} aCatch The identifier reserved for an exception
              *     and a block of code to handle the exception.
              * @param {TSyntacticCodeUnit} oFinally An optional block of code
              *     to be evaluated regardless of whether an exception occurs.
              */
             'try': function(oTry, aCatch, oFinally) {
               if (Array.isArray(aCatch)) {
                 fAddIdentifier(aCatch[0]);
               }
             },
             /**
              * Classifies the source element as excludable if it does not
              * contain a {@code with} statement or the {@code eval} identifier
              * name. Adds the identifier of each declared variable to the list
              * of identifier names found.
              * @param {!Array.<!Array>} aVariableDeclarationList Variable
              *     declarations.
              */
             'var': function(aVariableDeclarationList) {
               fClassifyAsExcludable();
               aVariableDeclarationList.forEach(fAddVariable);
             },
             /**
              * Classifies a source element as containing the {@code with}
              * statement.
              * @param {!TSyntacticCodeUnit} oExpression An expression whose
              *     value is to be converted to a value of type Object and
              *     become the binding object of a new object environment
              *     record of a new lexical environment in which the statement
              *     is to be executed.
              * @param {!TSyntacticCodeUnit} oStatement The statement to be
              *     executed in the augmented lexical environment.
              * @return {!Array} An empty array to stop the traversal.
              */
             'with': function(oExpression, oStatement) {
               oSourceElementData.nCategory = ESourceElementCategories.N_WITH;
               return [];
             }
             /**#nocode-*/  // JsDoc Toolkit 2.4.0 hides some of the keys.
           },
           /**
            * A collection of functions used while looking for nested functions.
            * @namespace
            * @type {!Object.<string, function(...[*])>}
            */
           oExamineFunctions: {
             /**#nocode+*/  // JsDoc Toolkit 2.4.0 hides some of the keys.
             /**
              * Orders an examination of a nested function declaration.
              * @this {!TSyntacticCodeUnit} An array-like object representing
              *     the branch of an <abbr title="abstract syntax tree"
              *     >AST</abbr> representing the syntactic code unit along with
              *     its scope.
              * @return {!Array} An empty array to stop the traversal.
              */
             'defun': function() {
               fExamineSyntacticCodeUnit(this);
               return [];
             },
             /**
              * Orders an examination of a nested function expression.
              * @this {!TSyntacticCodeUnit} An array-like object representing
              *     the branch of an <abbr title="abstract syntax tree"
              *     >AST</abbr> representing the syntactic code unit along with
              *     its scope.
              * @return {!Array} An empty array to stop the traversal.
              */
             'function': function() {
               fExamineSyntacticCodeUnit(this);
               return [];
             }
             /**#nocode-*/  // JsDoc Toolkit 2.4.0 hides some of the keys.
           }
         },
         /**
          * Records containing data about source elements.
          * @type {Array.<TSourceElementsData>}
          */
         aSourceElementsData = [],
         /**
          * The index (in the source text order) of the source element
          * immediately following a <a href="http://es5.github.com/#x14.1"
          * >Directive Prologue</a>.
          * @type {number}
          */
         nAfterDirectivePrologue = 0,
         /**
          * The index (in the source text order) of the source element that is
          * currently being considered.
          * @type {number}
          */
         nPosition,
         /**
          * The index (in the source text order) of the source element that is
          * the last element of the range of source elements that is currently
          * being considered.
          * @type {(undefined|number)}
          */
         nTo,
         /**
          * Initiates the traversal of a source element.
          * @param {!TWalker} oWalker An instance of an object that allows the
          *     traversal of an abstract syntax tree.
          * @param {!TSyntacticCodeUnit} oSourceElement A source element from
          *     which the traversal should commence.
          * @return {function(): !TSyntacticCodeUnit} A function that is able to
          *     initiate the traversal from a given source element.
          */
         cContext = function(oWalker, oSourceElement) {
           /**
            * @return {!TSyntacticCodeUnit} A function that is able to
            *     initiate the traversal from a given source element.
            */
           var fLambda = function() {
             return oWalker.walk(oSourceElement);
           };

           return fLambda;
         },
         /**
          * Classifies the source element as excludable if it does not
          * contain a {@code with} statement or the {@code eval} identifier
          * name.
          */
         fClassifyAsExcludable = function() {
           if (oSourceElementData.nCategory ===
               ESourceElementCategories.N_OTHER) {
             oSourceElementData.nCategory =
                 ESourceElementCategories.N_EXCLUDABLE;
           }
         },
         /**
          * Adds an identifier to the list of identifier names found.
          * @param {string} sIdentifier The identifier to be added.
          */
         fAddIdentifier = function(sIdentifier) {
           if (-1 === oSourceElementData.aIdentifiers.indexOf(sIdentifier)) {
             oSourceElementData.aIdentifiers.push(sIdentifier);
           }
         },
         /**
          * Adds the identifier of a variable to the list of identifier names
          * found.
          * @param {!Array} aVariableDeclaration A variable declaration.
          */
         fAddVariable = function(aVariableDeclaration) {
           fAddIdentifier(/** @type {string} */ aVariableDeclaration[0]);
         },
         /**
          * Increments the count of the number of occurrences of the prefixed
          * String representation attributed to the primary expression.
          * @param {number} nCategory The category of the primary expression.
          * @param {string} sName The prefixed String representation attributed
          *     to the primary expression.
          */
         fCountPrimaryExpression = function(nCategory, sName) {
           if (!oSourceElementData.aCount[nCategory].hasOwnProperty(sName)) {
             oSourceElementData.aCount[nCategory][sName] = 0;
             if (-1 === oSourceElementData.aPrimitiveValues.indexOf(sName)) {
               oSourceElementData.aPrimitiveValues.push(sName);
             }
           }
           oSourceElementData.aCount[nCategory][sName] += 1;
         },
         /**
          * Consolidates all worthwhile primitive values in a range of source
          *     elements.
          * @param {number} nFrom The index (in the source text order) of the
          *     source element that is the first element of the range.
          * @param {number} nTo The index (in the source text order) of the
          *     source element that is the last element of the range.
          * @param {boolean} bEnclose Indicates whether the range should be
          *     enclosed within a function call with no argument values to a
          *     function with an empty parameter list if any primitive values
          *     are consolidated.
          * @see TPrimitiveValue#nSaving
          */
         fExamineSourceElements = function(nFrom, nTo, bEnclose) {
           var _,
               /**
                * The index of the last mangled name.
                * @type {number}
                */
               nIndex = oScope.cname,
               /**
                * The index of the source element that is currently being
                * considered.
                * @type {number}
                */
               nPosition,
               /**
                * A collection of functions used during the consolidation of
                * primitive values and identifier names used as property
                * accessors.
                * @namespace
                * @type {!Object.<string, function(...[*])>}
                */
               oWalkersTransformers = {
                 /**
                  * If the String value that is equivalent to the sequence of
                  * terminal symbols that constitute the encountered identifier
                  * name is worthwhile, a syntactic conversion from the dot
                  * notation to the bracket notation ensues with that sequence
                  * being substituted by an identifier name to which the value
                  * is assigned.
                  * Applies to property accessors that use the dot notation.
                  * @param {!TSyntacticCodeUnit} oExpression The nonterminal
                  *     MemberExpression.
                  * @param {string} sIdentifierName The identifier name used as
                  *     the property accessor.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
                 'dot': function(oExpression, sIdentifierName) {
                   /**
                    * The prefixed String value that is equivalent to the
                    * sequence of terminal symbols that constitute the
                    * encountered identifier name.
                    * @type {string}
                    */
                   var sPrefixed = EValuePrefixes.S_STRING + sIdentifierName;

                   return oSolutionBest.oPrimitiveValues.hasOwnProperty(
                       sPrefixed) &&
                       oSolutionBest.oPrimitiveValues[sPrefixed].nSaving > 0 ?
                       ['sub',
                        oWalker.walk(oExpression),
                        ['name',
                         oSolutionBest.oPrimitiveValues[sPrefixed].sName]] :
                       ['dot', oWalker.walk(oExpression), sIdentifierName];
                 },
                 /**
                  * If the encountered identifier is a null or Boolean literal
                  * and its value is worthwhile, the identifier is substituted
                  * by an identifier name to which that value is assigned.
                  * Applies to identifier names.
                  * @param {string} sIdentifier The identifier encountered.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
                 'name': function(sIdentifier) {
                   /**
                    * The prefixed representation String of the identifier.
                    * @type {string}
                    */
                   var sPrefixed = EValuePrefixes.S_SYMBOLIC + sIdentifier;

                   return [
                     'name',
                     oSolutionBest.oPrimitiveValues.hasOwnProperty(sPrefixed) &&
                     oSolutionBest.oPrimitiveValues[sPrefixed].nSaving > 0 ?
                     oSolutionBest.oPrimitiveValues[sPrefixed].sName :
                     sIdentifier
                   ];
                 },
                 /**
                  * If the encountered String value is worthwhile, it is
                  * substituted by an identifier name to which that value is
                  * assigned.
                  * Applies to String values.
                  * @param {string} sStringValue The String value of the string
                  *     literal encountered.
                  * @return {!Array} A syntactic code unit that is equivalent to
                  *     the one encountered.
                  * @see TPrimitiveValue#nSaving
                  */
                 'string': function(sStringValue) {
                   /**
                    * The prefixed representation String of the primitive value
                    * of the literal.
                    * @type {string}
                    */
                   var sPrefixed =
                       EValuePrefixes.S_STRING + sStringValue;

                   return oSolutionBest.oPrimitiveValues.hasOwnProperty(
                       sPrefixed) &&
                       oSolutionBest.oPrimitiveValues[sPrefixed].nSaving > 0 ?
                       ['name',
                        oSolutionBest.oPrimitiveValues[sPrefixed].sName] :
                       ['string', sStringValue];
                 }
               },
               /**
                * Such data on what to consolidate within the range of source
                * elements that is currently being considered that lead to the
                * greatest known reduction of the number of the terminal symbols
                * in comparison to the original source text.
                * @type {!TSolution}
                */
               oSolutionBest = new TSolution(),
               /**
                * Data representing an ongoing attempt to find a better
                * reduction of the number of the terminal symbols in comparison
                * to the original source text than the best one that is
                * currently known.
                * @type {!TSolution}
                * @see oSolutionBest
                */
               oSolutionCandidate = new TSolution(),
               /**
                * A record consisting of data about the range of source elements
                * that is currently being examined.
                * @type {!TSourceElementsData}
                */
               oSourceElementsData = new TSourceElementsData(),
               /**
                * Variable declarations for each primitive value that is to be
                * consolidated within the elements.
                * @type {!Array.<!Array>}
                */
               aVariableDeclarations = [],
               /**
                * Augments a list with a prefixed representation String.
                * @param {!Array.<string>} aList A list that is to be augmented.
                * @return {function(string)} A function that augments a list
                *     with a prefixed representation String.
                */
               cAugmentList = function(aList) {
                 /**
                  * @param {string} sPrefixed Prefixed representation String of
                  *     a primitive value that could be consolidated within the
                  *     elements.
                  */
                 var fLambda = function(sPrefixed) {
                   if (-1 === aList.indexOf(sPrefixed)) {
                     aList.push(sPrefixed);
                   }
                 };

                 return fLambda;
               },
               /**
                * Adds the number of occurrences of a primitive value of a given
                * category that could be consolidated in the source element with
                * a given index to the count of occurrences of that primitive
                * value within the range of source elements that is currently
                * being considered.
                * @param {number} nPosition The index (in the source text order)
                *     of a source element.
                * @param {number} nCategory The category of the primary
                *     expression from which the primitive value is derived.
                * @return {function(string)} A function that performs the
                *     addition.
                * @see cAddOccurrencesInCategory
                */
               cAddOccurrences = function(nPosition, nCategory) {
                 /**
                  * @param {string} sPrefixed The prefixed representation String
                  *     of a primitive value.
                  */
                 var fLambda = function(sPrefixed) {
                   if (!oSourceElementsData.aCount[nCategory].hasOwnProperty(
                           sPrefixed)) {
                     oSourceElementsData.aCount[nCategory][sPrefixed] = 0;
                   }
                   oSourceElementsData.aCount[nCategory][sPrefixed] +=
                       aSourceElementsData[nPosition].aCount[nCategory][
                           sPrefixed];
                 };

                 return fLambda;
               },
               /**
                * Adds the number of occurrences of each primitive value of a
                * given category that could be consolidated in the source
                * element with a given index to the count of occurrences of that
                * primitive values within the range of source elements that is
                * currently being considered.
                * @param {number} nPosition The index (in the source text order)
                *     of a source element.
                * @return {function(number)} A function that performs the
                *     addition.
                * @see fAddOccurrences
                */
               cAddOccurrencesInCategory = function(nPosition) {
                 /**
                  * @param {number} nCategory The category of the primary
                  *     expression from which the primitive value is derived.
                  */
                 var fLambda = function(nCategory) {
                   Object.keys(
                       aSourceElementsData[nPosition].aCount[nCategory]
                   ).forEach(cAddOccurrences(nPosition, nCategory));
                 };

                 return fLambda;
               },
               /**
                * Adds the number of occurrences of each primitive value that
                * could be consolidated in the source element with a given index
                * to the count of occurrences of that primitive values within
                * the range of source elements that is currently being
                * considered.
                * @param {number} nPosition The index (in the source text order)
                *     of a source element.
                */
               fAddOccurrences = function(nPosition) {
                 Object.keys(aSourceElementsData[nPosition].aCount).forEach(
                     cAddOccurrencesInCategory(nPosition));
               },
               /**
                * Creates a variable declaration for a primitive value if that
                * primitive value is to be consolidated within the elements.
                * @param {string} sPrefixed Prefixed representation String of a
                *     primitive value that could be consolidated within the
                *     elements.
                * @see aVariableDeclarations
                */
               cAugmentVariableDeclarations = function(sPrefixed) {
                 if (oSolutionBest.oPrimitiveValues[sPrefixed].nSaving > 0) {
                   aVariableDeclarations.push([
                     oSolutionBest.oPrimitiveValues[sPrefixed].sName,
                     [0 === sPrefixed.indexOf(EValuePrefixes.S_SYMBOLIC) ?
                      'name' : 'string',
                      sPrefixed.substring(EValuePrefixes.S_SYMBOLIC.length)]
                   ]);
                 }
               },
               /**
                * Sorts primitive values with regard to the difference in the
                * number of terminal symbols between the original source text
                * and the one with those primitive values consolidated.
                * @param {string} sPrefixed0 The prefixed representation String
                *     of the first of the two primitive values that are being
                *     compared.
                * @param {string} sPrefixed1 The prefixed representation String
                *     of the second of the two primitive values that are being
                *     compared.
                * @return {number}
                *     <dl>
                *         <dt>-1</dt>
                *         <dd>if the first primitive value must be placed before
                *              the other one,</dd>
                *         <dt>0</dt>
                *         <dd>if the first primitive value may be placed before
                *              the other one,</dd>
                *         <dt>1</dt>
                *         <dd>if the first primitive value must not be placed
                *              before the other one.</dd>
                *     </dl>
                * @see TSolution.oPrimitiveValues
                */
               cSortPrimitiveValues = function(sPrefixed0, sPrefixed1) {
                 /**
                  * The difference between:
                  * <ol>
                  * <li>the difference in the number of terminal symbols
                  *     between the original source text and the one with the
                  *     first primitive value consolidated, and</li>
                  * <li>the difference in the number of terminal symbols
                  *     between the original source text and the one with the
                  *     second primitive value consolidated.</li>
                  * </ol>
                  * @type {number}
                  */
                 var nDifference =
                     oSolutionCandidate.oPrimitiveValues[sPrefixed0].nSaving -
                     oSolutionCandidate.oPrimitiveValues[sPrefixed1].nSaving;

                 return nDifference > 0 ? -1 : nDifference < 0 ? 1 : 0;
               },
               /**
                * Assigns an identifier name to a primitive value and calculates
                * whether instances of that primitive value are worth
                * consolidating.
                * @param {string} sPrefixed The prefixed representation String
                *     of a primitive value that is being evaluated.
                */
               fEvaluatePrimitiveValue = function(sPrefixed) {
                 var _,
                     /**
                      * The index of the last mangled name.
                      * @type {number}
                      */
                     nIndex,
                     /**
                      * The representation String of the primitive value that is
                      * being evaluated.
                      * @type {string}
                      */
                     sName =
                         sPrefixed.substring(EValuePrefixes.S_SYMBOLIC.length),
                     /**
                      * The number of source characters taken up by the
                      * representation String of the primitive value that is
                      * being evaluated.
                      * @type {number}
                      */
                     nLengthOriginal = sName.length,
                     /**
                      * The number of source characters taken up by the
                      * identifier name that could substitute the primitive
                      * value that is being evaluated.
                      * substituted.
                      * @type {number}
                      */
                     nLengthSubstitution,
                     /**
                      * The number of source characters taken up by by the
                      * representation String of the primitive value that is
                      * being evaluated when it is represented by a string
                      * literal.
                      * @type {number}
                      */
                     nLengthString = oProcessor.make_string(sName).length;

                 oSolutionCandidate.oPrimitiveValues[sPrefixed] =
                     new TPrimitiveValue();
                 do {  // Find an identifier unused in this or any nested scope.
                   nIndex = oScope.cname;
                   oSolutionCandidate.oPrimitiveValues[sPrefixed].sName =
                       oScope.next_mangled();
                 } while (-1 !== oSourceElementsData.aIdentifiers.indexOf(
                     oSolutionCandidate.oPrimitiveValues[sPrefixed].sName));
                 nLengthSubstitution = oSolutionCandidate.oPrimitiveValues[
                     sPrefixed].sName.length;
                 if (0 === sPrefixed.indexOf(EValuePrefixes.S_SYMBOLIC)) {
                   // foo:null, or foo:null;
                   oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving -=
                       nLengthSubstitution + nLengthOriginal +
                       oWeights.N_VARIABLE_DECLARATION;
                   // null vs foo
                   oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving +=
                       oSourceElementsData.aCount[
                           EPrimaryExpressionCategories.
                               N_NULL_AND_BOOLEAN_LITERALS][sPrefixed] *
                       (nLengthOriginal - nLengthSubstitution);
                 } else {
                   // foo:'fromCharCode';
                   oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving -=
                       nLengthSubstitution + nLengthString +
                       oWeights.N_VARIABLE_DECLARATION;
                   // .fromCharCode vs [foo]
                   if (oSourceElementsData.aCount[
                           EPrimaryExpressionCategories.N_IDENTIFIER_NAMES
                       ].hasOwnProperty(sPrefixed)) {
                     oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving +=
                         oSourceElementsData.aCount[
                             EPrimaryExpressionCategories.N_IDENTIFIER_NAMES
                         ][sPrefixed] *
                         (nLengthOriginal - nLengthSubstitution -
                          oWeights.N_PROPERTY_ACCESSOR);
                   }
                   // 'fromCharCode' vs foo
                   if (oSourceElementsData.aCount[
                           EPrimaryExpressionCategories.N_STRING_LITERALS
                       ].hasOwnProperty(sPrefixed)) {
                     oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving +=
                         oSourceElementsData.aCount[
                             EPrimaryExpressionCategories.N_STRING_LITERALS
                         ][sPrefixed] *
                         (nLengthString - nLengthSubstitution);
                   }
                 }
                 if (oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving >
                     0) {
                   oSolutionCandidate.nSavings +=
                       oSolutionCandidate.oPrimitiveValues[sPrefixed].nSaving;
                 } else {
                   oScope.cname = nIndex; // Free the identifier name.
                 }
               },
               /**
                * Adds a variable declaration to an existing variable statement.
                * @param {!Array} aVariableDeclaration A variable declaration
                *     with an initialiser.
                */
               cAddVariableDeclaration = function(aVariableDeclaration) {
                 (/** @type {!Array} */ oSourceElements[nFrom][1]).unshift(
                     aVariableDeclaration);
               };

           if (nFrom > nTo) {
             return;
           }
           // If the range is a closure, reuse the closure.
           if (nFrom === nTo &&
               'stat' === oSourceElements[nFrom][0] &&
               'call' === oSourceElements[nFrom][1][0] &&
               'function' === oSourceElements[nFrom][1][1][0]) {
             fExamineSyntacticCodeUnit(oSourceElements[nFrom][1][1]);
             return;
           }
           // Create a list of all derived primitive values within the range.
           for (nPosition = nFrom; nPosition <= nTo; nPosition += 1) {
             aSourceElementsData[nPosition].aPrimitiveValues.forEach(
                 cAugmentList(oSourceElementsData.aPrimitiveValues));
           }
           if (0 === oSourceElementsData.aPrimitiveValues.length) {
             return;
           }
           for (nPosition = nFrom; nPosition <= nTo; nPosition += 1) {
             // Add the number of occurrences to the total count.
             fAddOccurrences(nPosition);
             // Add identifiers of this or any nested scope to the list.
             aSourceElementsData[nPosition].aIdentifiers.forEach(
                 cAugmentList(oSourceElementsData.aIdentifiers));
           }
           // Distribute identifier names among derived primitive values.
           do {  // If there was any progress, find a better distribution.
             oSolutionBest = oSolutionCandidate;
             if (Object.keys(oSolutionCandidate.oPrimitiveValues).length > 0) {
               // Sort primitive values descending by their worthwhileness.
               oSourceElementsData.aPrimitiveValues.sort(cSortPrimitiveValues);
             }
             oSolutionCandidate = new TSolution();
             oSourceElementsData.aPrimitiveValues.forEach(
                 fEvaluatePrimitiveValue);
             oScope.cname = nIndex;
           } while (oSolutionCandidate.nSavings > oSolutionBest.nSavings);
           // Take the necessity of adding a variable statement into account.
           if ('var' !== oSourceElements[nFrom][0]) {
             oSolutionBest.nSavings -= oWeights.N_VARIABLE_STATEMENT_AFFIXATION;
           }
           if (bEnclose) {
             // Take the necessity of forming a closure into account.
             oSolutionBest.nSavings -= oWeights.N_CLOSURE;
           }
           if (oSolutionBest.nSavings > 0) {
             // Create variable declarations suitable for UglifyJS.
             Object.keys(oSolutionBest.oPrimitiveValues).forEach(
                 cAugmentVariableDeclarations);
             // Rewrite expressions that contain worthwhile primitive values.
             for (nPosition = nFrom; nPosition <= nTo; nPosition += 1) {
               oWalker = oProcessor.ast_walker();
               oSourceElements[nPosition] =
                   oWalker.with_walkers(
                       oWalkersTransformers,
                       cContext(oWalker, oSourceElements[nPosition]));
             }
             if ('var' === oSourceElements[nFrom][0]) {  // Reuse the statement.
               (/** @type {!Array.<!Array>} */ aVariableDeclarations.reverse(
                   )).forEach(cAddVariableDeclaration);
             } else {  // Add a variable statement.
               Array.prototype.splice.call(
                   oSourceElements,
                   nFrom,
                   0,
                   ['var', aVariableDeclarations]);
               nTo += 1;
             }
             if (bEnclose) {
               // Add a closure.
               Array.prototype.splice.call(
                   oSourceElements,
                   nFrom,
                   0,
                   ['stat', ['call', ['function', null, [], []], []]]);
               // Copy source elements into the closure.
               for (nPosition = nTo + 1; nPosition > nFrom; nPosition -= 1) {
                 Array.prototype.unshift.call(
                     oSourceElements[nFrom][1][1][3],
                     oSourceElements[nPosition]);
               }
               // Remove source elements outside the closure.
               Array.prototype.splice.call(
                   oSourceElements,
                   nFrom + 1,
                   nTo - nFrom + 1);
             }
           }
           if (bEnclose) {
             // Restore the availability of identifier names.
             oScope.cname = nIndex;
           }
         };

     oSourceElements = (/** @type {!TSyntacticCodeUnit} */
         oSyntacticCodeUnit[bIsGlobal ? 1 : 3]);
     if (0 === oSourceElements.length) {
       return;
     }
     oScope = bIsGlobal ? oSyntacticCodeUnit.scope : oSourceElements.scope;
     // Skip a Directive Prologue.
     while (nAfterDirectivePrologue < oSourceElements.length &&
            'directive' === oSourceElements[nAfterDirectivePrologue][0]) {
       nAfterDirectivePrologue += 1;
       aSourceElementsData.push(null);
     }
     if (oSourceElements.length === nAfterDirectivePrologue) {
       return;
     }
     for (nPosition = nAfterDirectivePrologue;
          nPosition < oSourceElements.length;
          nPosition += 1) {
       oSourceElementData = new TSourceElementsData();
       oWalker = oProcessor.ast_walker();
       // Classify a source element.
       // Find its derived primitive values and count their occurrences.
       // Find all identifiers used (including nested scopes).
       oWalker.with_walkers(
           oWalkers.oSurveySourceElement,
           cContext(oWalker, oSourceElements[nPosition]));
       // Establish whether the scope is still wholly examinable.
       bIsWhollyExaminable = bIsWhollyExaminable &&
           ESourceElementCategories.N_WITH !== oSourceElementData.nCategory &&
           ESourceElementCategories.N_EVAL !== oSourceElementData.nCategory;
       aSourceElementsData.push(oSourceElementData);
     }
     if (bIsWhollyExaminable) {  // Examine the whole scope.
       fExamineSourceElements(
           nAfterDirectivePrologue,
           oSourceElements.length - 1,
           false);
     } else {  // Examine unexcluded ranges of source elements.
       for (nPosition = oSourceElements.length - 1;
            nPosition >= nAfterDirectivePrologue;
            nPosition -= 1) {
         oSourceElementData = (/** @type {!TSourceElementsData} */
             aSourceElementsData[nPosition]);
         if (ESourceElementCategories.N_OTHER ===
             oSourceElementData.nCategory) {
           if ('undefined' === typeof nTo) {
             nTo = nPosition;  // Indicate the end of a range.
           }
           // Examine the range if it immediately follows a Directive Prologue.
           if (nPosition === nAfterDirectivePrologue) {
             fExamineSourceElements(nPosition, nTo, true);
           }
         } else {
           if ('undefined' !== typeof nTo) {
             // Examine the range that immediately follows this source element.
             fExamineSourceElements(nPosition + 1, nTo, true);
             nTo = void 0;  // Obliterate the range.
           }
           // Examine nested functions.
           oWalker = oProcessor.ast_walker();
           oWalker.with_walkers(
               oWalkers.oExamineFunctions,
               cContext(oWalker, oSourceElements[nPosition]));
         }
       }
     }
   }(oAbstractSyntaxTree = oProcessor.ast_add_scope(oAbstractSyntaxTree)));
  return oAbstractSyntaxTree;
};
/*jshint sub:false */

/* Local Variables:      */
/* mode: js              */
/* coding: utf-8         */
/* indent-tabs-mode: nil */
/* tab-width: 2          */
/* End:                  */
/* vim: set ft=javascript fenc=utf-8 et ts=2 sts=2 sw=2: */
/* :mode=javascript:noTabs=true:tabSize=2:indentSize=2:deepIndent=true: */
});
define('uglifyjs/parse-js', ["exports"], function(exports) {
/***********************************************************************

  A JavaScript tokenizer / parser / beautifier / compressor.

  This version is suitable for Node.js.  With minimal changes (the
  exports stuff) it should work on any JS platform.

  This file contains the tokenizer/parser.  It is a port to JavaScript
  of parse-js [1], a JavaScript parser library written in Common Lisp
  by Marijn Haverbeke.  Thank you Marijn!

  [1] http://marijn.haverbeke.nl/parse-js/

  Exported functions:

    - tokenizer(code) -- returns a function.  Call the returned
      function to fetch the next token.

    - parse(code) -- returns an AST of the given JavaScript code.

  -------------------------------- (C) ---------------------------------

                           Author: Mihai Bazon
                         <mihai.bazon@gmail.com>
                       http://mihai.bazon.net/blog

  Distributed under the BSD license:

    Copyright 2010 (c) Mihai Bazon <mihai.bazon@gmail.com>
    Based on parse-js (http://marijn.haverbeke.nl/parse-js/).

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/

/* -----[ Tokenizer (constants) ]----- */

var KEYWORDS = array_to_hash([
    "break",
    "case",
    "catch",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "finally",
    "for",
    "function",
    "if",
    "in",
    "instanceof",
    "new",
    "return",
    "switch",
    "throw",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with"
]);

var RESERVED_WORDS = array_to_hash([
    "abstract",
    "boolean",
    "byte",
    "char",
    "class",
    "double",
    "enum",
    "export",
    "extends",
    "final",
    "float",
    "goto",
    "implements",
    "import",
    "int",
    "interface",
    "long",
    "native",
    "package",
    "private",
    "protected",
    "public",
    "short",
    "static",
    "super",
    "synchronized",
    "throws",
    "transient",
    "volatile"
]);

var KEYWORDS_BEFORE_EXPRESSION = array_to_hash([
    "return",
    "new",
    "delete",
    "throw",
    "else",
    "case"
]);

var KEYWORDS_ATOM = array_to_hash([
    "false",
    "null",
    "true",
    "undefined"
]);

var OPERATOR_CHARS = array_to_hash(characters("+-*&%=<>!?|~^"));

var RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
var RE_OCT_NUMBER = /^0[0-7]+$/;
var RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;

var OPERATORS = array_to_hash([
    "in",
    "instanceof",
    "typeof",
    "new",
    "void",
    "delete",
    "++",
    "--",
    "+",
    "-",
    "!",
    "~",
    "&",
    "|",
    "^",
    "*",
    "/",
    "%",
    ">>",
    "<<",
    ">>>",
    "<",
    ">",
    "<=",
    ">=",
    "==",
    "===",
    "!=",
    "!==",
    "?",
    "=",
    "+=",
    "-=",
    "/=",
    "*=",
    "%=",
    ">>=",
    "<<=",
    ">>>=",
    "|=",
    "^=",
    "&=",
    "&&",
    "||"
]);

var WHITESPACE_CHARS = array_to_hash(characters(" \u00a0\n\r\t\f\u000b\u200b\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\uFEFF"));

var PUNC_BEFORE_EXPRESSION = array_to_hash(characters("[{(,.;:"));

var PUNC_CHARS = array_to_hash(characters("[]{}(),;:"));

var REGEXP_MODIFIERS = array_to_hash(characters("gmsiy"));

/* -----[ Tokenizer ]----- */

var UNICODE = {  // Unicode 6.1
    letter: new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0620-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0800-\\u0815\\u081A\\u0824\\u0828\\u0840-\\u0858\\u08A0\\u08A2-\\u08AC\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0CF1\\u0CF2\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D3A\\u0D3D\\u0D4E\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC-\\u0EDF\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8C\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10C7\\u10CD\\u10D0-\\u10FA\\u10FC-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u167F\\u1681-\\u169A\\u16A0-\\u16EA\\u16EE-\\u16F0\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u18B0-\\u18F5\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19AB\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1A20-\\u1A54\\u1AA7\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1BBA-\\u1BE5\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1CE9-\\u1CEC\\u1CEE-\\u1CF1\\u1CF5\\u1CF6\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u209C\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2160-\\u2188\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2CE4\\u2CEB-\\u2CEE\\u2CF2\\u2CF3\\u2D00-\\u2D25\\u2D27\\u2D2D\\u2D30-\\u2D67\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31BA\\u31F0-\\u31FF\\u3400-\\u4DB5\\u4E00-\\u9FCC\\uA000-\\uA48C\\uA4D0-\\uA4FD\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA66E\\uA67F-\\uA697\\uA6A0-\\uA6EF\\uA717-\\uA71F\\uA722-\\uA788\\uA78B-\\uA78E\\uA790-\\uA793\\uA7A0-\\uA7AA\\uA7F8-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA8F2-\\uA8F7\\uA8FB\\uA90A-\\uA925\\uA930-\\uA946\\uA960-\\uA97C\\uA984-\\uA9B2\\uA9CF\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAA60-\\uAA76\\uAA7A\\uAA80-\\uAAAF\\uAAB1\\uAAB5\\uAAB6\\uAAB9-\\uAABD\\uAAC0\\uAAC2\\uAADB-\\uAADD\\uAAE0-\\uAAEA\\uAAF2-\\uAAF4\\uAB01-\\uAB06\\uAB09-\\uAB0E\\uAB11-\\uAB16\\uAB20-\\uAB26\\uAB28-\\uAB2E\\uABC0-\\uABE2\\uAC00-\\uD7A3\\uD7B0-\\uD7C6\\uD7CB-\\uD7FB\\uF900-\\uFA6D\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
    combining_mark: new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065F\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0859-\\u085B\\u08E4-\\u08FE\\u0900-\\u0903\\u093A-\\u093C\\u093E-\\u094F\\u0951-\\u0957\\u0962\\u0963\\u0981-\\u0983\\u09BC\\u09BE-\\u09C4\\u09C7\\u09C8\\u09CB-\\u09CD\\u09D7\\u09E2\\u09E3\\u0A01-\\u0A03\\u0A3C\\u0A3E-\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81-\\u0A83\\u0ABC\\u0ABE-\\u0AC5\\u0AC7-\\u0AC9\\u0ACB-\\u0ACD\\u0AE2\\u0AE3\\u0B01-\\u0B03\\u0B3C\\u0B3E-\\u0B44\\u0B47\\u0B48\\u0B4B-\\u0B4D\\u0B56\\u0B57\\u0B62\\u0B63\\u0B82\\u0BBE-\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCD\\u0BD7\\u0C01-\\u0C03\\u0C3E-\\u0C44\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0C82\\u0C83\\u0CBC\\u0CBE-\\u0CC4\\u0CC6-\\u0CC8\\u0CCA-\\u0CCD\\u0CD5\\u0CD6\\u0CE2\\u0CE3\\u0D02\\u0D03\\u0D3E-\\u0D44\\u0D46-\\u0D48\\u0D4A-\\u0D4D\\u0D57\\u0D62\\u0D63\\u0D82\\u0D83\\u0DCA\\u0DCF-\\u0DD4\\u0DD6\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F3E\\u0F3F\\u0F71-\\u0F84\\u0F86\\u0F87\\u0F8D-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102B-\\u103E\\u1056-\\u1059\\u105E-\\u1060\\u1062-\\u1064\\u1067-\\u106D\\u1071-\\u1074\\u1082-\\u108D\\u108F\\u109A-\\u109D\\u135D-\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B4-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u192B\\u1930-\\u193B\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A17-\\u1A1B\\u1A55-\\u1A5E\\u1A60-\\u1A7C\\u1A7F\\u1B00-\\u1B04\\u1B34-\\u1B44\\u1B6B-\\u1B73\\u1B80-\\u1B82\\u1BA1-\\u1BAD\\u1BE6-\\u1BF3\\u1C24-\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE8\\u1CED\\u1CF2-\\u1CF4\\u1DC0-\\u1DE6\\u1DFC-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2D7F\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA674-\\uA67D\\uA69F\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA823-\\uA827\\uA880\\uA881\\uA8B4-\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA953\\uA980-\\uA983\\uA9B3-\\uA9C0\\uAA29-\\uAA36\\uAA43\\uAA4C\\uAA4D\\uAA7B\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uAAEB-\\uAAEF\\uAAF5\\uAAF6\\uABE3-\\uABEA\\uABEC\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
    connector_punctuation: new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]"),
    digit: new RegExp("[\\u0030-\\u0039\\u0660-\\u0669\\u06F0-\\u06F9\\u07C0-\\u07C9\\u0966-\\u096F\\u09E6-\\u09EF\\u0A66-\\u0A6F\\u0AE6-\\u0AEF\\u0B66-\\u0B6F\\u0BE6-\\u0BEF\\u0C66-\\u0C6F\\u0CE6-\\u0CEF\\u0D66-\\u0D6F\\u0E50-\\u0E59\\u0ED0-\\u0ED9\\u0F20-\\u0F29\\u1040-\\u1049\\u1090-\\u1099\\u17E0-\\u17E9\\u1810-\\u1819\\u1946-\\u194F\\u19D0-\\u19D9\\u1A80-\\u1A89\\u1A90-\\u1A99\\u1B50-\\u1B59\\u1BB0-\\u1BB9\\u1C40-\\u1C49\\u1C50-\\u1C59\\uA620-\\uA629\\uA8D0-\\uA8D9\\uA900-\\uA909\\uA9D0-\\uA9D9\\uAA50-\\uAA59\\uABF0-\\uABF9\\uFF10-\\uFF19]")
};

function is_letter(ch) {
    return UNICODE.letter.test(ch);
};

function is_digit(ch) {
    ch = ch.charCodeAt(0);
    return ch >= 48 && ch <= 57;
};

function is_unicode_digit(ch) {
    return UNICODE.digit.test(ch);
}

function is_alphanumeric_char(ch) {
    return is_digit(ch) || is_letter(ch);
};

function is_unicode_combining_mark(ch) {
    return UNICODE.combining_mark.test(ch);
};

function is_unicode_connector_punctuation(ch) {
    return UNICODE.connector_punctuation.test(ch);
};

function is_identifier_start(ch) {
    return ch == "$" || ch == "_" || is_letter(ch);
};

function is_identifier_char(ch) {
    return is_identifier_start(ch)
        || is_unicode_combining_mark(ch)
        || is_unicode_digit(ch)
        || is_unicode_connector_punctuation(ch)
        || ch == "\u200c" // zero-width non-joiner <ZWNJ>
        || ch == "\u200d" // zero-width joiner <ZWJ> (in my ECMA-262 PDF, this is also 200c)
    ;
};

function parse_js_number(num) {
    if (RE_HEX_NUMBER.test(num)) {
        return parseInt(num.substr(2), 16);
    } else if (RE_OCT_NUMBER.test(num)) {
        return parseInt(num.substr(1), 8);
    } else if (RE_DEC_NUMBER.test(num)) {
        return parseFloat(num);
    }
};

function JS_Parse_Error(message, line, col, pos) {
    this.message = message;
    this.line = line + 1;
    this.col = col + 1;
    this.pos = pos + 1;
    this.stack = new Error().stack;
};

JS_Parse_Error.prototype.toString = function() {
    return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
};

function js_error(message, line, col, pos) {
    throw new JS_Parse_Error(message, line, col, pos);
};

function is_token(token, type, val) {
    return token.type == type && (val == null || token.value == val);
};

var EX_EOF = {};

function tokenizer($TEXT) {

    var S = {
        text            : $TEXT.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/^\uFEFF/, ''),
        pos             : 0,
        tokpos          : 0,
        line            : 0,
        tokline         : 0,
        col             : 0,
        tokcol          : 0,
        newline_before  : false,
        regex_allowed   : false,
        comments_before : []
    };

    function peek() { return S.text.charAt(S.pos); };

    function next(signal_eof, in_string) {
        var ch = S.text.charAt(S.pos++);
        if (signal_eof && !ch)
            throw EX_EOF;
        if (ch == "\n") {
            S.newline_before = S.newline_before || !in_string;
            ++S.line;
            S.col = 0;
        } else {
            ++S.col;
        }
        return ch;
    };

    function eof() {
        return !S.peek();
    };

    function find(what, signal_eof) {
        var pos = S.text.indexOf(what, S.pos);
        if (signal_eof && pos == -1) throw EX_EOF;
        return pos;
    };

    function start_token() {
        S.tokline = S.line;
        S.tokcol = S.col;
        S.tokpos = S.pos;
    };

    function token(type, value, is_comment) {
        S.regex_allowed = ((type == "operator" && !HOP(UNARY_POSTFIX, value)) ||
                           (type == "keyword" && HOP(KEYWORDS_BEFORE_EXPRESSION, value)) ||
                           (type == "punc" && HOP(PUNC_BEFORE_EXPRESSION, value)));
        var ret = {
            type   : type,
            value  : value,
            line   : S.tokline,
            col    : S.tokcol,
            pos    : S.tokpos,
            endpos : S.pos,
            nlb    : S.newline_before
        };
        if (!is_comment) {
            ret.comments_before = S.comments_before;
            S.comments_before = [];
            // make note of any newlines in the comments that came before
            for (var i = 0, len = ret.comments_before.length; i < len; i++) {
                ret.nlb = ret.nlb || ret.comments_before[i].nlb;
            }
        }
        S.newline_before = false;
        return ret;
    };

    function skip_whitespace() {
        while (HOP(WHITESPACE_CHARS, peek()))
            next();
    };

    function read_while(pred) {
        var ret = "", ch = peek(), i = 0;
        while (ch && pred(ch, i++)) {
            ret += next();
            ch = peek();
        }
        return ret;
    };

    function parse_error(err) {
        js_error(err, S.tokline, S.tokcol, S.tokpos);
    };

    function read_num(prefix) {
        var has_e = false, after_e = false, has_x = false, has_dot = prefix == ".";
        var num = read_while(function(ch, i){
            if (ch == "x" || ch == "X") {
                if (has_x) return false;
                return has_x = true;
            }
            if (!has_x && (ch == "E" || ch == "e")) {
                if (has_e) return false;
                return has_e = after_e = true;
            }
            if (ch == "-") {
                if (after_e || (i == 0 && !prefix)) return true;
                return false;
            }
            if (ch == "+") return after_e;
            after_e = false;
            if (ch == ".") {
                if (!has_dot && !has_x && !has_e)
                    return has_dot = true;
                return false;
            }
            return is_alphanumeric_char(ch);
        });
        if (prefix)
            num = prefix + num;
        var valid = parse_js_number(num);
        if (!isNaN(valid)) {
            return token("num", valid);
        } else {
            parse_error("Invalid syntax: " + num);
        }
    };

    function read_escaped_char(in_string) {
        var ch = next(true, in_string);
        switch (ch) {
          case "n" : return "\n";
          case "r" : return "\r";
          case "t" : return "\t";
          case "b" : return "\b";
          case "v" : return "\u000b";
          case "f" : return "\f";
          case "0" : return "\0";
          case "x" : return String.fromCharCode(hex_bytes(2));
          case "u" : return String.fromCharCode(hex_bytes(4));
          case "\n": return "";
          default  : return ch;
        }
    };

    function hex_bytes(n) {
        var num = 0;
        for (; n > 0; --n) {
            var digit = parseInt(next(true), 16);
            if (isNaN(digit))
                parse_error("Invalid hex-character pattern in string");
            num = (num << 4) | digit;
        }
        return num;
    };

    function read_string() {
        return with_eof_error("Unterminated string constant", function(){
            var quote = next(), ret = "";
            for (;;) {
                var ch = next(true);
                if (ch == "\\") {
                    // read OctalEscapeSequence (XXX: deprecated if "strict mode")
                    // https://github.com/mishoo/UglifyJS/issues/178
                    var octal_len = 0, first = null;
                    ch = read_while(function(ch){
                        if (ch >= "0" && ch <= "7") {
                            if (!first) {
                                first = ch;
                                return ++octal_len;
                            }
                            else if (first <= "3" && octal_len <= 2) return ++octal_len;
                            else if (first >= "4" && octal_len <= 1) return ++octal_len;
                        }
                        return false;
                    });
                    if (octal_len > 0) ch = String.fromCharCode(parseInt(ch, 8));
                    else ch = read_escaped_char(true);
                }
                else if (ch == quote) break;
                else if (ch == "\n") throw EX_EOF;
                ret += ch;
            }
            return token("string", ret);
        });
    };

    function read_line_comment() {
        next();
        var i = find("\n"), ret;
        if (i == -1) {
            ret = S.text.substr(S.pos);
            S.pos = S.text.length;
        } else {
            ret = S.text.substring(S.pos, i);
            S.pos = i;
        }
        return token("comment1", ret, true);
    };

    function read_multiline_comment() {
        next();
        return with_eof_error("Unterminated multiline comment", function(){
            var i = find("*/", true),
            text = S.text.substring(S.pos, i);
            S.pos = i + 2;
            S.line += text.split("\n").length - 1;
            S.newline_before = S.newline_before || text.indexOf("\n") >= 0;

            // https://github.com/mishoo/UglifyJS/issues/#issue/100
            if (/^@cc_on/i.test(text)) {
                warn("WARNING: at line " + S.line);
                warn("*** Found \"conditional comment\": " + text);
                warn("*** UglifyJS DISCARDS ALL COMMENTS.  This means your code might no longer work properly in Internet Explorer.");
            }

            return token("comment2", text, true);
        });
    };

    function read_name() {
        var backslash = false, name = "", ch, escaped = false, hex;
        while ((ch = peek()) != null) {
            if (!backslash) {
                if (ch == "\\") escaped = backslash = true, next();
                else if (is_identifier_char(ch)) name += next();
                else break;
            }
            else {
                if (ch != "u") parse_error("Expecting UnicodeEscapeSequence -- uXXXX");
                ch = read_escaped_char();
                if (!is_identifier_char(ch)) parse_error("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier");
                name += ch;
                backslash = false;
            }
        }
        if (HOP(KEYWORDS, name) && escaped) {
            hex = name.charCodeAt(0).toString(16).toUpperCase();
            name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
        }
        return name;
    };

    function read_regexp(regexp) {
        return with_eof_error("Unterminated regular expression", function(){
            var prev_backslash = false, ch, in_class = false;
            while ((ch = next(true))) if (prev_backslash) {
                regexp += "\\" + ch;
                prev_backslash = false;
            } else if (ch == "[") {
                in_class = true;
                regexp += ch;
            } else if (ch == "]" && in_class) {
                in_class = false;
                regexp += ch;
            } else if (ch == "/" && !in_class) {
                break;
            } else if (ch == "\\") {
                prev_backslash = true;
            } else {
                regexp += ch;
            }
            var mods = read_name();
            return token("regexp", [ regexp, mods ]);
        });
    };

    function read_operator(prefix) {
        function grow(op) {
            if (!peek()) return op;
            var bigger = op + peek();
            if (HOP(OPERATORS, bigger)) {
                next();
                return grow(bigger);
            } else {
                return op;
            }
        };
        return token("operator", grow(prefix || next()));
    };

    function handle_slash() {
        next();
        var regex_allowed = S.regex_allowed;
        switch (peek()) {
          case "/":
            S.comments_before.push(read_line_comment());
            S.regex_allowed = regex_allowed;
            return next_token();
          case "*":
            S.comments_before.push(read_multiline_comment());
            S.regex_allowed = regex_allowed;
            return next_token();
        }
        return S.regex_allowed ? read_regexp("") : read_operator("/");
    };

    function handle_dot() {
        next();
        return is_digit(peek())
            ? read_num(".")
            : token("punc", ".");
    };

    function read_word() {
        var word = read_name();
        return !HOP(KEYWORDS, word)
            ? token("name", word)
            : HOP(OPERATORS, word)
            ? token("operator", word)
            : HOP(KEYWORDS_ATOM, word)
            ? token("atom", word)
            : token("keyword", word);
    };

    function with_eof_error(eof_error, cont) {
        try {
            return cont();
        } catch(ex) {
            if (ex === EX_EOF) parse_error(eof_error);
            else throw ex;
        }
    };

    function next_token(force_regexp) {
        if (force_regexp != null)
            return read_regexp(force_regexp);
        skip_whitespace();
        start_token();
        var ch = peek();
        if (!ch) return token("eof");
        if (is_digit(ch)) return read_num();
        if (ch == '"' || ch == "'") return read_string();
        if (HOP(PUNC_CHARS, ch)) return token("punc", next());
        if (ch == ".") return handle_dot();
        if (ch == "/") return handle_slash();
        if (HOP(OPERATOR_CHARS, ch)) return read_operator();
        if (ch == "\\" || is_identifier_start(ch)) return read_word();
        parse_error("Unexpected character '" + ch + "'");
    };

    next_token.context = function(nc) {
        if (nc) S = nc;
        return S;
    };

    return next_token;

};

/* -----[ Parser (constants) ]----- */

var UNARY_PREFIX = array_to_hash([
    "typeof",
    "void",
    "delete",
    "--",
    "++",
    "!",
    "~",
    "-",
    "+"
]);

var UNARY_POSTFIX = array_to_hash([ "--", "++" ]);

var ASSIGNMENT = (function(a, ret, i){
    while (i < a.length) {
        ret[a[i]] = a[i].substr(0, a[i].length - 1);
        i++;
    }
    return ret;
})(
    ["+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&="],
    { "=": true },
    0
);

var PRECEDENCE = (function(a, ret){
    for (var i = 0, n = 1; i < a.length; ++i, ++n) {
        var b = a[i];
        for (var j = 0; j < b.length; ++j) {
            ret[b[j]] = n;
        }
    }
    return ret;
})(
    [
        ["||"],
        ["&&"],
        ["|"],
        ["^"],
        ["&"],
        ["==", "===", "!=", "!=="],
        ["<", ">", "<=", ">=", "in", "instanceof"],
        [">>", "<<", ">>>"],
        ["+", "-"],
        ["*", "/", "%"]
    ],
    {}
);

var STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);

var ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);

/* -----[ Parser ]----- */

function NodeWithToken(str, start, end) {
    this.name = str;
    this.start = start;
    this.end = end;
};

NodeWithToken.prototype.toString = function() { return this.name; };

function parse($TEXT, exigent_mode, embed_tokens) {

    var S = {
        input         : typeof $TEXT == "string" ? tokenizer($TEXT, true) : $TEXT,
        token         : null,
        prev          : null,
        peeked        : null,
        in_function   : 0,
        in_directives : true,
        in_loop       : 0,
        labels        : []
    };

    S.token = next();

    function is(type, value) {
        return is_token(S.token, type, value);
    };

    function peek() { return S.peeked || (S.peeked = S.input()); };

    function next() {
        S.prev = S.token;
        if (S.peeked) {
            S.token = S.peeked;
            S.peeked = null;
        } else {
            S.token = S.input();
        }
        S.in_directives = S.in_directives && (
            S.token.type == "string" || is("punc", ";")
        );
        return S.token;
    };

    function prev() {
        return S.prev;
    };

    function croak(msg, line, col, pos) {
        var ctx = S.input.context();
        js_error(msg,
                 line != null ? line : ctx.tokline,
                 col != null ? col : ctx.tokcol,
                 pos != null ? pos : ctx.tokpos);
    };

    function token_error(token, msg) {
        croak(msg, token.line, token.col);
    };

    function unexpected(token) {
        if (token == null)
            token = S.token;
        token_error(token, "Unexpected token: " + token.type + " (" + token.value + ")");
    };

    function expect_token(type, val) {
        if (is(type, val)) {
            return next();
        }
        token_error(S.token, "Unexpected token " + S.token.type + ", expected " + type);
    };

    function expect(punc) { return expect_token("punc", punc); };

    function can_insert_semicolon() {
        return !exigent_mode && (
            S.token.nlb || is("eof") || is("punc", "}")
        );
    };

    function semicolon() {
        if (is("punc", ";")) next();
        else if (!can_insert_semicolon()) unexpected();
    };

    function as() {
        return slice(arguments);
    };

    function parenthesised() {
        expect("(");
        var ex = expression();
        expect(")");
        return ex;
    };

    function add_tokens(str, start, end) {
        return str instanceof NodeWithToken ? str : new NodeWithToken(str, start, end);
    };

    function maybe_embed_tokens(parser) {
        if (embed_tokens) return function() {
            var start = S.token;
            var ast = parser.apply(this, arguments);
            ast[0] = add_tokens(ast[0], start, prev());
            return ast;
        };
        else return parser;
    };

    var statement = maybe_embed_tokens(function() {
        if (is("operator", "/") || is("operator", "/=")) {
            S.peeked = null;
            S.token = S.input(S.token.value.substr(1)); // force regexp
        }
        switch (S.token.type) {
          case "string":
            var dir = S.in_directives, stat = simple_statement();
            if (dir && stat[1][0] == "string" && !is("punc", ","))
                return as("directive", stat[1][1]);
            return stat;
          case "num":
          case "regexp":
          case "operator":
          case "atom":
            return simple_statement();

          case "name":
            return is_token(peek(), "punc", ":")
                ? labeled_statement(prog1(S.token.value, next, next))
                : simple_statement();

          case "punc":
            switch (S.token.value) {
              case "{":
                return as("block", block_());
              case "[":
              case "(":
                return simple_statement();
              case ";":
                next();
                return as("block");
              default:
                unexpected();
            }

          case "keyword":
            switch (prog1(S.token.value, next)) {
              case "break":
                return break_cont("break");

              case "continue":
                return break_cont("continue");

              case "debugger":
                semicolon();
                return as("debugger");

              case "do":
                return (function(body){
                    expect_token("keyword", "while");
                    return as("do", prog1(parenthesised, semicolon), body);
                })(in_loop(statement));

              case "for":
                return for_();

              case "function":
                return function_(true);

              case "if":
                return if_();

              case "return":
                if (S.in_function == 0)
                    croak("'return' outside of function");
                return as("return",
                          is("punc", ";")
                          ? (next(), null)
                          : can_insert_semicolon()
                          ? null
                          : prog1(expression, semicolon));

              case "switch":
                return as("switch", parenthesised(), switch_block_());

              case "throw":
                if (S.token.nlb)
                    croak("Illegal newline after 'throw'");
                return as("throw", prog1(expression, semicolon));

              case "try":
                return try_();

              case "var":
                return prog1(var_, semicolon);

              case "const":
                return prog1(const_, semicolon);

              case "while":
                return as("while", parenthesised(), in_loop(statement));

              case "with":
                return as("with", parenthesised(), statement());

              default:
                unexpected();
            }
        }
    });

    function labeled_statement(label) {
        S.labels.push(label);
        var start = S.token, stat = statement();
        if (exigent_mode && !HOP(STATEMENTS_WITH_LABELS, stat[0]))
            unexpected(start);
        S.labels.pop();
        return as("label", label, stat);
    };

    function simple_statement() {
        return as("stat", prog1(expression, semicolon));
    };

    function break_cont(type) {
        var name;
        if (!can_insert_semicolon()) {
            name = is("name") ? S.token.value : null;
        }
        if (name != null) {
            next();
            if (!member(name, S.labels))
                croak("Label " + name + " without matching loop or statement");
        }
        else if (S.in_loop == 0)
            croak(type + " not inside a loop or switch");
        semicolon();
        return as(type, name);
    };

    function for_() {
        expect("(");
        var init = null;
        if (!is("punc", ";")) {
            init = is("keyword", "var")
                ? (next(), var_(true))
                : expression(true, true);
            if (is("operator", "in")) {
                if (init[0] == "var" && init[1].length > 1)
                    croak("Only one variable declaration allowed in for..in loop");
                return for_in(init);
            }
        }
        return regular_for(init);
    };

    function regular_for(init) {
        expect(";");
        var test = is("punc", ";") ? null : expression();
        expect(";");
        var step = is("punc", ")") ? null : expression();
        expect(")");
        return as("for", init, test, step, in_loop(statement));
    };

    function for_in(init) {
        var lhs = init[0] == "var" ? as("name", init[1][0]) : init;
        next();
        var obj = expression();
        expect(")");
        return as("for-in", init, lhs, obj, in_loop(statement));
    };

    var function_ = function(in_statement) {
        var name = is("name") ? prog1(S.token.value, next) : null;
        if (in_statement && !name)
            unexpected();
        expect("(");
        return as(in_statement ? "defun" : "function",
                  name,
                  // arguments
                  (function(first, a){
                      while (!is("punc", ")")) {
                          if (first) first = false; else expect(",");
                          if (!is("name")) unexpected();
                          a.push(S.token.value);
                          next();
                      }
                      next();
                      return a;
                  })(true, []),
                  // body
                  (function(){
                      ++S.in_function;
                      var loop = S.in_loop;
                      S.in_directives = true;
                      S.in_loop = 0;
                      var a = block_();
                      --S.in_function;
                      S.in_loop = loop;
                      return a;
                  })());
    };

    function if_() {
        var cond = parenthesised(), body = statement(), belse;
        if (is("keyword", "else")) {
            next();
            belse = statement();
        }
        return as("if", cond, body, belse);
    };

    function block_() {
        expect("{");
        var a = [];
        while (!is("punc", "}")) {
            if (is("eof")) unexpected();
            a.push(statement());
        }
        next();
        return a;
    };

    var switch_block_ = curry(in_loop, function(){
        expect("{");
        var a = [], cur = null;
        while (!is("punc", "}")) {
            if (is("eof")) unexpected();
            if (is("keyword", "case")) {
                next();
                cur = [];
                a.push([ expression(), cur ]);
                expect(":");
            }
            else if (is("keyword", "default")) {
                next();
                expect(":");
                cur = [];
                a.push([ null, cur ]);
            }
            else {
                if (!cur) unexpected();
                cur.push(statement());
            }
        }
        next();
        return a;
    });

    function try_() {
        var body = block_(), bcatch, bfinally;
        if (is("keyword", "catch")) {
            next();
            expect("(");
            if (!is("name"))
                croak("Name expected");
            var name = S.token.value;
            next();
            expect(")");
            bcatch = [ name, block_() ];
        }
        if (is("keyword", "finally")) {
            next();
            bfinally = block_();
        }
        if (!bcatch && !bfinally)
            croak("Missing catch/finally blocks");
        return as("try", body, bcatch, bfinally);
    };

    function vardefs(no_in) {
        var a = [];
        for (;;) {
            if (!is("name"))
                unexpected();
            var name = S.token.value;
            next();
            if (is("operator", "=")) {
                next();
                a.push([ name, expression(false, no_in) ]);
            } else {
                a.push([ name ]);
            }
            if (!is("punc", ","))
                break;
            next();
        }
        return a;
    };

    function var_(no_in) {
        return as("var", vardefs(no_in));
    };

    function const_() {
        return as("const", vardefs());
    };

    function new_() {
        var newexp = expr_atom(false), args;
        if (is("punc", "(")) {
            next();
            args = expr_list(")");
        } else {
            args = [];
        }
        return subscripts(as("new", newexp, args), true);
    };

    var expr_atom = maybe_embed_tokens(function(allow_calls) {
        if (is("operator", "new")) {
            next();
            return new_();
        }
        if (is("punc")) {
            switch (S.token.value) {
              case "(":
                next();
                return subscripts(prog1(expression, curry(expect, ")")), allow_calls);
              case "[":
                next();
                return subscripts(array_(), allow_calls);
              case "{":
                next();
                return subscripts(object_(), allow_calls);
            }
            unexpected();
        }
        if (is("keyword", "function")) {
            next();
            return subscripts(function_(false), allow_calls);
        }
        if (HOP(ATOMIC_START_TOKEN, S.token.type)) {
            var atom = S.token.type == "regexp"
                ? as("regexp", S.token.value[0], S.token.value[1])
                : as(S.token.type, S.token.value);
            return subscripts(prog1(atom, next), allow_calls);
        }
        unexpected();
    });

    function expr_list(closing, allow_trailing_comma, allow_empty) {
        var first = true, a = [];
        while (!is("punc", closing)) {
            if (first) first = false; else expect(",");
            if (allow_trailing_comma && is("punc", closing)) break;
            if (is("punc", ",") && allow_empty) {
                a.push([ "atom", "undefined" ]);
            } else {
                a.push(expression(false));
            }
        }
        next();
        return a;
    };

    function array_() {
        return as("array", expr_list("]", !exigent_mode, true));
    };

    function object_() {
        var first = true, a = [];
        while (!is("punc", "}")) {
            if (first) first = false; else expect(",");
            if (!exigent_mode && is("punc", "}"))
                // allow trailing comma
                break;
            var type = S.token.type;
            var name = as_property_name();
            if (type == "name" && (name == "get" || name == "set") && !is("punc", ":")) {
                a.push([ as_name(), function_(false), name ]);
            } else {
                expect(":");
                a.push([ name, expression(false) ]);
            }
        }
        next();
        return as("object", a);
    };

    function as_property_name() {
        switch (S.token.type) {
          case "num":
          case "string":
            return prog1(S.token.value, next);
        }
        return as_name();
    };

    function as_name() {
        switch (S.token.type) {
          case "name":
          case "operator":
          case "keyword":
          case "atom":
            return prog1(S.token.value, next);
          default:
            unexpected();
        }
    };

    function subscripts(expr, allow_calls) {
        if (is("punc", ".")) {
            next();
            return subscripts(as("dot", expr, as_name()), allow_calls);
        }
        if (is("punc", "[")) {
            next();
            return subscripts(as("sub", expr, prog1(expression, curry(expect, "]"))), allow_calls);
        }
        if (allow_calls && is("punc", "(")) {
            next();
            return subscripts(as("call", expr, expr_list(")")), true);
        }
        return expr;
    };

    function maybe_unary(allow_calls) {
        if (is("operator") && HOP(UNARY_PREFIX, S.token.value)) {
            return make_unary("unary-prefix",
                              prog1(S.token.value, next),
                              maybe_unary(allow_calls));
        }
        var val = expr_atom(allow_calls);
        while (is("operator") && HOP(UNARY_POSTFIX, S.token.value) && !S.token.nlb) {
            val = make_unary("unary-postfix", S.token.value, val);
            next();
        }
        return val;
    };

    function make_unary(tag, op, expr) {
        if ((op == "++" || op == "--") && !is_assignable(expr))
            croak("Invalid use of " + op + " operator");
        return as(tag, op, expr);
    };

    function expr_op(left, min_prec, no_in) {
        var op = is("operator") ? S.token.value : null;
        if (op && op == "in" && no_in) op = null;
        var prec = op != null ? PRECEDENCE[op] : null;
        if (prec != null && prec > min_prec) {
            next();
            var right = expr_op(maybe_unary(true), prec, no_in);
            return expr_op(as("binary", op, left, right), min_prec, no_in);
        }
        return left;
    };

    function expr_ops(no_in) {
        return expr_op(maybe_unary(true), 0, no_in);
    };

    function maybe_conditional(no_in) {
        var expr = expr_ops(no_in);
        if (is("operator", "?")) {
            next();
            var yes = expression(false);
            expect(":");
            return as("conditional", expr, yes, expression(false, no_in));
        }
        return expr;
    };

    function is_assignable(expr) {
        if (!exigent_mode) return true;
        switch (expr[0]+"") {
          case "dot":
          case "sub":
          case "new":
          case "call":
            return true;
          case "name":
            return expr[1] != "this";
        }
    };

    function maybe_assign(no_in) {
        var left = maybe_conditional(no_in), val = S.token.value;
        if (is("operator") && HOP(ASSIGNMENT, val)) {
            if (is_assignable(left)) {
                next();
                return as("assign", ASSIGNMENT[val], left, maybe_assign(no_in));
            }
            croak("Invalid assignment");
        }
        return left;
    };

    var expression = maybe_embed_tokens(function(commas, no_in) {
        if (arguments.length == 0)
            commas = true;
        var expr = maybe_assign(no_in);
        if (commas && is("punc", ",")) {
            next();
            return as("seq", expr, expression(true, no_in));
        }
        return expr;
    });

    function in_loop(cont) {
        try {
            ++S.in_loop;
            return cont();
        } finally {
            --S.in_loop;
        }
    };

    return as("toplevel", (function(a){
        while (!is("eof"))
            a.push(statement());
        return a;
    })([]));

};

/* -----[ Utilities ]----- */

function curry(f) {
    var args = slice(arguments, 1);
    return function() { return f.apply(this, args.concat(slice(arguments))); };
};

function prog1(ret) {
    if (ret instanceof Function)
        ret = ret();
    for (var i = 1, n = arguments.length; --n > 0; ++i)
        arguments[i]();
    return ret;
};

function array_to_hash(a) {
    var ret = {};
    for (var i = 0; i < a.length; ++i)
        ret[a[i]] = true;
    return ret;
};

function slice(a, start) {
    return Array.prototype.slice.call(a, start || 0);
};

function characters(str) {
    return str.split("");
};

function member(name, array) {
    for (var i = array.length; --i >= 0;)
        if (array[i] == name)
            return true;
    return false;
};

function HOP(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};

var warn = function() {};

/* -----[ Exports ]----- */

exports.tokenizer = tokenizer;
exports.parse = parse;
exports.slice = slice;
exports.curry = curry;
exports.member = member;
exports.array_to_hash = array_to_hash;
exports.PRECEDENCE = PRECEDENCE;
exports.KEYWORDS_ATOM = KEYWORDS_ATOM;
exports.RESERVED_WORDS = RESERVED_WORDS;
exports.KEYWORDS = KEYWORDS;
exports.ATOMIC_START_TOKEN = ATOMIC_START_TOKEN;
exports.OPERATORS = OPERATORS;
exports.is_alphanumeric_char = is_alphanumeric_char;
exports.is_identifier_start = is_identifier_start;
exports.is_identifier_char = is_identifier_char;
exports.set_logger = function(logger) {
    warn = logger;
};

// Local variables:
// js-indent-level: 4
// End:
});define('uglifyjs/squeeze-more', ["require", "exports", "module", "./parse-js", "./squeeze-more"], function(require, exports, module) {
var jsp = require("./parse-js"),
    pro = require("./process"),
    slice = jsp.slice,
    member = jsp.member,
    curry = jsp.curry,
    MAP = pro.MAP,
    PRECEDENCE = jsp.PRECEDENCE,
    OPERATORS = jsp.OPERATORS;

function ast_squeeze_more(ast) {
    var w = pro.ast_walker(), walk = w.walk, scope;
    function with_scope(s, cont) {
        var save = scope, ret;
        scope = s;
        ret = cont();
        scope = save;
        return ret;
    };
    function _lambda(name, args, body) {
        return [ this[0], name, args, with_scope(body.scope, curry(MAP, body, walk)) ];
    };
    return w.with_walkers({
        "toplevel": function(body) {
            return [ this[0], with_scope(this.scope, curry(MAP, body, walk)) ];
        },
        "function": _lambda,
        "defun": _lambda,
        "new": function(ctor, args) {
            if (ctor[0] == "name") {
                if (ctor[1] == "Array" && !scope.has("Array")) {
                    if (args.length != 1) {
                        return [ "array", args ];
                    } else {
                        return walk([ "call", [ "name", "Array" ], args ]);
                    }
                } else if (ctor[1] == "Object" && !scope.has("Object")) {
                    if (!args.length) {
                        return [ "object", [] ];
                    } else {
                        return walk([ "call", [ "name", "Object" ], args ]);
                    }
                } else if ((ctor[1] == "RegExp" || ctor[1] == "Function" || ctor[1] == "Error") && !scope.has(ctor[1])) {
                    return walk([ "call", [ "name", ctor[1] ], args]);
                }
            }
        },
        "call": function(expr, args) {
            if (expr[0] == "dot" && expr[1][0] == "string" && args.length == 1
                && (args[0][1] > 0 && expr[2] == "substring" || expr[2] == "substr")) {
                return [ "call", [ "dot", expr[1], "slice"], args];
            }
            if (expr[0] == "dot" && expr[2] == "toString" && args.length == 0) {
                // foo.toString()  ==>  foo+""
                if (expr[1][0] == "string") return expr[1];
                return [ "binary", "+", expr[1], [ "string", "" ]];
            }
            if (expr[0] == "name") {
                if (expr[1] == "Array" && args.length != 1 && !scope.has("Array")) {
                    return [ "array", args ];
                }
                if (expr[1] == "Object" && !args.length && !scope.has("Object")) {
                    return [ "object", [] ];
                }
                if (expr[1] == "String" && !scope.has("String")) {
                    return [ "binary", "+", args[0], [ "string", "" ]];
                }
            }
        }
    }, function() {
        return walk(pro.ast_add_scope(ast));
    });
};

exports.ast_squeeze_more = ast_squeeze_more;

// Local variables:
// js-indent-level: 4
// End:
});
define('uglifyjs/process', ["require", "exports", "module", "./parse-js", "./squeeze-more"], function(require, exports, module) {
/***********************************************************************

  A JavaScript tokenizer / parser / beautifier / compressor.

  This version is suitable for Node.js.  With minimal changes (the
  exports stuff) it should work on any JS platform.

  This file implements some AST processors.  They work on data built
  by parse-js.

  Exported functions:

    - ast_mangle(ast, options) -- mangles the variable/function names
      in the AST.  Returns an AST.

    - ast_squeeze(ast) -- employs various optimizations to make the
      final generated code even smaller.  Returns an AST.

    - gen_code(ast, options) -- generates JS code from the AST.  Pass
      true (or an object, see the code for some options) as second
      argument to get "pretty" (indented) code.

  -------------------------------- (C) ---------------------------------

                           Author: Mihai Bazon
                         <mihai.bazon@gmail.com>
                       http://mihai.bazon.net/blog

  Distributed under the BSD license:

    Copyright 2010 (c) Mihai Bazon <mihai.bazon@gmail.com>

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/

var jsp = require("./parse-js"),
    curry = jsp.curry,
    slice = jsp.slice,
    member = jsp.member,
    is_identifier_char = jsp.is_identifier_char,
    PRECEDENCE = jsp.PRECEDENCE,
    OPERATORS = jsp.OPERATORS;

/* -----[ helper for AST traversal ]----- */

function ast_walker() {
    function _vardefs(defs) {
        return [ this[0], MAP(defs, function(def){
            var a = [ def[0] ];
            if (def.length > 1)
                a[1] = walk(def[1]);
            return a;
        }) ];
    };
    function _block(statements) {
        var out = [ this[0] ];
        if (statements != null)
            out.push(MAP(statements, walk));
        return out;
    };
    var walkers = {
        "string": function(str) {
            return [ this[0], str ];
        },
        "num": function(num) {
            return [ this[0], num ];
        },
        "name": function(name) {
            return [ this[0], name ];
        },
        "toplevel": function(statements) {
            return [ this[0], MAP(statements, walk) ];
        },
        "block": _block,
        "splice": _block,
        "var": _vardefs,
        "const": _vardefs,
        "try": function(t, c, f) {
            return [
                this[0],
                MAP(t, walk),
                c != null ? [ c[0], MAP(c[1], walk) ] : null,
                f != null ? MAP(f, walk) : null
            ];
        },
        "throw": function(expr) {
            return [ this[0], walk(expr) ];
        },
        "new": function(ctor, args) {
            return [ this[0], walk(ctor), MAP(args, walk) ];
        },
        "switch": function(expr, body) {
            return [ this[0], walk(expr), MAP(body, function(branch){
                return [ branch[0] ? walk(branch[0]) : null,
                         MAP(branch[1], walk) ];
            }) ];
        },
        "break": function(label) {
            return [ this[0], label ];
        },
        "continue": function(label) {
            return [ this[0], label ];
        },
        "conditional": function(cond, t, e) {
            return [ this[0], walk(cond), walk(t), walk(e) ];
        },
        "assign": function(op, lvalue, rvalue) {
            return [ this[0], op, walk(lvalue), walk(rvalue) ];
        },
        "dot": function(expr) {
            return [ this[0], walk(expr) ].concat(slice(arguments, 1));
        },
        "call": function(expr, args) {
            return [ this[0], walk(expr), MAP(args, walk) ];
        },
        "function": function(name, args, body) {
            return [ this[0], name, args.slice(), MAP(body, walk) ];
        },
        "debugger": function() {
            return [ this[0] ];
        },
        "defun": function(name, args, body) {
            return [ this[0], name, args.slice(), MAP(body, walk) ];
        },
        "if": function(conditional, t, e) {
            return [ this[0], walk(conditional), walk(t), walk(e) ];
        },
        "for": function(init, cond, step, block) {
            return [ this[0], walk(init), walk(cond), walk(step), walk(block) ];
        },
        "for-in": function(vvar, key, hash, block) {
            return [ this[0], walk(vvar), walk(key), walk(hash), walk(block) ];
        },
        "while": function(cond, block) {
            return [ this[0], walk(cond), walk(block) ];
        },
        "do": function(cond, block) {
            return [ this[0], walk(cond), walk(block) ];
        },
        "return": function(expr) {
            return [ this[0], walk(expr) ];
        },
        "binary": function(op, left, right) {
            return [ this[0], op, walk(left), walk(right) ];
        },
        "unary-prefix": function(op, expr) {
            return [ this[0], op, walk(expr) ];
        },
        "unary-postfix": function(op, expr) {
            return [ this[0], op, walk(expr) ];
        },
        "sub": function(expr, subscript) {
            return [ this[0], walk(expr), walk(subscript) ];
        },
        "object": function(props) {
            return [ this[0], MAP(props, function(p){
                return p.length == 2
                    ? [ p[0], walk(p[1]) ]
                    : [ p[0], walk(p[1]), p[2] ]; // get/set-ter
            }) ];
        },
        "regexp": function(rx, mods) {
            return [ this[0], rx, mods ];
        },
        "array": function(elements) {
            return [ this[0], MAP(elements, walk) ];
        },
        "stat": function(stat) {
            return [ this[0], walk(stat) ];
        },
        "seq": function() {
            return [ this[0] ].concat(MAP(slice(arguments), walk));
        },
        "label": function(name, block) {
            return [ this[0], name, walk(block) ];
        },
        "with": function(expr, block) {
            return [ this[0], walk(expr), walk(block) ];
        },
        "atom": function(name) {
            return [ this[0], name ];
        },
        "directive": function(dir) {
            return [ this[0], dir ];
        }
    };

    var user = {};
    var stack = [];
    function walk(ast) {
        if (ast == null)
            return null;
        try {
            stack.push(ast);
            var type = ast[0];
            var gen = user[type];
            if (gen) {
                var ret = gen.apply(ast, ast.slice(1));
                if (ret != null)
                    return ret;
            }
            gen = walkers[type];
            return gen.apply(ast, ast.slice(1));
        } finally {
            stack.pop();
        }
    };

    function dive(ast) {
        if (ast == null)
            return null;
        try {
            stack.push(ast);
            return walkers[ast[0]].apply(ast, ast.slice(1));
        } finally {
            stack.pop();
        }
    };

    function with_walkers(walkers, cont){
        var save = {}, i;
        for (i in walkers) if (HOP(walkers, i)) {
            save[i] = user[i];
            user[i] = walkers[i];
        }
        var ret = cont();
        for (i in save) if (HOP(save, i)) {
            if (!save[i]) delete user[i];
            else user[i] = save[i];
        }
        return ret;
    };

    return {
        walk: walk,
        dive: dive,
        with_walkers: with_walkers,
        parent: function() {
            return stack[stack.length - 2]; // last one is current node
        },
        stack: function() {
            return stack;
        }
    };
};

/* -----[ Scope and mangling ]----- */

function Scope(parent) {
    this.names = {};        // names defined in this scope
    this.mangled = {};      // mangled names (orig.name => mangled)
    this.rev_mangled = {};  // reverse lookup (mangled => orig.name)
    this.cname = -1;        // current mangled name
    this.refs = {};         // names referenced from this scope
    this.uses_with = false; // will become TRUE if with() is detected in this or any subscopes
    this.uses_eval = false; // will become TRUE if eval() is detected in this or any subscopes
    this.directives = [];   // directives activated from this scope
    this.parent = parent;   // parent scope
    this.children = [];     // sub-scopes
    if (parent) {
        this.level = parent.level + 1;
        parent.children.push(this);
    } else {
        this.level = 0;
    }
};

function base54_digits() {
    if (typeof DIGITS_OVERRIDE_FOR_TESTING != "undefined")
        return DIGITS_OVERRIDE_FOR_TESTING;
    else
        return "etnrisouaflchpdvmgybwESxTNCkLAOM_DPHBjFIqRUzWXV$JKQGYZ0516372984";
}

var base54 = (function(){
    var DIGITS = base54_digits();
    return function(num) {
        var ret = "", base = 54;
        do {
            ret += DIGITS.charAt(num % base);
            num = Math.floor(num / base);
            base = 64;
        } while (num > 0);
        return ret;
    };
})();

Scope.prototype = {
    has: function(name) {
        for (var s = this; s; s = s.parent)
            if (HOP(s.names, name))
                return s;
    },
    has_mangled: function(mname) {
        for (var s = this; s; s = s.parent)
            if (HOP(s.rev_mangled, mname))
                return s;
    },
    toJSON: function() {
        return {
            names: this.names,
            uses_eval: this.uses_eval,
            uses_with: this.uses_with
        };
    },

    next_mangled: function() {
        // we must be careful that the new mangled name:
        //
        // 1. doesn't shadow a mangled name from a parent
        //    scope, unless we don't reference the original
        //    name from this scope OR from any sub-scopes!
        //    This will get slow.
        //
        // 2. doesn't shadow an original name from a parent
        //    scope, in the event that the name is not mangled
        //    in the parent scope and we reference that name
        //    here OR IN ANY SUBSCOPES!
        //
        // 3. doesn't shadow a name that is referenced but not
        //    defined (possibly global defined elsewhere).
        for (;;) {
            var m = base54(++this.cname), prior;

            // case 1.
            prior = this.has_mangled(m);
            if (prior && this.refs[prior.rev_mangled[m]] === prior)
                continue;

            // case 2.
            prior = this.has(m);
            if (prior && prior !== this && this.refs[m] === prior && !prior.has_mangled(m))
                continue;

            // case 3.
            if (HOP(this.refs, m) && this.refs[m] == null)
                continue;

            // I got "do" once. :-/
            if (!is_identifier(m))
                continue;

            return m;
        }
    },
    set_mangle: function(name, m) {
        this.rev_mangled[m] = name;
        return this.mangled[name] = m;
    },
    get_mangled: function(name, newMangle) {
        if (this.uses_eval || this.uses_with) return name; // no mangle if eval or with is in use
        var s = this.has(name);
        if (!s) return name; // not in visible scope, no mangle
        if (HOP(s.mangled, name)) return s.mangled[name]; // already mangled in this scope
        if (!newMangle) return name;                      // not found and no mangling requested
        return s.set_mangle(name, s.next_mangled());
    },
    references: function(name) {
        return name && !this.parent || this.uses_with || this.uses_eval || this.refs[name];
    },
    define: function(name, type) {
        if (name != null) {
            if (type == "var" || !HOP(this.names, name))
                this.names[name] = type || "var";
            return name;
        }
    },
    active_directive: function(dir) {
        return member(dir, this.directives) || this.parent && this.parent.active_directive(dir);
    }
};

function ast_add_scope(ast) {

    var current_scope = null;
    var w = ast_walker(), walk = w.walk;
    var having_eval = [];

    function with_new_scope(cont) {
        current_scope = new Scope(current_scope);
        current_scope.labels = new Scope();
        var ret = current_scope.body = cont();
        ret.scope = current_scope;
        current_scope = current_scope.parent;
        return ret;
    };

    function define(name, type) {
        return current_scope.define(name, type);
    };

    function reference(name) {
        current_scope.refs[name] = true;
    };

    function _lambda(name, args, body) {
        var is_defun = this[0] == "defun";
        return [ this[0], is_defun ? define(name, "defun") : name, args, with_new_scope(function(){
            if (!is_defun) define(name, "lambda");
            MAP(args, function(name){ define(name, "arg") });
            return MAP(body, walk);
        })];
    };

    function _vardefs(type) {
        return function(defs) {
            MAP(defs, function(d){
                define(d[0], type);
                if (d[1]) reference(d[0]);
            });
        };
    };

    function _breacont(label) {
        if (label)
            current_scope.labels.refs[label] = true;
    };

    return with_new_scope(function(){
        // process AST
        var ret = w.with_walkers({
            "function": _lambda,
            "defun": _lambda,
            "label": function(name, stat) { current_scope.labels.define(name) },
            "break": _breacont,
            "continue": _breacont,
            "with": function(expr, block) {
                for (var s = current_scope; s; s = s.parent)
                    s.uses_with = true;
            },
            "var": _vardefs("var"),
            "const": _vardefs("const"),
            "try": function(t, c, f) {
                if (c != null) return [
                    this[0],
                    MAP(t, walk),
                    [ define(c[0], "catch"), MAP(c[1], walk) ],
                    f != null ? MAP(f, walk) : null
                ];
            },
            "name": function(name) {
                if (name == "eval")
                    having_eval.push(current_scope);
                reference(name);
            }
        }, function(){
            return walk(ast);
        });

        // the reason why we need an additional pass here is
        // that names can be used prior to their definition.

        // scopes where eval was detected and their parents
        // are marked with uses_eval, unless they define the
        // "eval" name.
        MAP(having_eval, function(scope){
            if (!scope.has("eval")) while (scope) {
                scope.uses_eval = true;
                scope = scope.parent;
            }
        });

        // for referenced names it might be useful to know
        // their origin scope.  current_scope here is the
        // toplevel one.
        function fixrefs(scope, i) {
            // do children first; order shouldn't matter
            for (i = scope.children.length; --i >= 0;)
                fixrefs(scope.children[i]);
            for (i in scope.refs) if (HOP(scope.refs, i)) {
                // find origin scope and propagate the reference to origin
                for (var origin = scope.has(i), s = scope; s; s = s.parent) {
                    s.refs[i] = origin;
                    if (s === origin) break;
                }
            }
        };
        fixrefs(current_scope);

        return ret;
    });

};

/* -----[ mangle names ]----- */

function ast_mangle(ast, options) {
    var w = ast_walker(), walk = w.walk, scope;
    options = defaults(options, {
        mangle       : true,
        toplevel     : false,
        defines      : null,
        except       : null,
        no_functions : false
    });

    function get_mangled(name, newMangle) {
        if (!options.mangle) return name;
        if (!options.toplevel && !scope.parent) return name; // don't mangle toplevel
        if (options.except && member(name, options.except))
            return name;
        if (options.no_functions && HOP(scope.names, name) &&
            (scope.names[name] == 'defun' || scope.names[name] == 'lambda'))
            return name;
        return scope.get_mangled(name, newMangle);
    };

    function get_define(name) {
        if (options.defines) {
            // we always lookup a defined symbol for the current scope FIRST, so declared
            // vars trump a DEFINE symbol, but if no such var is found, then match a DEFINE value
            if (!scope.has(name)) {
                if (HOP(options.defines, name)) {
                    return options.defines[name];
                }
            }
            return null;
        }
    };

    function _lambda(name, args, body) {
        if (!options.no_functions && options.mangle) {
            var is_defun = this[0] == "defun", extra;
            if (name) {
                if (is_defun) name = get_mangled(name);
                else if (body.scope.references(name)) {
                    extra = {};
                    if (!(scope.uses_eval || scope.uses_with))
                        name = extra[name] = scope.next_mangled();
                    else
                        extra[name] = name;
                }
                else name = null;
            }
        }
        body = with_scope(body.scope, function(){
            args = MAP(args, function(name){ return get_mangled(name) });
            return MAP(body, walk);
        }, extra);
        return [ this[0], name, args, body ];
    };

    function with_scope(s, cont, extra) {
        var _scope = scope;
        scope = s;
        if (extra) for (var i in extra) if (HOP(extra, i)) {
            s.set_mangle(i, extra[i]);
        }
        for (var i in s.names) if (HOP(s.names, i)) {
            get_mangled(i, true);
        }
        var ret = cont();
        ret.scope = s;
        scope = _scope;
        return ret;
    };

    function _vardefs(defs) {
        return [ this[0], MAP(defs, function(d){
            return [ get_mangled(d[0]), walk(d[1]) ];
        }) ];
    };

    function _breacont(label) {
        if (label) return [ this[0], scope.labels.get_mangled(label) ];
    };

    return w.with_walkers({
        "function": _lambda,
        "defun": function() {
            // move function declarations to the top when
            // they are not in some block.
            var ast = _lambda.apply(this, arguments);
            switch (w.parent()[0]) {
              case "toplevel":
              case "function":
              case "defun":
                return MAP.at_top(ast);
            }
            return ast;
        },
        "label": function(label, stat) {
            if (scope.labels.refs[label]) return [
                this[0],
                scope.labels.get_mangled(label, true),
                walk(stat)
            ];
            return walk(stat);
        },
        "break": _breacont,
        "continue": _breacont,
        "var": _vardefs,
        "const": _vardefs,
        "name": function(name) {
            return get_define(name) || [ this[0], get_mangled(name) ];
        },
        "try": function(t, c, f) {
            return [ this[0],
                     MAP(t, walk),
                     c != null ? [ get_mangled(c[0]), MAP(c[1], walk) ] : null,
                     f != null ? MAP(f, walk) : null ];
        },
        "toplevel": function(body) {
            var self = this;
            return with_scope(self.scope, function(){
                return [ self[0], MAP(body, walk) ];
            });
        },
        "directive": function() {
            return MAP.at_top(this);
        }
    }, function() {
        return walk(ast_add_scope(ast));
    });
};

/* -----[
   - compress foo["bar"] into foo.bar,
   - remove block brackets {} where possible
   - join consecutive var declarations
   - various optimizations for IFs:
   - if (cond) foo(); else bar();  ==>  cond?foo():bar();
   - if (cond) foo();  ==>  cond&&foo();
   - if (foo) return bar(); else return baz();  ==> return foo?bar():baz(); // also for throw
   - if (foo) return bar(); else something();  ==> {if(foo)return bar();something()}
   ]----- */

var warn = function(){};

function best_of(ast1, ast2) {
    return gen_code(ast1).length > gen_code(ast2[0] == "stat" ? ast2[1] : ast2).length ? ast2 : ast1;
};

function last_stat(b) {
    if (b[0] == "block" && b[1] && b[1].length > 0)
        return b[1][b[1].length - 1];
    return b;
}

function aborts(t) {
    if (t) switch (last_stat(t)[0]) {
      case "return":
      case "break":
      case "continue":
      case "throw":
        return true;
    }
};

function boolean_expr(expr) {
    return ( (expr[0] == "unary-prefix"
              && member(expr[1], [ "!", "delete" ])) ||

             (expr[0] == "binary"
              && member(expr[1], [ "in", "instanceof", "==", "!=", "===", "!==", "<", "<=", ">=", ">" ])) ||

             (expr[0] == "binary"
              && member(expr[1], [ "&&", "||" ])
              && boolean_expr(expr[2])
              && boolean_expr(expr[3])) ||

             (expr[0] == "conditional"
              && boolean_expr(expr[2])
              && boolean_expr(expr[3])) ||

             (expr[0] == "assign"
              && expr[1] === true
              && boolean_expr(expr[3])) ||

             (expr[0] == "seq"
              && boolean_expr(expr[expr.length - 1]))
           );
};

function empty(b) {
    return !b || (b[0] == "block" && (!b[1] || b[1].length == 0));
};

function is_string(node) {
    return (node[0] == "string" ||
            node[0] == "unary-prefix" && node[1] == "typeof" ||
            node[0] == "binary" && node[1] == "+" &&
            (is_string(node[2]) || is_string(node[3])));
};

var when_constant = (function(){

    var $NOT_CONSTANT = {};

    // this can only evaluate constant expressions.  If it finds anything
    // not constant, it throws $NOT_CONSTANT.
    function evaluate(expr) {
        switch (expr[0]) {
          case "string":
          case "num":
            return expr[1];
          case "name":
          case "atom":
            switch (expr[1]) {
              case "true": return true;
              case "false": return false;
              case "null": return null;
            }
            break;
          case "unary-prefix":
            switch (expr[1]) {
              case "!": return !evaluate(expr[2]);
              case "typeof": return typeof evaluate(expr[2]);
              case "~": return ~evaluate(expr[2]);
              case "-": return -evaluate(expr[2]);
              case "+": return +evaluate(expr[2]);
            }
            break;
          case "binary":
            var left = expr[2], right = expr[3];
            switch (expr[1]) {
              case "&&"         : return evaluate(left) &&         evaluate(right);
              case "||"         : return evaluate(left) ||         evaluate(right);
              case "|"          : return evaluate(left) |          evaluate(right);
              case "&"          : return evaluate(left) &          evaluate(right);
              case "^"          : return evaluate(left) ^          evaluate(right);
              case "+"          : return evaluate(left) +          evaluate(right);
              case "*"          : return evaluate(left) *          evaluate(right);
              case "/"          : return evaluate(left) /          evaluate(right);
              case "%"          : return evaluate(left) %          evaluate(right);
              case "-"          : return evaluate(left) -          evaluate(right);
              case "<<"         : return evaluate(left) <<         evaluate(right);
              case ">>"         : return evaluate(left) >>         evaluate(right);
              case ">>>"        : return evaluate(left) >>>        evaluate(right);
              case "=="         : return evaluate(left) ==         evaluate(right);
              case "==="        : return evaluate(left) ===        evaluate(right);
              case "!="         : return evaluate(left) !=         evaluate(right);
              case "!=="        : return evaluate(left) !==        evaluate(right);
              case "<"          : return evaluate(left) <          evaluate(right);
              case "<="         : return evaluate(left) <=         evaluate(right);
              case ">"          : return evaluate(left) >          evaluate(right);
              case ">="         : return evaluate(left) >=         evaluate(right);
              case "in"         : return evaluate(left) in         evaluate(right);
              case "instanceof" : return evaluate(left) instanceof evaluate(right);
            }
        }
        throw $NOT_CONSTANT;
    };

    return function(expr, yes, no) {
        try {
            var val = evaluate(expr), ast;
            switch (typeof val) {
              case "string": ast =  [ "string", val ]; break;
              case "number": ast =  [ "num", val ]; break;
              case "boolean": ast =  [ "name", String(val) ]; break;
              default:
                if (val === null) { ast = [ "atom", "null" ]; break; }
                throw new Error("Can't handle constant of type: " + (typeof val));
            }
            return yes.call(expr, ast, val);
        } catch(ex) {
            if (ex === $NOT_CONSTANT) {
                if (expr[0] == "binary"
                    && (expr[1] == "===" || expr[1] == "!==")
                    && ((is_string(expr[2]) && is_string(expr[3]))
                        || (boolean_expr(expr[2]) && boolean_expr(expr[3])))) {
                    expr[1] = expr[1].substr(0, 2);
                }
                else if (no && expr[0] == "binary"
                         && (expr[1] == "||" || expr[1] == "&&")) {
                    // the whole expression is not constant but the lval may be...
                    try {
                        var lval = evaluate(expr[2]);
                        expr = ((expr[1] == "&&" && (lval ? expr[3] : lval))    ||
                                (expr[1] == "||" && (lval ? lval    : expr[3])) ||
                                expr);
                    } catch(ex2) {
                        // IGNORE... lval is not constant
                    }
                }
                return no ? no.call(expr, expr) : null;
            }
            else throw ex;
        }
    };

})();

function warn_unreachable(ast) {
    if (!empty(ast))
        warn("Dropping unreachable code: " + gen_code(ast, true));
};

function prepare_ifs(ast) {
    var w = ast_walker(), walk = w.walk;
    // In this first pass, we rewrite ifs which abort with no else with an
    // if-else.  For example:
    //
    // if (x) {
    //     blah();
    //     return y;
    // }
    // foobar();
    //
    // is rewritten into:
    //
    // if (x) {
    //     blah();
    //     return y;
    // } else {
    //     foobar();
    // }
    function redo_if(statements) {
        statements = MAP(statements, walk);

        for (var i = 0; i < statements.length; ++i) {
            var fi = statements[i];
            if (fi[0] != "if") continue;

            if (fi[3]) continue;

            var t = fi[2];
            if (!aborts(t)) continue;

            var conditional = walk(fi[1]);

            var e_body = redo_if(statements.slice(i + 1));
            var e = e_body.length == 1 ? e_body[0] : [ "block", e_body ];

            return statements.slice(0, i).concat([ [
                fi[0],          // "if"
                conditional,    // conditional
                t,              // then
                e               // else
            ] ]);
        }

        return statements;
    };

    function redo_if_lambda(name, args, body) {
        body = redo_if(body);
        return [ this[0], name, args, body ];
    };

    function redo_if_block(statements) {
        return [ this[0], statements != null ? redo_if(statements) : null ];
    };

    return w.with_walkers({
        "defun": redo_if_lambda,
        "function": redo_if_lambda,
        "block": redo_if_block,
        "splice": redo_if_block,
        "toplevel": function(statements) {
            return [ this[0], redo_if(statements) ];
        },
        "try": function(t, c, f) {
            return [
                this[0],
                redo_if(t),
                c != null ? [ c[0], redo_if(c[1]) ] : null,
                f != null ? redo_if(f) : null
            ];
        }
    }, function() {
        return walk(ast);
    });
};

function for_side_effects(ast, handler) {
    var w = ast_walker(), walk = w.walk;
    var $stop = {}, $restart = {};
    function stop() { throw $stop };
    function restart() { throw $restart };
    function found(){ return handler.call(this, this, w, stop, restart) };
    function unary(op) {
        if (op == "++" || op == "--")
            return found.apply(this, arguments);
    };
    function binary(op) {
        if (op == "&&" || op == "||")
            return found.apply(this, arguments);
    };
    return w.with_walkers({
        "try": found,
        "throw": found,
        "return": found,
        "new": found,
        "switch": found,
        "break": found,
        "continue": found,
        "assign": found,
        "call": found,
        "if": found,
        "for": found,
        "for-in": found,
        "while": found,
        "do": found,
        "return": found,
        "unary-prefix": unary,
        "unary-postfix": unary,
        "conditional": found,
        "binary": binary,
        "defun": found
    }, function(){
        while (true) try {
            walk(ast);
            break;
        } catch(ex) {
            if (ex === $stop) break;
            if (ex === $restart) continue;
            throw ex;
        }
    });
};

function ast_lift_variables(ast) {
    var w = ast_walker(), walk = w.walk, scope;
    function do_body(body, env) {
        var _scope = scope;
        scope = env;
        body = MAP(body, walk);
        var hash = {}, names = MAP(env.names, function(type, name){
            if (type != "var") return MAP.skip;
            if (!env.references(name)) return MAP.skip;
            hash[name] = true;
            return [ name ];
        });
        if (names.length > 0) {
            // looking for assignments to any of these variables.
            // we can save considerable space by moving the definitions
            // in the var declaration.
            for_side_effects([ "block", body ], function(ast, walker, stop, restart) {
                if (ast[0] == "assign"
                    && ast[1] === true
                    && ast[2][0] == "name"
                    && HOP(hash, ast[2][1])) {
                    // insert the definition into the var declaration
                    for (var i = names.length; --i >= 0;) {
                        if (names[i][0] == ast[2][1]) {
                            if (names[i][1]) // this name already defined, we must stop
                                stop();
                            names[i][1] = ast[3]; // definition
                            names.push(names.splice(i, 1)[0]);
                            break;
                        }
                    }
                    // remove this assignment from the AST.
                    var p = walker.parent();
                    if (p[0] == "seq") {
                        var a = p[2];
                        a.unshift(0, p.length);
                        p.splice.apply(p, a);
                    }
                    else if (p[0] == "stat") {
                        p.splice(0, p.length, "block"); // empty statement
                    }
                    else {
                        stop();
                    }
                    restart();
                }
                stop();
            });
            body.unshift([ "var", names ]);
        }
        scope = _scope;
        return body;
    };
    function _vardefs(defs) {
        var ret = null;
        for (var i = defs.length; --i >= 0;) {
            var d = defs[i];
            if (!d[1]) continue;
            d = [ "assign", true, [ "name", d[0] ], d[1] ];
            if (ret == null) ret = d;
            else ret = [ "seq", d, ret ];
        }
        if (ret == null && w.parent()[0] != "for") {
            if (w.parent()[0] == "for-in")
                return [ "name", defs[0][0] ];
            return MAP.skip;
        }
        return [ "stat", ret ];
    };
    function _toplevel(body) {
        return [ this[0], do_body(body, this.scope) ];
    };
    return w.with_walkers({
        "function": function(name, args, body){
            for (var i = args.length; --i >= 0 && !body.scope.references(args[i]);)
                args.pop();
            if (!body.scope.references(name)) name = null;
            return [ this[0], name, args, do_body(body, body.scope) ];
        },
        "defun": function(name, args, body){
            if (!scope.references(name)) return MAP.skip;
            for (var i = args.length; --i >= 0 && !body.scope.references(args[i]);)
                args.pop();
            return [ this[0], name, args, do_body(body, body.scope) ];
        },
        "var": _vardefs,
        "toplevel": _toplevel
    }, function(){
        return walk(ast_add_scope(ast));
    });
};

function ast_squeeze(ast, options) {
    ast = squeeze_1(ast, options);
    ast = squeeze_2(ast, options);
    return ast;
};

function squeeze_1(ast, options) {
    options = defaults(options, {
        make_seqs   : true,
        dead_code   : true,
        no_warnings : false,
        keep_comps  : true,
        unsafe      : false
    });

    var w = ast_walker(), walk = w.walk, scope;

    function negate(c) {
        var not_c = [ "unary-prefix", "!", c ];
        switch (c[0]) {
          case "unary-prefix":
            return c[1] == "!" && boolean_expr(c[2]) ? c[2] : not_c;
          case "seq":
            c = slice(c);
            c[c.length - 1] = negate(c[c.length - 1]);
            return c;
          case "conditional":
            return best_of(not_c, [ "conditional", c[1], negate(c[2]), negate(c[3]) ]);
          case "binary":
            var op = c[1], left = c[2], right = c[3];
            if (!options.keep_comps) switch (op) {
              case "<="  : return [ "binary", ">", left, right ];
              case "<"   : return [ "binary", ">=", left, right ];
              case ">="  : return [ "binary", "<", left, right ];
              case ">"   : return [ "binary", "<=", left, right ];
            }
            switch (op) {
              case "=="  : return [ "binary", "!=", left, right ];
              case "!="  : return [ "binary", "==", left, right ];
              case "===" : return [ "binary", "!==", left, right ];
              case "!==" : return [ "binary", "===", left, right ];
              case "&&"  : return best_of(not_c, [ "binary", "||", negate(left), negate(right) ]);
              case "||"  : return best_of(not_c, [ "binary", "&&", negate(left), negate(right) ]);
            }
            break;
        }
        return not_c;
    };

    function make_conditional(c, t, e) {
        var make_real_conditional = function() {
            if (c[0] == "unary-prefix" && c[1] == "!") {
                return e ? [ "conditional", c[2], e, t ] : [ "binary", "||", c[2], t ];
            } else {
                return e ? best_of(
                    [ "conditional", c, t, e ],
                    [ "conditional", negate(c), e, t ]
                ) : [ "binary", "&&", c, t ];
            }
        };
        // shortcut the conditional if the expression has a constant value
        return when_constant(c, function(ast, val){
            warn_unreachable(val ? e : t);
            return          (val ? t : e);
        }, make_real_conditional);
    };

    function rmblock(block) {
        if (block != null && block[0] == "block" && block[1]) {
            if (block[1].length == 1)
                block = block[1][0];
            else if (block[1].length == 0)
                block = [ "block" ];
        }
        return block;
    };

    function _lambda(name, args, body) {
        return [ this[0], name, args, tighten(body, "lambda") ];
    };

    // this function does a few things:
    // 1. discard useless blocks
    // 2. join consecutive var declarations
    // 3. remove obviously dead code
    // 4. transform consecutive statements using the comma operator
    // 5. if block_type == "lambda" and it detects constructs like if(foo) return ... - rewrite like if (!foo) { ... }
    function tighten(statements, block_type) {
        statements = MAP(statements, walk);

        statements = statements.reduce(function(a, stat){
            if (stat[0] == "block") {
                if (stat[1]) {
                    a.push.apply(a, stat[1]);
                }
            } else {
                a.push(stat);
            }
            return a;
        }, []);

        statements = (function(a, prev){
            statements.forEach(function(cur){
                if (prev && ((cur[0] == "var" && prev[0] == "var") ||
                             (cur[0] == "const" && prev[0] == "const"))) {
                    prev[1] = prev[1].concat(cur[1]);
                } else {
                    a.push(cur);
                    prev = cur;
                }
            });
            return a;
        })([]);

        if (options.dead_code) statements = (function(a, has_quit){
            statements.forEach(function(st){
                if (has_quit) {
                    if (st[0] == "function" || st[0] == "defun") {
                        a.push(st);
                    }
                    else if (st[0] == "var" || st[0] == "const") {
                        if (!options.no_warnings)
                            warn("Variables declared in unreachable code");
                        st[1] = MAP(st[1], function(def){
                            if (def[1] && !options.no_warnings)
                                warn_unreachable([ "assign", true, [ "name", def[0] ], def[1] ]);
                            return [ def[0] ];
                        });
                        a.push(st);
                    }
                    else if (!options.no_warnings)
                        warn_unreachable(st);
                }
                else {
                    a.push(st);
                    if (member(st[0], [ "return", "throw", "break", "continue" ]))
                        has_quit = true;
                }
            });
            return a;
        })([]);

        if (options.make_seqs) statements = (function(a, prev) {
            statements.forEach(function(cur){
                if (prev && prev[0] == "stat" && cur[0] == "stat") {
                    prev[1] = [ "seq", prev[1], cur[1] ];
                } else {
                    a.push(cur);
                    prev = cur;
                }
            });
            if (a.length >= 2
                && a[a.length-2][0] == "stat"
                && (a[a.length-1][0] == "return" || a[a.length-1][0] == "throw")
                && a[a.length-1][1])
            {
                a.splice(a.length - 2, 2,
                         [ a[a.length-1][0],
                           [ "seq", a[a.length-2][1], a[a.length-1][1] ]]);
            }
            return a;
        })([]);

        // this increases jQuery by 1K.  Probably not such a good idea after all..
        // part of this is done in prepare_ifs anyway.
        // if (block_type == "lambda") statements = (function(i, a, stat){
        //         while (i < statements.length) {
        //                 stat = statements[i++];
        //                 if (stat[0] == "if" && !stat[3]) {
        //                         if (stat[2][0] == "return" && stat[2][1] == null) {
        //                                 a.push(make_if(negate(stat[1]), [ "block", statements.slice(i) ]));
        //                                 break;
        //                         }
        //                         var last = last_stat(stat[2]);
        //                         if (last[0] == "return" && last[1] == null) {
        //                                 a.push(make_if(stat[1], [ "block", stat[2][1].slice(0, -1) ], [ "block", statements.slice(i) ]));
        //                                 break;
        //                         }
        //                 }
        //                 a.push(stat);
        //         }
        //         return a;
        // })(0, []);

        return statements;
    };

    function make_if(c, t, e) {
        return when_constant(c, function(ast, val){
            if (val) {
                t = walk(t);
                warn_unreachable(e);
                return t || [ "block" ];
            } else {
                e = walk(e);
                warn_unreachable(t);
                return e || [ "block" ];
            }
        }, function() {
            return make_real_if(c, t, e);
        });
    };

    function abort_else(c, t, e) {
        var ret = [ [ "if", negate(c), e ] ];
        if (t[0] == "block") {
            if (t[1]) ret = ret.concat(t[1]);
        } else {
            ret.push(t);
        }
        return walk([ "block", ret ]);
    };

    function make_real_if(c, t, e) {
        c = walk(c);
        t = walk(t);
        e = walk(e);

        if (empty(e) && empty(t))
            return [ "stat", c ];

        if (empty(t)) {
            c = negate(c);
            t = e;
            e = null;
        } else if (empty(e)) {
            e = null;
        } else {
            // if we have both else and then, maybe it makes sense to switch them?
            (function(){
                var a = gen_code(c);
                var n = negate(c);
                var b = gen_code(n);
                if (b.length < a.length) {
                    var tmp = t;
                    t = e;
                    e = tmp;
                    c = n;
                }
            })();
        }
        var ret = [ "if", c, t, e ];
        if (t[0] == "if" && empty(t[3]) && empty(e)) {
            ret = best_of(ret, walk([ "if", [ "binary", "&&", c, t[1] ], t[2] ]));
        }
        else if (t[0] == "stat") {
            if (e) {
                if (e[0] == "stat")
                    ret = best_of(ret, [ "stat", make_conditional(c, t[1], e[1]) ]);
                else if (aborts(e))
                    ret = abort_else(c, t, e);
            }
            else {
                ret = best_of(ret, [ "stat", make_conditional(c, t[1]) ]);
            }
        }
        else if (e && t[0] == e[0] && (t[0] == "return" || t[0] == "throw") && t[1] && e[1]) {
            ret = best_of(ret, [ t[0], make_conditional(c, t[1], e[1] ) ]);
        }
        else if (e && aborts(t)) {
            ret = [ [ "if", c, t ] ];
            if (e[0] == "block") {
                if (e[1]) ret = ret.concat(e[1]);
            }
            else {
                ret.push(e);
            }
            ret = walk([ "block", ret ]);
        }
        else if (t && aborts(e)) {
            ret = abort_else(c, t, e);
        }
        return ret;
    };

    function _do_while(cond, body) {
        return when_constant(cond, function(cond, val){
            if (!val) {
                warn_unreachable(body);
                return [ "block" ];
            } else {
                return [ "for", null, null, null, walk(body) ];
            }
        });
    };

    return w.with_walkers({
        "sub": function(expr, subscript) {
            if (subscript[0] == "string") {
                var name = subscript[1];
                if (is_identifier(name))
                    return [ "dot", walk(expr), name ];
                else if (/^[1-9][0-9]*$/.test(name) || name === "0")
                    return [ "sub", walk(expr), [ "num", parseInt(name, 10) ] ];
            }
        },
        "if": make_if,
        "toplevel": function(body) {
            return [ "toplevel", tighten(body) ];
        },
        "switch": function(expr, body) {
            var last = body.length - 1;
            return [ "switch", walk(expr), MAP(body, function(branch, i){
                var block = tighten(branch[1]);
                if (i == last && block.length > 0) {
                    var node = block[block.length - 1];
                    if (node[0] == "break" && !node[1])
                        block.pop();
                }
                return [ branch[0] ? walk(branch[0]) : null, block ];
            }) ];
        },
        "function": _lambda,
        "defun": _lambda,
        "block": function(body) {
            if (body) return rmblock([ "block", tighten(body) ]);
        },
        "binary": function(op, left, right) {
            return when_constant([ "binary", op, walk(left), walk(right) ], function yes(c){
                return best_of(walk(c), this);
            }, function no() {
                return function(){
                    if(op != "==" && op != "!=") return;
                    var l = walk(left), r = walk(right);
                    if(l && l[0] == "unary-prefix" && l[1] == "!" && l[2][0] == "num")
                        left = ['num', +!l[2][1]];
                    else if (r && r[0] == "unary-prefix" && r[1] == "!" && r[2][0] == "num")
                        right = ['num', +!r[2][1]];
                    return ["binary", op, left, right];
                }() || this;
            });
        },
        "conditional": function(c, t, e) {
            return make_conditional(walk(c), walk(t), walk(e));
        },
        "try": function(t, c, f) {
            return [
                "try",
                tighten(t),
                c != null ? [ c[0], tighten(c[1]) ] : null,
                f != null ? tighten(f) : null
            ];
        },
        "unary-prefix": function(op, expr) {
            expr = walk(expr);
            var ret = [ "unary-prefix", op, expr ];
            if (op == "!")
                ret = best_of(ret, negate(expr));
            return when_constant(ret, function(ast, val){
                return walk(ast); // it's either true or false, so minifies to !0 or !1
            }, function() { return ret });
        },
        "name": function(name) {
            switch (name) {
              case "true": return [ "unary-prefix", "!", [ "num", 0 ]];
              case "false": return [ "unary-prefix", "!", [ "num", 1 ]];
            }
        },
        "while": _do_while,
        "assign": function(op, lvalue, rvalue) {
            lvalue = walk(lvalue);
            rvalue = walk(rvalue);
            var okOps = [ '+', '-', '/', '*', '%', '>>', '<<', '>>>', '|', '^', '&' ];
            if (op === true && lvalue[0] === "name" && rvalue[0] === "binary" &&
                ~okOps.indexOf(rvalue[1]) && rvalue[2][0] === "name" &&
                rvalue[2][1] === lvalue[1]) {
                return [ this[0], rvalue[1], lvalue, rvalue[3] ]
            }
            return [ this[0], op, lvalue, rvalue ];
        },
        "call": function(expr, args) {
            expr = walk(expr);
            if (options.unsafe && expr[0] == "dot" && expr[1][0] == "string" && expr[2] == "toString") {
                return expr[1];
            }
            return [ this[0], expr,  MAP(args, walk) ];
        },
        "num": function (num) {
            if (!isFinite(num))
                return [ "binary", "/", num === 1 / 0
                         ? [ "num", 1 ] : num === -1 / 0
                         ? [ "unary-prefix", "-", [ "num", 1 ] ]
                         : [ "num", 0 ], [ "num", 0 ] ];

            return [ this[0], num ];
        }
    }, function() {
        return walk(prepare_ifs(walk(prepare_ifs(ast))));
    });
};

function squeeze_2(ast, options) {
    var w = ast_walker(), walk = w.walk, scope;
    function with_scope(s, cont) {
        var save = scope, ret;
        scope = s;
        ret = cont();
        scope = save;
        return ret;
    };
    function lambda(name, args, body) {
        return [ this[0], name, args, with_scope(body.scope, curry(MAP, body, walk)) ];
    };
    return w.with_walkers({
        "directive": function(dir) {
            if (scope.active_directive(dir))
                return [ "block" ];
            scope.directives.push(dir);
        },
        "toplevel": function(body) {
            return [ this[0], with_scope(this.scope, curry(MAP, body, walk)) ];
        },
        "function": lambda,
        "defun": lambda
    }, function(){
        return walk(ast_add_scope(ast));
    });
};

/* -----[ re-generate code from the AST ]----- */

var DOT_CALL_NO_PARENS = jsp.array_to_hash([
    "name",
    "array",
    "object",
    "string",
    "dot",
    "sub",
    "call",
    "regexp",
    "defun"
]);

function make_string(str, ascii_only) {
    var dq = 0, sq = 0;
    str = str.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g, function(s){
        switch (s) {
          case "\\": return "\\\\";
          case "\b": return "\\b";
          case "\f": return "\\f";
          case "\n": return "\\n";
          case "\r": return "\\r";
          case "\u2028": return "\\u2028";
          case "\u2029": return "\\u2029";
          case '"': ++dq; return '"';
          case "'": ++sq; return "'";
          case "\0": return "\\0";
        }
        return s;
    });
    if (ascii_only) str = to_ascii(str);
    if (dq > sq) return "'" + str.replace(/\x27/g, "\\'") + "'";
    else return '"' + str.replace(/\x22/g, '\\"') + '"';
};

function to_ascii(str) {
    return str.replace(/[\u0080-\uffff]/g, function(ch) {
        var code = ch.charCodeAt(0).toString(16);
        while (code.length < 4) code = "0" + code;
        return "\\u" + code;
    });
};

var SPLICE_NEEDS_BRACKETS = jsp.array_to_hash([ "if", "while", "do", "for", "for-in", "with" ]);

function gen_code(ast, options) {
    options = defaults(options, {
        indent_start : 0,
        indent_level : 4,
        quote_keys   : false,
        space_colon  : false,
        beautify     : false,
        ascii_only   : false,
        inline_script: false
    });
    var beautify = !!options.beautify;
    var indentation = 0,
    newline = beautify ? "\n" : "",
    space = beautify ? " " : "";

    function encode_string(str) {
        var ret = make_string(str, options.ascii_only);
        if (options.inline_script)
            ret = ret.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1");
        return ret;
    };

    function make_name(name) {
        name = name.toString();
        if (options.ascii_only)
            name = to_ascii(name);
        return name;
    };

    function indent(line) {
        if (line == null)
            line = "";
        if (beautify)
            line = repeat_string(" ", options.indent_start + indentation * options.indent_level) + line;
        return line;
    };

    function with_indent(cont, incr) {
        if (incr == null) incr = 1;
        indentation += incr;
        try { return cont.apply(null, slice(arguments, 1)); }
        finally { indentation -= incr; }
    };

    function last_char(str) {
        str = str.toString();
        return str.charAt(str.length - 1);
    };

    function first_char(str) {
        return str.toString().charAt(0);
    };

    function add_spaces(a) {
        if (beautify)
            return a.join(" ");
        var b = [];
        for (var i = 0; i < a.length; ++i) {
            var next = a[i + 1];
            b.push(a[i]);
            if (next &&
                ((is_identifier_char(last_char(a[i])) && (is_identifier_char(first_char(next))
                                                          || first_char(next) == "\\")) ||
                 (/[\+\-]$/.test(a[i].toString()) && /^[\+\-]/.test(next.toString()) ||
                 last_char(a[i]) == "/" && first_char(next) == "/"))) {
                b.push(" ");
            }
        }
        return b.join("");
    };

    function add_commas(a) {
        return a.join("," + space);
    };

    function parenthesize(expr) {
        var gen = make(expr);
        for (var i = 1; i < arguments.length; ++i) {
            var el = arguments[i];
            if ((el instanceof Function && el(expr)) || expr[0] == el)
                return "(" + gen + ")";
        }
        return gen;
    };

    function best_of(a) {
        if (a.length == 1) {
            return a[0];
        }
        if (a.length == 2) {
            var b = a[1];
            a = a[0];
            return a.length <= b.length ? a : b;
        }
        return best_of([ a[0], best_of(a.slice(1)) ]);
    };

    function needs_parens(expr) {
        if (expr[0] == "function" || expr[0] == "object") {
            // dot/call on a literal function requires the
            // function literal itself to be parenthesized
            // only if it's the first "thing" in a
            // statement.  This means that the parent is
            // "stat", but it could also be a "seq" and
            // we're the first in this "seq" and the
            // parent is "stat", and so on.  Messy stuff,
            // but it worths the trouble.
            var a = slice(w.stack()), self = a.pop(), p = a.pop();
            while (p) {
                if (p[0] == "stat") return true;
                if (((p[0] == "seq" || p[0] == "call" || p[0] == "dot" || p[0] == "sub" || p[0] == "conditional") && p[1] === self) ||
                    ((p[0] == "binary" || p[0] == "assign" || p[0] == "unary-postfix") && p[2] === self)) {
                    self = p;
                    p = a.pop();
                } else {
                    return false;
                }
            }
        }
        return !HOP(DOT_CALL_NO_PARENS, expr[0]);
    };

    function make_num(num) {
        var str = num.toString(10), a = [ str.replace(/^0\./, ".").replace('e+', 'e') ], m;
        if (Math.floor(num) === num) {
            if (num >= 0) {
                a.push("0x" + num.toString(16).toLowerCase(), // probably pointless
                       "0" + num.toString(8)); // same.
            } else {
                a.push("-0x" + (-num).toString(16).toLowerCase(), // probably pointless
                       "-0" + (-num).toString(8)); // same.
            }
            if ((m = /^(.*?)(0+)$/.exec(num))) {
                a.push(m[1] + "e" + m[2].length);
            }
        } else if ((m = /^0?\.(0+)(.*)$/.exec(num))) {
            a.push(m[2] + "e-" + (m[1].length + m[2].length),
                   str.substr(str.indexOf(".")));
        }
        return best_of(a);
    };

    var w = ast_walker();
    var make = w.walk;
    return w.with_walkers({
        "string": encode_string,
        "num": make_num,
        "name": make_name,
        "debugger": function(){ return "debugger;" },
        "toplevel": function(statements) {
            return make_block_statements(statements)
                .join(newline + newline);
        },
        "splice": function(statements) {
            var parent = w.parent();
            if (HOP(SPLICE_NEEDS_BRACKETS, parent)) {
                // we need block brackets in this case
                return make_block.apply(this, arguments);
            } else {
                return MAP(make_block_statements(statements, true),
                           function(line, i) {
                               // the first line is already indented
                               return i > 0 ? indent(line) : line;
                           }).join(newline);
            }
        },
        "block": make_block,
        "var": function(defs) {
            return "var " + add_commas(MAP(defs, make_1vardef)) + ";";
        },
        "const": function(defs) {
            return "const " + add_commas(MAP(defs, make_1vardef)) + ";";
        },
        "try": function(tr, ca, fi) {
            var out = [ "try", make_block(tr) ];
            if (ca) out.push("catch", "(" + ca[0] + ")", make_block(ca[1]));
            if (fi) out.push("finally", make_block(fi));
            return add_spaces(out);
        },
        "throw": function(expr) {
            return add_spaces([ "throw", make(expr) ]) + ";";
        },
        "new": function(ctor, args) {
            args = args.length > 0 ? "(" + add_commas(MAP(args, function(expr){
                return parenthesize(expr, "seq");
            })) + ")" : "";
            return add_spaces([ "new", parenthesize(ctor, "seq", "binary", "conditional", "assign", function(expr){
                var w = ast_walker(), has_call = {};
                try {
                    w.with_walkers({
                        "call": function() { throw has_call },
                        "function": function() { return this }
                    }, function(){
                        w.walk(expr);
                    });
                } catch(ex) {
                    if (ex === has_call)
                        return true;
                    throw ex;
                }
            }) + args ]);
        },
        "switch": function(expr, body) {
            return add_spaces([ "switch", "(" + make(expr) + ")", make_switch_block(body) ]);
        },
        "break": function(label) {
            var out = "break";
            if (label != null)
                out += " " + make_name(label);
            return out + ";";
        },
        "continue": function(label) {
            var out = "continue";
            if (label != null)
                out += " " + make_name(label);
            return out + ";";
        },
        "conditional": function(co, th, el) {
            return add_spaces([ parenthesize(co, "assign", "seq", "conditional"), "?",
                                parenthesize(th, "seq"), ":",
                                parenthesize(el, "seq") ]);
        },
        "assign": function(op, lvalue, rvalue) {
            if (op && op !== true) op += "=";
            else op = "=";
            return add_spaces([ make(lvalue), op, parenthesize(rvalue, "seq") ]);
        },
        "dot": function(expr) {
            var out = make(expr), i = 1;
            if (expr[0] == "num") {
                if (!/[a-f.]/i.test(out))
                    out += ".";
            } else if (expr[0] != "function" && needs_parens(expr))
                out = "(" + out + ")";
            while (i < arguments.length)
                out += "." + make_name(arguments[i++]);
            return out;
        },
        "call": function(func, args) {
            var f = make(func);
            if (f.charAt(0) != "(" && needs_parens(func))
                f = "(" + f + ")";
            return f + "(" + add_commas(MAP(args, function(expr){
                return parenthesize(expr, "seq");
            })) + ")";
        },
        "function": make_function,
        "defun": make_function,
        "if": function(co, th, el) {
            var out = [ "if", "(" + make(co) + ")", el ? make_then(th) : make(th) ];
            if (el) {
                out.push("else", make(el));
            }
            return add_spaces(out);
        },
        "for": function(init, cond, step, block) {
            var out = [ "for" ];
            init = (init != null ? make(init) : "").replace(/;*\s*$/, ";" + space);
            cond = (cond != null ? make(cond) : "").replace(/;*\s*$/, ";" + space);
            step = (step != null ? make(step) : "").replace(/;*\s*$/, "");
            var args = init + cond + step;
            if (args == "; ; ") args = ";;";
            out.push("(" + args + ")", make(block));
            return add_spaces(out);
        },
        "for-in": function(vvar, key, hash, block) {
            return add_spaces([ "for", "(" +
                                (vvar ? make(vvar).replace(/;+$/, "") : make(key)),
                                "in",
                                make(hash) + ")", make(block) ]);
        },
        "while": function(condition, block) {
            return add_spaces([ "while", "(" + make(condition) + ")", make(block) ]);
        },
        "do": function(condition, block) {
            return add_spaces([ "do", make(block), "while", "(" + make(condition) + ")" ]) + ";";
        },
        "return": function(expr) {
            var out = [ "return" ];
            if (expr != null) out.push(make(expr));
            return add_spaces(out) + ";";
        },
        "binary": function(operator, lvalue, rvalue) {
            var left = make(lvalue), right = make(rvalue);
            // XXX: I'm pretty sure other cases will bite here.
            //      we need to be smarter.
            //      adding parens all the time is the safest bet.
            if (member(lvalue[0], [ "assign", "conditional", "seq" ]) ||
                lvalue[0] == "binary" && PRECEDENCE[operator] > PRECEDENCE[lvalue[1]] ||
                lvalue[0] == "function" && needs_parens(this)) {
                left = "(" + left + ")";
            }
            if (member(rvalue[0], [ "assign", "conditional", "seq" ]) ||
                rvalue[0] == "binary" && PRECEDENCE[operator] >= PRECEDENCE[rvalue[1]] &&
                !(rvalue[1] == operator && member(operator, [ "&&", "||", "*" ]))) {
                right = "(" + right + ")";
            }
            else if (!beautify && options.inline_script && (operator == "<" || operator == "<<")
                     && rvalue[0] == "regexp" && /^script/i.test(rvalue[1])) {
                right = " " + right;
            }
            return add_spaces([ left, operator, right ]);
        },
        "unary-prefix": function(operator, expr) {
            var val = make(expr);
            if (!(expr[0] == "num" || (expr[0] == "unary-prefix" && !HOP(OPERATORS, operator + expr[1])) || !needs_parens(expr)))
                val = "(" + val + ")";
            return operator + (jsp.is_alphanumeric_char(operator.charAt(0)) ? " " : "") + val;
        },
        "unary-postfix": function(operator, expr) {
            var val = make(expr);
            if (!(expr[0] == "num" || (expr[0] == "unary-postfix" && !HOP(OPERATORS, operator + expr[1])) || !needs_parens(expr)))
                val = "(" + val + ")";
            return val + operator;
        },
        "sub": function(expr, subscript) {
            var hash = make(expr);
            if (needs_parens(expr))
                hash = "(" + hash + ")";
            return hash + "[" + make(subscript) + "]";
        },
        "object": function(props) {
            var obj_needs_parens = needs_parens(this);
            if (props.length == 0)
                return obj_needs_parens ? "({})" : "{}";
            var out = "{" + newline + with_indent(function(){
                return MAP(props, function(p){
                    if (p.length == 3) {
                        // getter/setter.  The name is in p[0], the arg.list in p[1][2], the
                        // body in p[1][3] and type ("get" / "set") in p[2].
                        return indent(make_function(p[0], p[1][2], p[1][3], p[2], true));
                    }
                    var key = p[0], val = parenthesize(p[1], "seq");
                    if (options.quote_keys) {
                        key = encode_string(key);
                    } else if ((typeof key == "number" || !beautify && +key + "" == key)
                               && parseFloat(key) >= 0) {
                        key = make_num(+key);
                    } else if (!is_identifier(key)) {
                        key = encode_string(key);
                    }
                    return indent(add_spaces(beautify && options.space_colon
                                             ? [ key, ":", val ]
                                             : [ key + ":", val ]));
                }).join("," + newline);
            }) + newline + indent("}");
            return obj_needs_parens ? "(" + out + ")" : out;
        },
        "regexp": function(rx, mods) {
            if (options.ascii_only) rx = to_ascii(rx);
            return "/" + rx + "/" + mods;
        },
        "array": function(elements) {
            if (elements.length == 0) return "[]";
            return add_spaces([ "[", add_commas(MAP(elements, function(el, i){
                if (!beautify && el[0] == "atom" && el[1] == "undefined") return i === elements.length - 1 ? "," : "";
                return parenthesize(el, "seq");
            })), "]" ]);
        },
        "stat": function(stmt) {
            return stmt != null
                ? make(stmt).replace(/;*\s*$/, ";")
                : ";";
        },
        "seq": function() {
            return add_commas(MAP(slice(arguments), make));
        },
        "label": function(name, block) {
            return add_spaces([ make_name(name), ":", make(block) ]);
        },
        "with": function(expr, block) {
            return add_spaces([ "with", "(" + make(expr) + ")", make(block) ]);
        },
        "atom": function(name) {
            return make_name(name);
        },
        "directive": function(dir) {
            return make_string(dir) + ";";
        }
    }, function(){ return make(ast) });

    // The squeezer replaces "block"-s that contain only a single
    // statement with the statement itself; technically, the AST
    // is correct, but this can create problems when we output an
    // IF having an ELSE clause where the THEN clause ends in an
    // IF *without* an ELSE block (then the outer ELSE would refer
    // to the inner IF).  This function checks for this case and
    // adds the block brackets if needed.
    function make_then(th) {
        if (th == null) return ";";
        if (th[0] == "do") {
            // https://github.com/mishoo/UglifyJS/issues/#issue/57
            // IE croaks with "syntax error" on code like this:
            //     if (foo) do ... while(cond); else ...
            // we need block brackets around do/while
            return make_block([ th ]);
        }
        var b = th;
        while (true) {
            var type = b[0];
            if (type == "if") {
                if (!b[3])
                    // no else, we must add the block
                    return make([ "block", [ th ]]);
                b = b[3];
            }
            else if (type == "while" || type == "do") b = b[2];
            else if (type == "for" || type == "for-in") b = b[4];
            else break;
        }
        return make(th);
    };

    function make_function(name, args, body, keyword, no_parens) {
        var out = keyword || "function";
        if (name) {
            out += " " + make_name(name);
        }
        out += "(" + add_commas(MAP(args, make_name)) + ")";
        out = add_spaces([ out, make_block(body) ]);
        return (!no_parens && needs_parens(this)) ? "(" + out + ")" : out;
    };

    function must_has_semicolon(node) {
        switch (node[0]) {
          case "with":
          case "while":
            return empty(node[2]) || must_has_semicolon(node[2]);
          case "for":
          case "for-in":
            return empty(node[4]) || must_has_semicolon(node[4]);
          case "if":
            if (empty(node[2]) && !node[3]) return true; // `if' with empty `then' and no `else'
            if (node[3]) {
                if (empty(node[3])) return true; // `else' present but empty
                return must_has_semicolon(node[3]); // dive into the `else' branch
            }
            return must_has_semicolon(node[2]); // dive into the `then' branch
          case "directive":
            return true;
        }
    };

    function make_block_statements(statements, noindent) {
        for (var a = [], last = statements.length - 1, i = 0; i <= last; ++i) {
            var stat = statements[i];
            var code = make(stat);
            if (code != ";") {
                if (!beautify && i == last && !must_has_semicolon(stat)) {
                    code = code.replace(/;+\s*$/, "");
                }
                a.push(code);
            }
        }
        return noindent ? a : MAP(a, indent);
    };

    function make_switch_block(body) {
        var n = body.length;
        if (n == 0) return "{}";
        return "{" + newline + MAP(body, function(branch, i){
            var has_body = branch[1].length > 0, code = with_indent(function(){
                return indent(branch[0]
                              ? add_spaces([ "case", make(branch[0]) + ":" ])
                              : "default:");
            }, 0.5) + (has_body ? newline + with_indent(function(){
                return make_block_statements(branch[1]).join(newline);
            }) : "");
            if (!beautify && has_body && i < n - 1)
                code += ";";
            return code;
        }).join(newline) + newline + indent("}");
    };

    function make_block(statements) {
        if (!statements) return ";";
        if (statements.length == 0) return "{}";
        return "{" + newline + with_indent(function(){
            return make_block_statements(statements).join(newline);
        }) + newline + indent("}");
    };

    function make_1vardef(def) {
        var name = def[0], val = def[1];
        if (val != null)
            name = add_spaces([ make_name(name), "=", parenthesize(val, "seq") ]);
        return name;
    };

};

function split_lines(code, max_line_length) {
    var splits = [ 0 ];
    jsp.parse(function(){
        var next_token = jsp.tokenizer(code);
        var last_split = 0;
        var prev_token;
        function current_length(tok) {
            return tok.pos - last_split;
        };
        function split_here(tok) {
            last_split = tok.pos;
            splits.push(last_split);
        };
        function custom(){
            var tok = next_token.apply(this, arguments);
            out: {
                if (prev_token) {
                    if (prev_token.type == "keyword") break out;
                }
                if (current_length(tok) > max_line_length) {
                    switch (tok.type) {
                      case "keyword":
                      case "atom":
                      case "name":
                      case "punc":
                        split_here(tok);
                        break out;
                    }
                }
            }
            prev_token = tok;
            return tok;
        };
        custom.context = function() {
            return next_token.context.apply(this, arguments);
        };
        return custom;
    }());
    return splits.map(function(pos, i){
        return code.substring(pos, splits[i + 1] || code.length);
    }).join("\n");
};

/* -----[ Utilities ]----- */

function repeat_string(str, i) {
    if (i <= 0) return "";
    if (i == 1) return str;
    var d = repeat_string(str, i >> 1);
    d += d;
    if (i & 1) d += str;
    return d;
};

function defaults(args, defs) {
    var ret = {};
    if (args === true)
        args = {};
    for (var i in defs) if (HOP(defs, i)) {
        ret[i] = (args && HOP(args, i)) ? args[i] : defs[i];
    }
    return ret;
};

function is_identifier(name) {
    return /^[a-z_$][a-z0-9_$]*$/i.test(name)
        && name != "this"
        && !HOP(jsp.KEYWORDS_ATOM, name)
        && !HOP(jsp.RESERVED_WORDS, name)
        && !HOP(jsp.KEYWORDS, name);
};

function HOP(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
};

// some utilities

var MAP;

(function(){
    MAP = function(a, f, o) {
        var ret = [], top = [], i;
        function doit() {
            var val = f.call(o, a[i], i);
            if (val instanceof AtTop) {
                val = val.v;
                if (val instanceof Splice) {
                    top.push.apply(top, val.v);
                } else {
                    top.push(val);
                }
            }
            else if (val != skip) {
                if (val instanceof Splice) {
                    ret.push.apply(ret, val.v);
                } else {
                    ret.push(val);
                }
            }
        };
        if (a instanceof Array) for (i = 0; i < a.length; ++i) doit();
        else for (i in a) if (HOP(a, i)) doit();
        return top.concat(ret);
    };
    MAP.at_top = function(val) { return new AtTop(val) };
    MAP.splice = function(val) { return new Splice(val) };
    var skip = MAP.skip = {};
    function AtTop(val) { this.v = val };
    function Splice(val) { this.v = val };
})();

/* -----[ Exports ]----- */

exports.ast_walker = ast_walker;
exports.ast_mangle = ast_mangle;
exports.ast_squeeze = ast_squeeze;
exports.ast_lift_variables = ast_lift_variables;
exports.gen_code = gen_code;
exports.ast_add_scope = ast_add_scope;
exports.set_logger = function(logger) { warn = logger };
exports.make_string = make_string;
exports.split_lines = split_lines;
exports.MAP = MAP;

// keep this last!
exports.ast_squeeze_more = require("./squeeze-more").ast_squeeze_more;

// Local variables:
// js-indent-level: 4
// End:
});
define('uglifyjs/index', ["require", "exports", "module", "./parse-js", "./process", "./consolidator"], function(require, exports, module) {
//convienence function(src, [options]);
function uglify(orig_code, options){
  options || (options = {});
  var jsp = uglify.parser;
  var pro = uglify.uglify;

  var ast = jsp.parse(orig_code, options.strict_semicolons); // parse code and get the initial AST
  ast = pro.ast_mangle(ast, options.mangle_options); // get a new AST with mangled names
  ast = pro.ast_squeeze(ast, options.squeeze_options); // get an AST with compression optimizations
  var final_code = pro.gen_code(ast, options.gen_options); // compressed code here
  return final_code;
};

uglify.parser = require("./parse-js");
uglify.uglify = require("./process");
uglify.consolidator = require("./consolidator");

module.exports = uglify
});/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define('source-map/array-set', function (require, exports, module) {

  /**
   * A data structure which is a combination of an array and a set. Adding a new
   * member is O(1), testing for membership is O(1), and finding the index of an
   * element is O(1). Removing elements from the set is not supported. Only
   * strings are supported for membership.
   */
  function ArraySet() {
    this._array = [];
    this._set = {};
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  ArraySet.fromArray = function ArraySet_fromArray(aArray) {
    var set = new ArraySet();
    for (var i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i]);
    }
    return set;
  };

  /**
   * Because behavior goes wacky when you set `__proto__` on `this._set`, we
   * have to prefix all the strings in our set with an arbitrary character.
   *
   * See https://github.com/mozilla/source-map/pull/31 and
   * https://github.com/mozilla/source-map/issues/30
   *
   * @param String aStr
   */
  ArraySet.prototype._toSetString = function ArraySet__toSetString (aStr) {
    return "$" + aStr;
  };

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  ArraySet.prototype.add = function ArraySet_add(aStr) {
    if (this.has(aStr)) {
      // Already a member; nothing to do.
      return;
    }
    var idx = this._array.length;
    this._array.push(aStr);
    this._set[this._toSetString(aStr)] = idx;
  };

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  ArraySet.prototype.has = function ArraySet_has(aStr) {
    return Object.prototype.hasOwnProperty.call(this._set,
                                                this._toSetString(aStr));
  };

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
    if (this.has(aStr)) {
      return this._set[this._toSetString(aStr)];
    }
    throw new Error('"' + aStr + '" is not in the set.');
  };

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  ArraySet.prototype.at = function ArraySet_at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx];
    }
    throw new Error('No element indexed by ' + aIdx);
  };

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  ArraySet.prototype.toArray = function ArraySet_toArray() {
    return this._array.slice();
  };

  exports.ArraySet = ArraySet;

});
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

define('source-map/base64-vlq', function (require, exports, module) {

  var base64 = require('./base64');

  // A single base 64 digit can contain 6 bits of data. For the base 64 variable
  // length quantities we use in the source map spec, the first bit is the sign,
  // the next four bits are the actual value, and the 6th bit is the
  // continuation bit. The continuation bit tells us whether there are more
  // digits in this value following this digit.
  //
  //   Continuation
  //   |    Sign
  //   |    |
  //   V    V
  //   101011

  var VLQ_BASE_SHIFT = 5;

  // binary: 100000
  var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

  // binary: 011111
  var VLQ_BASE_MASK = VLQ_BASE - 1;

  // binary: 100000
  var VLQ_CONTINUATION_BIT = VLQ_BASE;

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  function toVLQSigned(aValue) {
    return aValue < 0
      ? ((-aValue) << 1) + 1
      : (aValue << 1) + 0;
  }

  /**
   * Converts to a two-complement value from a value where the sign bit is
   * is placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  function fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
      ? -shifted
      : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  exports.encode = function base64VLQ_encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = toVLQSigned(aValue);

    do {
      digit = vlq & VLQ_BASE_MASK;
      vlq >>>= VLQ_BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ_CONTINUATION_BIT;
      }
      encoded += base64.encode(digit);
    } while (vlq > 0);

    return encoded;
  };

  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string.
   */
  exports.decode = function base64VLQ_decode(aStr) {
    var i = 0;
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (i >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }
      digit = base64.decode(aStr.charAt(i++));
      continuation = !!(digit & VLQ_CONTINUATION_BIT);
      digit &= VLQ_BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ_BASE_SHIFT;
    } while (continuation);

    return {
      value: fromVLQSigned(result),
      rest: aStr.slice(i)
    };
  };

});
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define('source-map/base64', function (require, exports, module) {

  var charToIntMap = {};
  var intToCharMap = {};

  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    .split('')
    .forEach(function (ch, index) {
      charToIntMap[ch] = index;
      intToCharMap[index] = ch;
    });

  /**
   * Encode an integer in the range of 0 to 63 to a single base 64 digit.
   */
  exports.encode = function base64_encode(aNumber) {
    if (aNumber in intToCharMap) {
      return intToCharMap[aNumber];
    }
    throw new TypeError("Must be between 0 and 63: " + aNumber);
  };

  /**
   * Decode a single base 64 digit to an integer.
   */
  exports.decode = function base64_decode(aChar) {
    if (aChar in charToIntMap) {
      return charToIntMap[aChar];
    }
    throw new TypeError("Not a valid base 64 digit: " + aChar);
  };

});
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define('source-map/binary-search', function (require, exports, module) {

  /**
   * Recursive implementation of binary search.
   *
   * @param aLow Indices here and lower do not contain the needle.
   * @param aHigh Indices here and higher do not contain the needle.
   * @param aNeedle The element being searched for.
   * @param aHaystack The non-empty array being searched.
   * @param aCompare Function which takes two elements and returns -1, 0, or 1.
   */
  function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare) {
    // This function terminates when one of the following is true:
    //
    //   1. We find the exact element we are looking for.
    //
    //   2. We did not find the exact element, but we can return the next
    //      closest element that is less than that element.
    //
    //   3. We did not find the exact element, and there is no next-closest
    //      element which is less than the one we are searching for, so we
    //      return null.
    var mid = Math.floor((aHigh - aLow) / 2) + aLow;
    var cmp = aCompare(aNeedle, aHaystack[mid]);
    if (cmp === 0) {
      // Found the element we are looking for.
      return aHaystack[mid];
    }
    else if (cmp > 0) {
      // aHaystack[mid] is greater than our needle.
      if (aHigh - mid > 1) {
        // The element is in the upper half.
        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare);
      }
      // We did not find an exact match, return the next closest one
      // (termination case 2).
      return aHaystack[mid];
    }
    else {
      // aHaystack[mid] is less than our needle.
      if (mid - aLow > 1) {
        // The element is in the lower half.
        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare);
      }
      // The exact needle element was not found in this haystack. Determine if
      // we are in termination case (2) or (3) and return the appropriate thing.
      return aLow < 0
        ? null
        : aHaystack[aLow];
    }
  }

  /**
   * This is an implementation of binary search which will always try and return
   * the next lowest value checked if there is no exact hit. This is because
   * mappings between original and generated line/col pairs are single points,
   * and there is an implicit region between each of them, so a miss just means
   * that you aren't on the very start of a region.
   *
   * @param aNeedle The element you are looking for.
   * @param aHaystack The array that is being searched.
   * @param aCompare A function which takes the needle and an element in the
   *     array and returns -1, 0, or 1 depending on whether the needle is less
   *     than, equal to, or greater than the element, respectively.
   */
  exports.search = function search(aNeedle, aHaystack, aCompare) {
    return aHaystack.length > 0
      ? recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare)
      : null;
  };

});
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define('source-map/source-map-consumer', function (require, exports, module) {

  var util = require('./util');
  var binarySearch = require('./binary-search');
  var ArraySet = require('./array-set').ArraySet;
  var base64VLQ = require('./base64-vlq');

  /**
   * A SourceMapConsumer instance represents a parsed source map which we can
   * query for information about the original file positions by giving it a file
   * position in the generated source.
   *
   * The only parameter is the raw source map (either as a JSON string, or
   * already parsed to an object). According to the spec, source maps have the
   * following attributes:
   *
   *   - version: Which version of the source map spec this map is following.
   *   - sources: An array of URLs to the original source files.
   *   - names: An array of identifiers which can be referrenced by individual mappings.
   *   - sourceRoot: Optional. The URL root from which all sources are relative.
   *   - mappings: A string of base64 VLQs which contain the actual mappings.
   *   - file: The generated file this source map is associated with.
   *
   * Here is an example source map, taken from the source map spec[0]:
   *
   *     {
   *       version : 3,
   *       file: "out.js",
   *       sourceRoot : "",
   *       sources: ["foo.js", "bar.js"],
   *       names: ["src", "maps", "are", "fun"],
   *       mappings: "AA,AB;;ABCDE;"
   *     }
   *
   * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
   */
  function SourceMapConsumer(aSourceMap) {
    var sourceMap = aSourceMap;
    if (typeof aSourceMap === 'string') {
      sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
    }

    var version = util.getArg(sourceMap, 'version');
    var sources = util.getArg(sourceMap, 'sources');
    var names = util.getArg(sourceMap, 'names');
    var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
    var mappings = util.getArg(sourceMap, 'mappings');
    var file = util.getArg(sourceMap, 'file');

    if (version !== this._version) {
      throw new Error('Unsupported version: ' + version);
    }

    this._names = ArraySet.fromArray(names);
    this._sources = ArraySet.fromArray(sources);
    this._sourceRoot = sourceRoot;
    this.file = file;

    // `this._generatedMappings` and `this._originalMappings` hold the parsed
    // mapping coordinates from the source map's "mappings" attribute. Each
    // object in the array is of the form
    //
    //     {
    //       generatedLine: The line number in the generated code,
    //       generatedColumn: The column number in the generated code,
    //       source: The path to the original source file that generated this
    //               chunk of code,
    //       originalLine: The line number in the original source that
    //                     corresponds to this chunk of generated code,
    //       originalColumn: The column number in the original source that
    //                       corresponds to this chunk of generated code,
    //       name: The name of the original symbol which generated this chunk of
    //             code.
    //     }
    //
    // All properties except for `generatedLine` and `generatedColumn` can be
    // `null`.
    //
    // `this._generatedMappings` is ordered by the generated positions.
    //
    // `this._originalMappings` is ordered by the original positions.
    this._generatedMappings = [];
    this._originalMappings = [];
    this._parseMappings(mappings, sourceRoot);
  }

  /**
   * The version of the source mapping spec that we are consuming.
   */
  SourceMapConsumer.prototype._version = 3;

  /**
   * The list of original sources.
   */
  Object.defineProperty(SourceMapConsumer.prototype, 'sources', {
    get: function () {
      return this._sources.toArray().map(function (s) {
        return this._sourceRoot ? util.join(this._sourceRoot, s) : s;
      }, this);
    }
  });

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (an ordered list in this._generatedMappings).
   */
  SourceMapConsumer.prototype._parseMappings =
    function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
      var generatedLine = 1;
      var previousGeneratedColumn = 0;
      var previousOriginalLine = 0;
      var previousOriginalColumn = 0;
      var previousSource = 0;
      var previousName = 0;
      var mappingSeparator = /^[,;]/;
      var str = aStr;
      var mapping;
      var temp;

      while (str.length > 0) {
        if (str.charAt(0) === ';') {
          generatedLine++;
          str = str.slice(1);
          previousGeneratedColumn = 0;
        }
        else if (str.charAt(0) === ',') {
          str = str.slice(1);
        }
        else {
          mapping = {};
          mapping.generatedLine = generatedLine;

          // Generated column.
          temp = base64VLQ.decode(str);
          mapping.generatedColumn = previousGeneratedColumn + temp.value;
          previousGeneratedColumn = mapping.generatedColumn;
          str = temp.rest;

          if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
            // Original source.
            temp = base64VLQ.decode(str);
            if (aSourceRoot) {
              mapping.source = util.join(aSourceRoot, this._sources.at(previousSource + temp.value));
            }
            else {
              mapping.source = this._sources.at(previousSource + temp.value);
            }
            previousSource += temp.value;
            str = temp.rest;
            if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
              throw new Error('Found a source, but no line and column');
            }

            // Original line.
            temp = base64VLQ.decode(str);
            mapping.originalLine = previousOriginalLine + temp.value;
            previousOriginalLine = mapping.originalLine;
            // Lines are stored 0-based
            mapping.originalLine += 1;
            str = temp.rest;
            if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
              throw new Error('Found a source and line, but no column');
            }

            // Original column.
            temp = base64VLQ.decode(str);
            mapping.originalColumn = previousOriginalColumn + temp.value;
            previousOriginalColumn = mapping.originalColumn;
            str = temp.rest;

            if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
              // Original name.
              temp = base64VLQ.decode(str);
              mapping.name = this._names.at(previousName + temp.value);
              previousName += temp.value;
              str = temp.rest;
            }
          }

          this._generatedMappings.push(mapping);
          this._originalMappings.push(mapping);
        }
      }

      this._originalMappings.sort(this._compareOriginalPositions);
    };

  /**
   * Comparator between two mappings where the original positions are compared.
   */
  SourceMapConsumer.prototype._compareOriginalPositions =
    function SourceMapConsumer_compareOriginalPositions(mappingA, mappingB) {
      if (mappingA.source > mappingB.source) {
        return 1;
      }
      else if (mappingA.source < mappingB.source) {
        return -1;
      }
      else {
        var cmp = mappingA.originalLine - mappingB.originalLine;
        return cmp === 0
          ? mappingA.originalColumn - mappingB.originalColumn
          : cmp;
      }
    };

  /**
   * Comparator between two mappings where the generated positions are compared.
   */
  SourceMapConsumer.prototype._compareGeneratedPositions =
    function SourceMapConsumer_compareGeneratedPositions(mappingA, mappingB) {
      var cmp = mappingA.generatedLine - mappingB.generatedLine;
      return cmp === 0
        ? mappingA.generatedColumn - mappingB.generatedColumn
        : cmp;
    };

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  SourceMapConsumer.prototype._findMapping =
    function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                           aColumnName, aComparator) {
      // To return the position we are searching for, we must first find the
      // mapping for the given position and then return the opposite position it
      // points to. Because the mappings are sorted, we can use binary search to
      // find the best mapping.

      if (aNeedle[aLineName] <= 0) {
        throw new TypeError('Line must be greater than or equal to 1, got '
                            + aNeedle[aLineName]);
      }
      if (aNeedle[aColumnName] < 0) {
        throw new TypeError('Column must be greater than or equal to 0, got '
                            + aNeedle[aColumnName]);
      }

      return binarySearch.search(aNeedle, aMappings, aComparator);
    };

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.
   *   - column: The column number in the generated source.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.
   *   - column: The column number in the original source, or null.
   *   - name: The original identifier, or null.
   */
  SourceMapConsumer.prototype.originalPositionFor =
    function SourceMapConsumer_originalPositionFor(aArgs) {
      var needle = {
        generatedLine: util.getArg(aArgs, 'line'),
        generatedColumn: util.getArg(aArgs, 'column')
      };

      var mapping = this._findMapping(needle,
                                      this._generatedMappings,
                                      "generatedLine",
                                      "generatedColumn",
                                      this._compareGeneratedPositions)

      if (mapping) {
        return {
          source: util.getArg(mapping, 'source', null),
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: util.getArg(mapping, 'name', null)
        };
      }

      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    };

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.
   *   - column: The column number in the original source.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.
   *   - column: The column number in the generated source, or null.
   */
  SourceMapConsumer.prototype.generatedPositionFor =
    function SourceMapConsumer_generatedPositionFor(aArgs) {
      var needle = {
        source: util.getArg(aArgs, 'source'),
        originalLine: util.getArg(aArgs, 'line'),
        originalColumn: util.getArg(aArgs, 'column')
      };

      var mapping = this._findMapping(needle,
                                      this._originalMappings,
                                      "originalLine",
                                      "originalColumn",
                                      this._compareOriginalPositions)

      if (mapping) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null)
        };
      }

      return {
        line: null,
        column: null
      };
    };

  SourceMapConsumer.GENERATED_ORDER = 1;
  SourceMapConsumer.ORIGINAL_ORDER = 2;

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping. This function should
   *        not mutate the mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  SourceMapConsumer.prototype.eachMapping =
    function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
      var context = aContext || null;
      var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

      var mappings;
      switch (order) {
      case SourceMapConsumer.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break;
      case SourceMapConsumer.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break;
      default:
        throw new Error("Unknown order of iteration.");
      }

      mappings.forEach(aCallback, context);
    };

  exports.SourceMapConsumer = SourceMapConsumer;

});
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define('source-map/source-map-generator', function (require, exports, module) {

  var base64VLQ = require('./base64-vlq');
  var util = require('./util');
  var ArraySet = require('./array-set').ArraySet;

  /**
   * An instance of the SourceMapGenerator represents a source map which is
   * being built incrementally. To create a new one, you must pass an object
   * with the following properties:
   *
   *   - file: The filename of the generated source.
   *   - sourceRoot: An optional root for all URLs in this source map.
   */
  function SourceMapGenerator(aArgs) {
    this._file = util.getArg(aArgs, 'file');
    this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
    this._sources = new ArraySet();
    this._names = new ArraySet();
    this._mappings = [];
  }

  SourceMapGenerator.prototype._version = 3;

  /**
   * Add a single mapping from original source line and column to the generated
   * source's line and column for this source map being created. The mapping
   * object should have the following properties:
   *
   *   - generated: An object with the generated line and column positions.
   *   - original: An object with the original line and column positions.
   *   - source: The original source file (relative to the sourceRoot).
   *   - name: An optional original token name for this mapping.
   */
  SourceMapGenerator.prototype.addMapping =
    function SourceMapGenerator_addMapping(aArgs) {
      var generated = util.getArg(aArgs, 'generated');
      var original = util.getArg(aArgs, 'original', null);
      var source = util.getArg(aArgs, 'source', null);
      var name = util.getArg(aArgs, 'name', null);

      this._validateMapping(generated, original, source, name);

      if (source && !this._sources.has(source)) {
        this._sources.add(source);
      }

      if (name && !this._names.has(name)) {
        this._names.add(name);
      }

      this._mappings.push({
        generated: generated,
        original: original,
        source: source,
        name: name
      });
    };

  /**
   * A mapping can have one of the three levels of data:
   *
   *   1. Just the generated position.
   *   2. The Generated position, original position, and original source.
   *   3. Generated and original position, original source, as well as a name
   *      token.
   *
   * To maintain consistency, we validate that any new mapping being added falls
   * in to one of these categories.
   */
  SourceMapGenerator.prototype._validateMapping =
    function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                                aName) {
      if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
          && aGenerated.line > 0 && aGenerated.column >= 0
          && !aOriginal && !aSource && !aName) {
        // Case 1.
        return;
      }
      else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
               && aOriginal && 'line' in aOriginal && 'column' in aOriginal
               && aGenerated.line > 0 && aGenerated.column >= 0
               && aOriginal.line > 0 && aOriginal.column >= 0
               && aSource) {
        // Cases 2 and 3.
        return;
      }
      else {
        throw new Error('Invalid mapping.');
      }
    };

  /**
   * Serialize the accumulated mappings in to the stream of base 64 VLQs
   * specified by the source map format.
   */
  SourceMapGenerator.prototype._serializeMappings =
    function SourceMapGenerator_serializeMappings() {
      var previousGeneratedColumn = 0;
      var previousGeneratedLine = 1;
      var previousOriginalColumn = 0;
      var previousOriginalLine = 0;
      var previousName = 0;
      var previousSource = 0;
      var result = '';
      var mapping;

      // The mappings must be guarenteed to be in sorted order before we start
      // serializing them or else the generated line numbers (which are defined
      // via the ';' separators) will be all messed up. Note: it might be more
      // performant to maintain the sorting as we insert them, rather than as we
      // serialize them, but the big O is the same either way.
      this._mappings.sort(function (mappingA, mappingB) {
        var cmp = mappingA.generated.line - mappingB.generated.line;
        return cmp === 0
          ? mappingA.generated.column - mappingB.generated.column
          : cmp;
      });

      for (var i = 0, len = this._mappings.length; i < len; i++) {
        mapping = this._mappings[i];

        if (mapping.generated.line !== previousGeneratedLine) {
          previousGeneratedColumn = 0;
          while (mapping.generated.line !== previousGeneratedLine) {
            result += ';';
            previousGeneratedLine++;
          }
        }
        else {
          if (i > 0) {
            result += ',';
          }
        }

        result += base64VLQ.encode(mapping.generated.column
                                   - previousGeneratedColumn);
        previousGeneratedColumn = mapping.generated.column;

        if (mapping.source && mapping.original) {
          result += base64VLQ.encode(this._sources.indexOf(mapping.source)
                                     - previousSource);
          previousSource = this._sources.indexOf(mapping.source);

          // lines are stored 0-based in SourceMap spec version 3
          result += base64VLQ.encode(mapping.original.line - 1
                                     - previousOriginalLine);
          previousOriginalLine = mapping.original.line - 1;

          result += base64VLQ.encode(mapping.original.column
                                     - previousOriginalColumn);
          previousOriginalColumn = mapping.original.column;

          if (mapping.name) {
            result += base64VLQ.encode(this._names.indexOf(mapping.name)
                                       - previousName);
            previousName = this._names.indexOf(mapping.name);
          }
        }
      }

      return result;
    };

  /**
   * Externalize the source map.
   */
  SourceMapGenerator.prototype.toJSON =
    function SourceMapGenerator_toJSON() {
      var map = {
        version: this._version,
        file: this._file,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      if (this._sourceRoot) {
        map.sourceRoot = this._sourceRoot;
      }
      return map;
    };

  /**
   * Render the source map being generated to a string.
   */
  SourceMapGenerator.prototype.toString =
    function SourceMapGenerator_toString() {
      return JSON.stringify(this);
    };

  exports.SourceMapGenerator = SourceMapGenerator;

});
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define('source-map/source-node', function (require, exports, module) {

  var SourceMapGenerator = require('./source-map-generator').SourceMapGenerator;

  /**
   * SourceNodes provide a way to abstract over interpolating/concatenating
   * snippets of generated JavaScript source code while maintaining the line and
   * column information associated with the original source code.
   *
   * @param aLine The original line number.
   * @param aColumn The original column number.
   * @param aSource The original source's filename.
   * @param aChunks Optional. An array of strings which are snippets of
   *        generated JS, or other SourceNodes.
   */
  function SourceNode(aLine, aColumn, aSource, aChunks) {
    this.children = [];
    this.line = aLine;
    this.column = aColumn;
    this.source = aSource;
    if (aChunks != null) this.add(aChunks);
  }

  /**
   * Add a chunk of generated JS to this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.add = function SourceNode_add(aChunk) {
    if (Array.isArray(aChunk)) {
      aChunk.forEach(function (chunk) {
        this.add(chunk);
      }, this);
    }
    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
      if (aChunk) {
        this.children.push(aChunk);
      }
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Add a chunk of generated JS to the beginning of this source node.
   *
   * @param aChunk A string snippet of generated JS code, another instance of
   *        SourceNode, or an array where each member is one of those things.
   */
  SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
    if (Array.isArray(aChunk)) {
      for (var i = aChunk.length-1; i >= 0; i--) {
        this.prepend(aChunk[i]);
      }
    }
    else if (aChunk instanceof SourceNode || typeof aChunk === "string") {
      this.children.unshift(aChunk);
    }
    else {
      throw new TypeError(
        "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
      );
    }
    return this;
  };

  /**
   * Walk over the tree of JS snippets in this node and its children. The
   * walking function is called once for each snippet of JS and is passed that
   * snippet and the its original associated source's line/column location.
   *
   * @param aFn The traversal function.
   */
  SourceNode.prototype.walk = function SourceNode_walk(aFn) {
    this.children.forEach(function (chunk) {
      if (chunk instanceof SourceNode) {
        chunk.walk(aFn);
      }
      else {
        if (chunk !== '') {
          aFn(chunk, { source: this.source, line: this.line, column: this.column });
        }
      }
    }, this);
  };

  /**
   * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
   * each of `this.children`.
   *
   * @param aSep The separator.
   */
  SourceNode.prototype.join = function SourceNode_join(aSep) {
    var newChildren;
    var i;
    var len = this.children.length
    if (len > 0) {
      newChildren = [];
      for (i = 0; i < len-1; i++) {
        newChildren.push(this.children[i]);
        newChildren.push(aSep);
      }
      newChildren.push(this.children[i]);
      this.children = newChildren;
    }
    return this;
  };

  /**
   * Call String.prototype.replace on the very right-most source snippet. Useful
   * for trimming whitespace from the end of a source node, etc.
   *
   * @param aPattern The pattern to replace.
   * @param aReplacement The thing to replace the pattern with.
   */
  SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
    var lastChild = this.children[this.children.length - 1];
    if (lastChild instanceof SourceNode) {
      lastChild.replaceRight(aPattern, aReplacement);
    }
    else if (typeof lastChild === 'string') {
      this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
    }
    else {
      this.children.push(''.replace(aPattern, aReplacement));
    }
    return this;
  };

  /**
   * Return the string representation of this source node. Walks over the tree
   * and concatenates all the various snippets together to one string.
   */
  SourceNode.prototype.toString = function SourceNode_toString() {
    var str = "";
    this.walk(function (chunk) {
      str += chunk;
    });
    return str;
  };

  /**
   * Returns the string representation of this source node along with a source
   * map.
   */
  SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
    var generated = {
      code: "",
      line: 1,
      column: 0
    };
    var map = new SourceMapGenerator(aArgs);
    this.walk(function (chunk, original) {
      generated.code += chunk;
      if (original.source != null
          && original.line != null
          && original.column != null) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          }
        });
      }
      chunk.split('').forEach(function (char) {
        if (char === '\n') {
          generated.line++;
          generated.column = 0;
        } else {
          generated.column++;
        }
      });
    });

    return { code: generated.code, map: map };
  };

  exports.SourceNode = SourceNode;

});
/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

define('source-map/util', function (require, exports, module) {

  /**
   * This is a helper function for getting values from parameter/options
   * objects.
   *
   * @param args The object we are extracting values from
   * @param name The name of the property we are getting.
   * @param defaultValue An optional value to return if the property is missing
   * from the object. If this is not specified and the property is missing, an
   * error will be thrown.
   */
  function getArg(aArgs, aName, aDefaultValue) {
    if (aName in aArgs) {
      return aArgs[aName];
    } else if (arguments.length === 3) {
      return aDefaultValue;
    } else {
      throw new Error('"' + aName + '" is a required argument.');
    }
  }
  exports.getArg = getArg;

  function join(aRoot, aPath) {
    return aPath.charAt(0) === '/'
      ? aPath
      : aRoot.replace(/\/*$/, '') + '/' + aPath;
  }
  exports.join = join;

});
define('source-map', function (require, exports, module) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = require('./source-map/source-map-generator').SourceMapGenerator;
exports.SourceMapConsumer = require('./source-map/source-map-consumer').SourceMapConsumer;
exports.SourceNode = require('./source-map/source-node').SourceNode;

});

//Distributed under the BSD license:
//Copyright 2012 (c) Mihai Bazon <mihai.bazon@gmail.com>
define('uglifyjs2', ['exports', 'source-map', 'logger'], function (exports, MOZ_SourceMap, logger) {
(function(exports, global) {
    global["UglifyJS"] = exports;
    "use strict";
    function array_to_hash(a) {
        var ret = Object.create(null);
        for (var i = 0; i < a.length; ++i) ret[a[i]] = true;
        return ret;
    }
    function slice(a, start) {
        return Array.prototype.slice.call(a, start || 0);
    }
    function characters(str) {
        return str.split("");
    }
    function member(name, array) {
        for (var i = array.length; --i >= 0; ) if (array[i] == name) return true;
        return false;
    }
    function find_if(func, array) {
        for (var i = 0, n = array.length; i < n; ++i) {
            if (func(array[i])) return array[i];
        }
    }
    function repeat_string(str, i) {
        if (i <= 0) return "";
        if (i == 1) return str;
        var d = repeat_string(str, i >> 1);
        d += d;
        if (i & 1) d += str;
        return d;
    }
    function DefaultsError(msg, defs) {
        this.msg = msg;
        this.defs = defs;
    }
    function defaults(args, defs, croak) {
        if (args === true) args = {};
        var ret = args || {};
        if (croak) for (var i in ret) if (ret.hasOwnProperty(i) && !defs.hasOwnProperty(i)) throw new DefaultsError("`" + i + "` is not a supported option", defs);
        for (var i in defs) if (defs.hasOwnProperty(i)) {
            ret[i] = args && args.hasOwnProperty(i) ? args[i] : defs[i];
        }
        return ret;
    }
    function merge(obj, ext) {
        for (var i in ext) if (ext.hasOwnProperty(i)) {
            obj[i] = ext[i];
        }
        return obj;
    }
    function noop() {}
    var MAP = function() {
        function MAP(a, f, backwards) {
            var ret = [], top = [], i;
            function doit() {
                var val = f(a[i], i);
                var is_last = val instanceof Last;
                if (is_last) val = val.v;
                if (val instanceof AtTop) {
                    val = val.v;
                    if (val instanceof Splice) {
                        top.push.apply(top, backwards ? val.v.slice().reverse() : val.v);
                    } else {
                        top.push(val);
                    }
                } else if (val !== skip) {
                    if (val instanceof Splice) {
                        ret.push.apply(ret, backwards ? val.v.slice().reverse() : val.v);
                    } else {
                        ret.push(val);
                    }
                }
                return is_last;
            }
            if (a instanceof Array) {
                if (backwards) {
                    for (i = a.length; --i >= 0; ) if (doit()) break;
                    ret.reverse();
                    top.reverse();
                } else {
                    for (i = 0; i < a.length; ++i) if (doit()) break;
                }
            } else {
                for (i in a) if (a.hasOwnProperty(i)) if (doit()) break;
            }
            return top.concat(ret);
        }
        MAP.at_top = function(val) {
            return new AtTop(val);
        };
        MAP.splice = function(val) {
            return new Splice(val);
        };
        MAP.last = function(val) {
            return new Last(val);
        };
        var skip = MAP.skip = {};
        function AtTop(val) {
            this.v = val;
        }
        function Splice(val) {
            this.v = val;
        }
        function Last(val) {
            this.v = val;
        }
        return MAP;
    }();
    function push_uniq(array, el) {
        if (array.indexOf(el) < 0) array.push(el);
    }
    function string_template(text, props) {
        return text.replace(/\{(.+?)\}/g, function(str, p) {
            return props[p];
        });
    }
    function remove(array, el) {
        for (var i = array.length; --i >= 0; ) {
            if (array[i] === el) array.splice(i, 1);
        }
    }
    function mergeSort(array, cmp) {
        if (array.length < 2) return array.slice();
        function merge(a, b) {
            var r = [], ai = 0, bi = 0, i = 0;
            while (ai < a.length && bi < b.length) {
                cmp(a[ai], b[bi]) <= 0 ? r[i++] = a[ai++] : r[i++] = b[bi++];
            }
            if (ai < a.length) r.push.apply(r, a.slice(ai));
            if (bi < b.length) r.push.apply(r, b.slice(bi));
            return r;
        }
        function _ms(a) {
            if (a.length <= 1) return a;
            var m = Math.floor(a.length / 2), left = a.slice(0, m), right = a.slice(m);
            left = _ms(left);
            right = _ms(right);
            return merge(left, right);
        }
        return _ms(array);
    }
    function set_difference(a, b) {
        return a.filter(function(el) {
            return b.indexOf(el) < 0;
        });
    }
    function set_intersection(a, b) {
        return a.filter(function(el) {
            return b.indexOf(el) >= 0;
        });
    }
    function makePredicate(words) {
        if (!(words instanceof Array)) words = words.split(" ");
        var f = "", cats = [];
        out: for (var i = 0; i < words.length; ++i) {
            for (var j = 0; j < cats.length; ++j) if (cats[j][0].length == words[i].length) {
                cats[j].push(words[i]);
                continue out;
            }
            cats.push([ words[i] ]);
        }
        function compareTo(arr) {
            if (arr.length == 1) return f += "return str === " + JSON.stringify(arr[0]) + ";";
            f += "switch(str){";
            for (var i = 0; i < arr.length; ++i) f += "case " + JSON.stringify(arr[i]) + ":";
            f += "return true}return false;";
        }
        if (cats.length > 3) {
            cats.sort(function(a, b) {
                return b.length - a.length;
            });
            f += "switch(str.length){";
            for (var i = 0; i < cats.length; ++i) {
                var cat = cats[i];
                f += "case " + cat[0].length + ":";
                compareTo(cat);
            }
            f += "}";
        } else {
            compareTo(words);
        }
        return new Function("str", f);
    }
    function Dictionary() {
        this._values = Object.create(null);
        this._size = 0;
    }
    Dictionary.prototype = {
        set: function(key, val) {
            if (!this.has(key)) ++this._size;
            this._values["$" + key] = val;
            return this;
        },
        add: function(key, val) {
            if (this.has(key)) {
                this.get(key).push(val);
            } else {
                this.set(key, [ val ]);
            }
            return this;
        },
        get: function(key) {
            return this._values["$" + key];
        },
        del: function(key) {
            if (this.has(key)) {
                --this._size;
                delete this._values["$" + key];
            }
            return this;
        },
        has: function(key) {
            return "$" + key in this._values;
        },
        each: function(f) {
            for (var i in this._values) f(this._values[i], i.substr(1));
        },
        size: function() {
            return this._size;
        },
        map: function(f) {
            var ret = [];
            for (var i in this._values) ret.push(f(this._values[i], i.substr(1)));
            return ret;
        }
    };
    "use strict";
    function DEFNODE(type, props, methods, base) {
        if (arguments.length < 4) base = AST_Node;
        if (!props) props = []; else props = props.split(/\s+/);
        var self_props = props;
        if (base && base.PROPS) props = props.concat(base.PROPS);
        var code = "return function AST_" + type + "(props){ if (props) { ";
        for (var i = props.length; --i >= 0; ) {
            code += "this." + props[i] + " = props." + props[i] + ";";
        }
        var proto = base && new base();
        if (proto && proto.initialize || methods && methods.initialize) code += "this.initialize();";
        code += "}}";
        var ctor = new Function(code)();
        if (proto) {
            ctor.prototype = proto;
            ctor.BASE = base;
        }
        if (base) base.SUBCLASSES.push(ctor);
        ctor.prototype.CTOR = ctor;
        ctor.PROPS = props || null;
        ctor.SELF_PROPS = self_props;
        ctor.SUBCLASSES = [];
        if (type) {
            ctor.prototype.TYPE = ctor.TYPE = type;
        }
        if (methods) for (i in methods) if (methods.hasOwnProperty(i)) {
            if (/^\$/.test(i)) {
                ctor[i.substr(1)] = methods[i];
            } else {
                ctor.prototype[i] = methods[i];
            }
        }
        ctor.DEFMETHOD = function(name, method) {
            this.prototype[name] = method;
        };
        return ctor;
    }
    var AST_Token = DEFNODE("Token", "type value line col pos endpos nlb comments_before file", {}, null);
    var AST_Node = DEFNODE("Node", "start end", {
        clone: function() {
            return new this.CTOR(this);
        },
        $documentation: "Base class of all AST nodes",
        $propdoc: {
            start: "[AST_Token] The first token of this node",
            end: "[AST_Token] The last token of this node"
        },
        _walk: function(visitor) {
            return visitor._visit(this);
        },
        walk: function(visitor) {
            return this._walk(visitor);
        }
    }, null);
    AST_Node.warn_function = null;
    AST_Node.warn = function(txt, props) {
        if (AST_Node.warn_function) AST_Node.warn_function(string_template(txt, props));
    };
    var AST_Statement = DEFNODE("Statement", null, {
        $documentation: "Base class of all statements"
    });
    var AST_Debugger = DEFNODE("Debugger", null, {
        $documentation: "Represents a debugger statement"
    }, AST_Statement);
    var AST_Directive = DEFNODE("Directive", "value scope", {
        $documentation: 'Represents a directive, like "use strict";',
        $propdoc: {
            value: "[string] The value of this directive as a plain string (it's not an AST_String!)",
            scope: "[AST_Scope/S] The scope that this directive affects"
        }
    }, AST_Statement);
    var AST_SimpleStatement = DEFNODE("SimpleStatement", "body", {
        $documentation: "A statement consisting of an expression, i.e. a = 1 + 2",
        $propdoc: {
            body: "[AST_Node] an expression node (should not be instanceof AST_Statement)"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.body._walk(visitor);
            });
        }
    }, AST_Statement);
    function walk_body(node, visitor) {
        if (node.body instanceof AST_Statement) {
            node.body._walk(visitor);
        } else node.body.forEach(function(stat) {
            stat._walk(visitor);
        });
    }
    var AST_Block = DEFNODE("Block", "body", {
        $documentation: "A body of statements (usually bracketed)",
        $propdoc: {
            body: "[AST_Statement*] an array of statements"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                walk_body(this, visitor);
            });
        }
    }, AST_Statement);
    var AST_BlockStatement = DEFNODE("BlockStatement", null, {
        $documentation: "A block statement"
    }, AST_Block);
    var AST_EmptyStatement = DEFNODE("EmptyStatement", null, {
        $documentation: "The empty statement (empty block or simply a semicolon)",
        _walk: function(visitor) {
            return visitor._visit(this);
        }
    }, AST_Statement);
    var AST_StatementWithBody = DEFNODE("StatementWithBody", "body", {
        $documentation: "Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",
        $propdoc: {
            body: "[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.body._walk(visitor);
            });
        }
    }, AST_Statement);
    var AST_LabeledStatement = DEFNODE("LabeledStatement", "label", {
        $documentation: "Statement with a label",
        $propdoc: {
            label: "[AST_Label] a label definition"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.label._walk(visitor);
                this.body._walk(visitor);
            });
        }
    }, AST_StatementWithBody);
    var AST_DWLoop = DEFNODE("DWLoop", "condition", {
        $documentation: "Base class for do/while statements",
        $propdoc: {
            condition: "[AST_Node] the loop condition.  Should not be instanceof AST_Statement"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.condition._walk(visitor);
                this.body._walk(visitor);
            });
        }
    }, AST_StatementWithBody);
    var AST_Do = DEFNODE("Do", null, {
        $documentation: "A `do` statement"
    }, AST_DWLoop);
    var AST_While = DEFNODE("While", null, {
        $documentation: "A `while` statement"
    }, AST_DWLoop);
    var AST_For = DEFNODE("For", "init condition step", {
        $documentation: "A `for` statement",
        $propdoc: {
            init: "[AST_Node?] the `for` initialization code, or null if empty",
            condition: "[AST_Node?] the `for` termination clause, or null if empty",
            step: "[AST_Node?] the `for` update clause, or null if empty"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                if (this.init) this.init._walk(visitor);
                if (this.condition) this.condition._walk(visitor);
                if (this.step) this.step._walk(visitor);
                this.body._walk(visitor);
            });
        }
    }, AST_StatementWithBody);
    var AST_ForIn = DEFNODE("ForIn", "init name object", {
        $documentation: "A `for ... in` statement",
        $propdoc: {
            init: "[AST_Node] the `for/in` initialization code",
            name: "[AST_SymbolRef?] the loop variable, only if `init` is AST_Var",
            object: "[AST_Node] the object that we're looping through"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.init._walk(visitor);
                this.object._walk(visitor);
                this.body._walk(visitor);
            });
        }
    }, AST_StatementWithBody);
    var AST_With = DEFNODE("With", "expression", {
        $documentation: "A `with` statement",
        $propdoc: {
            expression: "[AST_Node] the `with` expression"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.expression._walk(visitor);
                this.body._walk(visitor);
            });
        }
    }, AST_StatementWithBody);
    var AST_Scope = DEFNODE("Scope", "directives variables functions uses_with uses_eval parent_scope enclosed cname", {
        $documentation: "Base class for all statements introducing a lexical scope",
        $propdoc: {
            directives: "[string*/S] an array of directives declared in this scope",
            variables: "[Object/S] a map of name -> SymbolDef for all variables/functions defined in this scope",
            functions: "[Object/S] like `variables`, but only lists function declarations",
            uses_with: "[boolean/S] tells whether this scope uses the `with` statement",
            uses_eval: "[boolean/S] tells whether this scope contains a direct call to the global `eval`",
            parent_scope: "[AST_Scope?/S] link to the parent scope",
            enclosed: "[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",
            cname: "[integer/S] current index for mangling variables (used internally by the mangler)"
        }
    }, AST_Block);
    var AST_Toplevel = DEFNODE("Toplevel", "globals", {
        $documentation: "The toplevel scope",
        $propdoc: {
            globals: "[Object/S] a map of name -> SymbolDef for all undeclared names"
        },
        wrap_commonjs: function(name, export_all) {
            var self = this;
            var to_export = [];
            if (export_all) {
                self.figure_out_scope();
                self.walk(new TreeWalker(function(node) {
                    if (node instanceof AST_SymbolDeclaration && node.definition().global) {
                        if (!find_if(function(n) {
                            return n.name == node.name;
                        }, to_export)) to_export.push(node);
                    }
                }));
            }
            var wrapped_tl = "(function(exports, global){ global['" + name + "'] = exports; '$ORIG'; '$EXPORTS'; }({}, (function(){return this}())))";
            wrapped_tl = parse(wrapped_tl);
            wrapped_tl = wrapped_tl.transform(new TreeTransformer(function before(node) {
                if (node instanceof AST_SimpleStatement) {
                    node = node.body;
                    if (node instanceof AST_String) switch (node.getValue()) {
                      case "$ORIG":
                        return MAP.splice(self.body);

                      case "$EXPORTS":
                        var body = [];
                        to_export.forEach(function(sym) {
                            body.push(new AST_SimpleStatement({
                                body: new AST_Assign({
                                    left: new AST_Sub({
                                        expression: new AST_SymbolRef({
                                            name: "exports"
                                        }),
                                        property: new AST_String({
                                            value: sym.name
                                        })
                                    }),
                                    operator: "=",
                                    right: new AST_SymbolRef(sym)
                                })
                            }));
                        });
                        return MAP.splice(body);
                    }
                }
            }));
            return wrapped_tl;
        }
    }, AST_Scope);
    var AST_Lambda = DEFNODE("Lambda", "name argnames uses_arguments", {
        $documentation: "Base class for functions",
        $propdoc: {
            name: "[AST_SymbolDeclaration?] the name of this function",
            argnames: "[AST_SymbolFunarg*] array of function arguments",
            uses_arguments: "[boolean/S] tells whether this function accesses the arguments array"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                if (this.name) this.name._walk(visitor);
                this.argnames.forEach(function(arg) {
                    arg._walk(visitor);
                });
                walk_body(this, visitor);
            });
        }
    }, AST_Scope);
    var AST_Accessor = DEFNODE("Accessor", null, {
        $documentation: "A setter/getter function"
    }, AST_Lambda);
    var AST_Function = DEFNODE("Function", null, {
        $documentation: "A function expression"
    }, AST_Lambda);
    var AST_Defun = DEFNODE("Defun", null, {
        $documentation: "A function definition"
    }, AST_Lambda);
    var AST_Jump = DEFNODE("Jump", null, {
        $documentation: "Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"
    }, AST_Statement);
    var AST_Exit = DEFNODE("Exit", "value", {
        $documentation: "Base class for “exits” (`return` and `throw`)",
        $propdoc: {
            value: "[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"
        },
        _walk: function(visitor) {
            return visitor._visit(this, this.value && function() {
                this.value._walk(visitor);
            });
        }
    }, AST_Jump);
    var AST_Return = DEFNODE("Return", null, {
        $documentation: "A `return` statement"
    }, AST_Exit);
    var AST_Throw = DEFNODE("Throw", null, {
        $documentation: "A `throw` statement"
    }, AST_Exit);
    var AST_LoopControl = DEFNODE("LoopControl", "label", {
        $documentation: "Base class for loop control statements (`break` and `continue`)",
        $propdoc: {
            label: "[AST_LabelRef?] the label, or null if none"
        },
        _walk: function(visitor) {
            return visitor._visit(this, this.label && function() {
                this.label._walk(visitor);
            });
        }
    }, AST_Jump);
    var AST_Break = DEFNODE("Break", null, {
        $documentation: "A `break` statement"
    }, AST_LoopControl);
    var AST_Continue = DEFNODE("Continue", null, {
        $documentation: "A `continue` statement"
    }, AST_LoopControl);
    var AST_If = DEFNODE("If", "condition alternative", {
        $documentation: "A `if` statement",
        $propdoc: {
            condition: "[AST_Node] the `if` condition",
            alternative: "[AST_Statement?] the `else` part, or null if not present"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.condition._walk(visitor);
                this.body._walk(visitor);
                if (this.alternative) this.alternative._walk(visitor);
            });
        }
    }, AST_StatementWithBody);
    var AST_Switch = DEFNODE("Switch", "expression", {
        $documentation: "A `switch` statement",
        $propdoc: {
            expression: "[AST_Node] the `switch` “discriminant”"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.expression._walk(visitor);
                walk_body(this, visitor);
            });
        }
    }, AST_Block);
    var AST_SwitchBranch = DEFNODE("SwitchBranch", null, {
        $documentation: "Base class for `switch` branches"
    }, AST_Block);
    var AST_Default = DEFNODE("Default", null, {
        $documentation: "A `default` switch branch"
    }, AST_SwitchBranch);
    var AST_Case = DEFNODE("Case", "expression", {
        $documentation: "A `case` switch branch",
        $propdoc: {
            expression: "[AST_Node] the `case` expression"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.expression._walk(visitor);
                walk_body(this, visitor);
            });
        }
    }, AST_SwitchBranch);
    var AST_Try = DEFNODE("Try", "bcatch bfinally", {
        $documentation: "A `try` statement",
        $propdoc: {
            bcatch: "[AST_Catch?] the catch block, or null if not present",
            bfinally: "[AST_Finally?] the finally block, or null if not present"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                walk_body(this, visitor);
                if (this.bcatch) this.bcatch._walk(visitor);
                if (this.bfinally) this.bfinally._walk(visitor);
            });
        }
    }, AST_Block);
    var AST_Catch = DEFNODE("Catch", "argname", {
        $documentation: "A `catch` node; only makes sense as part of a `try` statement",
        $propdoc: {
            argname: "[AST_SymbolCatch] symbol for the exception"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.argname._walk(visitor);
                walk_body(this, visitor);
            });
        }
    }, AST_Block);
    var AST_Finally = DEFNODE("Finally", null, {
        $documentation: "A `finally` node; only makes sense as part of a `try` statement"
    }, AST_Block);
    var AST_Definitions = DEFNODE("Definitions", "definitions", {
        $documentation: "Base class for `var` or `const` nodes (variable declarations/initializations)",
        $propdoc: {
            definitions: "[AST_VarDef*] array of variable definitions"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.definitions.forEach(function(def) {
                    def._walk(visitor);
                });
            });
        }
    }, AST_Statement);
    var AST_Var = DEFNODE("Var", null, {
        $documentation: "A `var` statement"
    }, AST_Definitions);
    var AST_Const = DEFNODE("Const", null, {
        $documentation: "A `const` statement"
    }, AST_Definitions);
    var AST_VarDef = DEFNODE("VarDef", "name value", {
        $documentation: "A variable declaration; only appears in a AST_Definitions node",
        $propdoc: {
            name: "[AST_SymbolVar|AST_SymbolConst] name of the variable",
            value: "[AST_Node?] initializer, or null of there's no initializer"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.name._walk(visitor);
                if (this.value) this.value._walk(visitor);
            });
        }
    });
    var AST_Call = DEFNODE("Call", "expression args", {
        $documentation: "A function call expression",
        $propdoc: {
            expression: "[AST_Node] expression to invoke as function",
            args: "[AST_Node*] array of arguments"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.expression._walk(visitor);
                this.args.forEach(function(arg) {
                    arg._walk(visitor);
                });
            });
        }
    });
    var AST_New = DEFNODE("New", null, {
        $documentation: "An object instantiation.  Derives from a function call since it has exactly the same properties"
    }, AST_Call);
    var AST_Seq = DEFNODE("Seq", "car cdr", {
        $documentation: "A sequence expression (two comma-separated expressions)",
        $propdoc: {
            car: "[AST_Node] first element in sequence",
            cdr: "[AST_Node] second element in sequence"
        },
        $cons: function(x, y) {
            var seq = new AST_Seq(x);
            seq.car = x;
            seq.cdr = y;
            return seq;
        },
        $from_array: function(array) {
            if (array.length == 0) return null;
            if (array.length == 1) return array[0].clone();
            var list = null;
            for (var i = array.length; --i >= 0; ) {
                list = AST_Seq.cons(array[i], list);
            }
            var p = list;
            while (p) {
                if (p.cdr && !p.cdr.cdr) {
                    p.cdr = p.cdr.car;
                    break;
                }
                p = p.cdr;
            }
            return list;
        },
        to_array: function() {
            var p = this, a = [];
            while (p) {
                a.push(p.car);
                if (p.cdr && !(p.cdr instanceof AST_Seq)) {
                    a.push(p.cdr);
                    break;
                }
                p = p.cdr;
            }
            return a;
        },
        add: function(node) {
            var p = this;
            while (p) {
                if (!(p.cdr instanceof AST_Seq)) {
                    var cell = AST_Seq.cons(p.cdr, node);
                    return p.cdr = cell;
                }
                p = p.cdr;
            }
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.car._walk(visitor);
                if (this.cdr) this.cdr._walk(visitor);
            });
        }
    });
    var AST_PropAccess = DEFNODE("PropAccess", "expression property", {
        $documentation: 'Base class for property access expressions, i.e. `a.foo` or `a["foo"]`',
        $propdoc: {
            expression: "[AST_Node] the “container” expression",
            property: "[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"
        }
    });
    var AST_Dot = DEFNODE("Dot", null, {
        $documentation: "A dotted property access expression",
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.expression._walk(visitor);
            });
        }
    }, AST_PropAccess);
    var AST_Sub = DEFNODE("Sub", null, {
        $documentation: 'Index-style property access, i.e. `a["foo"]`',
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.expression._walk(visitor);
                this.property._walk(visitor);
            });
        }
    }, AST_PropAccess);
    var AST_Unary = DEFNODE("Unary", "operator expression", {
        $documentation: "Base class for unary expressions",
        $propdoc: {
            operator: "[string] the operator",
            expression: "[AST_Node] expression that this unary operator applies to"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.expression._walk(visitor);
            });
        }
    });
    var AST_UnaryPrefix = DEFNODE("UnaryPrefix", null, {
        $documentation: "Unary prefix expression, i.e. `typeof i` or `++i`"
    }, AST_Unary);
    var AST_UnaryPostfix = DEFNODE("UnaryPostfix", null, {
        $documentation: "Unary postfix expression, i.e. `i++`"
    }, AST_Unary);
    var AST_Binary = DEFNODE("Binary", "left operator right", {
        $documentation: "Binary expression, i.e. `a + b`",
        $propdoc: {
            left: "[AST_Node] left-hand side expression",
            operator: "[string] the operator",
            right: "[AST_Node] right-hand side expression"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.left._walk(visitor);
                this.right._walk(visitor);
            });
        }
    });
    var AST_Conditional = DEFNODE("Conditional", "condition consequent alternative", {
        $documentation: "Conditional expression using the ternary operator, i.e. `a ? b : c`",
        $propdoc: {
            condition: "[AST_Node]",
            consequent: "[AST_Node]",
            alternative: "[AST_Node]"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.condition._walk(visitor);
                this.consequent._walk(visitor);
                this.alternative._walk(visitor);
            });
        }
    });
    var AST_Assign = DEFNODE("Assign", null, {
        $documentation: "An assignment expression — `a = b + 5`"
    }, AST_Binary);
    var AST_Array = DEFNODE("Array", "elements", {
        $documentation: "An array literal",
        $propdoc: {
            elements: "[AST_Node*] array of elements"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.elements.forEach(function(el) {
                    el._walk(visitor);
                });
            });
        }
    });
    var AST_Object = DEFNODE("Object", "properties", {
        $documentation: "An object literal",
        $propdoc: {
            properties: "[AST_ObjectProperty*] array of properties"
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.properties.forEach(function(prop) {
                    prop._walk(visitor);
                });
            });
        }
    });
    var AST_ObjectProperty = DEFNODE("ObjectProperty", "key value", {
        $documentation: "Base class for literal object properties",
        $propdoc: {
            key: "[string] the property name; it's always a plain string in our AST, no matter if it was a string, number or identifier in original code",
            value: "[AST_Node] property value.  For setters and getters this is an AST_Function."
        },
        _walk: function(visitor) {
            return visitor._visit(this, function() {
                this.value._walk(visitor);
            });
        }
    });
    var AST_ObjectKeyVal = DEFNODE("ObjectKeyVal", null, {
        $documentation: "A key: value object property"
    }, AST_ObjectProperty);
    var AST_ObjectSetter = DEFNODE("ObjectSetter", null, {
        $documentation: "An object setter property"
    }, AST_ObjectProperty);
    var AST_ObjectGetter = DEFNODE("ObjectGetter", null, {
        $documentation: "An object getter property"
    }, AST_ObjectProperty);
    var AST_Symbol = DEFNODE("Symbol", "scope name thedef", {
        $propdoc: {
            name: "[string] name of this symbol",
            scope: "[AST_Scope/S] the current scope (not necessarily the definition scope)",
            thedef: "[SymbolDef/S] the definition of this symbol"
        },
        $documentation: "Base class for all symbols"
    });
    var AST_SymbolAccessor = DEFNODE("SymbolAccessor", null, {
        $documentation: "The name of a property accessor (setter/getter function)"
    }, AST_Symbol);
    var AST_SymbolDeclaration = DEFNODE("SymbolDeclaration", "init", {
        $documentation: "A declaration symbol (symbol in var/const, function name or argument, symbol in catch)",
        $propdoc: {
            init: "[AST_Node*/S] array of initializers for this declaration."
        }
    }, AST_Symbol);
    var AST_SymbolVar = DEFNODE("SymbolVar", null, {
        $documentation: "Symbol defining a variable"
    }, AST_SymbolDeclaration);
    var AST_SymbolConst = DEFNODE("SymbolConst", null, {
        $documentation: "A constant declaration"
    }, AST_SymbolDeclaration);
    var AST_SymbolFunarg = DEFNODE("SymbolFunarg", null, {
        $documentation: "Symbol naming a function argument"
    }, AST_SymbolVar);
    var AST_SymbolDefun = DEFNODE("SymbolDefun", null, {
        $documentation: "Symbol defining a function"
    }, AST_SymbolDeclaration);
    var AST_SymbolLambda = DEFNODE("SymbolLambda", null, {
        $documentation: "Symbol naming a function expression"
    }, AST_SymbolDeclaration);
    var AST_SymbolCatch = DEFNODE("SymbolCatch", null, {
        $documentation: "Symbol naming the exception in catch"
    }, AST_SymbolDeclaration);
    var AST_Label = DEFNODE("Label", "references", {
        $documentation: "Symbol naming a label (declaration)",
        $propdoc: {
            references: "[AST_LabelRef*] a list of nodes referring to this label"
        }
    }, AST_Symbol);
    var AST_SymbolRef = DEFNODE("SymbolRef", null, {
        $documentation: "Reference to some symbol (not definition/declaration)"
    }, AST_Symbol);
    var AST_LabelRef = DEFNODE("LabelRef", null, {
        $documentation: "Reference to a label symbol"
    }, AST_Symbol);
    var AST_This = DEFNODE("This", null, {
        $documentation: "The `this` symbol"
    }, AST_Symbol);
    var AST_Constant = DEFNODE("Constant", null, {
        $documentation: "Base class for all constants",
        getValue: function() {
            return this.value;
        }
    });
    var AST_String = DEFNODE("String", "value", {
        $documentation: "A string literal",
        $propdoc: {
            value: "[string] the contents of this string"
        }
    }, AST_Constant);
    var AST_Number = DEFNODE("Number", "value", {
        $documentation: "A number literal",
        $propdoc: {
            value: "[number] the numeric value"
        }
    }, AST_Constant);
    var AST_RegExp = DEFNODE("RegExp", "value", {
        $documentation: "A regexp literal",
        $propdoc: {
            value: "[RegExp] the actual regexp"
        }
    }, AST_Constant);
    var AST_Atom = DEFNODE("Atom", null, {
        $documentation: "Base class for atoms"
    }, AST_Constant);
    var AST_Null = DEFNODE("Null", null, {
        $documentation: "The `null` atom",
        value: null
    }, AST_Atom);
    var AST_NaN = DEFNODE("NaN", null, {
        $documentation: "The impossible value",
        value: 0 / 0
    }, AST_Atom);
    var AST_Undefined = DEFNODE("Undefined", null, {
        $documentation: "The `undefined` value",
        value: function() {}()
    }, AST_Atom);
    var AST_Infinity = DEFNODE("Infinity", null, {
        $documentation: "The `Infinity` value",
        value: 1 / 0
    }, AST_Atom);
    var AST_Boolean = DEFNODE("Boolean", null, {
        $documentation: "Base class for booleans"
    }, AST_Atom);
    var AST_False = DEFNODE("False", null, {
        $documentation: "The `false` atom",
        value: false
    }, AST_Boolean);
    var AST_True = DEFNODE("True", null, {
        $documentation: "The `true` atom",
        value: true
    }, AST_Boolean);
    function TreeWalker(callback) {
        this.visit = callback;
        this.stack = [];
    }
    TreeWalker.prototype = {
        _visit: function(node, descend) {
            this.stack.push(node);
            var ret = this.visit(node, descend ? function() {
                descend.call(node);
            } : noop);
            if (!ret && descend) {
                descend.call(node);
            }
            this.stack.pop();
            return ret;
        },
        parent: function(n) {
            return this.stack[this.stack.length - 2 - (n || 0)];
        },
        push: function(node) {
            this.stack.push(node);
        },
        pop: function() {
            return this.stack.pop();
        },
        self: function() {
            return this.stack[this.stack.length - 1];
        },
        find_parent: function(type) {
            var stack = this.stack;
            for (var i = stack.length; --i >= 0; ) {
                var x = stack[i];
                if (x instanceof type) return x;
            }
        },
        in_boolean_context: function() {
            var stack = this.stack;
            var i = stack.length, self = stack[--i];
            while (i > 0) {
                var p = stack[--i];
                if (p instanceof AST_If && p.condition === self || p instanceof AST_Conditional && p.condition === self || p instanceof AST_DWLoop && p.condition === self || p instanceof AST_For && p.condition === self || p instanceof AST_UnaryPrefix && p.operator == "!" && p.expression === self) {
                    return true;
                }
                if (!(p instanceof AST_Binary && (p.operator == "&&" || p.operator == "||"))) return false;
                self = p;
            }
        },
        loopcontrol_target: function(label) {
            var stack = this.stack;
            if (label) {
                for (var i = stack.length; --i >= 0; ) {
                    var x = stack[i];
                    if (x instanceof AST_LabeledStatement && x.label.name == label.name) {
                        return x.body;
                    }
                }
            } else {
                for (var i = stack.length; --i >= 0; ) {
                    var x = stack[i];
                    if (x instanceof AST_Switch || x instanceof AST_For || x instanceof AST_ForIn || x instanceof AST_DWLoop) return x;
                }
            }
        }
    };
    "use strict";
    var KEYWORDS = "break case catch const continue debugger default delete do else finally for function if in instanceof new return switch throw try typeof var void while with";
    var KEYWORDS_ATOM = "false null true";
    var RESERVED_WORDS = "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized this throws transient volatile" + " " + KEYWORDS_ATOM + " " + KEYWORDS;
    var KEYWORDS_BEFORE_EXPRESSION = "return new delete throw else case";
    KEYWORDS = makePredicate(KEYWORDS);
    RESERVED_WORDS = makePredicate(RESERVED_WORDS);
    KEYWORDS_BEFORE_EXPRESSION = makePredicate(KEYWORDS_BEFORE_EXPRESSION);
    KEYWORDS_ATOM = makePredicate(KEYWORDS_ATOM);
    var OPERATOR_CHARS = makePredicate(characters("+-*&%=<>!?|~^"));
    var RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
    var RE_OCT_NUMBER = /^0[0-7]+$/;
    var RE_DEC_NUMBER = /^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i;
    var OPERATORS = makePredicate([ "in", "instanceof", "typeof", "new", "void", "delete", "++", "--", "+", "-", "!", "~", "&", "|", "^", "*", "/", "%", ">>", "<<", ">>>", "<", ">", "<=", ">=", "==", "===", "!=", "!==", "?", "=", "+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=", "&&", "||" ]);
    var WHITESPACE_CHARS = makePredicate(characters(" \u00a0\n\r\t\f\u000b\u200b\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000"));
    var PUNC_BEFORE_EXPRESSION = makePredicate(characters("[{(,.;:"));
    var PUNC_CHARS = makePredicate(characters("[]{}(),;:"));
    var REGEXP_MODIFIERS = makePredicate(characters("gmsiy"));
    var UNICODE = {
        letter: new RegExp("[\\u0041-\\u005A\\u0061-\\u007A\\u00AA\\u00B5\\u00BA\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02C1\\u02C6-\\u02D1\\u02E0-\\u02E4\\u02EC\\u02EE\\u0370-\\u0374\\u0376\\u0377\\u037A-\\u037D\\u0386\\u0388-\\u038A\\u038C\\u038E-\\u03A1\\u03A3-\\u03F5\\u03F7-\\u0481\\u048A-\\u0523\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05D0-\\u05EA\\u05F0-\\u05F2\\u0621-\\u064A\\u066E\\u066F\\u0671-\\u06D3\\u06D5\\u06E5\\u06E6\\u06EE\\u06EF\\u06FA-\\u06FC\\u06FF\\u0710\\u0712-\\u072F\\u074D-\\u07A5\\u07B1\\u07CA-\\u07EA\\u07F4\\u07F5\\u07FA\\u0904-\\u0939\\u093D\\u0950\\u0958-\\u0961\\u0971\\u0972\\u097B-\\u097F\\u0985-\\u098C\\u098F\\u0990\\u0993-\\u09A8\\u09AA-\\u09B0\\u09B2\\u09B6-\\u09B9\\u09BD\\u09CE\\u09DC\\u09DD\\u09DF-\\u09E1\\u09F0\\u09F1\\u0A05-\\u0A0A\\u0A0F\\u0A10\\u0A13-\\u0A28\\u0A2A-\\u0A30\\u0A32\\u0A33\\u0A35\\u0A36\\u0A38\\u0A39\\u0A59-\\u0A5C\\u0A5E\\u0A72-\\u0A74\\u0A85-\\u0A8D\\u0A8F-\\u0A91\\u0A93-\\u0AA8\\u0AAA-\\u0AB0\\u0AB2\\u0AB3\\u0AB5-\\u0AB9\\u0ABD\\u0AD0\\u0AE0\\u0AE1\\u0B05-\\u0B0C\\u0B0F\\u0B10\\u0B13-\\u0B28\\u0B2A-\\u0B30\\u0B32\\u0B33\\u0B35-\\u0B39\\u0B3D\\u0B5C\\u0B5D\\u0B5F-\\u0B61\\u0B71\\u0B83\\u0B85-\\u0B8A\\u0B8E-\\u0B90\\u0B92-\\u0B95\\u0B99\\u0B9A\\u0B9C\\u0B9E\\u0B9F\\u0BA3\\u0BA4\\u0BA8-\\u0BAA\\u0BAE-\\u0BB9\\u0BD0\\u0C05-\\u0C0C\\u0C0E-\\u0C10\\u0C12-\\u0C28\\u0C2A-\\u0C33\\u0C35-\\u0C39\\u0C3D\\u0C58\\u0C59\\u0C60\\u0C61\\u0C85-\\u0C8C\\u0C8E-\\u0C90\\u0C92-\\u0CA8\\u0CAA-\\u0CB3\\u0CB5-\\u0CB9\\u0CBD\\u0CDE\\u0CE0\\u0CE1\\u0D05-\\u0D0C\\u0D0E-\\u0D10\\u0D12-\\u0D28\\u0D2A-\\u0D39\\u0D3D\\u0D60\\u0D61\\u0D7A-\\u0D7F\\u0D85-\\u0D96\\u0D9A-\\u0DB1\\u0DB3-\\u0DBB\\u0DBD\\u0DC0-\\u0DC6\\u0E01-\\u0E30\\u0E32\\u0E33\\u0E40-\\u0E46\\u0E81\\u0E82\\u0E84\\u0E87\\u0E88\\u0E8A\\u0E8D\\u0E94-\\u0E97\\u0E99-\\u0E9F\\u0EA1-\\u0EA3\\u0EA5\\u0EA7\\u0EAA\\u0EAB\\u0EAD-\\u0EB0\\u0EB2\\u0EB3\\u0EBD\\u0EC0-\\u0EC4\\u0EC6\\u0EDC\\u0EDD\\u0F00\\u0F40-\\u0F47\\u0F49-\\u0F6C\\u0F88-\\u0F8B\\u1000-\\u102A\\u103F\\u1050-\\u1055\\u105A-\\u105D\\u1061\\u1065\\u1066\\u106E-\\u1070\\u1075-\\u1081\\u108E\\u10A0-\\u10C5\\u10D0-\\u10FA\\u10FC\\u1100-\\u1159\\u115F-\\u11A2\\u11A8-\\u11F9\\u1200-\\u1248\\u124A-\\u124D\\u1250-\\u1256\\u1258\\u125A-\\u125D\\u1260-\\u1288\\u128A-\\u128D\\u1290-\\u12B0\\u12B2-\\u12B5\\u12B8-\\u12BE\\u12C0\\u12C2-\\u12C5\\u12C8-\\u12D6\\u12D8-\\u1310\\u1312-\\u1315\\u1318-\\u135A\\u1380-\\u138F\\u13A0-\\u13F4\\u1401-\\u166C\\u166F-\\u1676\\u1681-\\u169A\\u16A0-\\u16EA\\u1700-\\u170C\\u170E-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176C\\u176E-\\u1770\\u1780-\\u17B3\\u17D7\\u17DC\\u1820-\\u1877\\u1880-\\u18A8\\u18AA\\u1900-\\u191C\\u1950-\\u196D\\u1970-\\u1974\\u1980-\\u19A9\\u19C1-\\u19C7\\u1A00-\\u1A16\\u1B05-\\u1B33\\u1B45-\\u1B4B\\u1B83-\\u1BA0\\u1BAE\\u1BAF\\u1C00-\\u1C23\\u1C4D-\\u1C4F\\u1C5A-\\u1C7D\\u1D00-\\u1DBF\\u1E00-\\u1F15\\u1F18-\\u1F1D\\u1F20-\\u1F45\\u1F48-\\u1F4D\\u1F50-\\u1F57\\u1F59\\u1F5B\\u1F5D\\u1F5F-\\u1F7D\\u1F80-\\u1FB4\\u1FB6-\\u1FBC\\u1FBE\\u1FC2-\\u1FC4\\u1FC6-\\u1FCC\\u1FD0-\\u1FD3\\u1FD6-\\u1FDB\\u1FE0-\\u1FEC\\u1FF2-\\u1FF4\\u1FF6-\\u1FFC\\u2071\\u207F\\u2090-\\u2094\\u2102\\u2107\\u210A-\\u2113\\u2115\\u2119-\\u211D\\u2124\\u2126\\u2128\\u212A-\\u212D\\u212F-\\u2139\\u213C-\\u213F\\u2145-\\u2149\\u214E\\u2183\\u2184\\u2C00-\\u2C2E\\u2C30-\\u2C5E\\u2C60-\\u2C6F\\u2C71-\\u2C7D\\u2C80-\\u2CE4\\u2D00-\\u2D25\\u2D30-\\u2D65\\u2D6F\\u2D80-\\u2D96\\u2DA0-\\u2DA6\\u2DA8-\\u2DAE\\u2DB0-\\u2DB6\\u2DB8-\\u2DBE\\u2DC0-\\u2DC6\\u2DC8-\\u2DCE\\u2DD0-\\u2DD6\\u2DD8-\\u2DDE\\u2E2F\\u3005\\u3006\\u3031-\\u3035\\u303B\\u303C\\u3041-\\u3096\\u309D-\\u309F\\u30A1-\\u30FA\\u30FC-\\u30FF\\u3105-\\u312D\\u3131-\\u318E\\u31A0-\\u31B7\\u31F0-\\u31FF\\u3400\\u4DB5\\u4E00\\u9FC3\\uA000-\\uA48C\\uA500-\\uA60C\\uA610-\\uA61F\\uA62A\\uA62B\\uA640-\\uA65F\\uA662-\\uA66E\\uA67F-\\uA697\\uA717-\\uA71F\\uA722-\\uA788\\uA78B\\uA78C\\uA7FB-\\uA801\\uA803-\\uA805\\uA807-\\uA80A\\uA80C-\\uA822\\uA840-\\uA873\\uA882-\\uA8B3\\uA90A-\\uA925\\uA930-\\uA946\\uAA00-\\uAA28\\uAA40-\\uAA42\\uAA44-\\uAA4B\\uAC00\\uD7A3\\uF900-\\uFA2D\\uFA30-\\uFA6A\\uFA70-\\uFAD9\\uFB00-\\uFB06\\uFB13-\\uFB17\\uFB1D\\uFB1F-\\uFB28\\uFB2A-\\uFB36\\uFB38-\\uFB3C\\uFB3E\\uFB40\\uFB41\\uFB43\\uFB44\\uFB46-\\uFBB1\\uFBD3-\\uFD3D\\uFD50-\\uFD8F\\uFD92-\\uFDC7\\uFDF0-\\uFDFB\\uFE70-\\uFE74\\uFE76-\\uFEFC\\uFF21-\\uFF3A\\uFF41-\\uFF5A\\uFF66-\\uFFBE\\uFFC2-\\uFFC7\\uFFCA-\\uFFCF\\uFFD2-\\uFFD7\\uFFDA-\\uFFDC]"),
        non_spacing_mark: new RegExp("[\\u0300-\\u036F\\u0483-\\u0487\\u0591-\\u05BD\\u05BF\\u05C1\\u05C2\\u05C4\\u05C5\\u05C7\\u0610-\\u061A\\u064B-\\u065E\\u0670\\u06D6-\\u06DC\\u06DF-\\u06E4\\u06E7\\u06E8\\u06EA-\\u06ED\\u0711\\u0730-\\u074A\\u07A6-\\u07B0\\u07EB-\\u07F3\\u0816-\\u0819\\u081B-\\u0823\\u0825-\\u0827\\u0829-\\u082D\\u0900-\\u0902\\u093C\\u0941-\\u0948\\u094D\\u0951-\\u0955\\u0962\\u0963\\u0981\\u09BC\\u09C1-\\u09C4\\u09CD\\u09E2\\u09E3\\u0A01\\u0A02\\u0A3C\\u0A41\\u0A42\\u0A47\\u0A48\\u0A4B-\\u0A4D\\u0A51\\u0A70\\u0A71\\u0A75\\u0A81\\u0A82\\u0ABC\\u0AC1-\\u0AC5\\u0AC7\\u0AC8\\u0ACD\\u0AE2\\u0AE3\\u0B01\\u0B3C\\u0B3F\\u0B41-\\u0B44\\u0B4D\\u0B56\\u0B62\\u0B63\\u0B82\\u0BC0\\u0BCD\\u0C3E-\\u0C40\\u0C46-\\u0C48\\u0C4A-\\u0C4D\\u0C55\\u0C56\\u0C62\\u0C63\\u0CBC\\u0CBF\\u0CC6\\u0CCC\\u0CCD\\u0CE2\\u0CE3\\u0D41-\\u0D44\\u0D4D\\u0D62\\u0D63\\u0DCA\\u0DD2-\\u0DD4\\u0DD6\\u0E31\\u0E34-\\u0E3A\\u0E47-\\u0E4E\\u0EB1\\u0EB4-\\u0EB9\\u0EBB\\u0EBC\\u0EC8-\\u0ECD\\u0F18\\u0F19\\u0F35\\u0F37\\u0F39\\u0F71-\\u0F7E\\u0F80-\\u0F84\\u0F86\\u0F87\\u0F90-\\u0F97\\u0F99-\\u0FBC\\u0FC6\\u102D-\\u1030\\u1032-\\u1037\\u1039\\u103A\\u103D\\u103E\\u1058\\u1059\\u105E-\\u1060\\u1071-\\u1074\\u1082\\u1085\\u1086\\u108D\\u109D\\u135F\\u1712-\\u1714\\u1732-\\u1734\\u1752\\u1753\\u1772\\u1773\\u17B7-\\u17BD\\u17C6\\u17C9-\\u17D3\\u17DD\\u180B-\\u180D\\u18A9\\u1920-\\u1922\\u1927\\u1928\\u1932\\u1939-\\u193B\\u1A17\\u1A18\\u1A56\\u1A58-\\u1A5E\\u1A60\\u1A62\\u1A65-\\u1A6C\\u1A73-\\u1A7C\\u1A7F\\u1B00-\\u1B03\\u1B34\\u1B36-\\u1B3A\\u1B3C\\u1B42\\u1B6B-\\u1B73\\u1B80\\u1B81\\u1BA2-\\u1BA5\\u1BA8\\u1BA9\\u1C2C-\\u1C33\\u1C36\\u1C37\\u1CD0-\\u1CD2\\u1CD4-\\u1CE0\\u1CE2-\\u1CE8\\u1CED\\u1DC0-\\u1DE6\\u1DFD-\\u1DFF\\u20D0-\\u20DC\\u20E1\\u20E5-\\u20F0\\u2CEF-\\u2CF1\\u2DE0-\\u2DFF\\u302A-\\u302F\\u3099\\u309A\\uA66F\\uA67C\\uA67D\\uA6F0\\uA6F1\\uA802\\uA806\\uA80B\\uA825\\uA826\\uA8C4\\uA8E0-\\uA8F1\\uA926-\\uA92D\\uA947-\\uA951\\uA980-\\uA982\\uA9B3\\uA9B6-\\uA9B9\\uA9BC\\uAA29-\\uAA2E\\uAA31\\uAA32\\uAA35\\uAA36\\uAA43\\uAA4C\\uAAB0\\uAAB2-\\uAAB4\\uAAB7\\uAAB8\\uAABE\\uAABF\\uAAC1\\uABE5\\uABE8\\uABED\\uFB1E\\uFE00-\\uFE0F\\uFE20-\\uFE26]"),
        space_combining_mark: new RegExp("[\\u0903\\u093E-\\u0940\\u0949-\\u094C\\u094E\\u0982\\u0983\\u09BE-\\u09C0\\u09C7\\u09C8\\u09CB\\u09CC\\u09D7\\u0A03\\u0A3E-\\u0A40\\u0A83\\u0ABE-\\u0AC0\\u0AC9\\u0ACB\\u0ACC\\u0B02\\u0B03\\u0B3E\\u0B40\\u0B47\\u0B48\\u0B4B\\u0B4C\\u0B57\\u0BBE\\u0BBF\\u0BC1\\u0BC2\\u0BC6-\\u0BC8\\u0BCA-\\u0BCC\\u0BD7\\u0C01-\\u0C03\\u0C41-\\u0C44\\u0C82\\u0C83\\u0CBE\\u0CC0-\\u0CC4\\u0CC7\\u0CC8\\u0CCA\\u0CCB\\u0CD5\\u0CD6\\u0D02\\u0D03\\u0D3E-\\u0D40\\u0D46-\\u0D48\\u0D4A-\\u0D4C\\u0D57\\u0D82\\u0D83\\u0DCF-\\u0DD1\\u0DD8-\\u0DDF\\u0DF2\\u0DF3\\u0F3E\\u0F3F\\u0F7F\\u102B\\u102C\\u1031\\u1038\\u103B\\u103C\\u1056\\u1057\\u1062-\\u1064\\u1067-\\u106D\\u1083\\u1084\\u1087-\\u108C\\u108F\\u109A-\\u109C\\u17B6\\u17BE-\\u17C5\\u17C7\\u17C8\\u1923-\\u1926\\u1929-\\u192B\\u1930\\u1931\\u1933-\\u1938\\u19B0-\\u19C0\\u19C8\\u19C9\\u1A19-\\u1A1B\\u1A55\\u1A57\\u1A61\\u1A63\\u1A64\\u1A6D-\\u1A72\\u1B04\\u1B35\\u1B3B\\u1B3D-\\u1B41\\u1B43\\u1B44\\u1B82\\u1BA1\\u1BA6\\u1BA7\\u1BAA\\u1C24-\\u1C2B\\u1C34\\u1C35\\u1CE1\\u1CF2\\uA823\\uA824\\uA827\\uA880\\uA881\\uA8B4-\\uA8C3\\uA952\\uA953\\uA983\\uA9B4\\uA9B5\\uA9BA\\uA9BB\\uA9BD-\\uA9C0\\uAA2F\\uAA30\\uAA33\\uAA34\\uAA4D\\uAA7B\\uABE3\\uABE4\\uABE6\\uABE7\\uABE9\\uABEA\\uABEC]"),
        connector_punctuation: new RegExp("[\\u005F\\u203F\\u2040\\u2054\\uFE33\\uFE34\\uFE4D-\\uFE4F\\uFF3F]")
    };
    function is_letter(code) {
        return code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 170 && UNICODE.letter.test(String.fromCharCode(code));
    }
    function is_digit(code) {
        return code >= 48 && code <= 57;
    }
    function is_alphanumeric_char(code) {
        return is_digit(code) || is_letter(code);
    }
    function is_unicode_combining_mark(ch) {
        return UNICODE.non_spacing_mark.test(ch) || UNICODE.space_combining_mark.test(ch);
    }
    function is_unicode_connector_punctuation(ch) {
        return UNICODE.connector_punctuation.test(ch);
    }
    function is_identifier(name) {
        return /^[a-z_$][a-z0-9_$]*$/i.test(name) && !RESERVED_WORDS(name);
    }
    function is_identifier_start(code) {
        return code == 36 || code == 95 || is_letter(code);
    }
    function is_identifier_char(ch) {
        var code = ch.charCodeAt(0);
        return is_identifier_start(code) || is_digit(code) || code == 8204 || code == 8205 || is_unicode_combining_mark(ch) || is_unicode_connector_punctuation(ch);
    }
    function parse_js_number(num) {
        if (RE_HEX_NUMBER.test(num)) {
            return parseInt(num.substr(2), 16);
        } else if (RE_OCT_NUMBER.test(num)) {
            return parseInt(num.substr(1), 8);
        } else if (RE_DEC_NUMBER.test(num)) {
            return parseFloat(num);
        }
    }
    function JS_Parse_Error(message, line, col, pos) {
        this.message = message;
        this.line = line;
        this.col = col;
        this.pos = pos;
        this.stack = new Error().stack;
    }
    JS_Parse_Error.prototype.toString = function() {
        return this.message + " (line: " + this.line + ", col: " + this.col + ", pos: " + this.pos + ")" + "\n\n" + this.stack;
    };
    function js_error(message, filename, line, col, pos) {
        AST_Node.warn("ERROR: {message} [{file}:{line},{col}]", {
            message: message,
            file: filename,
            line: line,
            col: col
        });
        throw new JS_Parse_Error(message, line, col, pos);
    }
    function is_token(token, type, val) {
        return token.type == type && (val == null || token.value == val);
    }
    var EX_EOF = {};
    function tokenizer($TEXT, filename) {
        var S = {
            text: $TEXT.replace(/\r\n?|[\n\u2028\u2029]/g, "\n").replace(/\uFEFF/g, ""),
            filename: filename,
            pos: 0,
            tokpos: 0,
            line: 1,
            tokline: 0,
            col: 0,
            tokcol: 0,
            newline_before: false,
            regex_allowed: false,
            comments_before: []
        };
        function peek() {
            return S.text.charAt(S.pos);
        }
        function next(signal_eof, in_string) {
            var ch = S.text.charAt(S.pos++);
            if (signal_eof && !ch) throw EX_EOF;
            if (ch == "\n") {
                S.newline_before = S.newline_before || !in_string;
                ++S.line;
                S.col = 0;
            } else {
                ++S.col;
            }
            return ch;
        }
        function find(what, signal_eof) {
            var pos = S.text.indexOf(what, S.pos);
            if (signal_eof && pos == -1) throw EX_EOF;
            return pos;
        }
        function start_token() {
            S.tokline = S.line;
            S.tokcol = S.col;
            S.tokpos = S.pos;
        }
        function token(type, value, is_comment) {
            S.regex_allowed = type == "operator" && !UNARY_POSTFIX[value] || type == "keyword" && KEYWORDS_BEFORE_EXPRESSION(value) || type == "punc" && PUNC_BEFORE_EXPRESSION(value);
            var ret = {
                type: type,
                value: value,
                line: S.tokline,
                col: S.tokcol,
                pos: S.tokpos,
                endpos: S.pos,
                nlb: S.newline_before,
                file: filename
            };
            if (!is_comment) {
                ret.comments_before = S.comments_before;
                S.comments_before = [];
                for (var i = 0, len = ret.comments_before.length; i < len; i++) {
                    ret.nlb = ret.nlb || ret.comments_before[i].nlb;
                }
            }
            S.newline_before = false;
            return new AST_Token(ret);
        }
        function skip_whitespace() {
            while (WHITESPACE_CHARS(peek())) next();
        }
        function read_while(pred) {
            var ret = "", ch, i = 0;
            while ((ch = peek()) && pred(ch, i++)) ret += next();
            return ret;
        }
        function parse_error(err) {
            js_error(err, filename, S.tokline, S.tokcol, S.tokpos);
        }
        function read_num(prefix) {
            var has_e = false, after_e = false, has_x = false, has_dot = prefix == ".";
            var num = read_while(function(ch, i) {
                var code = ch.charCodeAt(0);
                switch (code) {
                  case 120:
                  case 88:
                    return has_x ? false : has_x = true;

                  case 101:
                  case 69:
                    return has_x ? true : has_e ? false : has_e = after_e = true;

                  case 45:
                    return after_e || i == 0 && !prefix;

                  case 43:
                    return after_e;

                  case after_e = false, 46:
                    return !has_dot && !has_x && !has_e ? has_dot = true : false;
                }
                return is_alphanumeric_char(code);
            });
            if (prefix) num = prefix + num;
            var valid = parse_js_number(num);
            if (!isNaN(valid)) {
                return token("num", valid);
            } else {
                parse_error("Invalid syntax: " + num);
            }
        }
        function read_escaped_char(in_string) {
            var ch = next(true, in_string);
            switch (ch.charCodeAt(0)) {
              case 110:
                return "\n";

              case 114:
                return "\r";

              case 116:
                return "	";

              case 98:
                return "\b";

              case 118:
                return "";

              case 102:
                return "\f";

              case 48:
                return "\0";

              case 120:
                return String.fromCharCode(hex_bytes(2));

              case 117:
                return String.fromCharCode(hex_bytes(4));

              case 10:
                return "";

              default:
                return ch;
            }
        }
        function hex_bytes(n) {
            var num = 0;
            for (;n > 0; --n) {
                var digit = parseInt(next(true), 16);
                if (isNaN(digit)) parse_error("Invalid hex-character pattern in string");
                num = num << 4 | digit;
            }
            return num;
        }
        var read_string = with_eof_error("Unterminated string constant", function() {
            var quote = next(), ret = "";
            for (;;) {
                var ch = next(true);
                if (ch == "\\") {
                    var octal_len = 0, first = null;
                    ch = read_while(function(ch) {
                        if (ch >= "0" && ch <= "7") {
                            if (!first) {
                                first = ch;
                                return ++octal_len;
                            } else if (first <= "3" && octal_len <= 2) return ++octal_len; else if (first >= "4" && octal_len <= 1) return ++octal_len;
                        }
                        return false;
                    });
                    if (octal_len > 0) ch = String.fromCharCode(parseInt(ch, 8)); else ch = read_escaped_char(true);
                } else if (ch == quote) break;
                ret += ch;
            }
            return token("string", ret);
        });
        function read_line_comment() {
            next();
            var i = find("\n"), ret;
            if (i == -1) {
                ret = S.text.substr(S.pos);
                S.pos = S.text.length;
            } else {
                ret = S.text.substring(S.pos, i);
                S.pos = i;
            }
            return token("comment1", ret, true);
        }
        var read_multiline_comment = with_eof_error("Unterminated multiline comment", function() {
            next();
            var i = find("*/", true);
            var text = S.text.substring(S.pos, i);
            var a = text.split("\n"), n = a.length;
            S.pos = i + 2;
            S.line += n - 1;
            if (n > 1) S.col = a[n - 1].length; else S.col += a[n - 1].length;
            S.col += 2;
            S.newline_before = S.newline_before || text.indexOf("\n") >= 0;
            return token("comment2", text, true);
        });
        function read_name() {
            var backslash = false, name = "", ch, escaped = false, hex;
            while ((ch = peek()) != null) {
                if (!backslash) {
                    if (ch == "\\") escaped = backslash = true, next(); else if (is_identifier_char(ch)) name += next(); else break;
                } else {
                    if (ch != "u") parse_error("Expecting UnicodeEscapeSequence -- uXXXX");
                    ch = read_escaped_char();
                    if (!is_identifier_char(ch)) parse_error("Unicode char: " + ch.charCodeAt(0) + " is not valid in identifier");
                    name += ch;
                    backslash = false;
                }
            }
            if (KEYWORDS(name) && escaped) {
                hex = name.charCodeAt(0).toString(16).toUpperCase();
                name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
            }
            return name;
        }
        var read_regexp = with_eof_error("Unterminated regular expression", function(regexp) {
            var prev_backslash = false, ch, in_class = false;
            while (ch = next(true)) if (prev_backslash) {
                regexp += "\\" + ch;
                prev_backslash = false;
            } else if (ch == "[") {
                in_class = true;
                regexp += ch;
            } else if (ch == "]" && in_class) {
                in_class = false;
                regexp += ch;
            } else if (ch == "/" && !in_class) {
                break;
            } else if (ch == "\\") {
                prev_backslash = true;
            } else {
                regexp += ch;
            }
            var mods = read_name();
            return token("regexp", new RegExp(regexp, mods));
        });
        function read_operator(prefix) {
            function grow(op) {
                if (!peek()) return op;
                var bigger = op + peek();
                if (OPERATORS(bigger)) {
                    next();
                    return grow(bigger);
                } else {
                    return op;
                }
            }
            return token("operator", grow(prefix || next()));
        }
        function handle_slash() {
            next();
            var regex_allowed = S.regex_allowed;
            switch (peek()) {
              case "/":
                S.comments_before.push(read_line_comment());
                S.regex_allowed = regex_allowed;
                return next_token();

              case "*":
                S.comments_before.push(read_multiline_comment());
                S.regex_allowed = regex_allowed;
                return next_token();
            }
            return S.regex_allowed ? read_regexp("") : read_operator("/");
        }
        function handle_dot() {
            next();
            return is_digit(peek().charCodeAt(0)) ? read_num(".") : token("punc", ".");
        }
        function read_word() {
            var word = read_name();
            return KEYWORDS_ATOM(word) ? token("atom", word) : !KEYWORDS(word) ? token("name", word) : OPERATORS(word) ? token("operator", word) : token("keyword", word);
        }
        function with_eof_error(eof_error, cont) {
            return function(x) {
                try {
                    return cont(x);
                } catch (ex) {
                    if (ex === EX_EOF) parse_error(eof_error); else throw ex;
                }
            };
        }
        function next_token(force_regexp) {
            if (force_regexp != null) return read_regexp(force_regexp);
            skip_whitespace();
            start_token();
            var ch = peek();
            if (!ch) return token("eof");
            var code = ch.charCodeAt(0);
            switch (code) {
              case 34:
              case 39:
                return read_string();

              case 46:
                return handle_dot();

              case 47:
                return handle_slash();
            }
            if (is_digit(code)) return read_num();
            if (PUNC_CHARS(ch)) return token("punc", next());
            if (OPERATOR_CHARS(ch)) return read_operator();
            if (code == 92 || is_identifier_start(code)) return read_word();
            parse_error("Unexpected character '" + ch + "'");
        }
        next_token.context = function(nc) {
            if (nc) S = nc;
            return S;
        };
        return next_token;
    }
    var UNARY_PREFIX = makePredicate([ "typeof", "void", "delete", "--", "++", "!", "~", "-", "+" ]);
    var UNARY_POSTFIX = makePredicate([ "--", "++" ]);
    var ASSIGNMENT = makePredicate([ "=", "+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]);
    var PRECEDENCE = function(a, ret) {
        for (var i = 0, n = 1; i < a.length; ++i, ++n) {
            var b = a[i];
            for (var j = 0; j < b.length; ++j) {
                ret[b[j]] = n;
            }
        }
        return ret;
    }([ [ "||" ], [ "&&" ], [ "|" ], [ "^" ], [ "&" ], [ "==", "===", "!=", "!==" ], [ "<", ">", "<=", ">=", "in", "instanceof" ], [ ">>", "<<", ">>>" ], [ "+", "-" ], [ "*", "/", "%" ] ], {});
    var STATEMENTS_WITH_LABELS = array_to_hash([ "for", "do", "while", "switch" ]);
    var ATOMIC_START_TOKEN = array_to_hash([ "atom", "num", "string", "regexp", "name" ]);
    function parse($TEXT, options) {
        options = defaults(options, {
            strict: false,
            filename: null,
            toplevel: null
        });
        var S = {
            input: typeof $TEXT == "string" ? tokenizer($TEXT, options.filename) : $TEXT,
            token: null,
            prev: null,
            peeked: null,
            in_function: 0,
            in_directives: true,
            in_loop: 0,
            labels: []
        };
        S.token = next();
        function is(type, value) {
            return is_token(S.token, type, value);
        }
        function peek() {
            return S.peeked || (S.peeked = S.input());
        }
        function next() {
            S.prev = S.token;
            if (S.peeked) {
                S.token = S.peeked;
                S.peeked = null;
            } else {
                S.token = S.input();
            }
            S.in_directives = S.in_directives && (S.token.type == "string" || is("punc", ";"));
            return S.token;
        }
        function prev() {
            return S.prev;
        }
        function croak(msg, line, col, pos) {
            var ctx = S.input.context();
            js_error(msg, ctx.filename, line != null ? line : ctx.tokline, col != null ? col : ctx.tokcol, pos != null ? pos : ctx.tokpos);
        }
        function token_error(token, msg) {
            croak(msg, token.line, token.col);
        }
        function unexpected(token) {
            if (token == null) token = S.token;
            token_error(token, "Unexpected token: " + token.type + " (" + token.value + ")");
        }
        function expect_token(type, val) {
            if (is(type, val)) {
                return next();
            }
            token_error(S.token, "Unexpected token " + S.token.type + " «" + S.token.value + "»" + ", expected " + type + " «" + val + "»");
        }
        function expect(punc) {
            return expect_token("punc", punc);
        }
        function can_insert_semicolon() {
            return !options.strict && (S.token.nlb || is("eof") || is("punc", "}"));
        }
        function semicolon() {
            if (is("punc", ";")) next(); else if (!can_insert_semicolon()) unexpected();
        }
        function parenthesised() {
            expect("(");
            var exp = expression(true);
            expect(")");
            return exp;
        }
        function embed_tokens(parser) {
            return function() {
                var start = S.token;
                var expr = parser();
                var end = prev();
                expr.start = start;
                expr.end = end;
                return expr;
            };
        }
        var statement = embed_tokens(function() {
            var tmp;
            if (is("operator", "/") || is("operator", "/=")) {
                S.peeked = null;
                S.token = S.input(S.token.value.substr(1));
            }
            switch (S.token.type) {
              case "string":
                var dir = S.in_directives, stat = simple_statement();
                if (dir && stat.body instanceof AST_String && !is("punc", ",")) return new AST_Directive({
                    value: stat.body.value
                });
                return stat;

              case "num":
              case "regexp":
              case "operator":
              case "atom":
                return simple_statement();

              case "name":
                return is_token(peek(), "punc", ":") ? labeled_statement() : simple_statement();

              case "punc":
                switch (S.token.value) {
                  case "{":
                    return new AST_BlockStatement({
                        start: S.token,
                        body: block_(),
                        end: prev()
                    });

                  case "[":
                  case "(":
                    return simple_statement();

                  case ";":
                    next();
                    return new AST_EmptyStatement();

                  default:
                    unexpected();
                }

              case "keyword":
                switch (tmp = S.token.value, next(), tmp) {
                  case "break":
                    return break_cont(AST_Break);

                  case "continue":
                    return break_cont(AST_Continue);

                  case "debugger":
                    semicolon();
                    return new AST_Debugger();

                  case "do":
                    return new AST_Do({
                        body: in_loop(statement),
                        condition: (expect_token("keyword", "while"), tmp = parenthesised(), semicolon(),
                        tmp)
                    });

                  case "while":
                    return new AST_While({
                        condition: parenthesised(),
                        body: in_loop(statement)
                    });

                  case "for":
                    return for_();

                  case "function":
                    return function_(true);

                  case "if":
                    return if_();

                  case "return":
                    if (S.in_function == 0) croak("'return' outside of function");
                    return new AST_Return({
                        value: is("punc", ";") ? (next(), null) : can_insert_semicolon() ? null : (tmp = expression(true),
                        semicolon(), tmp)
                    });

                  case "switch":
                    return new AST_Switch({
                        expression: parenthesised(),
                        body: in_loop(switch_body_)
                    });

                  case "throw":
                    if (S.token.nlb) croak("Illegal newline after 'throw'");
                    return new AST_Throw({
                        value: (tmp = expression(true), semicolon(), tmp)
                    });

                  case "try":
                    return try_();

                  case "var":
                    return tmp = var_(), semicolon(), tmp;

                  case "const":
                    return tmp = const_(), semicolon(), tmp;

                  case "with":
                    return new AST_With({
                        expression: parenthesised(),
                        body: statement()
                    });

                  default:
                    unexpected();
                }
            }
        });
        function labeled_statement() {
            var label = as_symbol(AST_Label);
            if (find_if(function(l) {
                return l.name == label.name;
            }, S.labels)) {
                croak("Label " + label.name + " defined twice");
            }
            expect(":");
            S.labels.push(label);
            var stat = statement();
            S.labels.pop();
            return new AST_LabeledStatement({
                body: stat,
                label: label
            });
        }
        function simple_statement(tmp) {
            return new AST_SimpleStatement({
                body: (tmp = expression(true), semicolon(), tmp)
            });
        }
        function break_cont(type) {
            var label = null;
            if (!can_insert_semicolon()) {
                label = as_symbol(AST_LabelRef, true);
            }
            if (label != null) {
                if (!find_if(function(l) {
                    return l.name == label.name;
                }, S.labels)) croak("Undefined label " + label.name);
            } else if (S.in_loop == 0) croak(type.TYPE + " not inside a loop or switch");
            semicolon();
            return new type({
                label: label
            });
        }
        function for_() {
            expect("(");
            var init = null;
            if (!is("punc", ";")) {
                init = is("keyword", "var") ? (next(), var_(true)) : expression(true, true);
                if (is("operator", "in")) {
                    if (init instanceof AST_Var && init.definitions.length > 1) croak("Only one variable declaration allowed in for..in loop");
                    next();
                    return for_in(init);
                }
            }
            return regular_for(init);
        }
        function regular_for(init) {
            expect(";");
            var test = is("punc", ";") ? null : expression(true);
            expect(";");
            var step = is("punc", ")") ? null : expression(true);
            expect(")");
            return new AST_For({
                init: init,
                condition: test,
                step: step,
                body: in_loop(statement)
            });
        }
        function for_in(init) {
            var lhs = init instanceof AST_Var ? init.definitions[0].name : null;
            var obj = expression(true);
            expect(")");
            return new AST_ForIn({
                init: init,
                name: lhs,
                object: obj,
                body: in_loop(statement)
            });
        }
        var function_ = function(in_statement, ctor) {
            var is_accessor = ctor === AST_Accessor;
            var name = is("name") ? as_symbol(in_statement ? AST_SymbolDefun : is_accessor ? AST_SymbolAccessor : AST_SymbolLambda) : is_accessor && (is("string") || is("num")) ? as_atom_node() : null;
            if (in_statement && !name) unexpected();
            expect("(");
            if (!ctor) ctor = in_statement ? AST_Defun : AST_Function;
            return new ctor({
                name: name,
                argnames: function(first, a) {
                    while (!is("punc", ")")) {
                        if (first) first = false; else expect(",");
                        a.push(as_symbol(AST_SymbolFunarg));
                    }
                    next();
                    return a;
                }(true, []),
                body: function(loop, labels) {
                    ++S.in_function;
                    S.in_directives = true;
                    S.in_loop = 0;
                    S.labels = [];
                    var a = block_();
                    --S.in_function;
                    S.in_loop = loop;
                    S.labels = labels;
                    return a;
                }(S.in_loop, S.labels)
            });
        };
        function if_() {
            var cond = parenthesised(), body = statement(), belse = null;
            if (is("keyword", "else")) {
                next();
                belse = statement();
            }
            return new AST_If({
                condition: cond,
                body: body,
                alternative: belse
            });
        }
        function block_() {
            expect("{");
            var a = [];
            while (!is("punc", "}")) {
                if (is("eof")) unexpected();
                a.push(statement());
            }
            next();
            return a;
        }
        function switch_body_() {
            expect("{");
            var a = [], cur = null, branch = null, tmp;
            while (!is("punc", "}")) {
                if (is("eof")) unexpected();
                if (is("keyword", "case")) {
                    if (branch) branch.end = prev();
                    cur = [];
                    branch = new AST_Case({
                        start: (tmp = S.token, next(), tmp),
                        expression: expression(true),
                        body: cur
                    });
                    a.push(branch);
                    expect(":");
                } else if (is("keyword", "default")) {
                    if (branch) branch.end = prev();
                    cur = [];
                    branch = new AST_Default({
                        start: (tmp = S.token, next(), expect(":"), tmp),
                        body: cur
                    });
                    a.push(branch);
                } else {
                    if (!cur) unexpected();
                    cur.push(statement());
                }
            }
            if (branch) branch.end = prev();
            next();
            return a;
        }
        function try_() {
            var body = block_(), bcatch = null, bfinally = null;
            if (is("keyword", "catch")) {
                var start = S.token;
                next();
                expect("(");
                var name = as_symbol(AST_SymbolCatch);
                expect(")");
                bcatch = new AST_Catch({
                    start: start,
                    argname: name,
                    body: block_(),
                    end: prev()
                });
            }
            if (is("keyword", "finally")) {
                var start = S.token;
                next();
                bfinally = new AST_Finally({
                    start: start,
                    body: block_(),
                    end: prev()
                });
            }
            if (!bcatch && !bfinally) croak("Missing catch/finally blocks");
            return new AST_Try({
                body: body,
                bcatch: bcatch,
                bfinally: bfinally
            });
        }
        function vardefs(no_in, in_const) {
            var a = [];
            for (;;) {
                a.push(new AST_VarDef({
                    start: S.token,
                    name: as_symbol(in_const ? AST_SymbolConst : AST_SymbolVar),
                    value: is("operator", "=") ? (next(), expression(false, no_in)) : null,
                    end: prev()
                }));
                if (!is("punc", ",")) break;
                next();
            }
            return a;
        }
        var var_ = function(no_in) {
            return new AST_Var({
                start: prev(),
                definitions: vardefs(no_in, false),
                end: prev()
            });
        };
        var const_ = function() {
            return new AST_Const({
                start: prev(),
                definitions: vardefs(false, true),
                end: prev()
            });
        };
        var new_ = function() {
            var start = S.token;
            expect_token("operator", "new");
            var newexp = expr_atom(false), args;
            if (is("punc", "(")) {
                next();
                args = expr_list(")");
            } else {
                args = [];
            }
            return subscripts(new AST_New({
                start: start,
                expression: newexp,
                args: args,
                end: prev()
            }), true);
        };
        function as_atom_node() {
            var tok = S.token, ret;
            switch (tok.type) {
              case "name":
                return as_symbol(AST_SymbolRef);

              case "num":
                ret = new AST_Number({
                    start: tok,
                    end: tok,
                    value: tok.value
                });
                break;

              case "string":
                ret = new AST_String({
                    start: tok,
                    end: tok,
                    value: tok.value
                });
                break;

              case "regexp":
                ret = new AST_RegExp({
                    start: tok,
                    end: tok,
                    value: tok.value
                });
                break;

              case "atom":
                switch (tok.value) {
                  case "false":
                    ret = new AST_False({
                        start: tok,
                        end: tok
                    });
                    break;

                  case "true":
                    ret = new AST_True({
                        start: tok,
                        end: tok
                    });
                    break;

                  case "null":
                    ret = new AST_Null({
                        start: tok,
                        end: tok
                    });
                    break;
                }
                break;
            }
            next();
            return ret;
        }
        var expr_atom = function(allow_calls) {
            if (is("operator", "new")) {
                return new_();
            }
            var start = S.token;
            if (is("punc")) {
                switch (start.value) {
                  case "(":
                    next();
                    var ex = expression(true);
                    ex.start = start;
                    ex.end = S.token;
                    expect(")");
                    return subscripts(ex, allow_calls);

                  case "[":
                    return subscripts(array_(), allow_calls);

                  case "{":
                    return subscripts(object_(), allow_calls);
                }
                unexpected();
            }
            if (is("keyword", "function")) {
                next();
                var func = function_(false);
                func.start = start;
                func.end = prev();
                return subscripts(func, allow_calls);
            }
            if (ATOMIC_START_TOKEN[S.token.type]) {
                return subscripts(as_atom_node(), allow_calls);
            }
            unexpected();
        };
        function expr_list(closing, allow_trailing_comma, allow_empty) {
            var first = true, a = [];
            while (!is("punc", closing)) {
                if (first) first = false; else expect(",");
                if (allow_trailing_comma && is("punc", closing)) break;
                if (is("punc", ",") && allow_empty) {
                    a.push(new AST_Undefined({
                        start: S.token,
                        end: S.token
                    }));
                } else {
                    a.push(expression(false));
                }
            }
            next();
            return a;
        }
        var array_ = embed_tokens(function() {
            expect("[");
            return new AST_Array({
                elements: expr_list("]", !options.strict, true)
            });
        });
        var object_ = embed_tokens(function() {
            expect("{");
            var first = true, a = [];
            while (!is("punc", "}")) {
                if (first) first = false; else expect(",");
                if (!options.strict && is("punc", "}")) break;
                var start = S.token;
                var type = start.type;
                var name = as_property_name();
                if (type == "name" && !is("punc", ":")) {
                    if (name == "get") {
                        a.push(new AST_ObjectGetter({
                            start: start,
                            key: name,
                            value: function_(false, AST_Accessor),
                            end: prev()
                        }));
                        continue;
                    }
                    if (name == "set") {
                        a.push(new AST_ObjectSetter({
                            start: start,
                            key: name,
                            value: function_(false, AST_Accessor),
                            end: prev()
                        }));
                        continue;
                    }
                }
                expect(":");
                a.push(new AST_ObjectKeyVal({
                    start: start,
                    key: name,
                    value: expression(false),
                    end: prev()
                }));
            }
            next();
            return new AST_Object({
                properties: a
            });
        });
        function as_property_name() {
            var tmp = S.token;
            next();
            switch (tmp.type) {
              case "num":
              case "string":
              case "name":
              case "operator":
              case "keyword":
              case "atom":
                return tmp.value;

              default:
                unexpected();
            }
        }
        function as_name() {
            var tmp = S.token;
            next();
            switch (tmp.type) {
              case "name":
              case "operator":
              case "keyword":
              case "atom":
                return tmp.value;

              default:
                unexpected();
            }
        }
        function as_symbol(type, noerror) {
            if (!is("name")) {
                if (!noerror) croak("Name expected");
                return null;
            }
            var name = S.token.value;
            var sym = new (name == "this" ? AST_This : type)({
                name: String(S.token.value),
                start: S.token,
                end: S.token
            });
            next();
            return sym;
        }
        var subscripts = function(expr, allow_calls) {
            var start = expr.start;
            if (is("punc", ".")) {
                next();
                return subscripts(new AST_Dot({
                    start: start,
                    expression: expr,
                    property: as_name(),
                    end: prev()
                }), allow_calls);
            }
            if (is("punc", "[")) {
                next();
                var prop = expression(true);
                expect("]");
                return subscripts(new AST_Sub({
                    start: start,
                    expression: expr,
                    property: prop,
                    end: prev()
                }), allow_calls);
            }
            if (allow_calls && is("punc", "(")) {
                next();
                return subscripts(new AST_Call({
                    start: start,
                    expression: expr,
                    args: expr_list(")"),
                    end: prev()
                }), true);
            }
            return expr;
        };
        var maybe_unary = function(allow_calls) {
            var start = S.token;
            if (is("operator") && UNARY_PREFIX(start.value)) {
                next();
                var ex = make_unary(AST_UnaryPrefix, start.value, maybe_unary(allow_calls));
                ex.start = start;
                ex.end = prev();
                return ex;
            }
            var val = expr_atom(allow_calls);
            while (is("operator") && UNARY_POSTFIX(S.token.value) && !S.token.nlb) {
                val = make_unary(AST_UnaryPostfix, S.token.value, val);
                val.start = start;
                val.end = S.token;
                next();
            }
            return val;
        };
        function make_unary(ctor, op, expr) {
            if ((op == "++" || op == "--") && !is_assignable(expr)) croak("Invalid use of " + op + " operator");
            return new ctor({
                operator: op,
                expression: expr
            });
        }
        var expr_op = function(left, min_prec, no_in) {
            var op = is("operator") ? S.token.value : null;
            if (op == "in" && no_in) op = null;
            var prec = op != null ? PRECEDENCE[op] : null;
            if (prec != null && prec > min_prec) {
                next();
                var right = expr_op(maybe_unary(true), prec, no_in);
                return expr_op(new AST_Binary({
                    start: left.start,
                    left: left,
                    operator: op,
                    right: right,
                    end: right.end
                }), min_prec, no_in);
            }
            return left;
        };
        function expr_ops(no_in) {
            return expr_op(maybe_unary(true), 0, no_in);
        }
        var maybe_conditional = function(no_in) {
            var start = S.token;
            var expr = expr_ops(no_in);
            if (is("operator", "?")) {
                next();
                var yes = expression(false);
                expect(":");
                return new AST_Conditional({
                    start: start,
                    condition: expr,
                    consequent: yes,
                    alternative: expression(false, no_in),
                    end: peek()
                });
            }
            return expr;
        };
        function is_assignable(expr) {
            if (!options.strict) return true;
            switch (expr[0] + "") {
              case "dot":
              case "sub":
              case "new":
              case "call":
                return true;

              case "name":
                return expr[1] != "this";
            }
        }
        var maybe_assign = function(no_in) {
            var start = S.token;
            var left = maybe_conditional(no_in), val = S.token.value;
            if (is("operator") && ASSIGNMENT(val)) {
                if (is_assignable(left)) {
                    next();
                    return new AST_Assign({
                        start: start,
                        left: left,
                        operator: val,
                        right: maybe_assign(no_in),
                        end: peek()
                    });
                }
                croak("Invalid assignment");
            }
            return left;
        };
        var expression = function(commas, no_in) {
            var start = S.token;
            var expr = maybe_assign(no_in);
            if (commas && is("punc", ",")) {
                next();
                return new AST_Seq({
                    start: start,
                    car: expr,
                    cdr: expression(true, no_in),
                    end: peek()
                });
            }
            return expr;
        };
        function in_loop(cont) {
            ++S.in_loop;
            var ret = cont();
            --S.in_loop;
            return ret;
        }
        return function() {
            var start = S.token;
            var body = [];
            while (!is("eof")) body.push(statement());
            var end = prev();
            var toplevel = options.toplevel;
            if (toplevel) {
                toplevel.body = toplevel.body.concat(body);
                toplevel.end = end;
            } else {
                toplevel = new AST_Toplevel({
                    start: start,
                    body: body,
                    end: end
                });
            }
            return toplevel;
        }();
    }
    "use strict";
    function TreeTransformer(before, after) {
        TreeWalker.call(this);
        this.before = before;
        this.after = after;
    }
    TreeTransformer.prototype = new TreeWalker();
    (function(undefined) {
        function _(node, descend) {
            node.DEFMETHOD("transform", function(tw, in_list) {
                var x, y;
                tw.push(this);
                if (tw.before) x = tw.before(this, descend, in_list);
                if (x === undefined) {
                    if (!tw.after) {
                        x = this;
                        descend(x, tw);
                    } else {
                        tw.stack[tw.stack.length - 1] = x = this.clone();
                        descend(x, tw);
                        y = tw.after(x, in_list);
                        if (y !== undefined) x = y;
                    }
                }
                tw.pop();
                return x;
            });
        }
        function do_list(list, tw) {
            return MAP(list, function(node) {
                return node.transform(tw, true);
            });
        }
        _(AST_Node, noop);
        _(AST_LabeledStatement, function(self, tw) {
            self.label = self.label.transform(tw);
            self.body = self.body.transform(tw);
        });
        _(AST_SimpleStatement, function(self, tw) {
            self.body = self.body.transform(tw);
        });
        _(AST_Block, function(self, tw) {
            self.body = do_list(self.body, tw);
        });
        _(AST_DWLoop, function(self, tw) {
            self.condition = self.condition.transform(tw);
            self.body = self.body.transform(tw);
        });
        _(AST_For, function(self, tw) {
            if (self.init) self.init = self.init.transform(tw);
            if (self.condition) self.condition = self.condition.transform(tw);
            if (self.step) self.step = self.step.transform(tw);
            self.body = self.body.transform(tw);
        });
        _(AST_ForIn, function(self, tw) {
            self.init = self.init.transform(tw);
            self.object = self.object.transform(tw);
            self.body = self.body.transform(tw);
        });
        _(AST_With, function(self, tw) {
            self.expression = self.expression.transform(tw);
            self.body = self.body.transform(tw);
        });
        _(AST_Exit, function(self, tw) {
            if (self.value) self.value = self.value.transform(tw);
        });
        _(AST_LoopControl, function(self, tw) {
            if (self.label) self.label = self.label.transform(tw);
        });
        _(AST_If, function(self, tw) {
            self.condition = self.condition.transform(tw);
            self.body = self.body.transform(tw);
            if (self.alternative) self.alternative = self.alternative.transform(tw);
        });
        _(AST_Switch, function(self, tw) {
            self.expression = self.expression.transform(tw);
            self.body = do_list(self.body, tw);
        });
        _(AST_Case, function(self, tw) {
            self.expression = self.expression.transform(tw);
            self.body = do_list(self.body, tw);
        });
        _(AST_Try, function(self, tw) {
            self.body = do_list(self.body, tw);
            if (self.bcatch) self.bcatch = self.bcatch.transform(tw);
            if (self.bfinally) self.bfinally = self.bfinally.transform(tw);
        });
        _(AST_Catch, function(self, tw) {
            self.argname = self.argname.transform(tw);
            self.body = do_list(self.body, tw);
        });
        _(AST_Definitions, function(self, tw) {
            self.definitions = do_list(self.definitions, tw);
        });
        _(AST_VarDef, function(self, tw) {
            if (self.value) self.value = self.value.transform(tw);
        });
        _(AST_Lambda, function(self, tw) {
            if (self.name) self.name = self.name.transform(tw);
            self.argnames = do_list(self.argnames, tw);
            self.body = do_list(self.body, tw);
        });
        _(AST_Call, function(self, tw) {
            self.expression = self.expression.transform(tw);
            self.args = do_list(self.args, tw);
        });
        _(AST_Seq, function(self, tw) {
            self.car = self.car.transform(tw);
            self.cdr = self.cdr.transform(tw);
        });
        _(AST_Dot, function(self, tw) {
            self.expression = self.expression.transform(tw);
        });
        _(AST_Sub, function(self, tw) {
            self.expression = self.expression.transform(tw);
            self.property = self.property.transform(tw);
        });
        _(AST_Unary, function(self, tw) {
            self.expression = self.expression.transform(tw);
        });
        _(AST_Binary, function(self, tw) {
            self.left = self.left.transform(tw);
            self.right = self.right.transform(tw);
        });
        _(AST_Conditional, function(self, tw) {
            self.condition = self.condition.transform(tw);
            self.consequent = self.consequent.transform(tw);
            self.alternative = self.alternative.transform(tw);
        });
        _(AST_Array, function(self, tw) {
            self.elements = do_list(self.elements, tw);
        });
        _(AST_Object, function(self, tw) {
            self.properties = do_list(self.properties, tw);
        });
        _(AST_ObjectProperty, function(self, tw) {
            self.value = self.value.transform(tw);
        });
    })();
    "use strict";
    function SymbolDef(scope, index, orig) {
        this.name = orig.name;
        this.orig = [ orig ];
        this.scope = scope;
        this.references = [];
        this.global = false;
        this.mangled_name = null;
        this.undeclared = false;
        this.constant = false;
        this.index = index;
    }
    SymbolDef.prototype = {
        unmangleable: function(options) {
            return this.global || this.undeclared || !(options && options.eval) && (this.scope.uses_eval || this.scope.uses_with);
        },
        mangle: function(options) {
            if (!this.mangled_name && !this.unmangleable(options)) this.mangled_name = this.scope.next_mangled(options);
        }
    };
    AST_Toplevel.DEFMETHOD("figure_out_scope", function() {
        var self = this;
        var scope = self.parent_scope = null;
        var labels = new Dictionary();
        var nesting = 0;
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Scope) {
                node.init_scope_vars(nesting);
                var save_scope = node.parent_scope = scope;
                var save_labels = labels;
                ++nesting;
                scope = node;
                labels = new Dictionary();
                descend();
                labels = save_labels;
                scope = save_scope;
                --nesting;
                return true;
            }
            if (node instanceof AST_Directive) {
                node.scope = scope;
                push_uniq(scope.directives, node.value);
                return true;
            }
            if (node instanceof AST_With) {
                for (var s = scope; s; s = s.parent_scope) s.uses_with = true;
                return;
            }
            if (node instanceof AST_LabeledStatement) {
                var l = node.label;
                if (labels.has(l.name)) throw new Error(string_template("Label {name} defined twice", l));
                labels.set(l.name, l);
                descend();
                labels.del(l.name);
                return true;
            }
            if (node instanceof AST_Symbol) {
                node.scope = scope;
            }
            if (node instanceof AST_Label) {
                node.thedef = node;
                node.init_scope_vars();
            }
            if (node instanceof AST_SymbolLambda) {
                (node.scope = scope.parent_scope).def_function(node);
            } else if (node instanceof AST_SymbolDefun) {
                (node.scope = scope.parent_scope).def_function(node);
            } else if (node instanceof AST_SymbolVar || node instanceof AST_SymbolConst) {
                var def = scope.def_variable(node);
                def.constant = node instanceof AST_SymbolConst;
                def = tw.parent();
            } else if (node instanceof AST_SymbolCatch) {
                scope.def_variable(node);
            }
            if (node instanceof AST_LabelRef) {
                var sym = labels.get(node.name);
                if (!sym) throw new Error(string_template("Undefined label {name} [{line},{col}]", {
                    name: node.name,
                    line: node.start.line,
                    col: node.start.col
                }));
                node.thedef = sym;
            }
        });
        self.walk(tw);
        var func = null;
        var globals = self.globals = new Dictionary();
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Lambda) {
                var prev_func = func;
                func = node;
                descend();
                func = prev_func;
                return true;
            }
            if (node instanceof AST_LabelRef) {
                node.reference();
                return true;
            }
            if (node instanceof AST_SymbolRef) {
                var name = node.name;
                var sym = node.scope.find_variable(name);
                if (!sym) {
                    var g;
                    if (globals.has(name)) {
                        g = globals.get(name);
                    } else {
                        g = new SymbolDef(self, globals.size(), node);
                        g.undeclared = true;
                        globals.set(name, g);
                    }
                    node.thedef = g;
                    if (name == "eval" && tw.parent() instanceof AST_Call) {
                        for (var s = node.scope; s && !s.uses_eval; s = s.parent_scope) s.uses_eval = true;
                    }
                    if (name == "arguments") {
                        func.uses_arguments = true;
                    }
                } else {
                    node.thedef = sym;
                }
                node.reference();
                return true;
            }
        });
        self.walk(tw);
    });
    AST_Scope.DEFMETHOD("init_scope_vars", function(nesting) {
        this.directives = [];
        this.variables = new Dictionary();
        this.functions = new Dictionary();
        this.uses_with = false;
        this.uses_eval = false;
        this.parent_scope = null;
        this.enclosed = [];
        this.cname = -1;
        this.nesting = nesting;
    });
    AST_Scope.DEFMETHOD("strict", function() {
        return this.has_directive("use strict");
    });
    AST_Lambda.DEFMETHOD("init_scope_vars", function() {
        AST_Scope.prototype.init_scope_vars.apply(this, arguments);
        this.uses_arguments = false;
    });
    AST_SymbolRef.DEFMETHOD("reference", function() {
        var def = this.definition();
        def.references.push(this);
        var s = this.scope;
        while (s) {
            push_uniq(s.enclosed, def);
            if (s === def.scope) break;
            s = s.parent_scope;
        }
        this.frame = this.scope.nesting - def.scope.nesting;
    });
    AST_Label.DEFMETHOD("init_scope_vars", function() {
        this.references = [];
    });
    AST_LabelRef.DEFMETHOD("reference", function() {
        this.thedef.references.push(this);
    });
    AST_Scope.DEFMETHOD("find_variable", function(name) {
        if (name instanceof AST_Symbol) name = name.name;
        return this.variables.get(name) || this.parent_scope && this.parent_scope.find_variable(name);
    });
    AST_Scope.DEFMETHOD("has_directive", function(value) {
        return this.parent_scope && this.parent_scope.has_directive(value) || (this.directives.indexOf(value) >= 0 ? this : null);
    });
    AST_Scope.DEFMETHOD("def_function", function(symbol) {
        this.functions.set(symbol.name, this.def_variable(symbol));
    });
    AST_Scope.DEFMETHOD("def_variable", function(symbol) {
        var def;
        if (!this.variables.has(symbol.name)) {
            def = new SymbolDef(this, this.variables.size(), symbol);
            this.variables.set(symbol.name, def);
            def.global = !this.parent_scope;
        } else {
            def = this.variables.get(symbol.name);
            def.orig.push(symbol);
        }
        return symbol.thedef = def;
    });
    AST_Scope.DEFMETHOD("next_mangled", function(options) {
        var ext = this.enclosed, n = ext.length;
        out: while (true) {
            var m = base54(++this.cname);
            if (!is_identifier(m)) continue;
            for (var i = n; --i >= 0; ) {
                var sym = ext[i];
                var name = sym.mangled_name || sym.unmangleable(options) && sym.name;
                if (m == name) continue out;
            }
            return m;
        }
    });
    AST_Scope.DEFMETHOD("references", function(sym) {
        if (sym instanceof AST_Symbol) sym = sym.definition();
        return this.enclosed.indexOf(sym) < 0 ? null : sym;
    });
    AST_Symbol.DEFMETHOD("unmangleable", function(options) {
        return this.definition().unmangleable(options);
    });
    AST_SymbolAccessor.DEFMETHOD("unmangleable", function() {
        return true;
    });
    AST_Label.DEFMETHOD("unmangleable", function() {
        return false;
    });
    AST_Symbol.DEFMETHOD("unreferenced", function() {
        return this.definition().references.length == 0 && !(this.scope.uses_eval || this.scope.uses_with);
    });
    AST_Symbol.DEFMETHOD("undeclared", function() {
        return this.definition().undeclared;
    });
    AST_LabelRef.DEFMETHOD("undeclared", function() {
        return false;
    });
    AST_Label.DEFMETHOD("undeclared", function() {
        return false;
    });
    AST_Symbol.DEFMETHOD("definition", function() {
        return this.thedef;
    });
    AST_Symbol.DEFMETHOD("global", function() {
        return this.definition().global;
    });
    AST_Toplevel.DEFMETHOD("_default_mangler_options", function(options) {
        return defaults(options, {
            except: [],
            eval: false,
            sort: false
        });
    });
    AST_Toplevel.DEFMETHOD("mangle_names", function(options) {
        options = this._default_mangler_options(options);
        var lname = -1;
        var to_mangle = [];
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_LabeledStatement) {
                var save_nesting = lname;
                descend();
                lname = save_nesting;
                return true;
            }
            if (node instanceof AST_Scope) {
                var p = tw.parent(), a = [];
                node.variables.each(function(symbol) {
                    if (options.except.indexOf(symbol.name) < 0) {
                        a.push(symbol);
                    }
                });
                if (options.sort) a.sort(function(a, b) {
                    return b.references.length - a.references.length;
                });
                to_mangle.push.apply(to_mangle, a);
                return;
            }
            if (node instanceof AST_Label) {
                var name;
                do name = base54(++lname); while (!is_identifier(name));
                node.mangled_name = name;
                return true;
            }
        });
        this.walk(tw);
        to_mangle.forEach(function(def) {
            def.mangle(options);
        });
    });
    AST_Toplevel.DEFMETHOD("compute_char_frequency", function(options) {
        options = this._default_mangler_options(options);
        var tw = new TreeWalker(function(node) {
            if (node instanceof AST_Constant) base54.consider(node.print_to_string()); else if (node instanceof AST_Return) base54.consider("return"); else if (node instanceof AST_Throw) base54.consider("throw"); else if (node instanceof AST_Continue) base54.consider("continue"); else if (node instanceof AST_Break) base54.consider("break"); else if (node instanceof AST_Debugger) base54.consider("debugger"); else if (node instanceof AST_Directive) base54.consider(node.value); else if (node instanceof AST_While) base54.consider("while"); else if (node instanceof AST_Do) base54.consider("do while"); else if (node instanceof AST_If) {
                base54.consider("if");
                if (node.alternative) base54.consider("else");
            } else if (node instanceof AST_Var) base54.consider("var"); else if (node instanceof AST_Const) base54.consider("const"); else if (node instanceof AST_Lambda) base54.consider("function"); else if (node instanceof AST_For) base54.consider("for"); else if (node instanceof AST_ForIn) base54.consider("for in"); else if (node instanceof AST_Switch) base54.consider("switch"); else if (node instanceof AST_Case) base54.consider("case"); else if (node instanceof AST_Default) base54.consider("default"); else if (node instanceof AST_With) base54.consider("with"); else if (node instanceof AST_ObjectSetter) base54.consider("set" + node.key); else if (node instanceof AST_ObjectGetter) base54.consider("get" + node.key); else if (node instanceof AST_ObjectKeyVal) base54.consider(node.key); else if (node instanceof AST_New) base54.consider("new"); else if (node instanceof AST_This) base54.consider("this"); else if (node instanceof AST_Try) base54.consider("try"); else if (node instanceof AST_Catch) base54.consider("catch"); else if (node instanceof AST_Finally) base54.consider("finally"); else if (node instanceof AST_Symbol && node.unmangleable(options)) base54.consider(node.name); else if (node instanceof AST_Unary || node instanceof AST_Binary) base54.consider(node.operator); else if (node instanceof AST_Dot) base54.consider(node.property);
        });
        this.walk(tw);
        base54.sort();
    });
    var base54 = function() {
        var string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789";
        var chars, frequency;
        function reset() {
            frequency = Object.create(null);
            chars = string.split("").map(function(ch) {
                return ch.charCodeAt(0);
            });
            chars.forEach(function(ch) {
                frequency[ch] = 0;
            });
        }
        base54.consider = function(str) {
            for (var i = str.length; --i >= 0; ) {
                var code = str.charCodeAt(i);
                if (code in frequency) ++frequency[code];
            }
        };
        base54.sort = function() {
            chars = mergeSort(chars, function(a, b) {
                if (is_digit(a) && !is_digit(b)) return 1;
                if (is_digit(b) && !is_digit(a)) return -1;
                return frequency[b] - frequency[a];
            });
        };
        base54.reset = reset;
        reset();
        base54.get = function() {
            return chars;
        };
        base54.freq = function() {
            return frequency;
        };
        function base54(num) {
            var ret = "", base = 54;
            do {
                ret += String.fromCharCode(chars[num % base]);
                num = Math.floor(num / base);
                base = 64;
            } while (num > 0);
            return ret;
        }
        return base54;
    }();
    AST_Toplevel.DEFMETHOD("scope_warnings", function(options) {
        options = defaults(options, {
            undeclared: false,
            unreferenced: true,
            assign_to_global: true,
            func_arguments: true,
            nested_defuns: true,
            eval: true
        });
        var tw = new TreeWalker(function(node) {
            if (options.undeclared && node instanceof AST_SymbolRef && node.undeclared()) {
                AST_Node.warn("Undeclared symbol: {name} [{file}:{line},{col}]", {
                    name: node.name,
                    file: node.start.file,
                    line: node.start.line,
                    col: node.start.col
                });
            }
            if (options.assign_to_global) {
                var sym = null;
                if (node instanceof AST_Assign && node.left instanceof AST_SymbolRef) sym = node.left; else if (node instanceof AST_ForIn && node.init instanceof AST_SymbolRef) sym = node.init;
                if (sym && (sym.undeclared() || sym.global() && sym.scope !== sym.definition().scope)) {
                    AST_Node.warn("{msg}: {name} [{file}:{line},{col}]", {
                        msg: sym.undeclared() ? "Accidental global?" : "Assignment to global",
                        name: sym.name,
                        file: sym.start.file,
                        line: sym.start.line,
                        col: sym.start.col
                    });
                }
            }
            if (options.eval && node instanceof AST_SymbolRef && node.undeclared() && node.name == "eval") {
                AST_Node.warn("Eval is used [{file}:{line},{col}]", node.start);
            }
            if (options.unreferenced && (node instanceof AST_SymbolDeclaration || node instanceof AST_Label) && node.unreferenced()) {
                AST_Node.warn("{type} {name} is declared but not referenced [{file}:{line},{col}]", {
                    type: node instanceof AST_Label ? "Label" : "Symbol",
                    name: node.name,
                    file: node.start.file,
                    line: node.start.line,
                    col: node.start.col
                });
            }
            if (options.func_arguments && node instanceof AST_Lambda && node.uses_arguments) {
                AST_Node.warn("arguments used in function {name} [{file}:{line},{col}]", {
                    name: node.name ? node.name.name : "anonymous",
                    file: node.start.file,
                    line: node.start.line,
                    col: node.start.col
                });
            }
            if (options.nested_defuns && node instanceof AST_Defun && !(tw.parent() instanceof AST_Scope)) {
                AST_Node.warn('Function {name} declared in nested statement "{type}" [{file}:{line},{col}]', {
                    name: node.name.name,
                    type: tw.parent().TYPE,
                    file: node.start.file,
                    line: node.start.line,
                    col: node.start.col
                });
            }
        });
        this.walk(tw);
    });
    "use strict";
    function OutputStream(options) {
        options = defaults(options, {
            indent_start: 0,
            indent_level: 4,
            quote_keys: false,
            space_colon: true,
            ascii_only: false,
            inline_script: false,
            width: 80,
            max_line_len: 32e3,
            ie_proof: true,
            beautify: false,
            source_map: null,
            bracketize: false,
            semicolons: true,
            comments: false,
            preserve_line: false
        }, true);
        var indentation = 0;
        var current_col = 0;
        var current_line = 1;
        var current_pos = 0;
        var OUTPUT = "";
        function to_ascii(str) {
            return str.replace(/[\u0080-\uffff]/g, function(ch) {
                var code = ch.charCodeAt(0).toString(16);
                while (code.length < 4) code = "0" + code;
                return "\\u" + code;
            });
        }
        function make_string(str) {
            var dq = 0, sq = 0;
            str = str.replace(/[\\\b\f\n\r\t\x22\x27\u2028\u2029\0]/g, function(s) {
                switch (s) {
                  case "\\":
                    return "\\\\";

                  case "\b":
                    return "\\b";

                  case "\f":
                    return "\\f";

                  case "\n":
                    return "\\n";

                  case "\r":
                    return "\\r";

                  case "\u2028":
                    return "\\u2028";

                  case "\u2029":
                    return "\\u2029";

                  case '"':
                    ++dq;
                    return '"';

                  case "'":
                    ++sq;
                    return "'";

                  case "\0":
                    return "\\0";
                }
                return s;
            });
            if (options.ascii_only) str = to_ascii(str);
            if (dq > sq) return "'" + str.replace(/\x27/g, "\\'") + "'"; else return '"' + str.replace(/\x22/g, '\\"') + '"';
        }
        function encode_string(str) {
            var ret = make_string(str);
            if (options.inline_script) ret = ret.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1");
            return ret;
        }
        function make_name(name) {
            name = name.toString();
            if (options.ascii_only) name = to_ascii(name);
            return name;
        }
        function make_indent(back) {
            return repeat_string(" ", options.indent_start + indentation - back * options.indent_level);
        }
        var might_need_space = false;
        var might_need_semicolon = false;
        var last = null;
        function last_char() {
            return last.charAt(last.length - 1);
        }
        function maybe_newline() {
            if (options.max_line_len && current_col > options.max_line_len) print("\n");
        }
        var requireSemicolonChars = makePredicate("( [ + * / - , .");
        function print(str) {
            str = String(str);
            var ch = str.charAt(0);
            if (might_need_semicolon) {
                if ((!ch || ";}".indexOf(ch) < 0) && !/[;]$/.test(last)) {
                    if (options.semicolons || requireSemicolonChars(ch)) {
                        OUTPUT += ";";
                        current_col++;
                        current_pos++;
                    } else {
                        OUTPUT += "\n";
                        current_pos++;
                        current_line++;
                        current_col = 0;
                    }
                    if (!options.beautify) might_need_space = false;
                }
                might_need_semicolon = false;
                maybe_newline();
            }
            if (!options.beautify && options.preserve_line && stack[stack.length - 1]) {
                var target_line = stack[stack.length - 1].start.line;
                while (current_line < target_line) {
                    OUTPUT += "\n";
                    current_pos++;
                    current_line++;
                    current_col = 0;
                    might_need_space = false;
                }
            }
            if (might_need_space) {
                var prev = last_char();
                if (is_identifier_char(prev) && (is_identifier_char(ch) || ch == "\\") || /^[\+\-\/]$/.test(ch) && ch == prev) {
                    OUTPUT += " ";
                    current_col++;
                    current_pos++;
                }
                might_need_space = false;
            }
            var a = str.split(/\r?\n/), n = a.length - 1;
            current_line += n;
            if (n == 0) {
                current_col += a[n].length;
            } else {
                current_col = a[n].length;
            }
            current_pos += str.length;
            last = str;
            OUTPUT += str;
        }
        var space = options.beautify ? function() {
            print(" ");
        } : function() {
            might_need_space = true;
        };
        var indent = options.beautify ? function(half) {
            if (options.beautify) {
                print(make_indent(half ? .5 : 0));
            }
        } : noop;
        var with_indent = options.beautify ? function(col, cont) {
            if (col === true) col = next_indent();
            var save_indentation = indentation;
            indentation = col;
            var ret = cont();
            indentation = save_indentation;
            return ret;
        } : function(col, cont) {
            return cont();
        };
        var newline = options.beautify ? function() {
            print("\n");
        } : noop;
        var semicolon = options.beautify ? function() {
            print(";");
        } : function() {
            might_need_semicolon = true;
        };
        function force_semicolon() {
            might_need_semicolon = false;
            print(";");
        }
        function next_indent() {
            return indentation + options.indent_level;
        }
        function with_block(cont) {
            var ret;
            print("{");
            newline();
            with_indent(next_indent(), function() {
                ret = cont();
            });
            indent();
            print("}");
            return ret;
        }
        function with_parens(cont) {
            print("(");
            var ret = cont();
            print(")");
            return ret;
        }
        function with_square(cont) {
            print("[");
            var ret = cont();
            print("]");
            return ret;
        }
        function comma() {
            print(",");
            space();
        }
        function colon() {
            print(":");
            if (options.space_colon) space();
        }
        var add_mapping = options.source_map ? function(token, name) {
            try {
                if (token) options.source_map.add(token.file || "?", current_line, current_col, token.line, token.col, !name && token.type == "name" ? token.value : name);
            } catch (ex) {
                AST_Node.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]", {
                    file: token.file,
                    line: token.line,
                    col: token.col,
                    cline: current_line,
                    ccol: current_col,
                    name: name || ""
                });
            }
        } : noop;
        function get() {
            return OUTPUT;
        }
        var stack = [];
        return {
            get: get,
            toString: get,
            indent: indent,
            indentation: function() {
                return indentation;
            },
            current_width: function() {
                return current_col - indentation;
            },
            should_break: function() {
                return options.width && this.current_width() >= options.width;
            },
            newline: newline,
            print: print,
            space: space,
            comma: comma,
            colon: colon,
            last: function() {
                return last;
            },
            semicolon: semicolon,
            force_semicolon: force_semicolon,
            to_ascii: to_ascii,
            print_name: function(name) {
                print(make_name(name));
            },
            print_string: function(str) {
                print(encode_string(str));
            },
            next_indent: next_indent,
            with_indent: with_indent,
            with_block: with_block,
            with_parens: with_parens,
            with_square: with_square,
            add_mapping: add_mapping,
            option: function(opt) {
                return options[opt];
            },
            line: function() {
                return current_line;
            },
            col: function() {
                return current_col;
            },
            pos: function() {
                return current_pos;
            },
            push_node: function(node) {
                stack.push(node);
            },
            pop_node: function() {
                return stack.pop();
            },
            stack: function() {
                return stack;
            },
            parent: function(n) {
                return stack[stack.length - 2 - (n || 0)];
            }
        };
    }
    (function() {
        function DEFPRINT(nodetype, generator) {
            nodetype.DEFMETHOD("_codegen", generator);
        }
        AST_Node.DEFMETHOD("print", function(stream, force_parens) {
            var self = this, generator = self._codegen;
            stream.push_node(self);
            if (force_parens || self.needs_parens(stream)) {
                stream.with_parens(function() {
                    self.add_comments(stream);
                    self.add_source_map(stream);
                    generator(self, stream);
                });
            } else {
                self.add_comments(stream);
                self.add_source_map(stream);
                generator(self, stream);
            }
            stream.pop_node();
        });
        AST_Node.DEFMETHOD("print_to_string", function(options) {
            var s = OutputStream(options);
            this.print(s);
            return s.get();
        });
        AST_Node.DEFMETHOD("add_comments", function(output) {
            var c = output.option("comments"), self = this;
            if (c) {
                var start = self.start;
                if (start && !start._comments_dumped) {
                    start._comments_dumped = true;
                    var comments = start.comments_before;
                    if (c.test) {
                        comments = comments.filter(function(comment) {
                            return c.test(comment.value);
                        });
                    } else if (typeof c == "function") {
                        comments = comments.filter(function(comment) {
                            return c(self, comment);
                        });
                    }
                    comments.forEach(function(c) {
                        if (c.type == "comment1") {
                            output.print("//" + c.value + "\n");
                            output.indent();
                        } else if (c.type == "comment2") {
                            output.print("/*" + c.value + "*/");
                            if (start.nlb) {
                                output.print("\n");
                                output.indent();
                            } else {
                                output.space();
                            }
                        }
                    });
                }
            }
        });
        function PARENS(nodetype, func) {
            nodetype.DEFMETHOD("needs_parens", func);
        }
        PARENS(AST_Node, function() {
            return false;
        });
        PARENS(AST_Function, function(output) {
            return first_in_statement(output);
        });
        PARENS(AST_Object, function(output) {
            return first_in_statement(output);
        });
        PARENS(AST_Unary, function(output) {
            var p = output.parent();
            return p instanceof AST_PropAccess && p.expression === this;
        });
        PARENS(AST_Seq, function(output) {
            var p = output.parent();
            return p instanceof AST_Call || p instanceof AST_Unary || p instanceof AST_Binary || p instanceof AST_VarDef || p instanceof AST_Dot || p instanceof AST_Array || p instanceof AST_ObjectProperty || p instanceof AST_Conditional;
        });
        PARENS(AST_Binary, function(output) {
            var p = output.parent();
            if (p instanceof AST_Call && p.expression === this) return true;
            if (p instanceof AST_Unary) return true;
            if (p instanceof AST_PropAccess && p.expression === this) return true;
            if (p instanceof AST_Binary) {
                var po = p.operator, pp = PRECEDENCE[po];
                var so = this.operator, sp = PRECEDENCE[so];
                if (pp > sp || pp == sp && this === p.right && !(so == po && (so == "*" || so == "&&" || so == "||"))) {
                    return true;
                }
            }
        });
        PARENS(AST_PropAccess, function(output) {
            var p = output.parent();
            if (p instanceof AST_New && p.expression === this) {
                try {
                    this.walk(new TreeWalker(function(node) {
                        if (node instanceof AST_Call) throw p;
                    }));
                } catch (ex) {
                    if (ex !== p) throw ex;
                    return true;
                }
            }
        });
        PARENS(AST_Call, function(output) {
            var p = output.parent();
            return p instanceof AST_New && p.expression === this;
        });
        PARENS(AST_New, function(output) {
            var p = output.parent();
            if (no_constructor_parens(this, output) && (p instanceof AST_Dot || p instanceof AST_Call && p.expression === this)) return true;
        });
        function assign_and_conditional_paren_rules(output) {
            var p = output.parent();
            if (p instanceof AST_Unary) return true;
            if (p instanceof AST_Binary && !(p instanceof AST_Assign)) return true;
            if (p instanceof AST_Call && p.expression === this) return true;
            if (p instanceof AST_Conditional && p.condition === this) return true;
            if (p instanceof AST_PropAccess && p.expression === this) return true;
        }
        PARENS(AST_Assign, assign_and_conditional_paren_rules);
        PARENS(AST_Conditional, assign_and_conditional_paren_rules);
        DEFPRINT(AST_Directive, function(self, output) {
            output.print_string(self.value);
            output.semicolon();
        });
        DEFPRINT(AST_Debugger, function(self, output) {
            output.print("debugger");
            output.semicolon();
        });
        function display_body(body, is_toplevel, output) {
            var last = body.length - 1;
            body.forEach(function(stmt, i) {
                if (!(stmt instanceof AST_EmptyStatement)) {
                    output.indent();
                    stmt.print(output);
                    if (!(i == last && is_toplevel)) {
                        output.newline();
                        if (is_toplevel) output.newline();
                    }
                }
            });
        }
        AST_StatementWithBody.DEFMETHOD("_do_print_body", function(output) {
            force_statement(this.body, output);
        });
        DEFPRINT(AST_Statement, function(self, output) {
            self.body.print(output);
            output.semicolon();
        });
        DEFPRINT(AST_Toplevel, function(self, output) {
            display_body(self.body, true, output);
            output.print("");
        });
        DEFPRINT(AST_LabeledStatement, function(self, output) {
            self.label.print(output);
            output.colon();
            self.body.print(output);
        });
        DEFPRINT(AST_SimpleStatement, function(self, output) {
            self.body.print(output);
            output.semicolon();
        });
        function print_bracketed(body, output) {
            if (body.length > 0) output.with_block(function() {
                display_body(body, false, output);
            }); else output.print("{}");
        }
        DEFPRINT(AST_BlockStatement, function(self, output) {
            print_bracketed(self.body, output);
        });
        DEFPRINT(AST_EmptyStatement, function(self, output) {
            output.semicolon();
        });
        DEFPRINT(AST_Do, function(self, output) {
            output.print("do");
            output.space();
            self._do_print_body(output);
            output.space();
            output.print("while");
            output.space();
            output.with_parens(function() {
                self.condition.print(output);
            });
            output.semicolon();
        });
        DEFPRINT(AST_While, function(self, output) {
            output.print("while");
            output.space();
            output.with_parens(function() {
                self.condition.print(output);
            });
            output.space();
            self._do_print_body(output);
        });
        DEFPRINT(AST_For, function(self, output) {
            output.print("for");
            output.space();
            output.with_parens(function() {
                if (self.init) {
                    if (self.init instanceof AST_Definitions) {
                        self.init.print(output);
                    } else {
                        parenthesize_for_noin(self.init, output, true);
                    }
                    output.print(";");
                    output.space();
                } else {
                    output.print(";");
                }
                if (self.condition) {
                    self.condition.print(output);
                    output.print(";");
                    output.space();
                } else {
                    output.print(";");
                }
                if (self.step) {
                    self.step.print(output);
                }
            });
            output.space();
            self._do_print_body(output);
        });
        DEFPRINT(AST_ForIn, function(self, output) {
            output.print("for");
            output.space();
            output.with_parens(function() {
                self.init.print(output);
                output.space();
                output.print("in");
                output.space();
                self.object.print(output);
            });
            output.space();
            self._do_print_body(output);
        });
        DEFPRINT(AST_With, function(self, output) {
            output.print("with");
            output.space();
            output.with_parens(function() {
                self.expression.print(output);
            });
            output.space();
            self._do_print_body(output);
        });
        AST_Lambda.DEFMETHOD("_do_print", function(output, nokeyword) {
            var self = this;
            if (!nokeyword) {
                output.print("function");
            }
            if (self.name) {
                output.space();
                self.name.print(output);
            }
            output.with_parens(function() {
                self.argnames.forEach(function(arg, i) {
                    if (i) output.comma();
                    arg.print(output);
                });
            });
            output.space();
            print_bracketed(self.body, output);
        });
        DEFPRINT(AST_Lambda, function(self, output) {
            self._do_print(output);
        });
        AST_Exit.DEFMETHOD("_do_print", function(output, kind) {
            output.print(kind);
            if (this.value) {
                output.space();
                this.value.print(output);
            }
            output.semicolon();
        });
        DEFPRINT(AST_Return, function(self, output) {
            self._do_print(output, "return");
        });
        DEFPRINT(AST_Throw, function(self, output) {
            self._do_print(output, "throw");
        });
        AST_LoopControl.DEFMETHOD("_do_print", function(output, kind) {
            output.print(kind);
            if (this.label) {
                output.space();
                this.label.print(output);
            }
            output.semicolon();
        });
        DEFPRINT(AST_Break, function(self, output) {
            self._do_print(output, "break");
        });
        DEFPRINT(AST_Continue, function(self, output) {
            self._do_print(output, "continue");
        });
        function make_then(self, output) {
            if (output.option("bracketize")) {
                make_block(self.body, output);
                return;
            }
            if (!self.body) return output.force_semicolon();
            if (self.body instanceof AST_Do && output.option("ie_proof")) {
                make_block(self.body, output);
                return;
            }
            var b = self.body;
            while (true) {
                if (b instanceof AST_If) {
                    if (!b.alternative) {
                        make_block(self.body, output);
                        return;
                    }
                    b = b.alternative;
                } else if (b instanceof AST_StatementWithBody) {
                    b = b.body;
                } else break;
            }
            force_statement(self.body, output);
        }
        DEFPRINT(AST_If, function(self, output) {
            output.print("if");
            output.space();
            output.with_parens(function() {
                self.condition.print(output);
            });
            output.space();
            if (self.alternative) {
                make_then(self, output);
                output.space();
                output.print("else");
                output.space();
                force_statement(self.alternative, output);
            } else {
                self._do_print_body(output);
            }
        });
        DEFPRINT(AST_Switch, function(self, output) {
            output.print("switch");
            output.space();
            output.with_parens(function() {
                self.expression.print(output);
            });
            output.space();
            if (self.body.length > 0) output.with_block(function() {
                self.body.forEach(function(stmt, i) {
                    if (i) output.newline();
                    output.indent(true);
                    stmt.print(output);
                });
            }); else output.print("{}");
        });
        AST_SwitchBranch.DEFMETHOD("_do_print_body", function(output) {
            if (this.body.length > 0) {
                output.newline();
                this.body.forEach(function(stmt) {
                    output.indent();
                    stmt.print(output);
                    output.newline();
                });
            }
        });
        DEFPRINT(AST_Default, function(self, output) {
            output.print("default:");
            self._do_print_body(output);
        });
        DEFPRINT(AST_Case, function(self, output) {
            output.print("case");
            output.space();
            self.expression.print(output);
            output.print(":");
            self._do_print_body(output);
        });
        DEFPRINT(AST_Try, function(self, output) {
            output.print("try");
            output.space();
            print_bracketed(self.body, output);
            if (self.bcatch) {
                output.space();
                self.bcatch.print(output);
            }
            if (self.bfinally) {
                output.space();
                self.bfinally.print(output);
            }
        });
        DEFPRINT(AST_Catch, function(self, output) {
            output.print("catch");
            output.space();
            output.with_parens(function() {
                self.argname.print(output);
            });
            output.space();
            print_bracketed(self.body, output);
        });
        DEFPRINT(AST_Finally, function(self, output) {
            output.print("finally");
            output.space();
            print_bracketed(self.body, output);
        });
        AST_Definitions.DEFMETHOD("_do_print", function(output, kind) {
            output.print(kind);
            output.space();
            this.definitions.forEach(function(def, i) {
                if (i) output.comma();
                def.print(output);
            });
            var p = output.parent();
            var in_for = p instanceof AST_For || p instanceof AST_ForIn;
            var avoid_semicolon = in_for && p.init === this;
            if (!avoid_semicolon) output.semicolon();
        });
        DEFPRINT(AST_Var, function(self, output) {
            self._do_print(output, "var");
        });
        DEFPRINT(AST_Const, function(self, output) {
            self._do_print(output, "const");
        });
        function parenthesize_for_noin(node, output, noin) {
            if (!noin) node.print(output); else try {
                node.walk(new TreeWalker(function(node) {
                    if (node instanceof AST_Binary && node.operator == "in") throw output;
                }));
                node.print(output);
            } catch (ex) {
                if (ex !== output) throw ex;
                node.print(output, true);
            }
        }
        DEFPRINT(AST_VarDef, function(self, output) {
            self.name.print(output);
            if (self.value) {
                output.space();
                output.print("=");
                output.space();
                var p = output.parent(1);
                var noin = p instanceof AST_For || p instanceof AST_ForIn;
                parenthesize_for_noin(self.value, output, noin);
            }
        });
        DEFPRINT(AST_Call, function(self, output) {
            self.expression.print(output);
            if (self instanceof AST_New && no_constructor_parens(self, output)) return;
            output.with_parens(function() {
                self.args.forEach(function(expr, i) {
                    if (i) output.comma();
                    expr.print(output);
                });
            });
        });
        DEFPRINT(AST_New, function(self, output) {
            output.print("new");
            output.space();
            AST_Call.prototype._codegen(self, output);
        });
        AST_Seq.DEFMETHOD("_do_print", function(output) {
            this.car.print(output);
            if (this.cdr) {
                output.comma();
                if (output.should_break()) {
                    output.newline();
                    output.indent();
                }
                this.cdr.print(output);
            }
        });
        DEFPRINT(AST_Seq, function(self, output) {
            self._do_print(output);
        });
        DEFPRINT(AST_Dot, function(self, output) {
            var expr = self.expression;
            expr.print(output);
            if (expr instanceof AST_Number) {
                if (!/[xa-f.]/i.test(output.last())) {
                    output.print(".");
                }
            }
            output.print(".");
            output.add_mapping(self.end);
            output.print_name(self.property);
        });
        DEFPRINT(AST_Sub, function(self, output) {
            self.expression.print(output);
            output.print("[");
            self.property.print(output);
            output.print("]");
        });
        DEFPRINT(AST_UnaryPrefix, function(self, output) {
            var op = self.operator;
            output.print(op);
            if (/^[a-z]/i.test(op)) output.space();
            self.expression.print(output);
        });
        DEFPRINT(AST_UnaryPostfix, function(self, output) {
            self.expression.print(output);
            output.print(self.operator);
        });
        DEFPRINT(AST_Binary, function(self, output) {
            self.left.print(output);
            output.space();
            output.print(self.operator);
            output.space();
            self.right.print(output);
        });
        DEFPRINT(AST_Conditional, function(self, output) {
            self.condition.print(output);
            output.space();
            output.print("?");
            output.space();
            self.consequent.print(output);
            output.space();
            output.colon();
            self.alternative.print(output);
        });
        DEFPRINT(AST_Array, function(self, output) {
            output.with_square(function() {
                var a = self.elements, len = a.length;
                if (len > 0) output.space();
                a.forEach(function(exp, i) {
                    if (i) output.comma();
                    if (!(exp instanceof AST_Undefined)) exp.print(output);
                });
                if (len > 0) output.space();
            });
        });
        DEFPRINT(AST_Object, function(self, output) {
            if (self.properties.length > 0) output.with_block(function() {
                self.properties.forEach(function(prop, i) {
                    if (i) {
                        output.print(",");
                        output.newline();
                    }
                    output.indent();
                    prop.print(output);
                });
                output.newline();
            }); else output.print("{}");
        });
        DEFPRINT(AST_ObjectKeyVal, function(self, output) {
            var key = self.key;
            if (output.option("quote_keys")) {
                output.print_string(key);
            } else if ((typeof key == "number" || !output.option("beautify") && +key + "" == key) && parseFloat(key) >= 0) {
                output.print(make_num(key));
            } else if (!is_identifier(key)) {
                output.print_string(key);
            } else {
                output.print_name(key);
            }
            output.colon();
            self.value.print(output);
        });
        DEFPRINT(AST_ObjectSetter, function(self, output) {
            output.print("set");
            self.value._do_print(output, true);
        });
        DEFPRINT(AST_ObjectGetter, function(self, output) {
            output.print("get");
            self.value._do_print(output, true);
        });
        DEFPRINT(AST_Symbol, function(self, output) {
            var def = self.definition();
            output.print_name(def ? def.mangled_name || def.name : self.name);
        });
        DEFPRINT(AST_Undefined, function(self, output) {
            output.print("void 0");
        });
        DEFPRINT(AST_Infinity, function(self, output) {
            output.print("1/0");
        });
        DEFPRINT(AST_NaN, function(self, output) {
            output.print("0/0");
        });
        DEFPRINT(AST_This, function(self, output) {
            output.print("this");
        });
        DEFPRINT(AST_Constant, function(self, output) {
            output.print(self.getValue());
        });
        DEFPRINT(AST_String, function(self, output) {
            output.print_string(self.getValue());
        });
        DEFPRINT(AST_Number, function(self, output) {
            output.print(make_num(self.getValue()));
        });
        DEFPRINT(AST_RegExp, function(self, output) {
            var str = self.getValue().toString();
            if (output.option("ascii_only")) str = output.to_ascii(str);
            output.print(str);
        });
        function force_statement(stat, output) {
            if (output.option("bracketize")) {
                if (!stat || stat instanceof AST_EmptyStatement) output.print("{}"); else if (stat instanceof AST_BlockStatement) stat.print(output); else output.with_block(function() {
                    output.indent();
                    stat.print(output);
                    output.newline();
                });
            } else {
                if (!stat || stat instanceof AST_EmptyStatement) output.force_semicolon(); else stat.print(output);
            }
        }
        function first_in_statement(output) {
            var a = output.stack(), i = a.length, node = a[--i], p = a[--i];
            while (i > 0) {
                if (p instanceof AST_Statement && p.body === node) return true;
                if (p instanceof AST_Seq && p.car === node || p instanceof AST_Call && p.expression === node || p instanceof AST_Dot && p.expression === node || p instanceof AST_Sub && p.expression === node || p instanceof AST_Conditional && p.condition === node || p instanceof AST_Binary && p.left === node || p instanceof AST_UnaryPostfix && p.expression === node) {
                    node = p;
                    p = a[--i];
                } else {
                    return false;
                }
            }
        }
        function no_constructor_parens(self, output) {
            return self.args.length == 0 && !output.option("beautify");
        }
        function best_of(a) {
            var best = a[0], len = best.length;
            for (var i = 1; i < a.length; ++i) {
                if (a[i].length < len) {
                    best = a[i];
                    len = best.length;
                }
            }
            return best;
        }
        function make_num(num) {
            var str = num.toString(10), a = [ str.replace(/^0\./, ".").replace("e+", "e") ], m;
            if (Math.floor(num) === num) {
                if (num >= 0) {
                    a.push("0x" + num.toString(16).toLowerCase(), "0" + num.toString(8));
                } else {
                    a.push("-0x" + (-num).toString(16).toLowerCase(), "-0" + (-num).toString(8));
                }
                if (m = /^(.*?)(0+)$/.exec(num)) {
                    a.push(m[1] + "e" + m[2].length);
                }
            } else if (m = /^0?\.(0+)(.*)$/.exec(num)) {
                a.push(m[2] + "e-" + (m[1].length + m[2].length), str.substr(str.indexOf(".")));
            }
            return best_of(a);
        }
        function make_block(stmt, output) {
            if (stmt instanceof AST_BlockStatement) {
                stmt.print(output);
                return;
            }
            output.with_block(function() {
                output.indent();
                stmt.print(output);
                output.newline();
            });
        }
        function DEFMAP(nodetype, generator) {
            nodetype.DEFMETHOD("add_source_map", function(stream) {
                generator(this, stream);
            });
        }
        DEFMAP(AST_Node, noop);
        function basic_sourcemap_gen(self, output) {
            output.add_mapping(self.start);
        }
        DEFMAP(AST_Directive, basic_sourcemap_gen);
        DEFMAP(AST_Debugger, basic_sourcemap_gen);
        DEFMAP(AST_Symbol, basic_sourcemap_gen);
        DEFMAP(AST_Jump, basic_sourcemap_gen);
        DEFMAP(AST_StatementWithBody, basic_sourcemap_gen);
        DEFMAP(AST_LabeledStatement, noop);
        DEFMAP(AST_Lambda, basic_sourcemap_gen);
        DEFMAP(AST_Switch, basic_sourcemap_gen);
        DEFMAP(AST_SwitchBranch, basic_sourcemap_gen);
        DEFMAP(AST_BlockStatement, basic_sourcemap_gen);
        DEFMAP(AST_Toplevel, noop);
        DEFMAP(AST_New, basic_sourcemap_gen);
        DEFMAP(AST_Try, basic_sourcemap_gen);
        DEFMAP(AST_Catch, basic_sourcemap_gen);
        DEFMAP(AST_Finally, basic_sourcemap_gen);
        DEFMAP(AST_Definitions, basic_sourcemap_gen);
        DEFMAP(AST_Constant, basic_sourcemap_gen);
        DEFMAP(AST_ObjectProperty, function(self, output) {
            output.add_mapping(self.start, self.key);
        });
    })();
    "use strict";
    function Compressor(options, false_by_default) {
        if (!(this instanceof Compressor)) return new Compressor(options, false_by_default);
        TreeTransformer.call(this, this.before, this.after);
        this.options = defaults(options, {
            sequences: !false_by_default,
            properties: !false_by_default,
            dead_code: !false_by_default,
            drop_debugger: !false_by_default,
            unsafe: !false_by_default,
            unsafe_comps: false,
            conditionals: !false_by_default,
            comparisons: !false_by_default,
            evaluate: !false_by_default,
            booleans: !false_by_default,
            loops: !false_by_default,
            unused: !false_by_default,
            hoist_funs: !false_by_default,
            hoist_vars: false,
            if_return: !false_by_default,
            join_vars: !false_by_default,
            cascade: !false_by_default,
            side_effects: !false_by_default,
            warnings: true,
            global_defs: {}
        }, true);
    }
    Compressor.prototype = new TreeTransformer();
    merge(Compressor.prototype, {
        option: function(key) {
            return this.options[key];
        },
        warn: function() {
            if (this.options.warnings) AST_Node.warn.apply(AST_Node, arguments);
        },
        before: function(node, descend, in_list) {
            if (node._squeezed) return node;
            if (node instanceof AST_Scope) {
                node.drop_unused(this);
                node = node.hoist_declarations(this);
            }
            descend(node, this);
            node = node.optimize(this);
            if (node instanceof AST_Scope) {
                var save_warnings = this.options.warnings;
                this.options.warnings = false;
                node.drop_unused(this);
                this.options.warnings = save_warnings;
            }
            node._squeezed = true;
            return node;
        }
    });
    (function() {
        function OPT(node, optimizer) {
            node.DEFMETHOD("optimize", function(compressor) {
                var self = this;
                if (self._optimized) return self;
                var opt = optimizer(self, compressor);
                opt._optimized = true;
                if (opt === self) return opt;
                return opt.transform(compressor);
            });
        }
        OPT(AST_Node, function(self, compressor) {
            return self;
        });
        AST_Node.DEFMETHOD("equivalent_to", function(node) {
            return this.print_to_string() == node.print_to_string();
        });
        function make_node(ctor, orig, props) {
            if (!props) props = {};
            if (orig) {
                if (!props.start) props.start = orig.start;
                if (!props.end) props.end = orig.end;
            }
            return new ctor(props);
        }
        function make_node_from_constant(compressor, val, orig) {
            if (val instanceof AST_Node) return val.transform(compressor);
            switch (typeof val) {
              case "string":
                return make_node(AST_String, orig, {
                    value: val
                }).optimize(compressor);

              case "number":
                return make_node(isNaN(val) ? AST_NaN : AST_Number, orig, {
                    value: val
                }).optimize(compressor);

              case "boolean":
                return make_node(val ? AST_True : AST_False, orig);

              case "undefined":
                return make_node(AST_Undefined, orig).optimize(compressor);

              default:
                if (val === null) {
                    return make_node(AST_Null, orig).optimize(compressor);
                }
                if (val instanceof RegExp) {
                    return make_node(AST_RegExp, orig).optimize(compressor);
                }
                throw new Error(string_template("Can't handle constant of type: {type}", {
                    type: typeof val
                }));
            }
        }
        function as_statement_array(thing) {
            if (thing === null) return [];
            if (thing instanceof AST_BlockStatement) return thing.body;
            if (thing instanceof AST_EmptyStatement) return [];
            if (thing instanceof AST_Statement) return [ thing ];
            throw new Error("Can't convert thing to statement array");
        }
        function is_empty(thing) {
            if (thing === null) return true;
            if (thing instanceof AST_EmptyStatement) return true;
            if (thing instanceof AST_BlockStatement) return thing.body.length == 0;
            return false;
        }
        function loop_body(x) {
            if (x instanceof AST_Switch) return x;
            if (x instanceof AST_For || x instanceof AST_ForIn || x instanceof AST_DWLoop) {
                return x.body instanceof AST_BlockStatement ? x.body : x;
            }
            return x;
        }
        function tighten_body(statements, compressor) {
            var CHANGED;
            do {
                CHANGED = false;
                statements = eliminate_spurious_blocks(statements);
                if (compressor.option("dead_code")) {
                    statements = eliminate_dead_code(statements, compressor);
                }
                if (compressor.option("if_return")) {
                    statements = handle_if_return(statements, compressor);
                }
                if (compressor.option("sequences")) {
                    statements = sequencesize(statements, compressor);
                }
                if (compressor.option("join_vars")) {
                    statements = join_consecutive_vars(statements, compressor);
                }
            } while (CHANGED);
            return statements;
            function eliminate_spurious_blocks(statements) {
                var seen_dirs = [];
                return statements.reduce(function(a, stat) {
                    if (stat instanceof AST_BlockStatement) {
                        CHANGED = true;
                        a.push.apply(a, eliminate_spurious_blocks(stat.body));
                    } else if (stat instanceof AST_EmptyStatement) {
                        CHANGED = true;
                    } else if (stat instanceof AST_Directive) {
                        if (seen_dirs.indexOf(stat.value) < 0) {
                            a.push(stat);
                            seen_dirs.push(stat.value);
                        } else {
                            CHANGED = true;
                        }
                    } else {
                        a.push(stat);
                    }
                    return a;
                }, []);
            }
            function handle_if_return(statements, compressor) {
                var self = compressor.self();
                var in_lambda = self instanceof AST_Lambda;
                var ret = [];
                loop: for (var i = statements.length; --i >= 0; ) {
                    var stat = statements[i];
                    switch (true) {
                      case in_lambda && stat instanceof AST_Return && !stat.value && ret.length == 0:
                        CHANGED = true;
                        continue loop;

                      case stat instanceof AST_If:
                        if (stat.body instanceof AST_Return) {
                            if ((in_lambda && ret.length == 0 || ret[0] instanceof AST_Return && !ret[0].value) && !stat.body.value && !stat.alternative) {
                                CHANGED = true;
                                var cond = make_node(AST_SimpleStatement, stat.condition, {
                                    body: stat.condition
                                });
                                ret.unshift(cond);
                                continue loop;
                            }
                            if (ret[0] instanceof AST_Return && stat.body.value && ret[0].value && !stat.alternative) {
                                CHANGED = true;
                                stat = stat.clone();
                                stat.alternative = ret[0];
                                ret[0] = stat.transform(compressor);
                                continue loop;
                            }
                            if ((ret.length == 0 || ret[0] instanceof AST_Return) && stat.body.value && !stat.alternative && in_lambda) {
                                CHANGED = true;
                                stat = stat.clone();
                                stat.alternative = ret[0] || make_node(AST_Return, stat, {
                                    value: make_node(AST_Undefined, stat)
                                });
                                ret[0] = stat.transform(compressor);
                                continue loop;
                            }
                            if (!stat.body.value && in_lambda) {
                                CHANGED = true;
                                stat = stat.clone();
                                stat.condition = stat.condition.negate(compressor);
                                stat.body = make_node(AST_BlockStatement, stat, {
                                    body: as_statement_array(stat.alternative).concat(ret)
                                });
                                stat.alternative = null;
                                ret = [ stat.transform(compressor) ];
                                continue loop;
                            }
                            if (ret.length == 1 && in_lambda && ret[0] instanceof AST_SimpleStatement && (!stat.alternative || stat.alternative instanceof AST_SimpleStatement)) {
                                CHANGED = true;
                                ret.push(make_node(AST_Return, ret[0], {
                                    value: make_node(AST_Undefined, ret[0])
                                }).transform(compressor));
                                ret = as_statement_array(stat.alternative).concat(ret);
                                ret.unshift(stat);
                                continue loop;
                            }
                        }
                        var ab = aborts(stat.body);
                        var lct = ab instanceof AST_LoopControl ? compressor.loopcontrol_target(ab.label) : null;
                        if (ab && (ab instanceof AST_Return && !ab.value && in_lambda || ab instanceof AST_Continue && self === loop_body(lct) || ab instanceof AST_Break && lct instanceof AST_BlockStatement && self === lct)) {
                            if (ab.label) {
                                remove(ab.label.thedef.references, ab.label);
                            }
                            CHANGED = true;
                            var body = as_statement_array(stat.body).slice(0, -1);
                            stat = stat.clone();
                            stat.condition = stat.condition.negate(compressor);
                            stat.body = make_node(AST_BlockStatement, stat, {
                                body: ret
                            });
                            stat.alternative = make_node(AST_BlockStatement, stat, {
                                body: body
                            });
                            ret = [ stat.transform(compressor) ];
                            continue loop;
                        }
                        var ab = aborts(stat.alternative);
                        var lct = ab instanceof AST_LoopControl ? compressor.loopcontrol_target(ab.label) : null;
                        if (ab && (ab instanceof AST_Return && !ab.value && in_lambda || ab instanceof AST_Continue && self === loop_body(lct) || ab instanceof AST_Break && lct instanceof AST_BlockStatement && self === lct)) {
                            if (ab.label) {
                                remove(ab.label.thedef.references, ab.label);
                            }
                            CHANGED = true;
                            stat = stat.clone();
                            stat.body = make_node(AST_BlockStatement, stat.body, {
                                body: as_statement_array(stat.body).concat(ret)
                            });
                            stat.alternative = make_node(AST_BlockStatement, stat.alternative, {
                                body: as_statement_array(stat.alternative).slice(0, -1)
                            });
                            ret = [ stat.transform(compressor) ];
                            continue loop;
                        }
                        ret.unshift(stat);
                        break;

                      default:
                        ret.unshift(stat);
                        break;
                    }
                }
                return ret;
            }
            function eliminate_dead_code(statements, compressor) {
                var has_quit = false;
                var orig = statements.length;
                var self = compressor.self();
                statements = statements.reduce(function(a, stat) {
                    if (has_quit) {
                        extract_declarations_from_unreachable_code(compressor, stat, a);
                    } else {
                        if (stat instanceof AST_LoopControl) {
                            var lct = compressor.loopcontrol_target(stat.label);
                            if (stat instanceof AST_Break && lct instanceof AST_BlockStatement && loop_body(lct) === self || stat instanceof AST_Continue && loop_body(lct) === self) {
                                if (stat.label) {
                                    remove(stat.label.thedef.references, stat.label);
                                }
                            } else {
                                a.push(stat);
                            }
                        } else {
                            a.push(stat);
                        }
                        if (aborts(stat)) has_quit = true;
                    }
                    return a;
                }, []);
                CHANGED = statements.length != orig;
                return statements;
            }
            function sequencesize(statements, compressor) {
                if (statements.length < 2) return statements;
                var seq = [], ret = [];
                function push_seq() {
                    seq = AST_Seq.from_array(seq);
                    if (seq) ret.push(make_node(AST_SimpleStatement, seq, {
                        body: seq
                    }));
                    seq = [];
                }
                statements.forEach(function(stat) {
                    if (stat instanceof AST_SimpleStatement) seq.push(stat.body); else push_seq(), ret.push(stat);
                });
                push_seq();
                ret = sequencesize_2(ret, compressor);
                CHANGED = ret.length != statements.length;
                return ret;
            }
            function sequencesize_2(statements, compressor) {
                function cons_seq(right) {
                    ret.pop();
                    var left = prev.body;
                    if (left instanceof AST_Seq) {
                        left.add(right);
                    } else {
                        left = AST_Seq.cons(left, right);
                    }
                    return left.transform(compressor);
                }
                var ret = [], prev = null;
                statements.forEach(function(stat) {
                    if (prev) {
                        if (stat instanceof AST_For) {
                            var opera = {};
                            try {
                                prev.body.walk(new TreeWalker(function(node) {
                                    if (node instanceof AST_Binary && node.operator == "in") throw opera;
                                }));
                                if (stat.init && !(stat.init instanceof AST_Definitions)) {
                                    stat.init = cons_seq(stat.init);
                                } else if (!stat.init) {
                                    stat.init = prev.body;
                                    ret.pop();
                                }
                            } catch (ex) {
                                if (ex !== opera) throw ex;
                            }
                        } else if (stat instanceof AST_If) {
                            stat.condition = cons_seq(stat.condition);
                        } else if (stat instanceof AST_With) {
                            stat.expression = cons_seq(stat.expression);
                        } else if (stat instanceof AST_Exit && stat.value) {
                            stat.value = cons_seq(stat.value);
                        } else if (stat instanceof AST_Exit) {
                            stat.value = cons_seq(make_node(AST_Undefined, stat));
                        } else if (stat instanceof AST_Switch) {
                            stat.expression = cons_seq(stat.expression);
                        }
                    }
                    ret.push(stat);
                    prev = stat instanceof AST_SimpleStatement ? stat : null;
                });
                return ret;
            }
            function join_consecutive_vars(statements, compressor) {
                var prev = null;
                return statements.reduce(function(a, stat) {
                    if (stat instanceof AST_Definitions && prev && prev.TYPE == stat.TYPE) {
                        prev.definitions = prev.definitions.concat(stat.definitions);
                        CHANGED = true;
                    } else if (stat instanceof AST_For && prev instanceof AST_Definitions && (!stat.init || stat.init.TYPE == prev.TYPE)) {
                        CHANGED = true;
                        a.pop();
                        if (stat.init) {
                            stat.init.definitions = prev.definitions.concat(stat.init.definitions);
                        } else {
                            stat.init = prev;
                        }
                        a.push(stat);
                        prev = stat;
                    } else {
                        prev = stat;
                        a.push(stat);
                    }
                    return a;
                }, []);
            }
        }
        function extract_declarations_from_unreachable_code(compressor, stat, target) {
            compressor.warn("Dropping unreachable code [{file}:{line},{col}]", stat.start);
            stat.walk(new TreeWalker(function(node) {
                if (node instanceof AST_Definitions) {
                    compressor.warn("Declarations in unreachable code! [{file}:{line},{col}]", node.start);
                    node.remove_initializers();
                    target.push(node);
                    return true;
                }
                if (node instanceof AST_Defun) {
                    target.push(node);
                    return true;
                }
                if (node instanceof AST_Scope) {
                    return true;
                }
            }));
        }
        (function(def) {
            var unary_bool = [ "!", "delete" ];
            var binary_bool = [ "in", "instanceof", "==", "!=", "===", "!==", "<", "<=", ">=", ">" ];
            def(AST_Node, function() {
                return false;
            });
            def(AST_UnaryPrefix, function() {
                return member(this.operator, unary_bool);
            });
            def(AST_Binary, function() {
                return member(this.operator, binary_bool) || (this.operator == "&&" || this.operator == "||") && this.left.is_boolean() && this.right.is_boolean();
            });
            def(AST_Conditional, function() {
                return this.consequent.is_boolean() && this.alternative.is_boolean();
            });
            def(AST_Assign, function() {
                return this.operator == "=" && this.right.is_boolean();
            });
            def(AST_Seq, function() {
                return this.cdr.is_boolean();
            });
            def(AST_True, function() {
                return true;
            });
            def(AST_False, function() {
                return true;
            });
        })(function(node, func) {
            node.DEFMETHOD("is_boolean", func);
        });
        (function(def) {
            def(AST_Node, function() {
                return false;
            });
            def(AST_String, function() {
                return true;
            });
            def(AST_UnaryPrefix, function() {
                return this.operator == "typeof";
            });
            def(AST_Binary, function(compressor) {
                return this.operator == "+" && (this.left.is_string(compressor) || this.right.is_string(compressor));
            });
            def(AST_Assign, function(compressor) {
                return (this.operator == "=" || this.operator == "+=") && this.right.is_string(compressor);
            });
            def(AST_Seq, function(compressor) {
                return this.cdr.is_string(compressor);
            });
            def(AST_Conditional, function(compressor) {
                return this.consequent.is_string(compressor) && this.alternative.is_string(compressor);
            });
            def(AST_Call, function(compressor) {
                return compressor.option("unsafe") && this.expression instanceof AST_SymbolRef && this.expression.name == "String" && this.expression.undeclared();
            });
        })(function(node, func) {
            node.DEFMETHOD("is_string", func);
        });
        function best_of(ast1, ast2) {
            return ast1.print_to_string().length > ast2.print_to_string().length ? ast2 : ast1;
        }
        (function(def) {
            AST_Node.DEFMETHOD("evaluate", function(compressor) {
                if (!compressor.option("evaluate")) return [ this ];
                try {
                    var val = this._eval(), ast = make_node_from_constant(compressor, val, this);
                    return [ best_of(ast, this), val ];
                } catch (ex) {
                    if (ex !== def) throw ex;
                    return [ this ];
                }
            });
            def(AST_Statement, function() {
                throw new Error(string_template("Cannot evaluate a statement [{file}:{line},{col}]", this.start));
            });
            def(AST_Function, function() {
                return [ this ];
            });
            function ev(node) {
                return node._eval();
            }
            def(AST_Node, function() {
                throw def;
            });
            def(AST_Constant, function() {
                return this.getValue();
            });
            def(AST_UnaryPrefix, function() {
                var e = this.expression;
                switch (this.operator) {
                  case "!":
                    return !ev(e);

                  case "typeof":
                    return typeof ev(e);

                  case "void":
                    return void ev(e);

                  case "~":
                    return ~ev(e);

                  case "-":
                    return -ev(e);

                  case "+":
                    return +ev(e);
                }
                throw def;
            });
            def(AST_Binary, function() {
                var left = this.left, right = this.right;
                switch (this.operator) {
                  case "&&":
                    return ev(left) && ev(right);

                  case "||":
                    return ev(left) || ev(right);

                  case "|":
                    return ev(left) | ev(right);

                  case "&":
                    return ev(left) & ev(right);

                  case "^":
                    return ev(left) ^ ev(right);

                  case "+":
                    return ev(left) + ev(right);

                  case "*":
                    return ev(left) * ev(right);

                  case "/":
                    return ev(left) / ev(right);

                  case "%":
                    return ev(left) % ev(right);

                  case "-":
                    return ev(left) - ev(right);

                  case "<<":
                    return ev(left) << ev(right);

                  case ">>":
                    return ev(left) >> ev(right);

                  case ">>>":
                    return ev(left) >>> ev(right);

                  case "==":
                    return ev(left) == ev(right);

                  case "===":
                    return ev(left) === ev(right);

                  case "!=":
                    return ev(left) != ev(right);

                  case "!==":
                    return ev(left) !== ev(right);

                  case "<":
                    return ev(left) < ev(right);

                  case "<=":
                    return ev(left) <= ev(right);

                  case ">":
                    return ev(left) > ev(right);

                  case ">=":
                    return ev(left) >= ev(right);

                  case "in":
                    return ev(left) in ev(right);

                  case "instanceof":
                    return ev(left) instanceof ev(right);
                }
                throw def;
            });
            def(AST_Conditional, function() {
                return ev(this.condition) ? ev(this.consequent) : ev(this.alternative);
            });
            def(AST_SymbolRef, function() {
                var d = this.definition();
                if (d && d.constant) {
                    var orig = d.orig[0];
                    if (orig) orig = orig.init[0];
                    orig = orig && orig.value;
                    if (orig) return ev(orig);
                }
                throw def;
            });
        })(function(node, func) {
            node.DEFMETHOD("_eval", func);
        });
        (function(def) {
            function basic_negation(exp) {
                return make_node(AST_UnaryPrefix, exp, {
                    operator: "!",
                    expression: exp
                });
            }
            def(AST_Node, function() {
                return basic_negation(this);
            });
            def(AST_Statement, function() {
                throw new Error("Cannot negate a statement");
            });
            def(AST_Function, function() {
                return basic_negation(this);
            });
            def(AST_UnaryPrefix, function() {
                if (this.operator == "!") return this.expression;
                return basic_negation(this);
            });
            def(AST_Seq, function(compressor) {
                var self = this.clone();
                self.cdr = self.cdr.negate(compressor);
                return self;
            });
            def(AST_Conditional, function(compressor) {
                var self = this.clone();
                self.consequent = self.consequent.negate(compressor);
                self.alternative = self.alternative.negate(compressor);
                return best_of(basic_negation(this), self);
            });
            def(AST_Binary, function(compressor) {
                var self = this.clone(), op = this.operator;
                if (compressor.option("unsafe_comps")) {
                    switch (op) {
                      case "<=":
                        self.operator = ">";
                        return self;

                      case "<":
                        self.operator = ">=";
                        return self;

                      case ">=":
                        self.operator = "<";
                        return self;

                      case ">":
                        self.operator = "<=";
                        return self;
                    }
                }
                switch (op) {
                  case "==":
                    self.operator = "!=";
                    return self;

                  case "!=":
                    self.operator = "==";
                    return self;

                  case "===":
                    self.operator = "!==";
                    return self;

                  case "!==":
                    self.operator = "===";
                    return self;

                  case "&&":
                    self.operator = "||";
                    self.left = self.left.negate(compressor);
                    self.right = self.right.negate(compressor);
                    return best_of(basic_negation(this), self);

                  case "||":
                    self.operator = "&&";
                    self.left = self.left.negate(compressor);
                    self.right = self.right.negate(compressor);
                    return best_of(basic_negation(this), self);
                }
                return basic_negation(this);
            });
        })(function(node, func) {
            node.DEFMETHOD("negate", function(compressor) {
                return func.call(this, compressor);
            });
        });
        (function(def) {
            def(AST_Node, function() {
                return true;
            });
            def(AST_EmptyStatement, function() {
                return false;
            });
            def(AST_Constant, function() {
                return false;
            });
            def(AST_This, function() {
                return false;
            });
            def(AST_Block, function() {
                for (var i = this.body.length; --i >= 0; ) {
                    if (this.body[i].has_side_effects()) return true;
                }
                return false;
            });
            def(AST_SimpleStatement, function() {
                return this.body.has_side_effects();
            });
            def(AST_Defun, function() {
                return true;
            });
            def(AST_Function, function() {
                return false;
            });
            def(AST_Binary, function() {
                return this.left.has_side_effects() || this.right.has_side_effects();
            });
            def(AST_Assign, function() {
                return true;
            });
            def(AST_Conditional, function() {
                return this.condition.has_side_effects() || this.consequent.has_side_effects() || this.alternative.has_side_effects();
            });
            def(AST_Unary, function() {
                return this.operator == "delete" || this.operator == "++" || this.operator == "--" || this.expression.has_side_effects();
            });
            def(AST_SymbolRef, function() {
                return false;
            });
            def(AST_Object, function() {
                for (var i = this.properties.length; --i >= 0; ) if (this.properties[i].has_side_effects()) return true;
                return false;
            });
            def(AST_ObjectProperty, function() {
                return this.value.has_side_effects();
            });
            def(AST_Array, function() {
                for (var i = this.elements.length; --i >= 0; ) if (this.elements[i].has_side_effects()) return true;
                return false;
            });
            def(AST_PropAccess, function() {
                return true;
            });
            def(AST_Seq, function() {
                return this.car.has_side_effects() || this.cdr.has_side_effects();
            });
        })(function(node, func) {
            node.DEFMETHOD("has_side_effects", func);
        });
        function aborts(thing) {
            return thing && thing.aborts();
        }
        (function(def) {
            def(AST_Statement, function() {
                return null;
            });
            def(AST_Jump, function() {
                return this;
            });
            function block_aborts() {
                var n = this.body.length;
                return n > 0 && aborts(this.body[n - 1]);
            }
            def(AST_BlockStatement, block_aborts);
            def(AST_SwitchBranch, block_aborts);
            def(AST_If, function() {
                return this.alternative && aborts(this.body) && aborts(this.alternative);
            });
        })(function(node, func) {
            node.DEFMETHOD("aborts", func);
        });
        OPT(AST_Directive, function(self, compressor) {
            if (self.scope.has_directive(self.value) !== self.scope) {
                return make_node(AST_EmptyStatement, self);
            }
            return self;
        });
        OPT(AST_Debugger, function(self, compressor) {
            if (compressor.option("drop_debugger")) return make_node(AST_EmptyStatement, self);
            return self;
        });
        OPT(AST_LabeledStatement, function(self, compressor) {
            if (self.body instanceof AST_Break && compressor.loopcontrol_target(self.body.label) === self.body) {
                return make_node(AST_EmptyStatement, self);
            }
            return self.label.references.length == 0 ? self.body : self;
        });
        OPT(AST_Block, function(self, compressor) {
            self.body = tighten_body(self.body, compressor);
            return self;
        });
        OPT(AST_BlockStatement, function(self, compressor) {
            self.body = tighten_body(self.body, compressor);
            switch (self.body.length) {
              case 1:
                return self.body[0];

              case 0:
                return make_node(AST_EmptyStatement, self);
            }
            return self;
        });
        AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
            var self = this;
            if (compressor.option("unused") && !(self instanceof AST_Toplevel) && !self.uses_eval) {
                var in_use = [];
                var initializations = new Dictionary();
                var scope = this;
                var tw = new TreeWalker(function(node, descend) {
                    if (node !== self) {
                        if (node instanceof AST_Defun) {
                            initializations.add(node.name.name, node);
                            return true;
                        }
                        if (node instanceof AST_Definitions && scope === self) {
                            node.definitions.forEach(function(def) {
                                if (def.value) {
                                    initializations.add(def.name.name, def.value);
                                    if (def.value.has_side_effects()) {
                                        def.value.walk(tw);
                                    }
                                }
                            });
                            return true;
                        }
                        if (node instanceof AST_SymbolRef) {
                            push_uniq(in_use, node.definition());
                            return true;
                        }
                        if (node instanceof AST_Scope) {
                            var save_scope = scope;
                            scope = node;
                            descend();
                            scope = save_scope;
                            return true;
                        }
                    }
                });
                self.walk(tw);
                for (var i = 0; i < in_use.length; ++i) {
                    in_use[i].orig.forEach(function(decl) {
                        var init = initializations.get(decl.name);
                        if (init) init.forEach(function(init) {
                            var tw = new TreeWalker(function(node) {
                                if (node instanceof AST_SymbolRef) {
                                    push_uniq(in_use, node.definition());
                                }
                            });
                            init.walk(tw);
                        });
                    });
                }
                var tt = new TreeTransformer(function before(node, descend, in_list) {
                    if (node instanceof AST_Lambda) {
                        for (var a = node.argnames, i = a.length; --i >= 0; ) {
                            var sym = a[i];
                            if (sym.unreferenced()) {
                                a.pop();
                                compressor.warn("Dropping unused function argument {name} [{file}:{line},{col}]", {
                                    name: sym.name,
                                    file: sym.start.file,
                                    line: sym.start.line,
                                    col: sym.start.col
                                });
                            } else break;
                        }
                    }
                    if (node instanceof AST_Defun && node !== self) {
                        if (!member(node.name.definition(), in_use)) {
                            compressor.warn("Dropping unused function {name} [{file}:{line},{col}]", {
                                name: node.name.name,
                                file: node.name.start.file,
                                line: node.name.start.line,
                                col: node.name.start.col
                            });
                            return make_node(AST_EmptyStatement, node);
                        }
                        return node;
                    }
                    if (node instanceof AST_Definitions && !(tt.parent() instanceof AST_ForIn)) {
                        var def = node.definitions.filter(function(def) {
                            if (member(def.name.definition(), in_use)) return true;
                            var w = {
                                name: def.name.name,
                                file: def.name.start.file,
                                line: def.name.start.line,
                                col: def.name.start.col
                            };
                            if (def.value && def.value.has_side_effects()) {
                                def._unused_side_effects = true;
                                compressor.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]", w);
                                return true;
                            }
                            compressor.warn("Dropping unused variable {name} [{file}:{line},{col}]", w);
                            return false;
                        });
                        def = mergeSort(def, function(a, b) {
                            if (!a.value && b.value) return -1;
                            if (!b.value && a.value) return 1;
                            return 0;
                        });
                        var side_effects = [];
                        for (var i = 0; i < def.length; ) {
                            var x = def[i];
                            if (x._unused_side_effects) {
                                side_effects.push(x.value);
                                def.splice(i, 1);
                            } else {
                                if (side_effects.length > 0) {
                                    side_effects.push(x.value);
                                    x.value = AST_Seq.from_array(side_effects);
                                    side_effects = [];
                                }
                                ++i;
                            }
                        }
                        if (side_effects.length > 0) {
                            side_effects = make_node(AST_BlockStatement, node, {
                                body: [ make_node(AST_SimpleStatement, node, {
                                    body: AST_Seq.from_array(side_effects)
                                }) ]
                            });
                        } else {
                            side_effects = null;
                        }
                        if (def.length == 0 && !side_effects) {
                            return make_node(AST_EmptyStatement, node);
                        }
                        if (def.length == 0) {
                            return side_effects;
                        }
                        node.definitions = def;
                        if (side_effects) {
                            side_effects.body.unshift(node);
                            node = side_effects;
                        }
                        return node;
                    }
                    if (node instanceof AST_For && node.init instanceof AST_BlockStatement) {
                        descend(node, this);
                        var body = node.init.body.slice(0, -1);
                        node.init = node.init.body.slice(-1)[0].body;
                        body.push(node);
                        return in_list ? MAP.splice(body) : make_node(AST_BlockStatement, node, {
                            body: body
                        });
                    }
                    if (node instanceof AST_Scope && node !== self) return node;
                });
                self.transform(tt);
            }
        });
        AST_Scope.DEFMETHOD("hoist_declarations", function(compressor) {
            var hoist_funs = compressor.option("hoist_funs");
            var hoist_vars = compressor.option("hoist_vars");
            var self = this;
            if (hoist_funs || hoist_vars) {
                var dirs = [];
                var hoisted = [];
                var vars = new Dictionary(), vars_found = 0, var_decl = 0;
                self.walk(new TreeWalker(function(node) {
                    if (node instanceof AST_Scope && node !== self) return true;
                    if (node instanceof AST_Var) {
                        ++var_decl;
                        return true;
                    }
                }));
                hoist_vars = hoist_vars && var_decl > 1;
                var tt = new TreeTransformer(function before(node) {
                    if (node !== self) {
                        if (node instanceof AST_Directive) {
                            dirs.push(node);
                            return make_node(AST_EmptyStatement, node);
                        }
                        if (node instanceof AST_Defun && hoist_funs) {
                            hoisted.push(node);
                            return make_node(AST_EmptyStatement, node);
                        }
                        if (node instanceof AST_Var && hoist_vars) {
                            node.definitions.forEach(function(def) {
                                vars.set(def.name.name, def);
                                ++vars_found;
                            });
                            var seq = node.to_assignments();
                            var p = tt.parent();
                            if (p instanceof AST_ForIn && p.init === node) {
                                if (seq == null) return node.definitions[0].name;
                                return seq;
                            }
                            if (p instanceof AST_For && p.init === node) {
                                return seq;
                            }
                            if (!seq) return make_node(AST_EmptyStatement, node);
                            return make_node(AST_SimpleStatement, node, {
                                body: seq
                            });
                        }
                        if (node instanceof AST_Scope) return node;
                    }
                });
                self = self.transform(tt);
                if (vars_found > 0) {
                    var defs = [];
                    vars.each(function(def, name) {
                        if (self instanceof AST_Lambda && find_if(function(x) {
                            return x.name == def.name.name;
                        }, self.argnames)) {
                            vars.del(name);
                        } else {
                            def = def.clone();
                            def.value = null;
                            defs.push(def);
                            vars.set(name, def);
                        }
                    });
                    if (defs.length > 0) {
                        for (var i = 0; i < self.body.length; ) {
                            if (self.body[i] instanceof AST_SimpleStatement) {
                                var expr = self.body[i].body, sym, assign;
                                if (expr instanceof AST_Assign && expr.operator == "=" && (sym = expr.left) instanceof AST_Symbol && vars.has(sym.name)) {
                                    var def = vars.get(sym.name);
                                    if (def.value) break;
                                    def.value = expr.right;
                                    remove(defs, def);
                                    defs.push(def);
                                    self.body.splice(i, 1);
                                    continue;
                                }
                                if (expr instanceof AST_Seq && (assign = expr.car) instanceof AST_Assign && assign.operator == "=" && (sym = assign.left) instanceof AST_Symbol && vars.has(sym.name)) {
                                    var def = vars.get(sym.name);
                                    if (def.value) break;
                                    def.value = assign.right;
                                    remove(defs, def);
                                    defs.push(def);
                                    self.body[i].body = expr.cdr;
                                    continue;
                                }
                            }
                            if (self.body[i] instanceof AST_EmptyStatement) {
                                self.body.splice(i, 1);
                                continue;
                            }
                            if (self.body[i] instanceof AST_BlockStatement) {
                                var tmp = [ i, 1 ].concat(self.body[i].body);
                                self.body.splice.apply(self.body, tmp);
                                continue;
                            }
                            break;
                        }
                        defs = make_node(AST_Var, self, {
                            definitions: defs
                        });
                        hoisted.push(defs);
                    }
                }
                self.body = dirs.concat(hoisted, self.body);
            }
            return self;
        });
        OPT(AST_SimpleStatement, function(self, compressor) {
            if (compressor.option("side_effects")) {
                if (!self.body.has_side_effects()) {
                    compressor.warn("Dropping side-effect-free statement [{file}:{line},{col}]", self.start);
                    return make_node(AST_EmptyStatement, self);
                }
            }
            return self;
        });
        OPT(AST_DWLoop, function(self, compressor) {
            var cond = self.condition.evaluate(compressor);
            self.condition = cond[0];
            if (!compressor.option("loops")) return self;
            if (cond.length > 1) {
                if (cond[1]) {
                    return make_node(AST_For, self, {
                        body: self.body
                    });
                } else if (self instanceof AST_While) {
                    if (compressor.option("dead_code")) {
                        var a = [];
                        extract_declarations_from_unreachable_code(compressor, self.body, a);
                        return make_node(AST_BlockStatement, self, {
                            body: a
                        });
                    }
                } else {
                    return self.body;
                }
            }
            return self;
        });
        function if_break_in_loop(self, compressor) {
            function drop_it(rest) {
                rest = as_statement_array(rest);
                if (self.body instanceof AST_BlockStatement) {
                    self.body = self.body.clone();
                    self.body.body = rest.concat(self.body.body.slice(1));
                    self.body = self.body.transform(compressor);
                } else {
                    self.body = make_node(AST_BlockStatement, self.body, {
                        body: rest
                    }).transform(compressor);
                }
                if_break_in_loop(self, compressor);
            }
            var first = self.body instanceof AST_BlockStatement ? self.body.body[0] : self.body;
            if (first instanceof AST_If) {
                if (first.body instanceof AST_Break && compressor.loopcontrol_target(first.body.label) === self) {
                    if (self.condition) {
                        self.condition = make_node(AST_Binary, self.condition, {
                            left: self.condition,
                            operator: "&&",
                            right: first.condition.negate(compressor)
                        });
                    } else {
                        self.condition = first.condition.negate(compressor);
                    }
                    drop_it(first.alternative);
                } else if (first.alternative instanceof AST_Break && compressor.loopcontrol_target(first.alternative.label) === self) {
                    if (self.condition) {
                        self.condition = make_node(AST_Binary, self.condition, {
                            left: self.condition,
                            operator: "&&",
                            right: first.condition
                        });
                    } else {
                        self.condition = first.condition;
                    }
                    drop_it(first.body);
                }
            }
        }
        OPT(AST_While, function(self, compressor) {
            if (!compressor.option("loops")) return self;
            self = AST_DWLoop.prototype.optimize.call(self, compressor);
            if (self instanceof AST_While) {
                if_break_in_loop(self, compressor);
                self = make_node(AST_For, self, self).transform(compressor);
            }
            return self;
        });
        OPT(AST_For, function(self, compressor) {
            var cond = self.condition;
            if (cond) {
                cond = cond.evaluate(compressor);
                self.condition = cond[0];
            }
            if (!compressor.option("loops")) return self;
            if (cond) {
                if (cond.length > 1 && !cond[1]) {
                    if (compressor.option("dead_code")) {
                        var a = [];
                        if (self.init instanceof AST_Statement) {
                            a.push(self.init);
                        } else if (self.init) {
                            a.push(make_node(AST_SimpleStatement, self.init, {
                                body: self.init
                            }));
                        }
                        extract_declarations_from_unreachable_code(compressor, self.body, a);
                        return make_node(AST_BlockStatement, self, {
                            body: a
                        });
                    }
                }
            }
            if_break_in_loop(self, compressor);
            return self;
        });
        OPT(AST_If, function(self, compressor) {
            if (!compressor.option("conditionals")) return self;
            var cond = self.condition.evaluate(compressor);
            self.condition = cond[0];
            if (cond.length > 1) {
                if (cond[1]) {
                    compressor.warn("Condition always true [{file}:{line},{col}]", self.condition.start);
                    if (compressor.option("dead_code")) {
                        var a = [];
                        if (self.alternative) {
                            extract_declarations_from_unreachable_code(compressor, self.alternative, a);
                        }
                        a.push(self.body);
                        return make_node(AST_BlockStatement, self, {
                            body: a
                        }).transform(compressor);
                    }
                } else {
                    compressor.warn("Condition always false [{file}:{line},{col}]", self.condition.start);
                    if (compressor.option("dead_code")) {
                        var a = [];
                        extract_declarations_from_unreachable_code(compressor, self.body, a);
                        if (self.alternative) a.push(self.alternative);
                        return make_node(AST_BlockStatement, self, {
                            body: a
                        }).transform(compressor);
                    }
                }
            }
            if (is_empty(self.alternative)) self.alternative = null;
            var negated = self.condition.negate(compressor);
            var negated_is_best = best_of(self.condition, negated) === negated;
            if (self.alternative && negated_is_best) {
                negated_is_best = false;
                self.condition = negated;
                var tmp = self.body;
                self.body = self.alternative || make_node(AST_EmptyStatement);
                self.alternative = tmp;
            }
            if (is_empty(self.body) && is_empty(self.alternative)) {
                return make_node(AST_SimpleStatement, self.condition, {
                    body: self.condition
                }).transform(compressor);
            }
            if (self.body instanceof AST_SimpleStatement && self.alternative instanceof AST_SimpleStatement) {
                return make_node(AST_SimpleStatement, self, {
                    body: make_node(AST_Conditional, self, {
                        condition: self.condition,
                        consequent: self.body.body,
                        alternative: self.alternative.body
                    })
                }).transform(compressor);
            }
            if (is_empty(self.alternative) && self.body instanceof AST_SimpleStatement) {
                if (negated_is_best) return make_node(AST_SimpleStatement, self, {
                    body: make_node(AST_Binary, self, {
                        operator: "||",
                        left: negated,
                        right: self.body.body
                    })
                }).transform(compressor);
                return make_node(AST_SimpleStatement, self, {
                    body: make_node(AST_Binary, self, {
                        operator: "&&",
                        left: self.condition,
                        right: self.body.body
                    })
                }).transform(compressor);
            }
            if (self.body instanceof AST_EmptyStatement && self.alternative && self.alternative instanceof AST_SimpleStatement) {
                return make_node(AST_SimpleStatement, self, {
                    body: make_node(AST_Binary, self, {
                        operator: "||",
                        left: self.condition,
                        right: self.alternative.body
                    })
                }).transform(compressor);
            }
            if (self.body instanceof AST_Exit && self.alternative instanceof AST_Exit && self.body.TYPE == self.alternative.TYPE) {
                return make_node(self.body.CTOR, self, {
                    value: make_node(AST_Conditional, self, {
                        condition: self.condition,
                        consequent: self.body.value || make_node(AST_Undefined, self.body).optimize(compressor),
                        alternative: self.alternative.value || make_node(AST_Undefined, self.alternative).optimize(compressor)
                    })
                }).transform(compressor);
            }
            if (self.body instanceof AST_If && !self.body.alternative && !self.alternative) {
                self.condition = make_node(AST_Binary, self.condition, {
                    operator: "&&",
                    left: self.condition,
                    right: self.body.condition
                }).transform(compressor);
                self.body = self.body.body;
            }
            if (aborts(self.body)) {
                if (self.alternative) {
                    var alt = self.alternative;
                    self.alternative = null;
                    return make_node(AST_BlockStatement, self, {
                        body: [ self, alt ]
                    }).transform(compressor);
                }
            }
            if (aborts(self.alternative)) {
                var body = self.body;
                self.body = self.alternative;
                self.condition = negated_is_best ? negated : self.condition.negate(compressor);
                self.alternative = null;
                return make_node(AST_BlockStatement, self, {
                    body: [ self, body ]
                }).transform(compressor);
            }
            return self;
        });
        OPT(AST_Switch, function(self, compressor) {
            if (self.body.length == 0 && compressor.option("conditionals")) {
                return make_node(AST_SimpleStatement, self, {
                    body: self.expression
                }).transform(compressor);
            }
            var last_branch = self.body[self.body.length - 1];
            if (last_branch) {
                var stat = last_branch.body[last_branch.body.length - 1];
                if (stat instanceof AST_Break && loop_body(compressor.loopcontrol_target(stat.label)) === self) last_branch.body.pop();
            }
            var exp = self.expression.evaluate(compressor);
            out: if (exp.length == 2) try {
                self.expression = exp[0];
                if (!compressor.option("dead_code")) break out;
                var value = exp[1];
                var in_if = false;
                var in_block = false;
                var started = false;
                var stopped = false;
                var ruined = false;
                var tt = new TreeTransformer(function(node, descend, in_list) {
                    if (node instanceof AST_Lambda || node instanceof AST_SimpleStatement) {
                        return node;
                    } else if (node instanceof AST_Switch && node === self) {
                        node = node.clone();
                        descend(node, this);
                        return ruined ? node : make_node(AST_BlockStatement, node, {
                            body: node.body.reduce(function(a, branch) {
                                return a.concat(branch.body);
                            }, [])
                        }).transform(compressor);
                    } else if (node instanceof AST_If || node instanceof AST_Try) {
                        var save = in_if;
                        in_if = !in_block;
                        descend(node, this);
                        in_if = save;
                        return node;
                    } else if (node instanceof AST_StatementWithBody || node instanceof AST_Switch) {
                        var save = in_block;
                        in_block = true;
                        descend(node, this);
                        in_block = save;
                        return node;
                    } else if (node instanceof AST_Break && this.loopcontrol_target(node.label) === self) {
                        if (in_if) {
                            ruined = true;
                            return node;
                        }
                        if (in_block) return node;
                        stopped = true;
                        return in_list ? MAP.skip : make_node(AST_EmptyStatement, node);
                    } else if (node instanceof AST_SwitchBranch && this.parent() === self) {
                        if (stopped) return MAP.skip;
                        if (node instanceof AST_Case) {
                            var exp = node.expression.evaluate(compressor);
                            if (exp.length < 2) {
                                throw self;
                            }
                            if (exp[1] === value || started) {
                                started = true;
                                if (aborts(node)) stopped = true;
                                descend(node, this);
                                return node;
                            }
                            return MAP.skip;
                        }
                        descend(node, this);
                        return node;
                    }
                });
                tt.stack = compressor.stack.slice();
                self = self.transform(tt);
            } catch (ex) {
                if (ex !== self) throw ex;
            }
            return self;
        });
        OPT(AST_Case, function(self, compressor) {
            self.body = tighten_body(self.body, compressor);
            return self;
        });
        OPT(AST_Try, function(self, compressor) {
            self.body = tighten_body(self.body, compressor);
            return self;
        });
        AST_Definitions.DEFMETHOD("remove_initializers", function() {
            this.definitions.forEach(function(def) {
                def.value = null;
            });
        });
        AST_Definitions.DEFMETHOD("to_assignments", function() {
            var assignments = this.definitions.reduce(function(a, def) {
                if (def.value) {
                    var name = make_node(AST_SymbolRef, def.name, def.name);
                    a.push(make_node(AST_Assign, def, {
                        operator: "=",
                        left: name,
                        right: def.value
                    }));
                }
                return a;
            }, []);
            if (assignments.length == 0) return null;
            return AST_Seq.from_array(assignments);
        });
        OPT(AST_Definitions, function(self, compressor) {
            if (self.definitions.length == 0) return make_node(AST_EmptyStatement, self);
            return self;
        });
        OPT(AST_Function, function(self, compressor) {
            self = AST_Lambda.prototype.optimize.call(self, compressor);
            if (compressor.option("unused")) {
                if (self.name && self.name.unreferenced()) {
                    self.name = null;
                }
            }
            return self;
        });
        OPT(AST_Call, function(self, compressor) {
            if (compressor.option("unsafe")) {
                var exp = self.expression;
                if (exp instanceof AST_SymbolRef && exp.undeclared()) {
                    switch (exp.name) {
                      case "Array":
                        if (self.args.length != 1) {
                            return make_node(AST_Array, self, {
                                elements: self.args
                            });
                        }
                        break;

                      case "Object":
                        if (self.args.length == 0) {
                            return make_node(AST_Object, self, {
                                properties: []
                            });
                        }
                        break;

                      case "String":
                        return make_node(AST_Binary, self, {
                            left: self.args[0],
                            operator: "+",
                            right: make_node(AST_String, self, {
                                value: ""
                            })
                        });
                    }
                } else if (exp instanceof AST_Dot && exp.property == "toString" && self.args.length == 0) {
                    return make_node(AST_Binary, self, {
                        left: make_node(AST_String, self, {
                            value: ""
                        }),
                        operator: "+",
                        right: exp.expression
                    }).transform(compressor);
                }
            }
            if (compressor.option("side_effects")) {
                if (self.expression instanceof AST_Function && self.args.length == 0 && !AST_Block.prototype.has_side_effects.call(self.expression)) {
                    return make_node(AST_Undefined, self).transform(compressor);
                }
            }
            return self;
        });
        OPT(AST_New, function(self, compressor) {
            if (compressor.option("unsafe")) {
                var exp = self.expression;
                if (exp instanceof AST_SymbolRef && exp.undeclared()) {
                    switch (exp.name) {
                      case "Object":
                      case "RegExp":
                      case "Function":
                      case "Error":
                      case "Array":
                        return make_node(AST_Call, self, self).transform(compressor);
                    }
                }
            }
            return self;
        });
        OPT(AST_Seq, function(self, compressor) {
            if (!compressor.option("side_effects")) return self;
            if (!self.car.has_side_effects()) {
                var p;
                if (!(self.cdr instanceof AST_SymbolRef && self.cdr.name == "eval" && self.cdr.undeclared() && (p = compressor.parent()) instanceof AST_Call && p.expression === self)) {
                    return self.cdr;
                }
            }
            if (compressor.option("cascade")) {
                if (self.car instanceof AST_Assign && !self.car.left.has_side_effects() && self.car.left.equivalent_to(self.cdr)) {
                    return self.car;
                }
                if (!self.car.has_side_effects() && !self.cdr.has_side_effects() && self.car.equivalent_to(self.cdr)) {
                    return self.car;
                }
            }
            return self;
        });
        AST_Unary.DEFMETHOD("lift_sequences", function(compressor) {
            if (compressor.option("sequences")) {
                if (this.expression instanceof AST_Seq) {
                    var seq = this.expression;
                    var x = seq.to_array();
                    this.expression = x.pop();
                    x.push(this);
                    seq = AST_Seq.from_array(x).transform(compressor);
                    return seq;
                }
            }
            return this;
        });
        OPT(AST_UnaryPostfix, function(self, compressor) {
            return self.lift_sequences(compressor);
        });
        OPT(AST_UnaryPrefix, function(self, compressor) {
            self = self.lift_sequences(compressor);
            var e = self.expression;
            if (compressor.option("booleans") && compressor.in_boolean_context()) {
                switch (self.operator) {
                  case "!":
                    if (e instanceof AST_UnaryPrefix && e.operator == "!") {
                        return e.expression;
                    }
                    break;

                  case "typeof":
                    compressor.warn("Boolean expression always true [{file}:{line},{col}]", self.start);
                    return make_node(AST_True, self);
                }
                if (e instanceof AST_Binary && self.operator == "!") {
                    self = best_of(self, e.negate(compressor));
                }
            }
            return self.evaluate(compressor)[0];
        });
        AST_Binary.DEFMETHOD("lift_sequences", function(compressor) {
            if (compressor.option("sequences")) {
                if (this.left instanceof AST_Seq) {
                    var seq = this.left;
                    var x = seq.to_array();
                    this.left = x.pop();
                    x.push(this);
                    seq = AST_Seq.from_array(x).transform(compressor);
                    return seq;
                }
                if (this.right instanceof AST_Seq && !(this.operator == "||" || this.operator == "&&") && !this.left.has_side_effects()) {
                    var seq = this.right;
                    var x = seq.to_array();
                    this.right = x.pop();
                    x.push(this);
                    seq = AST_Seq.from_array(x).transform(compressor);
                    return seq;
                }
            }
            return this;
        });
        var commutativeOperators = makePredicate("== === != !== * & | ^");
        OPT(AST_Binary, function(self, compressor) {
            function reverse(op) {
                if (!(self.left.has_side_effects() && self.right.has_side_effects())) {
                    if (op) self.operator = op;
                    var tmp = self.left;
                    self.left = self.right;
                    self.right = tmp;
                }
            }
            if (commutativeOperators(self.operator)) {
                if (self.right instanceof AST_Constant && !(self.left instanceof AST_Constant)) {
                    reverse();
                }
            }
            self = self.lift_sequences(compressor);
            if (compressor.option("comparisons")) switch (self.operator) {
              case "===":
              case "!==":
                if (self.left.is_string(compressor) && self.right.is_string(compressor) || self.left.is_boolean() && self.right.is_boolean()) {
                    self.operator = self.operator.substr(0, 2);
                }

              case "==":
              case "!=":
                if (self.left instanceof AST_String && self.left.value == "undefined" && self.right instanceof AST_UnaryPrefix && self.right.operator == "typeof") {
                    if (!(self.right.expression instanceof AST_SymbolRef) || !self.right.expression.undeclared()) {
                        self.left = self.right.expression;
                        self.right = make_node(AST_Undefined, self.left).optimize(compressor);
                        if (self.operator.length == 2) self.operator += "=";
                    }
                }
                break;
            }
            if (compressor.option("booleans") && compressor.in_boolean_context()) switch (self.operator) {
              case "&&":
                var ll = self.left.evaluate(compressor);
                var rr = self.right.evaluate(compressor);
                if (ll.length > 1 && !ll[1] || rr.length > 1 && !rr[1]) {
                    compressor.warn("Boolean && always false [{file}:{line},{col}]", self.start);
                    return make_node(AST_False, self);
                }
                if (ll.length > 1 && ll[1]) {
                    return rr[0];
                }
                if (rr.length > 1 && rr[1]) {
                    return ll[0];
                }
                break;

              case "||":
                var ll = self.left.evaluate(compressor);
                var rr = self.right.evaluate(compressor);
                if (ll.length > 1 && ll[1] || rr.length > 1 && rr[1]) {
                    compressor.warn("Boolean || always true [{file}:{line},{col}]", self.start);
                    return make_node(AST_True, self);
                }
                if (ll.length > 1 && !ll[1]) {
                    return rr[0];
                }
                if (rr.length > 1 && !rr[1]) {
                    return ll[0];
                }
                break;

              case "+":
                var ll = self.left.evaluate(compressor);
                var rr = self.right.evaluate(compressor);
                if (ll.length > 1 && ll[0] instanceof AST_String && ll[1] || rr.length > 1 && rr[0] instanceof AST_String && rr[1]) {
                    compressor.warn("+ in boolean context always true [{file}:{line},{col}]", self.start);
                    return make_node(AST_True, self);
                }
                break;
            }
            var exp = self.evaluate(compressor);
            if (exp.length > 1) {
                if (best_of(exp[0], self) !== self) return exp[0];
            }
            if (compressor.option("comparisons")) {
                if (!(compressor.parent() instanceof AST_Binary) || compressor.parent() instanceof AST_Assign) {
                    var negated = make_node(AST_UnaryPrefix, self, {
                        operator: "!",
                        expression: self.negate(compressor)
                    });
                    self = best_of(self, negated);
                }
                switch (self.operator) {
                  case "<":
                    reverse(">");
                    break;

                  case "<=":
                    reverse(">=");
                    break;
                }
            }
            if (self.operator == "+" && self.right instanceof AST_String && self.right.getValue() === "" && self.left instanceof AST_Binary && self.left.operator == "+" && self.left.is_string(compressor)) {
                return self.left;
            }
            return self;
        });
        OPT(AST_SymbolRef, function(self, compressor) {
            if (self.undeclared()) {
                var defines = compressor.option("global_defs");
                if (defines && defines.hasOwnProperty(self.name)) {
                    return make_node_from_constant(compressor, defines[self.name], self);
                }
                switch (self.name) {
                  case "undefined":
                    return make_node(AST_Undefined, self);

                  case "NaN":
                    return make_node(AST_NaN, self);

                  case "Infinity":
                    return make_node(AST_Infinity, self);
                }
            }
            return self;
        });
        OPT(AST_Undefined, function(self, compressor) {
            if (compressor.option("unsafe")) {
                var scope = compressor.find_parent(AST_Scope);
                var undef = scope.find_variable("undefined");
                if (undef) {
                    var ref = make_node(AST_SymbolRef, self, {
                        name: "undefined",
                        scope: scope,
                        thedef: undef
                    });
                    ref.reference();
                    return ref;
                }
            }
            return self;
        });
        var ASSIGN_OPS = [ "+", "-", "/", "*", "%", ">>", "<<", ">>>", "|", "^", "&" ];
        OPT(AST_Assign, function(self, compressor) {
            self = self.lift_sequences(compressor);
            if (self.operator == "=" && self.left instanceof AST_SymbolRef && self.right instanceof AST_Binary && self.right.left instanceof AST_SymbolRef && self.right.left.name == self.left.name && member(self.right.operator, ASSIGN_OPS)) {
                self.operator = self.right.operator + "=";
                self.right = self.right.right;
            }
            return self;
        });
        OPT(AST_Conditional, function(self, compressor) {
            if (!compressor.option("conditionals")) return self;
            if (self.condition instanceof AST_Seq) {
                var car = self.condition.car;
                self.condition = self.condition.cdr;
                return AST_Seq.cons(car, self);
            }
            var cond = self.condition.evaluate(compressor);
            if (cond.length > 1) {
                if (cond[1]) {
                    compressor.warn("Condition always true [{file}:{line},{col}]", self.start);
                    return self.consequent;
                } else {
                    compressor.warn("Condition always false [{file}:{line},{col}]", self.start);
                    return self.alternative;
                }
            }
            var negated = cond[0].negate(compressor);
            if (best_of(cond[0], negated) === negated) {
                self = make_node(AST_Conditional, self, {
                    condition: negated,
                    consequent: self.alternative,
                    alternative: self.consequent
                });
            }
            var consequent = self.consequent;
            var alternative = self.alternative;
            if (consequent instanceof AST_Assign && alternative instanceof AST_Assign && consequent.operator == alternative.operator && consequent.left.equivalent_to(alternative.left)) {
                self = make_node(AST_Assign, self, {
                    operator: consequent.operator,
                    left: consequent.left,
                    right: make_node(AST_Conditional, self, {
                        condition: self.condition,
                        consequent: consequent.right,
                        alternative: alternative.right
                    })
                });
            }
            return self;
        });
        OPT(AST_Boolean, function(self, compressor) {
            if (compressor.option("booleans")) {
                var p = compressor.parent();
                if (p instanceof AST_Binary && (p.operator == "==" || p.operator == "!=")) {
                    compressor.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]", {
                        operator: p.operator,
                        value: self.value,
                        file: p.start.file,
                        line: p.start.line,
                        col: p.start.col
                    });
                    return make_node(AST_Number, self, {
                        value: +self.value
                    });
                }
                return make_node(AST_UnaryPrefix, self, {
                    operator: "!",
                    expression: make_node(AST_Number, self, {
                        value: 1 - self.value
                    })
                });
            }
            return self;
        });
        OPT(AST_Sub, function(self, compressor) {
            var prop = self.property;
            if (prop instanceof AST_String && compressor.option("properties")) {
                prop = prop.getValue();
                if (is_identifier(prop)) {
                    return make_node(AST_Dot, self, {
                        expression: self.expression,
                        property: prop
                    });
                }
            }
            return self;
        });
        function literals_in_boolean_context(self, compressor) {
            if (compressor.option("booleans") && compressor.in_boolean_context()) {
                return make_node(AST_True, self);
            }
            return self;
        }
        OPT(AST_Array, literals_in_boolean_context);
        OPT(AST_Object, literals_in_boolean_context);
        OPT(AST_RegExp, literals_in_boolean_context);
    })();
    "use strict";
    function SourceMap(options) {
        options = defaults(options, {
            file: null,
            root: null,
            orig: null
        });
        var generator = new MOZ_SourceMap.SourceMapGenerator({
            file: options.file,
            sourceRoot: options.root
        });
        var orig_map = options.orig && new MOZ_SourceMap.SourceMapConsumer(options.orig);
        function add(source, gen_line, gen_col, orig_line, orig_col, name) {
            if (orig_map) {
                var info = orig_map.originalPositionFor({
                    line: orig_line,
                    column: orig_col
                });
                source = info.source;
                orig_line = info.line;
                orig_col = info.column;
                name = info.name;
            }
            generator.addMapping({
                generated: {
                    line: gen_line,
                    column: gen_col
                },
                original: {
                    line: orig_line,
                    column: orig_col
                },
                source: source,
                name: name
            });
        }
        return {
            add: add,
            get: function() {
                return generator;
            },
            toString: function() {
                return generator.toString();
            }
        };
    }
    "use strict";
    (function() {
        var MOZ_TO_ME = {
            TryStatement: function(M) {
                return new AST_Try({
                    start: my_start_token(M),
                    end: my_end_token(M),
                    body: from_moz(M.block).body,
                    bcatch: from_moz(M.handlers[0]),
                    bfinally: M.finalizer ? new AST_Finally(from_moz(M.finalizer)) : null
                });
            },
            CatchClause: function(M) {
                return new AST_Catch({
                    start: my_start_token(M),
                    end: my_end_token(M),
                    argname: from_moz(M.param),
                    body: from_moz(M.body).body
                });
            },
            ObjectExpression: function(M) {
                return new AST_Object({
                    start: my_start_token(M),
                    end: my_end_token(M),
                    properties: M.properties.map(function(prop) {
                        var key = prop.key;
                        var name = key.type == "Identifier" ? key.name : key.value;
                        var args = {
                            start: my_start_token(key),
                            end: my_end_token(prop.value),
                            key: name,
                            value: from_moz(prop.value)
                        };
                        switch (prop.kind) {
                          case "init":
                            return new AST_ObjectKeyVal(args);

                          case "set":
                            args.value.name = from_moz(key);
                            return new AST_ObjectSetter(args);

                          case "get":
                            args.value.name = from_moz(key);
                            return new AST_ObjectGetter(args);
                        }
                    })
                });
            },
            SequenceExpression: function(M) {
                return AST_Seq.from_array(M.expressions.map(from_moz));
            },
            MemberExpression: function(M) {
                return new (M.computed ? AST_Sub : AST_Dot)({
                    start: my_start_token(M),
                    end: my_end_token(M),
                    property: M.computed ? from_moz(M.property) : M.property.name,
                    expression: from_moz(M.object)
                });
            },
            SwitchCase: function(M) {
                return new (M.test ? AST_Case : AST_Default)({
                    start: my_start_token(M),
                    end: my_end_token(M),
                    expression: from_moz(M.test),
                    body: M.consequent.map(from_moz)
                });
            },
            Literal: function(M) {
                var val = M.value, args = {
                    start: my_start_token(M),
                    end: my_end_token(M)
                };
                if (val === null) return new AST_Null(args);
                switch (typeof val) {
                  case "string":
                    args.value = val;
                    return new AST_String(args);

                  case "number":
                    args.value = val;
                    return new AST_Number(args);

                  case "boolean":
                    return new (val ? AST_True : AST_False)(args);

                  default:
                    args.value = val;
                    return new AST_RegExp(args);
                }
            },
            UnaryExpression: From_Moz_Unary,
            UpdateExpression: From_Moz_Unary,
            Identifier: function(M) {
                var p = FROM_MOZ_STACK[FROM_MOZ_STACK.length - 2];
                return new (M.name == "this" ? AST_This : p.type == "LabeledStatement" ? AST_Label : p.type == "VariableDeclarator" && p.id === M ? p.kind == "const" ? AST_SymbolConst : AST_SymbolVar : p.type == "FunctionExpression" ? p.id === M ? AST_SymbolLambda : AST_SymbolFunarg : p.type == "FunctionDeclaration" ? p.id === M ? AST_SymbolDefun : AST_SymbolFunarg : p.type == "CatchClause" ? AST_SymbolCatch : p.type == "BreakStatement" || p.type == "ContinueStatement" ? AST_LabelRef : AST_SymbolRef)({
                    start: my_start_token(M),
                    end: my_end_token(M),
                    name: M.name
                });
            }
        };
        function From_Moz_Unary(M) {
            return new (M.prefix ? AST_UnaryPrefix : AST_UnaryPostfix)({
                start: my_start_token(M),
                end: my_end_token(M),
                operator: M.operator,
                expression: from_moz(M.argument)
            });
        }
        var ME_TO_MOZ = {};
        map("Node", AST_Node);
        map("Program", AST_Toplevel, "body@body");
        map("Function", AST_Function, "id>name, params@argnames, body%body");
        map("EmptyStatement", AST_EmptyStatement);
        map("BlockStatement", AST_BlockStatement, "body@body");
        map("ExpressionStatement", AST_SimpleStatement, "expression>body");
        map("IfStatement", AST_If, "test>condition, consequent>body, alternate>alternative");
        map("LabeledStatement", AST_LabeledStatement, "label>label, body>body");
        map("BreakStatement", AST_Break, "label>label");
        map("ContinueStatement", AST_Continue, "label>label");
        map("WithStatement", AST_With, "object>expression, body>body");
        map("SwitchStatement", AST_Switch, "discriminant>expression, cases@body");
        map("ReturnStatement", AST_Return, "argument>value");
        map("ThrowStatement", AST_Throw, "argument>value");
        map("WhileStatement", AST_While, "test>condition, body>body");
        map("DoWhileStatement", AST_Do, "test>condition, body>body");
        map("ForStatement", AST_For, "init>init, test>condition, update>step, body>body");
        map("ForInStatement", AST_ForIn, "left>init, right>object, body>body");
        map("DebuggerStatement", AST_Debugger);
        map("FunctionDeclaration", AST_Defun, "id>name, params@argnames, body%body");
        map("VariableDeclaration", AST_Var, "declarations@definitions");
        map("VariableDeclarator", AST_VarDef, "id>name, init>value");
        map("ThisExpression", AST_This);
        map("ArrayExpression", AST_Array, "elements@elements");
        map("FunctionExpression", AST_Function, "id>name, params@argnames, body%body");
        map("BinaryExpression", AST_Binary, "operator=operator, left>left, right>right");
        map("AssignmentExpression", AST_Assign, "operator=operator, left>left, right>right");
        map("LogicalExpression", AST_Binary, "operator=operator, left>left, right>right");
        map("ConditionalExpression", AST_Conditional, "test>condition, consequent>consequent, alternate>alternative");
        map("NewExpression", AST_New, "callee>expression, arguments@args");
        map("CallExpression", AST_Call, "callee>expression, arguments@args");
        function my_start_token(moznode) {
            return new AST_Token({
                file: moznode.loc && moznode.loc.source,
                line: moznode.loc && moznode.loc.start.line,
                col: moznode.loc && moznode.loc.start.column,
                pos: moznode.start,
                endpos: moznode.start
            });
        }
        function my_end_token(moznode) {
            return new AST_Token({
                file: moznode.loc && moznode.loc.source,
                line: moznode.loc && moznode.loc.end.line,
                col: moznode.loc && moznode.loc.end.column,
                pos: moznode.end,
                endpos: moznode.end
            });
        }
        function map(moztype, mytype, propmap) {
            var moz_to_me = "function From_Moz_" + moztype + "(M){\n";
            moz_to_me += "return new mytype({\n" + "start: my_start_token(M),\n" + "end: my_end_token(M)";
            if (propmap) propmap.split(/\s*,\s*/).forEach(function(prop) {
                var m = /([a-z0-9$_]+)(=|@|>|%)([a-z0-9$_]+)/i.exec(prop);
                if (!m) throw new Error("Can't understand property map: " + prop);
                var moz = "M." + m[1], how = m[2], my = m[3];
                moz_to_me += ",\n" + my + ": ";
                if (how == "@") {
                    moz_to_me += moz + ".map(from_moz)";
                } else if (how == ">") {
                    moz_to_me += "from_moz(" + moz + ")";
                } else if (how == "=") {
                    moz_to_me += moz;
                } else if (how == "%") {
                    moz_to_me += "from_moz(" + moz + ").body";
                } else throw new Error("Can't understand operator in propmap: " + prop);
            });
            moz_to_me += "\n})}";
            moz_to_me = new Function("mytype", "my_start_token", "my_end_token", "from_moz", "return(" + moz_to_me + ")")(mytype, my_start_token, my_end_token, from_moz);
            return MOZ_TO_ME[moztype] = moz_to_me;
        }
        var FROM_MOZ_STACK = null;
        function from_moz(node) {
            FROM_MOZ_STACK.push(node);
            var ret = node != null ? MOZ_TO_ME[node.type](node) : null;
            FROM_MOZ_STACK.pop();
            return ret;
        }
        AST_Node.from_mozilla_ast = function(node) {
            var save_stack = FROM_MOZ_STACK;
            FROM_MOZ_STACK = [];
            var ast = from_moz(node);
            FROM_MOZ_STACK = save_stack;
            return ast;
        };
    })();
    exports["array_to_hash"] = array_to_hash;
    exports["slice"] = slice;
    exports["characters"] = characters;
    exports["member"] = member;
    exports["find_if"] = find_if;
    exports["repeat_string"] = repeat_string;
    exports["DefaultsError"] = DefaultsError;
    exports["defaults"] = defaults;
    exports["merge"] = merge;
    exports["noop"] = noop;
    exports["MAP"] = MAP;
    exports["push_uniq"] = push_uniq;
    exports["string_template"] = string_template;
    exports["remove"] = remove;
    exports["mergeSort"] = mergeSort;
    exports["set_difference"] = set_difference;
    exports["set_intersection"] = set_intersection;
    exports["makePredicate"] = makePredicate;
    exports["Dictionary"] = Dictionary;
    exports["DEFNODE"] = DEFNODE;
    exports["AST_Token"] = AST_Token;
    exports["AST_Node"] = AST_Node;
    exports["AST_Statement"] = AST_Statement;
    exports["AST_Debugger"] = AST_Debugger;
    exports["AST_Directive"] = AST_Directive;
    exports["AST_SimpleStatement"] = AST_SimpleStatement;
    exports["walk_body"] = walk_body;
    exports["AST_Block"] = AST_Block;
    exports["AST_BlockStatement"] = AST_BlockStatement;
    exports["AST_EmptyStatement"] = AST_EmptyStatement;
    exports["AST_StatementWithBody"] = AST_StatementWithBody;
    exports["AST_LabeledStatement"] = AST_LabeledStatement;
    exports["AST_DWLoop"] = AST_DWLoop;
    exports["AST_Do"] = AST_Do;
    exports["AST_While"] = AST_While;
    exports["AST_For"] = AST_For;
    exports["AST_ForIn"] = AST_ForIn;
    exports["AST_With"] = AST_With;
    exports["AST_Scope"] = AST_Scope;
    exports["AST_Toplevel"] = AST_Toplevel;
    exports["AST_Lambda"] = AST_Lambda;
    exports["AST_Accessor"] = AST_Accessor;
    exports["AST_Function"] = AST_Function;
    exports["AST_Defun"] = AST_Defun;
    exports["AST_Jump"] = AST_Jump;
    exports["AST_Exit"] = AST_Exit;
    exports["AST_Return"] = AST_Return;
    exports["AST_Throw"] = AST_Throw;
    exports["AST_LoopControl"] = AST_LoopControl;
    exports["AST_Break"] = AST_Break;
    exports["AST_Continue"] = AST_Continue;
    exports["AST_If"] = AST_If;
    exports["AST_Switch"] = AST_Switch;
    exports["AST_SwitchBranch"] = AST_SwitchBranch;
    exports["AST_Default"] = AST_Default;
    exports["AST_Case"] = AST_Case;
    exports["AST_Try"] = AST_Try;
    exports["AST_Catch"] = AST_Catch;
    exports["AST_Finally"] = AST_Finally;
    exports["AST_Definitions"] = AST_Definitions;
    exports["AST_Var"] = AST_Var;
    exports["AST_Const"] = AST_Const;
    exports["AST_VarDef"] = AST_VarDef;
    exports["AST_Call"] = AST_Call;
    exports["AST_New"] = AST_New;
    exports["AST_Seq"] = AST_Seq;
    exports["AST_PropAccess"] = AST_PropAccess;
    exports["AST_Dot"] = AST_Dot;
    exports["AST_Sub"] = AST_Sub;
    exports["AST_Unary"] = AST_Unary;
    exports["AST_UnaryPrefix"] = AST_UnaryPrefix;
    exports["AST_UnaryPostfix"] = AST_UnaryPostfix;
    exports["AST_Binary"] = AST_Binary;
    exports["AST_Conditional"] = AST_Conditional;
    exports["AST_Assign"] = AST_Assign;
    exports["AST_Array"] = AST_Array;
    exports["AST_Object"] = AST_Object;
    exports["AST_ObjectProperty"] = AST_ObjectProperty;
    exports["AST_ObjectKeyVal"] = AST_ObjectKeyVal;
    exports["AST_ObjectSetter"] = AST_ObjectSetter;
    exports["AST_ObjectGetter"] = AST_ObjectGetter;
    exports["AST_Symbol"] = AST_Symbol;
    exports["AST_SymbolAccessor"] = AST_SymbolAccessor;
    exports["AST_SymbolDeclaration"] = AST_SymbolDeclaration;
    exports["AST_SymbolVar"] = AST_SymbolVar;
    exports["AST_SymbolConst"] = AST_SymbolConst;
    exports["AST_SymbolFunarg"] = AST_SymbolFunarg;
    exports["AST_SymbolDefun"] = AST_SymbolDefun;
    exports["AST_SymbolLambda"] = AST_SymbolLambda;
    exports["AST_SymbolCatch"] = AST_SymbolCatch;
    exports["AST_Label"] = AST_Label;
    exports["AST_SymbolRef"] = AST_SymbolRef;
    exports["AST_LabelRef"] = AST_LabelRef;
    exports["AST_This"] = AST_This;
    exports["AST_Constant"] = AST_Constant;
    exports["AST_String"] = AST_String;
    exports["AST_Number"] = AST_Number;
    exports["AST_RegExp"] = AST_RegExp;
    exports["AST_Atom"] = AST_Atom;
    exports["AST_Null"] = AST_Null;
    exports["AST_NaN"] = AST_NaN;
    exports["AST_Undefined"] = AST_Undefined;
    exports["AST_Infinity"] = AST_Infinity;
    exports["AST_Boolean"] = AST_Boolean;
    exports["AST_False"] = AST_False;
    exports["AST_True"] = AST_True;
    exports["TreeWalker"] = TreeWalker;
    exports["KEYWORDS"] = KEYWORDS;
    exports["KEYWORDS_ATOM"] = KEYWORDS_ATOM;
    exports["RESERVED_WORDS"] = RESERVED_WORDS;
    exports["KEYWORDS_BEFORE_EXPRESSION"] = KEYWORDS_BEFORE_EXPRESSION;
    exports["OPERATOR_CHARS"] = OPERATOR_CHARS;
    exports["RE_HEX_NUMBER"] = RE_HEX_NUMBER;
    exports["RE_OCT_NUMBER"] = RE_OCT_NUMBER;
    exports["RE_DEC_NUMBER"] = RE_DEC_NUMBER;
    exports["OPERATORS"] = OPERATORS;
    exports["WHITESPACE_CHARS"] = WHITESPACE_CHARS;
    exports["PUNC_BEFORE_EXPRESSION"] = PUNC_BEFORE_EXPRESSION;
    exports["PUNC_CHARS"] = PUNC_CHARS;
    exports["REGEXP_MODIFIERS"] = REGEXP_MODIFIERS;
    exports["UNICODE"] = UNICODE;
    exports["is_letter"] = is_letter;
    exports["is_digit"] = is_digit;
    exports["is_alphanumeric_char"] = is_alphanumeric_char;
    exports["is_unicode_combining_mark"] = is_unicode_combining_mark;
    exports["is_unicode_connector_punctuation"] = is_unicode_connector_punctuation;
    exports["is_identifier"] = is_identifier;
    exports["is_identifier_start"] = is_identifier_start;
    exports["is_identifier_char"] = is_identifier_char;
    exports["parse_js_number"] = parse_js_number;
    exports["JS_Parse_Error"] = JS_Parse_Error;
    exports["js_error"] = js_error;
    exports["is_token"] = is_token;
    exports["EX_EOF"] = EX_EOF;
    exports["tokenizer"] = tokenizer;
    exports["UNARY_PREFIX"] = UNARY_PREFIX;
    exports["UNARY_POSTFIX"] = UNARY_POSTFIX;
    exports["ASSIGNMENT"] = ASSIGNMENT;
    exports["PRECEDENCE"] = PRECEDENCE;
    exports["STATEMENTS_WITH_LABELS"] = STATEMENTS_WITH_LABELS;
    exports["ATOMIC_START_TOKEN"] = ATOMIC_START_TOKEN;
    exports["parse"] = parse;
    exports["TreeTransformer"] = TreeTransformer;
    exports["SymbolDef"] = SymbolDef;
    exports["base54"] = base54;
    exports["OutputStream"] = OutputStream;
    exports["Compressor"] = Compressor;
    exports["SourceMap"] = SourceMap;
})({}, function() {
    return exports;
}());

var UglifyJS = exports.UglifyJS;

UglifyJS.AST_Node.warn_function = function(txt) {
    logger.error("uglifyjs2 WARN: " + txt);
};

//JRB: MODIFIED FROM UGLIFY SOURCE
//to take a name for the file, and then set toplevel.filename to be that name.
exports.minify = function(files, options, name) {
    options = UglifyJS.defaults(options, {
        outSourceMap : null,
        sourceRoot   : null,
        inSourceMap  : null,
        fromString   : false,
        warnings     : false,
        mangle       : {},
        output       : null,
        compress     : {}
    });
    if (typeof files == "string")
        files = [ files ];

    // 1. parse
    var toplevel = null;
    files.forEach(function(file){
        var code = options.fromString
            ? file
            : fs.readFileSync(file, "utf8");
        toplevel = UglifyJS.parse(code, {
            filename: options.fromString ? name : file,
            toplevel: toplevel
        });
    });

    // 2. compress
    if (options.compress) {
        var compress = { warnings: options.warnings };
        UglifyJS.merge(compress, options.compress);
        toplevel.figure_out_scope();
        var sq = UglifyJS.Compressor(compress);
        toplevel = toplevel.transform(sq);
    }

    // 3. mangle
    if (options.mangle) {
        toplevel.figure_out_scope();
        toplevel.compute_char_frequency();
        toplevel.mangle_names(options.mangle);
    }

    // 4. output
    var map = null;
    var inMap = null;
    if (options.inSourceMap) {
        inMap = fs.readFileSync(options.inSourceMap, "utf8");
    }
    if (options.outSourceMap) map = UglifyJS.SourceMap({
        file: options.outSourceMap,
        orig: inMap,
        root: options.sourceRoot
    });
    var output = { source_map: map };
    if (options.output) {
        UglifyJS.merge(output, options.output);
    }
    var stream = UglifyJS.OutputStream(output);
    toplevel.print(stream);
    return {
        code : stream + "",
        map  : map + ""
    };
};

// exports.describe_ast = function() {
//     function doitem(ctor) {
//         var sub = {};
//         ctor.SUBCLASSES.forEach(function(ctor){
//             sub[ctor.TYPE] = doitem(ctor);
//         });
//         var ret = {};
//         if (ctor.SELF_PROPS.length > 0) ret.props = ctor.SELF_PROPS;
//         if (ctor.SUBCLASSES.length > 0) ret.sub = sub;
//         return ret;
//     }
//     return doitem(UglifyJS.AST_Node).sub;
// }

exports.describe_ast = function() {
    var out = UglifyJS.OutputStream({ beautify: true });
    function doitem(ctor) {
        out.print("AST_" + ctor.TYPE);
        var props = ctor.SELF_PROPS.filter(function(prop){
            return !/^\$/.test(prop);
        });
        if (props.length > 0) {
            out.space();
            out.with_parens(function(){
                props.forEach(function(prop, i){
                    if (i) out.space();
                    out.print(prop);
                });
            });
        }
        if (ctor.documentation) {
            out.space();
            out.print_string(ctor.documentation);
        }
        if (ctor.SUBCLASSES.length > 0) {
            out.space();
            out.with_block(function(){
                ctor.SUBCLASSES.forEach(function(ctor, i){
                    out.indent();
                    doitem(ctor);
                    out.newline();
                });
            });
        }
    };
    doitem(UglifyJS.AST_Node);
    return out + "";
};

});
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint plusplus: true */
/*global define: false */

define('parse', ['./esprima'], function (esprima) {
    'use strict';

    //This string is saved off because JSLint complains
    //about obj.arguments use, as 'reserved word'
    var argPropName = 'arguments';

    //From an esprima example for traversing its ast.
    function traverse(object, visitor) {
        var key, child;

        if (!object) {
            return;
        }

        if (visitor.call(null, object) === false) {
            return false;
        }
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                child = object[key];
                if (typeof child === 'object' && child !== null) {
                    if (traverse(child, visitor) === false) {
                        return false;
                    }
                }
            }
        }
    }


    /**
     * Pulls out dependencies from an array literal with just string members.
     * If string literals, will just return those string values in an array,
     * skipping other items in the array.
     *
     * @param {Node} node an AST node.
     *
     * @returns {Array} an array of strings.
     * If null is returned, then it means the input node was not a valid
     * dependency.
     */
    function getValidDeps(node) {
        if (!node || node.type !== 'ArrayExpression' || !node.elements) {
            return;
        }

        var deps = [];

        node.elements.some(function (elem) {
            if (elem.type === 'Literal') {
                deps.push(elem.value);
            }
        });

        return deps.length ? deps : undefined;
    }

    /**
     * Main parse function. Returns a string of any valid require or
     * define/require.def calls as part of one JavaScript source string.
     * @param {String} moduleName the module name that represents this file.
     * It is used to create a default define if there is not one already for the
     * file. This allows properly tracing dependencies for builds. Otherwise, if
     * the file just has a require() call, the file dependencies will not be
     * properly reflected: the file will come before its dependencies.
     * @param {String} moduleName
     * @param {String} fileName
     * @param {String} fileContents
     * @param {Object} options optional options. insertNeedsDefine: true will
     * add calls to require.needsDefine() if appropriate.
     * @returns {String} JS source string or null, if no require or
     * define/require.def calls are found.
     */
    function parse(moduleName, fileName, fileContents, options) {
        options = options || {};

        //Set up source input
        var i, moduleCall, depString,
            moduleDeps = [],
            result = '',
            moduleList = [],
            needsDefine = true,
            astRoot = esprima.parse(fileContents);

        parse.recurse(astRoot, function (callName, config, name, deps) {
            if (!deps) {
                deps = [];
            }

            if (callName === 'define' && (!name || name === moduleName)) {
                needsDefine = false;
            }

            if (!name) {
                //If there is no module name, the dependencies are for
                //this file/default module name.
                moduleDeps = moduleDeps.concat(deps);
            } else {
                moduleList.push({
                    name: name,
                    deps: deps
                });
            }

            //If define was found, no need to dive deeper, unless
            //the config explicitly wants to dig deeper.
            return !!options.findNestedDependencies;
        }, options);

        if (options.insertNeedsDefine && needsDefine) {
            result += 'require.needsDefine("' + moduleName + '");';
        }

        if (moduleDeps.length || moduleList.length) {
            for (i = 0; i < moduleList.length; i++) {
                moduleCall = moduleList[i];
                if (result) {
                    result += '\n';
                }

                //If this is the main module for this file, combine any
                //"anonymous" dependencies (could come from a nested require
                //call) with this module.
                if (moduleCall.name === moduleName) {
                    moduleCall.deps = moduleCall.deps.concat(moduleDeps);
                    moduleDeps = [];
                }

                depString = moduleCall.deps.length ? '["' +
                            moduleCall.deps.join('","') + '"]' : '[]';
                result += 'define("' + moduleCall.name + '",' +
                          depString + ');';
            }
            if (moduleDeps.length) {
                if (result) {
                    result += '\n';
                }
                depString = moduleDeps.length ? '["' + moduleDeps.join('","') +
                            '"]' : '[]';
                result += 'define("' + moduleName + '",' + depString + ');';
            }
        }

        return result || null;
    }

    /**
     * Handles parsing a file recursively for require calls.
     * @param {Array} parentNode the AST node to start with.
     * @param {Function} onMatch function to call on a parse match.
     * @param {Object} [options] This is normally the build config options if
     * it is passed.
     */
    parse.recurse = function (object, onMatch, options) {
        //Like traverse, but skips if branches that would not be processed
        //after has application that results in tests of true or false boolean
        //literal values.
        var key, child,
            hasHas = options && options.has;

        if (!object) {
            return;
        }

        //If has replacement has resulted in if(true){} or if(false){}, take
        //the appropriate branch and skip the other one.
        if (hasHas && object.type === 'IfStatement' && object.test.type &&
                object.test.type === 'Literal') {
            if (object.test.value) {
                //Take the if branch
                this.recurse(object.consequent, onMatch, options);
            } else {
                //Take the else branch
                this.recurse(object.alternate, onMatch, options);
            }
        } else {
            if (this.parseNode(object, onMatch) === false) {
                return;
            }
            for (key in object) {
                if (object.hasOwnProperty(key)) {
                    child = object[key];
                    if (typeof child === 'object' && child !== null) {
                        this.recurse(child, onMatch, options);
                    }
                }
            }
        }
    };

    /**
     * Determines if the file defines the require/define module API.
     * Specifically, it looks for the `define.amd = ` expression.
     * @param {String} fileName
     * @param {String} fileContents
     * @returns {Boolean}
     */
    parse.definesRequire = function (fileName, fileContents) {
        var found = false;

        traverse(esprima.parse(fileContents), function (node) {
            if (parse.hasDefineAmd(node)) {
                found = true;

                //Stop traversal
                return false;
            }
        });

        return found;
    };

    /**
     * Finds require("") calls inside a CommonJS anonymous module wrapped in a
     * define(function(require, exports, module){}) wrapper. These dependencies
     * will be added to a modified define() call that lists the dependencies
     * on the outside of the function.
     * @param {String} fileName
     * @param {String} fileContents
     * @returns {Array} an array of module names that are dependencies. Always
     * returns an array, but could be of length zero.
     */
    parse.getAnonDeps = function (fileName, fileContents) {
        var astRoot = esprima.parse(fileContents),
            defFunc = this.findAnonDefineFactory(astRoot);

        return parse.getAnonDepsFromNode(defFunc);
    };

    /**
     * Finds require("") calls inside a CommonJS anonymous module wrapped
     * in a define function, given an AST node for the definition function.
     * @param {Node} node the AST node for the definition function.
     * @returns {Array} and array of dependency names. Can be of zero length.
     */
    parse.getAnonDepsFromNode = function (node) {
        var deps = [],
            funcArgLength;

        if (node) {
            this.findRequireDepNames(node, deps);

            //If no deps, still add the standard CommonJS require, exports,
            //module, in that order, to the deps, but only if specified as
            //function args. In particular, if exports is used, it is favored
            //over the return value of the function, so only add it if asked.
            funcArgLength = node.params && node.params.length;
            if (funcArgLength) {
                deps = (funcArgLength > 1 ? ["require", "exports", "module"] :
                        ["require"]).concat(deps);
            }
        }
        return deps;
    };

    /**
     * Finds the function in define(function (require, exports, module){});
     * @param {Array} node
     * @returns {Boolean}
     */
    parse.findAnonDefineFactory = function (node) {
        var match;

        traverse(node, function (node) {
            var arg0, arg1;

            if (node && node.type === 'CallExpression' &&
                    node.callee && node.callee.type === 'Identifier' &&
                    node.callee.name === 'define' && node[argPropName]) {

                //Just the factory function passed to define
                arg0 = node[argPropName][0];
                if (arg0 && arg0.type === 'FunctionExpression') {
                    match = arg0;
                    return false;
                }

                //A string literal module ID followed by the factory function.
                arg1 = node[argPropName][1];
                if (arg0.type === 'Literal' &&
                        arg1 && arg1.type === 'FunctionExpression') {
                    match = arg1;
                    return false;
                }
            }
        });

        return match;
    };

    /**
     * Finds any config that is passed to requirejs. That includes calls to
     * require/requirejs.config(), as well as require({}, ...) and
     * requirejs({}, ...)
     * @param {String} fileContents
     *
     * @returns {Object} a config details object with the following properties:
     * - config: {Object} the config object found. Can be undefined if no
     * config found.
     * - range: {Array} the start index and end index in the contents where
     * the config was found. Can be undefined if no config found.
     * Can throw an error if the config in the file cannot be evaluated in
     * a build context to valid JavaScript.
     */
    parse.findConfig = function (fileContents) {
        /*jslint evil: true */
        var jsConfig, foundRange, foundConfig,
            astRoot = esprima.parse(fileContents, {
                range: true
            });

        traverse(astRoot, function (node) {
            var arg,
                requireType = parse.hasRequire(node);

            if (requireType && (requireType === 'require' ||
                    requireType === 'requirejs' ||
                    requireType === 'requireConfig' ||
                    requireType === 'requirejsConfig')) {

                arg = node[argPropName] && node[argPropName][0];

                if (arg && arg.type === 'ObjectExpression') {
                    jsConfig = parse.nodeToString(fileContents, arg);
                    foundRange = arg.range;
                    return false;
                }
            } else {
                arg = parse.getRequireObjectLiteral(node);
                if (arg) {
                    jsConfig = parse.nodeToString(fileContents, arg);
                    foundRange = arg.range;
                    return false;
                }
            }
        });

        if (jsConfig) {
            foundConfig = eval('(' + jsConfig + ')');
        }

        return {
            config: foundConfig,
            range: foundRange
        };
    };

    /** Returns the node for the object literal assigned to require/requirejs,
     * for holding a declarative config.
     */
    parse.getRequireObjectLiteral = function (node) {
        if (node.id && node.id.type === 'Identifier' &&
                (node.id.name === 'require' || node.id.name === 'requirejs') &&
                node.init && node.init.type === 'ObjectExpression') {
            return node.init;
        }
    };

    /**
     * Renames require/requirejs/define calls to be ns + '.' + require/requirejs/define
     * Does *not* do .config calls though. See pragma.namespace for the complete
     * set of namespace transforms. This function is used because require calls
     * inside a define() call should not be renamed, so a simple regexp is not
     * good enough.
     * @param  {String} fileContents the contents to transform.
     * @param  {String} ns the namespace, *not* including trailing dot.
     * @return {String} the fileContents with the namespace applied
     */
    parse.renameNamespace = function (fileContents, ns) {
        var ranges = [],
            astRoot = esprima.parse(fileContents, {
                range: true
            });

        parse.recurse(astRoot, function (callName, config, name, deps, node) {
            ranges.push(node.range);
            //Do not recurse into define functions, they should be using
            //local defines.
            return callName !== 'define';
        }, {});

        //Go backwards through the found ranges, adding in the namespace name
        //in front.
        ranges.reverse();
        ranges.forEach(function (range) {
            fileContents = fileContents.substring(0, range[0]) +
                           ns + '.' +
                           fileContents.substring(range[0]);
        });

        return fileContents;
    };

    /**
     * Finds all dependencies specified in dependency arrays and inside
     * simplified commonjs wrappers.
     * @param {String} fileName
     * @param {String} fileContents
     *
     * @returns {Array} an array of dependency strings. The dependencies
     * have not been normalized, they may be relative IDs.
     */
    parse.findDependencies = function (fileName, fileContents, options) {
        var dependencies = [],
            astRoot = esprima.parse(fileContents);

        parse.recurse(astRoot, function (callName, config, name, deps) {
            if (deps) {
                dependencies = dependencies.concat(deps);
            }
        }, options);

        return dependencies;
    };

    /**
     * Finds only CJS dependencies, ones that are the form
     * require('stringLiteral')
     */
    parse.findCjsDependencies = function (fileName, fileContents) {
        var dependencies = [];

        traverse(esprima.parse(fileContents), function (node) {
            var arg;

            if (node && node.type === 'CallExpression' && node.callee &&
                    node.callee.type === 'Identifier' &&
                    node.callee.name === 'require' && node[argPropName] &&
                    node[argPropName].length === 1) {
                arg = node[argPropName][0];
                if (arg.type === 'Literal') {
                    dependencies.push(arg.value);
                }
            }
        });

        return dependencies;
    };

    //function define() {}
    parse.hasDefDefine = function (node) {
        return node.type === 'FunctionDeclaration' && node.id &&
                    node.id.type === 'Identifier' && node.id.name === 'define';
    };

    //define.amd = ...
    parse.hasDefineAmd = function (node) {
        return node && node.type === 'AssignmentExpression' &&
            node.left && node.left.type === 'MemberExpression' &&
            node.left.object && node.left.object.name === 'define' &&
            node.left.property && node.left.property.name === 'amd';
    };

    //require(), requirejs(), require.config() and requirejs.config()
    parse.hasRequire = function (node) {
        var callName,
            c = node && node.callee;

        if (node && node.type === 'CallExpression' && c) {
            if (c.type === 'Identifier' &&
                    (c.name === 'require' ||
                    c.name === 'requirejs')) {
                //A require/requirejs({}, ...) call
                callName = c.name;
            } else if (c.type === 'MemberExpression' &&
                    c.object &&
                    c.object.type === 'Identifier' &&
                    (c.object.name === 'require' ||
                        c.object.name === 'requirejs') &&
                    c.property && c.property.name === 'config') {
                // require/requirejs.config({}) call
                callName = c.object.name + 'Config';
            }
        }

        return callName;
    };

    //define()
    parse.hasDefine = function (node) {
        return node && node.type === 'CallExpression' && node.callee &&
            node.callee.type === 'Identifier' &&
            node.callee.name === 'define';
    };

    /**
     * If there is a named define in the file, returns the name. Does not
     * scan for mulitple names, just the first one.
     */
    parse.getNamedDefine = function (fileContents) {
        var name;
        traverse(esprima.parse(fileContents), function (node) {
            if (node && node.type === 'CallExpression' && node.callee &&
            node.callee.type === 'Identifier' &&
            node.callee.name === 'define' &&
            node[argPropName] && node[argPropName][0] &&
            node[argPropName][0].type === 'Literal') {
                name = node[argPropName][0].value;
                return false;
            }
        });

        return name;
    };

    /**
     * Determines if define(), require({}|[]) or requirejs was called in the
     * file. Also finds out if define() is declared and if define.amd is called.
     */
    parse.usesAmdOrRequireJs = function (fileName, fileContents) {
        var uses;

        traverse(esprima.parse(fileContents), function (node) {
            var type, callName, arg;

            if (parse.hasDefDefine(node)) {
                //function define() {}
                type = 'declaresDefine';
            } else if (parse.hasDefineAmd(node)) {
                type = 'defineAmd';
            } else {
                callName = parse.hasRequire(node);
                if (callName) {
                    arg = node[argPropName] && node[argPropName][0];
                    if (arg && (arg.type === 'ObjectExpression' ||
                            arg.type === 'ArrayExpression')) {
                        type = callName;
                    }
                } else if (parse.hasDefine(node)) {
                    type = 'define';
                }
            }

            if (type) {
                if (!uses) {
                    uses = {};
                }
                uses[type] = true;
            }
        });

        return uses;
    };

    /**
     * Determines if require(''), exports.x =, module.exports =,
     * __dirname, __filename are used. So, not strictly traditional CommonJS,
     * also checks for Node variants.
     */
    parse.usesCommonJs = function (fileName, fileContents) {
        var uses = null,
            assignsExports = false;


        traverse(esprima.parse(fileContents), function (node) {
            var type,
                exp = node.expression;

            if (node.type === 'Identifier' &&
                    (node.name === '__dirname' || node.name === '__filename')) {
                type = node.name.substring(2);
            } else if (node.type === 'VariableDeclarator' && node.id &&
                    node.id.type === 'Identifier' &&
                        node.id.name === 'exports') {
                //Hmm, a variable assignment for exports, so does not use cjs
                //exports.
                type = 'varExports';
            } else if (exp && exp.type === 'AssignmentExpression' && exp.left &&
                    exp.left.type === 'MemberExpression' && exp.left.object) {
                if (exp.left.object.name === 'module' && exp.left.property &&
                        exp.left.property.name === 'exports') {
                    type = 'moduleExports';
                } else if (exp.left.object.name === 'exports' &&
                        exp.left.property) {
                    type = 'exports';
                }

            } else if (node && node.type === 'CallExpression' && node.callee &&
                    node.callee.type === 'Identifier' &&
                    node.callee.name === 'require' && node[argPropName] &&
                    node[argPropName].length === 1 &&
                    node[argPropName][0].type === 'Literal') {
                type = 'require';
            }

            if (type) {
                if (type === 'varExports') {
                    assignsExports = true;
                } else if (type !== 'exports' || !assignsExports) {
                    if (!uses) {
                        uses = {};
                    }
                    uses[type] = true;
                }
            }
        });

        return uses;
    };


    parse.findRequireDepNames = function (node, deps) {
        traverse(node, function (node) {
            var arg;

            if (node && node.type === 'CallExpression' && node.callee &&
                    node.callee.type === 'Identifier' &&
                    node.callee.name === 'require' &&
                    node[argPropName] && node[argPropName].length === 1) {

                arg = node[argPropName][0];
                if (arg.type === 'Literal') {
                    deps.push(arg.value);
                }
            }
        });
    };

    /**
     * Determines if a specific node is a valid require or define/require.def
     * call.
     * @param {Array} node
     * @param {Function} onMatch a function to call when a match is found.
     * It is passed the match name, and the config, name, deps possible args.
     * The config, name and deps args are not normalized.
     *
     * @returns {String} a JS source string with the valid require/define call.
     * Otherwise null.
     */
    parse.parseNode = function (node, onMatch) {
        var name, deps, cjsDeps, arg, factory,
            args = node && node[argPropName],
            callName = parse.hasRequire(node);

        if (callName === 'require' || callName === 'requirejs') {
            //A plain require/requirejs call
            arg = node[argPropName] && node[argPropName][0];
            if (arg.type !== 'ArrayExpression') {
                if (arg.type === 'ObjectExpression') {
                    //A config call, try the second arg.
                    arg = node[argPropName][1];
                }
            }

            deps = getValidDeps(arg);
            if (!deps) {
                return;
            }

            return onMatch("require", null, null, deps, node);
        } else if (parse.hasDefine(node) && args && args.length) {
            name = args[0];
            deps = args[1];
            factory = args[2];

            if (name.type === 'ArrayExpression') {
                //No name, adjust args
                factory = deps;
                deps = name;
                name = null;
            } else if (name.type === 'FunctionExpression') {
                //Just the factory, no name or deps
                factory = name;
                name = deps = null;
            } else if (name.type !== 'Literal') {
                 //An object literal, just null out
                name = deps = factory = null;
            }

            if (name && name.type === 'Literal' && deps) {
                if (deps.type === 'FunctionExpression') {
                    //deps is the factory
                    factory = deps;
                    deps = null;
                } else if (deps.type === 'ObjectExpression') {
                    //deps is object literal, null out
                    deps = factory = null;
                }
            }

            if (deps && deps.type === 'ArrayExpression') {
                deps = getValidDeps(deps);
            } else if (factory && factory.type === 'FunctionExpression') {
                //If no deps and a factory function, could be a commonjs sugar
                //wrapper, scan the function for dependencies.
                cjsDeps = parse.getAnonDepsFromNode(factory);
                if (cjsDeps.length) {
                    deps = cjsDeps;
                }
            } else if (deps || factory) {
                //Does not match the shape of an AMD call.
                return;
            }

            //Just save off the name as a string instead of an AST object.
            if (name && name.type === 'Literal') {
                name = name.value;
            }

            return onMatch("define", null, name, deps, node);
        }
    };

    /**
     * Converts an AST node into a JS source string by extracting
     * the node's location from the given contents string. Assumes
     * esprima.parse() with ranges was done.
     * @param {String} contents
     * @param {Object} node
     * @returns {String} a JS source string.
     */
    parse.nodeToString = function (contents, node) {
        var range = node.range;
        return contents.substring(range[0], range[1]);
    };

    /**
     * Extracts license comments from JS text.
     * @param {String} fileName
     * @param {String} contents
     * @returns {String} a string of license comments.
     */
    parse.getLicenseComments = function (fileName, contents) {
        var commentNode, refNode, subNode, value, i, j,
            ast = esprima.parse(contents, {
                comment: true
            }),
            result = '',
            existsMap = {},
            lineEnd = contents.indexOf('\r') === -1 ? '\n' : '\r\n';

        if (ast.comments) {
            for (i = 0; i < ast.comments.length; i++) {
                commentNode = ast.comments[i];

                if (commentNode.type === 'Line') {
                    value = '//' + commentNode.value + lineEnd;
                    refNode = commentNode;

                    if (i + 1 >= ast.comments.length) {
                        value += lineEnd;
                    } else {
                        //Look for immediately adjacent single line comments
                        //since it could from a multiple line comment made out
                        //of single line comments. Like this comment.
                        for (j = i + 1; j < ast.comments.length; j++) {
                            subNode = ast.comments[j];
                            if (subNode.type === 'Line' &&
                                    subNode.range[0] === refNode.range[1]) {
                                //Adjacent single line comment. Collect it.
                                value += '//' + subNode.value + lineEnd;
                                refNode = subNode;
                            } else {
                                //No more single line comment blocks. Break out
                                //and continue outer looping.
                                break;
                            }
                        }
                        value += lineEnd;
                        i = j - 1;
                    }
                } else {
                    value = '/*' + commentNode.value + '*/' + lineEnd + lineEnd;
                }

                if (!existsMap[value] && (value.indexOf('license') !== -1 ||
                        (commentNode.type === 'Block' &&
                            value.indexOf('/*!') === 0) ||
                        value.indexOf('opyright') !== -1 ||
                        value.indexOf('(c)') !== -1)) {

                    result += value;
                    existsMap[value] = true;
                }

            }
        }

        return result;
    };

    return parse;
});
/**
 * @license Copyright (c) 2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint */
/*global define */

define('transform', [ './esprima', './parse', 'logger', 'lang'], function (esprima, parse, logger, lang) {
    'use strict';
    var transform,
        baseIndentRegExp = /^([ \t]+)/,
        indentRegExp = /\{[\r\n]+([ \t]+)/,
        bulkIndentRegExps = {
            '\n': /\n/g,
            '\r\n': /\r\n/g
        };

    function applyIndent(str, indent, lineReturn) {
        var regExp = bulkIndentRegExps[lineReturn];
        return str.replace(regExp, '$&' + indent);
    }

    return (transform = {
        toTransport: function (namespace, moduleName, path, contents, onFound, options) {
            options = options || {};

            var tokens, foundAnon, deps, lastRange, parenCount, inDefine,
                scanCount = 0,
                scanReset = false,
                defineRanges = [],
                contentInsertion = '',
                depString = '';

            try {
                tokens = esprima.parse(contents, {
                    tokens: true,
                    range: true
                }).tokens;
            } catch (e) {
                logger.trace('toTransport skipping ' + path + ': ' +
                             e.toString());
                return contents;
            }

            //Find the define calls and their position in the files.
            tokens.some(function (token, i) {
                var prev, prev2, next, next2, next3, next4, next5,
                    needsId, depAction, nameCommaRange, foundId,
                    sourceUrlData, range,
                    namespaceExists = false;

                if (inDefine && token.type === 'Punctuator') {
                    //Looking for the end of the define call.
                    if (token.value === '(') {
                        parenCount += 1;
                    } else if (token.value === ')') {
                        parenCount -= 1;
                    }

                    if (parenCount === 0) {
                        inDefine = false;

                        //Found the end of the define call. Hold onto
                        //it.
                        lastRange = defineRanges.length &&
                            defineRanges[defineRanges.length - 1];
                        if (lastRange && !lastRange.defineEndRange) {
                            lastRange.defineEndRange = token.range;
                        }
                    }
                }

                if (token.type === 'Identifier' && token.value === 'define') {
                    //Possible match. Do not want something.define calls
                    //though, and only defines follow by a paren
                    prev = tokens[i - 1];
                    next = tokens[i + 1];

                    if (prev && prev.type === 'Punctuator' &&
                            prev.value === '.') {
                        //a define on a sub-object, not a top level
                        //define() call. If the sub object is the
                        //namespace, then it is ok.
                        prev2 = tokens[i - 2];
                        if (!prev2) {
                            return;
                        }

                        //If the prev2 does not match namespace, then bail.
                        if (!namespace || prev2.type !== 'Identifier' ||
                                prev2.value !== namespace) {
                            return;
                        } else if (namespace) {
                            namespaceExists = true;
                        }
                    }

                    if (!next || next.type !== 'Punctuator' ||
                            next.value !== '(') {
                       //Not a define() function call. Bail.
                        return;
                    }

                    if (prev && prev.type === 'Keyword' &&
                            prev.value === 'function') {
                        //A declaration of a define function. Skip it.
                        return;
                    }

                    next2 = tokens[i + 2];
                    if (!next2) {
                        return;
                    }

                    //Figure out if this needs a named define call.
                    if (next2.type === 'Punctuator' && next2.value === '[') {
                        //Dependency array
                        needsId = true;
                        depAction = 'skip';
                    } else if (next2.type === 'Punctuator' &&
                            next2.value === '{') {
                        //Object literal
                        needsId = true;
                        depAction = 'skip';
                    } else if (next2.type === 'Keyword' &&
                               next2.value === 'function') {
                        //function
                        needsId = true;
                        depAction = 'scan';
                    } else if (next2.type === 'String') {
                        //Named module
                        needsId = false;

                        //The value includes the quotes around the string,
                        //so remove them.
                        foundId = next2.value.substring(1,
                                                        next2.value.length - 1);

                        //assumed it does not need dependencies injected

                        //If next argument is a function it means we need
                        //dependency scanning.
                        next3 = tokens[i + 3];
                        next4 = tokens[i + 4];
                        if (!next3 || !next4) {
                            return;
                        }

                        if (next3.type === 'Punctuator' &&
                                next3.value === ',' &&
                                next4.type === 'Keyword' &&
                                next4.value === 'function') {
                            depAction = 'scan';
                            nameCommaRange = next3.range;
                        } else {
                            depAction = 'skip';
                        }
                    } else if (next2.type === 'Identifier') {
                        //May be the define(factory); type.
                        next3 = tokens[i + 3];
                        if (!next3) {
                            return;
                        }
                        if (next3.type === 'Punctuator' &&
                                next3.value === ')') {
                            needsId = true;
                            depAction = 'empty';
                        } else {
                            return;
                        }
                    } else if (next2.type === 'Numeric') {
                        //May be the define(12345); type.
                        next3 = tokens[i + 3];
                        if (!next3) {
                            return;
                        }
                        if (next3.type === 'Punctuator' &&
                                next3.value === ')') {
                            needsId = true;
                            depAction = 'skip';
                        } else {
                            return;
                        }
                    } else if (next2.type === 'Punctuator' &&
                               next2.value === '-') {
                        //May be the define(-12345); type.
                        next3 = tokens[i + 3];
                        if (!next3) {
                            return;
                        }
                        if (next3.type === 'Numeric') {
                            next4 = tokens[i + 4];
                            if (!next4) {
                                return;
                            }
                            if (next4.type === 'Punctuator' &&
                                    next4.value === ')') {
                                needsId = true;
                                depAction = 'skip';
                            } else {
                                return;
                            }
                        } else {
                            return;
                        }
                    } else if (next2.type === 'Keyword' && next2.value === 'this') {
                        //May be the define(this.key); type
                        next3 = tokens[i + 3];
                        next4 = tokens[i + 4];
                        next5 = tokens[i + 5];
                        if (!next3 || !next4 || !next5) {
                            return;
                        }

                        if (next3.type === 'Punctuator' && next3.value === '.' &&
                                next4.type === 'Identifier' &&
                                next5.type === 'Punctuator' && next5.value === ')') {
                            needsId = true;
                            depAction = 'empty';
                        } else {
                            return;
                        }
                    } else {
                        //Not a match, skip it.
                        return;
                    }

                    //A valid define call. Need to find the end, start counting
                    //parentheses.
                    inDefine = true;
                    parenCount = 0;

                    range = {
                        foundId: foundId,
                        needsId: needsId,
                        depAction: depAction,
                        namespaceExists: namespaceExists,
                        defineRange: token.range,
                        parenRange: next.range,
                        nameCommaRange: nameCommaRange,
                        sourceUrlData: sourceUrlData
                    };

                    //Only transform ones that do not have IDs. If it has an
                    //ID but no dependency array, assume it is something like
                    //a phonegap implementation, that has its own internal
                    //define that cannot handle dependency array constructs,
                    //and if it is a named module, then it means it has been
                    //set for transport form.
                    if (range.needsId) {
                        if (foundAnon) {
                            logger.trace(path + ' has more than one anonymous ' +
                                'define. May be a built file from another ' +
                                'build system like, Ender. Skipping normalization.');
                            defineRanges = [];
                            return true;
                        } else {
                            foundAnon = range;
                            defineRanges.push(range);
                        }
                    } else if (depAction === 'scan') {
                        scanCount += 1;
                        if (scanCount > 1) {
                            //Just go back to an array that just has the
                            //anon one, since this is an already optimized
                            //file like the phonegap one.
                            if (!scanReset) {
                                defineRanges =  foundAnon ? [foundAnon] : [];
                                scanReset = true;
                            }
                        } else {
                            defineRanges.push(range);
                        }
                    }
                }
            });

            if (!defineRanges.length) {
                return contents;
            }

            //Reverse the matches, need to start from the bottom of
            //the file to modify it, so that the ranges are still true
            //further up.
            defineRanges.reverse();

            defineRanges.forEach(function (info) {
                //Do the modifications "backwards", in other words, start with the
                //one that is farthest down and work up, so that the ranges in the
                //defineRanges still apply. So that means deps, id, then namespace.

                if (info.needsId && moduleName) {
                    contentInsertion += "'" + moduleName + "',";
                }

                if (info.depAction === 'scan') {
                    deps = parse.getAnonDeps(path, contents.substring(info.defineRange[0], info.defineEndRange[1]));

                    if (deps.length) {
                        depString = '[' + deps.map(function (dep) {
                            return "'" + dep + "'";
                        }) + ']';
                    } else {
                        depString = '[]';
                    }
                    depString +=  ',';

                    if (info.nameCommaRange) {
                        //Already have a named module, need to insert the
                        //dependencies after the name.
                        contents = contents.substring(0, info.nameCommaRange[1]) +
                                   depString +
                                   contents.substring(info.nameCommaRange[1],
                                                  contents.length);
                    } else {
                        contentInsertion +=  depString;
                    }
                }

                if (contentInsertion) {
                    contents = contents.substring(0, info.parenRange[1]) +
                               contentInsertion +
                               contents.substring(info.parenRange[1],
                                                  contents.length);
                }

                //Do namespace last so that ui does not mess upthe parenRange
                //used above.
                if (namespace && !info.namespaceExists) {
                    contents = contents.substring(0, info.defineRange[0]) +
                               namespace + '.' +
                               contents.substring(info.defineRange[0],
                                                  contents.length);
                }

                //Notify any listener for the found info
                if (onFound) {
                    onFound(info);
                }
            });

            if (options.useSourceUrl) {
                contents = 'eval("' + lang.jsEscape(contents) +
                    '\\n//@ sourceURL=' + (path.indexOf('/') === 0 ? '' : '/') +
                    path +
                    '");\n';
            }

            return contents;
        },

        /**
         * Modify the contents of a require.config/requirejs.config call. This
         * call will LOSE any existing comments that are in the config string.
         *
         * @param  {String} fileContents String that may contain a config call
         * @param  {Function} onConfig Function called when the first config
         * call is found. It will be passed an Object which is the current
         * config, and the onConfig function should return an Object to use
         * as the config.
         * @return {String} the fileContents with the config changes applied.
         */
        modifyConfig: function (fileContents, onConfig) {
            var details = parse.findConfig(fileContents),
                config = details.config;

            if (config) {
                config = onConfig(config);
                if (config) {
                    return transform.serializeConfig(config,
                                              fileContents,
                                              details.range[0],
                                              details.range[1]);
                }
            }

            return fileContents;
        },

        serializeConfig: function (config, fileContents, start, end) {
            //Calculate base level of indent
            var indent, match, configString, outDentRegExp,
                baseIndent = '',
                startString = fileContents.substring(0, start),
                existingConfigString = fileContents.substring(start, end),
                lineReturn = existingConfigString.indexOf('\r') === -1 ? '\n' : '\r\n',
                lastReturnIndex = startString.lastIndexOf('\n');

            //Get the basic amount of indent for the require config call.
            if (lastReturnIndex === -1) {
                lastReturnIndex = 0;
            }

            match = baseIndentRegExp.exec(startString.substring(lastReturnIndex + 1, start));
            if (match && match[1]) {
                baseIndent = match[1];
            }

            //Calculate internal indentation for config
            match = indentRegExp.exec(existingConfigString);
            if (match && match[1]) {
                indent = match[1];
            }

            if (!indent || indent.length < baseIndent) {
                indent = '  ';
            } else {
                indent = indent.substring(baseIndent.length);
            }

            outDentRegExp = new RegExp('(' + lineReturn + ')' + indent, 'g');

            configString = transform.objectToString(config,
                                                    indent,
                                                    lineReturn,
                                                    outDentRegExp);

            //Add in the base indenting level.
            configString = applyIndent(configString, baseIndent, lineReturn);

            return startString + configString + fileContents.substring(end);
        },

        /**
         * Tries converting a JS object to a string. This will likely suck, and
         * is tailored to the type of config expected in a loader config call.
         * So, hasOwnProperty fields, strings, numbers, arrays and functions,
         * no weird recursively referenced stuff.
         * @param  {Object} obj        the object to convert
         * @param  {String} indent     the indentation to use for each level
         * @param  {String} lineReturn the type of line return to use
         * @param  {outDentRegExp} outDentRegExp the regexp to use to outdent functions
         * @param  {String} totalIndent the total indent to print for this level
         * @return {String}            a string representation of the object.
         */
        objectToString: function (obj, indent, lineReturn, outDentRegExp, totalIndent) {
            var startBrace, endBrace, nextIndent,
                first = true,
                value = '';

            totalIndent = totalIndent || '';
            nextIndent = totalIndent + indent;

            if (obj === null) {
                value = 'null';
            } else if (obj === undefined) {
                value = 'undefined';
            } else if (typeof obj === 'number') {
                value = obj;
            } else if (typeof obj === 'string') {
                //Use double quotes in case the config may also work as JSON.
                value = '"' + lang.jsEscape(obj) + '"';
            } else if (lang.isArray(obj)) {
                lang.each(obj, function (item, i) {
                    value += (i !== 0 ? ',' + lineReturn : '' ) +
                        nextIndent +
                        transform.objectToString(item,
                                                 indent,
                                                 lineReturn,
                                                 outDentRegExp,
                                                 nextIndent);
                });

                startBrace = '[';
                endBrace = ']';
            } else if (lang.isFunction(obj) || lang.isRegExp(obj)) {
                //The outdent regexp just helps pretty up the conversion
                //just in node. Rhino strips comments and does a different
                //indent scheme for Function toString, so not really helpful
                //there.
                value = obj.toString().replace(outDentRegExp, '$1');
            } else {
                //An object
                lang.eachProp(obj, function (v, prop) {
                    value += (first ? '': ',' + lineReturn) +
                        nextIndent +
                        '"' + lang.jsEscape(prop) + '": ' +
                        transform.objectToString(v,
                                                 indent,
                                                 lineReturn,
                                                 outDentRegExp,
                                                 nextIndent);
                    first = false;
                });
                startBrace = '{';
                endBrace = '}';
            }

            if (startBrace) {
                value = startBrace +
                        lineReturn +
                        value +
                        lineReturn + totalIndent +
                        endBrace;
            }

            return value;
        }
    });
});/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint regexp: true, plusplus: true  */
/*global define: false */

define('pragma', ['parse', 'logger'], function (parse, logger) {
    'use strict';
    function Temp() {}

    function create(obj, mixin) {
        Temp.prototype = obj;
        var temp = new Temp(), prop;

        //Avoid any extra memory hanging around
        Temp.prototype = null;

        if (mixin) {
            for (prop in mixin) {
                if (mixin.hasOwnProperty(prop) && !temp.hasOwnProperty(prop)) {
                    temp[prop] = mixin[prop];
                }
            }
        }

        return temp; // Object
    }

    var pragma = {
        conditionalRegExp: /(exclude|include)Start\s*\(\s*["'](\w+)["']\s*,(.*)\)/,
        useStrictRegExp: /['"]use strict['"];/g,
        hasRegExp: /has\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
        configRegExp: /(^|[^\.])(requirejs|require)(\.config)\s*\(/g,
        nsWrapRegExp: /\/\*requirejs namespace: true \*\//,
        apiDefRegExp: /var requirejs, require, define;/,
        defineCheckRegExp: /typeof\s+define\s*===\s*["']function["']\s*&&\s*define\s*\.\s*amd/g,
        defineStringCheckRegExp: /typeof\s+define\s*===\s*["']function["']\s*&&\s*define\s*\[\s*["']amd["']\s*\]/g,
        defineTypeFirstCheckRegExp: /\s*["']function["']\s*===\s*typeof\s+define\s*&&\s*define\s*\.\s*amd/g,
        defineJQueryRegExp: /typeof\s+define\s*===\s*["']function["']\s*&&\s*define\s*\.\s*amd\s*&&\s*define\s*\.\s*amd\s*\.\s*jQuery/g,
        defineHasRegExp: /typeof\s+define\s*==(=)?\s*['"]function['"]\s*&&\s*typeof\s+define\.amd\s*==(=)?\s*['"]object['"]\s*&&\s*define\.amd/g,
        defineTernaryRegExp: /typeof\s+define\s*===\s*['"]function["']\s*&&\s*define\s*\.\s*amd\s*\?\s*define/,
        amdefineRegExp: /if\s*\(\s*typeof define\s*\!==\s*'function'\s*\)\s*\{\s*[^\{\}]+amdefine[^\{\}]+\}/g,

        removeStrict: function (contents, config) {
            return config.useStrict ? contents : contents.replace(pragma.useStrictRegExp, '');
        },

        namespace: function (fileContents, ns, onLifecycleName) {
            if (ns) {
                //Namespace require/define calls
                fileContents = fileContents.replace(pragma.configRegExp, '$1' + ns + '.$2$3(');


                fileContents = parse.renameNamespace(fileContents, ns);

                //Namespace define ternary use:
                fileContents = fileContents.replace(pragma.defineTernaryRegExp,
                                                    "typeof " + ns + ".define === 'function' && " + ns + ".define.amd ? " + ns + ".define");

                //Namespace define jquery use:
                fileContents = fileContents.replace(pragma.defineJQueryRegExp,
                                                    "typeof " + ns + ".define === 'function' && " + ns + ".define.amd && " + ns + ".define.amd.jQuery");

                //Namespace has.js define use:
                fileContents = fileContents.replace(pragma.defineHasRegExp,
                                                    "typeof " + ns + ".define === 'function' && typeof " + ns + ".define.amd === 'object' && " + ns + ".define.amd");

                //Namespace define checks.
                //Do these ones last, since they are a subset of the more specific
                //checks above.
                fileContents = fileContents.replace(pragma.defineCheckRegExp,
                                                    "typeof " + ns + ".define === 'function' && " + ns + ".define.amd");
                fileContents = fileContents.replace(pragma.defineStringCheckRegExp,
                                                    "typeof " + ns + ".define === 'function' && " + ns + ".define['amd']");
                fileContents = fileContents.replace(pragma.defineTypeFirstCheckRegExp,
                                                    "'function' === typeof " + ns + ".define && " + ns + ".define.amd");

                //Check for require.js with the require/define definitions
                if (pragma.apiDefRegExp.test(fileContents) &&
                    fileContents.indexOf("if (typeof " + ns + " === 'undefined')") === -1) {
                    //Wrap the file contents in a typeof check, and a function
                    //to contain the API globals.
                    fileContents = "var " + ns + ";(function () { if (typeof " +
                                    ns + " === 'undefined') {\n" +
                                    ns + ' = {};\n' +
                                    fileContents +
                                    "\n" +
                                    ns + ".requirejs = requirejs;" +
                                    ns + ".require = require;" +
                                    ns + ".define = define;\n" +
                                    "}\n}());";
                }

                //Finally, if the file wants a special wrapper because it ties
                //in to the requirejs internals in a way that would not fit
                //the above matches, do that. Look for /*requirejs namespace: true*/
                if (pragma.nsWrapRegExp.test(fileContents)) {
                    //Remove the pragma.
                    fileContents = fileContents.replace(pragma.nsWrapRegExp, '');

                    //Alter the contents.
                    fileContents = '(function () {\n' +
                                   'var require = ' + ns + '.require,' +
                                   'requirejs = ' + ns + '.requirejs,' +
                                   'define = ' + ns + '.define;\n' +
                                   fileContents +
                                   '\n}());';
                }
            }

            return fileContents;
        },

        /**
         * processes the fileContents for some //>> conditional statements
         */
        process: function (fileName, fileContents, config, onLifecycleName, pluginCollector) {
            /*jslint evil: true */
            var foundIndex = -1, startIndex = 0, lineEndIndex, conditionLine,
                matches, type, marker, condition, isTrue, endRegExp, endMatches,
                endMarkerIndex, shouldInclude, startLength, lifecycleHas, deps,
                i, dep, moduleName, collectorMod,
                lifecyclePragmas, pragmas = config.pragmas, hasConfig = config.has,
                //Legacy arg defined to help in dojo conversion script. Remove later
                //when dojo no longer needs conversion:
                kwArgs = pragmas;

            //Mix in a specific lifecycle scoped object, to allow targeting
            //some pragmas/has tests to only when files are saved, or at different
            //lifecycle events. Do not bother with kwArgs in this section, since
            //the old dojo kwArgs were for all points in the build lifecycle.
            if (onLifecycleName) {
                lifecyclePragmas = config['pragmas' + onLifecycleName];
                lifecycleHas = config['has' + onLifecycleName];

                if (lifecyclePragmas) {
                    pragmas = create(pragmas || {}, lifecyclePragmas);
                }

                if (lifecycleHas) {
                    hasConfig = create(hasConfig || {}, lifecycleHas);
                }
            }

            //Replace has references if desired
            if (hasConfig) {
                fileContents = fileContents.replace(pragma.hasRegExp, function (match, test) {
                    if (hasConfig.hasOwnProperty(test)) {
                        return !!hasConfig[test];
                    }
                    return match;
                });
            }

            if (!config.skipPragmas) {

                while ((foundIndex = fileContents.indexOf("//>>", startIndex)) !== -1) {
                    //Found a conditional. Get the conditional line.
                    lineEndIndex = fileContents.indexOf("\n", foundIndex);
                    if (lineEndIndex === -1) {
                        lineEndIndex = fileContents.length - 1;
                    }

                    //Increment startIndex past the line so the next conditional search can be done.
                    startIndex = lineEndIndex + 1;

                    //Break apart the conditional.
                    conditionLine = fileContents.substring(foundIndex, lineEndIndex + 1);
                    matches = conditionLine.match(pragma.conditionalRegExp);
                    if (matches) {
                        type = matches[1];
                        marker = matches[2];
                        condition = matches[3];
                        isTrue = false;
                        //See if the condition is true.
                        try {
                            isTrue = !!eval("(" + condition + ")");
                        } catch (e) {
                            throw "Error in file: " +
                                   fileName +
                                   ". Conditional comment: " +
                                   conditionLine +
                                   " failed with this error: " + e;
                        }

                        //Find the endpoint marker.
                        endRegExp = new RegExp('\\/\\/\\>\\>\\s*' + type + 'End\\(\\s*[\'"]' + marker + '[\'"]\\s*\\)', "g");
                        endMatches = endRegExp.exec(fileContents.substring(startIndex, fileContents.length));
                        if (endMatches) {
                            endMarkerIndex = startIndex + endRegExp.lastIndex - endMatches[0].length;

                            //Find the next line return based on the match position.
                            lineEndIndex = fileContents.indexOf("\n", endMarkerIndex);
                            if (lineEndIndex === -1) {
                                lineEndIndex = fileContents.length - 1;
                            }

                            //Should we include the segment?
                            shouldInclude = ((type === "exclude" && !isTrue) || (type === "include" && isTrue));

                            //Remove the conditional comments, and optionally remove the content inside
                            //the conditional comments.
                            startLength = startIndex - foundIndex;
                            fileContents = fileContents.substring(0, foundIndex) +
                                (shouldInclude ? fileContents.substring(startIndex, endMarkerIndex) : "") +
                                fileContents.substring(lineEndIndex + 1, fileContents.length);

                            //Move startIndex to foundIndex, since that is the new position in the file
                            //where we need to look for more conditionals in the next while loop pass.
                            startIndex = foundIndex;
                        } else {
                            throw "Error in file: " +
                                  fileName +
                                  ". Cannot find end marker for conditional comment: " +
                                  conditionLine;

                        }
                    }
                }
            }

            //If need to find all plugin resources to optimize, do that now,
            //before namespacing, since the namespacing will change the API
            //names.
            //If there is a plugin collector, scan the file for plugin resources.
            if (config.optimizeAllPluginResources && pluginCollector) {
                try {
                    deps = parse.findDependencies(fileName, fileContents);
                    if (deps.length) {
                        for (i = 0; i < deps.length; i++) {
                            dep = deps[i];
                            if (dep.indexOf('!') !== -1) {
                                moduleName = dep.split('!')[0];
                                collectorMod = pluginCollector[moduleName];
                                if (!collectorMod) {
                                 collectorMod = pluginCollector[moduleName] = [];
                                }
                                collectorMod.push(dep);
                            }
                        }
                    }
                } catch (eDep) {
                    logger.error('Parse error looking for plugin resources in ' +
                                 fileName + ', skipping.');
                }
            }

            //Strip amdefine use for node-shared modules.
            fileContents = fileContents.replace(pragma.amdefineRegExp, '');

            //Do namespacing
            if (onLifecycleName === 'OnSave' && config.namespace) {
                fileContents = pragma.namespace(fileContents, config.namespace, onLifecycleName);
            }


            return pragma.removeStrict(fileContents, config);
        }
    };

    return pragma;
});
if(env === 'browser') {
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false */

define('browser/optimize', {});

}

if(env === 'node') {
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint strict: false */
/*global define: false */

define('node/optimize', {});

}

if(env === 'rhino') {
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint sloppy: true, plusplus: true */
/*global define, java, Packages, com */

define('rhino/optimize', ['logger', 'env!env/file'], function (logger, file) {

    //Add .reduce to Rhino so UglifyJS can run in Rhino,
    //inspired by https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/reduce
    //but rewritten for brevity, and to be good enough for use by UglifyJS.
    if (!Array.prototype.reduce) {
        Array.prototype.reduce = function (fn /*, initialValue */) {
            var i = 0,
                length = this.length,
                accumulator;

            if (arguments.length >= 2) {
                accumulator = arguments[1];
            } else {
                if (length) {
                    while (!(i in this)) {
                        i++;
                    }
                    accumulator = this[i++];
                }
            }

            for (; i < length; i++) {
                if (i in this) {
                    accumulator = fn.call(undefined, accumulator, this[i], i, this);
                }
            }

            return accumulator;
        };
    }

    var JSSourceFilefromCode, optimize,
        mapRegExp = /"file":"[^"]+"/;

    //Bind to Closure compiler, but if it is not available, do not sweat it.
    try {
        JSSourceFilefromCode = java.lang.Class.forName('com.google.javascript.jscomp.JSSourceFile').getMethod('fromCode', [java.lang.String, java.lang.String]);
    } catch (e) {}

    //Helper for closure compiler, because of weird Java-JavaScript interactions.
    function closurefromCode(filename, content) {
        return JSSourceFilefromCode.invoke(null, [filename, content]);
    }


    function getFileWriter(fileName, encoding) {
        var outFile = new java.io.File(fileName), outWriter, parentDir;

        parentDir = outFile.getAbsoluteFile().getParentFile();
        if (!parentDir.exists()) {
            if (!parentDir.mkdirs()) {
                throw "Could not create directory: " + parentDir.getAbsolutePath();
            }
        }

        if (encoding) {
            outWriter = new java.io.OutputStreamWriter(new java.io.FileOutputStream(outFile), encoding);
        } else {
            outWriter = new java.io.OutputStreamWriter(new java.io.FileOutputStream(outFile));
        }

        return new java.io.BufferedWriter(outWriter);
    }

    optimize = {
        closure: function (fileName, fileContents, outFileName, keepLines, config) {
            config = config || {};
            var result, mappings, optimized, compressed, baseName, writer,
                outBaseName, outFileNameMap, outFileNameMapContent,
                jscomp = Packages.com.google.javascript.jscomp,
                flags = Packages.com.google.common.flags,
                //Fake extern
                externSourceFile = closurefromCode("fakeextern.js", " "),
                //Set up source input
                jsSourceFile = closurefromCode(String(fileName), String(fileContents)),
                options, option, FLAG_compilation_level, compiler,
                Compiler = Packages.com.google.javascript.jscomp.Compiler;

            logger.trace("Minifying file: " + fileName);

            baseName = (new java.io.File(fileName)).getName();

            //Set up options
            options = new jscomp.CompilerOptions();
            for (option in config.CompilerOptions) {
                // options are false by default and jslint wanted an if statement in this for loop
                if (config.CompilerOptions[option]) {
                    options[option] = config.CompilerOptions[option];
                }

            }
            options.prettyPrint = keepLines || options.prettyPrint;

            FLAG_compilation_level = jscomp.CompilationLevel[config.CompilationLevel || 'SIMPLE_OPTIMIZATIONS'];
            FLAG_compilation_level.setOptionsForCompilationLevel(options);

            if (config.generateSourceMaps) {
                mappings = new java.util.ArrayList();

                mappings.add(new com.google.javascript.jscomp.SourceMap.LocationMapping(fileName, baseName + ".src"));
                options.setSourceMapLocationMappings(mappings);
                options.setSourceMapOutputPath(fileName + ".map");
            }

            //Trigger the compiler
            Compiler.setLoggingLevel(Packages.java.util.logging.Level[config.loggingLevel || 'WARNING']);
            compiler = new Compiler();

            result = compiler.compile(externSourceFile, jsSourceFile, options);
            if (result.success) {
                optimized = String(compiler.toSource());

                if (config.generateSourceMaps && result.sourceMap && outFileName) {
                    outBaseName = (new java.io.File(outFileName)).getName();

                    file.saveUtf8File(outFileName + ".src", fileContents);

                    outFileNameMap = outFileName + ".map";
                    writer = getFileWriter(outFileNameMap, "utf-8");
                    result.sourceMap.appendTo(writer, outFileName);
                    writer.close();

                    //Not sure how better to do this, but right now the .map file
                    //leaks the full OS path in the "file" property. Manually
                    //modify it to not do that.
                    file.saveFile(outFileNameMap,
                        file.readFile(outFileNameMap).replace(mapRegExp, '"file":"' + baseName + '"'));

                    fileContents = optimized + "\n//@ sourceMappingURL=" + outBaseName + ".map";
                } else {
                    fileContents = optimized;
                }
                return fileContents;
            } else {
                throw new Error('Cannot closure compile file: ' + fileName + '. Skipping it.');
            }

            return fileContents;
        }
    };

    return optimize;
});
}

if(env === 'xpconnect') {
define('xpconnect/optimize', {});
}
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint plusplus: true, nomen: true, regexp: true */
/*global define: false */

define('optimize', [ 'lang', 'logger', 'env!env/optimize', 'env!env/file', 'parse',
         'pragma', 'uglifyjs/index', 'uglifyjs2'],
function (lang,   logger,   envOptimize,        file,           parse,
          pragma, uglify,             uglify2) {
    'use strict';

    var optimize,
        cssImportRegExp = /\@import\s+(url\()?\s*([^);]+)\s*(\))?([\w, ]*)(;)?/ig,
        cssCommentImportRegExp = /\/\*[^\*]*@import[^\*]*\*\//g,
        cssUrlRegExp = /\url\(\s*([^\)]+)\s*\)?/g;

    /**
     * If an URL from a CSS url value contains start/end quotes, remove them.
     * This is not done in the regexp, since my regexp fu is not that strong,
     * and the CSS spec allows for ' and " in the URL if they are backslash escaped.
     * @param {String} url
     */
    function cleanCssUrlQuotes(url) {
        //Make sure we are not ending in whitespace.
        //Not very confident of the css regexps above that there will not be ending
        //whitespace.
        url = url.replace(/\s+$/, "");

        if (url.charAt(0) === "'" || url.charAt(0) === "\"") {
            url = url.substring(1, url.length - 1);
        }

        return url;
    }

    /**
     * Inlines nested stylesheets that have @import calls in them.
     * @param {String} fileName the file name
     * @param {String} fileContents the file contents
     * @param {String} cssImportIgnore comma delimited string of files to ignore
     * @param {String} cssPrefix string to be prefixed before relative URLs
     * @param {Object} included an object used to track the files already imported
     */
    function flattenCss(fileName, fileContents, cssImportIgnore, cssPrefix, included) {
        //Find the last slash in the name.
        fileName = fileName.replace(lang.backSlashRegExp, "/");
        var endIndex = fileName.lastIndexOf("/"),
            //Make a file path based on the last slash.
            //If no slash, so must be just a file name. Use empty string then.
            filePath = (endIndex !== -1) ? fileName.substring(0, endIndex + 1) : "",
            //store a list of merged files
            importList = [],
            skippedList = [];

        //First make a pass by removing an commented out @import calls.
        fileContents = fileContents.replace(cssCommentImportRegExp, '');

        //Make sure we have a delimited ignore list to make matching faster
        if (cssImportIgnore && cssImportIgnore.charAt(cssImportIgnore.length - 1) !== ",") {
            cssImportIgnore += ",";
        }

        fileContents = fileContents.replace(cssImportRegExp, function (fullMatch, urlStart, importFileName, urlEnd, mediaTypes) {
            //Only process media type "all" or empty media type rules.
            if (mediaTypes && ((mediaTypes.replace(/^\s\s*/, '').replace(/\s\s*$/, '')) !== "all")) {
                skippedList.push(fileName);
                return fullMatch;
            }

            importFileName = cleanCssUrlQuotes(importFileName);

            //Ignore the file import if it is part of an ignore list.
            if (cssImportIgnore && cssImportIgnore.indexOf(importFileName + ",") !== -1) {
                return fullMatch;
            }

            //Make sure we have a unix path for the rest of the operation.
            importFileName = importFileName.replace(lang.backSlashRegExp, "/");

            try {
                //if a relative path, then tack on the filePath.
                //If it is not a relative path, then the readFile below will fail,
                //and we will just skip that import.
                var fullImportFileName = importFileName.charAt(0) === "/" ? importFileName : filePath + importFileName,
                    importContents = file.readFile(fullImportFileName), i,
                    importEndIndex, importPath, fixedUrlMatch, colonIndex, parts, flat;

                //Skip the file if it has already been included.
                if (included[fullImportFileName]) {
                    return '';
                }
                included[fullImportFileName] = true;

                //Make sure to flatten any nested imports.
                flat = flattenCss(fullImportFileName, importContents, cssImportIgnore, cssPrefix, included);
                importContents = flat.fileContents;

                if (flat.importList.length) {
                    importList.push.apply(importList, flat.importList);
                }
                if (flat.skippedList.length) {
                    skippedList.push.apply(skippedList, flat.skippedList);
                }

                //Make the full import path
                importEndIndex = importFileName.lastIndexOf("/");

                //Make a file path based on the last slash.
                //If no slash, so must be just a file name. Use empty string then.
                importPath = (importEndIndex !== -1) ? importFileName.substring(0, importEndIndex + 1) : "";

                //fix url() on relative import (#5)
                importPath = importPath.replace(/^\.\//, '');

                //Modify URL paths to match the path represented by this file.
                importContents = importContents.replace(cssUrlRegExp, function (fullMatch, urlMatch) {
                    fixedUrlMatch = cleanCssUrlQuotes(urlMatch);
                    fixedUrlMatch = fixedUrlMatch.replace(lang.backSlashRegExp, "/");

                    //Only do the work for relative URLs. Skip things that start with / or have
                    //a protocol.
                    colonIndex = fixedUrlMatch.indexOf(":");
                    if (fixedUrlMatch.charAt(0) !== "/" && (colonIndex === -1 || colonIndex > fixedUrlMatch.indexOf("/"))) {
                        //It is a relative URL, tack on the cssPrefix and path prefix
                        urlMatch = cssPrefix + importPath + fixedUrlMatch;

                    } else {
                        logger.trace(importFileName + "\n  URL not a relative URL, skipping: " + urlMatch);
                    }

                    //Collapse .. and .
                    parts = urlMatch.split("/");
                    for (i = parts.length - 1; i > 0; i--) {
                        if (parts[i] === ".") {
                            parts.splice(i, 1);
                        } else if (parts[i] === "..") {
                            if (i !== 0 && parts[i - 1] !== "..") {
                                parts.splice(i - 1, 2);
                                i -= 1;
                            }
                        }
                    }

                    return "url(" + parts.join("/") + ")";
                });

                importList.push(fullImportFileName);
                return importContents;
            } catch (e) {
                logger.warn(fileName + "\n  Cannot inline css import, skipping: " + importFileName);
                return fullMatch;
            }
        });

        return {
            importList : importList,
            skippedList: skippedList,
            fileContents : fileContents
        };
    }

    optimize = {
        /**
         * Optimizes a file that contains JavaScript content. Optionally collects
         * plugin resources mentioned in a file, and then passes the content
         * through an minifier if one is specified via config.optimize.
         *
         * @param {String} fileName the name of the file to optimize
         * @param {String} fileContents the contents to optimize. If this is
         * a null value, then fileName will be used to read the fileContents.
         * @param {String} outFileName the name of the file to use for the
         * saved optimized content.
         * @param {Object} config the build config object.
         * @param {Array} [pluginCollector] storage for any plugin resources
         * found.
         */
        jsFile: function (fileName, fileContents, outFileName, config, pluginCollector) {
            if (!fileContents) {
                fileContents = file.readFile(fileName);
            }

            fileContents = optimize.js(fileName, fileContents, outFileName, config, pluginCollector);

            file.saveUtf8File(outFileName, fileContents);
        },

        /**
         * Optimizes a file that contains JavaScript content. Optionally collects
         * plugin resources mentioned in a file, and then passes the content
         * through an minifier if one is specified via config.optimize.
         *
         * @param {String} fileName the name of the file that matches the
         * fileContents.
         * @param {String} fileContents the string of JS to optimize.
         * @param {Object} [config] the build config object.
         * @param {Array} [pluginCollector] storage for any plugin resources
         * found.
         */
        js: function (fileName, fileContents, outFileName, config, pluginCollector) {
            var optFunc, optConfig,
                parts = (String(config.optimize)).split('.'),
                optimizerName = parts[0],
                keepLines = parts[1] === 'keepLines',
                licenseContents = '';

            config = config || {};

            //Apply pragmas/namespace renaming
            fileContents = pragma.process(fileName, fileContents, config, 'OnSave', pluginCollector);

            //Optimize the JS files if asked.
            if (optimizerName && optimizerName !== 'none') {
                optFunc = envOptimize[optimizerName] || optimize.optimizers[optimizerName];
                if (!optFunc) {
                    throw new Error('optimizer with name of "' +
                                    optimizerName +
                                    '" not found for this environment');
                }

                optConfig = config[optimizerName] || {};
                if (config.generateSourceMaps) {
                    optConfig.generateSourceMaps = !!config.generateSourceMaps;
                }

                try {
                    if (config.preserveLicenseComments) {
                        //Pull out any license comments for prepending after optimization.
                        try {
                            licenseContents = parse.getLicenseComments(fileName, fileContents);
                        } catch (e) {
                            throw new Error('Cannot parse file: ' + fileName + ' for comments. Skipping it. Error is:\n' + e.toString());
                        }
                    }

                    fileContents = licenseContents + optFunc(fileName,
                                                             fileContents,
                                                             outFileName,
                                                             keepLines,
                                                             optConfig);
                } catch (e) {
                    if (config.throwWhen && config.throwWhen.optimize) {
                        throw e;
                    } else {
                        logger.error(e);
                    }
                }
            }

            return fileContents;
        },

        /**
         * Optimizes one CSS file, inlining @import calls, stripping comments, and
         * optionally removes line returns.
         * @param {String} fileName the path to the CSS file to optimize
         * @param {String} outFileName the path to save the optimized file.
         * @param {Object} config the config object with the optimizeCss and
         * cssImportIgnore options.
         */
        cssFile: function (fileName, outFileName, config) {

            //Read in the file. Make sure we have a JS string.
            var originalFileContents = file.readFile(fileName),
                flat = flattenCss(fileName, originalFileContents, config.cssImportIgnore, config.cssPrefix, {}),
                //Do not use the flattened CSS if there was one that was skipped.
                fileContents = flat.skippedList.length ? originalFileContents : flat.fileContents,
                startIndex, endIndex, buildText, comment;

            if (flat.skippedList.length) {
                logger.warn('Cannot inline @imports for ' + fileName +
                            ',\nthe following files had media queries in them:\n' +
                            flat.skippedList.join('\n'));
            }

            //Do comment removal.
            try {
                if (config.optimizeCss.indexOf(".keepComments") === -1) {
                    startIndex = 0;
                    //Get rid of comments.
                    while ((startIndex = fileContents.indexOf("/*", startIndex)) !== -1) {
                        endIndex = fileContents.indexOf("*/", startIndex + 2);
                        if (endIndex === -1) {
                            throw "Improper comment in CSS file: " + fileName;
                        }
                        comment = fileContents.substring(startIndex, endIndex);

                        if (config.preserveLicenseComments &&
                            (comment.indexOf('license') !== -1 ||
                             comment.indexOf('opyright') !== -1 ||
                             comment.indexOf('(c)') !== -1)) {
                            //Keep the comment, just increment the startIndex
                            startIndex = endIndex;
                        } else {
                            fileContents = fileContents.substring(0, startIndex) + fileContents.substring(endIndex + 2, fileContents.length);
                            startIndex = 0;
                        }
                    }
                }
                //Get rid of newlines.
                if (config.optimizeCss.indexOf(".keepLines") === -1) {
                    fileContents = fileContents.replace(/[\r\n]/g, "");
                    fileContents = fileContents.replace(/\s+/g, " ");
                    fileContents = fileContents.replace(/\{\s/g, "{");
                    fileContents = fileContents.replace(/\s\}/g, "}");
                } else {
                    //Remove multiple empty lines.
                    fileContents = fileContents.replace(/(\r\n)+/g, "\r\n");
                    fileContents = fileContents.replace(/(\n)+/g, "\n");
                }
            } catch (e) {
                fileContents = originalFileContents;
                logger.error("Could not optimized CSS file: " + fileName + ", error: " + e);
            }

            file.saveUtf8File(outFileName, fileContents);

            //text output to stdout and/or written to build.txt file
            buildText = "\n"+ outFileName.replace(config.dir, "") +"\n----------------\n";
            flat.importList.push(fileName);
            buildText += flat.importList.map(function(path){
                return path.replace(config.dir, "");
            }).join("\n");

            return {
                importList: flat.importList,
                buildText: buildText +"\n"
            };
        },

        /**
         * Optimizes CSS files, inlining @import calls, stripping comments, and
         * optionally removes line returns.
         * @param {String} startDir the path to the top level directory
         * @param {Object} config the config object with the optimizeCss and
         * cssImportIgnore options.
         */
        css: function (startDir, config) {
            var buildText = "",
                importList = [],
                shouldRemove = config.dir && config.removeCombined,
                i, fileName, result, fileList;
            if (config.optimizeCss.indexOf("standard") !== -1) {
                fileList = file.getFilteredFileList(startDir, /\.css$/, true);
                if (fileList) {
                    for (i = 0; i < fileList.length; i++) {
                        fileName = fileList[i];
                        logger.trace("Optimizing (" + config.optimizeCss + ") CSS file: " + fileName);
                        result = optimize.cssFile(fileName, fileName, config);
                        buildText += result.buildText;
                        if (shouldRemove) {
                            result.importList.pop();
                            importList = importList.concat(result.importList);
                        }
                    }
                }

                if (shouldRemove) {
                    importList.forEach(function (path) {
                        if (file.exists(path)) {
                            file.deleteFile(path);
                        }
                    });
                }
            }
            return buildText;
        },

        optimizers: {
            uglify: function (fileName, fileContents, outFileName, keepLines, config) {
                var parser = uglify.parser,
                    processor = uglify.uglify,
                    ast, errMessage, errMatch;

                config = config || {};

                logger.trace("Uglifying file: " + fileName);

                try {
                    ast = parser.parse(fileContents, config.strict_semicolons);
                    if (config.no_mangle !== true) {
                        ast = processor.ast_mangle(ast, config);
                    }
                    ast = processor.ast_squeeze(ast, config);

                    fileContents = processor.gen_code(ast, config);

                    if (config.max_line_length) {
                        fileContents = processor.split_lines(fileContents, config.max_line_length);
                    }

                    //Add trailing semicolon to match uglifyjs command line version
                    fileContents += ';';
                } catch (e) {
                    errMessage = e.toString();
                    errMatch = /\nError(\r)?\n/.exec(errMessage);
                    if (errMatch) {
                        errMessage = errMessage.substring(0, errMatch.index);
                    }
                    throw new Error('Cannot uglify file: ' + fileName + '. Skipping it. Error is:\n' + errMessage);
                }
                return fileContents;
            },
            uglify2: function (fileName, fileContents, outFileName, keepLines, config) {
                var result,
                    uconfig = {},
                    baseName = fileName && fileName.split('/').pop();

                config = config || {};

                lang.mixin(uconfig, config, true);

                uconfig.fromString = true;

                if (config.generateSourceMaps && outFileName) {
                    uconfig.outSourceMap = baseName;
                }

                logger.trace("Uglify2 file: " + fileName);

                try {
                    result = uglify2.minify(fileContents, uconfig, baseName + '.src');

                    if (uconfig.outSourceMap && result.map) {
                        file.saveFile(outFileName + '.src', fileContents);
                        file.saveFile(outFileName + '.map', result.map);
                        fileContents = result.code + "\n//@ sourceMappingURL=" + baseName + ".map";
                    } else {
                        fileContents = result.code;
                    }
                } catch (e) {
                    throw new Error('Cannot uglify2 file: ' + fileName + '. Skipping it. Error is:\n' + e.toString());
                }
                return fileContents;
            }
        }
    };

    return optimize;
});
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*
 * This file patches require.js to communicate with the build system.
 */

//Using sloppy since this uses eval for some code like plugins,
//which may not be strict mode compliant. So if use strict is used
//below they will have strict rules applied and may cause an error.
/*jslint sloppy: true, nomen: true, plusplus: true, regexp: true */
/*global require, define: true */

//NOT asking for require as a dependency since the goal is to modify the
//global require below
define('requirePatch', [ 'env!env/file', 'pragma', 'parse', 'lang', 'logger', 'commonJs', 'prim'], function (
    file,
    pragma,
    parse,
    lang,
    logger,
    commonJs,
    prim
) {

    var allowRun = true,
        hasProp = lang.hasProp,
        falseProp = lang.falseProp,
        getOwn = lang.getOwn;

    //This method should be called when the patches to require should take hold.
    return function () {
        if (!allowRun) {
            return;
        }
        allowRun = false;

        var layer,
            pluginBuilderRegExp = /(["']?)pluginBuilder(["']?)\s*[=\:]\s*["']([^'"\s]+)["']/,
            oldNewContext = require.s.newContext,
            oldDef,

            //create local undefined values for module and exports,
            //so that when files are evaled in this function they do not
            //see the node values used for r.js
            exports,
            module;

        /**
         * Reset "global" build caches that are kept around between
         * build layer builds. Useful to do when there are multiple
         * top level requirejs.optimize() calls.
         */
        require._cacheReset = function () {
            //Stored raw text caches, used by browser use.
            require._cachedRawText = {};
            //Stored cached file contents for reuse in other layers.
            require._cachedFileContents = {};
            //Store which cached files contain a require definition.
            require._cachedDefinesRequireUrls = {};
        };
        require._cacheReset();

        /**
         * Makes sure the URL is something that can be supported by the
         * optimization tool.
         * @param {String} url
         * @returns {Boolean}
         */
        require._isSupportedBuildUrl = function (url) {
            //Ignore URLs with protocols, hosts or question marks, means either network
            //access is needed to fetch it or it is too dynamic. Note that
            //on Windows, full paths are used for some urls, which include
            //the drive, like c:/something, so need to test for something other
            //than just a colon.
            if (url.indexOf("://") === -1 && url.indexOf("?") === -1 &&
                    url.indexOf('empty:') !== 0 && url.indexOf('//') !== 0) {
                return true;
            } else {
                if (!layer.ignoredUrls[url]) {
                    if (url.indexOf('empty:') === -1) {
                        logger.info('Cannot optimize network URL, skipping: ' + url);
                    }
                    layer.ignoredUrls[url] = true;
                }
                return false;
            }
        };

        function normalizeUrlWithBase(context, moduleName, url) {
            //Adjust the URL if it was not transformed to use baseUrl.
            if (require.jsExtRegExp.test(moduleName)) {
                url = (context.config.dir || context.config.dirBaseUrl) + url;
            }
            return url;
        }

        //Overrides the new context call to add existing tracking features.
        require.s.newContext = function (name) {
            var context = oldNewContext(name),
                oldEnable = context.enable,
                moduleProto = context.Module.prototype,
                oldInit = moduleProto.init,
                oldCallPlugin = moduleProto.callPlugin;

            //Only do this for the context used for building.
            if (name === '_') {
                //For build contexts, do everything sync
                context.nextTick = function (fn) {
                    fn();
                };

                context.needFullExec = {};
                context.fullExec = {};
                context.plugins = {};
                context.buildShimExports = {};

                //Override the shim exports function generator to just
                //spit out strings that can be used in the stringified
                //build output.
                context.makeShimExports = function (value) {
                    function fn() {
                        return '(function (global) {\n' +
                            '    return function () {\n' +
                            '        var ret, fn;\n' +
                            (value.init ?
                                    ('       fn = ' + value.init.toString() + ';\n' +
                                    '        ret = fn.apply(global, arguments);\n') : '') +
                            (value.exports ?
                                    '        return ret || global.' + value.exports + ';\n' :
                                    '        return ret;\n') +
                            '    };\n' +
                            '}(this))';
                    }

                    return fn;
                };

                context.enable = function (depMap, parent) {
                    var id = depMap.id,
                        parentId = parent && parent.map.id,
                        needFullExec = context.needFullExec,
                        fullExec = context.fullExec,
                        mod = getOwn(context.registry, id);

                    if (mod && !mod.defined) {
                        if (parentId && getOwn(needFullExec, parentId)) {
                            needFullExec[id] = true;
                        }

                    } else if ((getOwn(needFullExec, id) && falseProp(fullExec, id)) ||
                               (parentId && getOwn(needFullExec, parentId) &&
                                falseProp(fullExec, id))) {
                        context.require.undef(id);
                    }

                    return oldEnable.apply(context, arguments);
                };

                //Override load so that the file paths can be collected.
                context.load = function (moduleName, url) {
                    /*jslint evil: true */
                    var contents, pluginBuilderMatch, builderName,
                        shim, shimExports;

                    //Do not mark the url as fetched if it is
                    //not an empty: URL, used by the optimizer.
                    //In that case we need to be sure to call
                    //load() for each module that is mapped to
                    //empty: so that dependencies are satisfied
                    //correctly.
                    if (url.indexOf('empty:') === 0) {
                        delete context.urlFetched[url];
                    }

                    //Only handle urls that can be inlined, so that means avoiding some
                    //URLs like ones that require network access or may be too dynamic,
                    //like JSONP
                    if (require._isSupportedBuildUrl(url)) {
                        //Adjust the URL if it was not transformed to use baseUrl.
                        url = normalizeUrlWithBase(context, moduleName, url);

                        //Save the module name to path  and path to module name mappings.
                        layer.buildPathMap[moduleName] = url;
                        layer.buildFileToModule[url] = moduleName;

                        if (hasProp(context.plugins, moduleName)) {
                            //plugins need to have their source evaled as-is.
                            context.needFullExec[moduleName] = true;
                        }

                        prim().start(function () {
                            if (hasProp(require._cachedFileContents, url) &&
                                    (falseProp(context.needFullExec, moduleName) ||
                                    getOwn(context.fullExec, moduleName))) {
                                contents = require._cachedFileContents[url];

                                //If it defines require, mark it so it can be hoisted.
                                //Done here and in the else below, before the
                                //else block removes code from the contents.
                                //Related to #263
                                if (!layer.existingRequireUrl && require._cachedDefinesRequireUrls[url]) {
                                    layer.existingRequireUrl = url;
                                }
                            } else {
                                //Load the file contents, process for conditionals, then
                                //evaluate it.
                                return require._cacheReadAsync(url).then(function (text) {
                                    contents = text;

                                    if (context.config.cjsTranslate) {
                                        contents = commonJs.convert(url, contents);
                                    }

                                    //If there is a read filter, run it now.
                                    if (context.config.onBuildRead) {
                                        contents = context.config.onBuildRead(moduleName, url, contents);
                                    }

                                    contents = pragma.process(url, contents, context.config, 'OnExecute');

                                    //Find out if the file contains a require() definition. Need to know
                                    //this so we can inject plugins right after it, but before they are needed,
                                    //and to make sure this file is first, so that define calls work.
                                    try {
                                        if (!layer.existingRequireUrl && parse.definesRequire(url, contents)) {
                                            layer.existingRequireUrl = url;
                                            require._cachedDefinesRequireUrls[url] = true;
                                        }
                                    } catch (e1) {
                                        throw new Error('Parse error using esprima ' +
                                                        'for file: ' + url + '\n' + e1);
                                    }
                                }).then(function () {
                                    if (hasProp(context.plugins, moduleName)) {
                                        //This is a loader plugin, check to see if it has a build extension,
                                        //otherwise the plugin will act as the plugin builder too.
                                        pluginBuilderMatch = pluginBuilderRegExp.exec(contents);
                                        if (pluginBuilderMatch) {
                                            //Load the plugin builder for the plugin contents.
                                            builderName = context.makeModuleMap(pluginBuilderMatch[3],
                                                                                context.makeModuleMap(moduleName),
                                                                                null,
                                                                                true).id;
                                            return require._cacheReadAsync(context.nameToUrl(builderName));
                                        }
                                    }
                                    return contents;
                                }).then(function (text) {
                                    contents = text;

                                    //Parse out the require and define calls.
                                    //Do this even for plugins in case they have their own
                                    //dependencies that may be separate to how the pluginBuilder works.
                                    try {
                                        if (falseProp(context.needFullExec, moduleName)) {
                                            contents = parse(moduleName, url, contents, {
                                                insertNeedsDefine: true,
                                                has: context.config.has,
                                                findNestedDependencies: context.config.findNestedDependencies
                                            });
                                        }
                                    } catch (e2) {
                                        throw new Error('Parse error using esprima ' +
                                                        'for file: ' + url + '\n' + e2);
                                    }

                                    require._cachedFileContents[url] = contents;
                                });
                            }
                        }).then(function () {
                            if (contents) {
                                eval(contents);
                            }

                            try {
                                //If have a string shim config, and this is
                                //a fully executed module, try to see if
                                //it created a variable in this eval scope
                                if (getOwn(context.needFullExec, moduleName)) {
                                    shim = getOwn(context.config.shim, moduleName);
                                    if (shim && shim.exports) {
                                        shimExports = eval(shim.exports);
                                        if (typeof shimExports !== 'undefined') {
                                            context.buildShimExports[moduleName] = shimExports;
                                        }
                                    }
                                }

                                //Need to close out completion of this module
                                //so that listeners will get notified that it is available.
                                context.completeLoad(moduleName);
                            } catch (e) {
                                //Track which module could not complete loading.
                                if (!e.moduleTree) {
                                    e.moduleTree = [];
                                }
                                e.moduleTree.push(moduleName);
                                throw e;
                            }
                        }).then(null, function (eOuter) {

                            if (!eOuter.fileName) {
                                eOuter.fileName = url;
                            }
                            throw eOuter;
                        }).end();
                    } else {
                        //With unsupported URLs still need to call completeLoad to
                        //finish loading.
                        context.completeLoad(moduleName);
                    }
                };

                //Marks module has having a name, and optionally executes the
                //callback, but only if it meets certain criteria.
                context.execCb = function (name, cb, args, exports) {
                    var buildShimExports = getOwn(layer.context.buildShimExports, name);

                    if (buildShimExports) {
                        return buildShimExports;
                    } else if (cb.__requireJsBuild || getOwn(layer.context.needFullExec, name)) {
                        return cb.apply(exports, args);
                    }
                    return undefined;
                };

                moduleProto.init = function (depMaps) {
                    if (context.needFullExec[this.map.id]) {
                        lang.each(depMaps, lang.bind(this, function (depMap) {
                            if (typeof depMap === 'string') {
                                depMap = context.makeModuleMap(depMap,
                                               (this.map.isDefine ? this.map : this.map.parentMap));
                            }

                            if (!context.fullExec[depMap.id]) {
                                context.require.undef(depMap.id);
                            }
                        }));
                    }

                    return oldInit.apply(this, arguments);
                };

                moduleProto.callPlugin = function () {
                    var map = this.map,
                        pluginMap = context.makeModuleMap(map.prefix),
                        pluginId = pluginMap.id,
                        pluginMod = getOwn(context.registry, pluginId);

                    context.plugins[pluginId] = true;
                    context.needFullExec[pluginId] = true;

                    //If the module is not waiting to finish being defined,
                    //undef it and start over, to get full execution.
                    if (falseProp(context.fullExec, pluginId) && (!pluginMod || pluginMod.defined)) {
                        context.require.undef(pluginMap.id);
                    }

                    return oldCallPlugin.apply(this, arguments);
                };
            }

            return context;
        };

        //Clear up the existing context so that the newContext modifications
        //above will be active.
        delete require.s.contexts._;

        /** Reset state for each build layer pass. */
        require._buildReset = function () {
            var oldContext = require.s.contexts._;

            //Clear up the existing context.
            delete require.s.contexts._;

            //Set up new context, so the layer object can hold onto it.
            require({});

            layer = require._layer = {
                buildPathMap: {},
                buildFileToModule: {},
                buildFilePaths: [],
                pathAdded: {},
                modulesWithNames: {},
                needsDefine: {},
                existingRequireUrl: "",
                ignoredUrls: {},
                context: require.s.contexts._
            };

            //Return the previous context in case it is needed, like for
            //the basic config object.
            return oldContext;
        };

        require._buildReset();

        //Override define() to catch modules that just define an object, so that
        //a dummy define call is not put in the build file for them. They do
        //not end up getting defined via context.execCb, so we need to catch them
        //at the define call.
        oldDef = define;

        //This function signature does not have to be exact, just match what we
        //are looking for.
        define = function (name) {
            if (typeof name === "string" && falseProp(layer.needsDefine, name)) {
                layer.modulesWithNames[name] = true;
            }
            return oldDef.apply(require, arguments);
        };

        define.amd = oldDef.amd;

        //Add some utilities for plugins
        require._readFile = file.readFile;
        require._fileExists = function (path) {
            return file.exists(path);
        };

        //Called when execManager runs for a dependency. Used to figure out
        //what order of execution.
        require.onResourceLoad = function (context, map) {
            var id = map.id,
                url;

            //If build needed a full execution, indicate it
            //has been done now. But only do it if the context is tracking
            //that. Only valid for the context used in a build, not for
            //other contexts being run, like for useLib, plain requirejs
            //use in node/rhino.
            if (context.needFullExec && getOwn(context.needFullExec, id)) {
                context.fullExec[id] = true;
            }

            //A plugin.
            if (map.prefix) {
                if (falseProp(layer.pathAdded, id)) {
                    layer.buildFilePaths.push(id);
                    //For plugins the real path is not knowable, use the name
                    //for both module to file and file to module mappings.
                    layer.buildPathMap[id] = id;
                    layer.buildFileToModule[id] = id;
                    layer.modulesWithNames[id] = true;
                    layer.pathAdded[id] = true;
                }
            } else if (map.url && require._isSupportedBuildUrl(map.url)) {
                //If the url has not been added to the layer yet, and it
                //is from an actual file that was loaded, add it now.
                url = normalizeUrlWithBase(context, id, map.url);
                if (!layer.pathAdded[url] && getOwn(layer.buildPathMap, id)) {
                    //Remember the list of dependencies for this layer.
                    layer.buildFilePaths.push(url);
                    layer.pathAdded[url] = true;
                }
            }
        };

        //Called by output of the parse() function, when a file does not
        //explicitly call define, probably just require, but the parse()
        //function normalizes on define() for dependency mapping and file
        //ordering works correctly.
        require.needsDefine = function (moduleName) {
            layer.needsDefine[moduleName] = true;
        };
    };
});
/**
 * @license RequireJS Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint */
/*global define: false, console: false */

define('commonJs', ['env!env/file', 'parse'], function (file, parse) {
    'use strict';
    var commonJs = {
        //Set to false if you do not want this file to log. Useful in environments
        //like node where you want the work to happen without noise.
        useLog: true,

        convertDir: function (commonJsPath, savePath) {
            var fileList, i,
                jsFileRegExp = /\.js$/,
                fileName, convertedFileName, fileContents;

            //Get list of files to convert.
            fileList = file.getFilteredFileList(commonJsPath, /\w/, true);

            //Normalize on front slashes and make sure the paths do not end in a slash.
            commonJsPath = commonJsPath.replace(/\\/g, "/");
            savePath = savePath.replace(/\\/g, "/");
            if (commonJsPath.charAt(commonJsPath.length - 1) === "/") {
                commonJsPath = commonJsPath.substring(0, commonJsPath.length - 1);
            }
            if (savePath.charAt(savePath.length - 1) === "/") {
                savePath = savePath.substring(0, savePath.length - 1);
            }

            //Cycle through all the JS files and convert them.
            if (!fileList || !fileList.length) {
                if (commonJs.useLog) {
                    if (commonJsPath === "convert") {
                        //A request just to convert one file.
                        console.log('\n\n' + commonJs.convert(savePath, file.readFile(savePath)));
                    } else {
                        console.log("No files to convert in directory: " + commonJsPath);
                    }
                }
            } else {
                for (i = 0; i < fileList.length; i++) {
                    fileName = fileList[i];
                    convertedFileName = fileName.replace(commonJsPath, savePath);

                    //Handle JS files.
                    if (jsFileRegExp.test(fileName)) {
                        fileContents = file.readFile(fileName);
                        fileContents = commonJs.convert(fileName, fileContents);
                        file.saveUtf8File(convertedFileName, fileContents);
                    } else {
                        //Just copy the file over.
                        file.copyFile(fileName, convertedFileName, true);
                    }
                }
            }
        },

        /**
         * Does the actual file conversion.
         *
         * @param {String} fileName the name of the file.
         *
         * @param {String} fileContents the contents of a file :)
         *
         * @returns {String} the converted contents
         */
        convert: function (fileName, fileContents) {
            //Strip out comments.
            try {
                var preamble = '',
                    commonJsProps = parse.usesCommonJs(fileName, fileContents);

                //First see if the module is not already RequireJS-formatted.
                if (parse.usesAmdOrRequireJs(fileName, fileContents) || !commonJsProps) {
                    return fileContents;
                }

                if (commonJsProps.dirname || commonJsProps.filename) {
                    preamble = 'var __filename = module.uri || "", ' +
                               '__dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1); ';
                }

                //Construct the wrapper boilerplate.
                fileContents = 'define(function (require, exports, module) {' +
                    preamble +
                    fileContents +
                    '\n});\n';

            } catch (e) {
                console.log("commonJs.convert: COULD NOT CONVERT: " + fileName + ", so skipping it. Error was: " + e);
                return fileContents;
            }

            return fileContents;
        }
    };

    return commonJs;
});
/**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*jslint plusplus: true, nomen: true, regexp: true  */
/*global define, requirejs */


define('build', function (require) {
    'use strict';

    var build, buildBaseConfig,
        lang = require('lang'),
        prim = require('prim'),
        logger = require('logger'),
        file = require('env!env/file'),
        parse = require('parse'),
        optimize = require('optimize'),
        pragma = require('pragma'),
        transform = require('transform'),
        requirePatch = require('requirePatch'),
        env = require('env'),
        quit = require('env!env/quit'),
        commonJs = require('commonJs'),
        hasProp = lang.hasProp,
        getOwn = lang.getOwn,
        falseProp = lang.falseProp,
        endsWithSemiColonRegExp = /;\s*$/;

    prim.nextTick = function (fn) {
        fn();
    };

    //Now map require to the outermost requirejs, now that we have
    //local dependencies for this module. The rest of the require use is
    //manipulating the requirejs loader.
    require = requirejs;

    //Caching function for performance. Attached to
    //require so it can be reused in requirePatch.js. _cachedRawText
    //set up by requirePatch.js
    require._cacheReadAsync = function (path, encoding) {
        var d;

        if (lang.hasProp(require._cachedRawText, path)) {
            d = prim();
            d.resolve(require._cachedRawText[path]);
            return d.promise;
        } else {
            return file.readFileAsync(path, encoding).then(function (text) {
                require._cachedRawText[path] = text;
                return text;
            });
        }
    };

    buildBaseConfig = {
        appDir: "",
        pragmas: {},
        paths: {},
        optimize: "uglify",
        optimizeCss: "standard.keepLines",
        inlineText: true,
        isBuild: true,
        optimizeAllPluginResources: false,
        findNestedDependencies: false,
        preserveLicenseComments: true,
        //By default, all files/directories are copied, unless
        //they match this regexp, by default just excludes .folders
        dirExclusionRegExp: file.dirExclusionRegExp,
        _buildPathToModuleIndex: {}
    };

    /**
     * Some JS may not be valid if concatenated with other JS, in particular
     * the style of omitting semicolons and rely on ASI. Add a semicolon in
     * those cases.
     */
    function addSemiColon(text) {
        if (endsWithSemiColonRegExp.test(text)) {
            return text;
        } else {
            return text + ";";
        }
    }

    function endsWithSlash(dirName) {
        if (dirName.charAt(dirName.length - 1) !== "/") {
            dirName += "/";
        }
        return dirName;
    }

    //Method used by plugin writeFile calls, defined up here to avoid
    //jslint warning about "making a function in a loop".
    function makeWriteFile(namespace, layer) {
        function writeFile(name, contents) {
            logger.trace('Saving plugin-optimized file: ' + name);
            file.saveUtf8File(name, contents);
        }

        writeFile.asModule = function (moduleName, fileName, contents) {
            writeFile(fileName,
                build.toTransport(namespace, moduleName, fileName, contents, layer));
        };

        return writeFile;
    }

    /**
     * Main API entry point into the build. The args argument can either be
     * an array of arguments (like the onese passed on a command-line),
     * or it can be a JavaScript object that has the format of a build profile
     * file.
     *
     * If it is an object, then in addition to the normal properties allowed in
     * a build profile file, the object should contain one other property:
     *
     * The object could also contain a "buildFile" property, which is a string
     * that is the file path to a build profile that contains the rest
     * of the build profile directives.
     *
     * This function does not return a status, it should throw an error if
     * there is a problem completing the build.
     */
    build = function (args) {
        var buildFile, cmdConfig, errorMsg, errorStack, stackMatch, errorTree,
            i, j, errorMod,
            stackRegExp = /( {4}at[^\n]+)\n/,
            standardIndent = '  ';

        return prim().start(function () {
            if (!args || lang.isArray(args)) {
                if (!args || args.length < 1) {
                    logger.error("build.js buildProfile.js\n" +
                          "where buildProfile.js is the name of the build file (see example.build.js for hints on how to make a build file).");
                    return undefined;
                }

                //Next args can include a build file path as well as other build args.
                //build file path comes first. If it does not contain an = then it is
                //a build file path. Otherwise, just all build args.
                if (args[0].indexOf("=") === -1) {
                    buildFile = args[0];
                    args.splice(0, 1);
                }

                //Remaining args are options to the build
                cmdConfig = build.convertArrayToObject(args);
                cmdConfig.buildFile = buildFile;
            } else {
                cmdConfig = args;
            }

            return build._run(cmdConfig);
        }).then(null, function (e) {
            errorMsg = e.toString();
            errorTree = e.moduleTree;
            stackMatch = stackRegExp.exec(errorMsg);

            if (stackMatch) {
                errorMsg += errorMsg.substring(0, stackMatch.index + stackMatch[0].length + 1);
            }

            //If a module tree that shows what module triggered the error,
            //print it out.
            if (errorTree && errorTree.length > 0) {
                errorMsg += '\nIn module tree:\n';

                for (i = errorTree.length - 1; i > -1; i--) {
                    errorMod = errorTree[i];
                    if (errorMod) {
                        for (j = errorTree.length - i; j > -1; j--) {
                            errorMsg += standardIndent;
                        }
                        errorMsg += errorMod + '\n';
                    }
                }

                logger.error(errorMsg);
            }

            errorStack = e.stack;

            if (typeof args === 'string' && args.indexOf('stacktrace=true') !== -1) {
                errorMsg += '\n' + errorStack;
            } else {
                if (!stackMatch && errorStack) {
                    //Just trim out the first "at" in the stack.
                    stackMatch = stackRegExp.exec(errorStack);
                    if (stackMatch) {
                        errorMsg += '\n' + stackMatch[0] || '';
                    }
                }
            }

            if (logger.level > logger.ERROR) {
                throw new Error(errorMsg);
            } else {
                logger.error(errorMsg);
                quit(1);
            }
        });
    };

    build._run = function (cmdConfig) {
        var buildPaths, fileName, fileNames,
            paths, i,
            baseConfig, config,
            modules, srcPath, buildContext,
            destPath, moduleMap, parentModuleMap, context,
            resources, resource, plugin, fileContents,
            pluginProcessed = {},
            buildFileContents = "",
            pluginCollector = {};

        return prim().start(function () {
            var prop;

            //Can now run the patches to require.js to allow it to be used for
            //build generation. Do it here instead of at the top of the module
            //because we want normal require behavior to load the build tool
            //then want to switch to build mode.
            requirePatch();

            config = build.createConfig(cmdConfig);
            paths = config.paths;

            //Remove the previous build dir, in case it contains source transforms,
            //like the ones done with onBuildRead and onBuildWrite.
            if (config.dir && !config.keepBuildDir && file.exists(config.dir)) {
                file.deleteFile(config.dir);
            }

            if (!config.out && !config.cssIn) {
                //This is not just a one-off file build but a full build profile, with
                //lots of files to process.

                //First copy all the baseUrl content
                file.copyDir((config.appDir || config.baseUrl), config.dir, /\w/, true);

                //Adjust baseUrl if config.appDir is in play, and set up build output paths.
                buildPaths = {};
                if (config.appDir) {
                    //All the paths should be inside the appDir, so just adjust
                    //the paths to use the dirBaseUrl
                    for (prop in paths) {
                        if (hasProp(paths, prop)) {
                            buildPaths[prop] = paths[prop].replace(config.appDir, config.dir);
                        }
                    }
                } else {
                    //If no appDir, then make sure to copy the other paths to this directory.
                    for (prop in paths) {
                        if (hasProp(paths, prop)) {
                            //Set up build path for each path prefix, but only do so
                            //if the path falls out of the current baseUrl
                            if (paths[prop].indexOf(config.baseUrl) === 0) {
                                buildPaths[prop] = paths[prop].replace(config.baseUrl, config.dirBaseUrl);
                            } else {
                                buildPaths[prop] = paths[prop] === 'empty:' ? 'empty:' : prop.replace(/\./g, "/");

                                //Make sure source path is fully formed with baseUrl,
                                //if it is a relative URL.
                                srcPath = paths[prop];
                                if (srcPath.indexOf('/') !== 0 && srcPath.indexOf(':') === -1) {
                                    srcPath = config.baseUrl + srcPath;
                                }

                                destPath = config.dirBaseUrl + buildPaths[prop];

                                //Skip empty: paths
                                if (srcPath !== 'empty:') {
                                    //If the srcPath is a directory, copy the whole directory.
                                    if (file.exists(srcPath) && file.isDirectory(srcPath)) {
                                        //Copy files to build area. Copy all files (the /\w/ regexp)
                                        file.copyDir(srcPath, destPath, /\w/, true);
                                    } else {
                                        //Try a .js extension
                                        srcPath += '.js';
                                        destPath += '.js';
                                        file.copyFile(srcPath, destPath);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            //Figure out source file location for each module layer. Do this by seeding require
            //with source area configuration. This is needed so that later the module layers
            //can be manually copied over to the source area, since the build may be
            //require multiple times and the above copyDir call only copies newer files.
            require({
                baseUrl: config.baseUrl,
                paths: paths,
                packagePaths: config.packagePaths,
                packages: config.packages
            });
            buildContext = require.s.contexts._;
            modules = config.modules;

            if (modules) {
                modules.forEach(function (module) {
                    if (module.name) {
                        module._sourcePath = buildContext.nameToUrl(module.name);
                        //If the module does not exist, and this is not a "new" module layer,
                        //as indicated by a true "create" property on the module, and
                        //it is not a plugin-loaded resource, then throw an error.
                        if (!file.exists(module._sourcePath) && !module.create &&
                                module.name.indexOf('!') === -1) {
                            throw new Error("ERROR: module path does not exist: " +
                                            module._sourcePath + " for module named: " + module.name +
                                            ". Path is relative to: " + file.absPath('.'));
                        }
                    }
                });
            }

            if (config.out) {
                //Just set up the _buildPath for the module layer.
                require(config);
                if (!config.cssIn) {
                    config.modules[0]._buildPath = typeof config.out === 'function' ?
                                                   'FUNCTION' : config.out;
                }
            } else if (!config.cssIn) {
                //Now set up the config for require to use the build area, and calculate the
                //build file locations. Pass along any config info too.
                baseConfig = {
                    baseUrl: config.dirBaseUrl,
                    paths: buildPaths
                };

                lang.mixin(baseConfig, config);
                require(baseConfig);

                if (modules) {
                    modules.forEach(function (module) {
                        if (module.name) {
                            module._buildPath = buildContext.nameToUrl(module.name, null);
                            if (!module.create) {
                                file.copyFile(module._sourcePath, module._buildPath);
                            }
                        }
                    });
                }
            }

            //Run CSS optimizations before doing JS module tracing, to allow
            //things like text loader plugins loading CSS to get the optimized
            //CSS.
            if (config.optimizeCss && config.optimizeCss !== "none" && config.dir) {
                buildFileContents += optimize.css(config.dir, config);
            }
        }).then(function () {
            var actions = [];

            if (modules) {
                actions = modules.map(function (module, i) {
                    return function () {
                        //Save off buildPath to module index in a hash for quicker
                        //lookup later.
                        config._buildPathToModuleIndex[module._buildPath] = i;

                        //Call require to calculate dependencies.
                        return build.traceDependencies(module, config)
                            .then(function (layer) {
                                module.layer = layer;
                            });
                    };
                });

                return prim.serial(actions);
            }
        }).then(function () {
            var actions;

            if (modules) {
                //Now build up shadow layers for anything that should be excluded.
                //Do this after tracing dependencies for each module, in case one
                //of those modules end up being one of the excluded values.
                actions = modules.map(function (module) {
                    return function () {
                        if (module.exclude) {
                            module.excludeLayers = [];
                            return prim.serial(module.exclude.map(function (exclude, i) {
                                return function () {
                                    //See if it is already in the list of modules.
                                    //If not trace dependencies for it.
                                    var found = build.findBuildModule(exclude, modules);
                                    if (found) {
                                        module.excludeLayers[i] = found;
                                    } else {
                                        return build.traceDependencies({name: exclude}, config)
                                            .then(function (layer) {
                                                module.excludeLayers[i] = { layer: layer };
                                            });
                                    }
                                };
                            }));
                        }
                    };
                });

                return prim.serial(actions);
            }
        }).then(function () {
            if (modules) {
                return prim.serial(modules.map(function (module) {
                    return function () {
                        if (module.exclude) {
                            //module.exclude is an array of module names. For each one,
                            //get the nested dependencies for it via a matching entry
                            //in the module.excludeLayers array.
                            module.exclude.forEach(function (excludeModule, i) {
                                var excludeLayer = module.excludeLayers[i].layer,
                                    map = excludeLayer.buildFileToModule;
                                excludeLayer.buildFilePaths.forEach(function(filePath){
                                    build.removeModulePath(map[filePath], filePath, module.layer);
                                });
                            });
                        }
                        if (module.excludeShallow) {
                            //module.excludeShallow is an array of module names.
                            //shallow exclusions are just that module itself, and not
                            //its nested dependencies.
                            module.excludeShallow.forEach(function (excludeShallowModule) {
                                var path = getOwn(module.layer.buildPathMap, excludeShallowModule);
                                if (path) {
                                    build.removeModulePath(excludeShallowModule, path, module.layer);
                                }
                            });
                        }

                        //Flatten them and collect the build output for each module.
                        return build.flattenModule(module, module.layer, config).then(function (builtModule) {
                            //Save it to a temp file for now, in case there are other layers that
                            //contain optimized content that should not be included in later
                            //layer optimizations. See issue #56.
                            if (module._buildPath === 'FUNCTION') {
                                module._buildText = builtModule.text;
                            } else {
                                file.saveUtf8File(module._buildPath + '-temp', builtModule.text);
                            }
                            buildFileContents += builtModule.buildText;
                        });
                    };
                }));
            }
        }).then(function () {
            var moduleName;
            if (modules) {
                //Now move the build layers to their final position.
                modules.forEach(function (module) {
                    var finalPath = module._buildPath;
                    if (finalPath !== 'FUNCTION') {
                        if (file.exists(finalPath)) {
                            file.deleteFile(finalPath);
                        }
                        file.renameFile(finalPath + '-temp', finalPath);

                        //And finally, if removeCombined is specified, remove
                        //any of the files that were used in this layer.
                        //Be sure not to remove other build layers.
                        if (config.removeCombined) {
                            module.layer.buildFilePaths.forEach(function (path) {
                                if (file.exists(path) && !modules.some(function (mod) {
                                        return mod._buildPath === path;
                                    })) {
                                    file.deleteFile(path);
                                }
                            });
                        }
                    }
                });
            }

            //If removeCombined in play, remove any empty directories that
            //may now exist because of its use
            if (config.removeCombined && !config.out && config.dir) {
                file.deleteEmptyDirs(config.dir);
            }

            //Do other optimizations.
            if (config.out && !config.cssIn) {
                //Just need to worry about one JS file.
                fileName = config.modules[0]._buildPath;
                if (fileName === 'FUNCTION') {
                    config.modules[0]._buildText = optimize.js(fileName,
                                                               config.modules[0]._buildText,
                                                               null,
                                                               config);
                } else {
                    optimize.jsFile(fileName, null, fileName, config);
                }
            } else if (!config.cssIn) {
                //Normal optimizations across modules.

                //JS optimizations.
                fileNames = file.getFilteredFileList(config.dir, /\.js$/, true);
                fileNames.forEach(function (fileName) {
                    var cfg, override, moduleIndex;

                    //Generate the module name from the config.dir root.
                    moduleName = fileName.replace(config.dir, '');
                    //Get rid of the extension
                    moduleName = moduleName.substring(0, moduleName.length - 3);

                    //If there is an override for a specific layer build module,
                    //and this file is that module, mix in the override for use
                    //by optimize.jsFile.
                    moduleIndex = getOwn(config._buildPathToModuleIndex, fileName);
                    //Normalize, since getOwn could have returned undefined
                    moduleIndex = moduleIndex === 0 || moduleIndex > 0 ? moduleIndex : -1;

                    //Try to avoid extra work if the other files do not need to
                    //be read. Build layers should be processed at the very
                    //least for optimization.
                    if (moduleIndex > -1 || !config.skipDirOptimize ||
                            config.normalizeDirDefines === "all" ||
                            config.cjsTranslate) {
                        //Convert the file to transport format, but without a name
                        //inserted (by passing null for moduleName) since the files are
                        //standalone, one module per file.
                        fileContents = file.readFile(fileName);

                        //For builds, if wanting cjs translation, do it now, so that
                        //the individual modules can be loaded cross domain via
                        //plain script tags.
                        if (config.cjsTranslate) {
                            fileContents = commonJs.convert(fileName, fileContents);
                        }

                        //Only do transport normalization if this is not a build
                        //layer (since it was already normalized) and if
                        //normalizeDirDefines indicated all should be done.
                        if (moduleIndex === -1 && config.normalizeDirDefines === "all") {
                            fileContents = build.toTransport(config.namespace,
                                                         null,
                                                         fileName,
                                                         fileContents);
                        }

                        override = moduleIndex > -1 ?
                                   config.modules[moduleIndex].override : null;
                        if (override) {
                            cfg = build.createOverrideConfig(config, override);
                        } else {
                            cfg = config;
                        }

                        if (moduleIndex > -1 || !config.skipDirOptimize) {
                            optimize.jsFile(fileName, fileContents, fileName, cfg, pluginCollector);
                        }
                    }
                });

                //Normalize all the plugin resources.
                context = require.s.contexts._;

                for (moduleName in pluginCollector) {
                    if (hasProp(pluginCollector, moduleName)) {
                        parentModuleMap = context.makeModuleMap(moduleName);
                        resources = pluginCollector[moduleName];
                        for (i = 0; i < resources.length; i++) {
                            resource = resources[i];
                            moduleMap = context.makeModuleMap(resource, parentModuleMap);
                            if (falseProp(context.plugins, moduleMap.prefix)) {
                                //Set the value in context.plugins so it
                                //will be evaluated as a full plugin.
                                context.plugins[moduleMap.prefix] = true;

                                //Do not bother if the plugin is not available.
                                if (!file.exists(require.toUrl(moduleMap.prefix + '.js'))) {
                                    continue;
                                }

                                //Rely on the require in the build environment
                                //to be synchronous
                                context.require([moduleMap.prefix]);

                                //Now that the plugin is loaded, redo the moduleMap
                                //since the plugin will need to normalize part of the path.
                                moduleMap = context.makeModuleMap(resource, parentModuleMap);
                            }

                            //Only bother with plugin resources that can be handled
                            //processed by the plugin, via support of the writeFile
                            //method.
                            if (falseProp(pluginProcessed, moduleMap.id)) {
                                //Only do the work if the plugin was really loaded.
                                //Using an internal access because the file may
                                //not really be loaded.
                                plugin = getOwn(context.defined, moduleMap.prefix);
                                if (plugin && plugin.writeFile) {
                                    plugin.writeFile(
                                        moduleMap.prefix,
                                        moduleMap.name,
                                        require,
                                        makeWriteFile(
                                            config.namespace
                                        ),
                                        context.config
                                    );
                                }

                                pluginProcessed[moduleMap.id] = true;
                            }
                        }

                    }
                }

                //console.log('PLUGIN COLLECTOR: ' + JSON.stringify(pluginCollector, null, "  "));


                //All module layers are done, write out the build.txt file.
                file.saveUtf8File(config.dir + "build.txt", buildFileContents);
            }

            //If just have one CSS file to optimize, do that here.
            if (config.cssIn) {
                buildFileContents += optimize.cssFile(config.cssIn, config.out, config).buildText;
            }

            if (typeof config.out === 'function') {
                config.out(config.modules[0]._buildText);
            }

            //Print out what was built into which layers.
            if (buildFileContents) {
                logger.info(buildFileContents);
                return buildFileContents;
            }

            return '';
        });
    };

    /**
     * Converts command line args like "paths.foo=../some/path"
     * result.paths = { foo: '../some/path' } where prop = paths,
     * name = paths.foo and value = ../some/path, so it assumes the
     * name=value splitting has already happened.
     */
    function stringDotToObj(result, name, value) {
        var parts = name.split('.');

        parts.forEach(function (prop, i) {
            if (i === parts.length - 1) {
                result[prop] = value;
            } else {
                if (falseProp(result, prop)) {
                    result[prop] = {};
                }
                result = result[prop];
            }

        });
    }

    build.objProps = {
        paths: true,
        wrap: true,
        pragmas: true,
        pragmasOnSave: true,
        has: true,
        hasOnSave: true,
        uglify: true,
        uglify2: true,
        closure: true,
        map: true,
        throwWhen: true
    };

    build.hasDotPropMatch = function (prop) {
        var dotProp,
            index = prop.indexOf('.');

        if (index !== -1) {
            dotProp = prop.substring(0, index);
            return hasProp(build.objProps, dotProp);
        }
        return false;
    };

    /**
     * Converts an array that has String members of "name=value"
     * into an object, where the properties on the object are the names in the array.
     * Also converts the strings "true" and "false" to booleans for the values.
     * member name/value pairs, and converts some comma-separated lists into
     * arrays.
     * @param {Array} ary
     */
    build.convertArrayToObject = function (ary) {
        var result = {}, i, separatorIndex, prop, value,
            needArray = {
                "include": true,
                "exclude": true,
                "excludeShallow": true,
                "insertRequire": true
            };

        for (i = 0; i < ary.length; i++) {
            separatorIndex = ary[i].indexOf("=");
            if (separatorIndex === -1) {
                throw "Malformed name/value pair: [" + ary[i] + "]. Format should be name=value";
            }

            value = ary[i].substring(separatorIndex + 1, ary[i].length);
            if (value === "true") {
                value = true;
            } else if (value === "false") {
                value = false;
            }

            prop = ary[i].substring(0, separatorIndex);

            //Convert to array if necessary
            if (getOwn(needArray, prop)) {
                value = value.split(",");
            }

            if (build.hasDotPropMatch(prop)) {
                stringDotToObj(result, prop, value);
            } else {
                result[prop] = value;
            }
        }
        return result; //Object
    };

    build.makeAbsPath = function (path, absFilePath) {
        if (!absFilePath) {
            return path;
        }

        //Add abspath if necessary. If path starts with a slash or has a colon,
        //then already is an abolute path.
        if (path.indexOf('/') !== 0 && path.indexOf(':') === -1) {
            path = absFilePath +
                   (absFilePath.charAt(absFilePath.length - 1) === '/' ? '' : '/') +
                   path;
            path = file.normalize(path);
        }
        return path.replace(lang.backSlashRegExp, '/');
    };

    build.makeAbsObject = function (props, obj, absFilePath) {
        var i, prop;
        if (obj) {
            for (i = 0; i < props.length; i++) {
                prop = props[i];
                if (hasProp(obj, prop) && typeof obj[prop] === 'string') {
                    obj[prop] = build.makeAbsPath(obj[prop], absFilePath);
                }
            }
        }
    };

    /**
     * For any path in a possible config, make it absolute relative
     * to the absFilePath passed in.
     */
    build.makeAbsConfig = function (config, absFilePath) {
        var props, prop, i;

        props = ["appDir", "dir", "baseUrl"];
        for (i = 0; i < props.length; i++) {
            prop = props[i];

            if (getOwn(config, prop)) {
                //Add abspath if necessary, make sure these paths end in
                //slashes
                if (prop === "baseUrl") {
                    config.originalBaseUrl = config.baseUrl;
                    if (config.appDir) {
                        //If baseUrl with an appDir, the baseUrl is relative to
                        //the appDir, *not* the absFilePath. appDir and dir are
                        //made absolute before baseUrl, so this will work.
                        config.baseUrl = build.makeAbsPath(config.originalBaseUrl, config.appDir);
                    } else {
                        //The dir output baseUrl is same as regular baseUrl, both
                        //relative to the absFilePath.
                        config.baseUrl = build.makeAbsPath(config[prop], absFilePath);
                    }
                } else {
                    config[prop] = build.makeAbsPath(config[prop], absFilePath);
                }

                config[prop] = endsWithSlash(config[prop]);
            }
        }

        build.makeAbsObject(["out", "cssIn"], config, absFilePath);
        build.makeAbsObject(["startFile", "endFile"], config.wrap, absFilePath);
    };

    build.nestedMix = {
        paths: true,
        has: true,
        hasOnSave: true,
        pragmas: true,
        pragmasOnSave: true
    };

    /**
     * Mixes additional source config into target config, and merges some
     * nested config, like paths, correctly.
     */
    function mixConfig(target, source) {
        var prop, value;

        for (prop in source) {
            if (hasProp(source, prop)) {
                //If the value of the property is a plain object, then
                //allow a one-level-deep mixing of it.
                value = source[prop];
                if (typeof value === 'object' && value &&
                        !lang.isArray(value) && !lang.isFunction(value) &&
                        !lang.isRegExp(value)) {
                    target[prop] = lang.mixin({}, target[prop], value, true);
                } else {
                    target[prop] = value;
                }
            }
        }

        //Set up log level since it can affect if errors are thrown
        //or caught and passed to errbacks while doing config setup.
        if (lang.hasProp(target, 'logLevel')) {
            logger.logLevel(target.logLevel);
        }
    }

    /**
     * Converts a wrap.startFile or endFile to be start/end as a string.
     * the startFile/endFile values can be arrays.
     */
    function flattenWrapFile(wrap, keyName, absFilePath) {
        var keyFileName = keyName + 'File';

        if (typeof wrap[keyName] !== 'string' && wrap[keyFileName]) {
            wrap[keyName] = '';
            if (typeof wrap[keyFileName] === 'string') {
                wrap[keyFileName] = [wrap[keyFileName]];
            }
            wrap[keyFileName].forEach(function (fileName) {
                wrap[keyName] += (wrap[keyName] ? '\n' : '') +
                    file.readFile(build.makeAbsPath(fileName, absFilePath));
            });
        } else if (wrap[keyName] === null ||  wrap[keyName] === undefined) {
            //Allow missing one, just set to empty string.
            wrap[keyName] = '';
        } else if (typeof wrap[keyName] !== 'string') {
            throw new Error('wrap.' + keyName + ' or wrap.' + keyFileName + ' malformed');
        }
    }

    /**
     * Creates a config object for an optimization build.
     * It will also read the build profile if it is available, to create
     * the configuration.
     *
     * @param {Object} cfg config options that take priority
     * over defaults and ones in the build file. These options could
     * be from a command line, for instance.
     *
     * @param {Object} the created config object.
     */
    build.createConfig = function (cfg) {
        /*jslint evil: true */
        var config = {}, buildFileContents, buildFileConfig, mainConfig,
            mainConfigFile, mainConfigPath, buildFile, absFilePath;

        //Make sure all paths are relative to current directory.
        absFilePath = file.absPath('.');
        build.makeAbsConfig(cfg, absFilePath);
        build.makeAbsConfig(buildBaseConfig, absFilePath);

        lang.mixin(config, buildBaseConfig);
        lang.mixin(config, cfg, true);

        //Set up log level early since it can affect if errors are thrown
        //or caught and passed to errbacks, even while constructing config.
        if (lang.hasProp(config, 'logLevel')) {
            logger.logLevel(config.logLevel);
        }

        if (config.buildFile) {
            //A build file exists, load it to get more config.
            buildFile = file.absPath(config.buildFile);

            //Find the build file, and make sure it exists, if this is a build
            //that has a build profile, and not just command line args with an in=path
            if (!file.exists(buildFile)) {
                throw new Error("ERROR: build file does not exist: " + buildFile);
            }

            absFilePath = config.baseUrl = file.absPath(file.parent(buildFile));

            //Load build file options.
            buildFileContents = file.readFile(buildFile);
            try {
                buildFileConfig = eval("(" + buildFileContents + ")");
                build.makeAbsConfig(buildFileConfig, absFilePath);

                //Mix in the config now so that items in mainConfigFile can
                //be resolved relative to them if necessary, like if appDir
                //is set here, but the baseUrl is in mainConfigFile. Will
                //re-mix in the same build config later after mainConfigFile
                //is processed, since build config should take priority.
                mixConfig(config, buildFileConfig);
            } catch (e) {
                throw new Error("Build file " + buildFile + " is malformed: " + e);
            }
        }

        mainConfigFile = config.mainConfigFile || (buildFileConfig && buildFileConfig.mainConfigFile);
        if (mainConfigFile) {
            mainConfigFile = build.makeAbsPath(mainConfigFile, absFilePath);
            if (!file.exists(mainConfigFile)) {
                throw new Error(mainConfigFile + ' does not exist.');
            }
            try {
                mainConfig = parse.findConfig(file.readFile(mainConfigFile)).config;
            } catch (configError) {
                throw new Error('The config in mainConfigFile ' +
                        mainConfigFile +
                        ' cannot be used because it cannot be evaluated' +
                        ' correctly while running in the optimizer. Try only' +
                        ' using a config that is also valid JSON, or do not use' +
                        ' mainConfigFile and instead copy the config values needed' +
                        ' into a build file or command line arguments given to the optimizer.');
            }
            if (mainConfig) {
                mainConfigPath = mainConfigFile.substring(0, mainConfigFile.lastIndexOf('/'));

                //Add in some existing config, like appDir, since they can be
                //used inside the mainConfigFile -- paths and baseUrl are
                //relative to them.
                if (config.appDir && !mainConfig.appDir) {
                    mainConfig.appDir = config.appDir;
                }

                //If no baseUrl, then use the directory holding the main config.
                if (!mainConfig.baseUrl) {
                    mainConfig.baseUrl = mainConfigPath;
                }

                build.makeAbsConfig(mainConfig, mainConfigPath);
                mixConfig(config, mainConfig);
            }
        }

        //Mix in build file config, but only after mainConfig has been mixed in.
        if (buildFileConfig) {
            mixConfig(config, buildFileConfig);
        }

        //Re-apply the override config values. Command line
        //args should take precedence over build file values.
        mixConfig(config, cfg);

        //Fix paths to full paths so that they can be adjusted consistently
        //lately to be in the output area.
        lang.eachProp(config.paths, function (value, prop) {
            if (lang.isArray(value)) {
                throw new Error('paths fallback not supported in optimizer. ' +
                                'Please provide a build config path override ' +
                                'for ' + prop);
            }
            config.paths[prop] = build.makeAbsPath(value, config.baseUrl);
        });

        //Set final output dir
        if (hasProp(config, "baseUrl")) {
            if (config.appDir) {
                config.dirBaseUrl = build.makeAbsPath(config.originalBaseUrl, config.dir);
            } else {
                config.dirBaseUrl = config.dir || config.baseUrl;
            }
            //Make sure dirBaseUrl ends in a slash, since it is
            //concatenated with other strings.
            config.dirBaseUrl = endsWithSlash(config.dirBaseUrl);
        }

        //Check for errors in config
        if (config.main) {
            throw new Error('"main" passed as an option, but the ' +
                            'supported option is called "name".');
        }
        if (!config.name && !config.modules && !config.include && !config.cssIn) {
            throw new Error('Missing either a "name", "include" or "modules" ' +
                            'option');
        }
        if (config.cssIn) {
            if (config.dir || config.appDir) {
                throw new Error('cssIn is only for the output of single file ' +
                    'CSS optimizations and is not compatible with "dir" or "appDir" configuration.');
            }
            if (!config.out) {
                throw new Error('"out" option missing.');
            }
        }
        if (!config.cssIn && !config.baseUrl) {
            //Just use the current directory as the baseUrl
            config.baseUrl = './';
        }
        if (!config.out && !config.dir) {
            throw new Error('Missing either an "out" or "dir" config value. ' +
                            'If using "appDir" for a full project optimization, ' +
                            'use "dir". If you want to optimize to one file, ' +
                            'use "out".');
        }
        if (config.appDir && config.out) {
            throw new Error('"appDir" is not compatible with "out". Use "dir" ' +
                            'instead. appDir is used to copy whole projects, ' +
                            'where "out" is used to just optimize to one file.');
        }
        if (config.out && config.dir) {
            throw new Error('The "out" and "dir" options are incompatible.' +
                            ' Use "out" if you are targeting a single file for' +
                            ' for optimization, and "dir" if you want the appDir' +
                            ' or baseUrl directories optimized.');
        }
        if (config.dir && config.appDir && config.dir === config.appDir) {
            throw new Error('"dir" and "appDir" set to the same directory.' +
                            ' This could result in the deletion of appDir.' +
                            ' Stopping.');
        }

        if (config.insertRequire && !lang.isArray(config.insertRequire)) {
            throw new Error('insertRequire should be a list of module IDs' +
                            ' to insert in to a require([]) call.');
        }

        if (config.generateSourceMaps) {
            if (config.preserveLicenseComments) {
                throw new Error('Cannot use preserveLicenseComments and ' +
                    'generateSourceMaps together. Either explcitly set ' +
                    'preserveLicenseComments to false (default is true) or ' +
                    'turn off generateSourceMaps. If you want source maps with ' +
                    'license comments, see: ' +
                    'http://requirejs.org/docs/errors.html#sourcemapcomments');
            } else if (config.optimize !== 'none' &&
                       config.optimize !== 'closure' &&
                       config.optimize !== 'uglify2') {
                //Allow optimize: none to pass, since it is useful when toggling
                //minification on and off to debug something, and it implicitly
                //works, since it does not need a source map.
                throw new Error('optimize: "' + config.optimize +
                    '" does not support generateSourceMaps.');
            }
        }

        if ((config.name || config.include) && !config.modules) {
            //Just need to build one file, but may be part of a whole appDir/
            //baseUrl copy, but specified on the command line, so cannot do
            //the modules array setup. So create a modules section in that
            //case.
            config.modules = [
                {
                    name: config.name,
                    out: config.out,
                    create: config.create,
                    include: config.include,
                    exclude: config.exclude,
                    excludeShallow: config.excludeShallow,
                    insertRequire: config.insertRequire,
                    stubModules: config.stubModules
                }
            ];
            delete config.stubModules;
        } else if (config.modules && config.out) {
            throw new Error('If the "modules" option is used, then there ' +
                            'should be a "dir" option set and "out" should ' +
                            'not be used since "out" is only for single file ' +
                            'optimization output.');
        } else if (config.modules && config.name) {
            throw new Error('"name" and "modules" options are incompatible. ' +
                            'Either use "name" if doing a single file ' +
                            'optimization, or "modules" if you want to target ' +
                            'more than one file for optimization.');
        }

        if (config.out && !config.cssIn) {
            //Just one file to optimize.

            //Does not have a build file, so set up some defaults.
            //Optimizing CSS should not be allowed, unless explicitly
            //asked for on command line. In that case the only task is
            //to optimize a CSS file.
            if (!cfg.optimizeCss) {
                config.optimizeCss = "none";
            }
        }

        //Normalize cssPrefix
        if (config.cssPrefix) {
            //Make sure cssPrefix ends in a slash
            config.cssPrefix = endsWithSlash(config.cssPrefix);
        } else {
            config.cssPrefix = '';
        }

        //Cycle through modules and combine any local stubModules with
        //global values.
        if (config.modules && config.modules.length) {
            config.modules.forEach(function (mod) {
                if (config.stubModules) {
                    mod.stubModules = config.stubModules.concat(mod.stubModules || []);
                }

                //Create a hash lookup for the stubModules config to make lookup
                //cheaper later.
                if (mod.stubModules) {
                    mod.stubModules._byName = {};
                    mod.stubModules.forEach(function (id) {
                        mod.stubModules._byName[id] = true;
                    });
                }
            });
        }

        //Get any wrap text.
        try {
            if (config.wrap) {
                if (config.wrap === true) {
                    //Use default values.
                    config.wrap = {
                        start: '(function () {',
                        end: '}());'
                    };
                } else {
                    flattenWrapFile(config.wrap, 'start', absFilePath);
                    flattenWrapFile(config.wrap, 'end', absFilePath);
                }
            }
        } catch (wrapError) {
            throw new Error('Malformed wrap config: ' + wrapError.toString());
        }

        //Do final input verification
        if (config.context) {
            throw new Error('The build argument "context" is not supported' +
                            ' in a build. It should only be used in web' +
                            ' pages.');
        }

        //Set up normalizeDirDefines. If not explicitly set, if optimize "none",
        //set to "skip" otherwise set to "all".
        if (!hasProp(config, 'normalizeDirDefines')) {
            if (config.optimize === 'none' || config.skipDirOptimize) {
                config.normalizeDirDefines = 'skip';
            } else {
                config.normalizeDirDefines = 'all';
            }
        }

        //Set file.fileExclusionRegExp if desired
        if (hasProp(config, 'fileExclusionRegExp')) {
            if (typeof config.fileExclusionRegExp === "string") {
                file.exclusionRegExp = new RegExp(config.fileExclusionRegExp);
            } else {
                file.exclusionRegExp = config.fileExclusionRegExp;
            }
        } else if (hasProp(config, 'dirExclusionRegExp')) {
            //Set file.dirExclusionRegExp if desired, this is the old
            //name for fileExclusionRegExp before 1.0.2. Support for backwards
            //compatibility
            file.exclusionRegExp = config.dirExclusionRegExp;
        }

        //Remove things that may cause problems in the build.
        delete config.jQuery;
        delete config.enforceDefine;
        delete config.urlArgs;

        return config;
    };

    /**
     * finds the module being built/optimized with the given moduleName,
     * or returns null.
     * @param {String} moduleName
     * @param {Array} modules
     * @returns {Object} the module object from the build profile, or null.
     */
    build.findBuildModule = function (moduleName, modules) {
        var i, module;
        for (i = 0; i < modules.length; i++) {
            module = modules[i];
            if (module.name === moduleName) {
                return module;
            }
        }
        return null;
    };

    /**
     * Removes a module name and path from a layer, if it is supposed to be
     * excluded from the layer.
     * @param {String} moduleName the name of the module
     * @param {String} path the file path for the module
     * @param {Object} layer the layer to remove the module/path from
     */
    build.removeModulePath = function (module, path, layer) {
        var index = layer.buildFilePaths.indexOf(path);
        if (index !== -1) {
            layer.buildFilePaths.splice(index, 1);
        }
    };

    /**
     * Uses the module build config object to trace the dependencies for the
     * given module.
     *
     * @param {Object} module the module object from the build config info.
     * @param {Object} the build config object.
     *
     * @returns {Object} layer information about what paths and modules should
     * be in the flattened module.
     */
    build.traceDependencies = function (module, config) {
        var include, override, layer, context, baseConfig, oldContext,
            rawTextByIds,
            syncChecks = {
                rhino: true,
                node: true,
                xpconnect: true
            },
            deferred = prim();

        //Reset some state set up in requirePatch.js, and clean up require's
        //current context.
        oldContext = require._buildReset();

        //Grab the reset layer and context after the reset, but keep the
        //old config to reuse in the new context.
        baseConfig = oldContext.config;
        layer = require._layer;
        context = layer.context;

        //Put back basic config, use a fresh object for it.
        //WARNING: probably not robust for paths and packages/packagePaths,
        //since those property's objects can be modified. But for basic
        //config clone it works out.
        require(lang.mixin({}, baseConfig, true));

        logger.trace("\nTracing dependencies for: " + (module.name || module.out));
        include = module.name && !module.create ? [module.name] : [];
        if (module.include) {
            include = include.concat(module.include);
        }

        //If there are overrides to basic config, set that up now.;
        if (module.override) {
            override = lang.mixin({}, baseConfig, true);
            lang.mixin(override, module.override, true);
            require(override);
        }

        //Now, populate the rawText cache with any values explicitly passed in
        //via config.
        rawTextByIds = require.s.contexts._.config.rawText;
        if (rawTextByIds) {
            lang.eachProp(rawTextByIds, function (contents, id) {
                var url = require.toUrl(id) + '.js';
                require._cachedRawText[url] = contents;
            });
        }

        //Figure out module layer dependencies by calling require to do the work.
        //Configure the callbacks to be called.
        deferred.resolve.__requireJsBuild = true;
        deferred.reject.__requireJsBuild = true;
        require(include, deferred.resolve, deferred.reject);

        //If a sync build environment, check for errors here, instead of
        //in the then callback below, since some errors, like two IDs pointed
        //to same URL but only one anon ID will leave the loader in an
        //unresolved state since a setTimeout cannot be used to check for
        //timeout.
        if (syncChecks[env.get()]) {
            try {
                build.checkForErrors(context);
            } catch (e) {
                deferred.reject(e);
            }
        }

        return deferred.promise.then(function () {
            //Reset config
            if (module.override) {
                require(baseConfig);
            }

            build.checkForErrors(context);

            return layer;
        });
    };

    build.checkForErrors = function (context) {
        //Check to see if it all loaded. If not, then throw, and give
        //a message on what is left.
        var id, prop, mod, errUrl, idParts, pluginId,
            errMessage = '',
            failedPluginMap = {},
            failedPluginIds = [],
            errIds = [],
            errUrlMap = {},
            errUrlConflicts = {},
            hasErrUrl = false,
            registry = context.registry;

        for (id in registry) {
            if (hasProp(registry, id) && id.indexOf('_@r') !== 0) {
                mod = getOwn(registry, id);
                if (id.indexOf('_unnormalized') === -1 && mod && mod.enabled) {
                    errIds.push(id);
                    errUrl = mod.map.url;

                    if (errUrlMap[errUrl]) {
                        hasErrUrl = true;
                        //This error module has the same URL as another
                        //error module, could be misconfiguration.
                        if (!errUrlConflicts[errUrl]) {
                            errUrlConflicts[errUrl] = [];
                            //Store the original module that had the same URL.
                            errUrlConflicts[errUrl].push(errUrlMap[errUrl]);
                        }
                        errUrlConflicts[errUrl].push(id);
                    } else {
                        errUrlMap[errUrl] = id;
                    }
                }

                //Look for plugins that did not call load()
                idParts = id.split('!');
                pluginId = idParts[0];
                if (idParts.length > 1 && falseProp(failedPluginMap, pluginId)) {
                    failedPluginIds.push(pluginId);
                    failedPluginMap[pluginId] = true;
                }
            }
        }

        if (errIds.length || failedPluginIds.length) {
            if (failedPluginIds.length) {
                errMessage += 'Loader plugin' +
                    (failedPluginIds.length === 1 ? '' : 's') +
                    ' did not call ' +
                    'the load callback in the build: ' +
                    failedPluginIds.join(', ') + '\n';
            }
            errMessage += 'Module loading did not complete for: ' + errIds.join(', ');

            if (hasErrUrl) {
                errMessage += '\nThe following modules share the same URL. This ' +
                              'could be a misconfiguration if that URL only has ' +
                              'one anonymous module in it:';
                for (prop in errUrlConflicts) {
                    if (hasProp(errUrlConflicts, prop)) {
                        errMessage += '\n' + prop + ': ' +
                                      errUrlConflicts[prop].join(', ');
                    }
                }
            }
            throw new Error(errMessage);
        }

    };

    build.createOverrideConfig = function (config, override) {
        var cfg = {};

        lang.mixin(cfg, config, true);
        lang.eachProp(override, function (value, prop) {
            if (hasProp(build.objProps, prop)) {
                //An object property, merge keys. Start a new object
                //so that source object in config does not get modified.
                cfg[prop] = {};
                lang.mixin(cfg[prop], config[prop], true);
                lang.mixin(cfg[prop], override[prop], true);
            } else {
                cfg[prop] = override[prop];
            }
        });
        return cfg;
    };

    /**
     * Uses the module build config object to create an flattened version
     * of the module, with deep dependencies included.
     *
     * @param {Object} module the module object from the build config info.
     *
     * @param {Object} layer the layer object returned from build.traceDependencies.
     *
     * @param {Object} the build config object.
     *
     * @returns {Object} with two properties: "text", the text of the flattened
     * module, and "buildText", a string of text representing which files were
     * included in the flattened module text.
     */
    build.flattenModule = function (module, layer, config) {
        var fileContents,
            buildFileContents = '';

        return prim().start(function () {
            var reqIndex, currContents,
                moduleName, shim, packageConfig, nonPackageName,
                parts, builder, writeApi,
                namespace, namespaceWithDot, stubModulesByName,
                context = layer.context,
                onLayerEnds = [],
                onLayerEndAdded = {};

            //Use override settings, particularly for pragmas
            //Do this before the var readings since it reads config values.
            if (module.override) {
                config = build.createOverrideConfig(config, module.override);
            }

            namespace = config.namespace || '';
            namespaceWithDot = namespace ? namespace + '.' : '';
            stubModulesByName = (module.stubModules && module.stubModules._byName) || {};

            //Start build output for the module.
            buildFileContents += "\n" +
                                 (config.dir ? module._buildPath.replace(config.dir, "") : module._buildPath) +
                                 "\n----------------\n";

            //If there was an existing file with require in it, hoist to the top.
            if (layer.existingRequireUrl) {
                reqIndex = layer.buildFilePaths.indexOf(layer.existingRequireUrl);
                if (reqIndex !== -1) {
                    layer.buildFilePaths.splice(reqIndex, 1);
                    layer.buildFilePaths.unshift(layer.existingRequireUrl);
                }
            }

            //Write the built module to disk, and build up the build output.
            fileContents = "";
            return prim.serial(layer.buildFilePaths.map(function (path) {
                return function () {
                    moduleName = layer.buildFileToModule[path];
                    //If the moduleName is for a package main, then update it to the
                    //real main value.
                    packageConfig = layer.context.config.pkgs &&
                                    getOwn(layer.context.config.pkgs, moduleName);
                    if (packageConfig) {
                        nonPackageName = moduleName;
                        moduleName += '/' + packageConfig.main;
                    }

                    return prim().start(function () {
                        //Figure out if the module is a result of a build plugin, and if so,
                        //then delegate to that plugin.
                        parts = context.makeModuleMap(moduleName);
                        builder = parts.prefix && getOwn(context.defined, parts.prefix);
                        if (builder) {
                            if (builder.onLayerEnd && falseProp(onLayerEndAdded, parts.prefix)) {
                                onLayerEnds.push(builder);
                                onLayerEndAdded[parts.prefix] = true;
                            }

                            if (builder.write) {
                                writeApi = function (input) {
                                    fileContents += "\n" + addSemiColon(input);
                                    if (config.onBuildWrite) {
                                        fileContents = config.onBuildWrite(moduleName, path, fileContents);
                                    }
                                };
                                writeApi.asModule = function (moduleName, input) {
                                    fileContents += "\n" +
                                        addSemiColon(build.toTransport(namespace, moduleName, path, input, layer, {
                                            useSourceUrl: layer.context.config.useSourceUrl
                                        }));
                                    if (config.onBuildWrite) {
                                        fileContents = config.onBuildWrite(moduleName, path, fileContents);
                                    }
                                };
                                builder.write(parts.prefix, parts.name, writeApi);
                            }
                            return;
                        } else {
                            return prim().start(function () {
                                if (hasProp(stubModulesByName, moduleName)) {
                                    //Just want to insert a simple module definition instead
                                    //of the source module. Useful for plugins that inline
                                    //all their resources.
                                    if (hasProp(layer.context.plugins, moduleName)) {
                                        //Slightly different content for plugins, to indicate
                                        //that dynamic loading will not work.
                                        return 'define({load: function(id){throw new Error("Dynamic load not allowed: " + id);}});';
                                    } else {
                                        return 'define({});';
                                    }
                                } else {
                                    return require._cacheReadAsync(path);
                                }
                            }).then(function (text) {
                                var hasPackageName;

                                currContents = text;

                                if (config.cjsTranslate) {
                                    currContents = commonJs.convert(path, currContents);
                                }

                                if (config.onBuildRead) {
                                    currContents = config.onBuildRead(moduleName, path, currContents);
                                }

                                if (packageConfig) {
                                    hasPackageName = (nonPackageName === parse.getNamedDefine(currContents));
                                }

                                if (namespace) {
                                    currContents = pragma.namespace(currContents, namespace);
                                }

                                currContents = build.toTransport(namespace, moduleName, path, currContents, layer, {
                                    useSourceUrl: config.useSourceUrl
                                });

                                if (packageConfig && !hasPackageName) {
                                    currContents = addSemiColon(currContents) + '\n';
                                    currContents += namespaceWithDot + "define('" +
                                                    packageConfig.name + "', ['" + moduleName +
                                                    "'], function (main) { return main; });\n";
                                }

                                if (config.onBuildWrite) {
                                    currContents = config.onBuildWrite(moduleName, path, currContents);
                                }

                                //Semicolon is for files that are not well formed when
                                //concatenated with other content.
                                fileContents += "\n" + addSemiColon(currContents);
                            });
                        }
                    }).then(function () {
                        buildFileContents += path.replace(config.dir, "") + "\n";
                        //Some files may not have declared a require module, and if so,
                        //put in a placeholder call so the require does not try to load them
                        //after the module is processed.
                        //If we have a name, but no defined module, then add in the placeholder.
                        if (moduleName && falseProp(layer.modulesWithNames, moduleName) && !config.skipModuleInsertion) {
                            shim = config.shim && (getOwn(config.shim, moduleName) || (packageConfig && getOwn(config.shim, nonPackageName)));
                            if (shim) {
                                fileContents += '\n' + namespaceWithDot + 'define("' + moduleName + '", ' +
                                                 (shim.deps && shim.deps.length ?
                                                        build.makeJsArrayString(shim.deps) + ', ' : '') +
                                                 (shim.exportsFn ? shim.exportsFn() : 'function(){}') +
                                                 ');\n';
                            } else {
                                fileContents += '\n' + namespaceWithDot + 'define("' + moduleName + '", function(){});\n';
                            }
                        }
                    });
                };
            })).then(function () {
                if (onLayerEnds.length) {
                    onLayerEnds.forEach(function (builder) {
                        var path;
                        if (typeof module.out === 'string') {
                            path = module.out;
                        } else if (typeof module._buildPath === 'string') {
                            path = module._buildPath;
                        }
                        builder.onLayerEnd(function (input) {
                            fileContents += "\n" + addSemiColon(input);
                        }, {
                            name: module.name,
                            path: path
                        });
                    });
                }

                //Add a require at the end to kick start module execution, if that
                //was desired. Usually this is only specified when using small shim
                //loaders like almond.
                if (module.insertRequire) {
                    fileContents += '\n' + namespaceWithDot + 'require(["' + module.insertRequire.join('", "') + '"]);\n';
                }
            });
        }).then(function () {
            return {
                text: config.wrap ?
                        config.wrap.start + fileContents + config.wrap.end :
                        fileContents,
                buildText: buildFileContents
            };
        });
    };

    //Converts an JS array of strings to a string representation.
    //Not using JSON.stringify() for Rhino's sake.
    build.makeJsArrayString = function (ary) {
        return '["' + ary.map(function (item) {
            //Escape any double quotes, backslashes
            return lang.jsEscape(item);
        }).join('","') + '"]';
    };

    build.toTransport = function (namespace, moduleName, path, contents, layer, options) {
        var baseUrl = layer && layer.context.config.baseUrl;

        function onFound(info) {
            //Only mark this module as having a name if not a named module,
            //or if a named module and the name matches expectations.
            if (layer && (info.needsId || info.foundId === moduleName)) {
                layer.modulesWithNames[moduleName] = true;
            }
        }

        //Convert path to be a local one to the baseUrl, useful for
        //useSourceUrl.
        if (baseUrl) {
            path = path.replace(baseUrl, '');
        }

        return transform.toTransport(namespace, moduleName, path, contents, onFound, options);
    };

    return build;
});

    }


    /**
     * Sets the default baseUrl for requirejs to be directory of top level
     * script.
     */
    function setBaseUrl(fileName) {
        //Use the file name's directory as the baseUrl if available.
        dir = fileName.replace(/\\/g, '/');
        if (dir.indexOf('/') !== -1) {
            dir = dir.split('/');
            dir.pop();
            dir = dir.join('/');
            exec("require({baseUrl: '" + dir + "'});");
        }
    }

    function createRjsApi() {
        //Create a method that will run the optimzer given an object
        //config.
        requirejs.optimize = function (config, callback, errback) {
            if (!loadedOptimizedLib) {
                loadLib();
                loadedOptimizedLib = true;
            }

            //Create the function that will be called once build modules
            //have been loaded.
            var runBuild = function (build, logger) {
                //Make sure config has a log level, and if not,
                //make it "silent" by default.
                config.logLevel = config.hasOwnProperty('logLevel') ?
                                  config.logLevel : logger.SILENT;

                //Reset build internals first in case this is part
                //of a long-running server process that could have
                //exceptioned out in a bad state. It is only defined
                //after the first call though.
                if (requirejs._buildReset) {
                    requirejs._buildReset();
                    requirejs._cacheReset();
                }

                function done(result) {
                    //And clean up, in case something else triggers
                    //a build in another pathway.
                    if (requirejs._buildReset) {
                        requirejs._buildReset();
                        requirejs._cacheReset();
                    }

                    // Ensure errors get propagated to the errback
                    if (result instanceof Error) {
                      throw result;
                    }

                    return result;
                }

                build(config).then(done, done).then(callback, errback);
            };

            requirejs({
                context: 'build'
            }, ['build', 'logger'], runBuild);
        };

        requirejs.tools = {
            useLib: function (contextName, callback) {
                if (!callback) {
                    callback = contextName;
                    contextName = 'uselib';
                }

                if (!useLibLoaded[contextName]) {
                    loadLib();
                    useLibLoaded[contextName] = true;
                }

                var req = requirejs({
                    context: contextName
                });

                req(['build'], function () {
                    callback(req);
                });
            }
        };

        requirejs.define = define;
    }

    //If in Node, and included via a require('requirejs'), just export and
    //THROW IT ON THE GROUND!
    if (env === 'node' && reqMain !== module) {
        setBaseUrl(path.resolve(reqMain ? reqMain.filename : '.'));

        createRjsApi();

        module.exports = requirejs;
        return;
    } else if (env === 'browser') {
        //Only option is to use the API.
        setBaseUrl(location.href);
        createRjsApi();
        return;
    } else if ((env === 'rhino' || env === 'xpconnect') &&
            //User sets up requirejsAsLib variable to indicate it is loaded
            //via load() to be used as a library.
            typeof requirejsAsLib !== 'undefined' && requirejsAsLib) {
        //This script is loaded via rhino's load() method, expose the
        //API and get out.
        setBaseUrl(fileName);
        createRjsApi();
        return;
    }

    if (commandOption === 'o') {
        //Do the optimizer work.
        loadLib();

        /**
 * @license Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

/*
 * Create a build.js file that has the build options you want and pass that
 * build file to this file to do the build. See example.build.js for more information.
 */

/*jslint strict: false, nomen: false */
/*global require: false */

require({
    baseUrl: require.s.contexts._.config.baseUrl,
    //Use a separate context than the default context so that the
    //build can use the default context.
    context: 'build',
    catchError: {
        define: true
    }
},       ['env!env/args', 'build'],
function (args,            build) {
    build(args);
});


    } else if (commandOption === 'v') {
        console.log('r.js: ' + version + ', RequireJS: ' + this.requirejsVars.require.version);
    } else if (commandOption === 'convert') {
        loadLib();

        this.requirejsVars.require(['env!env/args', 'commonJs', 'env!env/print'],
            function (args, commonJs, print) {

                var srcDir, outDir;
                srcDir = args[0];
                outDir = args[1];

                if (!srcDir || !outDir) {
                    print('Usage: path/to/commonjs/modules output/dir');
                    return;
                }

                commonJs.convertDir(args[0], args[1]);
            });
    } else {
        //Just run an app

        //Load the bundled libraries for use in the app.
        if (commandOption === 'lib') {
            loadLib();
        }

        setBaseUrl(fileName);

        if (exists(fileName)) {
            exec(readFile(fileName), fileName);
        } else {
            showHelp();
        }
    }

}((typeof console !== 'undefined' ? console : undefined),
    (typeof Packages !== 'undefined' || (typeof window === 'undefined' &&
        typeof Components !== 'undefined' && Components.interfaces) ?
        Array.prototype.slice.call(arguments, 0) : []),
    (typeof readFile !== 'undefined' ? readFile : undefined)));
