currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/mapped.ts] *new* 
export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions": {"strict": true, "noEmit": true, "incremental": true}}
//// [/home/src/workspaces/project/usage.ts] *new* 
import type { M } from "./mapped.js";
declare const array: M<string[]>;
declare const tuple: M<[string]>;
export const a = array[0];
export const b = tuple[0];

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96musage.ts[0m:[93m4[0m:[93m18[0m - [91merror[0m[90m TS4109: [0mType arguments for 'Array' circularly reference themselves.

[7m4[0m export const a = array[0];
[7m [0m [91m                 ~~~~~~~~[0m

[96musage.ts[0m:[93m5[0m:[93m18[0m - [91merror[0m[90m TS4110: [0mTuple type arguments circularly reference themselves.

[7m5[0m export const b = tuple[0];
[7m [0m [91m                 ~~~~~~~~[0m


Found 2 errors in the same file, starting at: usage.ts[90m:4[0m

//// [/home/src/tslibs/TS/Lib/lib.es2025.full.d.ts] *Lib*
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
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./mapped.ts","./usage.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"95de771a1a58514729590dedc4d65577-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };","19170e323814c096bf5ea423a0403b2d-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];"],"fileIdsList":[[2]],"options":{"strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":123,"end":131,"code":4109,"category":1,"messageKey":"Type_arguments_for_0_circularly_reference_themselves_4109","messageArgs":["Array"]},{"pos":150,"end":158,"code":4110,"category":1,"messageKey":"Tuple_type_arguments_circularly_reference_themselves_4110"}]]],"affectedFilesPendingEmit":[2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./mapped.ts",
        "./usage.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./mapped.ts",
    "./usage.ts"
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
      "fileName": "./mapped.ts",
      "version": "95de771a1a58514729590dedc4d65577-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };",
      "signature": "95de771a1a58514729590dedc4d65577-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./usage.ts",
      "version": "19170e323814c096bf5ea423a0403b2d-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];",
      "signature": "19170e323814c096bf5ea423a0403b2d-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./mapped.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./usage.ts": [
      "./mapped.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./usage.ts",
      [
        {
          "pos": 123,
          "end": 131,
          "code": 4109,
          "category": 1,
          "messageKey": "Type_arguments_for_0_circularly_reference_themselves_4109",
          "messageArgs": [
            "Array"
          ]
        },
        {
          "pos": 150,
          "end": 158,
          "code": 4110,
          "category": 1,
          "messageKey": "Tuple_type_arguments_circularly_reference_themselves_4110"
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./mapped.ts",
      "Js",
      2
    ],
    [
      "./usage.ts",
      "Js",
      3
    ]
  ],
  "size": 1593
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/mapped.ts
*refresh*    /home/src/workspaces/project/usage.ts
Signatures::


Edit [0]:: edit the use site
//// [/home/src/workspaces/project/usage.ts] *modified* 
import type { M } from "./mapped.js";
declare const array: M<string[]>;
declare const tuple: M<[string]>;
export const a = array[0];
export const b = tuple[0];
// comment-only edit


tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96musage.ts[0m:[93m4[0m:[93m18[0m - [91merror[0m[90m TS4109: [0mType arguments for 'Array' circularly reference themselves.

[7m4[0m export const a = array[0];
[7m [0m [91m                 ~~~~~~~~[0m

[96musage.ts[0m:[93m5[0m:[93m18[0m - [91merror[0m[90m TS4110: [0mTuple type arguments circularly reference themselves.

[7m5[0m export const b = tuple[0];
[7m [0m [91m                 ~~~~~~~~[0m


Found 2 errors in the same file, starting at: usage.ts[90m:4[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./mapped.ts","./usage.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"95de771a1a58514729590dedc4d65577-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };",{"version":"5091cc0d2d42095ac097c8c2788b840b-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];\n// comment-only edit\n","signature":"1eca59763ede36c95a8c60156e1278a8-export declare const a: any;\nexport declare const b: any;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":123,"end":131,"code":4109,"category":1,"messageKey":"Type_arguments_for_0_circularly_reference_themselves_4109","messageArgs":["Array"]},{"pos":150,"end":158,"code":4110,"category":1,"messageKey":"Tuple_type_arguments_circularly_reference_themselves_4110"}]]],"affectedFilesPendingEmit":[2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./mapped.ts",
        "./usage.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./mapped.ts",
    "./usage.ts"
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
      "fileName": "./mapped.ts",
      "version": "95de771a1a58514729590dedc4d65577-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };",
      "signature": "95de771a1a58514729590dedc4d65577-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./usage.ts",
      "version": "5091cc0d2d42095ac097c8c2788b840b-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];\n// comment-only edit\n",
      "signature": "1eca59763ede36c95a8c60156e1278a8-export declare const a: any;\nexport declare const b: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5091cc0d2d42095ac097c8c2788b840b-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];\n// comment-only edit\n",
        "signature": "1eca59763ede36c95a8c60156e1278a8-export declare const a: any;\nexport declare const b: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./mapped.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./usage.ts": [
      "./mapped.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./usage.ts",
      [
        {
          "pos": 123,
          "end": 131,
          "code": 4109,
          "category": 1,
          "messageKey": "Type_arguments_for_0_circularly_reference_themselves_4109",
          "messageArgs": [
            "Array"
          ]
        },
        {
          "pos": 150,
          "end": 158,
          "code": 4110,
          "category": 1,
          "messageKey": "Tuple_type_arguments_circularly_reference_themselves_4110"
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./mapped.ts",
      "Js",
      2
    ],
    [
      "./usage.ts",
      "Js",
      3
    ]
  ],
  "size": 1759
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/usage.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/usage.ts


Edit [1]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96musage.ts[0m:[93m4[0m:[93m18[0m - [91merror[0m[90m TS4109: [0mType arguments for 'Array' circularly reference themselves.

[7m4[0m export const a = array[0];
[7m [0m [91m                 ~~~~~~~~[0m

[96musage.ts[0m:[93m5[0m:[93m18[0m - [91merror[0m[90m TS4110: [0mTuple type arguments circularly reference themselves.

[7m5[0m export const b = tuple[0];
[7m [0m [91m                 ~~~~~~~~[0m


Found 2 errors in the same file, starting at: usage.ts[90m:4[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [2]:: edit the mapped declaration
//// [/home/src/workspaces/project/mapped.ts] *modified* 
export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };
// comment-only edit


tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96musage.ts[0m:[93m4[0m:[93m18[0m - [91merror[0m[90m TS4109: [0mType arguments for 'Array' circularly reference themselves.

[7m4[0m export const a = array[0];
[7m [0m [91m                 ~~~~~~~~[0m

[96musage.ts[0m:[93m5[0m:[93m18[0m - [91merror[0m[90m TS4110: [0mTuple type arguments circularly reference themselves.

[7m5[0m export const b = tuple[0];
[7m [0m [91m                 ~~~~~~~~[0m


Found 2 errors in the same file, starting at: usage.ts[90m:4[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./mapped.ts","./usage.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"2dc296bc77e31d61698540af221675f4-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };\n// comment-only edit\n","signature":"cd8f22a56c1652f8e59d93951f189afa-export type M<T> = {\n    [K in keyof T]: T extends M<T> ? 1 : 2;\n};\n","impliedNodeFormat":1},{"version":"5091cc0d2d42095ac097c8c2788b840b-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];\n// comment-only edit\n","signature":"1eca59763ede36c95a8c60156e1278a8-export declare const a: any;\nexport declare const b: any;\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"strict":true},"referencedMap":[[3,1]],"semanticDiagnosticsPerFile":[[3,[{"pos":123,"end":131,"code":4109,"category":1,"messageKey":"Type_arguments_for_0_circularly_reference_themselves_4109","messageArgs":["Array"]},{"pos":150,"end":158,"code":4110,"category":1,"messageKey":"Tuple_type_arguments_circularly_reference_themselves_4110"}]]],"affectedFilesPendingEmit":[2,3]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./mapped.ts",
        "./usage.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./mapped.ts",
    "./usage.ts"
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
      "fileName": "./mapped.ts",
      "version": "2dc296bc77e31d61698540af221675f4-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };\n// comment-only edit\n",
      "signature": "cd8f22a56c1652f8e59d93951f189afa-export type M<T> = {\n    [K in keyof T]: T extends M<T> ? 1 : 2;\n};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "2dc296bc77e31d61698540af221675f4-export type M<T> = { [K in keyof T]: T extends M<T> ? 1 : 2 };\n// comment-only edit\n",
        "signature": "cd8f22a56c1652f8e59d93951f189afa-export type M<T> = {\n    [K in keyof T]: T extends M<T> ? 1 : 2;\n};\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./usage.ts",
      "version": "5091cc0d2d42095ac097c8c2788b840b-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];\n// comment-only edit\n",
      "signature": "1eca59763ede36c95a8c60156e1278a8-export declare const a: any;\nexport declare const b: any;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5091cc0d2d42095ac097c8c2788b840b-import type { M } from \"./mapped.js\";\ndeclare const array: M<string[]>;\ndeclare const tuple: M<[string]>;\nexport const a = array[0];\nexport const b = tuple[0];\n// comment-only edit\n",
        "signature": "1eca59763ede36c95a8c60156e1278a8-export declare const a: any;\nexport declare const b: any;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./mapped.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./usage.ts": [
      "./mapped.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./usage.ts",
      [
        {
          "pos": 123,
          "end": 131,
          "code": 4109,
          "category": 1,
          "messageKey": "Type_arguments_for_0_circularly_reference_themselves_4109",
          "messageArgs": [
            "Array"
          ]
        },
        {
          "pos": 150,
          "end": 158,
          "code": 4110,
          "category": 1,
          "messageKey": "Tuple_type_arguments_circularly_reference_themselves_4110"
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./mapped.ts",
      "Js",
      2
    ],
    [
      "./usage.ts",
      "Js",
      3
    ]
  ],
  "size": 1936
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/mapped.ts
*refresh*    /home/src/workspaces/project/usage.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/mapped.ts
(computed .d.ts) /home/src/workspaces/project/usage.ts


Edit [3]:: no change

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96musage.ts[0m:[93m4[0m:[93m18[0m - [91merror[0m[90m TS4109: [0mType arguments for 'Array' circularly reference themselves.

[7m4[0m export const a = array[0];
[7m [0m [91m                 ~~~~~~~~[0m

[96musage.ts[0m:[93m5[0m:[93m18[0m - [91merror[0m[90m TS4110: [0mTuple type arguments circularly reference themselves.

[7m5[0m export const b = tuple[0];
[7m [0m [91m                 ~~~~~~~~[0m


Found 2 errors in the same file, starting at: usage.ts[90m:4[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
