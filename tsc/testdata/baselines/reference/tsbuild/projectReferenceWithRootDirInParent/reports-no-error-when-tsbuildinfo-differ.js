currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/src/main/a.ts] *new* 
import { b } from './b';
const a = b;
//// [/home/src/workspaces/solution/src/main/b.ts] *new* 
export const b = 0;
//// [/home/src/workspaces/solution/src/main/tsconfig.main.json] *new* 
{
    "compilerOptions": { "composite": true, "outDir": "../../dist/" },
    "references": [{ "path": "../other/tsconfig.other.json" }]
}
//// [/home/src/workspaces/solution/src/other/other.ts] *new* 
export const Other = 0;
//// [/home/src/workspaces/solution/src/other/tsconfig.other.json] *new* 
{
    "compilerOptions": { "composite": true, "outDir": "../../dist/" },
}
//// [/home/src/workspaces/solution/tsconfig.base.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "rootDir": "./src/",
        "outDir": "./dist/",
        "skipDefaultLibCheck": true,
    },
    "exclude": [
        "node_modules",
    ],
}

tsgo --b src/main/tsconfig.main.json --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/other/tsconfig.other.json
    * src/main/tsconfig.main.json

[[90mHH:MM:SS AM[0m] Project 'src/other/tsconfig.other.json' is out of date because output file 'dist/tsconfig.other.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'src/other/tsconfig.other.json'...

[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.main.json' is out of date because output file 'dist/tsconfig.main.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'src/main/tsconfig.main.json'...

//// [/home/src/tslibs/TS/Lib/lib.d.ts] *Lib*
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
interface SymbolConstructor {
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/solution/dist/a.d.ts] *new* 
export {};

//// [/home/src/workspaces/solution/dist/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const b_1 = require("./b");
const a = b_1.b;

//// [/home/src/workspaces/solution/dist/b.d.ts] *new* 
export declare const b = 0;

//// [/home/src/workspaces/solution/dist/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 0;

//// [/home/src/workspaces/solution/dist/other.d.ts] *new* 
export declare const Other = 0;

//// [/home/src/workspaces/solution/dist/other.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Other = void 0;
exports.Other = 0;

//// [/home/src/workspaces/solution/dist/tsconfig.main.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","../src/main/b.ts","../src/main/a.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2f7fab911757709567c90bfcebca3267-export const b = 0;","signature":"fbf340689494c12531e629cae5a8c1a2-export declare const b = 0;\n","impliedNodeFormat":1},{"version":"55c21d13f07678cedb8ef3bdf6dd6c91-import { b } from './b';\nconst a = b;","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./a.d.ts"}
//// [/home/src/workspaces/solution/dist/tsconfig.main.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/main/b.ts",
        "../src/main/a.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/main/b.ts",
    "../src/main/a.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/main/b.ts",
      "version": "2f7fab911757709567c90bfcebca3267-export const b = 0;",
      "signature": "fbf340689494c12531e629cae5a8c1a2-export declare const b = 0;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2f7fab911757709567c90bfcebca3267-export const b = 0;",
        "signature": "fbf340689494c12531e629cae5a8c1a2-export declare const b = 0;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/main/a.ts",
      "version": "55c21d13f07678cedb8ef3bdf6dd6c91-import { b } from './b';\nconst a = b;",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "55c21d13f07678cedb8ef3bdf6dd6c91-import { b } from './b';\nconst a = b;",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../src/main/b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../src/main/a.ts": [
      "../src/main/b.ts"
    ]
  },
  "latestChangedDtsFile": "./a.d.ts",
  "size": 1344
}
//// [/home/src/workspaces/solution/dist/tsconfig.other.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","../src/other/other.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d2f577239ee4ce2c34ee068494c1717b-export const Other = 0;","signature":"9820e072d57306b22c4790242196d240-export declare const Other = 0;\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./other.d.ts"}
//// [/home/src/workspaces/solution/dist/tsconfig.other.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/other/other.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/other/other.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/other/other.ts",
      "version": "d2f577239ee4ce2c34ee068494c1717b-export const Other = 0;",
      "signature": "9820e072d57306b22c4790242196d240-export declare const Other = 0;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d2f577239ee4ce2c34ee068494c1717b-export const Other = 0;",
        "signature": "9820e072d57306b22c4790242196d240-export declare const Other = 0;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./other.d.ts",
  "size": 1126
}

src/other/tsconfig.other.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/src/other/other.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/src/other/other.ts

src/main/tsconfig.main.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/src/main/b.ts
*refresh*    /home/src/workspaces/solution/src/main/a.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/src/main/b.ts
(stored at emit) /home/src/workspaces/solution/src/main/a.ts


Edit [0]:: no change

tsgo --b src/main/tsconfig.main.json --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/other/tsconfig.other.json
    * src/main/tsconfig.main.json

[[90mHH:MM:SS AM[0m] Project 'src/other/tsconfig.other.json' is up to date because newest input 'src/other/other.ts' is older than output 'dist/tsconfig.other.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'src/main/tsconfig.main.json' is up to date because newest input 'src/main/b.ts' is older than output 'dist/tsconfig.main.tsbuildinfo'


