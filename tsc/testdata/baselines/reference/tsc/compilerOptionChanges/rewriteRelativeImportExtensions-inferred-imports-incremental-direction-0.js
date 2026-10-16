currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/factory.ts] *new* 
import { Thing } from './thing.js';
export function make() { return new Thing(); }

//// [/home/src/workspaces/project/producer/index.ts] *new* 
import { make } from './factory.js';
export const result = make();

//// [/home/src/workspaces/project/producer/package.json] *new* 
{"type":"module"}
//// [/home/src/workspaces/project/producer/thing.ts] *new* 
export class Thing { private field = 1; }

//// [/home/src/workspaces/project/producer/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
        ],
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "outDir": "dist",
        "rewriteRelativeImportExtensions": false,
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "factory.ts",
        "index.ts",
        "thing.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/producer/dist/thing.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/factory.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/index.d.ts
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
import { Thing } from './thing.js';
export declare function make(): Thing;

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
export declare const result: import("./thing.js").Thing;

//// [/home/src/workspaces/project/producer/dist/thing.d.ts] *new* 
export declare class Thing {
    private field;
}

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"packageJsons":["../package.json"],"fileNames":["lib.es2020.d.ts","../thing.ts","../factory.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n","signature":"fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n","impliedNodeFormat":99},{"version":"dd2e8d4c1148f51c7efb307face642f8-import { Thing } from './thing.js';\nexport function make() { return new Thing(); }\n","signature":"1b49f9db00ddcf69ab95a92a747ca3d2-import { Thing } from './thing.js';\nexport declare function make(): Thing;\n","impliedNodeFormat":99},{"version":"0856d4e5ab9a4eea8790557855fd2eb4-import { make } from './factory.js';\nexport const result = make();\n","signature":"68712344c485b50d4e58f0f644a45e17-export declare const result: import(\"./thing.js\").Thing;\n","impliedNodeFormat":99}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":199,"moduleResolution":99,"outDir":"./","rewriteRelativeImportExtensions":false,"rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../thing.ts",
        "../factory.ts",
        "../index.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "packageJsons": [
    "../package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../thing.ts",
    "../factory.ts",
    "../index.ts"
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
      "fileName": "../thing.ts",
      "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
      "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
        "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../factory.ts",
      "version": "dd2e8d4c1148f51c7efb307face642f8-import { Thing } from './thing.js';\nexport function make() { return new Thing(); }\n",
      "signature": "1b49f9db00ddcf69ab95a92a747ca3d2-import { Thing } from './thing.js';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "dd2e8d4c1148f51c7efb307face642f8-import { Thing } from './thing.js';\nexport function make() { return new Thing(); }\n",
        "signature": "1b49f9db00ddcf69ab95a92a747ca3d2-import { Thing } from './thing.js';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../index.ts",
      "version": "0856d4e5ab9a4eea8790557855fd2eb4-import { make } from './factory.js';\nexport const result = make();\n",
      "signature": "68712344c485b50d4e58f0f644a45e17-export declare const result: import(\"./thing.js\").Thing;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "0856d4e5ab9a4eea8790557855fd2eb4-import { make } from './factory.js';\nexport const result = make();\n",
        "signature": "68712344c485b50d4e58f0f644a45e17-export declare const result: import(\"./thing.js\").Thing;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../thing.ts"
    ],
    [
      "../factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 199,
    "moduleResolution": 99,
    "outDir": "./",
    "rewriteRelativeImportExtensions": false,
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../factory.ts": [
      "../thing.ts"
    ],
    "../index.ts": [
      "../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1977
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/thing.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/thing.ts
(stored at emit) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [0]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: change rewriteRelativeImportExtensions without changing source files
//// [/home/src/workspaces/project/producer/tsconfig.json] *modified* 
{
    "compilerOptions": {
        "composite": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "lib": [
            "es2020"
        ],
        "module": "nodenext",
        "moduleResolution": "nodenext",
        "outDir": "dist",
        "rewriteRelativeImportExtensions": true,
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "factory.ts",
        "index.ts",
        "thing.ts"
    ]
}

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::
TSFILE: /home/src/workspaces/project/producer/dist/index.d.ts
TSFILE: /home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo
//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
export declare const result: import("./thing.ts").Thing;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"packageJsons":["../package.json"],"fileNames":["lib.es2020.d.ts","../thing.ts","../factory.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n","signature":"fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n","impliedNodeFormat":99},{"version":"dd2e8d4c1148f51c7efb307face642f8-import { Thing } from './thing.js';\nexport function make() { return new Thing(); }\n","signature":"1b49f9db00ddcf69ab95a92a747ca3d2-import { Thing } from './thing.js';\nexport declare function make(): Thing;\n","impliedNodeFormat":99},{"version":"0856d4e5ab9a4eea8790557855fd2eb4-import { make } from './factory.js';\nexport const result = make();\n","signature":"1acc417b9e47816f05fd26619d1e5931-export declare const result: import(\"./thing.ts\").Thing;\n","impliedNodeFormat":99}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":199,"moduleResolution":99,"outDir":"./","rewriteRelativeImportExtensions":true,"rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../thing.ts",
        "../factory.ts",
        "../index.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "packageJsons": [
    "../package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../thing.ts",
    "../factory.ts",
    "../index.ts"
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
      "fileName": "../thing.ts",
      "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
      "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "1e13636538b7ccc39e192111e556e4fd-export class Thing { private field = 1; }\n",
        "signature": "fd3b9b2da1026c3ff32025ff8ed07329-export declare class Thing {\n    private field;\n}\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../factory.ts",
      "version": "dd2e8d4c1148f51c7efb307face642f8-import { Thing } from './thing.js';\nexport function make() { return new Thing(); }\n",
      "signature": "1b49f9db00ddcf69ab95a92a747ca3d2-import { Thing } from './thing.js';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "dd2e8d4c1148f51c7efb307face642f8-import { Thing } from './thing.js';\nexport function make() { return new Thing(); }\n",
        "signature": "1b49f9db00ddcf69ab95a92a747ca3d2-import { Thing } from './thing.js';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../index.ts",
      "version": "0856d4e5ab9a4eea8790557855fd2eb4-import { make } from './factory.js';\nexport const result = make();\n",
      "signature": "1acc417b9e47816f05fd26619d1e5931-export declare const result: import(\"./thing.ts\").Thing;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "0856d4e5ab9a4eea8790557855fd2eb4-import { make } from './factory.js';\nexport const result = make();\n",
        "signature": "1acc417b9e47816f05fd26619d1e5931-export declare const result: import(\"./thing.ts\").Thing;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../thing.ts"
    ],
    [
      "../factory.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 199,
    "moduleResolution": 99,
    "outDir": "./",
    "rewriteRelativeImportExtensions": true,
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../factory.ts": [
      "../thing.ts"
    ],
    "../index.ts": [
      "../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1976
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/thing.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
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
//// [/home/src/workspaces/project/producer/dist/thing.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/thing.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/thing.ts
(stored at emit) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [4]:: no change

tsgo --project producer --listEmittedFiles
ExitStatus:: Success
Output::

producer/tsconfig.json::
SemanticDiagnostics::
Signatures::
