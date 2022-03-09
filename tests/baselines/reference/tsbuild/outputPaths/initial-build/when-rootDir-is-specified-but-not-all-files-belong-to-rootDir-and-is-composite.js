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

//// [/src/src/index.ts]
export const x = 10;

//// [/src/tsconfig.json]
{"compilerOptions":{"outDir":"dist","rootDir":"src","composite":true}}

//// [/src/types/type.ts]
export type t = string;



Output::
/lib/tsc --b /src/tsconfig.json -v
[[90m12:01:00 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/dist/index.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/src/types/type.ts' is not under 'rootDir' '/src/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by include pattern '**/*' in '/src/tsconfig.json'


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/dist/index.js' does not exist

[[90m12:04:00 AM[0m] Building project '/src/tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/src/types/type.ts' is not under 'rootDir' '/src/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by include pattern '**/*' in '/src/tsconfig.json'


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: Normal build without change, that does not block emit on error to show files that get emitted
Input::


Output::
/lib/tsc -p /src/tsconfig.json
[91merror[0m[90m TS6059: [0mFile '/src/types/type.ts' is not under 'rootDir' '/src/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by include pattern '**/*' in '/src/tsconfig.json'


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/dist/index.d.ts]
export declare const x = 10;


//// [/src/dist/index.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./src/index.ts","./types/type.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-10726455937-export const x = 10;","-4885977236-export type t = string;"],"options":{"composite":true,"outDir":"./dist","rootDir":"./src"},"referencedMap":[],"exportedModulesMap":[]},"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./src/index.ts",
      "./types/type.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/index.ts": {
        "version": "-10726455937-export const x = 10;",
        "signature": "-10726455937-export const x = 10;"
      },
      "./types/type.ts": {
        "version": "-4885977236-export type t = string;",
        "signature": "-4885977236-export type t = string;"
      }
    },
    "options": {
      "composite": true,
      "outDir": "./dist",
      "rootDir": "./src"
    },
    "referencedMap": {},
    "exportedModulesMap": {}
  },
  "version": "FakeTSVersion",
  "size": 781
}

//// [/src/types/type.d.ts]
export declare type t = string;


//// [/src/types/type.js]
"use strict";
exports.__esModule = true;


