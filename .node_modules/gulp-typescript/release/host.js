"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("./utils");
var Host = /** @class */ (function () {
    function Host(typescript, currentDirectory, input, options) {
        var _this = this;
        this.getCurrentDirectory = function () {
            return _this.currentDirectory;
        };
        this.writeFile = function (fileName, data, writeByteOrderMark, onError) { };
        this.fileExists = function (fileName) {
            var sourceFile = _this.input.getFile(fileName);
            if (sourceFile)
                return true;
            return _this.fallback.fileExists(fileName);
        };
        this.readFile = function (fileName) {
            var sourceFile = _this.input.getFile(fileName);
            if (sourceFile)
                return sourceFile.content;
            return _this.fallback.readFile(fileName);
        };
        this.getSourceFile = function (fileName, languageVersion, onError) {
            // TODO: Cache lib.d.ts files between compilations
            var sourceFile = _this.input.getFile(fileName);
            if (sourceFile)
                return sourceFile.ts;
            return _this.fallback.getSourceFile(fileName, languageVersion, onError);
        };
        this.realpath = function (path) { return _this.fallback.realpath(path); };
        this.getDirectories = function (path) { return _this.fallback.getDirectories(path); };
        this.directoryExists = function (path) { return _this.fallback.directoryExists(path); };
        this.typescript = typescript;
        this.fallback = typescript.createCompilerHost(options);
        this.currentDirectory = currentDirectory;
        this.input = input;
    }
    Host.prototype.getNewLine = function () {
        return '\n';
    };
    Host.prototype.useCaseSensitiveFileNames = function () {
        return false;
    };
    Host.prototype.getCanonicalFileName = function (filename) {
        return utils.normalizePath(filename);
    };
    Host.prototype.getDefaultLibFileName = function (options) {
        return this.fallback.getDefaultLibFileName(options);
    };
    Host.prototype.getDefaultLibLocation = function () {
        return this.fallback.getDefaultLibLocation();
    };
    return Host;
}());
exports.Host = Host;
