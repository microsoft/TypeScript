//// [APISample_parseConfig.ts]

/*
 * Note: This test is a public API sample. The sample sources can be found 
         at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var os: any;

import ts = require("typescript");

function printError(error: ts.Diagnostic): void {
    if (!error) {
        return;
    }
    console.log(`${error.file && error.file.fileName}: ${error.messageText}`);
}

export function createProgram(rootFiles: string[], compilerOptionsJson: string): ts.Program | undefined {
    const { config, error } = ts.parseConfigFileTextToJson("tsconfig.json", compilerOptionsJson)
    if (error) {
        printError(error);
        return undefined;
    }
    const basePath: string = process.cwd();
    const settings = ts.convertCompilerOptionsFromJson(config.config["compilerOptions"], basePath);
    if (!settings.options) {
        for (const err of settings.errors) {
            printError(err);
        }
        return undefined;
    }
    return ts.createProgram(rootFiles, settings.options);
}

//// [APISample_parseConfig.js]
/*
 * Note: This test is a public API sample. The sample sources can be found
         at: https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API#a-minimal-compiler
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */
"use strict";
var __values = (this && this.__values) || function (o) {
    var i = o.__iterator__ || 0, d;
    return i ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } };
};
var __step = (this && this.__step) || function (r) {
    return !(r.done || (r.done = (r.result = r.iterator.next()).done));
};
var __close = (this && this.__close) || function (r) {
    var m = !(r && r.done) && r.iterator["return"];
    if (m) return m.call(r.iterator);
};
var ts = require("typescript");
function printError(error) {
    if (!error) {
        return;
    }
    console.log((error.file && error.file.fileName) + ": " + error.messageText);
}
function createProgram(rootFiles, compilerOptionsJson) {
    var _a = ts.parseConfigFileTextToJson("tsconfig.json", compilerOptionsJson), config = _a.config, error = _a.error;
    if (error) {
        printError(error);
        return undefined;
    }
    var basePath = process.cwd();
    var settings = ts.convertCompilerOptionsFromJson(config.config["compilerOptions"], basePath);
    if (!settings.options) {
        try {
            for (var iterator_1 = { iterator: __values(settings.errors) }; __step(iterator_1);) {
                var err = iterator_1.result.value;
                printError(err);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try { __close(iterator_1); } finally { if (e_1) throw e_1.error; }
        }
        return undefined;
    }
    return ts.createProgram(rootFiles, settings.options);
    var e_1;
}
exports.createProgram = createProgram;
