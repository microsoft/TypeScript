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
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "composite": true,
        "tsBuildInfoFile": "tsconfig.json.tsbuildinfo"
    },
    "include": [
        "src/**/*.ts"
    ]
}



Output::
/lib/tsc --composite false --p src/project
[96msrc/project/tsconfig.json[0m:[93m6[0m:[93m9[0m - [91merror[0m[90m TS5069: [0mOption 'tsBuildInfoFile' cannot be specified without specifying option 'incremental' or option 'composite'.

[7m6[0m         "tsBuildInfoFile": "tsconfig.json.tsbuildinfo"
[7m [0m [91m        ~~~~~~~~~~~~~~~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


