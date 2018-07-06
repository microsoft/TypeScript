//// [tests/cases/compiler/APISample_Watch.ts] ////

//// [index.d.ts]
declare module "typescript" {
    export = ts;
}

//// [APISample_Watch.ts]
/*
 * Note: This test is a public API sample. The sample sources can be found
 *       at: https://github.com/Microsoft/TypeScript-wiki/blob/master/Using-the-Compiler-API.md#writing-an-incremental-program-watcher
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var process: any;
declare var console: any;
declare var os: any;

import ts = require("typescript");

const formatHost: ts.FormatDiagnosticsHost = {
    getCanonicalFileName: path => path,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: () => ts.sys.newLine,
}

function watchMain() {
    const configPath = ts.findConfigFile(/*searchPath*/ "./", ts.sys.fileExists, "tsconfig.json");
    if (!configPath) {
        throw new Error("Could not find a valid 'tsconfig.json'.");
    }

    // TypeScript can use several different program creation "strategies":
    //  * ts.createEmitAndSemanticDiagnosticsBuilderProgram,
    //  * ts.createSemanticDiagnosticsBuilderProgram
    //  * ts.createAbstractBuilder
    // The first two produce "builder programs". These use an incremental strategy to only re-check and emit files whose
    // contents may have changed, or whose dependencies may have changes which may impact change the result of prior type-check and emit.
    // The last uses an ordinary program which does a full type check after every change.
    // Between `createEmitAndSemanticDiagnosticsBuilderProgram` and `createSemanticDiagnosticsBuilderProgram`, the only difference is emit.
    // For pure type-checking scenarios, or when another tool/process handles emit, using `createSemanticDiagnosticsBuilderProgram` may be more desirable.

    // Note that there is another overload for `createWatchCompilerHost` that takes a set of root files.
    const host = ts.createWatchCompilerHost(configPath, {}, ts.sys,
        ts.createSemanticDiagnosticsBuilderProgram,
        reportDiagnostic,
        reportWatchStatusChanged,
    );

    // You can technically override any given hook on the host, though you probably don't need to.
    // Note that we're assuming `origCreateProgram` and `origPostProgramCreate` doesn't use `this` at all.
    const origCreateProgram = host.createProgram;
    host.createProgram = (rootNames: ReadonlyArray<string>, options, host, oldProgram) => {
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

function reportDiagnostic(diagnostic: ts.Diagnostic) {
    console.error("Error", diagnostic.code, ":",
        ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine())
    );
}

/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic: ts.Diagnostic) {
    console.info(ts.formatDiagnostic(diagnostic, formatHost));
}

watchMain();


//// [APISample_Watch.js]
"use strict";
/*
 * Note: This test is a public API sample. The sample sources can be found
 *       at: https://github.com/Microsoft/TypeScript-wiki/blob/master/Using-the-Compiler-API.md#writing-an-incremental-program-watcher
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */
exports.__esModule = true;
var ts = require("typescript");
var formatHost = {
    getCanonicalFileName: function (path) { return path; },
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getNewLine: function () { return ts.sys.newLine; }
};
function watchMain() {
    var configPath = ts.findConfigFile(/*searchPath*/ "./", ts.sys.fileExists, "tsconfig.json");
    if (!configPath) {
        throw new Error("Could not find a valid 'tsconfig.json'.");
    }
    // TypeScript can use several different program creation "strategies":
    //  * ts.createEmitAndSemanticDiagnosticsBuilderProgram,
    //  * ts.createSemanticDiagnosticsBuilderProgram
    //  * ts.createAbstractBuilder
    // The first two produce "builder programs". These use an incremental strategy to only re-check and emit files whose
    // contents may have changed, or whose dependencies may have changes which may impact change the result of prior type-check and emit.
    // The last uses an ordinary program which does a full type check after every change.
    // Between `createEmitAndSemanticDiagnosticsBuilderProgram` and `createSemanticDiagnosticsBuilderProgram`, the only difference is emit.
    // For pure type-checking scenarios, or when another tool/process handles emit, using `createSemanticDiagnosticsBuilderProgram` may be more desirable.
    // Note that there is another overload for `createWatchCompilerHost` that takes a set of root files.
    var host = ts.createWatchCompilerHost(configPath, {}, ts.sys, ts.createSemanticDiagnosticsBuilderProgram, reportDiagnostic, reportWatchStatusChanged);
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
function reportDiagnostic(diagnostic) {
    console.error("Error", diagnostic.code, ":", ts.flattenDiagnosticMessageText(diagnostic.messageText, formatHost.getNewLine()));
}
/**
 * Prints a diagnostic every time the watch status changes.
 * This is mainly for messages like "Starting compilation" or "Compilation completed".
 */
function reportWatchStatusChanged(diagnostic) {
    console.info(ts.formatDiagnostic(diagnostic, formatHost));
}
watchMain();
