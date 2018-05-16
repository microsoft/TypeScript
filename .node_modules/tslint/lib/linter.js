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
var tslib_1 = require("tslib");
var fs = require("fs");
var path = require("path");
var ts = require("typescript");
var configuration_1 = require("./configuration");
var enableDisableRules_1 = require("./enableDisableRules");
var error_1 = require("./error");
var formatterLoader_1 = require("./formatterLoader");
var rule_1 = require("./language/rule/rule");
var utils = require("./language/utils");
var ruleLoader_1 = require("./ruleLoader");
var utils_1 = require("./utils");
/**
 * Linter that can lint multiple files in consecutive runs.
 */
var Linter = /** @class */ (function () {
    function Linter(options, program) {
        this.options = options;
        this.program = program;
        this.failures = [];
        this.fixes = [];
        if (typeof options !== "object") {
            throw new Error("Unknown Linter options type: " + typeof options);
        }
        if (options.configuration != undefined) {
            throw new Error("ILinterOptions does not contain the property `configuration` as of version 4. " +
                "Did you mean to pass the `IConfigurationFile` object to lint() ? ");
        }
    }
    /**
     * Creates a TypeScript program object from a tsconfig.json file path and optional project directory.
     */
    Linter.createProgram = function (configFile, projectDirectory) {
        if (projectDirectory === void 0) { projectDirectory = path.dirname(configFile); }
        var config = ts.readConfigFile(configFile, ts.sys.readFile);
        if (config.error !== undefined) {
            throw new error_1.FatalError(ts.formatDiagnostics([config.error], {
                getCanonicalFileName: function (f) { return f; },
                getCurrentDirectory: process.cwd,
                getNewLine: function () { return "\n"; },
            }));
        }
        var parseConfigHost = {
            fileExists: fs.existsSync,
            readDirectory: ts.sys.readDirectory,
            readFile: function (file) { return fs.readFileSync(file, "utf8"); },
            useCaseSensitiveFileNames: true,
        };
        var parsed = ts.parseJsonConfigFileContent(config.config, parseConfigHost, path.resolve(projectDirectory), { noEmit: true });
        if (parsed.errors !== undefined) {
            // ignore warnings and 'TS18003: No inputs were found in config file ...'
            var errors = parsed.errors.filter(function (d) { return d.category === ts.DiagnosticCategory.Error && d.code !== 18003; });
            if (errors.length !== 0) {
                throw new error_1.FatalError(ts.formatDiagnostics(errors, {
                    getCanonicalFileName: function (f) { return f; },
                    getCurrentDirectory: process.cwd,
                    getNewLine: function () { return "\n"; },
                }));
            }
        }
        var host = ts.createCompilerHost(parsed.options, true);
        var program = ts.createProgram(parsed.fileNames, parsed.options, host);
        return program;
    };
    /**
     * Returns a list of source file names from a TypeScript program. This includes all referenced
     * files and excludes declaration (".d.ts") files.
     */
    Linter.getFileNames = function (program) {
        return utils_1.mapDefined(program.getSourceFiles(), function (file) {
            return file.fileName.endsWith(".d.ts") || program.isSourceFileFromExternalLibrary(file)
                ? undefined
                : file.fileName;
        });
    };
    Linter.prototype.lint = function (fileName, source, configuration) {
        if (configuration === void 0) { configuration = configuration_1.DEFAULT_CONFIG; }
        var sourceFile = this.getSourceFile(fileName, source);
        var isJs = /\.jsx?$/i.test(fileName);
        var enabledRules = this.getEnabledRules(configuration, isJs);
        var fileFailures = this.getAllFailures(sourceFile, enabledRules);
        if (fileFailures.length === 0) {
            // Usual case: no errors.
            return;
        }
        if (this.options.fix && fileFailures.some(function (f) { return f.hasFix(); })) {
            fileFailures = this.applyAllFixes(enabledRules, fileFailures, sourceFile, fileName);
        }
        // add rule severity to failures
        var ruleSeverityMap = new Map(enabledRules.map(function (rule) { return [rule.getOptions().ruleName, rule.getOptions().ruleSeverity]; }));
        for (var _i = 0, fileFailures_1 = fileFailures; _i < fileFailures_1.length; _i++) {
            var failure = fileFailures_1[_i];
            var severity = ruleSeverityMap.get(failure.getRuleName());
            if (severity === undefined) {
                throw new Error("Severity for rule '" + failure.getRuleName() + "' not found");
            }
            failure.setRuleSeverity(severity);
        }
        this.failures = this.failures.concat(fileFailures);
    };
    Linter.prototype.getResult = function () {
        var formatterName = this.options.formatter !== undefined ? this.options.formatter : "prose";
        var Formatter = formatterLoader_1.findFormatter(formatterName, this.options.formattersDirectory);
        if (Formatter === undefined) {
            throw new Error("formatter '" + formatterName + "' not found");
        }
        var formatter = new Formatter();
        var output = formatter.format(this.failures, this.fixes);
        var errorCount = this.failures.filter(function (failure) { return failure.getRuleSeverity() === "error"; }).length;
        return {
            errorCount: errorCount,
            failures: this.failures,
            fixes: this.fixes,
            format: formatterName,
            output: output,
            warningCount: this.failures.length - errorCount,
        };
    };
    Linter.prototype.getAllFailures = function (sourceFile, enabledRules) {
        var _this = this;
        var failures = utils_1.flatMap(enabledRules, function (rule) { return _this.applyRule(rule, sourceFile); });
        return enableDisableRules_1.removeDisabledFailures(sourceFile, failures);
    };
    Linter.prototype.applyAllFixes = function (enabledRules, fileFailures, sourceFile, sourceFileName) {
        // When fixing, we need to be careful as a fix in one rule may affect other rules.
        // So fix each rule separately.
        var source = sourceFile.text;
        var _loop_1 = function (rule) {
            var hasFixes = fileFailures.some(function (f) { return f.hasFix() && f.getRuleName() === rule.getOptions().ruleName; });
            if (hasFixes) {
                // Get new failures in case the file changed.
                var updatedFailures = enableDisableRules_1.removeDisabledFailures(sourceFile, this_1.applyRule(rule, sourceFile));
                var fixableFailures = updatedFailures.filter(function (f) { return f.hasFix(); });
                this_1.fixes = this_1.fixes.concat(fixableFailures);
                source = this_1.applyFixes(sourceFileName, source, fixableFailures);
                sourceFile = this_1.getSourceFile(sourceFileName, source);
            }
        };
        var this_1 = this;
        for (var _i = 0, enabledRules_1 = enabledRules; _i < enabledRules_1.length; _i++) {
            var rule = enabledRules_1[_i];
            _loop_1(rule);
        }
        // If there were fixes, get the *new* list of failures.
        return this.getAllFailures(sourceFile, enabledRules);
    };
    // Only "protected" because a test directly accesses it.
    // tslint:disable-next-line member-ordering
    Linter.prototype.applyFixes = function (sourceFilePath, source, fixableFailures) {
        var _this = this;
        var fixesByFile = createMultiMap(fixableFailures, function (f) { return [f.getFileName(), f.getFix()]; });
        fixesByFile.forEach(function (fileFixes, filePath) {
            var fileNewSource;
            if (path.resolve(filePath) === path.resolve(sourceFilePath)) {
                source = rule_1.Replacement.applyFixes(source, fileFixes);
                fileNewSource = source;
            }
            else {
                var oldSource = fs.readFileSync(filePath, "utf-8");
                fileNewSource = rule_1.Replacement.applyFixes(oldSource, fileFixes);
            }
            fs.writeFileSync(filePath, fileNewSource);
            _this.updateProgram(filePath);
        });
        return source;
    };
    Linter.prototype.updateProgram = function (sourceFilePath) {
        if (this.program !== undefined && this.program.getSourceFile(sourceFilePath) !== undefined) {
            var options = this.program.getCompilerOptions();
            this.program = ts.createProgram(this.program.getRootFileNames(), options, ts.createCompilerHost(options, true), this.program);
        }
    };
    Linter.prototype.applyRule = function (rule, sourceFile) {
        try {
            if (this.program !== undefined && rule_1.isTypedRule(rule)) {
                return rule.applyWithProgram(sourceFile, this.program);
            }
            else {
                return rule.apply(sourceFile);
            }
        }
        catch (error) {
            if (error_1.isError(error) && error.stack !== undefined) {
                error_1.showRuleCrashWarning(error.stack, rule.getOptions().ruleName, sourceFile.fileName);
            }
            else {
                error_1.showRuleCrashWarning(String(error), rule.getOptions().ruleName, sourceFile.fileName);
            }
            return [];
        }
    };
    Linter.prototype.getEnabledRules = function (configuration, isJs) {
        if (configuration === void 0) { configuration = configuration_1.DEFAULT_CONFIG; }
        var ruleOptionsList = configuration_1.convertRuleOptions(isJs ? configuration.jsRules : configuration.rules);
        var rulesDirectories = utils_1.arrayify(this.options.rulesDirectory)
            .concat(utils_1.arrayify(configuration.rulesDirectory));
        return ruleLoader_1.loadRules(ruleOptionsList, rulesDirectories, isJs);
    };
    Linter.prototype.getSourceFile = function (fileName, source) {
        if (this.program !== undefined) {
            var sourceFile = this.program.getSourceFile(fileName);
            if (sourceFile === undefined) {
                var INVALID_SOURCE_ERROR = utils_1.dedent(templateObject_1 || (templateObject_1 = tslib_1.__makeTemplateObject(["\n                    Invalid source file: ", ". Ensure that the files supplied to lint have a .ts, .tsx, .d.ts, .js or .jsx extension.\n                "], ["\n                    Invalid source file: ", ". Ensure that the files supplied to lint have a .ts, .tsx, .d.ts, .js or .jsx extension.\n                "])), fileName);
                throw new error_1.FatalError(INVALID_SOURCE_ERROR);
            }
            return sourceFile;
        }
        else {
            return utils.getSourceFile(fileName, source);
        }
    };
    Linter.VERSION = "5.10.0";
    Linter.findConfiguration = configuration_1.findConfiguration;
    Linter.findConfigurationPath = configuration_1.findConfigurationPath;
    Linter.getRulesDirectories = configuration_1.getRulesDirectories;
    Linter.loadConfigurationFromPath = configuration_1.loadConfigurationFromPath;
    return Linter;
}());
exports.Linter = Linter;
function createMultiMap(inputs, getPair) {
    var map = new Map();
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        var pair = getPair(input);
        if (pair !== undefined) {
            var k = pair[0], v = pair[1];
            var vs = map.get(k);
            if (vs !== undefined) {
                vs.push(v);
            }
            else {
                map.set(k, [v]);
            }
        }
    }
    return map;
}
var templateObject_1;
