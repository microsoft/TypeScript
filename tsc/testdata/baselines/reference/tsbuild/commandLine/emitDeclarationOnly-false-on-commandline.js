currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project1/src/a.ts] *new* 
export const a = 10;const aLocal = 10;
//// [/home/src/workspaces/solution/project1/src/b.ts] *new* 
export const b = 10;const bLocal = 10;
//// [/home/src/workspaces/solution/project1/src/c.ts] *new* 
import { a } from "./a";export const c = a;
//// [/home/src/workspaces/solution/project1/src/d.ts] *new* 
import { b } from "./b";export const d = b;
//// [/home/src/workspaces/solution/project1/src/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true, "emitDeclarationOnly": true }
}
//// [/home/src/workspaces/solution/project2/src/e.ts] *new* 
export const e = 10;
//// [/home/src/workspaces/solution/project2/src/f.ts] *new* 
import { a } from "../../project1/src/a"; export const f = a;
//// [/home/src/workspaces/solution/project2/src/g.ts] *new* 
import { b } from "../../project1/src/b"; export const g = b;
//// [/home/src/workspaces/solution/project2/src/tsconfig.json] *new* 
{
    "compilerOptions": { "composite": true, "emitDeclarationOnly": true },
    "references": [{ "path": "../../project1/src" }]
}

tsgo --b project2/src --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because output file 'project2/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

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
//// [/home/src/workspaces/solution/project1/src/a.d.ts] *new* 
export declare const a = 10;

//// [/home/src/workspaces/solution/project1/src/b.d.ts] *new* 
export declare const b = 10;

//// [/home/src/workspaces/solution/project1/src/c.d.ts] *new* 
export declare const c = 10;

//// [/home/src/workspaces/solution/project1/src/d.d.ts] *new* 
export declare const d = 10;

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "fileName": "./a.ts",
      "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1789
}
//// [/home/src/workspaces/solution/project2/src/e.d.ts] *new* 
export declare const e = 10;

//// [/home/src/workspaces/solution/project2/src/f.d.ts] *new* 
export declare const f = 10;

//// [/home/src/workspaces/solution/project2/src/g.d.ts] *new* 
export declare const g = 10;

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":[2,4,6],"fileNames":["lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26403a4711355fb137eef9a25ce87785-export const e = 10;","signature":"f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n","impliedNodeFormat":1},"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",{"version":"e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n","impliedNodeFormat":1},"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",{"version":"06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5]],"options":{"composite":true,"emitDeclarationOnly":true},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./g.d.ts"}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./e.ts"
      ],
      "original": 2
    },
    {
      "files": [
        "./f.ts"
      ],
      "original": 4
    },
    {
      "files": [
        "./g.ts"
      ],
      "original": 6
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
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
      "fileName": "./e.ts",
      "version": "26403a4711355fb137eef9a25ce87785-export const e = 10;",
      "signature": "f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "26403a4711355fb137eef9a25ce87785-export const e = 10;",
        "signature": "f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../project1/src/a.d.ts",
      "version": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./f.ts",
      "version": "e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;",
      "signature": "17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;",
        "signature": "17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../project1/src/b.d.ts",
      "version": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./g.ts",
      "version": "06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;",
      "signature": "4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;",
        "signature": "4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../project1/src/a.d.ts"
    ],
    [
      "../../project1/src/b.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "latestChangedDtsFile": "./g.d.ts",
  "size": 1800
}

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project1/src/a.ts
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
*refresh*    /home/src/workspaces/solution/project1/src/c.ts
*refresh*    /home/src/workspaces/solution/project1/src/d.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project1/src/a.ts
(stored at emit) /home/src/workspaces/solution/project1/src/b.ts
(stored at emit) /home/src/workspaces/solution/project1/src/c.ts
(stored at emit) /home/src/workspaces/solution/project1/src/d.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project2/src/e.ts
*refresh*    /home/src/workspaces/solution/project1/src/a.d.ts
*refresh*    /home/src/workspaces/solution/project2/src/f.ts
*refresh*    /home/src/workspaces/solution/project1/src/b.d.ts
*refresh*    /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts


Edit [0]:: no change

tsgo --b project2/src --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/d.ts' is older than output 'project1/src/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date because newest input 'project2/src/g.ts' is older than output 'project2/src/tsconfig.tsbuildinfo'




Edit [1]:: change
//// [/home/src/workspaces/solution/project1/src/a.ts] *modified* 
export const a = 10;const aLocal = 10;const aa = 10;

tsgo --b project2/src --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project 'project2/src/tsconfig.json'...

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":true},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "fileName": "./a.ts",
      "version": "6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1803
}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *mTime changed*

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project1/src/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project1/src/a.ts


Edit [2]:: emit js files

tsgo --b project2/src --verbose --emitDeclarationOnly false
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

//// [/home/src/workspaces/solution/project1/src/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = 10;
const aLocal = 10;
const aa = 10;

//// [/home/src/workspaces/solution/project1/src/b.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;

//// [/home/src/workspaces/solution/project1/src/c.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.c = void 0;
const a_1 = require("./a");
exports.c = a_1.a;

//// [/home/src/workspaces/solution/project1/src/d.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.d = void 0;
const b_1 = require("./b");
exports.d = b_1.b;

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":false},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "fileName": "./a.ts",
      "version": "6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": false
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1804
}
//// [/home/src/workspaces/solution/project2/src/e.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.e = void 0;
exports.e = 10;

//// [/home/src/workspaces/solution/project2/src/f.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.f = void 0;
const a_1 = require("../../project1/src/a");
exports.f = a_1.a;

//// [/home/src/workspaces/solution/project2/src/g.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.g = void 0;
const b_1 = require("../../project1/src/b");
exports.g = b_1.b;

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2,4,6],"fileNames":["lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26403a4711355fb137eef9a25ce87785-export const e = 10;","signature":"f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n","impliedNodeFormat":1},"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",{"version":"e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n","impliedNodeFormat":1},"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",{"version":"06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5]],"options":{"composite":true,"emitDeclarationOnly":false},"referencedMap":[[4,1],[6,2]],"latestChangedDtsFile":"./g.d.ts"}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./e.ts"
      ],
      "original": 2
    },
    {
      "files": [
        "./f.ts"
      ],
      "original": 4
    },
    {
      "files": [
        "./g.ts"
      ],
      "original": 6
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
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
      "fileName": "./e.ts",
      "version": "26403a4711355fb137eef9a25ce87785-export const e = 10;",
      "signature": "f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "26403a4711355fb137eef9a25ce87785-export const e = 10;",
        "signature": "f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../project1/src/a.d.ts",
      "version": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./f.ts",
      "version": "e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;",
      "signature": "17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;",
        "signature": "17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "../../project1/src/b.d.ts",
      "version": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS"
    },
    {
      "fileName": "./g.ts",
      "version": "06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;",
      "signature": "4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;",
        "signature": "4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "../../project1/src/a.d.ts"
    ],
    [
      "../../project1/src/b.d.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": false
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "latestChangedDtsFile": "./g.d.ts",
  "size": 1801
}

project1/src/tsconfig.json::
SemanticDiagnostics::
Signatures::

project2/src/tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [3]:: no change

tsgo --b project2/src --verbose
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/src/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date because newest input 'project2/src/g.ts' is older than output 'project2/src/tsconfig.tsbuildinfo'




Edit [4]:: no change run with js emit

tsgo --b project2/src --verbose --emitDeclarationOnly false
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/src/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date because newest input 'project2/src/g.ts' is older than output 'project2/src/tsconfig.tsbuildinfo'




Edit [5]:: js emit with change
//// [/home/src/workspaces/solution/project1/src/b.ts] *modified* 
export const b = 10;const bLocal = 10;const blocal = 10;

tsgo --b project2/src --verbose --emitDeclarationOnly false
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90mHH:MM:SS AM[0m] Updating output timestamps of project 'project2/src/tsconfig.json'...

//// [/home/src/workspaces/solution/project1/src/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;
const blocal = 10;

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"faa2f145f8fb2df488a27873cf169a9a-export const b = 10;const bLocal = 10;const blocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"composite":true,"emitDeclarationOnly":false},"referencedMap":[[4,1],[5,2]],"latestChangedDtsFile":"./d.d.ts"}
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./a.ts",
        "./b.ts",
        "./c.ts",
        "./d.ts"
      ],
      "original": [
        2,
        5
      ]
    }
  ],
  "fileNames": [
    "lib.d.ts",
    "./a.ts",
    "./b.ts",
    "./c.ts",
    "./d.ts"
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
      "fileName": "./a.ts",
      "version": "6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;",
      "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;",
        "signature": "5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "faa2f145f8fb2df488a27873cf169a9a-export const b = 10;const bLocal = 10;const blocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "faa2f145f8fb2df488a27873cf169a9a-export const b = 10;const bLocal = 10;const blocal = 10;",
        "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./c.ts",
      "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
      "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;",
        "signature": "6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./d.ts",
      "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
      "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;",
        "signature": "3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "fileIdsList": [
    [
      "./a.ts"
    ],
    [
      "./b.ts"
    ]
  ],
  "options": {
    "composite": true,
    "emitDeclarationOnly": false
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "latestChangedDtsFile": "./d.d.ts",
  "size": 1822
}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *mTime changed*

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project1/src/b.ts
