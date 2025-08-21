currentDirectory::/home/src/workspaces/packages
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
//// [/home/src/workspaces/packages/solution/common/nominal.ts] *new* 
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};
//// [/home/src/workspaces/packages/solution/common/tsconfig.json] *new* 
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "include": ["nominal.ts"]
}
//// [/home/src/workspaces/packages/solution/sub-project-2/index.ts] *new* 
import { MyNominal } from '../sub-project/index';

const variable = {
    key: 'value' as MyNominal,
};

export function getVar(): keyof typeof variable {
    return 'key';
}
//// [/home/src/workspaces/packages/solution/sub-project-2/tsconfig.json] *new* 
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../sub-project" }
    ],
    "include": ["./index.ts"]
}
//// [/home/src/workspaces/packages/solution/sub-project/index.ts] *new* 
import { Nominal } from '../common/nominal';

export type MyNominal = Nominal<string, 'MyNominal'>;
//// [/home/src/workspaces/packages/solution/sub-project/tsconfig.json] *new* 
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "../common" }
    ],
    "include": ["./index.ts"]
}
//// [/home/src/workspaces/packages/solution/tsconfig.json] *new* 
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
//// [/home/src/workspaces/packages/tsconfig.base.json] *new* 
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "outDir": "lib"
    }
}
//// [/home/src/workspaces/packages/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true
    },
    "references": [
        { "path": "./solution" },
    ],
    "include": [],
}

tsgo -b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * solution/common/tsconfig.json
    * solution/sub-project/tsconfig.json
    * solution/sub-project-2/tsconfig.json
    * solution/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'solution/common/tsconfig.json' is out of date because output file 'lib/solution/common/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'solution/common/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'solution/sub-project/tsconfig.json' is out of date because output file 'lib/solution/sub-project/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'solution/sub-project/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'solution/sub-project-2/tsconfig.json' is out of date because output file 'lib/solution/sub-project-2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'solution/sub-project-2/tsconfig.json'...

//// [/home/src/workspaces/packages/lib/solution/common/nominal.d.ts] *new* 
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};

//// [/home/src/workspaces/packages/lib/solution/common/nominal.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/packages/lib/solution/common/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","../../../solution/common/nominal.ts"],"fileInfos":[{"version":"24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6da5023bc256e774f9366f88c712bfc1-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};","signature":"5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"latestChangedDtsFile":"./nominal.d.ts"}
//// [/home/src/workspaces/packages/lib/solution/common/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../../solution/common/nominal.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../../solution/common/nominal.ts"
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
      "fileName": "../../../solution/common/nominal.ts",
      "version": "6da5023bc256e774f9366f88c712bfc1-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};",
      "signature": "5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6da5023bc256e774f9366f88c712bfc1-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};",
        "signature": "5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "../..",
    "rootDir": "../../..",
    "skipLibCheck": true
  },
  "latestChangedDtsFile": "./nominal.d.ts",
  "size": 1347
}
//// [/home/src/workspaces/packages/lib/solution/sub-project-2/index.d.ts] *new* 
import { MyNominal } from '../sub-project/index';
declare const variable: {
    key: MyNominal;
};
export declare function getVar(): keyof typeof variable;
export {};

//// [/home/src/workspaces/packages/lib/solution/sub-project-2/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVar = getVar;
const variable = {
    key: 'value',
};
function getVar() {
    return 'key';
}

//// [/home/src/workspaces/packages/lib/solution/sub-project-2/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"fileNames":["lib.d.ts","../common/nominal.d.ts","../sub-project/index.d.ts","../../../solution/sub-project-2/index.ts"],"fileInfos":[{"version":"24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n","ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",{"version":"8d7f0cd34ff9cb954b00662137820b98-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}","signature":"d3fc4bf12d5f8dfcac4dd45791e378ef-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/packages/lib/solution/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../../solution/sub-project-2/index.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../common/nominal.d.ts",
    "../sub-project/index.d.ts",
    "../../../solution/sub-project-2/index.ts"
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
      "version": "5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "signature": "5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../sub-project/index.d.ts",
      "version": "ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
      "signature": "ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../../solution/sub-project-2/index.ts",
      "version": "8d7f0cd34ff9cb954b00662137820b98-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}",
      "signature": "d3fc4bf12d5f8dfcac4dd45791e378ef-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8d7f0cd34ff9cb954b00662137820b98-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}",
        "signature": "d3fc4bf12d5f8dfcac4dd45791e378ef-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n",
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
    "composite": true,
    "outDir": "../..",
    "rootDir": "../../..",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../sub-project/index.d.ts": [
      "../common/nominal.d.ts"
    ],
    "../../../solution/sub-project-2/index.ts": [
      "../sub-project/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1893
}
//// [/home/src/workspaces/packages/lib/solution/sub-project/index.d.ts] *new* 
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;

//// [/home/src/workspaces/packages/lib/solution/sub-project/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/packages/lib/solution/sub-project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","../common/nominal.d.ts","../../../solution/sub-project/index.ts"],"fileInfos":[{"version":"24b4796cd50d1a9aabad1583878c494d-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    readonly species: symbol;\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",{"version":"17fb8188dac0968c390031165ecd45b6-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;","signature":"ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/packages/lib/solution/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../../../solution/sub-project/index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../common/nominal.d.ts",
    "../../../solution/sub-project/index.ts"
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
      "version": "5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "signature": "5e7f6e0ebb82be49de355c8db93969fe-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../../../solution/sub-project/index.ts",
      "version": "17fb8188dac0968c390031165ecd45b6-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;",
      "signature": "ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "17fb8188dac0968c390031165ecd45b6-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;",
        "signature": "ba931f9684d9e8eb38e02da33050dc55-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
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
    "composite": true,
    "outDir": "../..",
    "rootDir": "../../..",
    "skipLibCheck": true
  },
  "referencedMap": {
    "../../../solution/sub-project/index.ts": [
      "../common/nominal.d.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1563
}

solution/common/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/packages/solution/common/nominal.ts
Signatures::
(stored at emit) /home/src/workspaces/packages/solution/common/nominal.ts

solution/sub-project/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/packages/lib/solution/common/nominal.d.ts
*refresh*    /home/src/workspaces/packages/solution/sub-project/index.ts
Signatures::
(stored at emit) /home/src/workspaces/packages/solution/sub-project/index.ts

solution/sub-project-2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/packages/lib/solution/common/nominal.d.ts
*refresh*    /home/src/workspaces/packages/lib/solution/sub-project/index.d.ts
*refresh*    /home/src/workspaces/packages/solution/sub-project-2/index.ts
Signatures::
(stored at emit) /home/src/workspaces/packages/solution/sub-project-2/index.ts
