Input::
//// [/a/lib/lib.d.ts]
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

//// [/users/username/projects/project/node_modules/tslib/index.d.ts]
export function __assign(...args: any[]): any;

//// [/users/username/projects/project/node_modules/tslib/package.json]
{"name":"tslib","version":"0.0.1"}

//// [/users/username/projects/project/index.tsx]
export const x = {...{}};

//// [/users/username/projects/project/tsconfig.json]
{"compilerOptions":{"importHelpers":true}}


/a/lib/tsc.js -i
Output::


Program root files: ["/users/username/projects/project/index.tsx"]
Program options: {"importHelpers":true,"incremental":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/tslib/index.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/users/username/projects/project/node_modules/tslib/index.d.ts
/users/username/projects/project/index.tsx

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/users/username/projects/project/node_modules/tslib/index.d.ts (used version)
/users/username/projects/project/index.tsx (used version)

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.Success

//// [/users/username/projects/project/index.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
var tslib_1 = require("tslib");
exports.x = (0, tslib_1.__assign)({});


//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./node_modules/tslib/index.d.ts","./index.tsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"1620578607-export function __assign(...args: any[]): any;","-14168389096-export const x = {...{}};"],"options":{"importHelpers":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,3,2]},"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./node_modules/tslib/index.d.ts",
      "./index.tsx"
    ],
    "fileNamesList": [
      [
        "./node_modules/tslib/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./node_modules/tslib/index.d.ts": {
        "version": "1620578607-export function __assign(...args: any[]): any;",
        "signature": "1620578607-export function __assign(...args: any[]): any;"
      },
      "./index.tsx": {
        "version": "-14168389096-export const x = {...{}};",
        "signature": "-14168389096-export const x = {...{}};"
      }
    },
    "options": {
      "importHelpers": true
    },
    "referencedMap": {
      "./index.tsx": [
        "./node_modules/tslib/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./index.tsx": [
        "./node_modules/tslib/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./index.tsx",
      "./node_modules/tslib/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 867
}


Change::

Input::
//// [/users/username/projects/project/node_modules/tslib/index.d.ts] deleted
//// [/users/username/projects/project/node_modules/tslib/package.json] deleted

Output::
[96mindex.tsx[0m:[93m1[0m:[93m19[0m - [91merror[0m[90m TS2354: [0mThis syntax requires an imported helper but module 'tslib' cannot be found.

[7m1[0m export const x = {...{}};
[7m [0m [91m                  ~~~~~[0m


Found 1 error.



Program root files: ["/users/username/projects/project/index.tsx"]
Program options: {"importHelpers":true,"incremental":true,"configFilePath":"/users/username/projects/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/users/username/projects/project/index.tsx

Semantic diagnostics in builder refreshed for::
/users/username/projects/project/index.tsx

Shape signatures in builder refreshed for::
/users/username/projects/project/index.tsx (computed .d.ts)

WatchedFiles::

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated

//// [/users/username/projects/project/index.js] file written with same contents
//// [/users/username/projects/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./index.tsx"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14168389096-export const x = {...{}};","signature":"-6508651827-export declare const x: {};\n"}],"options":{"importHelpers":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[2,[{"file":"./index.tsx","start":18,"length":5,"messageText":"This syntax requires an imported helper but module 'tslib' cannot be found.","category":1,"code":2354}]]]},"version":"FakeTSVersion"}

//// [/users/username/projects/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./index.tsx"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./index.tsx": {
        "version": "-14168389096-export const x = {...{}};",
        "signature": "-6508651827-export declare const x: {};\n"
      }
    },
    "options": {
      "importHelpers": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./index.tsx",
        [
          {
            "file": "./index.tsx",
            "start": 18,
            "length": 5,
            "messageText": "This syntax requires an imported helper but module 'tslib' cannot be found.",
            "category": 1,
            "code": 2354
          }
        ]
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 975
}

