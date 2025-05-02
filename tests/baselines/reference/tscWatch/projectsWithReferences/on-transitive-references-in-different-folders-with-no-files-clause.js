currentDirectory:: /user/username/projects/transitiveReferences useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/transitiveReferences/a/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}

//// [/user/username/projects/transitiveReferences/b/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "../*"
      ]
    }
  },
  "references": [
    {
      "path": "../a"
    }
  ]
}

//// [/user/username/projects/transitiveReferences/c/tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "../refs/*"
      ]
    }
  },
  "references": [
    {
      "path": "../b"
    }
  ]
}

//// [/user/username/projects/transitiveReferences/a/index.ts]
export class A {}

//// [/user/username/projects/transitiveReferences/b/index.ts]
import {A} from '@ref/a';
export const b = new A();

//// [/user/username/projects/transitiveReferences/c/index.ts]
import {b} from '../b';
import {X} from "@ref/a";
b;
X;

//// [/user/username/projects/transitiveReferences/refs/a.d.ts]
export class X {}
export class A {}


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

//// [/user/username/projects/transitiveReferences/a/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;


//// [/user/username/projects/transitiveReferences/a/index.d.ts]
export declare class A {
}


//// [/user/username/projects/transitiveReferences/a/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-7264743946-export class A {}","signature":"-8728835846-export declare class A {\n}\n"}],"root":[2],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/a/tsconfig.tsbuildinfo.readable.baseline.txt]
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
        "version": "-7264743946-export class A {}",
        "signature": "-8728835846-export declare class A {\n}\n"
      },
      "version": "-7264743946-export class A {}",
      "signature": "-8728835846-export declare class A {\n}\n"
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
  "size": 774
}

//// [/user/username/projects/transitiveReferences/b/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
var a_1 = require("@ref/a");
exports.b = new a_1.A();


//// [/user/username/projects/transitiveReferences/b/index.d.ts]
import { A } from '@ref/a';
export declare const b: A;


//// [/user/username/projects/transitiveReferences/b/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","../a/index.d.ts","./index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8728835846-export declare class A {\n}\n",{"version":"-2591036212-import {A} from '@ref/a';\nexport const b = new A();","signature":"-9732944696-import { A } from '@ref/a';\nexport declare const b: A;\n"}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/b/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../a/index.d.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "../a/index.d.ts"
    ]
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
    "../a/index.d.ts": {
      "version": "-8728835846-export declare class A {\n}\n",
      "signature": "-8728835846-export declare class A {\n}\n"
    },
    "./index.ts": {
      "original": {
        "version": "-2591036212-import {A} from '@ref/a';\nexport const b = new A();",
        "signature": "-9732944696-import { A } from '@ref/a';\nexport declare const b: A;\n"
      },
      "version": "-2591036212-import {A} from '@ref/a';\nexport const b = new A();",
      "signature": "-9732944696-import { A } from '@ref/a';\nexport declare const b: A;\n"
    }
  },
  "root": [
    [
      3,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./index.ts": [
      "../a/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 943
}

//// [/user/username/projects/transitiveReferences/c/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("../b");
var a_1 = require("@ref/a");
b_1.b;
a_1.X;


//// [/user/username/projects/transitiveReferences/c/tsconfig.tsbuildinfo]
{"root":["./index.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/c/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 49
}


/home/src/tslibs/TS/Lib/tsc.js -w -p c --traceResolution --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

======== Resolving module '../b' from '/user/username/projects/transitiveReferences/c/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/b', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/b.ts' does not exist.
File '/user/username/projects/transitiveReferences/b.tsx' does not exist.
File '/user/username/projects/transitiveReferences/b.d.ts' does not exist.
File '/user/username/projects/transitiveReferences/b/package.json' does not exist.
File '/user/username/projects/transitiveReferences/b/index.ts' exists - use it as a name resolution result.
======== Module name '../b' was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences/c', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution '../refs/*', candidate module location: '../refs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/refs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/refs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/b/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/a/index.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a/index.d.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
  File is output of project reference source 'a/index.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/transitiveReferences: *new*
  {}
/user/username/projects/transitiveReferences/a/index.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/a/tsconfig.json: *new*
  {}
/user/username/projects/transitiveReferences/b/index.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json: *new*
  {}
/user/username/projects/transitiveReferences/c/index.ts: *new*
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json: *new*
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/a: *new*
  {}
/user/username/projects/transitiveReferences/b: *new*
  {}
/user/username/projects/transitiveReferences/c: *new*
  {}
/user/username/projects/transitiveReferences/refs: *new*
  {}

Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/transitivereferences/a/index.d.ts (used version)
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/refs/a.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

exitCode:: ExitStatus.undefined

Change:: non local edit b ts, and build b

Input::
//// [/user/username/projects/transitiveReferences/b/index.ts]
import {A} from '@ref/a';
export const b = new A();export function gfoo() { }

//// [/user/username/projects/transitiveReferences/b/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.gfoo = gfoo;
var a_1 = require("@ref/a");
exports.b = new a_1.A();
function gfoo() { }


//// [/user/username/projects/transitiveReferences/b/index.d.ts]
import { A } from '@ref/a';
export declare const b: A;
export declare function gfoo(): void;


//// [/user/username/projects/transitiveReferences/b/tsconfig.tsbuildinfo]
{"fileNames":["../../../../../home/src/tslibs/ts/lib/lib.d.ts","../a/index.d.ts","./index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8728835846-export declare class A {\n}\n",{"version":"1841609480-import {A} from '@ref/a';\nexport const b = new A();export function gfoo() { }","signature":"4376023469-import { A } from '@ref/a';\nexport declare const b: A;\nexport declare function gfoo(): void;\n"}],"root":[3],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/b/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "../a/index.d.ts",
    "./index.ts"
  ],
  "fileIdsList": [
    [
      "../a/index.d.ts"
    ]
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
    "../a/index.d.ts": {
      "version": "-8728835846-export declare class A {\n}\n",
      "signature": "-8728835846-export declare class A {\n}\n"
    },
    "./index.ts": {
      "original": {
        "version": "1841609480-import {A} from '@ref/a';\nexport const b = new A();export function gfoo() { }",
        "signature": "4376023469-import { A } from '@ref/a';\nexport declare const b: A;\nexport declare function gfoo(): void;\n"
      },
      "version": "1841609480-import {A} from '@ref/a';\nexport const b = new A();export function gfoo() { }",
      "signature": "4376023469-import { A } from '@ref/a';\nexport declare const b: A;\nexport declare function gfoo(): void;\n"
    }
  },
  "root": [
    [
      3,
      "./index.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./index.ts": [
      "../a/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1006
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/a/index.ts'.
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a/index.d.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
  File is output of project reference source 'a/index.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

exitCode:: ExitStatus.undefined

Change:: edit on config file

Input::
//// [/user/username/projects/transitiveReferences/c/tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "../nrefs/*"
      ]
    }
  },
  "references": [
    {
      "path": "../b"
    }
  ]
}

//// [/user/username/projects/transitiveReferences/nrefs/a.d.ts]
export class X {}
export class A {}



Timeout callback:: count: 2
2: timerToInvalidateFailedLookupResolutions *new*
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 2
2: timerToInvalidateFailedLookupResolutions
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

======== Resolving module '../b' from '/user/username/projects/transitiveReferences/c/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/b', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/b.ts' does not exist.
File '/user/username/projects/transitiveReferences/b.tsx' does not exist.
File '/user/username/projects/transitiveReferences/b.d.ts' does not exist.
File '/user/username/projects/transitiveReferences/b/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/transitiveReferences/b/index.ts' exists - use it as a name resolution result.
======== Module name '../b' was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences/c', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution '../nrefs/*', candidate module location: '../nrefs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/nrefs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/nrefs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/nrefs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/nrefs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/nrefs/a.d.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/b/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/a/index.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a/index.d.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
  File is output of project reference source 'a/index.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
nrefs/a.d.ts
  Imported via "@ref/a" from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences:
  {}
/user/username/projects/transitiveReferences/a/index.d.ts:
  {}
/user/username/projects/transitiveReferences/a/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/b/index.d.ts:
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/c/index.ts:
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/nrefs/a.d.ts: *new*
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/a:
  {}
/user/username/projects/transitiveReferences/b:
  {}
/user/username/projects/transitiveReferences/c:
  {}
/user/username/projects/transitiveReferences/nrefs: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/transitiveReferences/refs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../nrefs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/nrefs/a.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

exitCode:: ExitStatus.undefined

Change:: Revert config file edit

Input::
//// [/user/username/projects/transitiveReferences/c/tsconfig.json]
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "../refs/*"
      ]
    }
  },
  "references": [
    {
      "path": "../b"
    }
  ]
}


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

======== Resolving module '../b' from '/user/username/projects/transitiveReferences/c/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/b', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/b.ts' does not exist.
File '/user/username/projects/transitiveReferences/b.tsx' does not exist.
File '/user/username/projects/transitiveReferences/b.d.ts' does not exist.
File '/user/username/projects/transitiveReferences/b/package.json' does not exist according to earlier cached lookups.
File '/user/username/projects/transitiveReferences/b/index.ts' exists - use it as a name resolution result.
======== Module name '../b' was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences/c', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution '../refs/*', candidate module location: '../refs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/refs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/refs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/b/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/a/index.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a/index.d.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
  File is output of project reference source 'a/index.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences:
  {}
/user/username/projects/transitiveReferences/a/index.d.ts:
  {}
/user/username/projects/transitiveReferences/a/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/b/index.d.ts:
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/c/index.ts:
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts: *new*
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/a:
  {}
/user/username/projects/transitiveReferences/b:
  {}
/user/username/projects/transitiveReferences/c:
  {}
/user/username/projects/transitiveReferences/refs: *new*
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/transitiveReferences/nrefs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/refs/a.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

exitCode:: ExitStatus.undefined

Change:: edit in referenced config file

Input::
//// [/user/username/projects/transitiveReferences/b/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "../nrefs/*"
      ]
    }
  },
  "references": [
    {
      "path": "../a"
    }
  ]
}


Timeout callback:: count: 1
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
5: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '../b' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/b/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/nrefs/a.d.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
nrefs/a.d.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences:
  {}
/user/username/projects/transitiveReferences/a/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/b/index.d.ts:
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/c/index.ts:
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/nrefs/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/a/index.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/a:
  {}
/user/username/projects/transitiveReferences/b:
  {}
/user/username/projects/transitiveReferences/c:
  {}
/user/username/projects/transitiveReferences/nrefs: *new*
  {}
/user/username/projects/transitiveReferences/refs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/nrefs/a.d.ts (used version)
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/nrefs/a.d.ts

exitCode:: ExitStatus.undefined

Change:: Revert referenced config file edit

Input::
//// [/user/username/projects/transitiveReferences/b/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "../refs/*"
      ]
    }
  },
  "references": [
    {
      "path": "../a"
    }
  ]
}


Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '../b' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/b/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
refs/a.d.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
  Imported via "@ref/a" from file 'c/index.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences:
  {}
/user/username/projects/transitiveReferences/a/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/b/index.d.ts:
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/c/index.ts:
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/nrefs/a.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/a:
  {}
/user/username/projects/transitiveReferences/b:
  {}
/user/username/projects/transitiveReferences/c:
  {}
/user/username/projects/transitiveReferences/refs:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/transitiveReferences/nrefs:
  {}


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b/index.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b/index.d.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts

exitCode:: ExitStatus.undefined

Change:: deleting referenced config file

Input::
//// [/user/username/projects/transitiveReferences/b/tsconfig.json] deleted

Timeout callback:: count: 2
7: timerToUpdateProgram *new*
8: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
7: timerToUpdateProgram
8: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '../b' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences/c', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution '../refs/*', candidate module location: '../refs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/refs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/refs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
[96mc/tsconfig.json[0m:[93m11[0m:[93m5[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/transitiveReferences/b' not found.

[7m11[0m     {
[7m  [0m [91m    ~[0m
[7m12[0m       "path": "../b"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~[0m
[7m13[0m     }
[7m  [0m [91m~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
refs/a.d.ts
  Imported via '@ref/a' from file 'b/index.ts'
  Imported via "@ref/a" from file 'c/index.ts'
b/index.ts
  Imported via '../b' from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/transitiveReferences/b/index.js] file written with same contents
//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences:
  {}
/user/username/projects/transitiveReferences/b/index.ts: *new*
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/c/index.ts:
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/a/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/b/index.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/b:
  {}
/user/username/projects/transitiveReferences/c:
  {}
/user/username/projects/transitiveReferences/refs:
  {}

FsWatchesRecursive *deleted*::
/user/username/projects/transitiveReferences/a:
  {}

Timeout callback:: count: 0
8: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b/index.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/b/index.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/b/index.ts (computed .d.ts)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/b/index.ts:
  /user/username/projects/transitiveReferences/b/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.ts

exitCode:: ExitStatus.undefined

Change:: Revert deleting referenced config file

Input::
//// [/user/username/projects/transitiveReferences/b/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "../*"
      ]
    }
  },
  "references": [
    {
      "path": "../a"
    }
  ]
}


Timeout callback:: count: 2
9: timerToUpdateProgram *new*
10: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
9: timerToUpdateProgram
10: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '../b' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/b/tsconfig.json'.
Module resolution kind is not specified, using 'Node10'.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/a/index.ts'. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a/index.d.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
  File is output of project reference source 'a/index.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c/index.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences:
  {}
/user/username/projects/transitiveReferences/a/index.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/a/tsconfig.json: *new*
  {}
/user/username/projects/transitiveReferences/b/index.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/c/index.ts:
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/b/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/a: *new*
  {}
/user/username/projects/transitiveReferences/b:
  {}
/user/username/projects/transitiveReferences/c:
  {}
/user/username/projects/transitiveReferences/refs:
  {}

Timeout callback:: count: 0
10: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a/index.d.ts (used version)
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (computed .d.ts)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

exitCode:: ExitStatus.undefined

Change:: deleting transitively referenced config file

Input::
//// [/user/username/projects/transitiveReferences/a/tsconfig.json] deleted

Timeout callback:: count: 2
11: timerToUpdateProgram *new*
12: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
11: timerToUpdateProgram
12: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '../b' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/a/index.ts'.
[96mb/tsconfig.json[0m:[93m12[0m:[93m5[0m - [91merror[0m[90m TS6053: [0mFile '/user/username/projects/transitiveReferences/a' not found.

[7m12[0m     {
[7m  [0m [91m    ~[0m
[7m13[0m       "path": "../a"
[7m  [0m [91m~~~~~~~~~~~~~~~~~~~~[0m
[7m14[0m     }
[7m  [0m [91m~~~~~[0m

../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a/index.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/transitiveReferences/a/index.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences:
  {}
/user/username/projects/transitiveReferences/a/index.ts: *new*
  {}
/user/username/projects/transitiveReferences/a/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/b/index.d.ts:
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/c/index.ts:
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/a/index.d.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/a:
  {}
/user/username/projects/transitiveReferences/b:
  {}
/user/username/projects/transitiveReferences/c:
  {}
/user/username/projects/transitiveReferences/refs:
  {}

Timeout callback:: count: 0
12: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a/index.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a/index.ts (computed .d.ts)
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.ts:
  /user/username/projects/transitiveReferences/a/index.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.ts

exitCode:: ExitStatus.undefined

Change:: Revert deleting transitively referenced config file

Input::
//// [/user/username/projects/transitiveReferences/a/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  }
}


Timeout callback:: count: 2
13: timerToUpdateProgram *new*
14: timerToInvalidateFailedLookupResolutions *new*

Before running Timeout callback:: count: 2
13: timerToUpdateProgram
14: timerToInvalidateFailedLookupResolutions

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module '../b' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/b/index.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/c/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'.
Reusing resolution of module '@ref/a' from '/user/username/projects/transitiveReferences/b/index.ts' of old program, it was successfully resolved to '/user/username/projects/transitiveReferences/a/index.ts'.
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a/index.d.ts
  Imported via '@ref/a' from file 'b/index.d.ts'
  File is output of project reference source 'a/index.ts'
b/index.d.ts
  Imported via '../b' from file 'c/index.ts'
  File is output of project reference source 'b/index.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c/index.ts'
c/index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.




PolledWatches::
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/c/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/transitiveReferences:
  {}
/user/username/projects/transitiveReferences/a/index.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/a/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/b/index.d.ts:
  {}
/user/username/projects/transitiveReferences/b/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/c/index.ts:
  {}
/user/username/projects/transitiveReferences/c/tsconfig.json:
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/transitiveReferences/a/index.ts:
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/a:
  {}
/user/username/projects/transitiveReferences/b:
  {}
/user/username/projects/transitiveReferences/c:
  {}
/user/username/projects/transitiveReferences/refs:
  {}

Timeout callback:: count: 0
14: timerToInvalidateFailedLookupResolutions *deleted*


Program root files: [
  "/user/username/projects/transitiveReferences/c/index.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences/c",
  "paths": {
    "@ref/*": [
      "../refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences/c",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/c",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/c/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts
/user/username/projects/transitiveReferences/c/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/transitivereferences/a/index.d.ts (used version)
/user/username/projects/transitivereferences/b/index.d.ts (used version)
/user/username/projects/transitivereferences/c/index.ts (used version)

Dependencies for::
/home/src/tslibs/TS/Lib/lib.d.ts:
  /home/src/tslibs/TS/Lib/lib.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c/index.ts
/user/username/projects/transitiveReferences/a/index.d.ts:
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/b/index.d.ts:
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c/index.ts:
  /user/username/projects/transitiveReferences/c/index.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b/index.d.ts
  /user/username/projects/transitiveReferences/a/index.d.ts

exitCode:: ExitStatus.undefined
