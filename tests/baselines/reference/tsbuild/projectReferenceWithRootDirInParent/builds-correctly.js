currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/src/main/a.ts]
import { b } from './b';
const a = b;


//// [/home/src/workspaces/solution/src/main/b.ts]
export const b = 0;


//// [/home/src/workspaces/solution/src/main/tsconfig.json]
{
  "extends": "../../tsconfig.base.json",
  "references": [
    {
      "path": "../other"
    }
  ]
}

//// [/home/src/workspaces/solution/src/other/other.ts]
export const Other = 0;


//// [/home/src/workspaces/solution/src/other/tsconfig.json]
{
  "extends": "../../tsconfig.base.json"
}

//// [/home/src/workspaces/solution/tsconfig.base.json]
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


/home/src/tslibs/TS/Lib/tsc.js --b src/main /home/src/workspaces/solution/src/other
Output::


//// [/home/src/workspaces/solution/dist/other/other.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Other = void 0;
exports.Other = 0;


//// [/home/src/workspaces/solution/dist/other/other.d.ts]
export declare const Other = 0;


//// [/home/src/workspaces/solution/dist/other/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../../src/other/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-4254247902-export const Other = 0;\n","signature":"-10003600206-export declare const Other = 0;\n"}],"root":[2],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipDefaultLibCheck":true},"latestChangedDtsFile":"./other.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/dist/other/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../../src/other/other.ts"
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
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
  "latestChangedDtsFile": "./other.d.ts",
  "version": "FakeTSVersion",
  "size": 871
}

//// [/home/src/workspaces/solution/dist/main/b.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 0;


//// [/home/src/workspaces/solution/dist/main/b.d.ts]
export declare const b = 0;


//// [/home/src/workspaces/solution/dist/main/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var b_1 = require("./b");
var a = b_1.b;


//// [/home/src/workspaces/solution/dist/main/a.d.ts]
export {};


//// [/home/src/workspaces/solution/dist/main/tsconfig.tsbuildinfo]
{"fileNames":["../../../../tslibs/ts/lib/lib.d.ts","../../src/main/b.ts","../../src/main/a.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-13368948254-export const b = 0;\n","signature":"-5842658702-export declare const b = 0;\n"},{"version":"-18592354388-import { b } from './b';\nconst a = b;\n","signature":"-3531856636-export {};\n"}],"root":[2,3],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipDefaultLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./a.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/dist/main/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../tslibs/ts/lib/lib.d.ts",
    "../../src/main/b.ts",
    "../../src/main/a.ts"
  ],
  "fileIdsList": [
    [
      "../../src/main/b.ts"
    ]
  ],
  "fileInfos": {
    "../../../../tslibs/ts/lib/lib.d.ts": {
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
  "latestChangedDtsFile": "./a.d.ts",
  "version": "FakeTSVersion",
  "size": 1029
}


exitCode:: ExitStatus.Success
