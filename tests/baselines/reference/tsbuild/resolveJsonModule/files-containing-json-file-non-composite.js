currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/lib/lib.d.ts]
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

//// [/src/src/hello.json]
{
  "hello": "world"
}

//// [/src/src/index.ts]
import hello from "./hello.json"
export default hello.hello


//// [/src/tsconfig.json]
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



Output::
/lib/tsc --b /src/tsconfig.json --v --explainFiles --listEmittedFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/dist/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

TSFILE: /src/dist/hello.json
TSFILE: /src/dist/index.js
TSFILE: /src/dist/tsconfig.tsbuildinfo
lib/lib.d.ts
  Default library for target 'es5'
src/src/hello.json
  Imported via "./hello.json" from file 'src/src/index.ts'
  Part of 'files' list in tsconfig.json
src/src/index.ts
  Part of 'files' list in tsconfig.json
exitCode:: ExitStatus.Success


//// [/src/dist/hello.json]
{
    "hello": "world"
}


//// [/src/dist/index.js]
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hello_json_1 = __importDefault(require("./hello.json"));
exports.default = hello_json_1.default.hello;


//// [/src/dist/tsconfig.tsbuildinfo]
{"version":"FakeTSVersion"}

//// [/src/dist/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "version": "FakeTSVersion",
  "size": 27
}

