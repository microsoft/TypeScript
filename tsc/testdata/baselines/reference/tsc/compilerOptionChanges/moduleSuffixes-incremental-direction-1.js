currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/factory.ts] *new* 
import { Value } from './input';
export function make() { return new Value(); }

//// [/home/src/workspaces/project/producer/index.ts] *new* 
import { make } from './factory';
export const result = make();

//// [/home/src/workspaces/project/producer/input.native.ts] *new* 
export class Value { private field = 2; }

//// [/home/src/workspaces/project/producer/input.ts] *new* 
export class Value { private field = 1; }

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
        "moduleSuffixes": [
            ".native",
            ""
        ],
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "factory.ts",
        "index.ts",
        "input.native.ts",
        "input.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/producer/dist/input.native.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/factory.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/index.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/input.d.ts
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
//// [/home/src/workspaces/project/producer/dist/factory.d.ts] *new* 
import { Value } from './input';
export declare function make(): Value;

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
export declare const result: import("./input.native").Value;

//// [/home/src/workspaces/project/producer/dist/input.d.ts] *new* 
export declare class Value {
    private field;
}

//// [/home/src/workspaces/project/producer/dist/input.native.d.ts] *new* 
export declare class Value {
    private field;
}

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2020.d.ts","../input.native.ts","../factory.ts","../index.ts","../input.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n","signature":"00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n","signature":"db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n","impliedNodeFormat":1},{"version":"b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n","signature":"075e9983d4f80c5c54574c3ca99e8023-export declare const result: import(\"./input.native\").Value;\n","impliedNodeFormat":1},{"version":"474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n","signature":"00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"moduleSuffixes":[".native",""],"outDir":"./","rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./input.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../input.native.ts",
        "../factory.ts",
        "../index.ts",
        "../input.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../input.native.ts",
    "../factory.ts",
    "../index.ts",
    "../input.ts"
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
      "fileName": "../input.native.ts",
      "version": "97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n",
      "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n",
        "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../factory.ts",
      "version": "5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n",
      "signature": "db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n",
        "signature": "db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
      "signature": "075e9983d4f80c5c54574c3ca99e8023-export declare const result: import(\"./input.native\").Value;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
        "signature": "075e9983d4f80c5c54574c3ca99e8023-export declare const result: import(\"./input.native\").Value;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../input.ts",
      "version": "474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n",
      "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n",
        "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../input.native.ts"
    ],
    [
      "../factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "moduleSuffixes": [
      ".native",
      ""
    ],
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../factory.ts": [
      "../input.native.ts"
    ],
    "../index.ts": [
      "../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./input.d.ts",
  "size": 2161
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/input.native.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
*refresh*    /home/src/workspaces/project/producer/input.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/input.native.ts
(stored at emit) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts
(stored at emit) /home/src/workspaces/project/producer/input.ts


Edit [0]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: change moduleSuffixes without changing source files
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
        "moduleSuffixes": [
            "",
            ".native"
        ],
        "outDir": "dist",
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "factory.ts",
        "index.ts",
        "input.native.ts",
        "input.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/producer/dist/index.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
export declare const result: import("./input").Value;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2020.d.ts","../input.ts","../factory.ts","../index.ts","../input.native.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n","signature":"00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n","signature":"db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n","impliedNodeFormat":1},{"version":"b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n","signature":"8e3c9c0b7b76f1841ce98f92678a7b3a-export declare const result: import(\"./input\").Value;\n","impliedNodeFormat":1},{"version":"97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n","signature":"00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"moduleSuffixes":["",".native"],"outDir":"./","rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../input.ts",
        "../factory.ts",
        "../index.ts",
        "../input.native.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../input.ts",
    "../factory.ts",
    "../index.ts",
    "../input.native.ts"
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
      "fileName": "../input.ts",
      "version": "474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n",
      "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n",
        "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../factory.ts",
      "version": "5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n",
      "signature": "db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n",
        "signature": "db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
      "signature": "8e3c9c0b7b76f1841ce98f92678a7b3a-export declare const result: import(\"./input\").Value;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
        "signature": "8e3c9c0b7b76f1841ce98f92678a7b3a-export declare const result: import(\"./input\").Value;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../input.native.ts",
      "version": "97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n",
      "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n",
        "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../input.ts"
    ],
    [
      "../factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "moduleSuffixes": [
      "",
      ".native"
    ],
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../factory.ts": [
      "../input.ts"
    ],
    "../index.ts": [
      "../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2154
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/input.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
*refresh*    /home/src/workspaces/project/producer/input.native.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


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

//// [/home/src/workspaces/project/producer/dist/factory.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/input.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/input.native.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2020.d.ts","../input.ts","../factory.ts","../index.ts","../input.native.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n","signature":"00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n","impliedNodeFormat":1},{"version":"5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n","signature":"db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n","impliedNodeFormat":1},{"version":"b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n","signature":"8e3c9c0b7b76f1841ce98f92678a7b3a-export declare const result: import(\"./input\").Value;\n","impliedNodeFormat":1},{"version":"97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n","signature":"00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"moduleSuffixes":["",".native"],"outDir":"./","rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./input.native.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../input.ts",
        "../factory.ts",
        "../index.ts",
        "../input.native.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../input.ts",
    "../factory.ts",
    "../index.ts",
    "../input.native.ts"
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
      "fileName": "../input.ts",
      "version": "474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n",
      "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "474fe61e4fddacef3d4948299344c4be-export class Value { private field = 1; }\n",
        "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../factory.ts",
      "version": "5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n",
      "signature": "db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5091fd799d8a0c70b7255ea4f619ddb2-import { Value } from './input';\nexport function make() { return new Value(); }\n",
        "signature": "db83e15779ba9970d00c5e8e0f07e4cb-import { Value } from './input';\nexport declare function make(): Value;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
      "signature": "8e3c9c0b7b76f1841ce98f92678a7b3a-export declare const result: import(\"./input\").Value;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
        "signature": "8e3c9c0b7b76f1841ce98f92678a7b3a-export declare const result: import(\"./input\").Value;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../input.native.ts",
      "version": "97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n",
      "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "97a4c588c85b904c8a87bae13c026449-export class Value { private field = 2; }\n",
        "signature": "00655aa7021cd4d256a5a52569a66254-export declare class Value {\n    private field;\n}\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../input.ts"
    ],
    [
      "../factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 99,
    "moduleResolution": 100,
    "moduleSuffixes": [
      "",
      ".native"
    ],
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../factory.ts": [
      "../input.ts"
    ],
    "../index.ts": [
      "../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./input.native.d.ts",
  "size": 2161
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/input.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
*refresh*    /home/src/workspaces/project/producer/input.native.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/input.ts
(stored at emit) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts
(stored at emit) /home/src/workspaces/project/producer/input.native.ts


Edit [4]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::
