currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/box.ts] *new* 
export interface Box<T> {
    unbox(): T
}
//// [/home/src/workspaces/project/src/bug.js] *new* 
import * as B from "./box.js"
import * as W from "./wrap.js"

/**
 * @template {object} C
 * @param {C} source
 * @returns {W.Wrap<C>}
 */
const wrap = source => {
throw source
}

/**
 * @returns {B.Box<number>}
 */
const box = (n = 0) => ({ unbox: () => n })

export const bug = wrap({ n: box(1) });
//// [/home/src/workspaces/project/src/wrap.ts] *new* 
export type Wrap<C> = {
    [K in keyof C]: { wrapped: C[K] }
}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "outDir",
        "checkJs": true
    },
    "include": ["src"],
}

tsgo 
ExitStatus:: Success
Output::
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
//// [/home/src/workspaces/project/outDir/src/box.d.ts] *new* 
export interface Box<T> {
    unbox(): T;
}

//// [/home/src/workspaces/project/outDir/src/box.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/project/outDir/src/bug.d.ts] *new* 
import * as B from "./box.js";
import * as W from "./wrap.js";
export declare const bug: W.Wrap<{
    n: B.Box<number>;
}>;

//// [/home/src/workspaces/project/outDir/src/bug.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bug = void 0;
const B = require("./box.js");
const W = require("./wrap.js");
/**
 * @template {object} C
 * @param {C} source
 * @returns {W.Wrap<C>}
 */
const wrap = source => {
    throw source;
};
/**
 * @returns {B.Box<number>}
 */
const box = (n = 0) => ({ unbox: () => n });
exports.bug = wrap({ n: box(1) });

//// [/home/src/workspaces/project/outDir/src/wrap.d.ts] *new* 
export type Wrap<C> = {
    [K in keyof C]: {
        wrapped: C[K];
    };
};

//// [/home/src/workspaces/project/outDir/src/wrap.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../src/box.ts","../src/wrap.ts","../src/bug.js"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1cd060b4cfa55ea2a47d197d9f36eb29-export interface Box<T> {\n    unbox(): T\n}","signature":"ccd603d89ad1b8ff239d77bc32963c82-export interface Box<T> {\n    unbox(): T;\n}\n","impliedNodeFormat":1},{"version":"1bc7a2cd8efebbc7d3a335f2e15093fd-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}","signature":"78de3c807d49489120ea1f77c5bb07aa-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n","impliedNodeFormat":1},{"version":"b4e9b31d9609a8709f2fc33522d84448-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });","signature":"7c385e40e65a179131e0621fad086d2a-import * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\nexport declare const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"checkJs":true,"composite":true,"outDir":"./"},"referencedMap":[[4,1]],"latestChangedDtsFile":"./src/bug.d.ts"}
//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/box.ts",
        "../src/wrap.ts",
        "../src/bug.js"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/box.ts",
    "../src/wrap.ts",
    "../src/bug.js"
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
      "fileName": "../src/box.ts",
      "version": "1cd060b4cfa55ea2a47d197d9f36eb29-export interface Box<T> {\n    unbox(): T\n}",
      "signature": "ccd603d89ad1b8ff239d77bc32963c82-export interface Box<T> {\n    unbox(): T;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1cd060b4cfa55ea2a47d197d9f36eb29-export interface Box<T> {\n    unbox(): T\n}",
        "signature": "ccd603d89ad1b8ff239d77bc32963c82-export interface Box<T> {\n    unbox(): T;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/wrap.ts",
      "version": "1bc7a2cd8efebbc7d3a335f2e15093fd-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}",
      "signature": "78de3c807d49489120ea1f77c5bb07aa-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1bc7a2cd8efebbc7d3a335f2e15093fd-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}",
        "signature": "78de3c807d49489120ea1f77c5bb07aa-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/bug.js",
      "version": "b4e9b31d9609a8709f2fc33522d84448-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });",
      "signature": "7c385e40e65a179131e0621fad086d2a-import * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\nexport declare const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b4e9b31d9609a8709f2fc33522d84448-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });",
        "signature": "7c385e40e65a179131e0621fad086d2a-import * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\nexport declare const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../src/box.ts",
      "../src/wrap.ts"
    ]
  ],
  "options": {
    "checkJs": true,
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../src/bug.js": [
      "../src/box.ts",
      "../src/wrap.ts"
    ]
  },
  "latestChangedDtsFile": "./src/bug.d.ts",
  "size": 2092
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/box.ts
*refresh*    /home/src/workspaces/project/src/wrap.ts
*refresh*    /home/src/workspaces/project/src/bug.js
Signatures::
(stored at emit) /home/src/workspaces/project/src/box.ts
(stored at emit) /home/src/workspaces/project/src/wrap.ts
(stored at emit) /home/src/workspaces/project/src/bug.js


Edit [0]:: modify js file
//// [/home/src/workspaces/project/src/bug.js] *modified* 
import * as B from "./box.js"
import * as W from "./wrap.js"

/**
 * @template {object} C
 * @param {C} source
 * @returns {W.Wrap<C>}
 */
const wrap = source => {
throw source
}

/**
 * @returns {B.Box<number>}
 */
const box = (n = 0) => ({ unbox: () => n })

export const bug = wrap({ n: box(1) });export const something = 1;

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/outDir/src/bug.d.ts] *modified* 
import * as B from "./box.js";
import * as W from "./wrap.js";
export declare const bug: W.Wrap<{
    n: B.Box<number>;
}>;
export declare const something = 1;

//// [/home/src/workspaces/project/outDir/src/bug.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.something = exports.bug = void 0;
const B = require("./box.js");
const W = require("./wrap.js");
/**
 * @template {object} C
 * @param {C} source
 * @returns {W.Wrap<C>}
 */
const wrap = source => {
    throw source;
};
/**
 * @returns {B.Box<number>}
 */
const box = (n = 0) => ({ unbox: () => n });
exports.bug = wrap({ n: box(1) });
exports.something = 1;

//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","../src/box.ts","../src/wrap.ts","../src/bug.js"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1cd060b4cfa55ea2a47d197d9f36eb29-export interface Box<T> {\n    unbox(): T\n}","signature":"ccd603d89ad1b8ff239d77bc32963c82-export interface Box<T> {\n    unbox(): T;\n}\n","impliedNodeFormat":1},{"version":"1bc7a2cd8efebbc7d3a335f2e15093fd-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}","signature":"78de3c807d49489120ea1f77c5bb07aa-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n","impliedNodeFormat":1},{"version":"6eacf2e4d90c851011e8978446ec65d2-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });export const something = 1;","signature":"d57e9c5bf62a61457d245408176c990e-import * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\nexport declare const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nexport declare const something = 1;\n","impliedNodeFormat":1}],"fileIdsList":[[2,3]],"options":{"checkJs":true,"composite":true,"outDir":"./"},"referencedMap":[[4,1]],"latestChangedDtsFile":"./src/bug.d.ts"}
//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/box.ts",
        "../src/wrap.ts",
        "../src/bug.js"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/box.ts",
    "../src/wrap.ts",
    "../src/bug.js"
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
      "fileName": "../src/box.ts",
      "version": "1cd060b4cfa55ea2a47d197d9f36eb29-export interface Box<T> {\n    unbox(): T\n}",
      "signature": "ccd603d89ad1b8ff239d77bc32963c82-export interface Box<T> {\n    unbox(): T;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1cd060b4cfa55ea2a47d197d9f36eb29-export interface Box<T> {\n    unbox(): T\n}",
        "signature": "ccd603d89ad1b8ff239d77bc32963c82-export interface Box<T> {\n    unbox(): T;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/wrap.ts",
      "version": "1bc7a2cd8efebbc7d3a335f2e15093fd-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}",
      "signature": "78de3c807d49489120ea1f77c5bb07aa-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1bc7a2cd8efebbc7d3a335f2e15093fd-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}",
        "signature": "78de3c807d49489120ea1f77c5bb07aa-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/bug.js",
      "version": "6eacf2e4d90c851011e8978446ec65d2-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });export const something = 1;",
      "signature": "d57e9c5bf62a61457d245408176c990e-import * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\nexport declare const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nexport declare const something = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6eacf2e4d90c851011e8978446ec65d2-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });export const something = 1;",
        "signature": "d57e9c5bf62a61457d245408176c990e-import * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\nexport declare const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nexport declare const something = 1;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../src/box.ts",
      "../src/wrap.ts"
    ]
  ],
  "options": {
    "checkJs": true,
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../src/bug.js": [
      "../src/box.ts",
      "../src/wrap.ts"
    ]
  },
  "latestChangedDtsFile": "./src/bug.d.ts",
  "size": 2156
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/bug.js
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/bug.js
