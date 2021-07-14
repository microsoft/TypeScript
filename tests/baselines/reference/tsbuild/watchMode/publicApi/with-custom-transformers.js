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

//// [/user/username/projects/myproject/tsconfig.json]
{"references":[{"path":"./shared/tsconfig.json"},{"path":"./webpack/tsconfig.json"}],"files":[]}

//// [/user/username/projects/myproject/shared/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/user/username/projects/myproject/shared/index.ts]
export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing

//// [/user/username/projects/myproject/webpack/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../shared/tsconfig.json"}]}

//// [/user/username/projects/myproject/webpack/index.ts]
export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing


/a/lib/tsc.js --b --w
Output::
[[90m12:00:31 AM[0m] Projects in this build: 
    * shared/tsconfig.json
    * webpack/tsconfig.json
    * tsconfig.json

[[90m12:00:32 AM[0m] Project 'shared/tsconfig.json' is out of date because output file 'shared/index.js' does not exist

[[90m12:00:33 AM[0m] Building project '/user/username/projects/myproject/shared/tsconfig.json'...

[[90m12:00:42 AM[0m] Project 'webpack/tsconfig.json' is out of date because output file 'webpack/index.js' does not exist

[[90m12:00:43 AM[0m] Building project '/user/username/projects/myproject/webpack/tsconfig.json'...

[[90m12:00:52 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/shared/index.ts"]
Program options: {"composite":true,"configFilePath":"/user/username/projects/myproject/shared/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/shared/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/shared/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/shared/index.ts (used version)

Program root files: ["/user/username/projects/myproject/webpack/index.ts"]
Program options: {"composite":true,"configFilePath":"/user/username/projects/myproject/webpack/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/webpack/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/webpack/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/webpack/index.ts (used version)

WatchedFiles::
/user/username/projects/myproject/shared/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/shared/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/shared/index.ts:
  {"fileName":"/user/username/projects/myproject/shared/index.ts","pollingInterval":250}
/user/username/projects/myproject/webpack/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/webpack/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/webpack/index.ts:
  {"fileName":"/user/username/projects/myproject/webpack/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/shared:
  {"directoryName":"/user/username/projects/myproject/shared","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/webpack:
  {"directoryName":"/user/username/projects/myproject/webpack","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/shared/index.js]
"use strict";
exports.__esModule = true;
exports.f2 = exports.e = exports.c = exports.f1 = void 0;
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function f1() { }
exports.f1 = f1;
//@after/user/username/projects/myproject/shared/tsconfig.json
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
exports.c = c;
//@after/user/username/projects/myproject/shared/tsconfig.json
var e;
(function (e) {
})(e = exports.e || (exports.e = {}));
// leading
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function f2() { } // trailing
exports.f2 = f2;


//// [/user/username/projects/myproject/shared/index.d.ts]
export declare function f1(): void;
export declare class c {
}
export declare enum e {
}
export declare function f2(): void;


//// [/user/username/projects/myproject/shared/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"8649344783-export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing"],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/shared/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "8649344783-export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing",
        "signature": "8649344783-export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 745
}

//// [/user/username/projects/myproject/webpack/index.js]
"use strict";
exports.__esModule = true;
exports.f22 = exports.e2 = exports.c2 = exports.f2 = void 0;
/*@before/user/username/projects/myproject/webpack/tsconfig.json*/
function f2() { }
exports.f2 = f2;
//@after/user/username/projects/myproject/webpack/tsconfig.json
var c2 = /** @class */ (function () {
    function c2() {
    }
    return c2;
}());
exports.c2 = c2;
//@after/user/username/projects/myproject/webpack/tsconfig.json
var e2;
(function (e2) {
})(e2 = exports.e2 || (exports.e2 = {}));
// leading
/*@before/user/username/projects/myproject/webpack/tsconfig.json*/
function f22() { } // trailing
exports.f22 = f22;


//// [/user/username/projects/myproject/webpack/index.d.ts]
export declare function f2(): void;
export declare class c2 {
}
export declare enum e2 {
}
export declare function f22(): void;


//// [/user/username/projects/myproject/webpack/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"20140662566-export function f2() { }\nexport class c2 { }\nexport enum e2 { }\n// leading\nexport function f22() { } // trailing"],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/webpack/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "20140662566-export function f2() { }\nexport class c2 { }\nexport enum e2 { }\n// leading\nexport function f22() { } // trailing",
        "signature": "20140662566-export function f2() { }\nexport class c2 { }\nexport enum e2 { }\n// leading\nexport function f22() { } // trailing"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 749
}


Change:: change to shared

Input::
//// [/user/username/projects/myproject/shared/index.ts]
export function fooBar() {}export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing


Output::
>> Screen clear
[[90m12:00:55 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:56 AM[0m] Project 'shared/tsconfig.json' is out of date because oldest output 'shared/index.js' is older than newest input 'shared/index.ts'

[[90m12:00:57 AM[0m] Building project '/user/username/projects/myproject/shared/tsconfig.json'...

[[90m12:01:10 AM[0m] Project 'webpack/tsconfig.json' is out of date because oldest output 'webpack/index.js' is older than newest input 'shared/tsconfig.json'

[[90m12:01:11 AM[0m] Building project '/user/username/projects/myproject/webpack/tsconfig.json'...

[[90m12:01:13 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/webpack/tsconfig.json'...

[[90m12:01:14 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/shared/index.ts"]
Program options: {"composite":true,"configFilePath":"/user/username/projects/myproject/shared/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/shared/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/shared/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/shared/index.ts (computed .d.ts)

Program root files: ["/user/username/projects/myproject/webpack/index.ts"]
Program options: {"composite":true,"configFilePath":"/user/username/projects/myproject/webpack/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/webpack/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/shared/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/shared/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/shared/index.ts:
  {"fileName":"/user/username/projects/myproject/shared/index.ts","pollingInterval":250}
/user/username/projects/myproject/webpack/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/webpack/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/webpack/index.ts:
  {"fileName":"/user/username/projects/myproject/webpack/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/shared:
  {"directoryName":"/user/username/projects/myproject/shared","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/webpack:
  {"directoryName":"/user/username/projects/myproject/webpack","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/shared/index.js]
"use strict";
exports.__esModule = true;
exports.f2 = exports.e = exports.c = exports.f1 = exports.fooBar = void 0;
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function fooBar() { }
exports.fooBar = fooBar;
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function f1() { }
exports.f1 = f1;
//@after/user/username/projects/myproject/shared/tsconfig.json
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
exports.c = c;
//@after/user/username/projects/myproject/shared/tsconfig.json
var e;
(function (e) {
})(e = exports.e || (exports.e = {}));
// leading
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function f2() { } // trailing
exports.f2 = f2;


//// [/user/username/projects/myproject/shared/index.d.ts]
export declare function fooBar(): void;
export declare function f1(): void;
export declare class c {
}
export declare enum e {
}
export declare function f2(): void;


//// [/user/username/projects/myproject/shared/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"14127205977-export function fooBar() {}export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing","signature":"1966424426-export declare function fooBar(): void;\nexport declare function f1(): void;\nexport declare class c {\n}\nexport declare enum e {\n}\nexport declare function f2(): void;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/shared/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "14127205977-export function fooBar() {}export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing",
        "signature": "1966424426-export declare function fooBar(): void;\nexport declare function f1(): void;\nexport declare class c {\n}\nexport declare enum e {\n}\nexport declare function f2(): void;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 983
}

//// [/user/username/projects/myproject/webpack/index.js] file changed its modified time
//// [/user/username/projects/myproject/webpack/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/webpack/tsconfig.tsbuildinfo] file changed its modified time
