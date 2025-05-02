currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "composite": true,
    "outDir": "outDir",
    "checkJs": true
  },
  "include": [
    "src"
  ]
}

//// [/home/src/workspaces/project/src/box.ts]
export interface Box<T> {
    unbox(): T
}


//// [/home/src/workspaces/project/src/bug.js]
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


//// [/home/src/workspaces/project/src/wrap.ts]
export type Wrap<C> = {
    [K in keyof C]: { wrapped: C[K] }
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


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/outDir/src/box.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/outDir/src/box.d.ts]
export interface Box<T> {
    unbox(): T;
}


//// [/home/src/workspaces/project/outDir/src/wrap.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/outDir/src/wrap.d.ts]
export type Wrap<C> = {
    [K in keyof C]: {
        wrapped: C[K];
    };
};


//// [/home/src/workspaces/project/outDir/src/bug.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bug = void 0;
var B = require("./box.js");
var W = require("./wrap.js");
/**
 * @template {object} C
 * @param {C} source
 * @returns {W.Wrap<C>}
 */
var wrap = function (source) {
    throw source;
};
/**
 * @returns {B.Box<number>}
 */
var box = function (n) {
    if (n === void 0) { n = 0; }
    return ({ unbox: function () { return n; } });
};
exports.bug = wrap({ n: box(1) });


//// [/home/src/workspaces/project/outDir/src/bug.d.ts]
export const bug: W.Wrap<{
    n: B.Box<number>;
}>;
import * as B from "./box.js";
import * as W from "./wrap.js";


//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../src/box.ts","../src/wrap.ts","../src/bug.js"],"fileIdsList":[[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14267342128-export interface Box<T> {\n    unbox(): T\n}\n","signature":"-15554117365-export interface Box<T> {\n    unbox(): T;\n}\n"},{"version":"-7208318765-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}\n","signature":"-7604652776-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n"},{"version":"-27771690375-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });\n","signature":"-2569667161-export const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nimport * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\n"}],"root":[[2,4]],"options":{"checkJs":true,"composite":true,"outDir":"./"},"referencedMap":[[4,1]],"latestChangedDtsFile":"./src/bug.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../src/box.ts",
    "../src/wrap.ts",
    "../src/bug.js"
  ],
  "fileIdsList": [
    [
      "../src/box.ts",
      "../src/wrap.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/box.ts": {
      "original": {
        "version": "-14267342128-export interface Box<T> {\n    unbox(): T\n}\n",
        "signature": "-15554117365-export interface Box<T> {\n    unbox(): T;\n}\n"
      },
      "version": "-14267342128-export interface Box<T> {\n    unbox(): T\n}\n",
      "signature": "-15554117365-export interface Box<T> {\n    unbox(): T;\n}\n"
    },
    "../src/wrap.ts": {
      "original": {
        "version": "-7208318765-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}\n",
        "signature": "-7604652776-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n"
      },
      "version": "-7208318765-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}\n",
      "signature": "-7604652776-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n"
    },
    "../src/bug.js": {
      "original": {
        "version": "-27771690375-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });\n",
        "signature": "-2569667161-export const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nimport * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\n"
      },
      "version": "-27771690375-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });\n",
      "signature": "-2569667161-export const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nimport * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "../src/box.ts",
        "../src/wrap.ts",
        "../src/bug.js"
      ]
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
  "version": "FakeTSVersion",
  "size": 1633
}


exitCode:: ExitStatus.Success

Change:: modify js file

Input::
//// [/home/src/workspaces/project/src/bug.js]
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
export const something = 1;


/home/src/tslibs/TS/Lib/tsc.js 
Output::


//// [/home/src/workspaces/project/outDir/src/bug.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.something = exports.bug = void 0;
var B = require("./box.js");
var W = require("./wrap.js");
/**
 * @template {object} C
 * @param {C} source
 * @returns {W.Wrap<C>}
 */
var wrap = function (source) {
    throw source;
};
/**
 * @returns {B.Box<number>}
 */
var box = function (n) {
    if (n === void 0) { n = 0; }
    return ({ unbox: function () { return n; } });
};
exports.bug = wrap({ n: box(1) });
exports.something = 1;


//// [/home/src/workspaces/project/outDir/src/bug.d.ts]
export const bug: W.Wrap<{
    n: B.Box<number>;
}>;
export const something: 1;
import * as B from "./box.js";
import * as W from "./wrap.js";


//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo]
{"fileNames":["../../../tslibs/ts/lib/lib.d.ts","../src/box.ts","../src/wrap.ts","../src/bug.js"],"fileIdsList":[[2,3]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-14267342128-export interface Box<T> {\n    unbox(): T\n}\n","signature":"-15554117365-export interface Box<T> {\n    unbox(): T;\n}\n"},{"version":"-7208318765-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}\n","signature":"-7604652776-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n"},{"version":"-25729561895-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });\nexport const something = 1;","signature":"-7681488146-export const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nexport const something: 1;\nimport * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\n"}],"root":[[2,4]],"options":{"checkJs":true,"composite":true,"outDir":"./"},"referencedMap":[[4,1]],"latestChangedDtsFile":"./src/bug.d.ts","version":"FakeTSVersion"}

//// [/home/src/workspaces/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../tslibs/ts/lib/lib.d.ts",
    "../src/box.ts",
    "../src/wrap.ts",
    "../src/bug.js"
  ],
  "fileIdsList": [
    [
      "../src/box.ts",
      "../src/wrap.ts"
    ]
  ],
  "fileInfos": {
    "../../../tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "../src/box.ts": {
      "original": {
        "version": "-14267342128-export interface Box<T> {\n    unbox(): T\n}\n",
        "signature": "-15554117365-export interface Box<T> {\n    unbox(): T;\n}\n"
      },
      "version": "-14267342128-export interface Box<T> {\n    unbox(): T\n}\n",
      "signature": "-15554117365-export interface Box<T> {\n    unbox(): T;\n}\n"
    },
    "../src/wrap.ts": {
      "original": {
        "version": "-7208318765-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}\n",
        "signature": "-7604652776-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n"
      },
      "version": "-7208318765-export type Wrap<C> = {\n    [K in keyof C]: { wrapped: C[K] }\n}\n",
      "signature": "-7604652776-export type Wrap<C> = {\n    [K in keyof C]: {\n        wrapped: C[K];\n    };\n};\n"
    },
    "../src/bug.js": {
      "original": {
        "version": "-25729561895-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });\nexport const something = 1;",
        "signature": "-7681488146-export const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nexport const something: 1;\nimport * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\n"
      },
      "version": "-25729561895-import * as B from \"./box.js\"\nimport * as W from \"./wrap.js\"\n\n/**\n * @template {object} C\n * @param {C} source\n * @returns {W.Wrap<C>}\n */\nconst wrap = source => {\nthrow source\n}\n\n/**\n * @returns {B.Box<number>}\n */\nconst box = (n = 0) => ({ unbox: () => n })\n\nexport const bug = wrap({ n: box(1) });\nexport const something = 1;",
      "signature": "-7681488146-export const bug: W.Wrap<{\n    n: B.Box<number>;\n}>;\nexport const something: 1;\nimport * as B from \"./box.js\";\nimport * as W from \"./wrap.js\";\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "../src/box.ts",
        "../src/wrap.ts",
        "../src/bug.js"
      ]
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
  "version": "FakeTSVersion",
  "size": 1688
}


exitCode:: ExitStatus.Success
