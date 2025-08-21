currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project1/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": []
}
//// [/home/src/workspaces/solution/project2/src/b.ts] *new* 
export const b = 10;
//// [/home/src/workspaces/solution/project2/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": []
}
//// [/home/src/workspaces/solution/project3/src/c.ts] *new* 
export const c = 10;
//// [/home/src/workspaces/solution/project3/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": [
        { "path": "../project1" },
        { "path": "../project2" }
    ]
}
//// [/home/src/workspaces/solution/project4/src/d.ts] *new* 
export const d = 10;
//// [/home/src/workspaces/solution/project4/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true },
    "references": [{ "path": "../project3" }]
}

tsgo --b project4 --verbose --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * project3/tsconfig.json
    * project4/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project2/tsconfig.json' is out of date because output file 'project2/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project2/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project2/src/b.ts
   Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project3/tsconfig.json' is out of date because output file 'project3/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project3/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project3/src/c.ts
   Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project4/tsconfig.json' is out of date because output file 'project4/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project4/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project4/src/d.ts
   Matched by default include pattern '**/*'
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
//// [/home/src/workspaces/solution/project2/src/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/workspaces/solution/project2/src/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;

//// [/home/src/workspaces/solution/project2/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./src/b.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./src/b.d.ts"}
//// [/home/src/workspaces/solution/project2/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/b.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/b.ts"
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
      "fileName": "./src/b.ts",
      "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "907abc8137ceb88f0ddd6eccfa92d573-export const b = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/b.d.ts",
  "size": 1095
}
//// [/home/src/workspaces/solution/project3/src/c.d.ts] *new* 
export declare const c = 10;

//// [/home/src/workspaces/solution/project3/src/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
exports.c = 10;

//// [/home/src/workspaces/solution/project3/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./src/c.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"8bc1c94c71c8b47587db189712f5ab2c-export const c = 10;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./src/c.d.ts"}
//// [/home/src/workspaces/solution/project3/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/c.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/c.ts"
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
      "fileName": "./src/c.ts",
      "version": "8bc1c94c71c8b47587db189712f5ab2c-export const c = 10;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "8bc1c94c71c8b47587db189712f5ab2c-export const c = 10;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/c.d.ts",
  "size": 1095
}
//// [/home/src/workspaces/solution/project4/src/d.d.ts] *new* 
export declare const d = 10;

//// [/home/src/workspaces/solution/project4/src/d.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
exports.d = 10;

//// [/home/src/workspaces/solution/project4/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./src/d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c3e4ecb1ad42999b9e5a8cbb3d993726-export const d = 10;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./src/d.d.ts"}
//// [/home/src/workspaces/solution/project4/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/d.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/d.ts"
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
      "fileName": "./src/d.ts",
      "version": "c3e4ecb1ad42999b9e5a8cbb3d993726-export const d = 10;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c3e4ecb1ad42999b9e5a8cbb3d993726-export const d = 10;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/d.d.ts",
  "size": 1095
}

project2/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project2/src/b.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/b.ts

project3/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project3/src/c.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project3/src/c.ts

project4/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project4/src/d.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project4/src/d.ts


Edit [0]:: modify project3 file
//// [/home/src/workspaces/solution/project3/src/c.ts] *modified* 
export const cc = 10;

tsgo --b project4 --verbose --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/tsconfig.json
    * project2/tsconfig.json
    * project3/tsconfig.json
    * project4/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project2/tsconfig.json' is up to date because newest input 'project2/src/b.ts' is older than output 'project2/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project3/tsconfig.json' is out of date because output 'project3/tsconfig.tsbuildinfo' is older than input 'project3/src/c.ts'

[[90mHH:MM:SS AM[0m] Building project 'project3/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project3/src/c.ts
   Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Project 'project4/tsconfig.json' is out of date because output 'project4/tsconfig.tsbuildinfo' is older than input 'project3'

[[90mHH:MM:SS AM[0m] Building project 'project4/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project4/src/d.ts
   Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project 'project4/tsconfig.json'...

//// [/home/src/workspaces/solution/project3/src/c.d.ts] *modified* 
export declare const cc = 10;

//// [/home/src/workspaces/solution/project3/src/c.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cc = void 0;
exports.cc = 10;

//// [/home/src/workspaces/solution/project3/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.d.ts","./src/c.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"0c1eb6b93bf327534ca72bc76ad6f9dc-export const cc = 10;","signature":"5a5b90c913f1887b69f44d96c9a641ad-export declare const cc = 10;\n","impliedNodeFormat":1}],"options":{"composite":true},"latestChangedDtsFile":"./src/c.d.ts"}
//// [/home/src/workspaces/solution/project3/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/c.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./src/c.ts"
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
      "fileName": "./src/c.ts",
      "version": "0c1eb6b93bf327534ca72bc76ad6f9dc-export const cc = 10;",
      "signature": "5a5b90c913f1887b69f44d96c9a641ad-export declare const cc = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "0c1eb6b93bf327534ca72bc76ad6f9dc-export const cc = 10;",
        "signature": "5a5b90c913f1887b69f44d96c9a641ad-export declare const cc = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./src/c.d.ts",
  "size": 1097
}
//// [/home/src/workspaces/solution/project4/tsconfig.tsbuildinfo] *mTime changed*

project3/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project3/src/c.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project3/src/c.ts

project4/tsconfig.json::
SemanticDiagnostics::
Signatures::
