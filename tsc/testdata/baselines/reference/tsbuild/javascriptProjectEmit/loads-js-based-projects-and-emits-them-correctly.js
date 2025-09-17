currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.d.ts] *new* 
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
    readonly species: symbol;
    (desc?: string | number): symbol;
    for(name: string): symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}
declare const console: { log(msg: any): void; };
//// [/home/src/workspaces/solution/common/nominal.js] *new* 
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
module.exports = {};
//// [/home/src/workspaces/solution/common/tsconfig.json] *new* 
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
    },
    "include": ["nominal.js"],
}
//// [/home/src/workspaces/solution/sub-project-2/index.js] *new* 
import { MyNominal } from '../sub-project/index';

const variable = {
    key: /** @type {MyNominal} */('value'),
};

/**
 * @return {keyof typeof variable}
 */
export function getVar() {
    return 'key';
}
//// [/home/src/workspaces/solution/sub-project-2/tsconfig.json] *new* 
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "../sub-project" },
    ],
    "include": ["./index.js"],
}
//// [/home/src/workspaces/solution/sub-project/index.js] *new* 
import { Nominal } from '../common/nominal';

/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */
//// [/home/src/workspaces/solution/sub-project/tsconfig.json] *new* 
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "../common" },
    ],
    "include": ["./index.js"],
}
//// [/home/src/workspaces/solution/tsconfig.base.json] *new* 
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "outDir": "../lib",
        "allowJs": true,
        "checkJs": true,
        "declaration": true,
    },
}
//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
    },
    "references": [
        { "path": "./sub-project" },
        { "path": "./sub-project-2" },
    ],
    "include": [],
}

tsgo --b
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mcommon/nominal.js[0m:[93m5[0m:[93m1[0m - [91merror[0m[90m TS2309: [0mAn export assignment cannot be used in a module with other exported elements.

[7m5[0m module.exports = {};
[7m [0m [91m~~~~~~~~~~~~~~~~~~~[0m

[96msub-project/index.js[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS2305: [0mModule '"../../lib/common/nominal"' has no exported member 'Nominal'.

[7m1[0m import { Nominal } from '../common/nominal';
[7m [0m [91m         ~~~~~~~[0m

[96msub-project-2/index.js[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS18042: [0m'MyNominal' is a type and cannot be imported in JavaScript files. Use 'import("../sub-project/index").MyNominal' in a JSDoc type annotation.

[7m1[0m import { MyNominal } from '../sub-project/index';
[7m [0m [91m         ~~~~~~~~~[0m


Found 3 errors in 3 files.

Errors  Files
     1  common/nominal.js[90m:5[0m
     1  sub-project-2/index.js[90m:1[0m
     1  sub-project/index.js[90m:1[0m

//// [/home/src/workspaces/lib/common/nominal.d.ts] *new* 
export type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};
declare const _default: {};
export = _default;

//// [/home/src/workspaces/lib/common/nominal.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
export = {};
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
module.exports = {};

//// [/home/src/workspaces/lib/common/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","../../solution/common/nominal.js"],"fileInfos":[{"version":"24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a19075dfba5b2d593b761ed8d8cd526f-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};","signature":"de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n","impliedNodeFormat":1}],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"semanticDiagnosticsPerFile":[[2,[{"pos":80,"end":99,"code":2309,"category":1,"message":"An export assignment cannot be used in a module with other exported elements."}]]],"latestChangedDtsFile":"./nominal.d.ts"}
//// [/home/src/workspaces/lib/common/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../solution/common/nominal.js"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../solution/common/nominal.js"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../solution/common/nominal.js",
      "version": "a19075dfba5b2d593b761ed8d8cd526f-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};",
      "signature": "de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a19075dfba5b2d593b761ed8d8cd526f-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};",
        "signature": "de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "outDir": "..",
    "rootDir": "../../solution",
    "skipLibCheck": true
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../solution/common/nominal.js",
      [
        {
          "pos": 80,
          "end": 99,
          "code": 2309,
          "category": 1,
          "message": "An export assignment cannot be used in a module with other exported elements."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./nominal.d.ts",
  "size": 1606
}
//// [/home/src/workspaces/lib/sub-project-2/index.d.ts] *new* 
declare const variable: {
    key: Nominal<string, "MyNominal">;
};
/**
 * @return {keyof typeof variable}
 */
export declare function getVar(): keyof typeof variable;
export {};

//// [/home/src/workspaces/lib/sub-project-2/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVar = getVar;
const index_1 = require("../sub-project/index");
const variable = {
    key: 'value',
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}

//// [/home/src/workspaces/lib/sub-project-2/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","../common/nominal.d.ts","../sub-project/index.d.ts","../../solution/sub-project-2/index.js"],"fileInfos":[{"version":"24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n","225285a996cc5c4120877a377890d79e-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */ \n",{"version":"db2a90e082fd17d65127bda69975a727-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}","signature":"f2cd6630b2dfa04d1fc92179f15d1647-declare const variable: {\n    key: Nominal<string, \"MyNominal\">;\n};\n/**\n * @return {keyof typeof variable}\n */\nexport declare function getVar(): keyof typeof variable;\nexport {};\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"referencedMap":[[3,1],[4,2]],"semanticDiagnosticsPerFile":[[4,[{"pos":9,"end":18,"code":18042,"category":1,"message":"'MyNominal' is a type and cannot be imported in JavaScript files. Use 'import(\"../sub-project/index\").MyNominal' in a JSDoc type annotation."}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/lib/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../solution/sub-project-2/index.js"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../common/nominal.d.ts",
    "../sub-project/index.d.ts",
    "../../solution/sub-project-2/index.js"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../common/nominal.d.ts",
      "version": "de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n",
      "signature": "de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../sub-project/index.d.ts",
      "version": "225285a996cc5c4120877a377890d79e-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */ \n",
      "signature": "225285a996cc5c4120877a377890d79e-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */ \n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../solution/sub-project-2/index.js",
      "version": "db2a90e082fd17d65127bda69975a727-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}",
      "signature": "f2cd6630b2dfa04d1fc92179f15d1647-declare const variable: {\n    key: Nominal<string, \"MyNominal\">;\n};\n/**\n * @return {keyof typeof variable}\n */\nexport declare function getVar(): keyof typeof variable;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "db2a90e082fd17d65127bda69975a727-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}",
        "signature": "f2cd6630b2dfa04d1fc92179f15d1647-declare const variable: {\n    key: Nominal<string, \"MyNominal\">;\n};\n/**\n * @return {keyof typeof variable}\n */\nexport declare function getVar(): keyof typeof variable;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../common/nominal.d.ts"
    ],
    [
      "../sub-project/index.d.ts"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "outDir": "..",
    "rootDir": "../../solution",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../sub-project/index.d.ts": [
      "../common/nominal.d.ts"
    ],
    "../../solution/sub-project-2/index.js": [
      "../sub-project/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../solution/sub-project-2/index.js",
      [
        {
          "pos": 9,
          "end": 18,
          "code": 18042,
          "category": 1,
          "message": "'MyNominal' is a type and cannot be imported in JavaScript files. Use 'import(\"../sub-project/index\").MyNominal' in a JSDoc type annotation."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2322
}
//// [/home/src/workspaces/lib/sub-project/index.d.ts] *new* 
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */ 

//// [/home/src/workspaces/lib/sub-project/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nominal_1 = require("../common/nominal");
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */ 

//// [/home/src/workspaces/lib/sub-project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","../common/nominal.d.ts","../../solution/sub-project/index.js"],"fileInfos":[{"version":"24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n",{"version":"00b7836eaf1e026f7764b7be6efcc8f5-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */","signature":"225285a996cc5c4120877a377890d79e-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */ \n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"outDir":"..","rootDir":"../../solution","skipLibCheck":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":9,"end":16,"code":2305,"category":1,"message":"Module '\"../../lib/common/nominal\"' has no exported member 'Nominal'."}]]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/lib/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../solution/sub-project/index.js"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../common/nominal.d.ts",
    "../../solution/sub-project/index.js"
  ],
  "fileInfos": [
    {
      "fileName": "lib.d.ts",
      "version": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "signature": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../common/nominal.d.ts",
      "version": "de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n",
      "signature": "de751e2539eb6f12413f7067ad0a0ef5-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\ndeclare const _default: {};\nexport = _default;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../solution/sub-project/index.js",
      "version": "00b7836eaf1e026f7764b7be6efcc8f5-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */",
      "signature": "225285a996cc5c4120877a377890d79e-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */ \n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "00b7836eaf1e026f7764b7be6efcc8f5-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */",
        "signature": "225285a996cc5c4120877a377890d79e-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */ \n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../common/nominal.d.ts"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "outDir": "..",
    "rootDir": "../../solution",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../../solution/sub-project/index.js": [
      "../common/nominal.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../solution/sub-project/index.js",
      [
        {
          "pos": 9,
          "end": 16,
          "code": 2305,
          "category": 1,
          "message": "Module '\"../../lib/common/nominal\"' has no exported member 'Nominal'."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1877
}

common/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/common/nominal.js
Signatures::
(stored at emit) /home/src/workspaces/solution/common/nominal.js

sub-project/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/lib/common/nominal.d.ts
*refresh*    /home/src/workspaces/solution/sub-project/index.js
Signatures::
(stored at emit) /home/src/workspaces/solution/sub-project/index.js

sub-project-2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/lib/common/nominal.d.ts
*refresh*    /home/src/workspaces/lib/sub-project/index.d.ts
*refresh*    /home/src/workspaces/solution/sub-project-2/index.js
Signatures::
(stored at emit) /home/src/workspaces/solution/sub-project-2/index.js
