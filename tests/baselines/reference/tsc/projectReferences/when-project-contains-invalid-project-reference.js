currentDirectory:: / useCaseSensitiveFileNames: false
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
[91m● [0m[96msrc/project/tsconfig.json[0m:[93m1[0m:[93m73[0m  [91mError[0m TS6053
| {"compilerOptions":{"module":"amd","outFile":"theApp.js"},"references":[{"path":"../Util/Dates"}]}
  [91m                                                                        ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔[0m
File '/src/Util/Dates' not found.


Found 1 error in src/project/tsconfig.json[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/theApp.js]
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.x = void 0;
    exports.x = 10;
});


