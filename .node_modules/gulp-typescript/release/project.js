"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var stream = require("stream");
var vfs = require("vinyl-fs");
var path = require("path");
var PluginError = require("plugin-error");
var utils = require("./utils");
var reporter_1 = require("./reporter");
var input_1 = require("./input");
var output_1 = require("./output");
var compiler_1 = require("./compiler");
function setupProject(projectDirectory, configFileName, rawConfig, config, options, typescript) {
    var input = new input_1.FileCache(typescript, options);
    var compiler = options.isolatedModules ? new compiler_1.FileCompiler() : new compiler_1.ProjectCompiler();
    var running = false;
    if (options.isolatedModules) {
        options.newLine = typescript.NewLineKind.LineFeed;
        options.sourceMap = false;
        options.declaration = false;
        options.inlineSourceMap = true;
    }
    var project = function (reporter) {
        if (running) {
            throw new Error('gulp-typescript: A project cannot be used in two compilations at the same time. Create multiple projects with createProject instead.');
        }
        running = true;
        input.reset();
        compiler.prepare(projectInfo);
        var stream = new CompileStream(projectInfo);
        projectInfo.output = new output_1.Output(projectInfo, stream, stream.js, stream.dts);
        projectInfo.reporter = reporter || reporter_1.defaultReporter();
        stream.on('finish', function () {
            running = false;
        });
        return stream;
    };
    var singleOutput = options.out !== undefined || options.outFile !== undefined;
    project.src = src;
    project.typescript = typescript;
    project.projectDirectory = projectDirectory;
    project.configFileName = configFileName;
    project.rawConfig = rawConfig;
    project.config = config;
    project.options = options;
    var projectInfo = {
        input: input,
        singleOutput: singleOutput,
        compiler: compiler,
        options: options,
        typescript: typescript,
        directory: projectDirectory,
        // Set when `project` is called
        output: undefined,
        reporter: undefined
    };
    return project;
}
exports.setupProject = setupProject;
function src() {
    if (arguments.length >= 1) {
        utils.message("tsProject.src() takes no arguments", "Use gulp.src(..) if you need to specify a glob");
    }
    var base;
    if (this.options["rootDir"]) {
        base = path.resolve(this.projectDirectory, this.options["rootDir"]);
    }
    var _a = this.rawConfig, _extends = _a.extends, config = __rest(_a, ["extends"]);
    var _b = this.typescript.parseJsonConfigFileContent(config, this.typescript.sys, path.resolve(this.projectDirectory), undefined, path.basename(this.configFileName)), fileNames = _b.fileNames, errors = _b.errors;
    for (var _i = 0, errors_1 = errors; _i < errors_1.length; _i++) {
        var error = errors_1[_i];
        console.log(error.messageText);
    }
    if (base === undefined)
        base = utils.getCommonBasePathOfArray(fileNames.filter(function (file) { return file.substr(-5) !== ".d.ts"; })
            .map(function (file) { return path.dirname(file); }));
    var vinylOptions = { base: base, allowEmpty: true };
    return vfs.src(fileNames, vinylOptions);
}
var CompileStream = /** @class */ (function (_super) {
    __extends(CompileStream, _super);
    function CompileStream(project) {
        var _this = _super.call(this, { objectMode: true }) || this;
        _this.js = new CompileOutputStream();
        _this.dts = new CompileOutputStream();
        _this.project = project;
        // Prevent "Unhandled stream error in pipe" when a compilation error occurs.
        _this.on('error', function () { });
        return _this;
    }
    CompileStream.prototype._write = function (file, encoding, cb) {
        if (cb === void 0) { cb = function (err) { }; }
        if (!file)
            return cb();
        if (file.isNull()) {
            cb();
            return;
        }
        if (file.isStream()) {
            return cb(new PluginError('gulp-typescript', 'Streaming not supported'));
        }
        var inputFile = this.project.input.addGulp(file);
        this.project.compiler.inputFile(inputFile);
        cb();
    };
    CompileStream.prototype._read = function () {
    };
    CompileStream.prototype.end = function (chunk, encoding, callback) {
        if (typeof chunk === 'function') {
            this._write(null, null, chunk);
        }
        else if (typeof encoding === 'function') {
            this._write(chunk, null, encoding);
        }
        else {
            this._write(chunk, encoding, callback);
        }
        this.project.compiler.inputDone();
    };
    return CompileStream;
}(stream.Duplex));
var CompileOutputStream = /** @class */ (function (_super) {
    __extends(CompileOutputStream, _super);
    function CompileOutputStream() {
        return _super.call(this, { objectMode: true }) || this;
    }
    CompileOutputStream.prototype._read = function () {
    };
    return CompileOutputStream;
}(stream.Readable));
