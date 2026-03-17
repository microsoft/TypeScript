currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project/src/hello.json] *new* 
{
    "hello": "world"
}
//// [/home/src/workspaces/solution/project/src/index.ts] *new* 
import hello from "./hello.json"
export default hello.hello
//// [/home/src/workspaces/solution/project/tsconfig.json] *new* 
{
    "compilerOptions": {
        "composite": false,
        "moduleResolution": "node",
        "module": "commonjs",
        "resolveJsonModule": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "outDir": "dist",
        "skipDefaultLibCheck": true,

    },
    "files": [ "src/index.ts", "src/hello.json", ],
}

tsgo --b project --v --explainFiles --listEmittedFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is out of date because output file 'project/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project/tsconfig.json'...

[96mproject/tsconfig.json[0m:[93m9[0m:[93m9[0m - [91merror[0m[90m TS5011: [0mThe common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set to this or another path to adjust your output's file layout.
  Visit https://aka.ms/ts6 for migration information.

[7m9[0m         "outDir": "dist",
[7m [0m [91m        ~~~~~~~~[0m

TSFILE:  /home/src/workspaces/solution/project/dist/src/hello.json
TSFILE:  /home/src/workspaces/solution/project/dist/src/index.js
TSFILE:  /home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.es2025.full.d.ts
   Default library for target 'ES2025'
project/src/hello.json
   Imported via "./hello.json" from file 'project/src/index.ts'
   Part of 'files' list in tsconfig.json
project/src/index.ts
   Part of 'files' list in tsconfig.json

Found 1 error in project/tsconfig.json[90m:9[0m

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
//// [/home/src/workspaces/solution/project/dist/src/hello.json] *new* 
{
    "hello": "world"
}

//// [/home/src/workspaces/solution/project/dist/src/index.js] *new* 
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_json_1 = __importDefault(require("./hello.json"));
exports.default = hello_json_1.default.hello;

//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","errors":true,"root":["../src/index.ts","../src/hello.json"]}
//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "errors": true,
  "root": [
    {
      "files": [
        "../src/index.ts"
      ],
      "original": "../src/index.ts"
    },
    {
      "files": [
        "../src/hello.json"
      ],
      "original": "../src/hello.json"
    }
  ],
  "size": 88
}

project/tsconfig.json::
SemanticDiagnostics::
*not cached* /home/src/tslibs/TS/Lib/lib.es2025.full.d.ts
*not cached* /home/src/workspaces/solution/project/src/hello.json
*not cached* /home/src/workspaces/solution/project/src/index.ts
Signatures::
