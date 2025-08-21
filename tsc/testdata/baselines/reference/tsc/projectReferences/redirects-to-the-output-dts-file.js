currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/alpha/a.ts] *new* 
export const m: number = 3;
//// [/home/src/workspaces/project/alpha/bin/a.d.ts] *new* 
export { };
//// [/home/src/workspaces/project/alpha/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "bin",
    }
}
//// [/home/src/workspaces/project/beta/b.ts] *new* 
import { m } from '../alpha/a'
//// [/home/src/workspaces/project/beta/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "bin",
    },
    "references": [ { "path": "../alpha" } ]
}

tsgo --p beta/tsconfig.json --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mbeta/b.ts[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS2305: [0mModule '"../alpha/bin/a"' has no exported member 'm'.

[7m1[0m import { m } from '../alpha/a'
[7m [0m [91m         ~[0m

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
alpha/bin/a.d.ts
   Imported via '../alpha/a' from file 'beta/b.ts'
   File is output of project reference source 'alpha/a.ts'
beta/b.ts
   Matched by default include pattern '**/*'

Found 1 error in beta/b.ts[90m:1[0m

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
//// [/home/src/workspaces/project/beta/bin/b.d.ts] *new* 
export {};

//// [/home/src/workspaces/project/beta/bin/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/project/beta/bin/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","../../alpha/bin/a.d.ts","../b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"3145b36c4687eb0550eabb198d0c0d22-export { };",{"version":"fcbf49879e154aae077c688a18cd60c0-import { m } from '../alpha/a'","signature":"abe7d9981d6018efb6b2b794f40a1607-export {};\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./"},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":9,"end":10,"code":2305,"category":1,"message":"Module '\"../alpha/bin/a\"' has no exported member 'm'."}]]],"latestChangedDtsFile":"./b.d.ts"}
//// [/home/src/workspaces/project/beta/bin/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../b.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "../../alpha/bin/a.d.ts",
    "../b.ts"
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
      "fileName": "../../alpha/bin/a.d.ts",
      "version": "3145b36c4687eb0550eabb198d0c0d22-export { };",
      "signature": "3145b36c4687eb0550eabb198d0c0d22-export { };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../b.ts",
      "version": "fcbf49879e154aae077c688a18cd60c0-import { m } from '../alpha/a'",
      "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fcbf49879e154aae077c688a18cd60c0-import { m } from '../alpha/a'",
        "signature": "abe7d9981d6018efb6b2b794f40a1607-export {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../alpha/bin/a.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "referencedMap": {
    "../b.ts": [
      "../../alpha/bin/a.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../b.ts",
      [
        {
          "pos": 9,
          "end": 10,
          "code": 2305,
          "category": 1,
          "message": "Module '\"../alpha/bin/a\"' has no exported member 'm'."
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./b.d.ts",
  "size": 1359
}

beta/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/alpha/bin/a.d.ts
*refresh*    /home/src/workspaces/project/beta/b.ts
Signatures::
(stored at emit) /home/src/workspaces/project/beta/b.ts
