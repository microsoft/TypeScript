currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/shared/index.ts] *new* 
export const a: Unrestricted = 1;
//// [/home/src/workspaces/solution/shared/tsconfig-base.json] *new* 
{
    "include": ["./typings-base/"],
}
//// [/home/src/workspaces/solution/shared/tsconfig.json] *new* 
{
    "extends": "./tsconfig-base.json",
    "compilerOptions": {
        "composite": true,
        "outDir": "../target-tsc-build/",
        "rootDir": "..",
    },
    "files": ["./index.ts"],
}
//// [/home/src/workspaces/solution/shared/typings-base/globals.d.ts] *new* 
type Unrestricted = any;
//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{
    "references": [
        { "path": "./shared/tsconfig.json" },
        { "path": "./webpack/tsconfig.json" },
    ],
    "files": [],
}
//// [/home/src/workspaces/solution/webpack/index.ts] *new* 
export const b: Unrestricted = 1;
//// [/home/src/workspaces/solution/webpack/tsconfig.json] *new* 
{
    "extends": "../shared/tsconfig-base.json",
    "compilerOptions": {
        "composite": true,
        "outDir": "../target-tsc-build/",
        "rootDir": "..",
    },
    "files": ["./index.ts"],
    "references": [{ "path": "../shared/tsconfig.json" }],
}

tsgo --b --v --listFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * shared/tsconfig.json
    * webpack/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'shared/tsconfig.json' is out of date because output file 'target-tsc-build/shared/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'shared/tsconfig.json'...

/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/shared/index.ts
/home/src/workspaces/solution/shared/typings-base/globals.d.ts
[[90mHH:MM:SS AM[0m] Project 'webpack/tsconfig.json' is out of date because output file 'target-tsc-build/webpack/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'webpack/tsconfig.json'...

/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspaces/solution/webpack/index.ts
/home/src/workspaces/solution/shared/typings-base/globals.d.ts
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
//// [/home/src/workspaces/solution/target-tsc-build/shared/index.d.ts] *new* 
export declare const a: Unrestricted;

//// [/home/src/workspaces/solution/target-tsc-build/shared/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 1;

//// [/home/src/workspaces/solution/target-tsc-build/shared/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","../../shared/index.ts","../../shared/typings-base/globals.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"038419a8862a47ff75929bd3632cfaa0-export const a: Unrestricted = 1;","signature":"3d46c415eae6cd0e760bea3fa85ba3aa-export declare const a: Unrestricted;\n","impliedNodeFormat":1},{"version":"0818246edc003d659f6bac1bc37ad307-type Unrestricted = any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"outDir":"..","rootDir":"../.."},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/solution/target-tsc-build/shared/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../shared/index.ts",
        "../../shared/typings-base/globals.d.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../shared/index.ts",
    "../../shared/typings-base/globals.d.ts"
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
      "fileName": "../../shared/index.ts",
      "version": "038419a8862a47ff75929bd3632cfaa0-export const a: Unrestricted = 1;",
      "signature": "3d46c415eae6cd0e760bea3fa85ba3aa-export declare const a: Unrestricted;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "038419a8862a47ff75929bd3632cfaa0-export const a: Unrestricted = 1;",
        "signature": "3d46c415eae6cd0e760bea3fa85ba3aa-export declare const a: Unrestricted;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../shared/typings-base/globals.d.ts",
      "version": "0818246edc003d659f6bac1bc37ad307-type Unrestricted = any;",
      "signature": "0818246edc003d659f6bac1bc37ad307-type Unrestricted = any;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0818246edc003d659f6bac1bc37ad307-type Unrestricted = any;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../.."
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1325
}
//// [/home/src/workspaces/solution/target-tsc-build/webpack/index.d.ts] *new* 
export declare const b: Unrestricted;

//// [/home/src/workspaces/solution/target-tsc-build/webpack/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 1;

//// [/home/src/workspaces/solution/target-tsc-build/webpack/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","../../webpack/index.ts","../../shared/typings-base/globals.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"55323568c1e8cde378750e233962127b-export const b: Unrestricted = 1;","signature":"ab6809558636ca24521fe1a6d7861d37-export declare const b: Unrestricted;\n","impliedNodeFormat":1},{"version":"0818246edc003d659f6bac1bc37ad307-type Unrestricted = any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"outDir":"..","rootDir":"../.."},"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/solution/target-tsc-build/webpack/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../webpack/index.ts",
        "../../shared/typings-base/globals.d.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../webpack/index.ts",
    "../../shared/typings-base/globals.d.ts"
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
      "fileName": "../../webpack/index.ts",
      "version": "55323568c1e8cde378750e233962127b-export const b: Unrestricted = 1;",
      "signature": "ab6809558636ca24521fe1a6d7861d37-export declare const b: Unrestricted;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "55323568c1e8cde378750e233962127b-export const b: Unrestricted = 1;",
        "signature": "ab6809558636ca24521fe1a6d7861d37-export declare const b: Unrestricted;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../shared/typings-base/globals.d.ts",
      "version": "0818246edc003d659f6bac1bc37ad307-type Unrestricted = any;",
      "signature": "0818246edc003d659f6bac1bc37ad307-type Unrestricted = any;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0818246edc003d659f6bac1bc37ad307-type Unrestricted = any;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "..",
    "rootDir": "../.."
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1326
}

shared/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/shared/index.ts
*refresh*    /home/src/workspaces/solution/shared/typings-base/globals.d.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/shared/index.ts

webpack/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/webpack/index.ts
*refresh*    /home/src/workspaces/solution/shared/typings-base/globals.d.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/webpack/index.ts
