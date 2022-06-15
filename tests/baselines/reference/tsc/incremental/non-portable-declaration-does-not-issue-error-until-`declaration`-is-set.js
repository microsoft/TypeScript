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

//// [/src/project/src/index.ts]
import {getA} from "pkg";
export const a = getA();

//// [/src/project/src/node_modules/pkg/index.d.ts]
import {A} from "inner";
export function getA(): A;

//// [/src/project/src/node_modules/pkg/node_modules/inner/index.d.ts]
export interface A {}

//// [/src/project/tsconfig.json]
{}



Output::
/lib/tsc --incremental --p src/project
exitCode:: ExitStatus.Success


//// [/src/project/src/index.js]
"use strict";
exports.__esModule = true;
exports.a = void 0;
var pkg_1 = require("pkg");
exports.a = (0, pkg_1.getA)();


//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/node_modules/pkg/node_modules/inner/index.d.ts","./src/node_modules/pkg/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-1624180079-export interface A {}","-4875229118-import {A} from \"inner\";\nexport function getA(): A;","-13191711444-import {getA} from \"pkg\";\nexport const a = getA();"],"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,4,3,2]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/node_modules/pkg/node_modules/inner/index.d.ts",
      "./src/node_modules/pkg/index.d.ts",
      "./src/index.ts"
    ],
    "fileNamesList": [
      [
        "./src/node_modules/pkg/index.d.ts"
      ],
      [
        "./src/node_modules/pkg/node_modules/inner/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/node_modules/pkg/node_modules/inner/index.d.ts": {
        "version": "-1624180079-export interface A {}",
        "signature": "-1624180079-export interface A {}"
      },
      "./src/node_modules/pkg/index.d.ts": {
        "version": "-4875229118-import {A} from \"inner\";\nexport function getA(): A;",
        "signature": "-4875229118-import {A} from \"inner\";\nexport function getA(): A;"
      },
      "./src/index.ts": {
        "version": "-13191711444-import {getA} from \"pkg\";\nexport const a = getA();",
        "signature": "-13191711444-import {getA} from \"pkg\";\nexport const a = getA();"
      }
    },
    "referencedMap": {
      "./src/index.ts": [
        "./src/node_modules/pkg/index.d.ts"
      ],
      "./src/node_modules/pkg/index.d.ts": [
        "./src/node_modules/pkg/node_modules/inner/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/index.ts": [
        "./src/node_modules/pkg/index.d.ts"
      ],
      "./src/node_modules/pkg/index.d.ts": [
        "./src/node_modules/pkg/node_modules/inner/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/index.ts",
      "./src/node_modules/pkg/index.d.ts",
      "./src/node_modules/pkg/node_modules/inner/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 977
}



Change:: no-change-run
Input::


Output::
/lib/tsc --incremental --p src/project
exitCode:: ExitStatus.Success




Change:: incremental-adds-portability-error-when-declaration-enabled
Input::
//// [/src/project/tsconfig.json]
{"compilerOptions":{"declaration":true}}



Output::
/lib/tsc --incremental --p src/project
[96msrc/project/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2742: [0mThe inferred type of 'a' cannot be named without a reference to 'pkg/node_modules/inner'. This is likely not portable. A type annotation is necessary.

[7m2[0m export const a = getA();
[7m [0m [91m             ~[0m


Found 1 error in src/project/src/index.ts[90m:2[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/project/src/index.js] file written with same contents
//// [/src/project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../lib/lib.d.ts","./src/node_modules/pkg/node_modules/inner/index.d.ts","./src/node_modules/pkg/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},"-1624180079-export interface A {}","-4875229118-import {A} from \"inner\";\nexport function getA(): A;","-13191711444-import {getA} from \"pkg\";\nexport const a = getA();"],"options":{"declaration":true},"fileIdsList":[[3],[2]],"referencedMap":[[4,1],[3,2]],"exportedModulesMap":[[4,1],[3,2]],"semanticDiagnosticsPerFile":[1,4,3,2]},"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../lib/lib.d.ts",
      "./src/node_modules/pkg/node_modules/inner/index.d.ts",
      "./src/node_modules/pkg/index.d.ts",
      "./src/index.ts"
    ],
    "fileNamesList": [
      [
        "./src/node_modules/pkg/index.d.ts"
      ],
      [
        "./src/node_modules/pkg/node_modules/inner/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "./src/node_modules/pkg/node_modules/inner/index.d.ts": {
        "version": "-1624180079-export interface A {}",
        "signature": "-1624180079-export interface A {}"
      },
      "./src/node_modules/pkg/index.d.ts": {
        "version": "-4875229118-import {A} from \"inner\";\nexport function getA(): A;",
        "signature": "-4875229118-import {A} from \"inner\";\nexport function getA(): A;"
      },
      "./src/index.ts": {
        "version": "-13191711444-import {getA} from \"pkg\";\nexport const a = getA();",
        "signature": "-13191711444-import {getA} from \"pkg\";\nexport const a = getA();"
      }
    },
    "options": {
      "declaration": true
    },
    "referencedMap": {
      "./src/index.ts": [
        "./src/node_modules/pkg/index.d.ts"
      ],
      "./src/node_modules/pkg/index.d.ts": [
        "./src/node_modules/pkg/node_modules/inner/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "./src/index.ts": [
        "./src/node_modules/pkg/index.d.ts"
      ],
      "./src/node_modules/pkg/index.d.ts": [
        "./src/node_modules/pkg/node_modules/inner/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../lib/lib.d.ts",
      "./src/index.ts",
      "./src/node_modules/pkg/index.d.ts",
      "./src/node_modules/pkg/node_modules/inner/index.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1008
}

