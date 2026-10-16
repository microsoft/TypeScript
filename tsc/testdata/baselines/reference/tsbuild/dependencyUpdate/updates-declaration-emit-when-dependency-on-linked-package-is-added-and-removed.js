currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/a/node_modules/b] -> /home/src/workspaces/solution/b *new*
//// [/home/src/workspaces/solution/a/node_modules/c] -> /home/src/workspaces/solution/c *new*
//// [/home/src/workspaces/solution/a/package.json] *new* 
{"name":"a","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{"b":"1.0.0"}}
//// [/home/src/workspaces/solution/a/src/index.ts] *new* 
import { currentStage } from "b";
export const stage = currentStage();
//// [/home/src/workspaces/solution/a/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "emitDeclarationOnly": true,
        "noEmitOnError": true,
        "strict": true,
        "module": "nodenext",
        "types": [],
        "rootDir": "src",
        "outDir": "../dist/a",
        "tsBuildInfoFile": "../dist/a.tsbuildinfo"
    },
    "include": ["src"],
    "references": [{"path":"../b"}]
}
//// [/home/src/workspaces/solution/b/node_modules/c] -> /home/src/workspaces/solution/c *new*
//// [/home/src/workspaces/solution/b/package.json] *new* 
{"name":"b","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{"c":"1.0.0"}}
//// [/home/src/workspaces/solution/b/src/index.ts] *new* 
import { current } from "c";
export const currentStage = () => current;
//// [/home/src/workspaces/solution/b/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "emitDeclarationOnly": true,
        "noEmitOnError": true,
        "strict": true,
        "module": "nodenext",
        "types": [],
        "rootDir": "src",
        "outDir": "../dist/b",
        "tsBuildInfoFile": "../dist/b.tsbuildinfo"
    },
    "include": ["src"],
    "references": [{"path":"../c"}]
}
//// [/home/src/workspaces/solution/c/package.json] *new* 
{"name":"c","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{}}
//// [/home/src/workspaces/solution/c/src/index.ts] *new* 
export interface Current { readonly stage: string }
export const current: Current = { stage: "test" };
//// [/home/src/workspaces/solution/c/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "emitDeclarationOnly": true,
        "noEmitOnError": true,
        "strict": true,
        "module": "nodenext",
        "types": [],
        "rootDir": "src",
        "outDir": "../dist/c",
        "tsBuildInfoFile": "../dist/c.tsbuildinfo"
    },
    "include": ["src"],
    "references": []
}
//// [/home/src/workspaces/solution/tsconfig.json] *new* 
{"files":[],"references":[{"path":"./a"}]}

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is out of date because output file 'dist/c.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'c/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is out of date because output file 'dist/b.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'b/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because output file 'dist/a.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

[96ma/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2883: [0mThe inferred type of 'stage' cannot be named without a reference to 'Current' from '../../b/node_modules/c/src/index.js'. This is likely not portable. A type annotation is necessary.

[7m2[0m export const stage = currentStage();
[7m [0m [91m             ~~~~~[0m


Found 1 error in a/src/index.ts[90m:2[0m

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
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["../a/package.json","../b/package.json","../c/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","./b/index.d.ts","../a/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n","40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./a","rootDir":"../a/src","strict":true,"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"emitDiagnosticsPerFile":[[4,[{"pos":47,"end":52,"code":2883,"category":1,"messageKey":"The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_2883","messageArgs":["stage","../../b/node_modules/c/src/index.js","Current"]}]]],"affectedFilesPendingEmit":[[4,16]],"emitSignatures":[4],"linkedPackagesSignature":"04e79a34ca0664260ef3cb0a2f610cdd-../a/node_modules/b -> ../b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}"}
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a/src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "../a/package.json",
    "../b/package.json",
    "../c/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "./b/index.d.ts",
    "../a/src/index.ts"
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b/index.d.ts",
      "version": "40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",
      "signature": "40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../a/src/index.ts",
      "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "signature": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./b/index.d.ts"
    ],
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./a",
    "rootDir": "../a/src",
    "strict": true,
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "../a/src/index.ts": [
      "./b/index.d.ts"
    ],
    "./b/index.d.ts": [
      "./c/index.d.ts"
    ]
  },
  "emitDiagnosticsPerFile": [
    [
      "../a/src/index.ts",
      [
        {
          "pos": 47,
          "end": 52,
          "code": 2883,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_2883",
          "messageArgs": [
            "stage",
            "../../b/node_modules/c/src/index.js",
            "Current"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "../a/src/index.ts",
      "DtsEmit",
      [
        4,
        16
      ]
    ]
  ],
  "emitSignatures": [
    {
      "file": "../a/src/index.ts",
      "original": 4
    }
  ],
  "linkedPackagesSignature": "04e79a34ca0664260ef3cb0a2f610cdd-../a/node_modules/b -> ../b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}",
  "size": 2149
}
//// [/home/src/workspaces/solution/dist/b.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"packageJsons":["../b/package.json","../c/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","../b/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",{"version":"b8f420826cc95086ac9bf1d196006850-import { current } from \"c\";\nexport const currentStage = () => current;","signature":"40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./b","rootDir":"../b/src","strict":true,"tsBuildInfoFile":"./b.tsbuildinfo"},"referencedMap":[[3,1]],"latestChangedDtsFile":"./b/index.d.ts","linkedPackagesSignature":"4dbc6d9418bcdb28e07fe377c23d870e-../b/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}"}
//// [/home/src/workspaces/solution/dist/b.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../b/src/index.ts"
      ],
      "original": 3
    }
  ],
  "packageJsons": [
    "../b/package.json",
    "../c/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "../b/src/index.ts"
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../b/src/index.ts",
      "version": "b8f420826cc95086ac9bf1d196006850-import { current } from \"c\";\nexport const currentStage = () => current;",
      "signature": "40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "b8f420826cc95086ac9bf1d196006850-import { current } from \"c\";\nexport const currentStage = () => current;",
        "signature": "40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "fileIdsList": [
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./b",
    "rootDir": "../b/src",
    "strict": true,
    "tsBuildInfoFile": "./b.tsbuildinfo"
  },
  "referencedMap": {
    "../b/src/index.ts": [
      "./c/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./b/index.d.ts",
  "linkedPackagesSignature": "4dbc6d9418bcdb28e07fe377c23d870e-../b/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}",
  "size": 1747
}
//// [/home/src/workspaces/solution/dist/b/index.d.ts] *new* 
export declare const currentStage: () => import("c").Current;

//// [/home/src/workspaces/solution/dist/c.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"packageJsons":["../c/package.json"],"fileNames":["lib.es2026.full.d.ts","../c/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"24adc195ff28658d712c9b893a84480c-export interface Current { readonly stage: string }\nexport const current: Current = { stage: \"test\" };","signature":"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n","impliedNodeFormat":99}],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./c","rootDir":"../c/src","strict":true,"tsBuildInfoFile":"./c.tsbuildinfo"},"latestChangedDtsFile":"./c/index.d.ts"}
//// [/home/src/workspaces/solution/dist/c.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../c/src/index.ts"
      ],
      "original": 2
    }
  ],
  "packageJsons": [
    "../c/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../c/src/index.ts"
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
      "fileName": "../c/src/index.ts",
      "version": "24adc195ff28658d712c9b893a84480c-export interface Current { readonly stage: string }\nexport const current: Current = { stage: \"test\" };",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "ESNext",
      "original": {
        "version": "24adc195ff28658d712c9b893a84480c-export interface Current { readonly stage: string }\nexport const current: Current = { stage: \"test\" };",
        "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
        "impliedNodeFormat": 99
      }
    }
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./c",
    "rootDir": "../c/src",
    "strict": true,
    "tsBuildInfoFile": "./c.tsbuildinfo"
  },
  "latestChangedDtsFile": "./c/index.d.ts",
  "size": 1456
}
//// [/home/src/workspaces/solution/dist/c/index.d.ts] *new* 
export interface Current {
    readonly stage: string;
}
export declare const current: Current;


c/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/c/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/c/src/index.ts

b/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/dist/c/index.d.ts
*refresh*    /home/src/workspaces/solution/b/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/b/src/index.ts

a/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/dist/c/index.d.ts
*refresh*    /home/src/workspaces/solution/dist/b/index.d.ts
*refresh*    /home/src/workspaces/solution/a/src/index.ts
Signatures::


Edit [0]:: add c to dependencies of a
//// [/home/src/workspaces/solution/a/package.json] *modified* 
{"name":"a","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{"b":"1.0.0","c":"1.0.0"}}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is up to date because newest input 'c/src/index.ts' is older than output 'dist/c.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is up to date because newest input 'b/src/index.ts' is older than output 'dist/b.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because buildinfo file 'dist/a.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

//// [/home/src/workspaces/solution/dist/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["../a/package.json","../b/package.json","../c/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","./b/index.d.ts","../a/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n","40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./a","rootDir":"../a/src","strict":true,"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"latestChangedDtsFile":"./a/index.d.ts","linkedPackagesSignature":"4084db9a06666b3db4e907ff7b41bf9a-../a/node_modules/b -> ../b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../a/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}"}
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a/src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "../a/package.json",
    "../b/package.json",
    "../c/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "./b/index.d.ts",
    "../a/src/index.ts"
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b/index.d.ts",
      "version": "40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",
      "signature": "40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../a/src/index.ts",
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
      "./b/index.d.ts"
    ],
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./a",
    "rootDir": "../a/src",
    "strict": true,
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "../a/src/index.ts": [
      "./b/index.d.ts"
    ],
    "./b/index.d.ts": [
      "./c/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./a/index.d.ts",
  "linkedPackagesSignature": "4084db9a06666b3db4e907ff7b41bf9a-../a/node_modules/b -> ../b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../a/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}",
  "size": 2041
}
//// [/home/src/workspaces/solution/dist/a/index.d.ts] *new* 
export declare const stage: import("c").Current;


a/tsconfig.json::
SemanticDiagnostics::
Signatures::
(stored at emit) /home/src/workspaces/solution/a/src/index.ts


Edit [1]:: no change

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is up to date because newest input 'c/src/index.ts' is older than output 'dist/c.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is up to date because newest input 'b/src/index.ts' is older than output 'dist/b.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is up to date because newest input 'a/src/index.ts' is older than output 'dist/a.tsbuildinfo'




Edit [2]:: force build with c as dependency

tsgo --b --verbose --force
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'c/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'b/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is being forcibly rebuilt

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

//// [/home/src/workspaces/solution/dist/a.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/solution/dist/a/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/dist/b.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/dist/b.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/solution/dist/b/index.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/dist/c.tsbuildinfo] *rewrite with same content*
//// [/home/src/workspaces/solution/dist/c.tsbuildinfo.readable.baseline.txt] *rewrite with same content*
//// [/home/src/workspaces/solution/dist/c/index.d.ts] *rewrite with same content*

c/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/c/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/c/src/index.ts

b/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/dist/c/index.d.ts
*refresh*    /home/src/workspaces/solution/b/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/b/src/index.ts

a/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/solution/dist/c/index.d.ts
*refresh*    /home/src/workspaces/solution/dist/b/index.d.ts
*refresh*    /home/src/workspaces/solution/a/src/index.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/a/src/index.ts


Edit [3]:: remove c from dependencies of a
//// [/home/src/workspaces/solution/a/package.json] *modified* 
{"name":"a","version":"1.0.0","type":"module","types":"./src/index.ts","dependencies":{"b":"1.0.0"}}

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is up to date because newest input 'c/src/index.ts' is older than output 'dist/c.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is up to date because newest input 'b/src/index.ts' is older than output 'dist/b.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because output 'dist/a.tsbuildinfo' is older than input 'a/package.json'

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

[96ma/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2883: [0mThe inferred type of 'stage' cannot be named without a reference to 'Current' from '../../b/node_modules/c/src/index.js'. This is likely not portable. A type annotation is necessary.

[7m2[0m export const stage = currentStage();
[7m [0m [91m             ~~~~~[0m


Found 1 error in a/src/index.ts[90m:2[0m

//// [/home/src/workspaces/solution/dist/a.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[4],"packageJsons":["../a/package.json","../b/package.json","../c/package.json"],"fileNames":["lib.es2026.full.d.ts","./c/index.d.ts","./b/index.d.ts","../a/src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n","40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",{"version":"58d3d85f395f5825bc9d710f0024af35-import { currentStage } from \"b\";\nexport const stage = currentStage();","signature":"620c9be1975f68589ff91cdbbde3297b-export declare const stage: import(\"c\").Current;\n","impliedNodeFormat":99}],"fileIdsList":[[3],[2]],"options":{"composite":true,"emitDeclarationOnly":true,"module":199,"noEmitOnError":true,"outDir":"./a","rootDir":"../a/src","strict":true,"tsBuildInfoFile":"./a.tsbuildinfo"},"referencedMap":[[4,1],[3,2]],"emitDiagnosticsPerFile":[[4,[{"pos":47,"end":52,"code":2883,"category":1,"messageKey":"The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_2883","messageArgs":["stage","../../b/node_modules/c/src/index.js","Current"]}]]],"affectedFilesPendingEmit":[[4,16]],"latestChangedDtsFile":"./a/index.d.ts","linkedPackagesSignature":"04e79a34ca0664260ef3cb0a2f610cdd-../a/node_modules/b -> ../b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}"}
//// [/home/src/workspaces/solution/dist/a.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../a/src/index.ts"
      ],
      "original": 4
    }
  ],
  "packageJsons": [
    "../a/package.json",
    "../b/package.json",
    "../c/package.json"
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./c/index.d.ts",
    "./b/index.d.ts",
    "../a/src/index.ts"
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
      "fileName": "./c/index.d.ts",
      "version": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "signature": "772688f640dfff8943755b05148ff770-export interface Current {\n    readonly stage: string;\n}\nexport declare const current: Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./b/index.d.ts",
      "version": "40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",
      "signature": "40ef1c8da751da23c9139542eea9f276-export declare const currentStage: () => import(\"c\").Current;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../a/src/index.ts",
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
      "./b/index.d.ts"
    ],
    [
      "./c/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true,
    "module": 199,
    "noEmitOnError": true,
    "outDir": "./a",
    "rootDir": "../a/src",
    "strict": true,
    "tsBuildInfoFile": "./a.tsbuildinfo"
  },
  "referencedMap": {
    "../a/src/index.ts": [
      "./b/index.d.ts"
    ],
    "./b/index.d.ts": [
      "./c/index.d.ts"
    ]
  },
  "emitDiagnosticsPerFile": [
    [
      "../a/src/index.ts",
      [
        {
          "pos": 47,
          "end": 52,
          "code": 2883,
          "category": 1,
          "messageKey": "The_inferred_type_of_0_cannot_be_named_without_a_reference_to_2_from_1_This_is_likely_not_portable_A_2883",
          "messageArgs": [
            "stage",
            "../../b/node_modules/c/src/index.js",
            "Current"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "../a/src/index.ts",
      "DtsEmit",
      [
        4,
        16
      ]
    ]
  ],
  "latestChangedDtsFile": "./a/index.d.ts",
  "linkedPackagesSignature": "04e79a34ca0664260ef3cb0a2f610cdd-../a/node_modules/b -> ../b {\"type\":\"module\",\"types\":\"./src/index.ts\"}\n../b/node_modules/c -> ../c {\"type\":\"module\",\"types\":\"./src/index.ts\"}",
  "size": 2268
}

a/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [4]:: no change

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsSkipped
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * c/tsconfig.json
    * b/tsconfig.json
    * a/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'c/tsconfig.json' is up to date because newest input 'c/src/index.ts' is older than output 'dist/c.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is up to date because newest input 'b/src/index.ts' is older than output 'dist/b.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because buildinfo file 'dist/a.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

[96ma/src/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2883: [0mThe inferred type of 'stage' cannot be named without a reference to 'Current' from '../../b/node_modules/c/src/index.js'. This is likely not portable. A type annotation is necessary.

[7m2[0m export const stage = currentStage();
[7m [0m [91m             ~~~~~[0m


Found 1 error in a/src/index.ts[90m:2[0m


a/tsconfig.json::
SemanticDiagnostics::
Signatures::
