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


Found 1 error.

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
{"program":{"fileNames":["../lib.d.ts","../../src/common/nominal.js"],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},{"version":"-9003723607-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};\n","signature":"-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n"}],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2],"latestChangedDtsFile":"./nominal.d.ts"},"version":"FakeTSVersion"}

//// [/lib/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
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
    "options": {
      "composite": true,
      "declaration": true,
      "outDir": "..",
      "rootDir": "../../src",
      "skipLibCheck": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../lib.d.ts",
      "../../src/common/nominal.js"
    ],
    "latestChangedDtsFile": "./nominal.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1255
}

//// [/lib/sub-project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib.d.ts","../common/nominal.d.ts","../../src/sub-project/index.js"],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-13020584488-export type Nominal<T, Name> = T & {\n    [Symbol.species]: Name;\n};\n","-23375763082-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\n"],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipLibCheck":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[2,1,[3,[{"file":"../../src/sub-project/index.js","start":9,"length":7,"messageText":"'Nominal' is a type and cannot be imported in JavaScript files. Use 'import(\"../common/nominal\").Nominal' in a JSDoc type annotation.","category":1,"code":18042}]]],"affectedFilesPendingEmit":[3],"emitSignatures":[3]},"version":"FakeTSVersion"}

//// [/lib/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib.d.ts",
      "../common/nominal.d.ts",
      "../../src/sub-project/index.js"
    ],
    "fileNamesList": [
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
        "version": "-23375763082-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\n",
        "signature": "-23375763082-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\n"
      }
    },
    "options": {
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
    "exportedModulesMap": {
      "../../src/sub-project/index.js": [
        "../common/nominal.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../common/nominal.d.ts",
      "../lib.d.ts",
      [
        "../../src/sub-project/index.js",
        [
          {
            "file": "../../src/sub-project/index.js",
            "start": 9,
            "length": 7,
            "messageText": "'Nominal' is a type and cannot be imported in JavaScript files. Use 'import(\"../common/nominal\").Nominal' in a JSDoc type annotation.",
            "category": 1,
            "code": 18042
          }
        ]
      ]
    ],
    "affectedFilesPendingEmit": [
      [
        "../../src/sub-project/index.js",
        "Js | Dts"
      ]
    ],
    "emitSignatures": [
      "../../src/sub-project/index.js"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1555
}

