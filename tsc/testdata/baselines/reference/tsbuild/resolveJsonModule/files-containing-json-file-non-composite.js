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
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is out of date because output file 'project/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project/tsconfig.json'...

TSFILE:  /home/src/workspaces/solution/project/dist/hello.json
TSFILE:  /home/src/workspaces/solution/project/dist/index.js
TSFILE:  /home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project/src/hello.json
   Imported via "./hello.json" from file 'project/src/index.ts'
   Part of 'files' list in tsconfig.json
project/src/index.ts
   Part of 'files' list in tsconfig.json
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
//// [/home/src/workspaces/solution/project/dist/hello.json] *new* 
{
    "hello": "world"
}

//// [/home/src/workspaces/solution/project/dist/index.js] *new* 
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hello_json_1 = __importDefault(require("./hello.json"));
exports.default = hello_json_1.default.hello;

//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["../src/index.ts","../src/hello.json"]}
//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
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
  "size": 74
}

project/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project/src/hello.json
*refresh*    /home/src/workspaces/solution/project/src/index.ts
Signatures::
