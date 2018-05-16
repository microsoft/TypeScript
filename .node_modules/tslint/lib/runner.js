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
// tslint:disable strict-boolean-expressions (TODO: Fix up options)
var fs = require("fs");
var glob = require("glob");
var minimatch_1 = require("minimatch");
var path = require("path");
var ts = require("typescript");
var configuration_1 = require("./configuration");
var error_1 = require("./error");
var linter_1 = require("./linter");
var utils_1 = require("./utils");
function run(options, logger) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var error_2;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, runWorker(options, logger)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    error_2 = _a.sent();
                    if (error_2 instanceof error_1.FatalError) {
                        logger.error(error_2.message + "\n");
                        return [2 /*return*/, 1 /* FatalError */];
                    }
                    throw error_2;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.run = run;
function runWorker(options, logger) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var test_1, results, _a, output, errorCount;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (options.init) {
                        if (fs.existsSync(configuration_1.JSON_CONFIG_FILENAME)) {
                            throw new error_1.FatalError("Cannot generate " + configuration_1.JSON_CONFIG_FILENAME + ": file already exists");
                        }
                        fs.writeFileSync(configuration_1.JSON_CONFIG_FILENAME, JSON.stringify(configuration_1.DEFAULT_CONFIG, undefined, "    "));
                        return [2 /*return*/, 0 /* Ok */];
                    }
                    if (!options.test) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.resolve().then(function () { return require("./test"); })];
                case 1:
                    test_1 = _b.sent();
                    results = test_1.runTests((options.files || []).map(trimSingleQuotes), options.rulesDirectory);
                    return [2 /*return*/, test_1.consoleTestResultsHandler(results, logger) ? 0 /* Ok */ : 1 /* FatalError */];
                case 2:
                    if (options.config && !fs.existsSync(options.config)) {
                        throw new error_1.FatalError("Invalid option for configuration: " + options.config);
                    }
                    return [4 /*yield*/, runLinter(options, logger)];
                case 3:
                    _a = _b.sent(), output = _a.output, errorCount = _a.errorCount;
                    if (output && output.trim()) {
                        logger.log(output + "\n");
                    }
                    return [2 /*return*/, options.force || errorCount === 0 ? 0 /* Ok */ : 2 /* LintError */];
            }
        });
    });
}
function runLinter(options, logger) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, files, program, diagnostics, message;
        return tslib_1.__generator(this, function (_b) {
            _a = resolveFilesAndProgram(options, logger), files = _a.files, program = _a.program;
            // if type checking, run the type checker
            if (program && options.typeCheck) {
                diagnostics = ts.getPreEmitDiagnostics(program);
                if (diagnostics.length !== 0) {
                    message = diagnostics.map(function (d) { return showDiagnostic(d, program, options.outputAbsolutePaths); }).join("\n");
                    if (options.force) {
                        logger.error(message + "\n");
                    }
                    else {
                        throw new error_1.FatalError(message);
                    }
                }
            }
            return [2 /*return*/, doLinting(options, files, program, logger)];
        });
    });
}
function resolveFilesAndProgram(_a, logger) {
    var files = _a.files, project = _a.project, exclude = _a.exclude, outputAbsolutePaths = _a.outputAbsolutePaths;
    // remove single quotes which break matching on Windows when glob is passed in single quotes
    exclude = exclude.map(trimSingleQuotes);
    if (project === undefined) {
        return { files: resolveGlobs(files, exclude, outputAbsolutePaths, logger) };
    }
    var projectPath = findTsconfig(project);
    if (projectPath === undefined) {
        throw new error_1.FatalError("Invalid option for project: " + project);
    }
    exclude = exclude.map(function (pattern) { return path.resolve(pattern); });
    var program = linter_1.Linter.createProgram(projectPath);
    var filesFound;
    if (files.length === 0) {
        filesFound = filterFiles(linter_1.Linter.getFileNames(program), exclude, false);
    }
    else {
        files = files.map(function (f) { return path.resolve(f); });
        filesFound = filterFiles(program.getSourceFiles().map(function (f) { return f.fileName; }), files, true);
        filesFound = filterFiles(filesFound, exclude, false);
        // find non-glob files that have no matching file in the project and are not excluded by any exclude pattern
        for (var _i = 0, _b = filterFiles(files, exclude, false); _i < _b.length; _i++) {
            var file = _b[_i];
            if (!glob.hasMagic(file) && !filesFound.some(minimatch_1.filter(file))) {
                if (fs.existsSync(file)) {
                    throw new error_1.FatalError("'" + file + "' is not included in project.");
                }
                logger.error("'" + file + "' does not exist. This will be an error in TSLint 6.\n"); // TODO make this an error in v6.0.0
            }
        }
    }
    return { files: filesFound, program: program };
}
function filterFiles(files, patterns, include) {
    if (patterns.length === 0) {
        return include ? [] : files;
    }
    var matcher = patterns.map(function (pattern) { return new minimatch_1.Minimatch(pattern, { dot: !include }); }); // `glob` always enables `dot` for ignore patterns
    return files.filter(function (file) { return include === matcher.some(function (pattern) { return pattern.match(file); }); });
}
function resolveGlobs(files, ignore, outputAbsolutePaths, logger) {
    var results = utils_1.flatMap(files, function (file) { return glob.sync(trimSingleQuotes(file), { ignore: ignore, nodir: true }); });
    // warn if `files` contains non-existent files, that are not patters and not excluded by any of the exclude patterns
    for (var _i = 0, _a = filterFiles(files, ignore, false); _i < _a.length; _i++) {
        var file = _a[_i];
        if (!glob.hasMagic(file) && !results.some(minimatch_1.filter(file))) {
            logger.error("'" + file + "' does not exist. This will be an error in TSLint 6.\n"); // TODO make this an error in v6.0.0
        }
    }
    var cwd = process.cwd();
    return results.map(function (file) { return outputAbsolutePaths ? path.resolve(cwd, file) : path.relative(cwd, file); });
}
function doLinting(options, files, program, logger) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        function isFileExcluded(filepath) {
            if (configFile === undefined || configFile.linterOptions == undefined || configFile.linterOptions.exclude == undefined) {
                return false;
            }
            var fullPath = path.resolve(filepath);
            return configFile.linterOptions.exclude.some(function (pattern) { return new minimatch_1.Minimatch(pattern).match(fullPath); });
        }
        var linter, lastFolder, configFile, _i, files_1, file, folder, contents, sourceFile;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    linter = new linter_1.Linter({
                        fix: !!options.fix,
                        formatter: options.format,
                        formattersDirectory: options.formattersDirectory,
                        rulesDirectory: options.rulesDirectory,
                    }, program);
                    configFile = options.config !== undefined ? configuration_1.findConfiguration(options.config).results : undefined;
                    _i = 0, files_1 = files;
                    _a.label = 1;
                case 1:
                    if (!(_i < files_1.length)) return [3 /*break*/, 6];
                    file = files_1[_i];
                    if (options.config === undefined) {
                        folder = path.dirname(file);
                        if (lastFolder !== folder) {
                            configFile = configuration_1.findConfiguration(null, folder).results;
                            lastFolder = folder;
                        }
                    }
                    if (isFileExcluded(file)) {
                        return [3 /*break*/, 5];
                    }
                    contents = void 0;
                    if (!(program !== undefined)) return [3 /*break*/, 2];
                    sourceFile = program.getSourceFile(file);
                    if (sourceFile !== undefined) {
                        contents = sourceFile.text;
                    }
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, tryReadFile(file, logger)];
                case 3:
                    contents = _a.sent();
                    _a.label = 4;
                case 4:
                    if (contents !== undefined) {
                        linter.lint(file, contents, configFile);
                    }
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/, linter.getResult()];
            }
        });
    });
}
/** Read a file, but return undefined if it is an MPEG '.ts' file. */
function tryReadFile(filename, logger) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var buffer, fd;
        return tslib_1.__generator(this, function (_a) {
            if (!fs.existsSync(filename)) {
                throw new error_1.FatalError("Unable to open file: " + filename);
            }
            buffer = new Buffer(256);
            fd = fs.openSync(filename, "r");
            try {
                fs.readSync(fd, buffer, 0, 256, 0);
                if (buffer.readInt8(0) === 0x47 && buffer.readInt8(188) === 0x47) {
                    // MPEG transport streams use the '.ts' file extension. They use 0x47 as the frame
                    // separator, repeating every 188 bytes. It is unlikely to find that pattern in
                    // TypeScript source, so tslint ignores files with the specific pattern.
                    logger.error(filename + ": ignoring MPEG transport stream\n");
                    return [2 /*return*/, undefined];
                }
            }
            finally {
                fs.closeSync(fd);
            }
            return [2 /*return*/, fs.readFileSync(filename, "utf8")];
        });
    });
}
function showDiagnostic(_a, program, outputAbsolutePaths) {
    var file = _a.file, start = _a.start, category = _a.category, messageText = _a.messageText;
    var message = ts.DiagnosticCategory[category];
    if (file !== undefined && start !== undefined) {
        var _b = file.getLineAndCharacterOfPosition(start), line = _b.line, character = _b.character;
        var currentDirectory = program.getCurrentDirectory();
        var filePath = outputAbsolutePaths
            ? path.resolve(currentDirectory, file.fileName)
            : path.relative(currentDirectory, file.fileName);
        message += " at " + filePath + ":" + (line + 1) + ":" + (character + 1) + ":";
    }
    return message + " " + ts.flattenDiagnosticMessageText(messageText, "\n");
}
function trimSingleQuotes(str) {
    return str.replace(/^'|'$/g, "");
}
function findTsconfig(project) {
    try {
        var stats = fs.statSync(project); // throws if file does not exist
        if (!stats.isDirectory()) {
            return project;
        }
        var projectFile = path.join(project, "tsconfig.json");
        fs.accessSync(projectFile); // throws if file does not exist
        return projectFile;
    }
    catch (e) {
        return undefined;
    }
}
