currentDirectory:: / useCaseSensitiveFileNames: false
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

//// [/src/packages/pkg1/src/index.ts]
export interface IThing {
  a: string;
}
export interface IThings {
  thing1: IThing;
}

//// [/src/packages/pkg1/tsconfig.json]
{
  "extends": "../../tsconfig",
  "compilerOptions": {
    "outDir": "lib"
  },
  "include": [
    "src"
  ]
}

//// [/src/packages/pkg2/src/index.ts]
import { IThings } from '@fluentui/pkg1';
export function fn4() {
  const a: IThings = { thing1: { a: 'b' } };
  return a.thing1;
}

//// [/src/packages/pkg2/tsconfig.json]
{
  "extends": "../../tsconfig",
  "compilerOptions": {
    "outDir": "lib"
  },
  "include": [
    "src"
  ],
  "references": [
    {
      "path": "../pkg1"
    }
  ]
}

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@fluentui/*": [
        "packages/*/src"
      ]
    }
  }
}



Output::
/lib/tsc --b /src/packages/pkg2/tsconfig.json --verbose
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/packages/pkg1/tsconfig.json
    * src/packages/pkg2/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/packages/pkg1/tsconfig.json' is out of date because output file 'src/packages/pkg1/lib/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/packages/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/packages/pkg2/tsconfig.json' is out of date because output file 'src/packages/pkg2/lib/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/packages/pkg2/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/packages/pkg1/lib/src/index.d.ts]
export interface IThing {
    a: string;
}
export interface IThings {
    thing1: IThing;
}


//// [/src/packages/pkg1/lib/src/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/packages/pkg1/lib/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.d.ts","../src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-2072077482-export interface IThing {\n  a: string;\n}\nexport interface IThings {\n  thing1: IThing;\n}","signature":"-6291959392-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n","impliedFormat":1}],"root":[2],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/index.d.ts"},"version":"FakeTSVersion"}

//// [/src/packages/pkg1/lib/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.d.ts",
      "../src/index.ts"
    ],
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../src/index.ts": {
        "original": {
          "version": "-2072077482-export interface IThing {\n  a: string;\n}\nexport interface IThings {\n  thing1: IThing;\n}",
          "signature": "-6291959392-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
          "impliedFormat": 1
        },
        "version": "-2072077482-export interface IThing {\n  a: string;\n}\nexport interface IThings {\n  thing1: IThing;\n}",
        "signature": "-6291959392-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        2,
        "../src/index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "latestChangedDtsFile": "./src/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 967
}

//// [/src/packages/pkg2/lib/src/index.d.ts]
export declare function fn4(): import("@fluentui/pkg1").IThing;


//// [/src/packages/pkg2/lib/src/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn4 = fn4;
function fn4() {
    var a = { thing1: { a: 'b' } };
    return a.thing1;
}


//// [/src/packages/pkg2/lib/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../lib/lib.d.ts","../../pkg1/lib/src/index.d.ts","../src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedFormat":1},{"version":"-6291959392-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n","impliedFormat":1},{"version":"8515046367-import { IThings } from '@fluentui/pkg1';\nexport function fn4() {\n  const a: IThings = { thing1: { a: 'b' } };\n  return a.thing1;\n}","signature":"-8485768540-export declare function fn4(): import(\"@fluentui/pkg1\").IThing;\n","impliedFormat":1}],"root":[3],"options":{"composite":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/index.d.ts"},"version":"FakeTSVersion"}

//// [/src/packages/pkg2/lib/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../lib/lib.d.ts",
      "../../pkg1/lib/src/index.d.ts",
      "../src/index.ts"
    ],
    "fileNamesList": [
      [
        "../../pkg1/lib/src/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true,
          "impliedFormat": 1
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedFormat": "commonjs"
      },
      "../../pkg1/lib/src/index.d.ts": {
        "original": {
          "version": "-6291959392-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
          "impliedFormat": 1
        },
        "version": "-6291959392-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
        "signature": "-6291959392-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
        "impliedFormat": "commonjs"
      },
      "../src/index.ts": {
        "original": {
          "version": "8515046367-import { IThings } from '@fluentui/pkg1';\nexport function fn4() {\n  const a: IThings = { thing1: { a: 'b' } };\n  return a.thing1;\n}",
          "signature": "-8485768540-export declare function fn4(): import(\"@fluentui/pkg1\").IThing;\n",
          "impliedFormat": 1
        },
        "version": "8515046367-import { IThings } from '@fluentui/pkg1';\nexport function fn4() {\n  const a: IThings = { thing1: { a: 'b' } };\n  return a.thing1;\n}",
        "signature": "-8485768540-export declare function fn4(): import(\"@fluentui/pkg1\").IThing;\n",
        "impliedFormat": "commonjs"
      }
    },
    "root": [
      [
        3,
        "../src/index.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/index.ts": [
        "../../pkg1/lib/src/index.d.ts"
      ]
    },
    "latestChangedDtsFile": "./src/index.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1197
}

