currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/packages/pkg1/src/index.ts] *new* 
export interface IThing {
    a: string;
}
export interface IThings {
    thing1: IThing;
}
//// [/home/src/workspaces/project/packages/pkg1/tsconfig.json] *new* 
{
    "extends": "../../tsconfig",
    "compilerOptions": { "outDir": "lib" },
    "include": ["src"],
}
//// [/home/src/workspaces/project/packages/pkg2/src/index.ts] *new* 
import { IThings } from '@fluentui/pkg1';
export function fn4() {
    const a: IThings = { thing1: { a: 'b' } };
    return a.thing1;
}
//// [/home/src/workspaces/project/packages/pkg2/tsconfig.json] *new* 
{
    "extends": "../../tsconfig",
    "compilerOptions": { "outDir": "lib" },
    "include": ["src"],
    "references": [{ "path": "../pkg1" }],
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "paths": { "@fluentui/*": ["./packages/*/src"] },
    },
}

tsgo --b packages/pkg2/tsconfig.json --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * packages/pkg1/tsconfig.json
    * packages/pkg2/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/lib/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/lib/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'packages/pkg2/tsconfig.json'...

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
//// [/home/src/workspaces/project/packages/pkg1/lib/src/index.d.ts] *new* 
export interface IThing {
    a: string;
}
export interface IThings {
    thing1: IThing;
}

//// [/home/src/workspaces/project/packages/pkg1/lib/src/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/project/packages/pkg1/lib/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"f611077efa7cfdd7e90bebd6aef8d21e-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}","signature":"a9c3ba42ffd025bdbe473878c71e06db-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/index.d.ts"}
//// [/home/src/workspaces/project/packages/pkg1/lib/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/index.ts"
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
      "fileName": "../src/index.ts",
      "version": "f611077efa7cfdd7e90bebd6aef8d21e-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}",
      "signature": "a9c3ba42ffd025bdbe473878c71e06db-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f611077efa7cfdd7e90bebd6aef8d21e-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}",
        "signature": "a9c3ba42ffd025bdbe473878c71e06db-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1262
}
//// [/home/src/workspaces/project/packages/pkg2/lib/src/index.d.ts] *new* 
export declare function fn4(): import("@fluentui/pkg1/lib").IThing;

//// [/home/src/workspaces/project/packages/pkg2/lib/src/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fn4 = fn4;
function fn4() {
    const a = { thing1: { a: 'b' } };
    return a.thing1;
}

//// [/home/src/workspaces/project/packages/pkg2/lib/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","../../pkg1/lib/src/index.d.ts","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"a9c3ba42ffd025bdbe473878c71e06db-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",{"version":"4d4febb98ed4514d6d06322111030719-import { IThings } from '@fluentui/pkg1';\nexport function fn4() {\n    const a: IThings = { thing1: { a: 'b' } };\n    return a.thing1;\n}","signature":"f536bf864c731ec3cb58961dede15c18-export declare function fn4(): import(\"@fluentui/pkg1/lib\").IThing;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/index.d.ts"}
//// [/home/src/workspaces/project/packages/pkg2/lib/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../pkg1/lib/src/index.d.ts",
    "../src/index.ts"
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
      "fileName": "../../pkg1/lib/src/index.d.ts",
      "version": "a9c3ba42ffd025bdbe473878c71e06db-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
      "signature": "a9c3ba42ffd025bdbe473878c71e06db-export interface IThing {\n    a: string;\n}\nexport interface IThings {\n    thing1: IThing;\n}\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/index.ts",
      "version": "4d4febb98ed4514d6d06322111030719-import { IThings } from '@fluentui/pkg1';\nexport function fn4() {\n    const a: IThings = { thing1: { a: 'b' } };\n    return a.thing1;\n}",
      "signature": "f536bf864c731ec3cb58961dede15c18-export declare function fn4(): import(\"@fluentui/pkg1/lib\").IThing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4d4febb98ed4514d6d06322111030719-import { IThings } from '@fluentui/pkg1';\nexport function fn4() {\n    const a: IThings = { thing1: { a: 'b' } };\n    return a.thing1;\n}",
        "signature": "f536bf864c731ec3cb58961dede15c18-export declare function fn4(): import(\"@fluentui/pkg1/lib\").IThing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../pkg1/lib/src/index.d.ts"
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
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1488
}

packages/pkg1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/packages/pkg1/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/packages/pkg1/src/index.ts

packages/pkg2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/packages/pkg1/lib/src/index.d.ts
*refresh*    /home/src/workspaces/project/packages/pkg2/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/packages/pkg2/src/index.ts
