currentDirectory:: /user/username/projects/transitiveReferences useCaseSensitiveFileNames: false
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

//// [/user/username/projects/transitiveReferences/a.ts]
export class A {}


//// [/user/username/projects/transitiveReferences/b.ts]
import {A} from 'a';
export const b = new A();

//// [/user/username/projects/transitiveReferences/c.ts]
import {b} from './b';
import {X} from "@ref/a";
b;
X;


//// [/user/username/projects/transitiveReferences/refs/a.d.ts]
export class X {}
export class A {}


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
    "moduleResolution": "node"
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



Output::
/a/lib/tsc --b tsconfig.c.json --listFiles
/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/a.ts
[96mb.ts[0m:[93m1[0m:[93m17[0m - [91merror[0m[90m TS2307: [0mCannot find module 'a' or its corresponding type declarations.

[7m1[0m import {A} from 'a';
[7m [0m [91m                ~~~[0m

/a/lib/lib.d.ts
/user/username/projects/transitiveReferences/b.ts

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/user/username/projects/transitiveReferences/a.d.ts]
export declare class A {
}


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

//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./b.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-17186364832-import {A} from 'a';\nexport const b = new A();"],"root":[2],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[2,[{"file":"./b.ts","start":16,"length":3,"messageText":"Cannot find module 'a' or its corresponding type declarations.","category":1,"code":2307}]]],"affectedFilesPendingEmit":[2],"emitSignatures":[2]},"version":"FakeTSVersion"}

//// [/user/username/projects/transitiveReferences/tsconfig.b.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./b.ts"
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
      "./b.ts": {
        "version": "-17186364832-import {A} from 'a';\nexport const b = new A();",
        "signature": "-17186364832-import {A} from 'a';\nexport const b = new A();"
      }
    },
    "root": [
      [
        2,
        "./b.ts"
      ]
    ],
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      [
        "./b.ts",
        [
          {
            "file": "./b.ts",
            "start": 16,
            "length": 3,
            "messageText": "Cannot find module 'a' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ]
    ],
    "affectedFilesPendingEmit": [
      [
        "./b.ts",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "./b.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 965
}

