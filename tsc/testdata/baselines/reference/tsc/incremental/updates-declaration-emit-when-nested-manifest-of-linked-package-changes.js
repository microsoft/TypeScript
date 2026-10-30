currentDirectory::/home/src/workspaces/project/a
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a/node_modules/b] -> /home/src/workspaces/project/b *new*
//// [/home/src/workspaces/project/a/node_modules/c] -> /home/src/workspaces/project/c *new*
//// [/home/src/workspaces/project/a/package.json] *new* 
{"name":"a","version":"1.0.0","type":"module","dependencies":{"b":"1.0.0","c":"1.0.0"}}
//// [/home/src/workspaces/project/a/src/index.ts] *new* 
import { currentStage } from "b";
export const stage = currentStage();
//// [/home/src/workspaces/project/a/tsconfig.json] *new* 
{
    "compilerOptions": {
        "incremental": true,
        "declaration": true,
        "emitDeclarationOnly": true,
        "strict": true,
        "module": "nodenext",
        "types": [],
        "rootDir": "src",
        "outDir": "dist"
    },
    "include": ["src"]
}
//// [/home/src/workspaces/project/b/index.d.ts] *new* 
export declare const currentStage: () => import("c/src/index.js").Current;
//// [/home/src/workspaces/project/b/node_modules/c] -> /home/src/workspaces/project/c *new*
//// [/home/src/workspaces/project/b/package.json] *new* 
{"name":"b","version":"1.0.0","type":"module","types":"./index.d.ts","dependencies":{"c":"1.0.0"}}
//// [/home/src/workspaces/project/c/package.json] *new* 
{"name":"c","version":"1.0.0","type":"module","types":"./src/main.d.ts"}
//// [/home/src/workspaces/project/c/src/index.d.ts] *new* 
export interface Current { readonly stage: string }
export declare const current: Current;
//// [/home/src/workspaces/project/c/src/main.d.ts] *new* 
export declare const version: string;
//// [/home/src/workspaces/project/c/src/package.json] *new* 
{"type":"module","types":"./index.d.ts"}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/a/dist/index.d.ts] *new* 
export declare const stage: import("c/src").Current;

//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["./package.json","../b/package.json","../c/package.json","../c/src/package.json"],"missingPackageJsons":["../b/node_modules/c/src/index.js/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/src/index.d.ts","../b/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;","impliedNodeFormat":99},{"version":"6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;","impliedNodeFormat":99},{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"emitDeclarationOnly":true,"declaration":true,"module":199,"outDir":"./dist","rootDir":"./src","strict":true},"referencedMap":[[4,1],[3,2]],"linkedPackagesSignature":"4c8cf170663396a8e340f345f81a7ba4-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\n../b/node_modules/c/src {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\nnode_modules/c/src {\"type\":\"module\",\"types\":\"./index.d.ts\"}"}
//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "./package.json",
    "../b/package.json",
    "../c/package.json",
    "../c/src/package.json"
  ],
  "missingPackageJsons": [
    "../b/node_modules/c/src/index.js/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/src/index.d.ts",
    "../b/index.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../c/src/index.d.ts",
      "version": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
      "signature": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../b/index.d.ts",
      "version": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
      "signature": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../b/index.d.ts"
    ],
    [
      "../c/src/index.d.ts"
    ]
  ],
  "options": {
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 199,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "referencedMap": {
    "./src/index.ts": [
      "../b/index.d.ts"
    ],
    "../b/index.d.ts": [
      "../c/src/index.d.ts"
    ]
  },
  "linkedPackagesSignature": "4c8cf170663396a8e340f345f81a7ba4-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\n../b/node_modules/c/src {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\nnode_modules/c/src {\"type\":\"module\",\"types\":\"./index.d.ts\"}",
  "size": 2304
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/c/src/index.d.ts
*refresh*    /home/src/workspaces/project/b/index.d.ts
*refresh*    /home/src/workspaces/project/a/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a/src/index.ts


Edit [0]:: point types of nested manifest of c to another entry
//// [/home/src/workspaces/project/c/src/package.json] *modified* 
{"type":"module","types":"./main.d.ts"}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a/dist/index.d.ts] *modified* 
export declare const stage: import("c/src/index.js").Current;

//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["./package.json","../b/package.json","../c/package.json","../c/src/package.json"],"missingPackageJsons":["../b/node_modules/c/src/index.js/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/src/index.d.ts","../b/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;","impliedNodeFormat":99},{"version":"6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;","impliedNodeFormat":99},{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"emitDeclarationOnly":true,"declaration":true,"module":199,"outDir":"./dist","rootDir":"./src","strict":true},"referencedMap":[[4,1],[3,2]],"linkedPackagesSignature":"1f5adfbd9b1c3b6a42b38bb2305c4de5-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\n../b/node_modules/c/src {\"type\":\"module\",\"types\":\"./main.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\nnode_modules/c/src {\"type\":\"module\",\"types\":\"./main.d.ts\"}"}
//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "./package.json",
    "../b/package.json",
    "../c/package.json",
    "../c/src/package.json"
  ],
  "missingPackageJsons": [
    "../b/node_modules/c/src/index.js/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/src/index.d.ts",
    "../b/index.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../c/src/index.d.ts",
      "version": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
      "signature": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../b/index.d.ts",
      "version": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
      "signature": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../b/index.d.ts"
    ],
    [
      "../c/src/index.d.ts"
    ]
  ],
  "options": {
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 199,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "referencedMap": {
    "./src/index.ts": [
      "../b/index.d.ts"
    ],
    "../b/index.d.ts": [
      "../c/src/index.d.ts"
    ]
  },
  "linkedPackagesSignature": "1f5adfbd9b1c3b6a42b38bb2305c4de5-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\n../b/node_modules/c/src {\"type\":\"module\",\"types\":\"./main.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\nnode_modules/c/src {\"type\":\"module\",\"types\":\"./main.d.ts\"}",
  "size": 2302
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: remove nested manifest of c
//// [/home/src/workspaces/project/c/src/package.json] *deleted*

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["./package.json","../b/package.json","../c/package.json"],"missingPackageJsons":["./node_modules/c/src/package.json","../b/node_modules/c/src/index.js/package.json","../b/node_modules/c/src/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/src/index.d.ts","../b/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;","impliedNodeFormat":99},{"version":"6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;","impliedNodeFormat":99},{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"emitDeclarationOnly":true,"declaration":true,"module":199,"outDir":"./dist","rootDir":"./src","strict":true},"referencedMap":[[4,1],[3,2]],"linkedPackagesSignature":"94001de7409671daa9d6ca818aa1e841-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}"}
//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "./package.json",
    "../b/package.json",
    "../c/package.json"
  ],
  "missingPackageJsons": [
    "./node_modules/c/src/package.json",
    "../b/node_modules/c/src/index.js/package.json",
    "../b/node_modules/c/src/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/src/index.d.ts",
    "../b/index.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../c/src/index.d.ts",
      "version": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
      "signature": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../b/index.d.ts",
      "version": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
      "signature": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../b/index.d.ts"
    ],
    [
      "../c/src/index.d.ts"
    ]
  ],
  "options": {
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 199,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "referencedMap": {
    "./src/index.ts": [
      "../b/index.d.ts"
    ],
    "../b/index.d.ts": [
      "../c/src/index.d.ts"
    ]
  },
  "linkedPackagesSignature": "94001de7409671daa9d6ca818aa1e841-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}",
  "size": 2212
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: add nested manifest of c pointing types to index
//// [/home/src/workspaces/project/c/src/package.json] *new* 
{"type":"module","types":"./index.d.ts"}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a/dist/index.d.ts] *modified* 
export declare const stage: import("c/src").Current;

//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["./package.json","../b/package.json","../c/package.json","../c/src/package.json"],"missingPackageJsons":["../b/node_modules/c/src/index.js/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/src/index.d.ts","../b/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;","impliedNodeFormat":99},{"version":"6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;","impliedNodeFormat":99},{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"emitDeclarationOnly":true,"declaration":true,"module":199,"outDir":"./dist","rootDir":"./src","strict":true},"referencedMap":[[4,1],[3,2]],"linkedPackagesSignature":"4c8cf170663396a8e340f345f81a7ba4-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\n../b/node_modules/c/src {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\nnode_modules/c/src {\"type\":\"module\",\"types\":\"./index.d.ts\"}"}
//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "./package.json",
    "../b/package.json",
    "../c/package.json",
    "../c/src/package.json"
  ],
  "missingPackageJsons": [
    "../b/node_modules/c/src/index.js/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/src/index.d.ts",
    "../b/index.d.ts",
    "./src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../c/src/index.d.ts",
      "version": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
      "signature": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "../b/index.d.ts",
      "version": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
      "signature": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "6801373443a9fbb88d4f0a15537e5a4e-export declare const currentStage: () => import(\"c/src/index.js\").Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "ad7e02360e223aac24e906a837ee3856-export declare const stage: import(\"c/src\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../b/index.d.ts"
    ],
    [
      "../c/src/index.d.ts"
    ]
  ],
  "options": {
    "emitDeclarationOnly": true,
    "declaration": true,
    "module": 199,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true
  },
  "referencedMap": {
    "./src/index.ts": [
      "../b/index.d.ts"
    ],
    "../b/index.d.ts": [
      "../c/src/index.d.ts"
    ]
  },
  "linkedPackagesSignature": "4c8cf170663396a8e340f345f81a7ba4-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\n../b/node_modules/c/src {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./src/main.d.ts\"}\nnode_modules/c/src {\"type\":\"module\",\"types\":\"./index.d.ts\"}",
  "size": 2304
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [4]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::
