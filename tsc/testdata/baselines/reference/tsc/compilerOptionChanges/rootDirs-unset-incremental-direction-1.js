currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/generated/factory.ts] *new* 
import { Thing } from './thing';
export function make() { return new Thing(); }

//// [/home/src/workspaces/project/producer/generated/thing.ts] *new* 
export class Thing { private field = 1; }

//// [/home/src/workspaces/project/producer/src/index.ts] *new* 
import { make } from '../generated/factory';
export const result = make();

//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rootDir": ".",
        "rootDirs": [
            "./src",
            "./generated"
        ],
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "generated/factory.ts",
        "generated/thing.ts",
        "src/index.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/producer/dist/generated/thing.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/generated/factory.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/src/index.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo
//// [/home/src/tslibs/TS/Lib/lib.es2020.d.ts] *Lib*
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
//// [/home/src/workspaces/project/producer/dist/generated/factory.d.ts] *new* 
import { Thing } from './thing';
export declare function make(): Thing;

//// [/home/src/workspaces/project/producer/dist/generated/thing.d.ts] *new* 
export declare class Thing {
    private field;
}

//// [/home/src/workspaces/project/producer/dist/src/index.d.ts] *new* 
export declare const result: import("./thing").Thing;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2020.d.ts","../generated/thing.ts","../generated/factory.ts","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n","signature":"fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n","signature":"8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n","impliedNodeFormat":1},{"version":"2e3d71cdddb13c604565f74d13e4d8aa-import { make } from '../generated/factory';\nexport const result = make();\n","signature":"b9864d32407f7f094d6860218dc805f5-export declare const result: import(\"./thing\").Thing;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","rootDirs":["../src","../generated"],"strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./src/index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../generated/thing.ts",
        "../generated/factory.ts",
        "../src/index.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../generated/thing.ts",
    "../generated/factory.ts",
    "../src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../generated/thing.ts",
      "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
      "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
        "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../generated/factory.ts",
      "version": "ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n",
      "signature": "8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n",
        "signature": "8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/index.ts",
      "version": "2e3d71cdddb13c604565f74d13e4d8aa-import { make } from '../generated/factory';\nexport const result = make();\n",
      "signature": "b9864d32407f7f094d6860218dc805f5-export declare const result: import(\"./thing\").Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2e3d71cdddb13c604565f74d13e4d8aa-import { make } from '../generated/factory';\nexport const result = make();\n",
        "signature": "b9864d32407f7f094d6860218dc805f5-export declare const result: import(\"./thing\").Thing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../generated/thing.ts"
    ],
    [
      "../generated/factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "outDir": "./",
    "rootDir": "..",
    "rootDirs": [
      "../src",
      "../generated"
    ],
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../generated/factory.ts": [
      "../generated/thing.ts"
    ],
    "../src/index.ts": [
      "../generated/factory.ts"
    ]
  },
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1963
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/generated/thing.ts
*refresh*    /home/src/workspaces/project/producer/generated/factory.ts
*refresh*    /home/src/workspaces/project/producer/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/generated/thing.ts
(stored at emit) /home/src/workspaces/project/producer/generated/factory.ts
(stored at emit) /home/src/workspaces/project/producer/src/index.ts


Edit [0]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: change rootDirs without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
        ],
        "module": "esnext",
        "moduleResolution": "bundler",
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "generated/factory.ts",
        "generated/thing.ts",
        "src/index.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/producer/dist/src/index.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo
//// [/home/src/workspaces/project/producer/dist/src/index.d.ts] *modified* 
export declare const result: import("../generated/thing").Thing;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2020.d.ts","../generated/thing.ts","../generated/factory.ts","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n","signature":"fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n","signature":"8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n","impliedNodeFormat":1},{"version":"2e3d71cdddb13c604565f74d13e4d8aa-import { make } from '../generated/factory';\nexport const result = make();\n","signature":"f6655abf00ee64b0f2ddd0df13f3dab8-export declare const result: import(\"../generated/thing\").Thing;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./src/index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../generated/thing.ts",
        "../generated/factory.ts",
        "../src/index.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../generated/thing.ts",
    "../generated/factory.ts",
    "../src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2020.d.ts",
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
      "fileName": "../generated/thing.ts",
      "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
      "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
        "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../generated/factory.ts",
      "version": "ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n",
      "signature": "8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "ca900e2385cd189084934dd47c6733af-import { Thing } from './thing';\nexport function make() { return new Thing(); }\n",
        "signature": "8541230877a83bcc0999fabcf92106a2-import { Thing } from './thing';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/index.ts",
      "version": "2e3d71cdddb13c604565f74d13e4d8aa-import { make } from '../generated/factory';\nexport const result = make();\n",
      "signature": "f6655abf00ee64b0f2ddd0df13f3dab8-export declare const result: import(\"../generated/thing\").Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2e3d71cdddb13c604565f74d13e4d8aa-import { make } from '../generated/factory';\nexport const result = make();\n",
        "signature": "f6655abf00ee64b0f2ddd0df13f3dab8-export declare const result: import(\"../generated/thing\").Thing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../generated/thing.ts"
    ],
    [
      "../generated/factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../generated/factory.ts": [
      "../generated/thing.ts"
    ],
    "../src/index.ts": [
      "../generated/factory.ts"
    ]
  },
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1937
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/generated/thing.ts
*refresh*    /home/src/workspaces/project/producer/generated/factory.ts
*refresh*    /home/src/workspaces/project/producer/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/src/index.ts


Edit [2]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: force rebuild with the same compiler options

tsgo --build producer --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/generated/factory.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/generated/thing.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/src/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/generated/thing.ts
*refresh*    /home/src/workspaces/project/producer/generated/factory.ts
*refresh*    /home/src/workspaces/project/producer/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/generated/thing.ts
(stored at emit) /home/src/workspaces/project/producer/generated/factory.ts
(stored at emit) /home/src/workspaces/project/producer/src/index.ts


Edit [4]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::
