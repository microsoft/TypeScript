//// [tests/cases/compiler/APISample_WatchWithDefaults.ts] ////

//// [package.json]
{
    "name": "typescript",
    "types": "/.ts/typescript.d.ts"
}

//// [APISample_WatchWithDefaults.ts]
/*
 * Note: This test is a public API sample. This uses default sys interface without having to pass anything
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */

declare var console: any;

import ts = require("typescript");

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
    const host = ts.createWatchCompilerHost(configPath, {}, ts.sys);

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


//// [APISample_WatchWithDefaults.js]
"use strict";
/*
 * Note: This test is a public API sample. This uses default sys interface without having to pass anything
 *       Please log a "breaking change" issue for any API breaking change affecting this issue
 */
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
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
    var host = ts.createWatchCompilerHost(configPath, {}, ts.sys);
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
