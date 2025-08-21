currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/file1.ts] *new* 
export const x = "hello";
//// [/home/src/workspaces/project/file2.ts] *new* 
import { random } from "./random";
export const y = "world";
//// [/home/src/workspaces/project/random.d.ts] *new* 
export const random = "world";
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "include": ["file*.ts"],
}

tsgo --b -v
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
//// [/home/src/workspaces/project/file1.d.ts] *new* 
export declare const x = "hello";

//// [/home/src/workspaces/project/file1.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = "hello";

//// [/home/src/workspaces/project/file2.d.ts] *new* 
export declare const y = "world";

//// [/home/src/workspaces/project/file2.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = "world";

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2,4],"fileNames":["lib.d.ts","./file1.ts","./random.d.ts","./file2.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"cc7052ed344567798ec87f1c0f8f276c-export const x = \"hello\";","signature":"0c71c4d05f424f4dc52c978a9207cdf6-export declare const x = \"hello\";\n","impliedNodeFormat":1},"c532960cfbb52b79226b1f24e7a00dee-export const random = \"world\";",{"version":"451897c48dcc1d64ace3fbee4cc28ab8-import { random } from \"./random\";\nexport const y = \"world\";","signature":"64ca81919be0c5adb4964999189ddb2c-export declare const y = \"world\";\n","impliedNodeFormat":1}],"fileIdsList":[[3]],"options":{"composite":true},"referencedMap":[[4,1]],"latestChangedDtsFile":"./file2.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./file1.ts"
      ],
      "original": 2
    },
    {
      "files": [
        "./file2.ts"
      ],
      "original": 4
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./file1.ts",
    "./random.d.ts",
    "./file2.ts"
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
      "fileName": "./file1.ts",
      "version": "cc7052ed344567798ec87f1c0f8f276c-export const x = \"hello\";",
      "signature": "0c71c4d05f424f4dc52c978a9207cdf6-export declare const x = \"hello\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "cc7052ed344567798ec87f1c0f8f276c-export const x = \"hello\";",
        "signature": "0c71c4d05f424f4dc52c978a9207cdf6-export declare const x = \"hello\";\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./random.d.ts",
      "version": "c532960cfbb52b79226b1f24e7a00dee-export const random = \"world\";",
      "signature": "c532960cfbb52b79226b1f24e7a00dee-export const random = \"world\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./file2.ts",
      "version": "451897c48dcc1d64ace3fbee4cc28ab8-import { random } from \"./random\";\nexport const y = \"world\";",
      "signature": "64ca81919be0c5adb4964999189ddb2c-export declare const y = \"world\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "451897c48dcc1d64ace3fbee4cc28ab8-import { random } from \"./random\";\nexport const y = \"world\";",
        "signature": "64ca81919be0c5adb4964999189ddb2c-export declare const y = \"world\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./random.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./file2.ts": [
      "./random.d.ts"
    ]
  },
  "latestChangedDtsFile": "./file2.d.ts",
  "size": 1472
}

tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/file1.ts
*refresh*    /home/src/workspaces/project/random.d.ts
*refresh*    /home/src/workspaces/project/file2.ts
Signatures::
(stored at emit) /home/src/workspaces/project/file1.ts
(stored at emit) /home/src/workspaces/project/file2.ts


Edit [0]:: delete file1
//// [/home/src/workspaces/project/file1.d.ts] *deleted*
//// [/home/src/workspaces/project/file1.js] *deleted*
//// [/home/src/workspaces/project/file1.ts] *deleted*

tsgo --b -v
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that file 'file1.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[3],"fileNames":["lib.d.ts","./random.d.ts","./file2.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},"c532960cfbb52b79226b1f24e7a00dee-export const random = \"world\";",{"version":"451897c48dcc1d64ace3fbee4cc28ab8-import { random } from \"./random\";\nexport const y = \"world\";","signature":"64ca81919be0c5adb4964999189ddb2c-export declare const y = \"world\";\n","impliedNodeFormat":1}],"fileIdsList":[[2]],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./file2.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./file2.ts"
      ],
      "original": 3
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./random.d.ts",
    "./file2.ts"
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
      "fileName": "./random.d.ts",
      "version": "c532960cfbb52b79226b1f24e7a00dee-export const random = \"world\";",
      "signature": "c532960cfbb52b79226b1f24e7a00dee-export const random = \"world\";",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./file2.ts",
      "version": "451897c48dcc1d64ace3fbee4cc28ab8-import { random } from \"./random\";\nexport const y = \"world\";",
      "signature": "64ca81919be0c5adb4964999189ddb2c-export declare const y = \"world\";\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "451897c48dcc1d64ace3fbee4cc28ab8-import { random } from \"./random\";\nexport const y = \"world\";",
        "signature": "64ca81919be0c5adb4964999189ddb2c-export declare const y = \"world\";\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./random.d.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./file2.ts": [
      "./random.d.ts"
    ]
  },
  "latestChangedDtsFile": "./file2.d.ts",
  "size": 1275
}

tsconfig.json::
SemanticDiagnostics::
Signatures::
