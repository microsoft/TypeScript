Input::
//// [/lib/lib.d.ts]
/// <reference no-default-lib="true"/>
interface Boolean {}
interface Function {}
interface CallableFunction {}
interface NewableFunction {}
interface IArguments {}
interface Number { toExponential: any; }
interface Object {}
interface RegExp {}
interface String { charAt: any; }
interface Array<T> { length: number; [n: number]: T; }
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/src/project/src/main.ts]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"module":"amd","outFile":"theApp.js"},"references":[{"path":"../Util/Dates"}]}



Output::
/lib/tsc --p src/project
[96msrc/project/tsconfig.json[0m:[93m1[0m:[93m73[0m - [91merror[0m[90m TS6053: [0mFile '/src/Util/Dates' not found.

[7m1[0m {"compilerOptions":{"module":"amd","outFile":"theApp.js"},"references":[{"path":"../Util/Dates"}]}
[7m [0m [91m                                                                        ~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/theApp.js]
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.x = void 0;
    exports.x = 10;
});


