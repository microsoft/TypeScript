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
    "compilerOptions": { "incremental": true, "declaration": true }
}
//// [/home/src/workspaces/solution/project2/src/e.ts] *new* 
export const e = 10;
//// [/home/src/workspaces/solution/project2/src/f.ts] *new* 
import { a } from "../../project1/src/a"; export const f = a;
//// [/home/src/workspaces/solution/project2/src/g.ts] *new* 
import { b } from "../../project1/src/b"; export const g = b;
//// [/home/src/workspaces/solution/project2/src/tsconfig.json] *new* 
{
    "compilerOptions": { "incremental": true, "declaration": true },
    "references": [{ "path": "../../project1/src" }]
}

tsgo --b project2/src --verbose --emitDeclarationOnly
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output file 'project1/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because output file 'project2/src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

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
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6f850043fadb2d6b35e16ae1adaad5a5-export const a = 10;const aLocal = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"emitDeclarationOnly":true,"declaration":true},"referencedMap":[[4,1],[5,2]]}
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
    "emitDeclarationOnly": true,
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "size": 1757
}
//// [/home/src/workspaces/solution/project2/src/e.d.ts] *new* 
export declare const e = 10;

//// [/home/src/workspaces/solution/project2/src/f.d.ts] *new* 
export declare const f = 10;

//// [/home/src/workspaces/solution/project2/src/g.d.ts] *new* 
export declare const g = 10;

//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[2,4,6],"fileNames":["lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26403a4711355fb137eef9a25ce87785-export const e = 10;","signature":"f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n","impliedNodeFormat":1},"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n",{"version":"e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n","impliedNodeFormat":1},"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",{"version":"06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5]],"options":{"emitDeclarationOnly":true,"declaration":true},"referencedMap":[[4,1],[6,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5,6]}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
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
    "emitDeclarationOnly": true,
    "declaration": true
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
  ],
  "size": 1825
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
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(stored at emit) /home/src/workspaces/solution/project2/src/e.ts
(stored at emit) /home/src/workspaces/solution/project2/src/f.ts
(stored at emit) /home/src/workspaces/solution/project2/src/g.ts


Edit [0]:: no change

tsgo --b project2/src --verbose --emitDeclarationOnly
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/d.ts' is older than output 'project1/src/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m


project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::


Edit [1]:: local change
//// [/home/src/workspaces/solution/project1/src/a.ts] *modified* 
export const a = 10;const aLocal = 10;const aa = 10;

tsgo --b project2/src --verbose --emitDeclarationOnly
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/a.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"6c5c8e86bc8b70be4222f71e05b56f78-export const a = 10;const aLocal = 10;const aa = 10;","signature":"5d46ba05302682a2bc47daa29368141f-export declare const a = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"emitDeclarationOnly":true,"declaration":true},"referencedMap":[[4,1],[5,2]]}
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
    "emitDeclarationOnly": true,
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "size": 1771
}

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project1/src/a.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project1/src/a.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::


Edit [2]:: non local change
//// [/home/src/workspaces/solution/project1/src/a.ts] *modified* 
export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;

tsgo --b project2/src --verbose --emitDeclarationOnly
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/a.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/a.d.ts] *modified* 
export declare const a = 10;
export declare const aaa = 10;

//// [/home/src/workspaces/solution/project1/src/c.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"emitDeclarationOnly":true,"declaration":true},"referencedMap":[[4,1],[5,2]]}
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
      "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
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
    "emitDeclarationOnly": true,
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "size": 1825
}
//// [/home/src/workspaces/solution/project2/src/f.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[2,4,6],"fileNames":["lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26403a4711355fb137eef9a25ce87785-export const e = 10;","signature":"f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n","impliedNodeFormat":1},"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",{"version":"e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n","impliedNodeFormat":1},"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",{"version":"06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5]],"options":{"emitDeclarationOnly":true,"declaration":true},"referencedMap":[[4,1],[6,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5,6]}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
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
      "version": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
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
    "emitDeclarationOnly": true,
    "declaration": true
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
  ],
  "size": 1857
}

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project1/src/a.ts
*refresh*    /home/src/workspaces/solution/project1/src/c.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project1/src/a.ts
(computed .d.ts) /home/src/workspaces/solution/project1/src/c.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(used version)   /home/src/workspaces/solution/project1/src/a.d.ts
(computed .d.ts) /home/src/workspaces/solution/project2/src/f.ts


Edit [3]:: emit js files

tsgo --b project2/src --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/a.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aaa = exports.a = void 0;
exports.a = 10;
const aLocal = 10;
const aa = 10;
exports.aaa = 10;

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
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n","impliedNodeFormat":1},{"version":"bf1b9c3562b043596607d537fbaf9814-export const b = 10;const bLocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"declaration":true},"referencedMap":[[4,1],[5,2]]}
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
      "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
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
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "size": 1798
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
{"version":"FakeTSVersion","errors":true,"root":[2,4,6],"fileNames":["lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26403a4711355fb137eef9a25ce87785-export const e = 10;","signature":"f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n","impliedNodeFormat":1},"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",{"version":"e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n","impliedNodeFormat":1},"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",{"version":"06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5]],"options":{"declaration":true},"referencedMap":[[4,1],[6,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5,6]}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
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
      "version": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
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
    "declaration": true
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
  ],
  "size": 1830
}

project1/src/tsconfig.json::
SemanticDiagnostics::
Signatures::

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::


Edit [4]:: no change

tsgo --b project2/src --verbose --emitDeclarationOnly
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is up to date because newest input 'project1/src/a.ts' is older than output 'project1/src/tsconfig.tsbuildinfo'

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m


project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::


Edit [5]:: js emit with change without emitDeclarationOnly
//// [/home/src/workspaces/solution/project1/src/b.ts] *modified* 
export const b = 10;const bLocal = 10;const alocal = 10;

tsgo --b project2/src --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;
const bLocal = 10;
const alocal = 10;

//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n","impliedNodeFormat":1},{"version":"f386e1d064172e4046fcc4616723f508-export const b = 10;const bLocal = 10;const alocal = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"declaration":true},"referencedMap":[[4,1],[5,2]]}
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
      "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "f386e1d064172e4046fcc4616723f508-export const b = 10;const bLocal = 10;const alocal = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "f386e1d064172e4046fcc4616723f508-export const b = 10;const bLocal = 10;const alocal = 10;",
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
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "size": 1816
}

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project1/src/b.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::


Edit [6]:: local change
//// [/home/src/workspaces/solution/project1/src/b.ts] *modified* 
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;

tsgo --b project2/src --verbose --emitDeclarationOnly
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/b.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n","impliedNodeFormat":1},{"version":"aaade84f46dfd556c2424cda559cceb1-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;","signature":"eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"emitDeclarationOnly":true,"declaration":true},"referencedMap":[[4,1],[5,2]]}
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
      "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "aaade84f46dfd556c2424cda559cceb1-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;",
      "signature": "eaed5dafb4668e1b7c86b65b584b776a-export declare const b = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "aaade84f46dfd556c2424cda559cceb1-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;",
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
    "emitDeclarationOnly": true,
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "size": 1859
}

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project1/src/b.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::


Edit [7]:: non local change
//// [/home/src/workspaces/solution/project1/src/b.ts] *modified* 
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;

tsgo --b project2/src --verbose --emitDeclarationOnly
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because output 'project1/src/tsconfig.tsbuildinfo' is older than input 'project1/src/b.ts'

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/b.d.ts] *modified* 
export declare const b = 10;
export declare const aaaaa = 10;

//// [/home/src/workspaces/solution/project1/src/d.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n","impliedNodeFormat":1},{"version":"5ec434ed3f5c4b5bf474f907d0251bc7-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;","signature":"b41428b0658a7579227ae092a39341d9-export declare const b = 10;\nexport declare const aaaaa = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"emitDeclarationOnly":true,"declaration":true},"referencedMap":[[4,1],[5,2]]}
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
      "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "5ec434ed3f5c4b5bf474f907d0251bc7-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;",
      "signature": "b41428b0658a7579227ae092a39341d9-export declare const b = 10;\nexport declare const aaaaa = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5ec434ed3f5c4b5bf474f907d0251bc7-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;",
        "signature": "b41428b0658a7579227ae092a39341d9-export declare const b = 10;\nexport declare const aaaaa = 10;\n",
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
    "emitDeclarationOnly": true,
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "size": 1917
}
//// [/home/src/workspaces/solution/project2/src/g.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[2,4,6],"fileNames":["lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26403a4711355fb137eef9a25ce87785-export const e = 10;","signature":"f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n","impliedNodeFormat":1},"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",{"version":"e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n","impliedNodeFormat":1},"b41428b0658a7579227ae092a39341d9-export declare const b = 10;\nexport declare const aaaaa = 10;\n",{"version":"06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5]],"options":{"emitDeclarationOnly":true,"declaration":true},"referencedMap":[[4,1],[6,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5,6]}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
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
      "version": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
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
      "version": "b41428b0658a7579227ae092a39341d9-export declare const b = 10;\nexport declare const aaaaa = 10;\n",
      "signature": "b41428b0658a7579227ae092a39341d9-export declare const b = 10;\nexport declare const aaaaa = 10;\n",
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
    "emitDeclarationOnly": true,
    "declaration": true
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
  ],
  "size": 1891
}

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
*refresh*    /home/src/workspaces/solution/project1/src/d.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project1/src/b.ts
(computed .d.ts) /home/src/workspaces/solution/project1/src/d.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(used version)   /home/src/workspaces/solution/project1/src/b.d.ts
(computed .d.ts) /home/src/workspaces/solution/project2/src/g.ts


Edit [8]:: js emit with change without emitDeclarationOnly
//// [/home/src/workspaces/solution/project1/src/b.ts] *modified* 
export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;

tsgo --b project2/src --verbose
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project1/src/tsconfig.json
    * project2/src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project1/src/tsconfig.json' is out of date because buildinfo file 'project1/src/tsconfig.tsbuildinfo' indicates there is change in compilerOptions

[[90mHH:MM:SS AM[0m] Building project 'project1/src/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Project 'project2/src/tsconfig.json' is out of date because buildinfo file 'project2/src/tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'project2/src/tsconfig.json'...

[96mproject2/src/tsconfig.json[0m:[93m3[0m:[93m20[0m - [91merror[0m[90m TS6306: [0mReferenced project '/home/src/workspaces/solution/project1/src' must have setting "composite": true.

[7m3[0m     "references": [{ "path": "../../project1/src" }]
[7m [0m [91m                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~[0m


Found 1 error in project2/src/tsconfig.json[90m:3[0m

//// [/home/src/workspaces/solution/project1/src/a.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/b.d.ts] *modified* 
export declare const b = 10;
export declare const aaaaa = 10;
export declare const a2 = 10;

//// [/home/src/workspaces/solution/project1/src/b.js] *modified* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a2 = exports.aaaaa = exports.b = void 0;
exports.b = 10;
const bLocal = 10;
const alocal = 10;
const aaaa = 10;
exports.aaaaa = 10;
exports.a2 = 10;

//// [/home/src/workspaces/solution/project1/src/c.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/d.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/d.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project1/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[[2,5]],"fileNames":["lib.d.ts","./a.ts","./b.ts","./c.ts","./d.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;","signature":"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n","impliedNodeFormat":1},{"version":"5bfdbc5e13f033397af0ab302f42fdf2-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;","signature":"c354a25014e4712419cbd9266c28e943-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n","impliedNodeFormat":1},{"version":"28822e22fad7308e03af07d91b210c8f-import { a } from \"./a\";export const c = a;","signature":"6bc89426f721fe78f6ac43d3e4d9058f-export declare const c = 10;\n","impliedNodeFormat":1},{"version":"b392c90ba2c0413defc12f6bbf323140-import { b } from \"./b\";export const d = b;","signature":"3624f737ffc30774e872b3f5a7340537-export declare const d = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[2],[3]],"options":{"declaration":true},"referencedMap":[[4,1],[5,2]]}
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
      "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "c7d25266cf9b041c81c1bb9d74e21155-export const a = 10;const aLocal = 10;const aa = 10;export const aaa = 10;",
        "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./b.ts",
      "version": "5bfdbc5e13f033397af0ab302f42fdf2-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;",
      "signature": "c354a25014e4712419cbd9266c28e943-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "5bfdbc5e13f033397af0ab302f42fdf2-export const b = 10;const bLocal = 10;const alocal = 10;const aaaa = 10;export const aaaaa = 10;export const a2 = 10;",
        "signature": "c354a25014e4712419cbd9266c28e943-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n",
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
    "declaration": true
  },
  "referencedMap": {
    "./c.ts": [
      "./a.ts"
    ],
    "./d.ts": [
      "./b.ts"
    ]
  },
  "size": 1942
}
//// [/home/src/workspaces/solution/project2/src/e.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/f.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.d.ts] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/g.js] *rewrite with same content*
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"root":[2,4,6],"fileNames":["lib.d.ts","./e.ts","../../project1/src/a.d.ts","./f.ts","../../project1/src/b.d.ts","./g.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"26403a4711355fb137eef9a25ce87785-export const e = 10;","signature":"f994d14efb4fce4ea854d5cfd729fc0d-export declare const e = 10;\n","impliedNodeFormat":1},"5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",{"version":"e7c04a1af5b0f6d8541b63ff23aca1e3-import { a } from \"../../project1/src/a\"; export const f = a;","signature":"17442bcc150c3a3dd19c25d5affcc9fa-export declare const f = 10;\n","impliedNodeFormat":1},"c354a25014e4712419cbd9266c28e943-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n",{"version":"06b9b3562579ebca65e399849c2a6a3a-import { b } from \"../../project1/src/b\"; export const g = b;","signature":"4b3f5082fb1783241d51fa14c76e770a-export declare const g = 10;\n","impliedNodeFormat":1}],"fileIdsList":[[3],[5]],"options":{"declaration":true},"referencedMap":[[4,1],[6,2]],"semanticDiagnosticsPerFile":[1,2,3,4,5,6]}
//// [/home/src/workspaces/solution/project2/src/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
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
      "version": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
      "signature": "5e35917ffa37324af3ace0b179493b37-export declare const a = 10;\nexport declare const aaa = 10;\n",
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
      "version": "c354a25014e4712419cbd9266c28e943-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n",
      "signature": "c354a25014e4712419cbd9266c28e943-export declare const b = 10;\nexport declare const aaaaa = 10;\nexport declare const a2 = 10;\n",
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
    "declaration": true
  },
  "referencedMap": {
    "./f.ts": [
      "../../project1/src/a.d.ts"
    ],
    "./g.ts": [
      "../../project1/src/b.d.ts"
    ]
  },
  "semanticDiagnosticsPerFile": [
    "lib.d.ts",
    "./e.ts",
    "../../project1/src/a.d.ts",
    "./f.ts",
    "../../project1/src/b.d.ts",
    "./g.ts"
  ],
  "size": 1895
}

project1/src/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/workspaces/solution/project1/src/b.ts
*refresh*    /home/src/workspaces/solution/project1/src/d.ts
Signatures::
(computed .d.ts) /home/src/workspaces/solution/project1/src/b.ts
(computed .d.ts) /home/src/workspaces/solution/project1/src/d.ts

project2/src/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.d.ts
*not cached* /home/src/workspaces/solution/project2/src/e.ts
*not cached* /home/src/workspaces/solution/project1/src/a.d.ts
*not cached* /home/src/workspaces/solution/project2/src/f.ts
*not cached* /home/src/workspaces/solution/project1/src/b.d.ts
*not cached* /home/src/workspaces/solution/project2/src/g.ts
Signatures::
(used version)   /home/src/workspaces/solution/project1/src/b.d.ts
(computed .d.ts) /home/src/workspaces/solution/project2/src/g.ts
