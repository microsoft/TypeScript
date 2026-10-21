currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/changed.ts] *new* 
export const changed = 1;
//// [/home/src/workspaces/project/consumer.ts] *new* 
declare const value: RemovedGlobal; value.property;
//// [/home/src/workspaces/project/global.d.ts] *new* 
interface RemovedGlobal { property: string; }
//// [/home/src/workspaces/project/module.d.ts] *new* 
export interface ModuleOnly { property: string; }
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions":{"incremental":true,"noEmit":true,"types":[]}}

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
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2026.full.d.ts","./changed.ts","./consumer.ts","./global.d.ts","./module.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"9d2a101c0350d55f00e7c4ae056043d2-export const changed = 1;",{"version":"711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"430549e1c6d26f4d8c1c2cd8e816a4f6-interface RemovedGlobal { property: string; }","affectsGlobalScope":true,"impliedNodeFormat":1},"32f3c5c4ba107efb87a0650f87405cd2-export interface ModuleOnly { property: string; }"],"affectedFilesPendingEmit":[2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./changed.ts",
        "./consumer.ts",
        "./global.d.ts",
        "./module.d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./changed.ts",
    "./consumer.ts",
    "./global.d.ts",
    "./module.d.ts"
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
      "fileName": "./changed.ts",
      "version": "9d2a101c0350d55f00e7c4ae056043d2-export const changed = 1;",
      "signature": "9d2a101c0350d55f00e7c4ae056043d2-export const changed = 1;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./consumer.ts",
      "version": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
      "signature": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./global.d.ts",
      "version": "430549e1c6d26f4d8c1c2cd8e816a4f6-interface RemovedGlobal { property: string; }",
      "signature": "430549e1c6d26f4d8c1c2cd8e816a4f6-interface RemovedGlobal { property: string; }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "430549e1c6d26f4d8c1c2cd8e816a4f6-interface RemovedGlobal { property: string; }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./module.d.ts",
      "version": "32f3c5c4ba107efb87a0650f87405cd2-export interface ModuleOnly { property: string; }",
      "signature": "32f3c5c4ba107efb87a0650f87405cd2-export interface ModuleOnly { property: string; }",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "affectedFilesPendingEmit": [
    [
      "./changed.ts",
      "Js",
      2
    ],
    [
      "./consumer.ts",
      "Js",
      3
    ]
  ],
  "size": 1393
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/changed.ts
*refresh*    /home/src/workspaces/project/consumer.ts
*refresh*    /home/src/workspaces/project/global.d.ts
*refresh*    /home/src/workspaces/project/module.d.ts
Signatures::


Edit [0]:: delete global and non-global files while adding and changing sources
//// [/home/src/workspaces/project/added.ts] *new* 
export const added = 1;
//// [/home/src/workspaces/project/changed.ts] *modified* 
export const changed = 2;
//// [/home/src/workspaces/project/global.d.ts] *deleted*
//// [/home/src/workspaces/project/module.d.ts] *deleted*

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RemovedGlobal'.

[7m1[0m declare const value: RemovedGlobal; value.property;
[7m [0m [91m                     ~~~~~~~~~~~~~[0m


Found 1 error in consumer.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2026.full.d.ts","./added.ts","./changed.ts","./consumer.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a87a44fe8d16410f017e19282f488646-export const added = 1;","signature":"46dd870c2a50187f4e57de30251b5cdf-export declare const added = 1;\n","impliedNodeFormat":1},{"version":"d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;","signature":"d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n","impliedNodeFormat":1},{"version":"711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;","signature":"0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n","affectsGlobalScope":true,"impliedNodeFormat":1}],"semanticDiagnosticsPerFile":[[4,[{"pos":21,"end":34,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["RemovedGlobal"]}]]],"affectedFilesPendingEmit":[2,3,4]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./added.ts",
        "./changed.ts",
        "./consumer.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./added.ts",
    "./changed.ts",
    "./consumer.ts"
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
      "fileName": "./added.ts",
      "version": "a87a44fe8d16410f017e19282f488646-export const added = 1;",
      "signature": "46dd870c2a50187f4e57de30251b5cdf-export declare const added = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a87a44fe8d16410f017e19282f488646-export const added = 1;",
        "signature": "46dd870c2a50187f4e57de30251b5cdf-export declare const added = 1;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./changed.ts",
      "version": "d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;",
      "signature": "d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;",
        "signature": "d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./consumer.ts",
      "version": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
      "signature": "0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
        "signature": "0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "semanticDiagnosticsPerFile": [
    [
      "./consumer.ts",
      [
        {
          "pos": 21,
          "end": 34,
          "code": 2304,
          "category": 1,
          "messageKey": "Cannot_find_name_0_2304",
          "messageArgs": [
            "RemovedGlobal"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./added.ts",
      "Js",
      2
    ],
    [
      "./changed.ts",
      "Js",
      3
    ],
    [
      "./consumer.ts",
      "Js",
      4
    ]
  ],
  "size": 1679
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/added.ts
*refresh*    /home/src/workspaces/project/changed.ts
*refresh*    /home/src/workspaces/project/consumer.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/added.ts
(computed .d.ts) /home/src/workspaces/project/changed.ts
(computed .d.ts) /home/src/workspaces/project/consumer.ts


Edit [1]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mconsumer.ts[0m:[93m1[0m:[93m22[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RemovedGlobal'.

[7m1[0m declare const value: RemovedGlobal; value.property;
[7m [0m [91m                     ~~~~~~~~~~~~~[0m


Found 1 error in consumer.ts[90m:1[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: restore global file
//// [/home/src/workspaces/project/global.d.ts] *new* 
interface RemovedGlobal { property: number; }

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.es2026.full.d.ts","./added.ts","./changed.ts","./consumer.ts","./global.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a87a44fe8d16410f017e19282f488646-export const added = 1;","signature":"46dd870c2a50187f4e57de30251b5cdf-export declare const added = 1;\n","impliedNodeFormat":1},{"version":"d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;","signature":"d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n","impliedNodeFormat":1},{"version":"711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;","signature":"0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a874d82c83cb35e137677f9db7c6fc25-interface RemovedGlobal { property: number; }","affectsGlobalScope":true,"impliedNodeFormat":1}],"affectedFilesPendingEmit":[2,3,4]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./added.ts",
        "./changed.ts",
        "./consumer.ts",
        "./global.d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./added.ts",
    "./changed.ts",
    "./consumer.ts",
    "./global.d.ts"
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
      "fileName": "./added.ts",
      "version": "a87a44fe8d16410f017e19282f488646-export const added = 1;",
      "signature": "46dd870c2a50187f4e57de30251b5cdf-export declare const added = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a87a44fe8d16410f017e19282f488646-export const added = 1;",
        "signature": "46dd870c2a50187f4e57de30251b5cdf-export declare const added = 1;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./changed.ts",
      "version": "d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;",
      "signature": "d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;",
        "signature": "d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./consumer.ts",
      "version": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
      "signature": "0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
        "signature": "0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./global.d.ts",
      "version": "a874d82c83cb35e137677f9db7c6fc25-interface RemovedGlobal { property: number; }",
      "signature": "a874d82c83cb35e137677f9db7c6fc25-interface RemovedGlobal { property: number; }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a874d82c83cb35e137677f9db7c6fc25-interface RemovedGlobal { property: number; }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "affectedFilesPendingEmit": [
    [
      "./added.ts",
      "Js",
      2
    ],
    [
      "./changed.ts",
      "Js",
      3
    ],
    [
      "./consumer.ts",
      "Js",
      4
    ]
  ],
  "size": 1683
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/added.ts
*refresh*    /home/src/workspaces/project/changed.ts
*refresh*    /home/src/workspaces/project/consumer.ts
*refresh*    /home/src/workspaces/project/global.d.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/added.ts
(computed .d.ts) /home/src/workspaces/project/changed.ts
(computed .d.ts) /home/src/workspaces/project/consumer.ts
(used version)   /home/src/workspaces/project/global.d.ts


Edit [3]:: delete ordinary source file
//// [/home/src/workspaces/project/added.ts] *deleted*

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es2026.full.d.ts","./changed.ts","./consumer.ts","./global.d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;","signature":"d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n","impliedNodeFormat":1},{"version":"711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;","signature":"0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"a874d82c83cb35e137677f9db7c6fc25-interface RemovedGlobal { property: number; }","affectsGlobalScope":true,"impliedNodeFormat":1}],"affectedFilesPendingEmit":[2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./changed.ts",
        "./consumer.ts",
        "./global.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "./changed.ts",
    "./consumer.ts",
    "./global.d.ts"
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
      "fileName": "./changed.ts",
      "version": "d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;",
      "signature": "d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "d1d7f56bc999b7e6c4b96679ef1918f0-export const changed = 2;",
        "signature": "d8be01a7b5c5ab639707b97a788c0d7f-export declare const changed = 2;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./consumer.ts",
      "version": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
      "signature": "0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "711b440410fa962704b42a5556c4d4e8-declare const value: RemovedGlobal; value.property;",
        "signature": "0e27ca6cf86c8ffaf4064d0ead9b1757-declare const value: RemovedGlobal;\n",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./global.d.ts",
      "version": "a874d82c83cb35e137677f9db7c6fc25-interface RemovedGlobal { property: number; }",
      "signature": "a874d82c83cb35e137677f9db7c6fc25-interface RemovedGlobal { property: number; }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a874d82c83cb35e137677f9db7c6fc25-interface RemovedGlobal { property: number; }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "affectedFilesPendingEmit": [
    [
      "./changed.ts",
      "Js",
      2
    ],
    [
      "./consumer.ts",
      "Js",
      3
    ]
  ],
  "size": 1494
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
