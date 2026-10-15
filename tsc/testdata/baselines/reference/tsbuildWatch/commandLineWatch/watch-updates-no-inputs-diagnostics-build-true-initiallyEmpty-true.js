currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/tsconfig.json] *new* 
{
	"compilerOptions": { "composite": true, "outDir": "out" },
	"include": ["src/**/*.ts"]
}

tsgo --build --watch --force
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.json'. Specified 'include' paths were '["src/**/*.ts"]' and 'exclude' paths were '["/home/src/workspaces/project/out"]'.
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"fileInfos":[],"options":{"composite":true,"outDir":"./"}}
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "fileInfos": [],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "size": 99
}

Watch Registrations::
Directory watches::
  /home/src/workspaces/project
tsconfig.json::
SemanticDiagnostics::
Signatures::


Edit [0]:: add first source file
//// [/home/src/workspaces/project/src/helper.ts] *new* 
export const helper = 2;


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

//// [/home/src/tslibs/TS/Lib/lib.es2026.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/out/src/helper.d.ts] *new* 
export declare const helper = 2;

//// [/home/src/workspaces/project/out/src/helper.js] *new* 
export const helper = 2;

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":[2],"fileNames":["lib.es2026.full.d.ts","../src/helper.ts"],"fileInfos":[{"version":"8859c12c614ce56ba9a18e58384a198f-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ninterface SymbolConstructor {\n    (desc?: string | number): symbol;\n    for(name: string): symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true,"impliedNodeFormat":1},{"version":"4cfe3c7aa736450b8afd77a4f21c00c8-export const helper = 2;","signature":"4442875ee69a1b282969dfdd30e3eac0-export declare const helper = 2;\n","impliedNodeFormat":1}],"options":{"composite":true,"outDir":"./"},"latestChangedDtsFile":"./src/helper.d.ts"}
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "../src/helper.ts"
      ],
      "original": 2
    }
  ],
  "fileNames": [
    "lib.es2026.full.d.ts",
    "../src/helper.ts"
  ],
  "fileInfos": [
    {
      "fileName": "lib.es2026.full.d.ts",
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
      "fileName": "../src/helper.ts",
      "version": "4cfe3c7aa736450b8afd77a4f21c00c8-export const helper = 2;",
      "signature": "4442875ee69a1b282969dfdd30e3eac0-export declare const helper = 2;\n",
      "impliedNodeFormat": "CommonJS",
      "original": {
        "version": "4cfe3c7aa736450b8afd77a4f21c00c8-export const helper = 2;",
        "signature": "4442875ee69a1b282969dfdd30e3eac0-export declare const helper = 2;\n",
        "impliedNodeFormat": 1
      }
    }
  ],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "latestChangedDtsFile": "./src/helper.d.ts",
  "size": 1140
}

Watch Registrations::
Directory watches::
  /home/src/tslibs/TS/Lib
  /home/src/workspaces/project
  /home/src/workspaces/project/src (recursive)
tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2026.full.d.ts
*refresh*    /home/src/workspaces/project/src/helper.ts
Signatures::
(stored at emit) /home/src/workspaces/project/src/helper.ts


Edit [1]:: remove last source file
//// [/home/src/workspaces/project/src/helper.ts] *deleted*


Output::
[2J[3J[H[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[91merror[0m[90m TS18003: [0mNo inputs were found in config file '/home/src/workspaces/project/tsconfig.json'. Specified 'include' paths were '["src/**/*.ts"]' and 'exclude' paths were '["/home/src/workspaces/project/out"]'.
[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.

//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","errors":true,"fileInfos":[],"options":{"composite":true,"outDir":"./"}}
//// [/home/src/workspaces/project/out/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "fileInfos": [],
  "options": {
    "composite": true,
    "outDir": "./"
  },
  "size": 99
}

Watch Registrations::
Directory watches::
  /home/src/workspaces/project
  /home/src/workspaces/project/src (recursive)
tsconfig.json::
SemanticDiagnostics::
Signatures::
