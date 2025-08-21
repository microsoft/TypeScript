currentDirectory::/user/username/projects/sample1
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/sample1/core/index.ts] *new* 
export const someString: string = "HELLO WORLD";
export function leftPad(s: string, n: number) { return s + n; }
export function multiply(a: number, b: number) { return a * b; }
//// [/user/username/projects/sample1/core/some_decl.d.ts] *new* 
declare const dts: any;
//// [/user/username/projects/sample1/core/tsconfig.json] *new* 
{
     "compilerOptions": { "composite": true },
     "files": ["anotherModule.ts", "index.ts", "some_decl.d.ts"],
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

tsgo --b tests --verbose --force
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * core/tsconfig.json
    * logic/tsconfig.json
    * tests/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'core/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'core/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'logic/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'logic/tsconfig.json'...

[96mlogic/index.ts[0m:[93m5[0m:[93m22[0m - [91merror[0m[90m TS2307: [0mCannot find module '../core/anotherModule' or its corresponding type declarations.

[7m5[0m import * as mod from '../core/anotherModule';
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Project 'tests/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'tests/tsconfig.json'...

[96mtests/index.ts[0m:[93m7[0m:[93m22[0m - [91merror[0m[90m TS2307: [0mCannot find module '../core/anotherModule' or its corresponding type declarations.

[7m7[0m import * as mod from '../core/anotherModule';
[7m [0m [91m                     ~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  logic/index.ts[90m:5[0m
     1  tests/index.ts[90m:7[0m

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
//// [/user/username/projects/sample1/core/index.d.ts] *new* 
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;

//// [/user/username/projects/sample1/core/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someString = void 0;
exports.leftPad = leftPad;
exports.multiply = multiply;
exports.someString = "HELLO WORLD";
function leftPad(s, n) { return s + n; }
function multiply(a, b) { return a * b; }

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.d.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }","signature":"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","impliedNodeFormat":1},{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./index.ts",
    "./some_decl.d.ts"
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
      "fileName": "./index.ts",
      "version": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
      "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }",
        "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
        "impliedNodeFormat": 1
      }
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
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1539
}
//// [/user/username/projects/sample1/logic/index.d.ts] *new* 
export declare function getSecondsInDay(): number;
export declare const m: any;

//// [/user/username/projects/sample1/logic/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
exports.getSecondsInDay = getSecondsInDay;
const c = require("../core/index");
function getSecondsInDay() {
    return c.multiply(10, 15);
}
const mod = require("../core/anotherModule");
exports.m = mod;
//# sourceMappingURL=index.js.map
//// [/user/username/projects/sample1/logic/index.js.map] *new* 
{"version":3,"file":"index.js","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":";;;;AAAA,MAAY,CAAC,4BAAsB;AACnC,2BAAkC;IAC9B,OAAO,CAAC,CAAC,QAAQ,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAAA,CAC7B;AACD,MAAY,GAAG,oCAA8B;AAChC,QAAA,CAAC,GAAG,GAAG,CAAC"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","../core/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",{"version":"590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"40bb9a18ac3dbfd340fea197221fa9dd-export declare function getSecondsInDay(): number;\nexport declare const m: any;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":126,"end":149,"code":2307,"category":1,"message":"Cannot find module '../core/anotherModule' or its corresponding type declarations."}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "./index.ts"
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
      "fileName": "../core/index.d.ts",
      "version": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "40bb9a18ac3dbfd340fea197221fa9dd-export declare function getSecondsInDay(): number;\nexport declare const m: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "40bb9a18ac3dbfd340fea197221fa9dd-export declare function getSecondsInDay(): number;\nexport declare const m: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true,
    "sourceMap": true
  },
  "referencedMap": {
    "./index.ts": [
      "../core/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 126,
          "end": 149,
          "code": 2307,
          "category": 1,
          "message": "Cannot find module '../core/anotherModule' or its corresponding type declarations."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1818
}
//// [/user/username/projects/sample1/tests/index.d.ts] *new* 
export declare const m: any;

//// [/user/username/projects/sample1/tests/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.m = void 0;
const c = require("../core/index");
const logic = require("../logic/index");
c.leftPad("", 10);
logic.getSecondsInDay();
const mod = require("../core/anotherModule");
exports.m = mod;

//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","../core/index.d.ts","../logic/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","40bb9a18ac3dbfd340fea197221fa9dd-export declare function getSecondsInDay(): number;\nexport declare const m: any;\n",{"version":"7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"ce0233db1f3aabecabdb072a4f4c8d1e-export declare const m: any;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true},"referencedMap":[[4,1]],"semanticDiagnosticsPerFile":[[4,[{"pos":144,"end":167,"code":2307,"category":1,"message":"Cannot find module '../core/anotherModule' or its corresponding type declarations."}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../core/index.d.ts",
    "../logic/index.d.ts",
    "./index.ts"
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
      "fileName": "../core/index.d.ts",
      "version": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../logic/index.d.ts",
      "version": "40bb9a18ac3dbfd340fea197221fa9dd-export declare function getSecondsInDay(): number;\nexport declare const m: any;\n",
      "signature": "40bb9a18ac3dbfd340fea197221fa9dd-export declare function getSecondsInDay(): number;\nexport declare const m: any;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "ce0233db1f3aabecabdb072a4f4c8d1e-export declare const m: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "ce0233db1f3aabecabdb072a4f4c8d1e-export declare const m: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts",
      "../logic/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "./index.ts": [
      "../core/index.d.ts",
      "../logic/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 144,
          "end": 167,
          "code": 2307,
          "category": 1,
          "message": "Cannot find module '../core/anotherModule' or its corresponding type declarations."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1913
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/sample1/core/index.ts
*refresh*    /user/username/projects/sample1/core/some_decl.d.ts
Signatures::
(stored at emit) /user/username/projects/sample1/core/index.ts

logic/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/logic/index.ts
Signatures::
(stored at emit) /user/username/projects/sample1/logic/index.ts

tests/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/logic/index.d.ts
*refresh*    /user/username/projects/sample1/tests/index.ts
Signatures::
(stored at emit) /user/username/projects/sample1/tests/index.ts
