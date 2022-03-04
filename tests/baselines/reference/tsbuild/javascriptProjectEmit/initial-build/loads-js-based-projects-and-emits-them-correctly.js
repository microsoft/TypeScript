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
exitCode:: ExitStatus.Success


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
{"program":{"fileNames":["../lib.d.ts","../../src/common/nominal.js"],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-9003723607-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};\n"],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipLibCheck":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/lib/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib.d.ts",
      "../../src/common/nominal.js"
    ],
    "fileInfos": {
      "../lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "../../src/common/nominal.js": {
        "version": "-9003723607-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};\n",
        "signature": "-9003723607-/**\n * @template T, Name\n * @typedef {T & {[Symbol.species]: Name}} Nominal\n */\nmodule.exports = {};\n"
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
    ]
  },
  "version": "FakeTSVersion",
  "size": 1104
}

//// [/lib/sub-project/index.d.ts]
export type MyNominal = Nominal<string, 'MyNominal'>;
import { Nominal } from "../common/nominal";


//// [/lib/sub-project/index.js]
"use strict";
exports.__esModule = true;
/**
 * @typedef {Nominal<string, 'MyNominal'>} MyNominal
 */


//// [/lib/sub-project/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib.d.ts","../common/nominal.d.ts","../../src/sub-project/index.js"],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-15964609857-export type Nominal<T, Name> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n","-23375763082-import { Nominal } from '../common/nominal';\n\n/**\n * @typedef {Nominal<string, 'MyNominal'>} MyNominal\n */\n"],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipLibCheck":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[2,1,3]},"version":"FakeTSVersion"}

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
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "../common/nominal.d.ts": {
        "version": "-15964609857-export type Nominal<T, Name> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "signature": "-15964609857-export type Nominal<T, Name> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n"
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
      "../../src/sub-project/index.js"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1264
}

//// [/lib/sub-project-2/index.d.ts]
/**
 * @return {keyof typeof variable}
 */
export function getVar(): keyof typeof variable;
declare namespace variable {
    const key: MyNominal;
}
import { MyNominal } from "../sub-project/index";
export {};


//// [/lib/sub-project-2/index.js]
"use strict";
exports.__esModule = true;
exports.getVar = void 0;
var variable = {
    key: /** @type {MyNominal} */ ('value')
};
/**
 * @return {keyof typeof variable}
 */
function getVar() {
    return 'key';
}
exports.getVar = getVar;


//// [/lib/sub-project-2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib.d.ts","../common/nominal.d.ts","../sub-project/index.d.ts","../../src/sub-project-2/index.js"],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-15964609857-export type Nominal<T, Name> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n","-1163946571-export type MyNominal = Nominal<string, 'MyNominal'>;\r\nimport { Nominal } from \"../common/nominal\";\r\n","9520601400-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}\n"],"options":{"composite":true,"declaration":true,"outDir":"..","rootDir":"../../src","skipLibCheck":true},"fileIdsList":[[2],[3]],"referencedMap":[[3,1],[4,2]],"exportedModulesMap":[[3,1],[4,2]],"semanticDiagnosticsPerFile":[2,1,3,4]},"version":"FakeTSVersion"}

//// [/lib/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib.d.ts",
      "../common/nominal.d.ts",
      "../sub-project/index.d.ts",
      "../../src/sub-project-2/index.js"
    ],
    "fileNamesList": [
      [
        "../common/nominal.d.ts"
      ],
      [
        "../sub-project/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../lib.d.ts": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "../common/nominal.d.ts": {
        "version": "-15964609857-export type Nominal<T, Name> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n",
        "signature": "-15964609857-export type Nominal<T, Name> = T & {\r\n    [Symbol.species]: Name;\r\n};\r\n"
      },
      "../sub-project/index.d.ts": {
        "version": "-1163946571-export type MyNominal = Nominal<string, 'MyNominal'>;\r\nimport { Nominal } from \"../common/nominal\";\r\n",
        "signature": "-1163946571-export type MyNominal = Nominal<string, 'MyNominal'>;\r\nimport { Nominal } from \"../common/nominal\";\r\n"
      },
      "../../src/sub-project-2/index.js": {
        "version": "9520601400-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}\n",
        "signature": "9520601400-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: /** @type {MyNominal} */('value'),\n};\n\n/**\n * @return {keyof typeof variable}\n */\nexport function getVar() {\n    return 'key';\n}\n"
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
      "../sub-project/index.d.ts": [
        "../common/nominal.d.ts"
      ],
      "../../src/sub-project-2/index.js": [
        "../sub-project/index.d.ts"
      ]
    },
    "exportedModulesMap": {
      "../sub-project/index.d.ts": [
        "../common/nominal.d.ts"
      ],
      "../../src/sub-project-2/index.js": [
        "../sub-project/index.d.ts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../common/nominal.d.ts",
      "../lib.d.ts",
      "../sub-project/index.d.ts",
      "../../src/sub-project-2/index.js"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1540
}

