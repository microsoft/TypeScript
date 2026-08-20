currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/src/index.ts] *new* 
export const x = 10;
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "outDir": "dist",
        "rootDir": "src",
        "composite": true
    },
}
//// [/home/src/workspaces/project/types/type.ts] *new* 
export type t = string;

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'

Found 1 error.

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
//// [/home/src/workspaces/project/dist/index.d.ts] *new* 
export declare const x = 10;

//// [/home/src/workspaces/project/dist/index.js] *new* 
export const x = 10;

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":[[2,3]],"fileNames":["lib.es2025.full.d.ts","./src/index.ts","./types/type.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"28e8748a7acd58f4f59388926e914f86-export const x = 10;","signature":"f9b4154a9a5944099ecf197d4519d083-export declare const x = 10;\n","impliedNodeFormat":1},{"version":"37c1beee3ff062c5ae875b0377f00093-export type t = string;","signature":"09b8756df8837e9d9dd668b82d3aad6c-export type t = string;\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./dist","rootDir":"./src"},"semanticDiagnosticsPerFile":[1,2,3],"latestChangedDtsFile":"./types/type.d.ts"}
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "./src/index.ts",
        "./types/type.ts"
      ],
      "original": [
        2,
        3
      ]
    }
  ],
  "fileNames": [
    "lib.es2025.full.d.ts",
    "./src/index.ts",
    "./types/type.ts"
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
      "fileName": "./src/index.ts",
      "version": "28e8748a7acd58f4f59388926e914f86-export const x = 10;",
      "signature": "f9b4154a9a5944099ecf197d4519d083-export declare const x = 10;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "28e8748a7acd58f4f59388926e914f86-export const x = 10;",
        "signature": "f9b4154a9a5944099ecf197d4519d083-export declare const x = 10;\n",
        "impliedNodeFormat": 1
      }
    },
    {
      "fileName": "./types/type.ts",
      "version": "37c1beee3ff062c5ae875b0377f00093-export type t = string;",
      "signature": "09b8756df8837e9d9dd668b82d3aad6c-export type t = string;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "37c1beee3ff062c5ae875b0377f00093-export type t = string;",
        "signature": "09b8756df8837e9d9dd668b82d3aad6c-export type t = string;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "semanticDiagnosticsPerFile": [
    "lib.es2025.full.d.ts",
    "./src/index.ts",
    "./types/type.ts"
  ],
  "latestChangedDtsFile": "./types/type.d.ts",
  "size": 1391
}
//// [/home/src/workspaces/project/types/type.d.ts] *new* 
export type t = string;

//// [/home/src/workspaces/project/types/type.js] *new* 
export {};


tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*not cached* /home/src/workspaces/project/src/index.ts
*not cached* /home/src/workspaces/project/types/type.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/index.ts
(stored at emit) /home/src/workspaces/project/types/type.ts


Edit [0]:: no change

tsgo -b -v
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project 'tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'

Found 1 error.


tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*not cached* /home/src/workspaces/project/src/index.ts
*not cached* /home/src/workspaces/project/types/type.ts
Signatures::


Edit [1]:: Normal build without change, that does not block emit on error to show files that get emitted

tsgo -p /home/src/workspaces/project/tsconfig.json
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'

Found 1 error.


tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*not cached* /home/src/workspaces/project/src/index.ts
*not cached* /home/src/workspaces/project/types/type.ts
Signatures::
