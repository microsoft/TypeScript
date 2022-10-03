//// [tests/cases/compiler/APISample_WatchWithOwnWatchHost.ts] ////

//// [index.d.ts]
declare module "typescript" {
    export = ts;
}

//// [APISample_WatchWithOwnWatchHost.ts]
/*
 * Note: This test is a public API sample. This sample verifies creating abstract builder to watch list of root files
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var console: any;

import ts = require("typescript");

function watchMain() {
    // get list of files and compiler options somehow
    const files: string[] = [];
    const options: ts.CompilerOptions = {};

    const host: ts.WatchCompilerHostOfFilesAndCompilerOptions<ts.BuilderProgram> = {
        rootFiles: files,
        options,

        useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
        getNewLine: () => ts.sys.newLine,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getDefaultLibFileName: options => ts.getDefaultLibFilePath(options),

        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        directoryExists: ts.sys.directoryExists,
        getDirectories: ts.sys.getDirectories,
        readDirectory: ts.sys.readDirectory,
        realpath: ts.sys.realpath,

        watchFile: ts.sys.watchFile!,
        watchDirectory: ts.sys.watchDirectory!,
        createProgram: ts.createAbstractBuilder
    };

    // You can technically override any given hook on the host, though you probably don't need to.
    // Note that we're assuming `origCreateProgram` and `origPostProgramCreate` doesn't use `this` at all.
    const origCreateProgram = host.createProgram;
    host.createProgram = (rootNames, options, host, oldProgram) => {
        console.log("** We're about to create the program! **");
        return origCreateProgram(rootNames, options, host, oldProgram);
    }
    const origPostProgramCreate = host.afterProgramCreate;

    host.afterProgramCreate = program => {
        console.log("** We finished making the program! **");
        origPostProgramCreate!(program);
    };

    // `createWatchProgram` creates an initial program, watches files, and updates the program over time.
    ts.createWatchProgram(host);
}

watchMain();


//// [APISample_WatchWithOwnWatchHost.js]
"use strict";
/*
 * Note: This test is a public API sample. This sample verifies creating abstract builder to watch list of root files
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */
exports.__esModule = true;
var ts = require("typescript");
function watchMain() {
    // get list of files and compiler options somehow
    var files = [];
    var options = {};
    var host = {
        rootFiles: files,
        options: options,
        useCaseSensitiveFileNames: function () { return ts.sys.useCaseSensitiveFileNames; },
        getNewLine: function () { return ts.sys.newLine; },
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getDefaultLibFileName: function (options) { return ts.getDefaultLibFilePath(options); },
        fileExists: ts.sys.fileExists,
        readFile: ts.sys.readFile,
        directoryExists: ts.sys.directoryExists,
        getDirectories: ts.sys.getDirectories,
        readDirectory: ts.sys.readDirectory,
        realpath: ts.sys.realpath,
        watchFile: ts.sys.watchFile,
        watchDirectory: ts.sys.watchDirectory,
        createProgram: ts.createAbstractBuilder
    };
    // You can technically override any given hook on the host, though you probably don't need to.
    // Note that we're assuming `origCreateProgram` and `origPostProgramCreate` doesn't use `this` at all.
    var origCreateProgram = host.createProgram;
    host.createProgram = function (rootNames, options, host, oldProgram) {
        console.log("** We're about to create the program! **");
        return origCreateProgram(rootNames, options, host, oldProgram);
    };
    var origPostProgramCreate = host.afterProgramCreate;
    host.afterProgramCreate = function (program) {
        console.log("** We finished making the program! **");
        origPostProgramCreate(program);
    };
    // `createWatchProgram` creates an initial program, watches files, and updates the program over time.
    ts.createWatchProgram(host);
}
watchMain();
