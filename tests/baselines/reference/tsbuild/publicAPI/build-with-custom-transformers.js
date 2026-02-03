currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/tsconfig.json]
{
  "references": [
    {
      "path": "./shared/tsconfig.json"
    },
    {
      "path": "./webpack/tsconfig.json"
    }
  ],
  "files": []
}

//// [/home/src/workspaces/solution/shared/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/home/src/workspaces/solution/shared/index.ts]
export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing

//// [/home/src/workspaces/solution/webpack/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "references": [
    {
      "path": "../shared/tsconfig.json"
    }
  ]
}

//// [/home/src/workspaces/solution/webpack/index.ts]
export function f2() { }
export class c2 { }
export enum e2 { }
// leading
export function f22() { } // trailing

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --b
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * shared/tsconfig.json
    * webpack/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'shared/tsconfig.json' is out of date because output file 'shared/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/shared/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'webpack/tsconfig.json' is out of date because output file 'webpack/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/webpack/tsconfig.json'...



//// [/home/src/workspaces/solution/shared/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = exports.c = void 0;
exports.f1 = f1;
exports.f2 = f2;
/*@before/home/src/workspaces/solution/shared/tsconfig.json*/
function f1() { }
//@after/home/src/workspaces/solution/shared/tsconfig.json
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
exports.c = c;
//@after/home/src/workspaces/solution/shared/tsconfig.json
var e;
(function (e) {
})(e || (exports.e = e = {}));
// leading
/*@before/home/src/workspaces/solution/shared/tsconfig.json*/
function f2() { } // trailing


//// [/home/src/workspaces/solution/shared/index.d.ts]
export declare function f1(): void;
export declare class c {
}
export declare enum e {
}
export declare function f2(): void;


//// [/home/src/workspaces/solution/shared/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"8649344783-export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing"],"root":[2],"options":{"composite":true},"emitSignatures":[[2,"-9393727241-export declare function f1(): void;\nexport declare class c {\n}\nexport declare enum e {\n}\nexport declare function f2(): void;\n"]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/shared/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "8649344783-export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing",
      "signature": "8649344783-export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "emitSignatures": [
    [
      "./index.ts",
      "-9393727241-export declare function f1(): void;\nexport declare class c {\n}\nexport declare enum e {\n}\nexport declare function f2(): void;\n"
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 955
}

//// [/home/src/workspaces/solution/webpack/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2 = exports.c2 = void 0;
exports.f2 = f2;
exports.f22 = f22;
/*@before/home/src/workspaces/solution/webpack/tsconfig.json*/
function f2() { }
//@after/home/src/workspaces/solution/webpack/tsconfig.json
var c2 = /** @class */ (function () {
    function c2() {
    }
    return c2;
}());
exports.c2 = c2;
//@after/home/src/workspaces/solution/webpack/tsconfig.json
var e2;
(function (e2) {
})(e2 || (exports.e2 = e2 = {}));
// leading
/*@before/home/src/workspaces/solution/webpack/tsconfig.json*/
function f22() { } // trailing


//// [/home/src/workspaces/solution/webpack/index.d.ts]
export declare function f2(): void;
export declare class c2 {
}
export declare enum e2 {
}
export declare function f22(): void;


//// [/home/src/workspaces/solution/webpack/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"20140662566-export function f2() { }\nexport class c2 { }\nexport enum e2 { }\n// leading\nexport function f22() { } // trailing"],"root":[2],"options":{"composite":true},"emitSignatures":[[2,"-2037002130-export declare function f2(): void;\nexport declare class c2 {\n}\nexport declare enum e2 {\n}\nexport declare function f22(): void;\n"]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/webpack/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "version": "20140662566-export function f2() { }\nexport class c2 { }\nexport enum e2 { }\n// leading\nexport function f22() { } // trailing",
      "signature": "20140662566-export function f2() { }\nexport class c2 { }\nexport enum e2 { }\n// leading\nexport function f22() { } // trailing"
    }
  },
  "root": [
    [
      2,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "emitSignatures": [
    [
      "./index.ts",
      "-2037002130-export declare function f2(): void;\nexport declare class c2 {\n}\nexport declare enum e2 {\n}\nexport declare function f22(): void;\n"
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 962
}


Program root files: [
  "/home/src/workspaces/solution/shared/index.ts"
]
Program options: {
  "composite": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/shared/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/shared/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/shared/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/shared/index.ts (used version)

Program root files: [
  "/home/src/workspaces/solution/webpack/index.ts"
]
Program options: {
  "composite": true,
  "tscBuild": true,
  "configFilePath": "/home/src/workspaces/solution/webpack/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/webpack/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/webpack/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspaces/solution/webpack/index.ts (used version)

exitCode:: ExitStatus.Success
