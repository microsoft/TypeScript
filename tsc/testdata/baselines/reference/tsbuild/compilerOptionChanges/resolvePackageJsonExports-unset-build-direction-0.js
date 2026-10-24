currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/producer/factory.ts] *new* 
import { Thing } from './node_modules/fixture/deep/nested/thing';
export function make() { return new Thing(); }

//// [/home/src/workspaces/project/producer/index.ts] *new* 
import { make } from './factory';
export const result = make();

//// [/home/src/workspaces/project/producer/node_modules/fixture/deep/nested/thing.d.ts] *new* 
export class Thing { private field; }

//// [/home/src/workspaces/project/producer/node_modules/fixture/package.json] *new* 
{"name":"fixture","version":"1.0.0","exports":{"./short":"./deep/nested/thing.d.ts"}}
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
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts",
        "factory.ts"
    ]
}

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output file 'producer/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

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
import { Thing } from './node_modules/fixture/deep/nested/thing';
export declare function make(): Thing;

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *new* 
export declare const result: import("fixture/short").Thing;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[3,4]],"packageJsons":["../node_modules/fixture/package.json"],"missingPackageJsons":["../node_modules/fixture/deep/nested/package.json","../node_modules/fixture/deep/package.json"],"fileNames":["lib.es2020.d.ts","../node_modules/fixture/deep/nested/thing.d.ts","../factory.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"14b959b7c1426379d9c9483c8924f786-export class Thing { private field; }\n",{"version":"1c3544c2137ceb05c0e3a709e39b0251-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport function make() { return new Thing(); }\n","signature":"3b91953d8c4580034dbf6faaa4bf358f-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport declare function make(): Thing;\n","impliedNodeFormat":1},{"version":"b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n","signature":"a76c5ac59fea9a118a741ac2712eeb42-export declare const result: import(\"fixture/short\").Thing;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../factory.ts",
        "../index.ts"
      ],
      "original": [
        3,
        4
      ]
    }
  ],
  "packageJsons": [
    "../node_modules/fixture/package.json"
  ],
  "missingPackageJsons": [
    "../node_modules/fixture/deep/nested/package.json",
    "../node_modules/fixture/deep/package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../node_modules/fixture/deep/nested/thing.d.ts",
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
      "fileName": "../node_modules/fixture/deep/nested/thing.d.ts",
      "version": "14b959b7c1426379d9c9483c8924f786-export class Thing { private field; }\n",
      "signature": "14b959b7c1426379d9c9483c8924f786-export class Thing { private field; }\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../factory.ts",
      "version": "1c3544c2137ceb05c0e3a709e39b0251-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport function make() { return new Thing(); }\n",
      "signature": "3b91953d8c4580034dbf6faaa4bf358f-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1c3544c2137ceb05c0e3a709e39b0251-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport function make() { return new Thing(); }\n",
        "signature": "3b91953d8c4580034dbf6faaa4bf358f-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
      "signature": "a76c5ac59fea9a118a741ac2712eeb42-export declare const result: import(\"fixture/short\").Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
        "signature": "a76c5ac59fea9a118a741ac2712eeb42-export declare const result: import(\"fixture/short\").Thing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/fixture/deep/nested/thing.d.ts"
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
    "outDir": "./",
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../factory.ts": [
      "../node_modules/fixture/deep/nested/thing.d.ts"
    ],
    "../index.ts": [
      "../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2030
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/fixture/deep/nested/thing.d.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [0]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'




Edit [1]:: change resolvePackageJsonExports without changing source files
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
        "resolvePackageJsonExports": false,
        "rootDir": ".",
        "strict": true,
        "target": "es2020"
    },
    "files": [
        "index.ts",
        "factory.ts"
    ]
}

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is out of date because output 'producer/dist/tsconfig.tsbuildinfo' is older than input 'producer/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project 'producer/tsconfig.json'...

//// [/home/src/workspaces/project/producer/dist/index.d.ts] *modified* 
export declare const result: import("fixture/deep/nested/thing").Thing;

//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[3,4]],"packageJsons":["../node_modules/fixture/package.json"],"missingPackageJsons":["../node_modules/fixture/deep/nested/package.json","../node_modules/fixture/deep/package.json"],"fileNames":["lib.es2020.d.ts","../node_modules/fixture/deep/nested/thing.d.ts","../factory.ts","../index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"14b959b7c1426379d9c9483c8924f786-export class Thing { private field; }\n",{"version":"1c3544c2137ceb05c0e3a709e39b0251-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport function make() { return new Thing(); }\n","signature":"3b91953d8c4580034dbf6faaa4bf358f-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport declare function make(): Thing;\n","impliedNodeFormat":1},{"version":"b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n","signature":"4d7c19addc59507abc15460c85403172-export declare const result: import(\"fixture/deep/nested/thing\").Thing;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true,"declaration":true,"module":99,"moduleResolution":100,"outDir":"./","resolvePackageJsonExports":false,"rootDir":"..","strict":true,"target":7},"referencedMap":[[3,1],[4,2]],"latestChangedDtsFile":"./index.d.ts"}
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../factory.ts",
        "../index.ts"
      ],
      "original": [
        3,
        4
      ]
    }
  ],
  "packageJsons": [
    "../node_modules/fixture/package.json"
  ],
  "missingPackageJsons": [
    "../node_modules/fixture/deep/nested/package.json",
    "../node_modules/fixture/deep/package.json"
  ],
  "fileNames": [
    "lib.es2020.d.ts",
    "../node_modules/fixture/deep/nested/thing.d.ts",
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
      "fileName": "../node_modules/fixture/deep/nested/thing.d.ts",
      "version": "14b959b7c1426379d9c9483c8924f786-export class Thing { private field; }\n",
      "signature": "14b959b7c1426379d9c9483c8924f786-export class Thing { private field; }\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../factory.ts",
      "version": "1c3544c2137ceb05c0e3a709e39b0251-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport function make() { return new Thing(); }\n",
      "signature": "3b91953d8c4580034dbf6faaa4bf358f-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport declare function make(): Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1c3544c2137ceb05c0e3a709e39b0251-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport function make() { return new Thing(); }\n",
        "signature": "3b91953d8c4580034dbf6faaa4bf358f-import { Thing } from './node_modules/fixture/deep/nested/thing';\nexport declare function make(): Thing;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../index.ts",
      "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
      "signature": "4d7c19addc59507abc15460c85403172-export declare const result: import(\"fixture/deep/nested/thing\").Thing;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b279346232fdfce139138519c257ae08-import { make } from './factory';\nexport const result = make();\n",
        "signature": "4d7c19addc59507abc15460c85403172-export declare const result: import(\"fixture/deep/nested/thing\").Thing;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../node_modules/fixture/deep/nested/thing.d.ts"
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
    "outDir": "./",
    "resolvePackageJsonExports": false,
    "rootDir": "..",
    "strict": true,
    "target": 7
  },
  "referencedMap": {
    "../factory.ts": [
      "../node_modules/fixture/deep/nested/thing.d.ts"
    ],
    "../index.ts": [
      "../factory.ts"
    ]
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 2076
}

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/fixture/deep/nested/thing.d.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [2]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'




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
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/project/producer/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *rewrite with same content*

producer/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2020.d.ts
*refresh*    /home/src/workspaces/project/producer/node_modules/fixture/deep/nested/thing.d.ts
*refresh*    /home/src/workspaces/project/producer/factory.ts
*refresh*    /home/src/workspaces/project/producer/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/producer/factory.ts
(stored at emit) /home/src/workspaces/project/producer/index.ts


Edit [4]:: no change

tsgo --build producer --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * producer/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'producer/tsconfig.json' is up to date because newest input 'producer/index.ts' is older than output 'producer/dist/tsconfig.tsbuildinfo'


