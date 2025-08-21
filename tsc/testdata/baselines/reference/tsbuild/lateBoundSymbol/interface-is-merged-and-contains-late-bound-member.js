currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/globals.d.ts] *new* 
interface SymbolConstructor {
    (description?: string | number): symbol;
}
declare var Symbol: SymbolConstructor;
//// [/home/src/workspaces/project/src/hkt.ts] *new* 
export interface HKT<T> { }
//// [/home/src/workspaces/project/src/main.ts] *new* 
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}
const x = 10;
type A = HKT<number>[typeof sym];
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "rootDir": "src",
        "incremental": true,
    },
}

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

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
//// [/home/src/workspaces/project/src/hkt.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

//// [/home/src/workspaces/project/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sym = Symbol();
const x = 10;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;","affectsGlobalScope":true,"impliedNodeFormat":1},"25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }","13c368d0fdd135ce10c5200ffd5a0664-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\nconst x = 10;\ntype A = HKT<number>[typeof sym];"],"fileIdsList":[[3]],"options":{"rootDir":"./src"},"referencedMap":[[4,1]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/globals.d.ts",
        "./src/hkt.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/globals.d.ts",
    "./src/hkt.ts",
    "./src/main.ts"
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
      "fileName": "./src/globals.d.ts",
      "version": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
      "signature": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/hkt.ts",
      "version": "25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }",
      "signature": "25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/main.ts",
      "version": "13c368d0fdd135ce10c5200ffd5a0664-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\nconst x = 10;\ntype A = HKT<number>[typeof sym];",
      "signature": "13c368d0fdd135ce10c5200ffd5a0664-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\nconst x = 10;\ntype A = HKT<number>[typeof sym];",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "fileIdsList": [
    [
      "./src/hkt.ts"
    ]
  ],
  "options": {
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/main.ts": [
      "./src/hkt.ts"
    ]
  },
  "size": 1484
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/src/globals.d.ts
*refresh*    /home/src/workspaces/project/src/hkt.ts
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::


Edit [0]:: incremental-declaration-doesnt-change
//// [/home/src/workspaces/project/src/main.ts] *modified* 
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}

type A = HKT<number>[typeof sym];

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/src/main.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sym = Symbol();

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;","affectsGlobalScope":true,"impliedNodeFormat":1},"25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }",{"version":"5e9e1d9d8d08565504f44a7f2722c67d-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];","signature":"2dcfbe0902e223e03ed6acd6292c35ce-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n","impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"rootDir":"./src"},"referencedMap":[[4,1]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/globals.d.ts",
        "./src/hkt.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/globals.d.ts",
    "./src/hkt.ts",
    "./src/main.ts"
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
      "fileName": "./src/globals.d.ts",
      "version": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
      "signature": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/hkt.ts",
      "version": "25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }",
      "signature": "25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/main.ts",
      "version": "5e9e1d9d8d08565504f44a7f2722c67d-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];",
      "signature": "2dcfbe0902e223e03ed6acd6292c35ce-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5e9e1d9d8d08565504f44a7f2722c67d-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];",
        "signature": "2dcfbe0902e223e03ed6acd6292c35ce-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/hkt.ts"
    ]
  ],
  "options": {
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/main.ts": [
      "./src/hkt.ts"
    ]
  },
  "size": 1711
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/main.ts


Edit [1]:: incremental-declaration-doesnt-change
//// [/home/src/workspaces/project/src/main.ts] *modified* 
import { HKT } from "./hkt";

const sym = Symbol();

declare module "./hkt" {
    interface HKT<T> {
        [sym]: { a: T }
    }
}

type A = HKT<number>[typeof sym];const x = 10;

tsgo --b --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'src/main.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/src/main.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sym = Symbol();
const x = 10;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./src/globals.d.ts","./src/hkt.ts","./src/main.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;","affectsGlobalScope":true,"impliedNodeFormat":1},"25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }",{"version":"1fd9f291f4caa2615b285320a7f52aa7-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];const x = 10;","signature":"2dcfbe0902e223e03ed6acd6292c35ce-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n","impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"rootDir":"./src"},"referencedMap":[[4,1]]}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/globals.d.ts",
        "./src/hkt.ts",
        "./src/main.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/globals.d.ts",
    "./src/hkt.ts",
    "./src/main.ts"
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
      "fileName": "./src/globals.d.ts",
      "version": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
      "signature": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
      "affectsGlobalScope": true,
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "800d0d5c54984ef4a563773d1a81e0d2-interface SymbolConstructor {\n    (description?: string | number): symbol;\n}\ndeclare var Symbol: SymbolConstructor;",
        "affectsGlobalScope": true,
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./src/hkt.ts",
      "version": "25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }",
      "signature": "25b260df8f8588de5a4313af5c0708b6-export interface HKT<T> { }",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./src/main.ts",
      "version": "1fd9f291f4caa2615b285320a7f52aa7-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];const x = 10;",
      "signature": "2dcfbe0902e223e03ed6acd6292c35ce-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "1fd9f291f4caa2615b285320a7f52aa7-import { HKT } from \"./hkt\";\n\nconst sym = Symbol();\n\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: { a: T }\n    }\n}\n\ntype A = HKT<number>[typeof sym];const x = 10;",
        "signature": "2dcfbe0902e223e03ed6acd6292c35ce-declare const sym: unique symbol;\ndeclare module \"./hkt\" {\n    interface HKT<T> {\n        [sym]: {\n            a: T;\n        };\n    }\n}\nexport {};\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./src/hkt.ts"
    ]
  ],
  "options": {
    "rootDir": "./src"
  },
  "referencedMap": {
    "./src/main.ts": [
      "./src/hkt.ts"
    ]
  },
  "size": 1724
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/project/src/main.ts
Signatures::
(computed .d.ts) /home/src/workspaces/project/src/main.ts
