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

//// [/src/src/main/a.ts]
import { b } from './b';
const a = b;


//// [/src/src/main/b.ts]
export const b = 0;


//// [/src/src/main/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "references": [
    {
      "path": "../other"
    }
  ]
}

//// [/src/src/other/other.ts]
export const Other = 0;


//// [/src/src/other/tsconfig.json]
{
  "extends": "../../tsconfig.base.json"
}

//// [/src/tsconfig.base.json]
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "rootDir": "./src/",
    "outDir": "./dist/",
    "skipDefaultLibCheck": true
  },
  "exclude": [
    "node_modules"
  ]
}



Output::
/lib/tsc --b /src/src/main /src/src/other
exitCode:: ExitStatus.Success


//// [/src/dist/main/a.d.ts]
export {};


//// [/src/dist/main/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var a = b_1.b;


//// [/src/dist/main/b.d.ts]
export declare const b = 0;


//// [/src/dist/main/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 0;


//// [/src/dist/main/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../../src/main/b.ts","../../src/main/a.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13368948254-export const b = 0;\n","signature":"-5842658702-export declare const b = 0;\n"},{"version":"-18592354388-import { b } from './b';\nconst a = b;\n","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipDefaultLibCheck":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,2],"latestChangedDtsFile":"./a.d.ts"},"version":"FakeTSVersion"}

//// [/src/dist/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../../src/main/b.ts",
      "../../src/main/a.ts"
    ],
    "fileNamesList": [
      [
        "../../src/main/b.ts"
      ]
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../src/main/b.ts": {
        "original": {
          "version": "-13368948254-export const b = 0;\n",
          "signature": "-5842658702-export declare const b = 0;\n"
        },
        "version": "-13368948254-export const b = 0;\n",
        "signature": "-5842658702-export declare const b = 0;\n"
      },
      "../../src/main/a.ts": {
        "original": {
          "version": "-18592354388-import { b } from './b';\nconst a = b;\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-18592354388-import { b } from './b';\nconst a = b;\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        2,
        "../../src/main/b.ts"
      ],
      [
        3,
        "../../src/main/a.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outDir": "..",
      "rootDir": "../../src",
      "skipDefaultLibCheck": true
    },
    "referencedMap": {
      "../../src/main/a.ts": [
        "../../src/main/b.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../src/main/a.ts",
      "../../src/main/b.ts"
    ],
    "latestChangedDtsFile": "./a.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1089
}

//// [/src/dist/other/other.d.ts]
export declare const Other = 0;


//// [/src/dist/other/other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Other = void 0;
exports.Other = 0;


//// [/src/dist/other/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../lib/lib.d.ts","../../src/other/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-4254247902-export const Other = 0;\n","signature":"-10003600206-export declare const Other = 0;\n"}],"root":[2],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipDefaultLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./other.d.ts"},"version":"FakeTSVersion"}

//// [/src/dist/other/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../lib/lib.d.ts",
      "../../src/other/other.ts"
    ],
    "fileInfos": {
      "../../../lib/lib.d.ts": {
        "original": {
          "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
          "affectsGlobalScope": true
        },
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../../src/other/other.ts": {
        "original": {
          "version": "-4254247902-export const Other = 0;\n",
          "signature": "-10003600206-export declare const Other = 0;\n"
        },
        "version": "-4254247902-export const Other = 0;\n",
        "signature": "-10003600206-export declare const Other = 0;\n"
      }
    },
    "root": [
      [
        2,
        "../../src/other/other.ts"
      ]
    ],
    "options": {
      "composite": true,
      "declaration": true,
      "outDir": "..",
      "rootDir": "../../src",
      "skipDefaultLibCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../lib/lib.d.ts",
      "../../src/other/other.ts"
    ],
    "latestChangedDtsFile": "./other.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 948
}

