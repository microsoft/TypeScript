currentDirectory::C:/work/project
useCaseSensitiveFileNames::false
Input::
//// [C:/work/project/src/index.ts] *new* 
import { myValue } from "abs-dep";
export const value: string = myValue;
//// [C:/work/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "dist",
        "paths": {
            "abs-dep": ["D:/work/deps/dep.d.ts"]
        },
        "strict": true
    },
    "include": ["src/**/*"]
}
//// [D:/work/deps/dep.d.ts] *new* 
export declare const myValue: string;

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [C:/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
//// [C:/work/project/dist/src/index.d.ts] *new* 
export declare const value: string;

//// [C:/work/project/dist/src/index.js] *new* 
import { myValue } from "abs-dep";
export const value = myValue;

//// [C:/work/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2025.full.d.ts","d:/work/deps/dep.d.ts","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"4384f7716e1c7cc875e39624007cccc9-export declare const myValue: string;",{"version":"6c77917c7b17b3698cb1dbdb7227fbff-import { myValue } from \"abs-dep\";\nexport const value: string = myValue;","signature":"d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./src/index.d.ts"}
//// [C:/work/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "d:/work/deps/dep.d.ts",
    "../src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "d:/work/deps/dep.d.ts",
      "version": "4384f7716e1c7cc875e39624007cccc9-export declare const myValue: string;",
      "signature": "4384f7716e1c7cc875e39624007cccc9-export declare const myValue: string;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/index.ts",
      "version": "6c77917c7b17b3698cb1dbdb7227fbff-import { myValue } from \"abs-dep\";\nexport const value: string = myValue;",
      "signature": "d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6c77917c7b17b3698cb1dbdb7227fbff-import { myValue } from \"abs-dep\";\nexport const value: string = myValue;",
        "signature": "d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "d:/work/deps/dep.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../src/index.ts": [
      "d:/work/deps/dep.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1347
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    C:/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    D:/work/deps/dep.d.ts
*refresh*    C:/work/project/src/index.ts
Signatures::
(stored at emit) C:/work/project/src/index.ts


Edit [0]:: update absolute non-root dependency with breaking type change
//// [D:/work/deps/dep.d.ts] *modified* 
export declare const myValue: number;

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'dist/tsconfig.tsbuildinfo' is older than input 'd:/work/deps/dep.d.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/index.ts[0m:[93m2[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m export const value: string = myValue;
[7m [0m [91m             ~~~~~[0m


Found 1 error in src/index.ts[90m:2[0m

//// [C:/work/project/dist/src/index.js] *rewrite with same content*
//// [C:/work/project/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.es2025.full.d.ts","d:/work/deps/dep.d.ts","../src/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"936f1acf4d15f440cdb2eb27f80fb9c9-export declare const myValue: number;",{"version":"6c77917c7b17b3698cb1dbdb7227fbff-import { myValue } from \"abs-dep\";\nexport const value: string = myValue;","signature":"d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true,"outDir":"./","strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":48,"end":53,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]}]]],"latestChangedDtsFile":"./src/index.d.ts"}
//// [C:/work/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/index.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "d:/work/deps/dep.d.ts",
    "../src/index.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2025.full.d.ts",
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
      "fileName": "d:/work/deps/dep.d.ts",
      "version": "936f1acf4d15f440cdb2eb27f80fb9c9-export declare const myValue: number;",
      "signature": "936f1acf4d15f440cdb2eb27f80fb9c9-export declare const myValue: number;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/index.ts",
      "version": "6c77917c7b17b3698cb1dbdb7227fbff-import { myValue } from \"abs-dep\";\nexport const value: string = myValue;",
      "signature": "d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6c77917c7b17b3698cb1dbdb7227fbff-import { myValue } from \"abs-dep\";\nexport const value: string = myValue;",
        "signature": "d704bb9feb766d5360f4081857e4c09e-export declare const value: string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "d:/work/deps/dep.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../src/index.ts": [
      "d:/work/deps/dep.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../src/index.ts",
      [
        {
          "pos": 48,
          "end": 53,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string"
          ]
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./src/index.d.ts",
  "size": 1518
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    D:/work/deps/dep.d.ts
*refresh*    C:/work/project/src/index.ts
Signatures::
(used version)   D:/work/deps/dep.d.ts
(computed .d.ts) C:/work/project/src/index.ts
