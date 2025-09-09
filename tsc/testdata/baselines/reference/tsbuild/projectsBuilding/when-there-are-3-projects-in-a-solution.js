currentDirectory::/user/username/projects/myproject
useCaseSensitiveFileNames::true
Input::
//// [/user/username/projects/myproject/pkg0/index.ts] *new* 
export const pkg0 = 0;
//// [/user/username/projects/myproject/pkg0/tsconfig.json] *new* 
     {
         "compilerOptions": { "composite": true },

     }
//// [/user/username/projects/myproject/pkg1/index.ts] *new* 
export const pkg1 = 1;
//// [/user/username/projects/myproject/pkg1/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": [{ "path": "../pkg0" }],
}
//// [/user/username/projects/myproject/pkg2/index.ts] *new* 
export const pkg2 = 2;
//// [/user/username/projects/myproject/pkg2/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": [{ "path": "../pkg0" }],
}
//// [/user/username/projects/myproject/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": [
        { "path": "./pkg0" },
        { "path": "./pkg1" },
        { "path": "./pkg2" }
    ]
}

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output file 'pkg0/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is out of date because output file 'pkg1/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is out of date because output file 'pkg2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'pkg2/tsconfig.json'...

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
//// [/user/username/projects/myproject/pkg0/index.d.ts] *new* 
export declare const pkg0 = 0;

//// [/user/username/projects/myproject/pkg0/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"44b96319d3533fefbaaf61cad5d90c48-export const pkg0 = 0;","signature":"c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./index.ts"
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
      "fileName": "./index.ts",
      "version": "44b96319d3533fefbaaf61cad5d90c48-export const pkg0 = 0;",
      "signature": "c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "44b96319d3533fefbaaf61cad5d90c48-export const pkg0 = 0;",
        "signature": "c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1099
}
//// [/user/username/projects/myproject/pkg1/index.d.ts] *new* 
export declare const pkg1 = 1;

//// [/user/username/projects/myproject/pkg1/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg1 = void 0;
exports.pkg1 = 1;

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"dd791c6b74e4cf9af9283579215cad88-export const pkg1 = 1;","signature":"4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./index.ts"
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
      "fileName": "./index.ts",
      "version": "dd791c6b74e4cf9af9283579215cad88-export const pkg1 = 1;",
      "signature": "4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "dd791c6b74e4cf9af9283579215cad88-export const pkg1 = 1;",
        "signature": "4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1099
}
//// [/user/username/projects/myproject/pkg2/index.d.ts] *new* 
export declare const pkg2 = 2;

//// [/user/username/projects/myproject/pkg2/index.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg2 = void 0;
exports.pkg2 = 2;

//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0cf39c01e85273ecae99a05645f3b18b-export const pkg2 = 2;","signature":"adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./index.ts"
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
      "fileName": "./index.ts",
      "version": "0cf39c01e85273ecae99a05645f3b18b-export const pkg2 = 2;",
      "signature": "adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0cf39c01e85273ecae99a05645f3b18b-export const pkg2 = 2;",
        "signature": "adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1099
}
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./pkg0/index.d.ts","./pkg1/index.d.ts","./pkg2/index.d.ts","./pkg0/index.ts","./pkg1/index.ts","./pkg2/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n","4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n","adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n"],"options":{"composite":true},"resolvedRoot":[[2,5],[3,6],[4,7]]}
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./pkg0/index.d.ts",
        "./pkg1/index.d.ts",
        "./pkg2/index.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./pkg0/index.d.ts",
    "./pkg1/index.d.ts",
    "./pkg2/index.d.ts",
    "./pkg0/index.ts",
    "./pkg1/index.ts",
    "./pkg2/index.ts"
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
      "fileName": "./pkg0/index.d.ts",
      "version": "c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n",
      "signature": "c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./pkg1/index.d.ts",
      "version": "4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n",
      "signature": "4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./pkg2/index.d.ts",
      "version": "adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n",
      "signature": "adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "composite": true
  },
  "resolvedRoot": [
    [
      "./pkg0/index.d.ts",
      "./pkg0/index.ts"
    ],
    [
      "./pkg1/index.d.ts",
      "./pkg1/index.ts"
    ],
    [
      "./pkg2/index.d.ts",
      "./pkg2/index.ts"
    ]
  ],
  "size": 1233
}

pkg0/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/myproject/pkg0/index.ts
Signatures::
(stored at emit) /user/username/projects/myproject/pkg0/index.ts

pkg1/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/myproject/pkg1/index.ts
Signatures::
(stored at emit) /user/username/projects/myproject/pkg1/index.ts

pkg2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/myproject/pkg2/index.ts
Signatures::
(stored at emit) /user/username/projects/myproject/pkg2/index.ts

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /user/username/projects/myproject/pkg0/index.d.ts
*refresh*    /user/username/projects/myproject/pkg1/index.d.ts
*refresh*    /user/username/projects/myproject/pkg2/index.d.ts
Signatures::


Edit [0]:: dts doesn't change
//// [/user/username/projects/myproject/pkg0/index.ts] *modified* 
export const pkg0 = 0;const someConst2 = 10;

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90mHH:MM:SS AM[0m] Building project 'pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project 'pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project 'pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project 'tsconfig.json'...

//// [/user/username/projects/myproject/pkg0/index.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pkg0 = void 0;
exports.pkg0 = 0;
const someConst2 = 10;

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"87e698a84292a7346d74cb79ef9ee973-export const pkg0 = 0;const someConst2 = 10;","signature":"c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./index.ts"
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
      "fileName": "./index.ts",
      "version": "87e698a84292a7346d74cb79ef9ee973-export const pkg0 = 0;const someConst2 = 10;",
      "signature": "c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "87e698a84292a7346d74cb79ef9ee973-export const pkg0 = 0;const someConst2 = 10;",
        "signature": "c0fd585e07a3ab6bf19209ced748ff46-export declare const pkg0 = 0;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1121
}
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] *mTime changed*
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] *mTime changed*
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo] *mTime changed*

pkg0/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/myproject/pkg0/index.ts
Signatures::
(computed .d.ts) /user/username/projects/myproject/pkg0/index.ts


Edit [1]:: no change

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is up to date because newest input 'pkg0/index.ts' is older than output 'pkg0/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is up to date because newest input 'pkg1/index.ts' is older than output 'pkg1/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is up to date because newest input 'pkg2/index.ts' is older than output 'pkg2/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'pkg0/index.ts' is older than output 'tsconfig.tsbuildinfo'




Edit [2]:: dts change
//// [/user/username/projects/myproject/pkg0/index.ts] *modified* 
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is out of date because output 'pkg0/tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90mHH:MM:SS AM[0m] Building project 'pkg0/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is out of date because output 'pkg1/tsconfig.tsbuildinfo' is older than input 'pkg0'

[[90mHH:MM:SS AM[0m] Building project 'pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project 'pkg1/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is out of date because output 'pkg2/tsconfig.tsbuildinfo' is older than input 'pkg0'

[[90mHH:MM:SS AM[0m] Building project 'pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project 'pkg2/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'tsconfig.tsbuildinfo' is older than input 'pkg0/index.ts'

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/user/username/projects/myproject/pkg0/index.d.ts] *modified* 
export declare const pkg0 = 0;
export declare const someConst = 10;

//// [/user/username/projects/myproject/pkg0/index.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
const someConst2 = 10;
exports.someConst = 10;

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"78d1f0ba95fa9081a8a366af27252e24-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;","signature":"cfd6b1b95a6527c0a282a7e259475a73-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./index.d.ts"}
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./index.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./index.ts"
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
      "fileName": "./index.ts",
      "version": "78d1f0ba95fa9081a8a366af27252e24-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
      "signature": "cfd6b1b95a6527c0a282a7e259475a73-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "78d1f0ba95fa9081a8a366af27252e24-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
        "signature": "cfd6b1b95a6527c0a282a7e259475a73-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./index.d.ts",
  "size": 1187
}
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] *mTime changed*
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] *mTime changed*
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,4]],"fileNames":["lib.d.ts","./pkg0/index.d.ts","./pkg1/index.d.ts","./pkg2/index.d.ts","./pkg0/index.ts","./pkg1/index.ts","./pkg2/index.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"cfd6b1b95a6527c0a282a7e259475a73-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n","4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n","adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n"],"options":{"composite":true},"resolvedRoot":[[2,5],[3,6],[4,7]]}
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./pkg0/index.d.ts",
        "./pkg1/index.d.ts",
        "./pkg2/index.d.ts"
      ],
      "original": [
        2,
        4
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./pkg0/index.d.ts",
    "./pkg1/index.d.ts",
    "./pkg2/index.d.ts",
    "./pkg0/index.ts",
    "./pkg1/index.ts",
    "./pkg2/index.ts"
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
      "fileName": "./pkg0/index.d.ts",
      "version": "cfd6b1b95a6527c0a282a7e259475a73-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n",
      "signature": "cfd6b1b95a6527c0a282a7e259475a73-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./pkg1/index.d.ts",
      "version": "4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n",
      "signature": "4591f2e8d39387573c792e55fafa8bc7-export declare const pkg1 = 1;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./pkg2/index.d.ts",
      "version": "adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n",
      "signature": "adada4e37046e37638a0d78040557b79-export declare const pkg2 = 2;\n",
      "impliedNodeFormat": "CommonJS"
    }
  ],
  "options": {
    "composite": true
  },
  "resolvedRoot": [
    [
      "./pkg0/index.d.ts",
      "./pkg0/index.ts"
    ],
    [
      "./pkg1/index.d.ts",
      "./pkg1/index.ts"
    ],
    [
      "./pkg2/index.d.ts",
      "./pkg2/index.ts"
    ]
  ],
  "size": 1271
}

pkg0/tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/myproject/pkg0/index.ts
Signatures::
(computed .d.ts) /user/username/projects/myproject/pkg0/index.ts

pkg1/tsconfig.json::
SemanticDiagnostics::
Signatures::

pkg2/tsconfig.json::
SemanticDiagnostics::
Signatures::

tsconfig.json::
SemanticDiagnostics::
*refresh*    /user/username/projects/myproject/pkg0/index.d.ts
Signatures::
(used version)   /user/username/projects/myproject/pkg0/index.d.ts


Edit [3]:: no change

tsgo -b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'pkg0/tsconfig.json' is up to date because newest input 'pkg0/index.ts' is older than output 'pkg0/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'pkg1/tsconfig.json' is up to date because newest input 'pkg1/index.ts' is older than output 'pkg1/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'pkg2/tsconfig.json' is up to date because newest input 'pkg2/index.ts' is older than output 'pkg2/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is up to date because newest input 'pkg0/index.ts' is older than output 'tsconfig.tsbuildinfo'


