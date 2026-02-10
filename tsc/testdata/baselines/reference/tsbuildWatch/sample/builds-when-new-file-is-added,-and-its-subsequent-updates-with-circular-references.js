currentDirectory::/user/username/projects/sample1
useCaseSensitiveFileNames::true
Input::
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
        "composite": true,
        "declaration": true
    },
    "references": [
        { "path": "../tests", "circular": true }
    ],
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

tsgo --b -w tests
ExitStatus:: Success
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

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
//// [/user/username/projects/sample1/core/anotherModule.d.ts] *new* 
export declare const World = "hello";

//// [/user/username/projects/sample1/core/anotherModule.js] *new* 
export const World = "hello";

//// [/user/username/projects/sample1/core/index.d.ts] *new* 
export declare const someString: string;
export declare function leftPad(s: string, n: number): string;
export declare function multiply(a: number, b: number): number;

//// [/user/username/projects/sample1/core/index.js] *new* 
export const someString = "HELLO WORLD";
export function leftPad(s, n) { return s + n; }
export function multiply(a, b) { return a * b; }

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2025.full.d.ts","./anotherModule.ts","./index.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"19cd44ed7278957051fca663f821c916-export const World = \"hello\";","signature":"5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n","impliedNodeFormat":1},{"version":"2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }","signature":"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","impliedNodeFormat":1},{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"declaration":true},"latestChangedDtsFile":"./index.d.ts"}
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
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./some_decl.d.ts"
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
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
        "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
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
    "composite": true,
    "declaration": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1781
}
//// [/user/username/projects/sample1/logic/index.d.ts] *new* 
export declare function getSecondsInDay(): number;
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;

//// [/user/username/projects/sample1/logic/index.js] *new* 
import * as c from '../core/index';
export function getSecondsInDay() {
    return c.multiply(10, 15);
}
import * as mod from '../core/anotherModule';
export const m = mod;
//# sourceMappingURL=index.js.map
//// [/user/username/projects/sample1/logic/index.js.map] *new* 
{"version":3,"file":"index.js","sourceRoot":"","sources":["index.ts"],"names":[],"mappings":"AAAA,OAAO,KAAK,CAAC,MAAM,eAAe,CAAC;AACnC,MAAM,UAAU,eAAe,GAAG;IAC9B,OAAO,CAAC,CAAC,QAAQ,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC;AAAA,CAC7B;AACD,OAAO,KAAK,GAAG,MAAM,uBAAuB,CAAC;AAC7C,MAAM,CAAC,MAAM,CAAC,GAAG,GAAG,CAAC"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.es2025.full.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",{"version":"590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true,"sourceMap":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
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
    "lib.es2025.full.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
    "./index.ts"
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
      "fileName": "../core/index.d.ts",
      "version": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "590556060bc156a64834010df8cda255-import * as c from '../core/index';\nexport function getSecondsInDay() {\n    return c.multiply(10, 15);\n}\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
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
      "../core/index.d.ts",
      "../core/anotherModule.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1813
}
//// [/user/username/projects/sample1/tests/index.d.ts] *new* 
import * as mod from '../core/anotherModule';
export declare const m: typeof mod;

//// [/user/username/projects/sample1/tests/index.js] *new* 
import * as c from '../core/index';
import * as logic from '../logic/index';
c.leftPad("", 10);
logic.getSecondsInDay();
import * as mod from '../core/anotherModule';
export const m = mod;

//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[5],"fileNames":["lib.es2025.full.d.ts","../core/index.d.ts","../core/anotherModule.d.ts","../logic/index.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n","487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",{"version":"7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;","signature":"4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[2,3,4]],"options":{"composite":true,"declaration":true,"skipDefaultLibCheck":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 5
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../core/index.d.ts",
    "../core/anotherModule.d.ts",
    "../logic/index.d.ts",
    "./index.ts"
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
      "fileName": "../core/index.d.ts",
      "version": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "signature": "da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../core/anotherModule.d.ts",
      "version": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../logic/index.d.ts",
      "version": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "signature": "487f7216384ec40e22ff7dc40c01be4b-export declare function getSecondsInDay(): number;\nimport * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
      "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7fa4162f733e6b9e7f7d9d9410e62f61-import * as c from '../core/index';\nimport * as logic from '../logic/index';\n\nc.leftPad(\"\", 10);\nlogic.getSecondsInDay();\n\nimport * as mod from '../core/anotherModule';\nexport const m = mod;",
        "signature": "4b3c99afe665034856f74c660f74d6fd-import * as mod from '../core/anotherModule';\nexport declare const m: typeof mod;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../core/anotherModule.d.ts"
    ],
    [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "declaration": true,
    "skipDefaultLibCheck": true
  },
  "referencedMap": {
    "../logic/index.d.ts": [
      "../core/anotherModule.d.ts"
    ],
    "./index.ts": [
      "../core/index.d.ts",
      "../core/anotherModule.d.ts",
      "../logic/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1972
}

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /user/username/projects/sample1/core/anotherModule.ts
*refresh*    /user/username/projects/sample1/core/index.ts
*refresh*    /user/username/projects/sample1/core/some_decl.d.ts
Signatures::
(stored at emit) /user/username/projects/sample1/core/anotherModule.ts
(stored at emit) /user/username/projects/sample1/core/index.ts

logic/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/core/anotherModule.d.ts
*refresh*    /user/username/projects/sample1/logic/index.ts
Signatures::
(stored at emit) /user/username/projects/sample1/logic/index.ts

tests/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /user/username/projects/sample1/core/index.d.ts
*refresh*    /user/username/projects/sample1/core/anotherModule.d.ts
*refresh*    /user/username/projects/sample1/logic/index.d.ts
*refresh*    /user/username/projects/sample1/tests/index.ts
Signatures::
(stored at emit) /user/username/projects/sample1/tests/index.ts


Edit [0]:: Change to new File and build core
//// [/user/username/projects/sample1/core/newfile.ts] *new* 
export const newFileConst = 30;


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/sample1/core/newfile.d.ts] *new* 
export declare const newFileConst = 30;

//// [/user/username/projects/sample1/core/newfile.js] *new* 
export const newFileConst = 30;

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2025.full.d.ts","./anotherModule.ts","./index.ts","./newfile.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"19cd44ed7278957051fca663f821c916-export const World = \"hello\";","signature":"5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n","impliedNodeFormat":1},{"version":"2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }","signature":"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","impliedNodeFormat":1},{"version":"046181f7f382942435700923f254abbd-export const newFileConst = 30;","signature":"a58a2a5c0f75f5061a8fd33d410e8e87-export declare const newFileConst = 30;\n","impliedNodeFormat":1},{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"declaration":true},"latestChangedDtsFile":"./newfile.d.ts"}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts",
        "./index.ts",
        "./newfile.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./newfile.ts",
    "./some_decl.d.ts"
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
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
        "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
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
      "fileName": "./newfile.ts",
      "version": "046181f7f382942435700923f254abbd-export const newFileConst = 30;",
      "signature": "a58a2a5c0f75f5061a8fd33d410e8e87-export declare const newFileConst = 30;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "046181f7f382942435700923f254abbd-export const newFileConst = 30;",
        "signature": "a58a2a5c0f75f5061a8fd33d410e8e87-export declare const newFileConst = 30;\n",
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
    "composite": true,
    "declaration": true
  },
  "latestChangedDtsFile": "./newfile.d.ts",
  "size": 1988
}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] *mTime changed*
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] *mTime changed*

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/newfile.ts
Signatures::
(computed .d.ts) /user/username/projects/sample1/core/newfile.ts

logic/tsconfig.json::
SemanticDiagnostics::
Signatures::

tests/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: Change to new File and build core
//// [/user/username/projects/sample1/core/newfile.ts] *modified* 

export class someClass2 { }


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/user/username/projects/sample1/core/newfile.d.ts] *modified* 
export declare class someClass2 {
}

//// [/user/username/projects/sample1/core/newfile.js] *modified* 
export class someClass2 {
}

//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2025.full.d.ts","./anotherModule.ts","./index.ts","./newfile.ts","./some_decl.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"19cd44ed7278957051fca663f821c916-export const World = \"hello\";","signature":"5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n","impliedNodeFormat":1},{"version":"2753a1085d587a7d57069e1105af24ec-export const someString: string = \"HELLO WORLD\";\nexport function leftPad(s: string, n: number) { return s + n; }\nexport function multiply(a: number, b: number) { return a * b; }","signature":"da642d80443e7ccd327091080a82a43c-export declare const someString: string;\nexport declare function leftPad(s: string, n: number): string;\nexport declare function multiply(a: number, b: number): number;\n","impliedNodeFormat":1},{"version":"be01929bbca74e4343ac8d7aa9c08b55-\nexport class someClass2 { }","signature":"6235ba91ce253ead4599fe030935931e-export declare class someClass2 {\n}\n","impliedNodeFormat":1},{"version":"6ceab83400a6167be2fb5feab881ded0-declare const dts: any;","affectsGlobalScope":true,"impliedNodeFormat":1}],"options":{"composite":true,"declaration":true},"latestChangedDtsFile":"./newfile.d.ts"}
//// [/user/username/projects/sample1/core/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./anotherModule.ts",
        "./index.ts",
        "./newfile.ts",
        "./some_decl.d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./anotherModule.ts",
    "./index.ts",
    "./newfile.ts",
    "./some_decl.d.ts"
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
      "fileName": "./anotherModule.ts",
      "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
      "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "19cd44ed7278957051fca663f821c916-export const World = \"hello\";",
        "signature": "5aad0de3e7b08bb6e110c7b97361b89e-export declare const World = \"hello\";\n",
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
      "fileName": "./newfile.ts",
      "version": "be01929bbca74e4343ac8d7aa9c08b55-\nexport class someClass2 { }",
      "signature": "6235ba91ce253ead4599fe030935931e-export declare class someClass2 {\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "be01929bbca74e4343ac8d7aa9c08b55-\nexport class someClass2 { }",
        "signature": "6235ba91ce253ead4599fe030935931e-export declare class someClass2 {\n}\n",
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
    "composite": true,
    "declaration": true
  },
  "latestChangedDtsFile": "./newfile.d.ts",
  "size": 1983
}
//// [/user/username/projects/sample1/logic/tsconfig.tsbuildinfo] *mTime changed*
//// [/user/username/projects/sample1/tests/tsconfig.tsbuildinfo] *mTime changed*

core/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/sample1/core/newfile.ts
Signatures::
(computed .d.ts) /user/username/projects/sample1/core/newfile.ts

logic/tsconfig.json::
SemanticDiagnostics::
Signatures::

tests/tsconfig.json::
SemanticDiagnostics::
Signatures::
