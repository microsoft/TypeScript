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
interface Shared<T> {}
//// [/home/src/workspaces/project/consumer.ts] *new* 
export const unchanged = 1;
//// [/home/src/workspaces/project/global.d.ts] *new* 
interface Shared<T, U> {}
//// [/home/src/workspaces/project/module.d.ts] *new* 
export interface Unrelated {}
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions":{"incremental":true,"noEmit":true,"types":[],"lib":["es5"]}}

tsgo --singleThreaded
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96m../../tslibs/TS/Lib/lib.es5.d.ts[0m:[93m23[0m:[93m11[0m - [91merror[0m[90m TS2428: [0mAll declarations of 'Shared' must have identical type parameters.

[7m23[0m interface Shared<T> {}
[7m  [0m [91m          ~~~~~~[0m

[96mglobal.d.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2428: [0mAll declarations of 'Shared' must have identical type parameters.

[7m1[0m interface Shared<T, U> {}
[7m [0m [91m          ~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  ../../tslibs/TS/Lib/lib.es5.d.ts[90m:23[0m
     1  global.d.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.es5.d.ts","./consumer.ts","./global.d.ts","./module.d.ts"],"fileInfos":[{"version":"a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}","affectsGlobalScope":true,"impliedNodeFormat":1},"b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;",{"version":"35a5065018e48ace611d23c47b1c790a-interface Shared<T, U> {}","affectsGlobalScope":true,"impliedNodeFormat":1},"6c520878a353927f50be384ce898a985-export interface Unrelated {}"],"semanticDiagnosticsPerFile":[[1,[{"pos":662,"end":668,"code":2428,"category":1,"messageKey":"All_declarations_of_0_must_have_identical_type_parameters_2428","messageArgs":["Shared"]}]],[3,[{"pos":10,"end":16,"code":2428,"category":1,"messageKey":"All_declarations_of_0_must_have_identical_type_parameters_2428","messageArgs":["Shared"]}]]],"affectedFilesPendingEmit":[2]}
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
      "version": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
      "signature": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
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
      "version": "35a5065018e48ace611d23c47b1c790a-interface Shared<T, U> {}",
      "signature": "35a5065018e48ace611d23c47b1c790a-interface Shared<T, U> {}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "35a5065018e48ace611d23c47b1c790a-interface Shared<T, U> {}",
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
  "semanticDiagnosticsPerFile": [
    [
      "lib.es5.d.ts",
      [
        {
          "pos": 662,
          "end": 668,
          "code": 2428,
          "category": 1,
          "messageKey": "All_declarations_of_0_must_have_identical_type_parameters_2428",
          "messageArgs": [
            "Shared"
          ]
        }
      ]
    ],
    [
      "./global.d.ts",
      [
        {
          "pos": 10,
          "end": 16,
          "code": 2428,
          "category": 1,
          "messageKey": "All_declarations_of_0_must_have_identical_type_parameters_2428",
          "messageArgs": [
            "Shared"
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
  "size": 1548
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

tsgo --singleThreaded
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es5.d.ts","./consumer.ts"],"fileInfos":[{"version":"a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;","signature":"93ca091d3ab68cd75a241c9cc24ea4cc-export declare const unchanged = 1;\n","impliedNodeFormat":1}],"affectedFilesPendingEmit":[2]}
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
      "version": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
      "signature": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
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
  "affectedFilesPendingEmit": [
    [
      "./consumer.ts",
      "Js",
      2
    ]
  ],
  "size": 1104
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es5.d.ts
*refresh*    /home/src/workspaces/project/consumer.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/consumer.ts


Edit [1]:: no change

tsgo --singleThreaded
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: restore global declaration
//// [/home/src/workspaces/project/global.d.ts] *new* 
interface Shared<T, U> {}

tsgo --singleThreaded
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96m../../tslibs/TS/Lib/lib.es5.d.ts[0m:[93m23[0m:[93m11[0m - [91merror[0m[90m TS2428: [0mAll declarations of 'Shared' must have identical type parameters.

[7m23[0m interface Shared<T> {}
[7m  [0m [91m          ~~~~~~[0m

[96mglobal.d.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2428: [0mAll declarations of 'Shared' must have identical type parameters.

[7m1[0m interface Shared<T, U> {}
[7m [0m [91m          ~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  ../../tslibs/TS/Lib/lib.es5.d.ts[90m:23[0m
     1  global.d.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es5.d.ts","./consumer.ts","./global.d.ts"],"fileInfos":[{"version":"a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"b8ccc95b7f8a123c2fed61f2394c7e72-export const unchanged = 1;","signature":"93ca091d3ab68cd75a241c9cc24ea4cc-export declare const unchanged = 1;\n","impliedNodeFormat":1},{"version":"35a5065018e48ace611d23c47b1c790a-interface Shared<T, U> {}","affectsGlobalScope":true,"impliedNodeFormat":1}],"semanticDiagnosticsPerFile":[[1,[{"pos":662,"end":668,"code":2428,"category":1,"messageKey":"All_declarations_of_0_must_have_identical_type_parameters_2428","messageArgs":["Shared"]}]],[3,[{"pos":10,"end":16,"code":2428,"category":1,"messageKey":"All_declarations_of_0_must_have_identical_type_parameters_2428","messageArgs":["Shared"]}]]],"affectedFilesPendingEmit":[2]}
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
      "version": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
      "signature": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a5af7e2c45fb7635b05dcb96b08fc584-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };\ninterface Shared<T> {}",
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
      "version": "35a5065018e48ace611d23c47b1c790a-interface Shared<T, U> {}",
      "signature": "35a5065018e48ace611d23c47b1c790a-interface Shared<T, U> {}",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "35a5065018e48ace611d23c47b1c790a-interface Shared<T, U> {}",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    }
  ],
  "semanticDiagnosticsPerFile": [
    [
      "lib.es5.d.ts",
      [
        {
          "pos": 662,
          "end": 668,
          "code": 2428,
          "category": 1,
          "messageKey": "All_declarations_of_0_must_have_identical_type_parameters_2428",
          "messageArgs": [
            "Shared"
          ]
        }
      ]
    ],
    [
      "./global.d.ts",
      [
        {
          "pos": 10,
          "end": 16,
          "code": 2428,
          "category": 1,
          "messageKey": "All_declarations_of_0_must_have_identical_type_parameters_2428",
          "messageArgs": [
            "Shared"
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
  "size": 1586
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

tsgo --singleThreaded
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96m../../tslibs/TS/Lib/lib.es5.d.ts[0m:[93m23[0m:[93m11[0m - [91merror[0m[90m TS2428: [0mAll declarations of 'Shared' must have identical type parameters.

[7m23[0m interface Shared<T> {}
[7m  [0m [91m          ~~~~~~[0m

[96mglobal.d.ts[0m:[93m1[0m:[93m11[0m - [91merror[0m[90m TS2428: [0mAll declarations of 'Shared' must have identical type parameters.

[7m1[0m interface Shared<T, U> {}
[7m [0m [91m          ~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  ../../tslibs/TS/Lib/lib.es5.d.ts[90m:23[0m
     1  global.d.ts[90m:1[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
