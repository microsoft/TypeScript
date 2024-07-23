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


//// [/src/solution/common/nominal.ts]
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};


//// [/src/solution/common/tsconfig.json]
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "composite": true
    },
    "include": ["nominal.ts"]
}

//// [/src/solution/sub-project/index.ts]
import { Nominal } from '../common/nominal';

export type MyNominal = Nominal<string, 'MyNominal'>;


//// [/src/solution/sub-project/tsconfig.json]
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

//// [/src/solution/sub-project-2/index.ts]
import { MyNominal } from '../sub-project/index';

const variable = {
    key: 'value' as MyNominal,
};

export function getVar(): keyof typeof variable {
    return 'key';
}


//// [/src/solution/sub-project-2/tsconfig.json]
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

//// [/src/solution/tsconfig.json]
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

//// [/src/tsconfig.base.json]
{
    "compilerOptions": {
        "skipLibCheck": true,
        "rootDir": "./",
        "outDir": "lib",
    }
}

//// [/src/tsconfig.json]
{
                    "compilerOptions": {
                        "composite": true
                    },
                    "references": [
                        { "path": "./solution" }
                    ],
                    "include": []
                }



Output::
/lib/tsc -b /src --verbose
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/solution/common/tsconfig.json
    * src/solution/sub-project/tsconfig.json
    * src/solution/sub-project-2/tsconfig.json
    * src/solution/tsconfig.json
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/solution/common/tsconfig.json' is out of date because output file 'src/lib/solution/common/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/solution/common/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/solution/sub-project/tsconfig.json' is out of date because output file 'src/lib/solution/sub-project/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/solution/sub-project/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'src/solution/sub-project-2/tsconfig.json' is out of date because output file 'src/lib/solution/sub-project-2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/solution/sub-project-2/tsconfig.json'...

exitCode:: ExitStatus.Success


//// [/src/lib/solution/common/nominal.d.ts]
export declare type Nominal<T, Name extends string> = T & {
    [Symbol.species]: Name;
};


//// [/src/lib/solution/common/nominal.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/lib/solution/common/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.d.ts","../../../solution/common/nominal.ts"],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n"],"root":[2],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"latestChangedDtsFile":"./nominal.d.ts","version":"FakeTSVersion"}

//// [/src/lib/solution/common/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.d.ts",
    "../../../solution/common/nominal.ts"
  ],
  "fileInfos": {
    "../../../../lib/lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "../../../solution/common/nominal.ts": {
      "version": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "signature": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n"
    }
  },
  "root": [
    [
      2,
      "../../../solution/common/nominal.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "../..",
    "rootDir": "../../..",
    "skipLibCheck": true
  },
  "latestChangedDtsFile": "./nominal.d.ts",
  "version": "FakeTSVersion",
  "size": 1058
}

//// [/src/lib/solution/sub-project/index.d.ts]
import { Nominal } from '../common/nominal';
export type MyNominal = Nominal<string, 'MyNominal'>;


//// [/src/lib/solution/sub-project/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/lib/solution/sub-project/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.d.ts","../common/nominal.d.ts","../../../solution/sub-project/index.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",{"version":"-22894055505-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n","signature":"-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n"}],"root":[3],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/src/lib/solution/sub-project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.d.ts",
    "../common/nominal.d.ts",
    "../../../solution/sub-project/index.ts"
  ],
  "fileIdsList": [
    [
      "../common/nominal.d.ts"
    ]
  ],
  "fileInfos": {
    "../../../../lib/lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "../common/nominal.d.ts": {
      "version": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "signature": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n"
    },
    "../../../solution/sub-project/index.ts": {
      "original": {
        "version": "-22894055505-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
        "signature": "-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n"
      },
      "version": "-22894055505-import { Nominal } from '../common/nominal';\n\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
      "signature": "-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n"
    }
  },
  "root": [
    [
      3,
      "../../../solution/sub-project/index.ts"
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
  "version": "FakeTSVersion",
  "size": 1388
}

//// [/src/lib/solution/sub-project-2/index.d.ts]
import { MyNominal } from '../sub-project/index';
declare const variable: {
    key: MyNominal;
};
export declare function getVar(): keyof typeof variable;
export {};


//// [/src/lib/solution/sub-project-2/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVar = getVar;
var variable = {
    key: 'value',
};
function getVar() {
    return 'key';
}


//// [/src/lib/solution/sub-project-2/tsconfig.tsbuildinfo]
{"fileNames":["../../../../lib/lib.d.ts","../common/nominal.d.ts","../sub-project/index.d.ts","../../../solution/sub-project-2/index.ts"],"fileIdsList":[[2],[3]],"fileInfos":[{"version":"-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n","affectsGlobalScope":true},"-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n","-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",{"version":"-13939373533-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}\n","signature":"-20490736360-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n"}],"root":[4],"options":{"composite":true,"outDir":"../..","rootDir":"../../..","skipLibCheck":true},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts","version":"FakeTSVersion"}

//// [/src/lib/solution/sub-project-2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../lib/lib.d.ts",
    "../common/nominal.d.ts",
    "../sub-project/index.d.ts",
    "../../../solution/sub-project-2/index.ts"
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
    "../../../../lib/lib.d.ts": {
      "original": {
        "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
        "affectsGlobalScope": true
      },
      "version": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "signature": "-32082413277-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n",
      "affectsGlobalScope": true
    },
    "../common/nominal.d.ts": {
      "version": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n",
      "signature": "-24498031910-export declare type Nominal<T, Name extends string> = T & {\n    [Symbol.species]: Name;\n};\n"
    },
    "../sub-project/index.d.ts": {
      "version": "-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n",
      "signature": "-25703752603-import { Nominal } from '../common/nominal';\nexport type MyNominal = Nominal<string, 'MyNominal'>;\n"
    },
    "../../../solution/sub-project-2/index.ts": {
      "original": {
        "version": "-13939373533-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}\n",
        "signature": "-20490736360-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n"
      },
      "version": "-13939373533-import { MyNominal } from '../sub-project/index';\n\nconst variable = {\n    key: 'value' as MyNominal,\n};\n\nexport function getVar(): keyof typeof variable {\n    return 'key';\n}\n",
      "signature": "-20490736360-import { MyNominal } from '../sub-project/index';\ndeclare const variable: {\n    key: MyNominal;\n};\nexport declare function getVar(): keyof typeof variable;\nexport {};\n"
    }
  },
  "root": [
    [
      4,
      "../../../solution/sub-project-2/index.ts"
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
  "version": "FakeTSVersion",
  "size": 1698
}

