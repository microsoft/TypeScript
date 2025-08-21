currentDirectory::/user/username/projects/sample1
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.d.ts] *new* 
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
//// [/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts] *new* 
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
//// [/user/username/projects/sample1/core/anotherModule.ts] *new* 
export const World = "hello";
//// [/user/username/projects/sample1/core/index.ts] *new* 
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }
//// [/user/username/projects/sample1/core/some_decl.d.ts] *new* 
declare const dts: any;
//// [/user/username/projects/sample1/core/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true,
        "listFiles": true,
        "listEmittedFiles": true,
        "target": "esnext",
    },
}
//// [/user/username/projects/sample1/logic/index.ts] *new* 
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;
//// [/user/username/projects/sample1/logic/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "sourceMap": true,
        "skipDefaultLibCheck": true,
    },
    "references": [
        { "path": "../core" },
    ],
}
//// [/user/username/projects/sample1/tests/index.ts] *new* 
import * as c from '../core/index';
import * as logic from '../logic/index';

c.leftPad("", 10);
logic.getSecondsInDay();

import * as mod from '../core/anotherModule';
export const m = mod;
//// [/user/username/projects/sample1/tests/tsconfig.json] *new* 
{
    "references": [
        { "path": "../core" },
        { "path": "../logic" },
    ],
    "files": ["index.ts"],
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "skipDefaultLibCheck": true,
    },
}

tsgo --b core --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * core/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'core/tsconfig.json' is out of date because output file 'core/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'core/tsconfig.json'...

TSFILE:  /user/username/projects/sample1/core/anotherModule.js
TSFILE:  /user/username/projects/sample1/core/index.js
TSFILE:  /user/username/projects/sample1/core/tsconfig.tsbuildinfo
/home/src/tslibs/TS/Lib/lib.esnext.d.ts
/home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/some_decl.d.ts
//// [/home/src/tslibs/TS/Lib/lib.esnext.d.ts] *Lib*
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
//// [/user/username/projects/sample1/core/anotherModule.js] *new* 
export const World = "hello";

//// [/user/username/projects/sample1/core/index.js] *new* 
export const someString = "HELLO WORLD";
export function leftPad(s, n) { return s + n; }
export function multiply(a, b) { return a * b; }

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[3,5]],"fileNames":["lib.esnext.d.ts","lib.esnext.full.d.ts","./anotherModule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"77c880b8984a58da26cd0cab7e052e50-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />","19cd44ed7278957051fca663f821c916-export const World = \"hello\";","2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"target":99}}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        3,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.esnext.d.ts",
    "lib.esnext.full.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./some_decl.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.esnext.d.ts",
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
      "fileName": "lib.esnext.full.d.ts",
      "version": "77c880b8984a58da26cd0cab7e052e50-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />",
      "signature": "77c880b8984a58da26cd0cab7e052e50-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
      "signature": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./some_decl.d.ts",
      "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "signature": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "target": 99
  },
  "size": 1471
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.d.ts
*refresh*    /home/src/tslibs/TS/Lib/lib.esnext.full.d.ts
*refresh*    /user/username/projects/sample1/core/anotherModule.ts
*refresh*    /user/username/projects/sample1/core/index.ts
*refresh*    /user/username/projects/sample1/core/some_decl.d.ts
Signatures::


Edit [0]:: incremental-declaration-changes
//// [/user/username/projects/sample1/core/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "incremental": true,
        "listFiles": true,
        "listEmittedFiles": true,
        "target": "es5",
    },
}

tsgo --b core --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * core/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'core/tsconfig.json' is out of date because output 'core/tsconfig.tsbuildinfo' is older than input 'core/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'core/tsconfig.json'...

TSFILE:  /user/username/projects/sample1/core/anotherModule.js
TSFILE:  /user/username/projects/sample1/core/index.js
TSFILE:  /user/username/projects/sample1/core/tsconfig.tsbuildinfo
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/tslibs/TS/Lib/lib.esnext.d.ts
/user/username/projects/sample1/core/anotherModule.ts
/user/username/projects/sample1/core/index.ts
/user/username/projects/sample1/core/some_decl.d.ts
//// [/user/username/projects/sample1/core/anotherModule.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.World = void 0;
exports.World = "hello";

//// [/user/username/projects/sample1/core/index.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[3,5]],"fileNames":["lib.d.ts","lib.esnext.d.ts","./anotherModule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":["77c880b8984a58da26cd0cab7e052e50-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />",{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"19cd44ed7278957051fca663f821c916-export const World = \"hello\";","2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"target":1}}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts",
        "./index.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        3,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "lib.esnext.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./some_decl.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "77c880b8984a58da26cd0cab7e052e50-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />",
      "signature": "77c880b8984a58da26cd0cab7e052e50-/// <reference no-default-lib=\"true\"/>\n/// <reference lib=\"esnext\" />",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "lib.esnext.d.ts",
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
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
      "signature": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./some_decl.d.ts",
      "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "signature": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6ceab83400a6167be2fb5feab881ded0-declare const dts: any;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "target": 1
  },
  "size": 1458
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
Signatures::
(used version)   /home/src/tslibs/TS/Lib/lib.d.ts
