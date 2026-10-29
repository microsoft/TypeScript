currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts] *new* 
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
interface LibraryConsumer { property: RemovedGlobal; }
//// [/home/src/workspaces/project/consumer.ts] *new* 
export const unchanged = 1;
//// [/home/src/workspaces/project/global.d.ts] *new* 
interface RemovedGlobal {}
//// [/home/src/workspaces/project/module.d.ts] *new* 
export interface Unrelated {}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions":{"incremental":true,"noEmit":true,"types":[],"lib":["es5"]}}

tsgo --checkers 1
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es5.d.ts","./consumer.ts","./global.d.ts","./module.d.ts"],"fileInfos":[{"version":"f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }","affectsGlobalScope":true,"impliedNodeFormat":1},"b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;",{"version":"8fcf42c417de40bbb198049bfd5804b7-interface RemovedGlobal {}","affectsGlobalScope":true,"impliedNodeFormat":1},"6c520878a353927f50be384ce898a985-export interface Unrelated {}"],"affectedFilesPendingEmit":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./consumer.ts",
        "./global.d.ts",
        "./module.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "./consumer.ts",
    "./global.d.ts",
    "./module.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
      "version": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
      "signature": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./consumer.ts",
      "version": "b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;",
      "signature": "b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./global.d.ts",
      "version": "8fcf42c417de40bbb198049bfd5804b7-interface RemovedGlobal {}",
      "signature": "8fcf42c417de40bbb198049bfd5804b7-interface RemovedGlobal {}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8fcf42c417de40bbb198049bfd5804b7-interface RemovedGlobal {}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./module.d.ts",
      "version": "6c520878a353927f50be384ce898a985-export interface Unrelated {}",
      "signature": "6c520878a353927f50be384ce898a985-export interface Unrelated {}",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "affectedFilesPendingEmit": [
    [
      "./consumer.ts",
      "Js",
      2
    ]
  ],
  "size": 1240
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/consumer.ts
*refresh*    /home/src/workspaces/project/global.d.ts
*refresh*    /home/src/workspaces/project/module.d.ts
Signatures::


Edit [0]:: delete global and module declarations
//// [/home/src/workspaces/project/global.d.ts] *deleted*
//// [/home/src/workspaces/project/module.d.ts] *deleted*

tsgo --checkers 1
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96m../../tslibs/TS/Lib/lib.es5.d.ts[0m:[93m23[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RemovedGlobal'.

[7m23[0m interface LibraryConsumer { property: RemovedGlobal; }
[7m  [0m [91m                                      ~~~~~~~~~~~~~[0m


Found 1 error in ../../tslibs/TS/Lib/lib.es5.d.ts[90m:23[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es5.d.ts","./consumer.ts"],"fileInfos":[{"version":"f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;","signature":"93ca091d3ab68cd75a241c9cc24ea4cc-export declare const unchanged = 1;\n","impliedNodeFormat":1}],"semanticDiagnosticsPerFile":[[1,[{"pos":690,"end":703,"code":2304,"category":1,"messageKey":"Cannot_find_name_0_2304","messageArgs":["RemovedGlobal"]}]]],"affectedFilesPendingEmit":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./consumer.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "./consumer.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
      "version": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
      "signature": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./consumer.ts",
      "version": "b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;",
      "signature": "93ca091d3ab68cd75a241c9cc24ea4cc-export declare const unchanged = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;",
        "signature": "93ca091d3ab68cd75a241c9cc24ea4cc-export declare const unchanged = 1;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "semanticDiagnosticsPerFile": [
    [
      "lib.es5.d.ts",
      [
        {
          "pos": 690,
          "end": 703,
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
      "./consumer.ts",
      "Js",
      2
    ]
  ],
  "size": 1291
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/consumer.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/consumer.ts


Edit [1]:: no change

tsgo --checkers 1
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96m../../tslibs/TS/Lib/lib.es5.d.ts[0m:[93m23[0m:[93m39[0m - [91merror[0m[90m TS2304: [0mCannot find name 'RemovedGlobal'.

[7m23[0m interface LibraryConsumer { property: RemovedGlobal; }
[7m  [0m [91m                                      ~~~~~~~~~~~~~[0m


Found 1 error in ../../tslibs/TS/Lib/lib.es5.d.ts[90m:23[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: restore global declaration
//// [/home/src/workspaces/project/global.d.ts] *new* 
interface RemovedGlobal {}

tsgo --checkers 1
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es5.d.ts","./consumer.ts","./global.d.ts"],"fileInfos":[{"version":"f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;","signature":"93ca091d3ab68cd75a241c9cc24ea4cc-export declare const unchanged = 1;\n","impliedNodeFormat":1},{"version":"8fcf42c417de40bbb198049bfd5804b7-interface RemovedGlobal {}","affectsGlobalScope":true,"impliedNodeFormat":1}],"affectedFilesPendingEmit":[2]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./consumer.ts",
        "./global.d.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es5.d.ts",
    "./consumer.ts",
    "./global.d.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es5.d.ts",
      "version": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
      "signature": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f12cf4d0d7d3a1898ca4427fc3e56470-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface LibraryConsumer { property: RemovedGlobal; }",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./consumer.ts",
      "version": "b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;",
      "signature": "93ca091d3ab68cd75a241c9cc24ea4cc-export declare const unchanged = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;",
        "signature": "93ca091d3ab68cd75a241c9cc24ea4cc-export declare const unchanged = 1;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./global.d.ts",
      "version": "8fcf42c417de40bbb198049bfd5804b7-interface RemovedGlobal {}",
      "signature": "8fcf42c417de40bbb198049bfd5804b7-interface RemovedGlobal {}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8fcf42c417de40bbb198049bfd5804b7-interface RemovedGlobal {}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "affectedFilesPendingEmit": [
    [
      "./consumer.ts",
      "Js",
      2
    ]
  ],
  "size": 1278
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/consumer.ts
*refresh*    /home/src/workspaces/project/global.d.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/consumer.ts
(used version)   /home/src/workspaces/project/global.d.ts


Edit [3]:: no change

tsgo --checkers 1
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::
