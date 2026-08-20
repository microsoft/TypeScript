currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/node_modules/dep-a/index.d.ts] *new* 
export type Kind = "a" | "b";
//// [/home/src/workspaces/project/node_modules/dep-a/package.json] *new* 
{
    "name": "dep-a",
    "version": "1.0.0",
    "types": "index.d.ts"
}
//// [/home/src/workspaces/project/node_modules/dep-b/index.d.ts] *new* 
declare global {
    interface DepBGlobal {
        marker: string;
    }
}
export {};
//// [/home/src/workspaces/project/node_modules/dep-b/package.json] *new* 
{
    "name": "dep-b",
    "version": "1.0.0",
    "types": "index.d.ts"
}
//// [/home/src/workspaces/project/src/consumer.ts] *new* 
import type { Kind } from "./middle";
export function describe(kind: Kind): string {
    switch (kind) {
        case "a":
            return "first";
        case "b":
            return "second";
    }
}
//// [/home/src/workspaces/project/src/env.ts] *new* 
import "dep-b";
//// [/home/src/workspaces/project/src/middle.ts] *new* 
export type { Kind } from "dep-a";
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": true,
        "outDir": "dist",
        "strict": true
    },
    "include": ["src/**/*"]
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

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
//// [/home/src/workspaces/project/dist/src/consumer.d.ts] *new* 
import type { Kind } from "./middle";
export declare function describe(kind: Kind): string;

//// [/home/src/workspaces/project/dist/src/consumer.js] *new* 
export function describe(kind) {
    switch (kind) {
        case "a":
            return "first";
        case "b":
            return "second";
    }
}

//// [/home/src/workspaces/project/dist/src/env.d.ts] *new* 
import "dep-b";

//// [/home/src/workspaces/project/dist/src/env.js] *new* 
import "dep-b";

//// [/home/src/workspaces/project/dist/src/middle.d.ts] *new* 
export type { Kind } from "dep-a";

//// [/home/src/workspaces/project/dist/src/middle.js] *new* 
export {};

//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[3,4],6],"packageJsons":["../node_modules/dep-a/package.json","../node_modules/dep-b/package.json"],"fileNames":["lib.es2025.full.d.ts","../node_modules/dep-a/index.d.ts","../src/middle.ts","../src/consumer.ts","../node_modules/dep-b/index.d.ts","../src/env.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"7285be383f876947b8aaab3a6c0cb768-export type Kind = \"a\" | \"b\";",{"version":"c4e56d4d984b8f64c79f77ff5567b1ee-export type { Kind } from \"dep-a\";","signature":"df2d778f658765e085183f887f4c1fae-export type { Kind } from \"dep-a\";\n","impliedNodeFormat":1},{"version":"0bb05d7e49a1dc35d9c9a5249d6aefec-import type { Kind } from \"./middle\";\nexport function describe(kind: Kind): string {\n    switch (kind) {\n        case \"a\":\n            return \"first\";\n        case \"b\":\n            return \"second\";\n    }\n}","signature":"8b084aefefe47768ddf637170d0ce7f9-import type { Kind } from \"./middle\";\nexport declare function describe(kind: Kind): string;\n","impliedNodeFormat":1},{"version":"a94fea4b430695b9dbaf2f04eab64c1e-declare global {\n    interface DepBGlobal {\n        marker: string;\n    }\n}\nexport {};","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";","signature":"9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5],[2]],"options":{"composite":true,"outDir":"./","strict":true},"referencedMap":[[4,1],[6,2],[3,3]],"latestChangedDtsFile":"./src/env.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/middle.ts",
        "../src/consumer.ts"
      ],
      "original": [
        3,
        4
      ]
    },
    {
      "files": [
        "../src/env.ts"
      ],
      "original": 6
    }
  ],
  "packageJsons": [
    "../node_modules/dep-a/package.json",
    "../node_modules/dep-b/package.json"
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../node_modules/dep-a/index.d.ts",
    "../src/middle.ts",
    "../src/consumer.ts",
    "../node_modules/dep-b/index.d.ts",
    "../src/env.ts"
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
      "fileName": "../node_modules/dep-a/index.d.ts",
      "version": "7285be383f876947b8aaab3a6c0cb768-export type Kind = \"a\" | \"b\";",
      "signature": "7285be383f876947b8aaab3a6c0cb768-export type Kind = \"a\" | \"b\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/middle.ts",
      "version": "c4e56d4d984b8f64c79f77ff5567b1ee-export type { Kind } from \"dep-a\";",
      "signature": "df2d778f658765e085183f887f4c1fae-export type { Kind } from \"dep-a\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c4e56d4d984b8f64c79f77ff5567b1ee-export type { Kind } from \"dep-a\";",
        "signature": "df2d778f658765e085183f887f4c1fae-export type { Kind } from \"dep-a\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/consumer.ts",
      "version": "0bb05d7e49a1dc35d9c9a5249d6aefec-import type { Kind } from \"./middle\";\nexport function describe(kind: Kind): string {\n    switch (kind) {\n        case \"a\":\n            return \"first\";\n        case \"b\":\n            return \"second\";\n    }\n}",
      "signature": "8b084aefefe47768ddf637170d0ce7f9-import type { Kind } from \"./middle\";\nexport declare function describe(kind: Kind): string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0bb05d7e49a1dc35d9c9a5249d6aefec-import type { Kind } from \"./middle\";\nexport function describe(kind: Kind): string {\n    switch (kind) {\n        case \"a\":\n            return \"first\";\n        case \"b\":\n            return \"second\";\n    }\n}",
        "signature": "8b084aefefe47768ddf637170d0ce7f9-import type { Kind } from \"./middle\";\nexport declare function describe(kind: Kind): string;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/dep-b/index.d.ts",
      "version": "a94fea4b430695b9dbaf2f04eab64c1e-declare global {\n    interface DepBGlobal {\n        marker: string;\n    }\n}\nexport {};",
      "signature": "a94fea4b430695b9dbaf2f04eab64c1e-declare global {\n    interface DepBGlobal {\n        marker: string;\n    }\n}\nexport {};",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a94fea4b430695b9dbaf2f04eab64c1e-declare global {\n    interface DepBGlobal {\n        marker: string;\n    }\n}\nexport {};",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/env.ts",
      "version": "fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";",
      "signature": "9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";",
        "signature": "9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../src/middle.ts"
    ],
    [
      "../node_modules/dep-b/index.d.ts"
    ],
    [
      "../node_modules/dep-a/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../src/consumer.ts": [
      "../src/middle.ts"
    ],
    "../src/env.ts": [
      "../node_modules/dep-b/index.d.ts"
    ],
    "../src/middle.ts": [
      "../node_modules/dep-a/index.d.ts"
    ]
  },
  "latestChangedDtsFile": "./src/env.d.ts",
  "size": 2282
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/dep-a/index.d.ts
*refresh*    /home/src/workspaces/project/src/middle.ts
*refresh*    /home/src/workspaces/project/src/consumer.ts
*refresh*    /home/src/workspaces/project/node_modules/dep-b/index.d.ts
*refresh*    /home/src/workspaces/project/src/env.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/middle.ts
(stored at emit) /home/src/workspaces/project/src/consumer.ts
(stored at emit) /home/src/workspaces/project/src/env.ts


Edit [0]:: update dep-a with a breaking type change and dep-b with a global scope change in one batch
//// [/home/src/workspaces/project/node_modules/dep-a/index.d.ts] *modified* 
export type Kind = "a" | "b" | "c";
//// [/home/src/workspaces/project/node_modules/dep-b/index.d.ts] *modified* 
declare global {
    interface DepBGlobal {
        marker: string;
        extra: number;
    }
}
export {};

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'dist/tsconfig.tsbuildinfo' is older than input 'node_modules/dep-a/index.d.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/consumer.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2366: [0mFunction lacks ending return statement and return type does not include 'undefined'.

[7m2[0m export function describe(kind: Kind): string {
[7m [0m [91m                                      ~~~~~~[0m


Found 1 error in src/consumer.ts[90m:2[0m

//// [/home/src/workspaces/project/dist/src/consumer.js] *rewrite with same content*
//// [/home/src/workspaces/project/dist/src/env.js] *rewrite with same content*
//// [/home/src/workspaces/project/dist/src/middle.js] *rewrite with same content*
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[3,4],6],"packageJsons":["../node_modules/dep-a/package.json","../node_modules/dep-b/package.json"],"fileNames":["lib.es2025.full.d.ts","../node_modules/dep-a/index.d.ts","../src/middle.ts","../src/consumer.ts","../node_modules/dep-b/index.d.ts","../src/env.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"a4e0198c11df73a2e4b2aeeeedc6b0df-export type Kind = \"a\" | \"b\" | \"c\";",{"version":"c4e56d4d984b8f64c79f77ff5567b1ee-export type { Kind } from \"dep-a\";","signature":"df2d778f658765e085183f887f4c1fae-export type { Kind } from \"dep-a\";\n","impliedNodeFormat":1},{"version":"0bb05d7e49a1dc35d9c9a5249d6aefec-import type { Kind } from \"./middle\";\nexport function describe(kind: Kind): string {\n    switch (kind) {\n        case \"a\":\n            return \"first\";\n        case \"b\":\n            return \"second\";\n    }\n}","signature":"8b084aefefe47768ddf637170d0ce7f9-import type { Kind } from \"./middle\";\nexport declare function describe(kind: Kind): string;\n","impliedNodeFormat":1},{"version":"5364f0cc80bb7f0d214b5e9af5f5dc54-declare global {\n    interface DepBGlobal {\n        marker: string;\n        extra: number;\n    }\n}\nexport {};","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";","signature":"9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5],[2]],"options":{"composite":true,"outDir":"./","strict":true},"referencedMap":[[4,1],[6,2],[3,3]],"semanticDiagnosticsPerFile":[[4,[{"pos":76,"end":82,"code":2366,"category":1,"messageKey":"Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined_2366"}]]],"latestChangedDtsFile":"./src/env.d.ts"}
//// [/home/src/workspaces/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/middle.ts",
        "../src/consumer.ts"
      ],
      "original": [
        3,
        4
      ]
    },
    {
      "files": [
        "../src/env.ts"
      ],
      "original": 6
    }
  ],
  "packageJsons": [
    "../node_modules/dep-a/package.json",
    "../node_modules/dep-b/package.json"
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "../node_modules/dep-a/index.d.ts",
    "../src/middle.ts",
    "../src/consumer.ts",
    "../node_modules/dep-b/index.d.ts",
    "../src/env.ts"
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
      "fileName": "../node_modules/dep-a/index.d.ts",
      "version": "a4e0198c11df73a2e4b2aeeeedc6b0df-export type Kind = \"a\" | \"b\" | \"c\";",
      "signature": "a4e0198c11df73a2e4b2aeeeedc6b0df-export type Kind = \"a\" | \"b\" | \"c\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "../src/middle.ts",
      "version": "c4e56d4d984b8f64c79f77ff5567b1ee-export type { Kind } from \"dep-a\";",
      "signature": "df2d778f658765e085183f887f4c1fae-export type { Kind } from \"dep-a\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c4e56d4d984b8f64c79f77ff5567b1ee-export type { Kind } from \"dep-a\";",
        "signature": "df2d778f658765e085183f887f4c1fae-export type { Kind } from \"dep-a\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/consumer.ts",
      "version": "0bb05d7e49a1dc35d9c9a5249d6aefec-import type { Kind } from \"./middle\";\nexport function describe(kind: Kind): string {\n    switch (kind) {\n        case \"a\":\n            return \"first\";\n        case \"b\":\n            return \"second\";\n    }\n}",
      "signature": "8b084aefefe47768ddf637170d0ce7f9-import type { Kind } from \"./middle\";\nexport declare function describe(kind: Kind): string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0bb05d7e49a1dc35d9c9a5249d6aefec-import type { Kind } from \"./middle\";\nexport function describe(kind: Kind): string {\n    switch (kind) {\n        case \"a\":\n            return \"first\";\n        case \"b\":\n            return \"second\";\n    }\n}",
        "signature": "8b084aefefe47768ddf637170d0ce7f9-import type { Kind } from \"./middle\";\nexport declare function describe(kind: Kind): string;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../node_modules/dep-b/index.d.ts",
      "version": "5364f0cc80bb7f0d214b5e9af5f5dc54-declare global {\n    interface DepBGlobal {\n        marker: string;\n        extra: number;\n    }\n}\nexport {};",
      "signature": "5364f0cc80bb7f0d214b5e9af5f5dc54-declare global {\n    interface DepBGlobal {\n        marker: string;\n        extra: number;\n    }\n}\nexport {};",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5364f0cc80bb7f0d214b5e9af5f5dc54-declare global {\n    interface DepBGlobal {\n        marker: string;\n        extra: number;\n    }\n}\nexport {};",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../src/env.ts",
      "version": "fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";",
      "signature": "9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "fcc1d4c4b073cc5a548e7244f608884c-import \"dep-b\";",
        "signature": "9fb8fd76a089f5d7d03937148c718fd8-import \"dep-b\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../src/middle.ts"
    ],
    [
      "../node_modules/dep-b/index.d.ts"
    ],
    [
      "../node_modules/dep-a/index.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "outDir": "./",
    "strict": true
  },
  "referencedMap": {
    "../src/consumer.ts": [
      "../src/middle.ts"
    ],
    "../src/env.ts": [
      "../node_modules/dep-b/index.d.ts"
    ],
    "../src/middle.ts": [
      "../node_modules/dep-a/index.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "../src/consumer.ts",
      [
        {
          "pos": 76,
          "end": 82,
          "code": 2366,
          "category": 1,
          "messageKey": "Function_lacks_ending_return_statement_and_return_type_does_not_include_undefined_2366"
        }
      ]
    ]
  ],
  "latestChangedDtsFile": "./src/env.d.ts",
  "size": 2498
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/dep-a/index.d.ts
*refresh*    /home/src/workspaces/project/src/middle.ts
*refresh*    /home/src/workspaces/project/src/consumer.ts
*refresh*    /home/src/workspaces/project/node_modules/dep-b/index.d.ts
*refresh*    /home/src/workspaces/project/src/env.ts
Signatures::
(used version)   /home/src/workspaces/project/node_modules/dep-a/index.d.ts
(computed .d.ts) /home/src/workspaces/project/src/middle.ts
(computed .d.ts) /home/src/workspaces/project/src/consumer.ts
(used version)   /home/src/workspaces/project/node_modules/dep-b/index.d.ts
(computed .d.ts) /home/src/workspaces/project/src/env.ts


Edit [1]:: no change

tsgo --b --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'dist/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[96msrc/consumer.ts[0m:[93m2[0m:[93m39[0m - [91merror[0m[90m TS2366: [0mFunction lacks ending return statement and return type does not include 'undefined'.

[7m2[0m export function describe(kind: Kind): string {
[7m [0m [91m                                      ~~~~~~[0m


Found 1 error in src/consumer.ts[90m:2[0m


tsconfig.json::
SemanticDiagnostics::
Signatures::
