currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/src/common/nominal.ts] *new* 
/// <reference path="./types.d.ts" preserve="true" />
export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;
//// [/home/src/workspaces/solution/src/common/tsconfig.json] *new* 
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": { "composite": true },
    "include": ["./nominal.ts"],
}
//// [/home/src/workspaces/solution/src/common/types.d.ts] *new* 
declare type MyNominal<T, Name extends string> = T & {
    specialKey: Name;
};
//// [/home/src/workspaces/solution/src/subProject/index.ts] *new* 
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;
//// [/home/src/workspaces/solution/src/subProject/tsconfig.json] *new* 
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": { "composite": true },
    "references": [{ "path": "../common" }],
    "include": ["./index.ts"],
}
//// [/home/src/workspaces/solution/src/subProject2/index.ts] *new* 
import { MyNominal } from '../subProject/index';
const variable = {
    key: 'value' as MyNominal,
};
export function getVar(): keyof typeof variable {
    return 'key';
}
//// [/home/src/workspaces/solution/src/subProject2/tsconfig.json] *new* 
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": { "composite": true },
    "references": [{ "path": "../subProject" }],
    "include": ["./index.ts"],
}
//// [/home/src/workspaces/solution/src/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": [{ "path": "./subProject" }, { "path": "./subProject2" }],
    "include": [],
}
//// [/home/src/workspaces/solution/tsconfig.base.json] *new* 
{
    "compilerOptions": {
        "rootDir": "./",
        "outDir": "lib",
    },
}
//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{
    "extends": "./tsconfig.base.json",
    "compilerOptions": { "composite": true },
    "include": ["./src/**/*.ts"],
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'lib/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

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
//// [/home/src/workspaces/solution/lib/src/common/nominal.d.ts] *new* 
/// <reference path="../../../src/common/types.d.ts" preserve="true" />
export declare type Nominal<T, Name extends string> = MyNominal<T, Name>;

//// [/home/src/workspaces/solution/lib/src/common/nominal.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./types.d.ts" preserve="true" />

//// [/home/src/workspaces/solution/lib/src/subProject/index.d.ts] *new* 
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;

//// [/home/src/workspaces/solution/lib/src/subProject/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/solution/lib/src/subProject2/index.d.ts] *new* 
import { MyNominal } from '../subProject/index';
declare const variable: {
    key: MyNominal;
};
export declare function getVar(): keyof typeof variable;
export {};

//// [/home/src/workspaces/solution/lib/src/subProject2/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVar = getVar;
const variable = {
    key: 'value',
};
function getVar() {
    return 'key';
}

//// [/home/src/workspaces/solution/lib/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","../src/common/types.d.ts","../src/common/nominal.ts","../src/subProject/index.ts","../src/subProject2/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"364cbcda81a2b382e1f50a8c4ab62993-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"02b2be40ad0c54e8b7965b3b3a70cf4d-/// <reference path=\"./types.d.ts\" preserve=\"true\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;","signature":"87033119a9b5a8355ed894292b93ddfc-/// <reference path=\"../../../src/common/types.d.ts\" preserve=\"true\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n","impliedNodeFormat":1},{"version":"f3259c501eab7f535f47f925d1b0ad90-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;","signature":"ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n","impliedNodeFormat":1},{"version":"8da8251ddcb1a6ba7d3777c22bdb0c2f-import { MyNominal } from '../subProject/index';\nconst variable = {\n    key: 'value' as MyNominal,\n};\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}","signature":"94380a791d16e2a4caa75d34b4c1d230-import { MyNominal } from '../subProject/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3],[4]],"options":{"composite":true,"outDir":"./","rootDir":".."},"referencedMap":[[3,1],[4,2],[5,3]],"latestChangedDtsFile":"./src/subProject2/index.d.ts"}
//// [/home/src/workspaces/solution/lib/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/common/types.d.ts",
        "../src/common/nominal.ts",
        "../src/subProject/index.ts",
        "../src/subProject2/index.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../src/common/types.d.ts",
    "../src/common/nominal.ts",
    "../src/subProject/index.ts",
    "../src/subProject2/index.ts"
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
      "fileName": "../src/common/types.d.ts",
      "version": "364cbcda81a2b382e1f50a8c4ab62993-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};",
      "signature": "364cbcda81a2b382e1f50a8c4ab62993-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "364cbcda81a2b382e1f50a8c4ab62993-declare type MyNominal<T, Name extends string> = T & {\n    specialKey: Name;\n};",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/common/nominal.ts",
      "version": "02b2be40ad0c54e8b7965b3b3a70cf4d-/// <reference path=\"./types.d.ts\" preserve=\"true\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;",
      "signature": "87033119a9b5a8355ed894292b93ddfc-/// <reference path=\"../../../src/common/types.d.ts\" preserve=\"true\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "02b2be40ad0c54e8b7965b3b3a70cf4d-/// <reference path=\"./types.d.ts\" preserve=\"true\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;",
        "signature": "87033119a9b5a8355ed894292b93ddfc-/// <reference path=\"../../../src/common/types.d.ts\" preserve=\"true\" />\nexport declare type Nominal<T, Name extends string> = MyNominal<T, Name>;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/subProject/index.ts",
      "version": "f3259c501eab7f535f47f925d1b0ad90-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;",
      "signature": "ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f3259c501eab7f535f47f925d1b0ad90-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;",
        "signature": "ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/subProject2/index.ts",
      "version": "8da8251ddcb1a6ba7d3777c22bdb0c2f-import { MyNominal } from '../subProject/index';\nconst variable = {\n    key: 'value' as MyNominal,\n};\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}",
      "signature": "94380a791d16e2a4caa75d34b4c1d230-import { MyNominal } from '../subProject/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8da8251ddcb1a6ba7d3777c22bdb0c2f-import { MyNominal } from '../subProject/index';\nconst variable = {\n    key: 'value' as MyNominal,\n};\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}",
        "signature": "94380a791d16e2a4caa75d34b4c1d230-import { MyNominal } from '../subProject/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../src/common/types.d.ts"
    ],
    [
      "../src/common/nominal.ts"
    ],
    [
      "../src/subProject/index.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "rootDir": ".."
  },
  "referencedMap": {
    "../src/common/nominal.ts": [
      "../src/common/types.d.ts"
    ],
    "../src/subProject/index.ts": [
      "../src/common/nominal.ts"
    ],
    "../src/subProject2/index.ts": [
      "../src/subProject/index.ts"
    ]
  },
  "latestChangedDtsFile": "./src/subProject2/index.d.ts",
  "size": 2504
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/src/common/types.d.ts
*refresh*    /home/src/workspaces/solution/src/common/nominal.ts
*refresh*    /home/src/workspaces/solution/src/subProject/index.ts
*refresh*    /home/src/workspaces/solution/src/subProject2/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/src/common/nominal.ts
(stored at emit) /home/src/workspaces/solution/src/subProject/index.ts
(stored at emit) /home/src/workspaces/solution/src/subProject2/index.ts
