currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/include/include.ts] *new* 
export const include = 1;
//// [/home/src/workspaces/solution/include/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true, "declaration": true },
}
//// [/home/src/workspaces/solution/src/main.ts] *new* 
/// <reference path="../include/include.ts" preserve="true" />
export const main = 23;
//// [/home/src/workspaces/solution/src/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true, "declaration": true },
    "references": [{ "path": "../include" }],
}

tsgo --b src --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * include/tsconfig.json
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'include/tsconfig.json' is out of date because output file 'include/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'include/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'src/tsconfig.json'...

//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
//// [/home/src/workspaces/solution/include/include.d.ts] *new* 
export declare const include = 1;

//// [/home/src/workspaces/solution/include/include.js] *new* 
export const include = 1;

//// [/home/src/workspaces/solution/include/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2025.full.d.ts","./include.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"67fdcc4760be899102ce56504bd98850-export const include = 1;","signature":"2a0dff0e1bbd6db3f4d58fc79a892ff5-export declare const include = 1;\n","impliedNodeFormat":1}],"options":{"composite":true,"declaration":true},"latestChangedDtsFile":"./include.d.ts"}
//// [/home/src/workspaces/solution/include/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./include.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./include.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "./include.ts",
      "version": "67fdcc4760be899102ce56504bd98850-export const include = 1;",
      "signature": "2a0dff0e1bbd6db3f4d58fc79a892ff5-export declare const include = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "67fdcc4760be899102ce56504bd98850-export const include = 1;",
        "signature": "2a0dff0e1bbd6db3f4d58fc79a892ff5-export declare const include = 1;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "declaration": true
  },
  "latestChangedDtsFile": "./include.d.ts",
  "size": 1140
}
//// [/home/src/workspaces/solution/src/main.d.ts] *new* 
/// <reference path="../include/include.d.ts" preserve="true" />
export declare const main = 23;

//// [/home/src/workspaces/solution/src/main.js] *new* 
/// <reference path="../include/include.ts" preserve="true" />
export const main = 23;

//// [/home/src/workspaces/solution/src/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2025.full.d.ts","../include/include.d.ts","./main.ts","../include/include.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"2a0dff0e1bbd6db3f4d58fc79a892ff5-export declare const include = 1;\n",{"version":"7aa654f7776b0488d5e129f89e8878fa-/// <reference path=\"../include/include.ts\" preserve=\"true\" />\nexport const main = 23;","signature":"c0efabe26d066f427c370b23e0a62be4-/// <reference path=\"../include/include.d.ts\" preserve=\"true\" />\nexport declare const main = 23;\n","impliedNodeFormat":1}],"fileIdsList":[[4]],"options":{"composite":true,"declaration":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./main.d.ts"}
//// [/home/src/workspaces/solution/src/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./main.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../include/include.d.ts",
    "./main.ts",
    "../include/include.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "../include/include.d.ts",
      "version": "2a0dff0e1bbd6db3f4d58fc79a892ff5-export declare const include = 1;\n",
      "signature": "2a0dff0e1bbd6db3f4d58fc79a892ff5-export declare const include = 1;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./main.ts",
      "version": "7aa654f7776b0488d5e129f89e8878fa-/// <reference path=\"../include/include.ts\" preserve=\"true\" />\nexport const main = 23;",
      "signature": "c0efabe26d066f427c370b23e0a62be4-/// <reference path=\"../include/include.d.ts\" preserve=\"true\" />\nexport declare const main = 23;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7aa654f7776b0488d5e129f89e8878fa-/// <reference path=\"../include/include.ts\" preserve=\"true\" />\nexport const main = 23;",
        "signature": "c0efabe26d066f427c370b23e0a62be4-/// <reference path=\"../include/include.d.ts\" preserve=\"true\" />\nexport declare const main = 23;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../include/include.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true
  },
  "referencedMap": {
    "./main.ts": [
      "../include/include.ts"
    ]
  },
  "latestChangedDtsFile": "./main.d.ts",
  "size": 1433
}

include/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/solution/include/include.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/include/include.ts

src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/solution/include/include.d.ts
*refresh*    /home/src/workspaces/solution/src/main.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/src/main.ts
