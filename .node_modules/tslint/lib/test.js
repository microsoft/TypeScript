"use strict";
/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
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
var chalk_1 = require("chalk");
var diff = require("diff");
var fs = require("fs");
var glob = require("glob");
var path = require("path");
var semver = require("semver");
var ts = require("typescript");
var rule_1 = require("./language/rule/rule");
var linter_1 = require("./linter");
var utils_1 = require("./utils");
var parse = require("./verify/parse");
var MARKUP_FILE_EXTENSION = ".lint";
var FIXES_FILE_EXTENSION = ".fix";
function runTests(patterns, rulesDirectory) {
    var files = [];
    for (var _i = 0, patterns_1 = patterns; _i < patterns_1.length; _i++) {
        var pattern = patterns_1[_i];
        if (path.basename(pattern) !== "tslint.json") {
            pattern = path.join(pattern, "tslint.json");
        }
        files.push.apply(files, glob.sync(pattern));
    }
    return files.map(function (directory) { return runTest(path.dirname(directory), rulesDirectory); });
}
exports.runTests = runTests;
function runTest(testDirectory, rulesDirectory) {
    var filesToLint = glob.sync(path.join(testDirectory, "**/*" + MARKUP_FILE_EXTENSION));
    var tslintConfig = linter_1.Linter.findConfiguration(path.join(testDirectory, "tslint.json"), "").results;
    var tsConfig = path.join(testDirectory, "tsconfig.json");
    var compilerOptions = { allowJs: true };
    var hasConfig = fs.existsSync(tsConfig);
    if (hasConfig) {
        var _a = ts.readConfigFile(tsConfig, ts.sys.readFile), config = _a.config, error = _a.error;
        if (error !== undefined) {
            throw new Error(JSON.stringify(error));
        }
        var parseConfigHost = {
            fileExists: fs.existsSync,
            readDirectory: ts.sys.readDirectory,
            readFile: function (file) { return fs.readFileSync(file, "utf8"); },
            useCaseSensitiveFileNames: true,
        };
        compilerOptions = ts.parseJsonConfigFileContent(config, parseConfigHost, testDirectory).options;
    }
    var results = { directory: testDirectory, results: {} };
    var _loop_1 = function (fileToLint) {
        var isEncodingRule = path.basename(testDirectory) === "encoding";
        var fileCompileName = utils_1.denormalizeWinPath(path.resolve(fileToLint.replace(/\.lint$/, "")));
        var fileText = isEncodingRule ? utils_1.readBufferWithDetectedEncoding(fs.readFileSync(fileToLint)) : fs.readFileSync(fileToLint, "utf-8");
        var tsVersionRequirement = parse.getTypescriptVersionRequirement(fileText);
        if (tsVersionRequirement !== undefined) {
            // remove prerelease suffix when matching to allow testing with nightly builds
            if (!semver.satisfies(parse.getNormalizedTypescriptVersion(), tsVersionRequirement)) {
                results.results[fileToLint] = {
                    requirement: tsVersionRequirement,
                    skipped: true,
                };
                return "continue";
            }
            // remove the first line from the file before continuing
            var lineBreak = fileText.search(/\n/);
            fileText = lineBreak === -1 ? "" : fileText.substr(lineBreak + 1);
        }
        fileText = parse.preprocessDirectives(fileText);
        var fileTextWithoutMarkup = parse.removeErrorMarkup(fileText);
        var errorsFromMarkup = parse.parseErrorsFromMarkup(fileText);
        var program = void 0;
        if (hasConfig) {
            var compilerHost = {
                fileExists: function (file) { return file === fileCompileName || fs.existsSync(file); },
                getCanonicalFileName: function (filename) { return filename; },
                getCurrentDirectory: function () { return process.cwd(); },
                getDefaultLibFileName: function () { return ts.getDefaultLibFileName(compilerOptions); },
                getDirectories: function (dir) { return fs.readdirSync(dir); },
                getNewLine: function () { return "\n"; },
                getSourceFile: function (filenameToGet, target) {
                    if (utils_1.denormalizeWinPath(filenameToGet) === fileCompileName) {
                        return ts.createSourceFile(filenameToGet, fileTextWithoutMarkup, target, true);
                    }
                    if (path.basename(filenameToGet) === filenameToGet) {
                        // resolve path of lib.xxx.d.ts
                        filenameToGet = path.join(path.dirname(ts.getDefaultLibFilePath(compilerOptions)), filenameToGet);
                    }
                    var text = fs.readFileSync(filenameToGet, "utf8");
                    return ts.createSourceFile(filenameToGet, text, target, true);
                },
                readFile: function (x) { return x; },
                useCaseSensitiveFileNames: function () { return true; },
                writeFile: function () { return null; },
            };
            program = ts.createProgram([fileCompileName], compilerOptions, compilerHost);
        }
        var lintOptions = {
            fix: false,
            formatter: "prose",
            formattersDirectory: "",
            rulesDirectory: rulesDirectory,
        };
        var linter = new linter_1.Linter(lintOptions, program);
        // Need to use the true path (ending in '.lint') for "encoding" rule so that it can read the file.
        linter.lint(isEncodingRule ? fileToLint : fileCompileName, fileTextWithoutMarkup, tslintConfig);
        var failures = linter.getResult().failures;
        var errorsFromLinter = failures.map(function (failure) {
            var startLineAndCharacter = failure.getStartPosition().getLineAndCharacter();
            var endLineAndCharacter = failure.getEndPosition().getLineAndCharacter();
            return {
                endPos: {
                    col: endLineAndCharacter.character,
                    line: endLineAndCharacter.line,
                },
                message: failure.getFailure(),
                startPos: {
                    col: startLineAndCharacter.character,
                    line: startLineAndCharacter.line,
                },
            };
        });
        // test against fixed files
        var fixedFileText = "";
        var newFileText = "";
        try {
            var fixedFile = fileToLint.replace(/\.lint$/, FIXES_FILE_EXTENSION);
            var stat = fs.statSync(fixedFile);
            if (stat.isFile()) {
                fixedFileText = fs.readFileSync(fixedFile, "utf8");
                var fixes = utils_1.mapDefined(failures, function (f) { return f.getFix(); });
                newFileText = rule_1.Replacement.applyFixes(fileTextWithoutMarkup, fixes);
            }
        }
        catch (e) {
            fixedFileText = "";
            newFileText = "";
        }
        results.results[fileToLint] = {
            errorsFromLinter: errorsFromLinter,
            errorsFromMarkup: errorsFromMarkup,
            fixesFromLinter: newFileText,
            fixesFromMarkup: fixedFileText,
            markupFromLinter: parse.createMarkupFromErrors(fileTextWithoutMarkup, errorsFromMarkup),
            markupFromMarkup: parse.createMarkupFromErrors(fileTextWithoutMarkup, errorsFromLinter),
            skipped: false,
        };
    };
    for (var _i = 0, filesToLint_1 = filesToLint; _i < filesToLint_1.length; _i++) {
        var fileToLint = filesToLint_1[_i];
        _loop_1(fileToLint);
    }
    return results;
}
exports.runTest = runTest;
function consoleTestResultsHandler(testResults, logger) {
    var didAllTestsPass = true;
    for (var _i = 0, testResults_1 = testResults; _i < testResults_1.length; _i++) {
        var testResult = testResults_1[_i];
        if (!consoleTestResultHandler(testResult, logger)) {
            didAllTestsPass = false;
        }
    }
    return didAllTestsPass;
}
exports.consoleTestResultsHandler = consoleTestResultsHandler;
function consoleTestResultHandler(testResult, logger) {
    // needed to get colors to show up when passing through Grunt
    chalk_1.default.enabled = true;
    var didAllTestsPass = true;
    for (var _i = 0, _a = Object.keys(testResult.results); _i < _a.length; _i++) {
        var fileName = _a[_i];
        var results = testResult.results[fileName];
        logger.log(fileName + ":");
        if (results.skipped) {
            logger.log(chalk_1.default.yellow(" Skipped, requires typescript " + results.requirement + "\n"));
        }
        else {
            var markupDiffResults = diff.diffLines(results.markupFromMarkup, results.markupFromLinter);
            var fixesDiffResults = diff.diffLines(results.fixesFromLinter, results.fixesFromMarkup);
            var didMarkupTestPass = !markupDiffResults.some(function (hunk) { return hunk.added === true || hunk.removed === true; });
            var didFixesTestPass = !fixesDiffResults.some(function (hunk) { return hunk.added === true || hunk.removed === true; });
            if (didMarkupTestPass && didFixesTestPass) {
                logger.log(chalk_1.default.green(" Passed\n"));
            }
            else {
                logger.log(chalk_1.default.red(" Failed!\n"));
                didAllTestsPass = false;
                if (!didMarkupTestPass) {
                    displayDiffResults(markupDiffResults, MARKUP_FILE_EXTENSION, logger);
                }
                if (!didFixesTestPass) {
                    displayDiffResults(fixesDiffResults, FIXES_FILE_EXTENSION, logger);
                }
            }
        }
    }
    return didAllTestsPass;
}
exports.consoleTestResultHandler = consoleTestResultHandler;
function displayDiffResults(diffResults, extension, logger) {
    logger.log(chalk_1.default.green("Expected (from " + extension + " file)\n"));
    logger.log(chalk_1.default.red("Actual (from TSLint)\n"));
    for (var _i = 0, diffResults_1 = diffResults; _i < diffResults_1.length; _i++) {
        var diffResult = diffResults_1[_i];
        var color = chalk_1.default.grey;
        if (diffResult.added) {
            color = chalk_1.default.green.underline;
        }
        else if (diffResult.removed) {
            color = chalk_1.default.red.underline;
        }
        logger.log(color(diffResult.value));
    }
}
