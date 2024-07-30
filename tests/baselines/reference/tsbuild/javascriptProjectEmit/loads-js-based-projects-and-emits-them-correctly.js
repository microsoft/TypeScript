currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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
interface SymbolConstructor {
    readonly species: symbol;
    readonly toStringTag: symbol;
}
declare var Symbol: SymbolConstructor;
interface Symbol {
    readonly [Symbol.toStringTag]: string;
}


//// [/src/common/nominal.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
module.exports = {};


//// [/src/common/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "include": ["nominal.js"]
}

//// [/src/sub-project/index.js]
import { Nominal } from '../common/nominal';

/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */


//// [/src/sub-project/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../common" }
    ],
    "include": ["./index.js"]
}

//// [/src/sub-project-2/index.js]
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


//// [/src/sub-project-2/tsconfig.json]
{
    "extends": "../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../sub-project" }
    ],
    "include": ["./index.js"]
}

//// [/src/tsconfig.base.json]
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "outDir": "../lib",
        "allowJs": true,
        "checkJs": true,
        "declaration": true
    }
}

//// [/src/tsconfig.json]
{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "./sub-project" },
        { "path": "./sub-project-2" }
    ],
    "include": []
}



Output::
/lib/tsc -b /src
[96msrc/sub-project/index.js[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS18042: [0m'Nominal' is a type and cannot be imported in JavaScript files. Use 'import("../common/nominal").Nominal' in a JSDoc type annotation.

[7m1[0m import { Nominal } from '../common/nominal';
[7m [0m [91m         ~~~~~~~[0m

[96msrc/sub-project-2/index.js[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS18042: [0m'MyNominal' is a type and cannot be imported in JavaScript files. Use 'import("../sub-project/index").MyNominal' in a JSDoc type annotation.

[7m1[0m import { MyNominal } from '../sub-project/index';
[7m [0m [91m         ~~~~~~~~~[0m


Found 2 errors.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/lib/common/nominal.d.ts]
export type Nominal<T, Name> = T & {
    [Symbol.species]: Name;
};


//// [/lib/common/nominal.js]
/**
 * @template T, Name
 * @typedef {T & {[Symbol.species]: Name}} Nominal
 */
module.exports = {};


//// [/lib/common/tsconfig.tsbuildinfo]
{"fileNames":["../lib.d.ts","../../src/common/nominal.js"],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},{"version":"-9003723607-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};\n","signature":"-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"}],"root":[2],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipLibCheck":true},"latestChangedDtsFile":"./nominal.d.ts","version":"FakeTSVersion"}

//// [/lib/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib.d.ts",
    "../../src/common/nominal.js"
  ],
  "fileInfos": {
    "../lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "../../src/common/nominal.js": {
      "original": {
        "version": "-9003723607-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};\n",
        "signature": "-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"
      },
      "version": "-9003723607-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};\n",
      "signature": "-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"
    }
  },
  "root": [
    [
      2,
      "../../src/common/nominal.js"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "outDir": "..",
    "rootDir": "../../src",
    "skipLibCheck": true
  },
  "latestChangedDtsFile": "./nominal.d.ts",
  "version": "FakeTSVersion",
  "size": 1206
}

//// [/lib/sub-project/index.d.ts]
export type MyNominal = Nominal<string, "MyNominal">;
import { Nominal } from '../common/nominal';


//// [/lib/sub-project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nominal_1 = require("../common/nominal");
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */


//// [/lib/sub-project/tsconfig.tsbuildinfo]
{"fileNames":["../lib.d.ts","../common/nominal.d.ts","../../src/sub-project/index.js"],"fileIdsList":[[2]],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n",{"version":"-23375763082-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\n","signature":"-13328259909-export type MyNominal = Nominal<string, \"MyNominal\">;\nimport { Nominal } from '../common/nominal';\n"}],"root":[3],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipLibCheck":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"start":9,"length":7,"messageText":"'Nominal' is a type and cannot be imported in JavaScript files. Use 'import(\"../common/nominal\").Nominal' in a JSDoc type annotation.","category":1,"code":18042}]]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/lib/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib.d.ts",
    "../common/nominal.d.ts",
    "../../src/sub-project/index.js"
  ],
  "fileIdsList": [
    [
      "../common/nominal.d.ts"
    ]
  ],
  "fileInfos": {
    "../lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "../common/nominal.d.ts": {
      "version": "-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n",
      "signature": "-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"
    },
    "../../src/sub-project/index.js": {
      "original": {
        "version": "-23375763082-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\n",
        "signature": "-13328259909-export type MyNominal = Nominal<string, \"MyNominal\">;\nimport { Nominal } from '../common/nominal';\n"
      },
      "version": "-23375763082-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\n",
      "signature": "-13328259909-export type MyNominal = Nominal<string, \"MyNominal\">;\nimport { Nominal } from '../common/nominal';\n"
    }
  },
  "root": [
    [
      3,
      "../../src/sub-project/index.js"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "outDir": "..",
    "rootDir": "../../src",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../../src/sub-project/index.js": [
      "../common/nominal.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../src/sub-project/index.js",
      [
        {
          "start": 9,
          "length": 7,
          "messageText": "'Nominal' is a type and cannot be imported in JavaScript files. Use 'import(\"../common/nominal\").Nominal' in a JSDoc type annotation.",
          "category": 1,
          "code": 18042
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 1640
}

//// [/lib/sub-project-2/index.d.ts]
/**
 * @return {keyof typeof variable}
 */
export function getVar(): keyof typeof variable;
declare namespace variable {
    let key: MyNominal;
}
import { MyNominal } from '../sub-project/index';
export {};


//// [/lib/sub-project-2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVar = getVar;
var index_1 = require("../sub-project/index");
var variable = {
    key: /** @type {MyNominal} */ ('value'),
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}


//// [/lib/sub-project-2/tsconfig.tsbuildinfo]
{"fileNames":["../lib.d.ts","../common/nominal.d.ts","../sub-project/index.d.ts","../../src/sub-project-2/index.js"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n","-13328259909-export type MyNominal = Nominal<string, \"MyNominal\">;\nimport { Nominal } from '../common/nominal';\n",{"version":"9520601400-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}\n","signature":"33013066229-/**\n * @return {keyof typeof variable}\n */\nexport function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    let key: MyNominal;\n}\nimport { MyNominal } from '../sub-project/index';\nexport {};\n"}],"root":[4],"options":{"allowJs":true,"checkJs":true,"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipLibCheck":true},"referencedMap":[[3,1],[4,2]],"semanticDiagnosticsPerFile":[[4,[{"start":9,"length":9,"messageText":"'MyNominal' is a type and cannot be imported in JavaScript files. Use 'import(\"../sub-project/index\").MyNominal' in a JSDoc type annotation.","category":1,"code":18042}]]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/lib/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../lib.d.ts",
    "../common/nominal.d.ts",
    "../sub-project/index.d.ts",
    "../../src/sub-project-2/index.js"
  ],
  "fileIdsList": [
    [
      "../common/nominal.d.ts"
    ],
    [
      "../sub-project/index.d.ts"
    ]
  ],
  "fileInfos": {
    "../lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "../common/nominal.d.ts": {
      "version": "-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n",
      "signature": "-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"
    },
    "../sub-project/index.d.ts": {
      "version": "-13328259909-export type MyNominal = Nominal<string, \"MyNominal\">;\nimport { Nominal } from '../common/nominal';\n",
      "signature": "-13328259909-export type MyNominal = Nominal<string, \"MyNominal\">;\nimport { Nominal } from '../common/nominal';\n"
    },
    "../../src/sub-project-2/index.js": {
      "original": {
        "version": "9520601400-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}\n",
        "signature": "33013066229-/**\n * @return {keyof typeof variable}\n */\nexport function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    let key: MyNominal;\n}\nimport { MyNominal } from '../sub-project/index';\nexport {};\n"
      },
      "version": "9520601400-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}\n",
      "signature": "33013066229-/**\n * @return {keyof typeof variable}\n */\nexport function getVar(): keyof typeof variable;\ndeclare namespace variable {\n    let key: MyNominal;\n}\nimport { MyNominal } from '../sub-project/index';\nexport {};\n"
    }
  },
  "root": [
    [
      4,
      "../../src/sub-project-2/index.js"
    ]
  ],
  "options": {
    "allowJs": true,
    "checkJs": true,
    "composite": true,
    "declaration": true,
    "outDir": "..",
    "rootDir": "../../src",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../sub-project/index.d.ts": [
      "../common/nominal.d.ts"
    ],
    "../../src/sub-project-2/index.js": [
      "../sub-project/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../../src/sub-project-2/index.js",
      [
        {
          "start": 9,
          "length": 9,
          "messageText": "'MyNominal' is a type and cannot be imported in JavaScript files. Use 'import(\"../sub-project/index\").MyNominal' in a JSDoc type annotation.",
          "category": 1,
          "code": 18042
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./index.d.ts",
  "version": "FakeTSVersion",
  "size": 2025
}

