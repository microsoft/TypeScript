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
export declare const currentStage: () => import("c").Current;
//// [/home/src/workspaces/project/b/node_modules/c] -> /home/src/workspaces/project/c *new*
//// [/home/src/workspaces/project/b/package.json] *new* 
{"name":"b","version":"1.0.0","type":"module","types":"./index.d.ts","dependencies":{"c":"1.0.0"}}
//// [/home/src/workspaces/project/c/index.d.ts] *new* 
export interface Current { readonly stage: string }
export declare const current: Current;
//// [/home/src/workspaces/project/c/package.json] *new* 
{"name":"c","version":"1.0.0","type":"module","types":"./index.d.ts"}

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
export declare const stage: import("c").Current;

//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["./package.json","../b/package.json","../c/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/index.d.ts","../b/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;","impliedNodeFormat":99},{"version":"439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;","impliedNodeFormat":99},{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"emitDeclarationOnly":true,"declaration":true,"module":199,"outDir":"./dist","rootDir":"./src","strict":true},"referencedMap":[[4,1],[3,2]],"linkedPackagesSignature":"54cba0a93d99474d375620ee2a6c342d-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}"}
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
    "../c/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/index.d.ts",
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
      "fileName": "../c/index.d.ts",
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
      "version": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
      "signature": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../b/index.d.ts"
    ],
    [
      "../c/index.d.ts"
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
      "../c/index.d.ts"
    ]
  },
  "linkedPackagesSignature": "54cba0a93d99474d375620ee2a6c342d-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}",
  "size": 2038
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/c/index.d.ts
*refresh*    /home/src/workspaces/project/b/index.d.ts
*refresh*    /home/src/workspaces/project/a/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/project/a/src/index.ts


Edit [0]:: remove c from dependencies and unlink it
//// [/home/src/workspaces/project/a/node_modules/c] *deleted*
//// [/home/src/workspaces/project/a/package.json] *modified* 
{"name":"a","version":"1.0.0","type":"module","dependencies":{"b":"1.0.0"}}

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2883: [0mThe inferred type of 'stage' cannot be named without a reference to 'Current' from '../../b/node_modules/c/index.js'. This is likely not portable. A type annotation is necessary.

[7m2[0m export const stage = currentStage();
[7m [0m [91m             ~~~~~[0m


Found 1 error in src/index.ts[90m:2[0m

//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["./package.json","../b/package.json","../c/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/index.d.ts","../b/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;","impliedNodeFormat":99},{"version":"439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;","impliedNodeFormat":99},{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"emitDeclarationOnly":true,"declaration":true,"module":199,"outDir":"./dist","rootDir":"./src","strict":true},"referencedMap":[[4,1],[3,2]],"emitDiagnosticsPerFile":[[4,[{"pos":47,"end":52,"code":2883,"category":1,"messageKey":"The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_2883","messageArgs":["stage","../../b/node_modules/c/index.js","Current"]}]]],"linkedPackagesSignature":"85a7c129ec4610ba9cc32bf3c1a41ded-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}"}
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
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/index.d.ts",
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
      "fileName": "../c/index.d.ts",
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
      "version": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
      "signature": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../b/index.d.ts"
    ],
    [
      "../c/index.d.ts"
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
      "../c/index.d.ts"
    ]
  },
  "emitDiagnosticsPerFile": [
    [
      "./src/index.ts",
      [
        {
          "pos": 47,
          "end": 52,
          "code": 2883,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_2883",
          "messageArgs": [
            "stage",
            "../../b/node_modules/c/index.js",
            "Current"
          ]
        }
      ]
    ]
  ],
  "linkedPackagesSignature": "85a7c129ec4610ba9cc32bf3c1a41ded-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}",
  "size": 2216
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2883: [0mThe inferred type of 'stage' cannot be named without a reference to 'Current' from '../../b/node_modules/c/index.js'. This is likely not portable. A type annotation is necessary.

[7m2[0m export const stage = currentStage();
[7m [0m [91m             ~~~~~[0m


Found 1 error in src/index.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: add c to dependencies and link it
//// [/home/src/workspaces/project/a/node_modules/c] -> /home/src/workspaces/project/c *new*
//// [/home/src/workspaces/project/a/package.json] *modified* 
{"name":"a","version":"1.0.0","type":"module","dependencies":{"b":"1.0.0","c":"1.0.0"}}

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/a/dist/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["./package.json","../b/package.json","../c/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/index.d.ts","../b/index.d.ts","./src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"84e857cae1dadf8646c736e92d69dd7f-export interface Current { readonly stage: string }\nexport declare const current: Current;","impliedNodeFormat":99},{"version":"439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;","impliedNodeFormat":99},{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"emitDeclarationOnly":true,"declaration":true,"module":199,"outDir":"./dist","rootDir":"./src","strict":true},"referencedMap":[[4,1],[3,2]],"linkedPackagesSignature":"54cba0a93d99474d375620ee2a6c342d-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}"}
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
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/index.d.ts",
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
      "fileName": "../c/index.d.ts",
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
      "version": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
      "signature": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "439fc1840141ec93ccca8462af32e6f0-export declare const currentStage: () => import(\"c\").Current;",
        "impliedNodeFormat": 99
      }
    },
    {
      "fileName": "./src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "signature": "620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "../b/index.d.ts"
    ],
    [
      "../c/index.d.ts"
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
      "../c/index.d.ts"
    ]
  },
  "linkedPackagesSignature": "54cba0a93d99474d375620ee2a6c342d-../b/node_modules/c -> ../c\n../b/node_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/b -> ../b\nnode_modules/b {\"type\":\"module\",\"types\":\"./index.d.ts\"}\nnode_modules/c -> ../c\nnode_modules/c {\"type\":\"module\",\"types\":\"./index.d.ts\"}",
  "size": 2038
}

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::
