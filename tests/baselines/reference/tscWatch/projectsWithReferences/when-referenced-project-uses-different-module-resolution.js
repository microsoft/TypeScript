currentDirectory:: /user/username/projects/transitiveReferences useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/transitiveReferences/refs/a.d.ts]
export class X {}
export class A {}


//// [/user/username/projects/transitiveReferences/a.ts]
export class A {}


//// [/user/username/projects/transitiveReferences/b.ts]
import {A} from "a";export const b = new A();

//// [/user/username/projects/transitiveReferences/c.ts]
import {b} from './b';
import {X} from "@ref/a";
b;
X;


//// [/user/username/projects/transitiveReferences/tsconfig.a.json]
{
  "compilerOptions": {
    "composite": true
  },
  "files": [
    "a.ts"
  ]
}

//// [/user/username/projects/transitiveReferences/tsconfig.b.json]
{
  "compilerOptions": {
    "composite": true,
    "moduleResolution": "classic"
  },
  "files": [
    "b.ts"
  ],
  "references": [
    {
      "path": "tsconfig.a.json"
    }
  ]
}

//// [/user/username/projects/transitiveReferences/tsconfig.c.json]
{
  "files": [
    "c.ts"
  ],
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@ref/*": [
        "./refs/*"
      ]
    }
  },
  "references": [
    {
      "path": "tsconfig.b.json"
    }
  ]
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

//// [/user/username/projects/transitiveReferences/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A = void 0;
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
exports.A = A;


//// [/user/username/projects/transitiveReferences/a.d.ts]
export declare class A {
}


//// [/user/username/projects/transitiveReferences/tsconfig.a.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-7808316224-export class A {}\n","signature":"-8728835846-export declare class A {\n}\n"}],"root":[2],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./a.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/tsconfig.a.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.ts": {
        "original": {
          "version": "-7808316224-export class A {}\n",
          "signature": "-8728835846-export declare class A {\n}\n"
        },
        "version": "-7808316224-export class A {}\n",
        "signature": "-8728835846-export declare class A {\n}\n"
      }
    },
    "root": [
      [
        2,
        "./a.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.ts"
    ],
    "latestChangedDtsFile": "./a.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 838
}

//// [/user/username/projects/transitiveReferences/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
var a_1 = require("a");
exports.b = new a_1.A();


//// [/user/username/projects/transitiveReferences/b.d.ts]
import { A } from "a";
export declare const b: A;


//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./a.d.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-8728835846-export declare class A {\n}\n",{"version":"-19869990292-import {A} from \"a\";export const b = new A();","signature":"1870369234-import { A } from \"a\";\nexport declare const b: A;\n"}],"root":[3],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./b.d.ts"},"version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./a.d.ts",
      "./b.ts"
    ],
    "fileNamesList": [
      [
        "./a.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./a.d.ts": {
        "version": "-8728835846-export declare class A {\n}\n",
        "signature": "-8728835846-export declare class A {\n}\n"
      },
      "./b.ts": {
        "original": {
          "version": "-19869990292-import {A} from \"a\";export const b = new A();",
          "signature": "1870369234-import { A } from \"a\";\nexport declare const b: A;\n"
        },
        "version": "-19869990292-import {A} from \"a\";export const b = new A();",
        "signature": "1870369234-import { A } from \"a\";\nexport declare const b: A;\n"
      }
    },
    "root": [
      [
        3,
        "./b.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./b.ts": [
        "./a.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./b.ts": [
        "./a.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./a.d.ts",
      "./b.ts"
    ],
    "latestChangedDtsFile": "./b.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 978
}

//// [/user/username/projects/transitiveReferences/c.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var a_1 = require("@ref/a");
b_1.b;
a_1.X;



/a/lib/tsc.js -w -p tsconfig.c.json --traceResolution --explainFiles
Output::
>> Screen clear
[[90m12:00:53 AM[0m] Starting compilation in watch mode...

======== Resolving module './b' from '/user/username/projects/transitiveReferences/c.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/b', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/b.ts' exists - use it as a name resolution result.
======== Module name './b' was successfully resolved to '/user/username/projects/transitiveReferences/b.ts'. ========
======== Resolving module '@ref/a' from '/user/username/projects/transitiveReferences/c.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/user/username/projects/transitiveReferences', using this value to resolve non-relative module name '@ref/a'.
'paths' option is specified, looking for a pattern to match module name '@ref/a'.
Module name '@ref/a', matched pattern '@ref/*'.
Trying substitution './refs/*', candidate module location: './refs/a'.
Loading module as file / folder, candidate module location '/user/username/projects/transitiveReferences/refs/a', target file types: TypeScript, Declaration.
File '/user/username/projects/transitiveReferences/refs/a.ts' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.tsx' does not exist.
File '/user/username/projects/transitiveReferences/refs/a.d.ts' exists - use it as a name resolution result.
======== Module name '@ref/a' was successfully resolved to '/user/username/projects/transitiveReferences/refs/a.d.ts'. ========
======== Resolving module 'a' from '/user/username/projects/transitiveReferences/b.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/transitiveReferences/tsconfig.b.json'.
Explicitly specified module resolution kind: 'Classic'.
======== Module name 'a' was successfully resolved to '/user/username/projects/transitiveReferences/a.ts'. ========
../../../../a/lib/lib.d.ts
  Default library for target 'es5'
a.d.ts
  Imported via "a" from file 'b.d.ts'
  File is output of project reference source 'a.ts'
b.d.ts
  Imported via './b' from file 'c.ts'
  File is output of project reference source 'b.ts'
refs/a.d.ts
  Imported via "@ref/a" from file 'c.ts'
c.ts
  Part of 'files' list in tsconfig.json
[[90m12:00:57 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/transitiveReferences/c.js] file written with same contents

PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/transitiveReferences/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/b.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/c.ts: *new*
  {}
/user/username/projects/transitiveReferences/refs/a.d.ts: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.a.json: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.b.json: *new*
  {}
/user/username/projects/transitiveReferences/tsconfig.c.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/transitiveReferences/refs: *new*
  {}

Program root files: [
  "/user/username/projects/transitiveReferences/c.ts"
]
Program options: {
  "baseUrl": "/user/username/projects/transitiveReferences",
  "paths": {
    "@ref/*": [
      "./refs/*"
    ]
  },
  "pathsBasePath": "/user/username/projects/transitiveReferences",
  "watch": true,
  "project": "/user/username/projects/transitiveReferences/tsconfig.c.json",
  "traceResolution": true,
  "explainFiles": true,
  "configFilePath": "/user/username/projects/transitiveReferences/tsconfig.c.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/transitivereferences/a.d.ts (used version)
/user/username/projects/transitivereferences/b.d.ts (used version)
/user/username/projects/transitivereferences/refs/a.d.ts (used version)
/user/username/projects/transitivereferences/c.ts (used version)

Dependencies for::
/a/lib/lib.d.ts:
  /a/lib/lib.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/c.ts
/user/username/projects/transitiveReferences/a.d.ts:
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/b.d.ts:
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts
/user/username/projects/transitiveReferences/refs/a.d.ts:
  /user/username/projects/transitiveReferences/refs/a.d.ts
/user/username/projects/transitiveReferences/c.ts:
  /user/username/projects/transitiveReferences/c.ts
  /user/username/projects/transitiveReferences/refs/a.d.ts
  /user/username/projects/transitiveReferences/b.d.ts
  /user/username/projects/transitiveReferences/a.d.ts

exitCode:: ExitStatus.undefined
