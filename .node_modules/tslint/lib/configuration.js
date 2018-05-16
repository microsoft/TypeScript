"use strict";
/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var yaml = require("js-yaml");
var os = require("os");
var path = require("path");
var resolve = require("resolve");
var error_1 = require("./error");
var utils_1 = require("./utils");
// Note: eslint prefers yaml over json, while tslint prefers json over yaml
// for backward-compatibility.
exports.JSON_CONFIG_FILENAME = "tslint.json";
/** @deprecated use `JSON_CONFIG_FILENAME` or `CONFIG_FILENAMES` instead. */
exports.CONFIG_FILENAME = exports.JSON_CONFIG_FILENAME;
exports.CONFIG_FILENAMES = [exports.JSON_CONFIG_FILENAME, "tslint.yaml", "tslint.yml"];
exports.DEFAULT_CONFIG = {
    defaultSeverity: "error",
    extends: ["tslint:recommended"],
    jsRules: new Map(),
    rules: new Map(),
    rulesDirectory: [],
};
exports.EMPTY_CONFIG = {
    defaultSeverity: "error",
    extends: [],
    jsRules: new Map(),
    rules: new Map(),
    rulesDirectory: [],
};
var BUILT_IN_CONFIG = /^tslint:(.*)$/;
function findConfiguration(configFile, inputFilePath) {
    var configPath = findConfigurationPath(configFile, inputFilePath);
    var loadResult = { path: configPath };
    try {
        loadResult.results = loadConfigurationFromPath(configPath);
        return loadResult;
    }
    catch (error) {
        throw new error_1.FatalError("Failed to load " + configPath + ": " + error.message, error);
    }
}
exports.findConfiguration = findConfiguration;
function findConfigurationPath(suppliedConfigFilePath, inputFilePath) {
    if (suppliedConfigFilePath != undefined) {
        if (!fs.existsSync(suppliedConfigFilePath)) {
            throw new error_1.FatalError("Could not find config file at: " + path.resolve(suppliedConfigFilePath));
        }
        else {
            return path.resolve(suppliedConfigFilePath);
        }
    }
    else {
        // convert to dir if it's a file or doesn't exist
        var useDirName = false;
        try {
            var stats = fs.statSync(inputFilePath);
            if (stats.isFile()) {
                useDirName = true;
            }
        }
        catch (e) {
            // throws if file doesn't exist
            useDirName = true;
        }
        if (useDirName) {
            inputFilePath = path.dirname(inputFilePath);
        }
        // search for tslint.json from input file location
        var configFilePath = findup(exports.CONFIG_FILENAMES, path.resolve(inputFilePath));
        if (configFilePath !== undefined) {
            return configFilePath;
        }
        // search for tslint.json in home directory
        var homeDir = os.homedir();
        for (var _i = 0, CONFIG_FILENAMES_1 = exports.CONFIG_FILENAMES; _i < CONFIG_FILENAMES_1.length; _i++) {
            var configFilename = CONFIG_FILENAMES_1[_i];
            configFilePath = path.join(homeDir, configFilename);
            if (fs.existsSync(configFilePath)) {
                return path.resolve(configFilePath);
            }
        }
        // no path could be found
        return undefined;
    }
}
exports.findConfigurationPath = findConfigurationPath;
/**
 * Find a file by names in a directory or any ancestor directory.
 * Will try each filename in filenames before recursing to a parent directory.
 * This is case-insensitive, so it can find 'TsLiNt.JsOn' when searching for 'tslint.json'.
 */
function findup(filenames, directory) {
    while (true) {
        var res = findFile(directory);
        if (res !== undefined) {
            return path.join(directory, res);
        }
        var parent = path.dirname(directory);
        if (parent === directory) {
            return undefined;
        }
        directory = parent;
    }
    function findFile(cwd) {
        var dirFiles = fs.readdirSync(cwd);
        var _loop_1 = function (filename) {
            var index = dirFiles.indexOf(filename);
            if (index > -1) {
                return { value: filename };
            }
            // TODO: remove in v6.0.0
            // Try reading in the entire directory and looking for a file with different casing.
            var result = dirFiles.find(function (entry) { return entry.toLowerCase() === filename; });
            if (result !== undefined) {
                error_1.showWarningOnce("Using mixed case " + filename + " is deprecated. Found: " + path.join(cwd, result));
                return { value: result };
            }
        };
        for (var _i = 0, filenames_1 = filenames; _i < filenames_1.length; _i++) {
            var filename = filenames_1[_i];
            var state_1 = _loop_1(filename);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        return undefined;
    }
}
/**
 * Used Node semantics to load a configuration file given configFilePath.
 * For example:
 * '/path/to/config' will be treated as an absolute path
 * './path/to/config' will be treated as a relative path
 * 'path/to/config' will attempt to load a to/config file inside a node module named path
 * @param configFilePath The configuration to load
 * @param originalFilePath (deprecated) The entry point configuration file
 * @returns a configuration object for TSLint loaded from the file at configFilePath
 */
function loadConfigurationFromPath(configFilePath, _originalFilePath) {
    if (configFilePath == undefined) {
        return exports.DEFAULT_CONFIG;
    }
    else {
        var resolvedConfigFilePath = resolveConfigurationPath(configFilePath);
        var rawConfigFile = readConfigurationFile(resolvedConfigFilePath);
        return parseConfigFile(rawConfigFile, path.dirname(resolvedConfigFilePath), readConfigurationFile);
    }
}
exports.loadConfigurationFromPath = loadConfigurationFromPath;
/** Reads the configuration file from disk and parses it as raw JSON, YAML or JS depending on the extension. */
function readConfigurationFile(filepath) {
    var resolvedConfigFileExt = path.extname(filepath);
    if (/\.(json|ya?ml)/.test(resolvedConfigFileExt)) {
        var fileContent = fs.readFileSync(filepath, "utf8").replace(/^\uFEFF/, "");
        try {
            if (resolvedConfigFileExt === ".json") {
                return JSON.parse(utils_1.stripComments(fileContent));
            }
            else {
                return yaml.safeLoad(fileContent, {
                    // Note: yaml.LoadOptions expects a schema value of type "any",
                    // but this trips up the no-unsafe-any rule.
                    // tslint:disable-next-line:no-unsafe-any
                    schema: yaml.JSON_SCHEMA,
                    strict: true,
                });
            }
        }
        catch (e) {
            var error = e;
            // include the configuration file being parsed in the error since it may differ from the directly referenced config
            throw new Error(error.message + " in " + filepath);
        }
    }
    else {
        var rawConfigFile = require(filepath);
        // tslint:disable-next-line no-dynamic-delete
        delete require.cache[filepath];
        return rawConfigFile;
    }
}
exports.readConfigurationFile = readConfigurationFile;
/**
 * Resolve configuration file path or node_module reference
 * @param filePath Relative ("./path"), absolute ("/path"), node module ("path"), or built-in ("tslint:path")
 */
function resolveConfigurationPath(filePath, relativeTo) {
    var matches = filePath.match(BUILT_IN_CONFIG);
    var isBuiltInConfig = matches !== null && matches.length > 0;
    if (isBuiltInConfig) {
        var configName = matches[1];
        try {
            return require.resolve("./configs/" + configName);
        }
        catch (err) {
            throw new Error(filePath + " is not a built-in config, try \"tslint:recommended\" instead.");
        }
    }
    var basedir = relativeTo !== undefined ? relativeTo : process.cwd();
    try {
        return resolve.sync(filePath, { basedir: basedir });
    }
    catch (err) {
        try {
            return require.resolve(filePath);
        }
        catch (err) {
            throw new Error("Invalid \"extends\" configuration value - could not require \"" + filePath + "\". " +
                "Review the Node lookup algorithm (https://nodejs.org/api/modules.html#modules_all_together) " +
                "for the approximate method TSLint uses to find the referenced configuration file.");
        }
    }
}
function extendConfigurationFile(targetConfig, nextConfigSource) {
    function combineProperties(targetProperty, nextProperty) {
        var combinedProperty = {};
        add(targetProperty);
        // next config source overwrites the target config object
        add(nextProperty);
        return combinedProperty;
        function add(property) {
            if (property !== undefined) {
                for (var name in property) {
                    if (utils_1.hasOwnProperty(property, name)) {
                        combinedProperty[name] = property[name];
                    }
                }
            }
        }
    }
    function combineMaps(target, next) {
        var combined = new Map();
        target.forEach(function (options, ruleName) {
            combined.set(ruleName, options);
        });
        next.forEach(function (options, ruleName) {
            var combinedRule = combined.get(ruleName);
            if (combinedRule !== undefined) {
                combined.set(ruleName, combineProperties(combinedRule, options));
            }
            else {
                combined.set(ruleName, options);
            }
        });
        return combined;
    }
    var combinedRulesDirs = targetConfig.rulesDirectory.concat(nextConfigSource.rulesDirectory);
    var dedupedRulesDirs = Array.from(new Set(combinedRulesDirs));
    return {
        extends: [],
        jsRules: combineMaps(targetConfig.jsRules, nextConfigSource.jsRules),
        linterOptions: combineProperties(targetConfig.linterOptions, nextConfigSource.linterOptions),
        rules: combineMaps(targetConfig.rules, nextConfigSource.rules),
        rulesDirectory: dedupedRulesDirs,
    };
}
exports.extendConfigurationFile = extendConfigurationFile;
/**
 * returns the absolute path (contrary to what the name implies)
 *
 * @deprecated use `path.resolve` instead
 */
function getRelativePath(directory, relativeTo) {
    if (directory != undefined) {
        var basePath = relativeTo !== undefined ? relativeTo : process.cwd();
        return path.resolve(basePath, directory);
    }
    return undefined;
}
exports.getRelativePath = getRelativePath;
// check if directory should be used as path or if it should be resolved like a module
// matches if directory starts with '/', './', '../', 'node_modules/' or equals '.' or '..'
function useAsPath(directory) {
    return /^(?:\.?\.?(?:\/|$)|node_modules\/)/.test(directory);
}
exports.useAsPath = useAsPath;
/**
 * @param directories A path(s) to a directory of custom rules
 * @param relativeTo A path that directories provided are relative to.
 * For example, if the directories come from a tslint.json file, this path
 * should be the path to the tslint.json file.
 * @return An array of absolute paths to directories potentially containing rules
 */
function getRulesDirectories(directories, relativeTo) {
    return utils_1.arrayify(directories)
        .map(function (dir) {
        if (!useAsPath(dir)) {
            try {
                return path.dirname(resolve.sync(dir, { basedir: relativeTo }));
            }
            catch (err) {
                // swallow error and fallback to using directory as path
            }
        }
        var absolutePath = relativeTo === undefined ? path.resolve(dir) : path.resolve(relativeTo, dir);
        if (absolutePath !== undefined) {
            if (!fs.existsSync(absolutePath)) {
                throw new error_1.FatalError("Could not find custom rule directory: " + dir);
            }
        }
        return absolutePath;
    });
}
exports.getRulesDirectories = getRulesDirectories;
/**
 * Parses the options of a single rule and upgrades legacy settings such as `true`, `[true, "option"]`
 *
 * @param ruleConfigValue The raw option setting of a rule
 */
function parseRuleOptions(ruleConfigValue, rawDefaultRuleSeverity) {
    var ruleArguments;
    var defaultRuleSeverity = "error";
    if (rawDefaultRuleSeverity !== undefined) {
        switch (rawDefaultRuleSeverity.toLowerCase()) {
            case "warn":
            case "warning":
                defaultRuleSeverity = "warning";
                break;
            case "off":
            case "none":
                defaultRuleSeverity = "off";
                break;
            default:
                defaultRuleSeverity = "error";
        }
    }
    var ruleSeverity = defaultRuleSeverity;
    if (ruleConfigValue == undefined) {
        ruleArguments = [];
        ruleSeverity = "off";
    }
    else if (Array.isArray(ruleConfigValue)) {
        if (ruleConfigValue.length > 0) {
            // old style: array
            ruleArguments = ruleConfigValue.slice(1);
            ruleSeverity = ruleConfigValue[0] === true ? defaultRuleSeverity : "off";
        }
    }
    else if (typeof ruleConfigValue === "boolean") {
        // old style: boolean
        ruleArguments = [];
        ruleSeverity = ruleConfigValue ? defaultRuleSeverity : "off";
    }
    else if (typeof ruleConfigValue === "object") {
        if (ruleConfigValue.severity !== undefined) {
            switch (ruleConfigValue.severity.toLowerCase()) {
                case "default":
                    ruleSeverity = defaultRuleSeverity;
                    break;
                case "error":
                    ruleSeverity = "error";
                    break;
                case "warn":
                case "warning":
                    ruleSeverity = "warning";
                    break;
                case "off":
                case "none":
                    ruleSeverity = "off";
                    break;
                default:
                    console.warn("Invalid severity level: " + ruleConfigValue.severity);
                    ruleSeverity = defaultRuleSeverity;
            }
        }
        if (ruleConfigValue.options != undefined) {
            ruleArguments = utils_1.arrayify(ruleConfigValue.options);
        }
    }
    return {
        ruleArguments: ruleArguments,
        ruleSeverity: ruleSeverity,
    };
}
/**
 * Parses a config file and normalizes legacy config settings.
 * If `configFileDir` and `readConfig` are provided, this function will load all base configs and reduce them to the final configuration.
 *
 * @param configFile The raw object read from the JSON of a config file
 * @param configFileDir The directory of the config file
 * @param readConfig Will be used to load all base configurations while parsing. The function is called with the resolved path.
 */
function parseConfigFile(configFile, configFileDir, readConfig) {
    var defaultSeverity = configFile.defaultSeverity;
    if (readConfig === undefined || configFileDir === undefined) {
        return parse(configFile, configFileDir);
    }
    return loadExtendsRecursive(configFile, configFileDir)
        .map(function (_a) {
        var dir = _a.dir, config = _a.config;
        return parse(config, dir);
    })
        .reduce(extendConfigurationFile, exports.EMPTY_CONFIG);
    /** Read files in order, depth first, and assign `defaultSeverity` (last config in extends wins). */
    function loadExtendsRecursive(raw, dir) {
        var configs = [];
        for (var _i = 0, _a = utils_1.arrayify(raw.extends); _i < _a.length; _i++) {
            var relativePath = _a[_i];
            var resolvedPath = resolveConfigurationPath(relativePath, dir);
            var extendedRaw = readConfig(resolvedPath);
            configs.push.apply(configs, loadExtendsRecursive(extendedRaw, path.dirname(resolvedPath)));
        }
        if (raw.defaultSeverity !== undefined) {
            defaultSeverity = raw.defaultSeverity;
        }
        configs.push({ dir: dir, config: raw });
        return configs;
    }
    function parse(config, dir) {
        return {
            extends: utils_1.arrayify(config.extends),
            jsRules: parseRules(config.jsRules),
            linterOptions: parseLinterOptions(config.linterOptions, dir),
            rules: parseRules(config.rules),
            rulesDirectory: getRulesDirectories(config.rulesDirectory, dir),
        };
    }
    function parseRules(config) {
        var map = new Map();
        if (config !== undefined) {
            for (var ruleName in config) {
                if (utils_1.hasOwnProperty(config, ruleName)) {
                    map.set(ruleName, parseRuleOptions(config[ruleName], defaultSeverity));
                }
            }
        }
        return map;
    }
    function parseLinterOptions(raw, dir) {
        if (raw === undefined || raw.exclude === undefined) {
            return {};
        }
        return {
            exclude: utils_1.arrayify(raw.exclude).map(function (pattern) { return dir === undefined ? path.resolve(pattern) : path.resolve(dir, pattern); }),
        };
    }
}
exports.parseConfigFile = parseConfigFile;
/**
 * Fills in default values for `IOption` properties and outputs an array of `IOption`
 */
function convertRuleOptions(ruleConfiguration) {
    var output = [];
    ruleConfiguration.forEach(function (_a, ruleName) {
        var ruleArguments = _a.ruleArguments, ruleSeverity = _a.ruleSeverity;
        var options = {
            disabledIntervals: [],
            ruleArguments: ruleArguments != undefined ? ruleArguments : [],
            ruleName: ruleName,
            ruleSeverity: ruleSeverity != undefined ? ruleSeverity : "error",
        };
        output.push(options);
    });
    return output;
}
exports.convertRuleOptions = convertRuleOptions;
