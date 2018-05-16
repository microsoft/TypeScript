"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var sourceMap = require("source-map");
var VinylFile = require("vinyl");
var utils = require("./utils");
var Output = /** @class */ (function () {
    function Output(_project, streamFull, streamJs, streamDts) {
        this.project = _project;
        this.streamFull = streamFull;
        this.streamJs = streamJs;
        this.streamDts = streamDts;
    }
    Output.prototype.writeJs = function (base, fileName, content, sourceMapContent, cwd, original) {
        var file = new VinylFile({
            path: fileName,
            contents: new Buffer(content),
            cwd: cwd,
            base: base
        });
        var appliedSourceMap = this.applySourceMap(sourceMapContent, original, file);
        if (appliedSourceMap)
            file.sourceMap = JSON.parse(appliedSourceMap);
        this.streamFull.push(file);
        this.streamJs.push(file);
    };
    Output.prototype.writeDts = function (base, fileName, content, cwd) {
        var file = new VinylFile({
            path: fileName,
            contents: new Buffer(content),
            cwd: cwd,
            base: base
        });
        this.streamFull.push(file);
        this.streamDts.push(file);
    };
    Output.prototype.applySourceMap = function (sourceMapContent, original, output) {
        var _this = this;
        if (sourceMapContent === undefined)
            return undefined;
        var map = JSON.parse(sourceMapContent);
        var directory = path.dirname(output.path);
        // gulp-sourcemaps docs:
        // paths in the generated source map (`file` and `sources`) are relative to `file.base` (e.g. use `file.relative`).
        map.file = utils.forwardSlashes(output.relative);
        map.sources = map.sources.map(relativeToOutput);
        delete map.sourceRoot;
        var generator = sourceMap.SourceMapGenerator.fromSourceMap(new sourceMap.SourceMapConsumer(map));
        var sourceMapOrigins = this.project.singleOutput
            ? this.project.input.getFileNames(true).map(function (fName) { return _this.project.input.getFile(fName); })
            : [original];
        for (var _i = 0, sourceMapOrigins_1 = sourceMapOrigins; _i < sourceMapOrigins_1.length; _i++) {
            var sourceFile = sourceMapOrigins_1[_i];
            if (!sourceFile || !sourceFile.gulp || !sourceFile.gulp.sourceMap)
                continue;
            var inputOriginalMap = sourceFile.gulp.sourceMap;
            var inputMap = typeof inputOriginalMap === 'object' ? inputOriginalMap : JSON.parse(inputOriginalMap);
            // We should only apply the input mappings if the input mapping isn't empty,
            // since `generator.applySourceMap` has a really bad performance on big inputs.
            if (inputMap.mappings !== '') {
                var consumer = new sourceMap.SourceMapConsumer(inputMap);
                generator.applySourceMap(consumer);
            }
            if (!inputMap.sources || !inputMap.sourcesContent)
                continue;
            for (var i = 0; i < inputMap.sources.length; i++) {
                var absolute = path.resolve(sourceFile.gulp.base, inputMap.sources[i]);
                var relative = path.relative(output.base, absolute);
                generator.setSourceContent(utils.forwardSlashes(relative), inputMap.sourcesContent[i]);
            }
        }
        return generator.toString();
        function relativeToOutput(fileName) {
            var absolute = path.resolve(directory, fileName);
            return utils.forwardSlashes(path.relative(output.base, absolute));
        }
    };
    Output.prototype.finish = function (result) {
        this.result = result;
        if (this.project.reporter.finish)
            this.project.reporter.finish(result);
        this.streamFull.emit('finish');
        this.streamFull.push(null);
        this.streamJs.push(null);
        this.streamDts.push(null);
    };
    Output.prototype.getError = function (info) {
        var fileName = info.file && info.file.fileName;
        var file = fileName && this.project.input.getFile(fileName);
        return utils.getError(info, this.project.typescript, file);
    };
    Output.prototype.diagnostic = function (info) {
        this.error(this.getError(info));
    };
    Output.prototype.error = function (error) {
        if (!error)
            return;
        // call reporter callback
        if (this.project.reporter.error)
            this.project.reporter.error(error, this.project.typescript);
        // & emit the error on the stream.
        this.streamFull.emit('error', error);
    };
    return Output;
}());
exports.Output = Output;
