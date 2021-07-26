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

//// [/src/shared/index.ts]
export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing

//// [/src/shared/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/src/tsconfig.json]
{"references":[{"path":"./shared/tsconfig.json"},{"path":"./webpack/tsconfig.json"}],"files":[]}

//// [/src/webpack/index.ts]
export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing

//// [/src/webpack/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../shared/tsconfig.json"}]}



Output::
/lib/tsc --b /src/tsconfig.json
[[90m12:00:00 AM[0m] Projects in this build: 
    * src/shared/tsconfig.json
    * src/webpack/tsconfig.json
    * src/tsconfig.json

[[90m12:00:00 AM[0m] Project 'src/shared/tsconfig.json' is out of date because output file 'src/shared/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/shared/tsconfig.json'...

[[90m12:00:00 AM[0m] Project 'src/webpack/tsconfig.json' is out of date because output file 'src/webpack/index.js' does not exist

[[90m12:00:00 AM[0m] Building project '/src/webpack/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: ["/src/shared/index.ts"]
Program options: {"composite":true,"configFilePath":"/src/shared/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/shared/index.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/shared/index.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/shared/index.ts (used version)

Program root files: ["/src/webpack/index.ts"]
Program options: {"composite":true,"configFilePath":"/src/webpack/tsconfig.json"}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/webpack/index.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/webpack/index.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/webpack/index.ts (used version)


//// [/src/shared/index.d.ts]
export declare function f1(): void;
export declare class c {
}
export declare enum e {
}
export declare function f2(): void;


//// [/src/shared/index.js]
"use strict";
exports.__esModule = true;
exports.f2 = exports.e = exports.c = exports.f1 = void 0;
/*@before/src/shared/tsconfig.json*/
function f1() { }
exports.f1 = f1;
//@after/src/shared/tsconfig.json
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
exports.c = c;
//@after/src/shared/tsconfig.json
var e;
(function (e) {
})(e = exports.e || (exports.e = {}));
// leading
/*@before/src/shared/tsconfig.json*/
function f2() { } // trailing
exports.f2 = f2;


//// [/src/shared/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"8649344783-export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing"],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/src/shared/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
      "../../lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 814
}

//// [/src/webpack/index.d.ts]
export declare function f2(): void;
export declare class c2 {
}
export declare enum e2 {
}
export declare function f22(): void;


//// [/src/webpack/index.js]
"use strict";
exports.__esModule = true;
exports.f22 = exports.e2 = exports.c2 = exports.f2 = void 0;
/*@before/src/webpack/tsconfig.json*/
function f2() { }
exports.f2 = f2;
//@after/src/webpack/tsconfig.json
var c2 = /** @class */ (function () {
    function c2() {
    }
    return c2;
}());
exports.c2 = c2;
//@after/src/webpack/tsconfig.json
var e2;
(function (e2) {
})(e2 = exports.e2 || (exports.e2 = {}));
// leading
/*@before/src/webpack/tsconfig.json*/
function f22() { } // trailing
exports.f22 = f22;


//// [/src/webpack/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"20140662566-export function f2() { }\nexport class c2 { }\nexport enum e2 { }\n// leading\nexport function f22() { } // trailing"],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/src/webpack/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
      "../../lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 818
}

