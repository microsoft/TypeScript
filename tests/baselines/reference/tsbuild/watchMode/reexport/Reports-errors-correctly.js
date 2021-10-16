Input::
//// [/user/username/projects/reexport/src/tsconfig.json]
{
  "files": [],
  "include": [],
  "references": [{ "path": "./pure" }, { "path": "./main" }]
}


//// [/user/username/projects/reexport/src/main/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "../../out",
    "rootDir": "../"
  },
  "include": ["**/*.ts"],
  "references": [{ "path": "../pure" }]
}


//// [/user/username/projects/reexport/src/main/index.ts]
import { Session } from "../pure";

export const session: Session = {
  foo: 1
};


//// [/user/username/projects/reexport/src/pure/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "../../out",
    "rootDir": "../"
  },
  "include": ["**/*.ts"]
}


//// [/user/username/projects/reexport/src/pure/index.ts]
export * from "./session";


//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
  foo: number;
  // bar: number;
}


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


/a/lib/tsc.js -b -w -verbose src
Output::
>> Screen clear
[[90m12:00:35 AM[0m] Starting compilation in watch mode...

[[90m12:00:36 AM[0m] Projects in this build: 
    * src/pure/tsconfig.json
    * src/main/tsconfig.json
    * src/tsconfig.json

[[90m12:00:37 AM[0m] Project 'src/pure/tsconfig.json' is out of date because output file 'out/pure/index.js' does not exist

[[90m12:00:38 AM[0m] Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...

[[90m12:00:56 AM[0m] Project 'src/main/tsconfig.json' is out of date because output file 'out/main/index.js' does not exist

[[90m12:00:57 AM[0m] Building project '/user/username/projects/reexport/src/main/tsconfig.json'...

[[90m12:01:03 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/reexport/src/pure/index.ts","/user/username/projects/reexport/src/pure/session.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/pure/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/reexport/src/pure/session.ts (used version)
/user/username/projects/reexport/src/pure/index.ts (used version)

Program root files: ["/user/username/projects/reexport/src/main/index.ts"]
Program options: {"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/main/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/reexport/out/pure/session.d.ts (used version)
/user/username/projects/reexport/out/pure/index.d.ts (used version)
/user/username/projects/reexport/src/main/index.ts (used version)

WatchedFiles::
/user/username/projects/reexport/src/pure/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/pure/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/pure/index.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/session.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/session.ts","pollingInterval":250}
/user/username/projects/reexport/src/main/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/main/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/main/index.ts:
  {"fileName":"/user/username/projects/reexport/src/main/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/package.json:
  {"fileName":"/user/username/projects/reexport/src/pure/package.json","pollingInterval":250}
/user/username/projects/reexport/src/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/reexport/src/pure:
  {"directoryName":"/user/username/projects/reexport/src/pure","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/reexport/src/main:
  {"directoryName":"/user/username/projects/reexport/src/main","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/reexport/out/pure/session.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
}


//// [/user/username/projects/reexport/out/pure/index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
__exportStar(require("./session"), exports);


//// [/user/username/projects/reexport/out/pure/index.d.ts]
export * from "./session";


//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"5375279855-export interface Session {\n  foo: number;\n  // bar: number;\n}\n","-5356193041-export * from \"./session\";\n"],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,3,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/session.ts",
      "../../src/pure/index.ts"
    ],
    "fileNamesList": [
      [
        "../../src/pure/session.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../src/pure/session.ts": {
        "version": "5375279855-export interface Session {\n  foo: number;\n  // bar: number;\n}\n",
        "signature": "5375279855-export interface Session {\n  foo: number;\n  // bar: number;\n}\n"
      },
      "../../src/pure/index.ts": {
        "version": "-5356193041-export * from \"./session\";\n",
        "signature": "-5356193041-export * from \"./session\";\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "..",
      "rootDir": "../../src"
    },
    "referencedMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/index.ts",
      "../../src/pure/session.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 935
}

//// [/user/username/projects/reexport/out/main/index.js]
"use strict";
exports.__esModule = true;
exports.session = void 0;
exports.session = {
    foo: 1
};



Change:: Introduce error

Input::
//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
  foo: number;
  bar: number;
}



Output::
>> Screen clear
[[90m12:01:07 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:08 AM[0m] Project 'src/pure/tsconfig.json' is out of date because oldest output 'out/pure/index.js' is older than newest input 'src/pure/session.ts'

[[90m12:01:09 AM[0m] Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...

[[90m12:01:28 AM[0m] Project 'src/main/tsconfig.json' is out of date because oldest output 'out/main/index.js' is older than newest input 'src/pure/tsconfig.json'

[[90m12:01:29 AM[0m] Building project '/user/username/projects/reexport/src/main/tsconfig.json'...

[96msrc/main/index.ts[0m:[93m3[0m:[93m14[0m - [91merror[0m[90m TS2741: [0mProperty 'bar' is missing in type '{ foo: number; }' but required in type 'Session'.

[7m3[0m export const session: Session = {
[7m [0m [91m             ~~~~~~~[0m

  [96mout/pure/session.d.ts[0m:[93m3[0m:[93m5[0m
    [7m3[0m     bar: number;
    [7m [0m [96m    ~~~[0m
    'bar' is declared here.

[[90m12:01:30 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/reexport/src/pure/index.ts","/user/username/projects/reexport/src/pure/session.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/pure/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts (computed .d.ts)
/user/username/projects/reexport/src/pure/index.ts (used version)

Program root files: ["/user/username/projects/reexport/src/main/index.ts"]
Program options: {"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/main/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts (used version)
/user/username/projects/reexport/out/pure/index.d.ts (used version)
/user/username/projects/reexport/src/main/index.ts (used version)

WatchedFiles::
/user/username/projects/reexport/src/pure/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/pure/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/pure/index.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/session.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/session.ts","pollingInterval":250}
/user/username/projects/reexport/src/main/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/main/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/main/index.ts:
  {"fileName":"/user/username/projects/reexport/src/main/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/package.json:
  {"fileName":"/user/username/projects/reexport/src/pure/package.json","pollingInterval":250}
/user/username/projects/reexport/src/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/reexport/src/pure:
  {"directoryName":"/user/username/projects/reexport/src/pure","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/reexport/src/main:
  {"directoryName":"/user/username/projects/reexport/src/main","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/reexport/out/pure/session.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
    bar: number;
}


//// [/user/username/projects/reexport/out/pure/index.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/index.d.ts] file written with same contents
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"4223553457-export interface Session {\n  foo: number;\n  bar: number;\n}\n","signature":"309257137-export interface Session {\n    foo: number;\n    bar: number;\n}\n"},"-5356193041-export * from \"./session\";\n"],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,3,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/session.ts",
      "../../src/pure/index.ts"
    ],
    "fileNamesList": [
      [
        "../../src/pure/session.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../src/pure/session.ts": {
        "version": "4223553457-export interface Session {\n  foo: number;\n  bar: number;\n}\n",
        "signature": "309257137-export interface Session {\n    foo: number;\n    bar: number;\n}\n"
      },
      "../../src/pure/index.ts": {
        "version": "-5356193041-export * from \"./session\";\n",
        "signature": "-5356193041-export * from \"./session\";\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "..",
      "rootDir": "../../src"
    },
    "referencedMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/index.ts",
      "../../src/pure/session.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1036
}


Change:: Fix error

Input::
//// [/user/username/projects/reexport/src/pure/session.ts]
export interface Session {
  foo: number;
  // bar: number;
}



Output::
>> Screen clear
[[90m12:01:34 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:35 AM[0m] Project 'src/pure/tsconfig.json' is out of date because oldest output 'out/pure/index.js' is older than newest input 'src/pure/session.ts'

[[90m12:01:36 AM[0m] Building project '/user/username/projects/reexport/src/pure/tsconfig.json'...

[[90m12:01:55 AM[0m] Failed to parse file 'src/main/tsconfig.json': Semantic errors.

[[90m12:01:56 AM[0m] Building project '/user/username/projects/reexport/src/main/tsconfig.json'...

[[90m12:01:58 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/reexport/src/main/tsconfig.json'...

[[90m12:01:59 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/reexport/src/pure/index.ts","/user/username/projects/reexport/src/pure/session.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/pure/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts
/user/username/projects/reexport/src/pure/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/reexport/src/pure/session.ts (computed .d.ts)
/user/username/projects/reexport/src/pure/index.ts (used version)

Program root files: ["/user/username/projects/reexport/src/main/index.ts"]
Program options: {"outDir":"/user/username/projects/reexport/out","rootDir":"/user/username/projects/reexport/src","watch":true,"configFilePath":"/user/username/projects/reexport/src/main/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts
/user/username/projects/reexport/out/pure/index.d.ts
/user/username/projects/reexport/src/main/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/reexport/out/pure/session.d.ts (used version)
/user/username/projects/reexport/out/pure/index.d.ts (used version)
/user/username/projects/reexport/src/main/index.ts (used version)

WatchedFiles::
/user/username/projects/reexport/src/pure/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/pure/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/pure/index.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/session.ts:
  {"fileName":"/user/username/projects/reexport/src/pure/session.ts","pollingInterval":250}
/user/username/projects/reexport/src/main/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/main/tsconfig.json","pollingInterval":250}
/user/username/projects/reexport/src/main/index.ts:
  {"fileName":"/user/username/projects/reexport/src/main/index.ts","pollingInterval":250}
/user/username/projects/reexport/src/pure/package.json:
  {"fileName":"/user/username/projects/reexport/src/pure/package.json","pollingInterval":250}
/user/username/projects/reexport/src/tsconfig.json:
  {"fileName":"/user/username/projects/reexport/src/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/reexport/src/pure:
  {"directoryName":"/user/username/projects/reexport/src/pure","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/reexport/src/main:
  {"directoryName":"/user/username/projects/reexport/src/main","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/reexport/out/pure/session.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/session.d.ts]
export interface Session {
    foo: number;
}


//// [/user/username/projects/reexport/out/pure/index.js] file written with same contents
//// [/user/username/projects/reexport/out/pure/index.d.ts] file written with same contents
//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../a/lib/lib.d.ts","../../src/pure/session.ts","../../src/pure/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"5375279855-export interface Session {\n  foo: number;\n  // bar: number;\n}\n","signature":"-1218067212-export interface Session {\n    foo: number;\n}\n"},"-5356193041-export * from \"./session\";\n"],"options":{"composite":true,"outDir":"..","rootDir":"../../src"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,3,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/reexport/out/pure/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/session.ts",
      "../../src/pure/index.ts"
    ],
    "fileNamesList": [
      [
        "../../src/pure/session.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../src/pure/session.ts": {
        "version": "5375279855-export interface Session {\n  foo: number;\n  // bar: number;\n}\n",
        "signature": "-1218067212-export interface Session {\n    foo: number;\n}\n"
      },
      "../../src/pure/index.ts": {
        "version": "-5356193041-export * from \"./session\";\n",
        "signature": "-5356193041-export * from \"./session\";\n"
      }
    },
    "options": {
      "composite": true,
      "outDir": "..",
      "rootDir": "../../src"
    },
    "referencedMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "exportedModulesMap": {
      "../../src/pure/index.ts": [
        "../../src/pure/session.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../a/lib/lib.d.ts",
      "../../src/pure/index.ts",
      "../../src/pure/session.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1023
}

//// [/user/username/projects/reexport/out/main/index.js] file changed its modified time
