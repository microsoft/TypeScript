currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project/src/hello.json]
{
  "hello": "world"
}

//// [/home/src/workspaces/solution/project/src/index.ts]
import hello from "./hello.json"
export default hello.hello


//// [/home/src/workspaces/solution/project/tsconfig.json]
{
  "compilerOptions": {
    "moduleResolution": "node",
    "module": "commonjs",
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "outDir": "dist",
    "skipDefaultLibCheck": true
  },
  "files": [
    "src/index.ts",
    "src/hello.json"
  ]
}

//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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
declare const console: { log(msg: any): void; };


/home/src/tslibs/TS/Lib/tsc.js --b project --v --explainFiles --listEmittedFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is out of date because output file 'project/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project/tsconfig.json'...

TSFILE: /home/src/workspaces/solution/project/dist/hello.json
TSFILE: /home/src/workspaces/solution/project/dist/index.js
TSFILE: /home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project/src/hello.json
  Imported via "./hello.json" from file 'project/src/index.ts'
  Part of 'files' list in tsconfig.json
project/src/index.ts
  Part of 'files' list in tsconfig.json


//// [/home/src/workspaces/solution/project/dist/hello.json]
{
    "hello": "world"
}


//// [/home/src/workspaces/solution/project/dist/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hello_json_1 = __importDefault(require("./hello.json"));
exports.default = hello_json_1.default.hello;


//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo]
{"root":["../src/index.ts","../src/hello.json"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../src/index.ts",
    "../src/hello.json"
  ],
  "version": "FakeTSVersion",
  "size": 74
}


exitCode:: ExitStatus.Success
