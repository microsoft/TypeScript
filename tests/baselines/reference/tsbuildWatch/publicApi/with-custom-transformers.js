currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
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

//// [/user/username/projects/myproject/shared/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/user/username/projects/myproject/shared/index.ts]
export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing

//// [/user/username/projects/myproject/webpack/tsconfig.json]
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

//// [/user/username/projects/myproject/webpack/index.ts]
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


/home/src/tslibs/TS/Lib/tsc.js --b --w
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * shared/tsconfig.json
    * webpack/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'shared/tsconfig.json' is out of date because output file 'shared/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/shared/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'webpack/tsconfig.json' is out of date because output file 'webpack/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/webpack/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/shared/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = exports.c = void 0;
exports.f1 = f1;
exports.f2 = f2;
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function f1() { }
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
})(e || (exports.e = e = {}));
// leading
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function f2() { } // trailing


//// [/user/username/projects/myproject/shared/index.d.ts]
export declare function f1(): void;
export declare class c {
}
export declare enum e {
}
export declare function f2(): void;


//// [/user/username/projects/myproject/shared/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"8649344783-export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing"],"root":[2],"options":{"composite":true},"emitSignatures":[[2,"-9393727241-export declare function f1(): void;\nexport declare class c {\n}\nexport declare enum e {\n}\nexport declare function f2(): void;\n"]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/shared/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
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
  "size": 970
}

//// [/user/username/projects/myproject/webpack/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e2 = exports.c2 = void 0;
exports.f2 = f2;
exports.f22 = f22;
/*@before/user/username/projects/myproject/webpack/tsconfig.json*/
function f2() { }
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
})(e2 || (exports.e2 = e2 = {}));
// leading
/*@before/user/username/projects/myproject/webpack/tsconfig.json*/
function f22() { } // trailing


//// [/user/username/projects/myproject/webpack/index.d.ts]
export declare function f2(): void;
export declare class c2 {
}
export declare enum e2 {
}
export declare function f22(): void;


//// [/user/username/projects/myproject/webpack/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"20140662566-export function f2() { }\nexport class c2 { }\nexport enum e2 { }\n// leading\nexport function f22() { } // trailing"],"root":[2],"options":{"composite":true},"emitSignatures":[[2,"-2037002130-export declare function f2(): void;\nexport declare class c2 {\n}\nexport declare enum e2 {\n}\nexport declare function f22(): void;\n"]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/webpack/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
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
  "size": 977
}


FsWatches::
/user/username/projects/myproject/shared/index.ts: *new*
  {}
/user/username/projects/myproject/shared/tsconfig.json: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/webpack/index.ts: *new*
  {}
/user/username/projects/myproject/webpack/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject/shared: *new*
  {}
/user/username/projects/myproject/webpack: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/shared/index.ts"
]
Program options: {
  "composite": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/shared/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/shared/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/shared/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/shared/index.ts (used version)

Program root files: [
  "/user/username/projects/myproject/webpack/index.ts"
]
Program options: {
  "composite": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/webpack/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/webpack/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/webpack/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/webpack/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change to shared

Input::
//// [/user/username/projects/myproject/shared/index.ts]
export function fooBar() {}export function f1() { }
export class c { }
export enum e { }
// leading
export function f2() { } // trailing


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 1
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'shared/tsconfig.json' is out of date because output 'shared/tsconfig.tsbuildinfo' is older than input 'shared/index.ts'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/shared/tsconfig.json'...



//// [/user/username/projects/myproject/shared/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = exports.c = void 0;
exports.fooBar = fooBar;
exports.f1 = f1;
exports.f2 = f2;
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function fooBar() { }
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function f1() { }
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
})(e || (exports.e = e = {}));
// leading
/*@before/user/username/projects/myproject/shared/tsconfig.json*/
function f2() { } // trailing


//// [/user/username/projects/myproject/shared/index.d.ts]
export declare function fooBar(): void;
export declare function f1(): void;
export declare class c {
}
export declare enum e {
}
export declare function f2(): void;


//// [/user/username/projects/myproject/shared/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"14127205977-export function fooBar() {}export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing","signature":"1966424426-export declare function fooBar(): void;\nexport declare function f1(): void;\nexport declare class c {\n}\nexport declare enum e {\n}\nexport declare function f2(): void;\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/shared/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./index.ts"
  ],
  "fileInfos": {
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./index.ts": {
      "original": {
        "version": "14127205977-export function fooBar() {}export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing",
        "signature": "1966424426-export declare function fooBar(): void;\nexport declare function f1(): void;\nexport declare class c {\n}\nexport declare enum e {\n}\nexport declare function f2(): void;\n"
      },
      "version": "14127205977-export function fooBar() {}export function f1() { }\nexport class c { }\nexport enum e { }\n// leading\nexport function f2() { } // trailing",
      "signature": "1966424426-export declare function fooBar(): void;\nexport declare function f1(): void;\nexport declare class c {\n}\nexport declare enum e {\n}\nexport declare function f2(): void;\n"
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
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1039
}


Timeout callback:: count: 1
2: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
2: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] Project 'webpack/tsconfig.json' is out of date because output 'webpack/index.js' is older than input 'shared/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/user/username/projects/myproject/webpack/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/webpack/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/webpack/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/user/username/projects/myproject/shared/index.ts"
]
Program options: {
  "composite": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/shared/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/shared/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/shared/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/shared/index.ts (computed .d.ts)

Program root files: [
  "/user/username/projects/myproject/webpack/index.ts"
]
Program options: {
  "composite": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/webpack/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/webpack/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
