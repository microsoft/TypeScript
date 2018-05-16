"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
var path = require("path");
var _project = require("./project");
var utils = require("./utils");
var _reporter = require("./reporter");
function compile(param, theReporter) {
    if (arguments.length >= 3) {
        utils.deprecate("Reporter are now passed as the second argument", "remove the second argument", "Filters have been removed as of gulp-typescript 3.0.\nThe reporter is now passed as the second argument instead of the third argument.");
    }
    var proj;
    if (typeof param === "function") {
        proj = param;
        if (arguments.length >= 2) {
            utils.deprecate("ts(tsProject, ...) has been deprecated", "use .pipe(tsProject(reporter)) instead", "As of gulp-typescript 3.0, .pipe(ts(tsProject, ...)) should be written as .pipe(tsProject(reporter)).");
        }
        else {
            utils.deprecate("ts(tsProject) has been deprecated", "use .pipe(tsProject()) instead", "As of gulp-typescript 3.0, .pipe(ts(tsProject)) should be written as .pipe(tsProject()).");
        }
    }
    else {
        proj = compile.createProject(param || {});
    }
    return proj(theReporter);
}
function getTypeScript(typescript) {
    if (typescript)
        return typescript;
    try {
        return require('typescript');
    }
    catch (e) {
        utils.deprecate("TypeScript not installed", "install with `npm install typescript --save-dev`", "As of gulp-typescript 3.0, TypeScript isn't bundled with gulp-typescript any more.\nInstall the latest stable version with `npm install typescript --save-dev`\nor a nightly with `npm install typescript@next --save-dev`");
        throw new Error("TypeScript not installed");
    }
}
function checkAndNormalizeSettings(settings) {
    var declarationFiles = settings.declarationFiles, noExternalResolve = settings.noExternalResolve, sortOutput = settings.sortOutput, typescript = settings.typescript, standardSettings = __rest(settings, ["declarationFiles", "noExternalResolve", "sortOutput", "typescript"]);
    if (settings.sourceRoot !== undefined) {
        console.warn('gulp-typescript: sourceRoot isn\'t supported any more. Use sourceRoot option of gulp-sourcemaps instead.');
    }
    if (noExternalResolve !== undefined) {
        utils.deprecate("noExternalResolve is deprecated", "use noResolve instead", "The non-standard option noExternalResolve has been removed as of gulp-typescript 3.0.\nUse noResolve instead.");
    }
    if (sortOutput !== undefined) {
        utils.deprecate("sortOutput is deprecated", "your project might work without it", "The non-standard option sortOutput has been removed as of gulp-typescript 3.0.\nYour project will probably compile without this option.\nOtherwise, if you're using gulp-concat, you should remove gulp-concat and use the outFile option instead.");
    }
    if (declarationFiles) {
        standardSettings.declaration = settings.declarationFiles;
    }
    return standardSettings;
}
function normalizeCompilerOptions(options) {
    options.sourceMap = true;
    options.suppressOutputPathCheck = true;
    options.inlineSourceMap = false;
    options.sourceRoot = undefined;
    options.inlineSources = false;
}
function reportErrors(errors, typescript, ignore) {
    if (ignore === void 0) { ignore = []; }
    var reporter = _reporter.defaultReporter();
    for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
        var error = errors_1[_i];
        if (ignore.indexOf(error.code) !== -1)
            continue;
        reporter.error(utils.getError(error, typescript), typescript);
    }
}
(function (compile) {
    compile.reporter = _reporter;
    function createProject(fileNameOrSettings, settings) {
        var tsConfigFileName = undefined;
        var tsConfigContent = undefined;
        var projectDirectory = process.cwd();
        var typescript;
        var compilerOptions;
        var fileName;
        var rawConfig;
        if (fileNameOrSettings !== undefined) {
            if (typeof fileNameOrSettings === 'string') {
                fileName = fileNameOrSettings;
                tsConfigFileName = path.resolve(process.cwd(), fileName);
                projectDirectory = path.dirname(tsConfigFileName);
                if (settings === undefined)
                    settings = {};
            }
            else {
                settings = fileNameOrSettings || {};
            }
            typescript = getTypeScript(settings.typescript);
            settings = checkAndNormalizeSettings(settings);
            var settingsResult = typescript.convertCompilerOptionsFromJson(settings, projectDirectory);
            if (settingsResult.errors) {
                reportErrors(settingsResult.errors, typescript);
            }
            compilerOptions = settingsResult.options;
            if (fileName !== undefined) {
                var tsConfig = typescript.readConfigFile(tsConfigFileName, typescript.sys.readFile);
                if (tsConfig.error) {
                    console.log(tsConfig.error.messageText);
                }
                var parsed = typescript.parseJsonConfigFileContent(tsConfig.config || {}, getTsconfigSystem(typescript), path.resolve(projectDirectory), compilerOptions, path.basename(tsConfigFileName));
                rawConfig = parsed.raw;
                tsConfigContent = parsed.raw;
                if (parsed.errors) {
                    reportErrors(parsed.errors, typescript, [18003]);
                }
                compilerOptions = parsed.options;
            }
        }
        normalizeCompilerOptions(compilerOptions);
        var project = _project.setupProject(projectDirectory, tsConfigFileName, rawConfig, tsConfigContent, compilerOptions, typescript);
        return project;
    }
    compile.createProject = createProject;
    function filter() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        utils.deprecate('ts.filter() is deprecated', 'soon you can use tsProject.resolve()', 'Filters have been removed as of gulp-typescript 3.0.\nSoon tsProject.resolve() will be available as an alternative.\nSee https://github.com/ivogabe/gulp-typescript/issues/190.');
    }
    compile.filter = filter;
})(compile || (compile = {}));
function getTsconfigSystem(typescript) {
    return {
        useCaseSensitiveFileNames: typescript.sys.useCaseSensitiveFileNames,
        readDirectory: function () { return []; },
        fileExists: typescript.sys.fileExists,
        readFile: typescript.sys.readFile
    };
}
module.exports = compile;
