currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/barrel.ts] *new* 
export { left } from "./left"; export { right } from "./right";
//// [/home/src/workspaces/project/factory.ts] *new* 
export { make } from "./model";
//// [/home/src/workspaces/project/hub.ts] *new* 
export const prefix = "hub";
//// [/home/src/workspaces/project/index.ts] *new* 
import { left, right } from "./barrel"; export const ids: string[] = [left.id, right.id];
//// [/home/src/workspaces/project/left.ts] *new* 
import { prefix } from "./hub"; import { make } from "./factory"; export const left = make(prefix); export { right } from "./right";
//// [/home/src/workspaces/project/model.ts] *new* 
export interface Model { id: string; } export function make(id: string): Model { return { id }; }
//// [/home/src/workspaces/project/right.ts] *new* 
import { prefix } from "./hub"; import { make } from "./factory"; export const right = make(prefix); export { left } from "./left";
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{"compilerOptions":{"strict":true,"noEmit":true,"incremental":true}}

tsgo 
ExitStatus:: Success
Output::
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
{"version":"FakeTSVersion","root":[[2,8]],"fileNames":["lib.es2025.full.d.ts","./hub.ts","./model.ts","./factory.ts","./right.ts","./left.ts","./barrel.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"e69fd43859d508fe2d52ada7fe216c06-export const prefix = \"hub\";","c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }","8c035626178906db4f73ee993640fecd-export { make } from \"./model\";","07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";","8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";","0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";","3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];"],"fileIdsList":[[5,6],[3],[7],[2,4,5],[2,4,6]],"options":{"strict":true},"referencedMap":[[7,1],[4,2],[8,3],[6,4],[5,5]],"affectedFilesPendingEmit":[7,4,2,8,6,3,5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./hub.ts",
        "./model.ts",
        "./factory.ts",
        "./right.ts",
        "./left.ts",
        "./barrel.ts",
        "./index.ts"
      ],
      "original": [
        2,
        8
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./hub.ts",
    "./model.ts",
    "./factory.ts",
    "./right.ts",
    "./left.ts",
    "./barrel.ts",
    "./index.ts"
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
      "fileName": "./hub.ts",
      "version": "e69fd43859d508fe2d52ada7fe216c06-export const prefix = \"hub\";",
      "signature": "e69fd43859d508fe2d52ada7fe216c06-export const prefix = \"hub\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./model.ts",
      "version": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "signature": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./factory.ts",
      "version": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "signature": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./right.ts",
      "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
      "signature": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./left.ts",
      "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
      "signature": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./barrel.ts",
      "version": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "signature": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "signature": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./right.ts",
      "./left.ts"
    ],
    [
      "./model.ts"
    ],
    [
      "./barrel.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./barrel.ts": [
      "./right.ts",
      "./left.ts"
    ],
    "./factory.ts": [
      "./model.ts"
    ],
    "./index.ts": [
      "./barrel.ts"
    ],
    "./left.ts": [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    "./right.ts": [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./barrel.ts",
      "Js",
      7
    ],
    [
      "./factory.ts",
      "Js",
      4
    ],
    [
      "./hub.ts",
      "Js",
      2
    ],
    [
      "./index.ts",
      "Js",
      8
    ],
    [
      "./left.ts",
      "Js",
      6
    ],
    [
      "./model.ts",
      "Js",
      3
    ],
    [
      "./right.ts",
      "Js",
      5
    ]
  ],
  "size": 1962
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*refresh*    /home/src/workspaces/project/hub.ts
*refresh*    /home/src/workspaces/project/model.ts
*refresh*    /home/src/workspaces/project/factory.ts
*refresh*    /home/src/workspaces/project/right.ts
*refresh*    /home/src/workspaces/project/left.ts
*refresh*    /home/src/workspaces/project/barrel.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::


Edit [0]:: no change

tsgo 
ExitStatus:: Success
Output::

tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [1]:: first comment only edit
//// [/home/src/workspaces/project/hub.ts] *modified* 
export const prefix = "hub";
// first edit


tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,8]],"fileNames":["lib.es2025.full.d.ts","./hub.ts","./model.ts","./factory.ts","./right.ts","./left.ts","./barrel.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0cc5c48d027554ce2074931a1f2ea370-export const prefix = \"hub\";\n// first edit\n","signature":"eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n","impliedNodeFormat":1},"c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }","8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",{"version":"07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";","signature":"5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n","impliedNodeFormat":1},{"version":"8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";","signature":"4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n","impliedNodeFormat":1},{"version":"0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";","signature":"f614ffe60290b2d15ae0fd0b4ce7ba1d-export { left } from \"./left\";\nexport { right } from \"./right\";\n","impliedNodeFormat":1},{"version":"3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];","signature":"17897b95b5d22b2e69f98a20dfe4df48-export declare const ids: string[];\n","impliedNodeFormat":1}],"fileIdsList":[[5,6],[3],[7],[2,4,5],[2,4,6]],"options":{"strict":true},"referencedMap":[[7,1],[4,2],[8,3],[6,4],[5,5]],"affectedFilesPendingEmit":[7,4,2,8,6,3,5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./hub.ts",
        "./model.ts",
        "./factory.ts",
        "./right.ts",
        "./left.ts",
        "./barrel.ts",
        "./index.ts"
      ],
      "original": [
        2,
        8
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./hub.ts",
    "./model.ts",
    "./factory.ts",
    "./right.ts",
    "./left.ts",
    "./barrel.ts",
    "./index.ts"
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
      "fileName": "./hub.ts",
      "version": "0cc5c48d027554ce2074931a1f2ea370-export const prefix = \"hub\";\n// first edit\n",
      "signature": "eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0cc5c48d027554ce2074931a1f2ea370-export const prefix = \"hub\";\n// first edit\n",
        "signature": "eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./model.ts",
      "version": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "signature": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./factory.ts",
      "version": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "signature": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./right.ts",
      "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
      "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
        "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./left.ts",
      "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
      "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
        "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./barrel.ts",
      "version": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "signature": "f614ffe60290b2d15ae0fd0b4ce7ba1d-export { left } from \"./left\";\nexport { right } from \"./right\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
        "signature": "f614ffe60290b2d15ae0fd0b4ce7ba1d-export { left } from \"./left\";\nexport { right } from \"./right\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "signature": "17897b95b5d22b2e69f98a20dfe4df48-export declare const ids: string[];\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
        "signature": "17897b95b5d22b2e69f98a20dfe4df48-export declare const ids: string[];\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./right.ts",
      "./left.ts"
    ],
    [
      "./model.ts"
    ],
    [
      "./barrel.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./barrel.ts": [
      "./right.ts",
      "./left.ts"
    ],
    "./factory.ts": [
      "./model.ts"
    ],
    "./index.ts": [
      "./barrel.ts"
    ],
    "./left.ts": [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    "./right.ts": [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./barrel.ts",
      "Js",
      7
    ],
    [
      "./factory.ts",
      "Js",
      4
    ],
    [
      "./hub.ts",
      "Js",
      2
    ],
    [
      "./index.ts",
      "Js",
      8
    ],
    [
      "./left.ts",
      "Js",
      6
    ],
    [
      "./model.ts",
      "Js",
      3
    ],
    [
      "./right.ts",
      "Js",
      5
    ]
  ],
  "size": 2717
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/hub.ts
*refresh*    /home/src/workspaces/project/right.ts
*refresh*    /home/src/workspaces/project/left.ts
*refresh*    /home/src/workspaces/project/barrel.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/hub.ts
(computed .d.ts) /home/src/workspaces/project/right.ts
(computed .d.ts) /home/src/workspaces/project/left.ts
(computed .d.ts) /home/src/workspaces/project/barrel.ts
(computed .d.ts) /home/src/workspaces/project/index.ts


Edit [2]:: second comment only edit
//// [/home/src/workspaces/project/hub.ts] *modified* 
export const prefix = "hub";
// first edit

// second edit


tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,8]],"fileNames":["lib.es2025.full.d.ts","./hub.ts","./model.ts","./factory.ts","./right.ts","./left.ts","./barrel.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"df41fd128159de07c8cd657d90367a14-export const prefix = \"hub\";\n// first edit\n\n// second edit\n","signature":"eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n","impliedNodeFormat":1},"c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }","8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",{"version":"07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";","signature":"5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n","impliedNodeFormat":1},{"version":"8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";","signature":"4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n","impliedNodeFormat":1},{"version":"0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";","signature":"f614ffe60290b2d15ae0fd0b4ce7ba1d-export { left } from \"./left\";\nexport { right } from \"./right\";\n","impliedNodeFormat":1},{"version":"3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];","signature":"17897b95b5d22b2e69f98a20dfe4df48-export declare const ids: string[];\n","impliedNodeFormat":1}],"fileIdsList":[[5,6],[3],[7],[2,4,5],[2,4,6]],"options":{"strict":true},"referencedMap":[[7,1],[4,2],[8,3],[6,4],[5,5]],"affectedFilesPendingEmit":[7,4,2,8,6,3,5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./hub.ts",
        "./model.ts",
        "./factory.ts",
        "./right.ts",
        "./left.ts",
        "./barrel.ts",
        "./index.ts"
      ],
      "original": [
        2,
        8
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./hub.ts",
    "./model.ts",
    "./factory.ts",
    "./right.ts",
    "./left.ts",
    "./barrel.ts",
    "./index.ts"
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
      "fileName": "./hub.ts",
      "version": "df41fd128159de07c8cd657d90367a14-export const prefix = \"hub\";\n// first edit\n\n// second edit\n",
      "signature": "eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "df41fd128159de07c8cd657d90367a14-export const prefix = \"hub\";\n// first edit\n\n// second edit\n",
        "signature": "eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./model.ts",
      "version": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "signature": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./factory.ts",
      "version": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "signature": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./right.ts",
      "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
      "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
        "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./left.ts",
      "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
      "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
        "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./barrel.ts",
      "version": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "signature": "f614ffe60290b2d15ae0fd0b4ce7ba1d-export { left } from \"./left\";\nexport { right } from \"./right\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
        "signature": "f614ffe60290b2d15ae0fd0b4ce7ba1d-export { left } from \"./left\";\nexport { right } from \"./right\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./index.ts",
      "version": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "signature": "17897b95b5d22b2e69f98a20dfe4df48-export declare const ids: string[];\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
        "signature": "17897b95b5d22b2e69f98a20dfe4df48-export declare const ids: string[];\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./right.ts",
      "./left.ts"
    ],
    [
      "./model.ts"
    ],
    [
      "./barrel.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./barrel.ts": [
      "./right.ts",
      "./left.ts"
    ],
    "./factory.ts": [
      "./model.ts"
    ],
    "./index.ts": [
      "./barrel.ts"
    ],
    "./left.ts": [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    "./right.ts": [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./barrel.ts",
      "Js",
      7
    ],
    [
      "./factory.ts",
      "Js",
      4
    ],
    [
      "./hub.ts",
      "Js",
      2
    ],
    [
      "./index.ts",
      "Js",
      8
    ],
    [
      "./left.ts",
      "Js",
      6
    ],
    [
      "./model.ts",
      "Js",
      3
    ],
    [
      "./right.ts",
      "Js",
      5
    ]
  ],
  "size": 2735
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/hub.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/hub.ts


Edit [3]:: change the shared value type
//// [/home/src/workspaces/project/hub.ts] *modified* 
export const prefix = 10;
// first edit

// second edit


tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mleft.ts[0m:[93m1[0m:[93m92[0m - [91merror[0m[90m TS2345: [0mArgument of type 'number' is not assignable to parameter of type 'string'.

[7m1[0m import { prefix } from "./hub"; import { make } from "./factory"; export const left = make(prefix); export { right } from "./right";
[7m [0m [91m                                                                                           ~~~~~~[0m

[96mright.ts[0m:[93m1[0m:[93m93[0m - [91merror[0m[90m TS2345: [0mArgument of type 'number' is not assignable to parameter of type 'string'.

[7m1[0m import { prefix } from "./hub"; import { make } from "./factory"; export const right = make(prefix); export { left } from "./left";
[7m [0m [91m                                                                                            ~~~~~~[0m


Found 2 errors in 2 files.

Errors  Files
     1  left.ts[90m:1[0m
     1  right.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,8]],"fileNames":["lib.es2025.full.d.ts","./hub.ts","./model.ts","./factory.ts","./right.ts","./left.ts","./barrel.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7a581f3c32763bd712056d8cf58fc0b0-export const prefix = 10;\n// first edit\n\n// second edit\n","signature":"a434d648ec62f01f82ba7bc6df302f43-export declare const prefix = 10;\n","impliedNodeFormat":1},"c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }","8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",{"version":"07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";","signature":"5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n","impliedNodeFormat":1},{"version":"8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";","signature":"4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n","impliedNodeFormat":1},"0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";","3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];"],"fileIdsList":[[5,6],[3],[7],[2,4,5],[2,4,6]],"options":{"strict":true},"referencedMap":[[7,1],[4,2],[8,3],[6,4],[5,5]],"semanticDiagnosticsPerFile":[[5,[{"pos":92,"end":98,"code":2345,"category":1,"messageKey":"Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_2345","messageArgs":["number","string"]}]],[6,[{"pos":91,"end":97,"code":2345,"category":1,"messageKey":"Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_2345","messageArgs":["number","string"]}]]],"affectedFilesPendingEmit":[7,4,2,8,6,3,5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./hub.ts",
        "./model.ts",
        "./factory.ts",
        "./right.ts",
        "./left.ts",
        "./barrel.ts",
        "./index.ts"
      ],
      "original": [
        2,
        8
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./hub.ts",
    "./model.ts",
    "./factory.ts",
    "./right.ts",
    "./left.ts",
    "./barrel.ts",
    "./index.ts"
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
      "fileName": "./hub.ts",
      "version": "7a581f3c32763bd712056d8cf58fc0b0-export const prefix = 10;\n// first edit\n\n// second edit\n",
      "signature": "a434d648ec62f01f82ba7bc6df302f43-export declare const prefix = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7a581f3c32763bd712056d8cf58fc0b0-export const prefix = 10;\n// first edit\n\n// second edit\n",
        "signature": "a434d648ec62f01f82ba7bc6df302f43-export declare const prefix = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./model.ts",
      "version": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "signature": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./factory.ts",
      "version": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "signature": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./right.ts",
      "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
      "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
        "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./left.ts",
      "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
      "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
        "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./barrel.ts",
      "version": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "signature": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "signature": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./right.ts",
      "./left.ts"
    ],
    [
      "./model.ts"
    ],
    [
      "./barrel.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./barrel.ts": [
      "./right.ts",
      "./left.ts"
    ],
    "./factory.ts": [
      "./model.ts"
    ],
    "./index.ts": [
      "./barrel.ts"
    ],
    "./left.ts": [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    "./right.ts": [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./right.ts",
      [
        {
          "pos": 92,
          "end": 98,
          "code": 2345,
          "category": 1,
          "messageKey": "Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_2345",
          "messageArgs": [
            "number",
            "string"
          ]
        }
      ]
    ],
    [
      "./left.ts",
      [
        {
          "pos": 91,
          "end": 97,
          "code": 2345,
          "category": 1,
          "messageKey": "Argument_of_type_0_is_not_assignable_to_parameter_of_type_1_2345",
          "messageArgs": [
            "number",
            "string"
          ]
        }
      ]
    ]
  ],
  "affectedFilesPendingEmit": [
    [
      "./barrel.ts",
      "Js",
      7
    ],
    [
      "./factory.ts",
      "Js",
      4
    ],
    [
      "./hub.ts",
      "Js",
      2
    ],
    [
      "./index.ts",
      "Js",
      8
    ],
    [
      "./left.ts",
      "Js",
      6
    ],
    [
      "./model.ts",
      "Js",
      3
    ],
    [
      "./right.ts",
      "Js",
      5
    ]
  ],
  "size": 2815
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/hub.ts
*refresh*    /home/src/workspaces/project/right.ts
*refresh*    /home/src/workspaces/project/left.ts
*refresh*    /home/src/workspaces/project/barrel.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/hub.ts
(computed .d.ts) /home/src/workspaces/project/right.ts
(computed .d.ts) /home/src/workspaces/project/left.ts
(used version)   /home/src/workspaces/project/barrel.ts
(used version)   /home/src/workspaces/project/index.ts


Edit [4]:: change the inferred type through the barrel
//// [/home/src/workspaces/project/model.ts] *modified* 
export interface Model { id: number; } export function make(id: number): Model { return { id }; }

tsgo 
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[96mindex.ts[0m:[93m1[0m:[93m71[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m import { left, right } from "./barrel"; export const ids: string[] = [left.id, right.id];
[7m [0m [91m                                                                      ~~~~~~~[0m

[96mindex.ts[0m:[93m1[0m:[93m80[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m1[0m import { left, right } from "./barrel"; export const ids: string[] = [left.id, right.id];
[7m [0m [91m                                                                               ~~~~~~~~[0m


Found 2 errors in the same file, starting at: index.ts[90m:1[0m

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,8]],"fileNames":["lib.es2025.full.d.ts","./hub.ts","./model.ts","./factory.ts","./right.ts","./left.ts","./barrel.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"7a581f3c32763bd712056d8cf58fc0b0-export const prefix = 10;\n// first edit\n\n// second edit\n","signature":"a434d648ec62f01f82ba7bc6df302f43-export declare const prefix = 10;\n","impliedNodeFormat":1},{"version":"a5bcf1db41c7b2b195764099f803185d-export interface Model { id: number; } export function make(id: number): Model { return { id }; }","signature":"755c74df06b876a52b12daa9bd085134-export interface Model {\n    id: number;\n}\nexport declare function make(id: number): Model;\n","impliedNodeFormat":1},{"version":"8c035626178906db4f73ee993640fecd-export { make } from \"./model\";","signature":"8bc5b2140b7efd4a238218fee9ed0bed-export { make } from \"./model\";\n","impliedNodeFormat":1},{"version":"07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";","signature":"5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n","impliedNodeFormat":1},{"version":"8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";","signature":"4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n","impliedNodeFormat":1},"0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";","3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];"],"fileIdsList":[[5,6],[3],[7],[2,4,5],[2,4,6]],"options":{"strict":true},"referencedMap":[[7,1],[4,2],[8,3],[6,4],[5,5]],"semanticDiagnosticsPerFile":[[8,[{"pos":70,"end":77,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]},{"pos":79,"end":87,"code":2322,"category":1,"messageKey":"Type_0_is_not_assignable_to_type_1_2322","messageArgs":["number","string"]}]]],"affectedFilesPendingEmit":[7,4,2,8,6,3,5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./hub.ts",
        "./model.ts",
        "./factory.ts",
        "./right.ts",
        "./left.ts",
        "./barrel.ts",
        "./index.ts"
      ],
      "original": [
        2,
        8
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./hub.ts",
    "./model.ts",
    "./factory.ts",
    "./right.ts",
    "./left.ts",
    "./barrel.ts",
    "./index.ts"
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
      "fileName": "./hub.ts",
      "version": "7a581f3c32763bd712056d8cf58fc0b0-export const prefix = 10;\n// first edit\n\n// second edit\n",
      "signature": "a434d648ec62f01f82ba7bc6df302f43-export declare const prefix = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "7a581f3c32763bd712056d8cf58fc0b0-export const prefix = 10;\n// first edit\n\n// second edit\n",
        "signature": "a434d648ec62f01f82ba7bc6df302f43-export declare const prefix = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./model.ts",
      "version": "a5bcf1db41c7b2b195764099f803185d-export interface Model { id: number; } export function make(id: number): Model { return { id }; }",
      "signature": "755c74df06b876a52b12daa9bd085134-export interface Model {\n    id: number;\n}\nexport declare function make(id: number): Model;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "a5bcf1db41c7b2b195764099f803185d-export interface Model { id: number; } export function make(id: number): Model { return { id }; }",
        "signature": "755c74df06b876a52b12daa9bd085134-export interface Model {\n    id: number;\n}\nexport declare function make(id: number): Model;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./factory.ts",
      "version": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "signature": "8bc5b2140b7efd4a238218fee9ed0bed-export { make } from \"./model\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
        "signature": "8bc5b2140b7efd4a238218fee9ed0bed-export { make } from \"./model\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./right.ts",
      "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
      "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
        "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./left.ts",
      "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
      "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
        "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./barrel.ts",
      "version": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "signature": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "signature": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./right.ts",
      "./left.ts"
    ],
    [
      "./model.ts"
    ],
    [
      "./barrel.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./barrel.ts": [
      "./right.ts",
      "./left.ts"
    ],
    "./factory.ts": [
      "./model.ts"
    ],
    "./index.ts": [
      "./barrel.ts"
    ],
    "./left.ts": [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    "./right.ts": [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    [
      "./index.ts",
      [
        {
          "pos": 70,
          "end": 77,
          "code": 2322,
          "category": 1,
          "messageKey": "Type_0_is_not_assignable_to_type_1_2322",
          "messageArgs": [
            "number",
            "string"
          ]
        },
        {
          "pos": 79,
          "end": 87,
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
  "affectedFilesPendingEmit": [
    [
      "./barrel.ts",
      "Js",
      7
    ],
    [
      "./factory.ts",
      "Js",
      4
    ],
    [
      "./hub.ts",
      "Js",
      2
    ],
    [
      "./index.ts",
      "Js",
      8
    ],
    [
      "./left.ts",
      "Js",
      6
    ],
    [
      "./model.ts",
      "Js",
      3
    ],
    [
      "./right.ts",
      "Js",
      5
    ]
  ],
  "size": 3054
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/model.ts
*refresh*    /home/src/workspaces/project/factory.ts
*refresh*    /home/src/workspaces/project/right.ts
*refresh*    /home/src/workspaces/project/left.ts
*refresh*    /home/src/workspaces/project/barrel.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/model.ts
(computed .d.ts) /home/src/workspaces/project/factory.ts
(computed .d.ts) /home/src/workspaces/project/right.ts
(computed .d.ts) /home/src/workspaces/project/left.ts
(used version)   /home/src/workspaces/project/barrel.ts
(used version)   /home/src/workspaces/project/index.ts


Edit [5]:: restore both shared dependencies
//// [/home/src/workspaces/project/hub.ts] *modified* 
export const prefix = "hub";
// first edit

// second edit

//// [/home/src/workspaces/project/model.ts] *modified* 
export interface Model { id: string; } export function make(id: string): Model { return { id }; }

tsgo 
ExitStatus:: Success
Output::
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,8]],"fileNames":["lib.es2025.full.d.ts","./hub.ts","./model.ts","./factory.ts","./right.ts","./left.ts","./barrel.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"df41fd128159de07c8cd657d90367a14-export const prefix = \"hub\";\n// first edit\n\n// second edit\n","signature":"eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n","impliedNodeFormat":1},{"version":"c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }","signature":"c7653311ee886021d70d18d464ff2d71-export interface Model {\n    id: string;\n}\nexport declare function make(id: string): Model;\n","impliedNodeFormat":1},{"version":"8c035626178906db4f73ee993640fecd-export { make } from \"./model\";","signature":"8bc5b2140b7efd4a238218fee9ed0bed-export { make } from \"./model\";\n","impliedNodeFormat":1},{"version":"07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";","signature":"5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n","impliedNodeFormat":1},{"version":"8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";","signature":"4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n","impliedNodeFormat":1},"0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";","3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];"],"fileIdsList":[[5,6],[3],[7],[2,4,5],[2,4,6]],"options":{"strict":true},"referencedMap":[[7,1],[4,2],[8,3],[6,4],[5,5]],"affectedFilesPendingEmit":[7,4,2,8,6,3,5]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./hub.ts",
        "./model.ts",
        "./factory.ts",
        "./right.ts",
        "./left.ts",
        "./barrel.ts",
        "./index.ts"
      ],
      "original": [
        2,
        8
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./hub.ts",
    "./model.ts",
    "./factory.ts",
    "./right.ts",
    "./left.ts",
    "./barrel.ts",
    "./index.ts"
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
      "fileName": "./hub.ts",
      "version": "df41fd128159de07c8cd657d90367a14-export const prefix = \"hub\";\n// first edit\n\n// second edit\n",
      "signature": "eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "df41fd128159de07c8cd657d90367a14-export const prefix = \"hub\";\n// first edit\n\n// second edit\n",
        "signature": "eee9e59e027e6765a0d5610b039f5e8a-export declare const prefix = \"hub\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./model.ts",
      "version": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
      "signature": "c7653311ee886021d70d18d464ff2d71-export interface Model {\n    id: string;\n}\nexport declare function make(id: string): Model;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c3a0075202bda4cd9036e02a547ec2c5-export interface Model { id: string; } export function make(id: string): Model { return { id }; }",
        "signature": "c7653311ee886021d70d18d464ff2d71-export interface Model {\n    id: string;\n}\nexport declare function make(id: string): Model;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./factory.ts",
      "version": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
      "signature": "8bc5b2140b7efd4a238218fee9ed0bed-export { make } from \"./model\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8c035626178906db4f73ee993640fecd-export { make } from \"./model\";",
        "signature": "8bc5b2140b7efd4a238218fee9ed0bed-export { make } from \"./model\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./right.ts",
      "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
      "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "07e82acbe36641a8ce675b19260fa5a2-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const right = make(prefix); export { left } from \"./left\";",
        "signature": "5384af1820c5ff2c360cadd81ece6963-export declare const right: import(\"./model\").Model;\nexport { left } from \"./left\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./left.ts",
      "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
      "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8787d0bbf1b6fc034a8dddf15a994040-import { prefix } from \"./hub\"; import { make } from \"./factory\"; export const left = make(prefix); export { right } from \"./right\";",
        "signature": "4cb928914cdf7892b933ea43a96add55-export declare const left: import(\"./model\").Model;\nexport { right } from \"./right\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./barrel.ts",
      "version": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "signature": "0b617de94256baa3cd1e090732042a0a-export { left } from \"./left\"; export { right } from \"./right\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./index.ts",
      "version": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "signature": "3f3b96b60ee7fcf8db28c5a0509c1d85-import { left, right } from \"./barrel\"; export const ids: string[] = [left.id, right.id];",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./right.ts",
      "./left.ts"
    ],
    [
      "./model.ts"
    ],
    [
      "./barrel.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  ],
  "options": {
    "strict": true
  },
  "referencedMap": {
    "./barrel.ts": [
      "./right.ts",
      "./left.ts"
    ],
    "./factory.ts": [
      "./model.ts"
    ],
    "./index.ts": [
      "./barrel.ts"
    ],
    "./left.ts": [
      "./hub.ts",
      "./factory.ts",
      "./right.ts"
    ],
    "./right.ts": [
      "./hub.ts",
      "./factory.ts",
      "./left.ts"
    ]
  },
  "affectedFilesPendingEmit": [
    [
      "./barrel.ts",
      "Js",
      7
    ],
    [
      "./factory.ts",
      "Js",
      4
    ],
    [
      "./hub.ts",
      "Js",
      2
    ],
    [
      "./index.ts",
      "Js",
      8
    ],
    [
      "./left.ts",
      "Js",
      6
    ],
    [
      "./model.ts",
      "Js",
      3
    ],
    [
      "./right.ts",
      "Js",
      5
    ]
  ],
  "size": 2759
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/hub.ts
*refresh*    /home/src/workspaces/project/model.ts
*refresh*    /home/src/workspaces/project/factory.ts
*refresh*    /home/src/workspaces/project/right.ts
*refresh*    /home/src/workspaces/project/left.ts
*refresh*    /home/src/workspaces/project/barrel.ts
*refresh*    /home/src/workspaces/project/index.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/hub.ts
(computed .d.ts) /home/src/workspaces/project/model.ts
(computed .d.ts) /home/src/workspaces/project/factory.ts
(computed .d.ts) /home/src/workspaces/project/right.ts
(computed .d.ts) /home/src/workspaces/project/left.ts
(used version)   /home/src/workspaces/project/barrel.ts
(used version)   /home/src/workspaces/project/index.ts
