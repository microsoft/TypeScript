currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/project/src/main.tsx] *new* 
export const x = 10;
//// [/home/src/workspaces/solution/project/tsconfig.json] *new* 
{
    "compilerOptions": { "declaration": true },
    "include": ["src/**/*.tsx", "src/**/*.ts"]
}

tsgo --b project -v --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is out of date because output file 'project/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'project/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
project/src/main.tsx
   Matched by include pattern 'src/**/*.tsx' in 'project/tsconfig.json'
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
//// [/home/src/workspaces/solution/project/src/main.d.ts] *new* 
export declare const x = 10;

//// [/home/src/workspaces/solution/project/src/main.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;

//// [/home/src/workspaces/solution/project/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./src/main.tsx"]}
//// [/home/src/workspaces/solution/project/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/main.tsx"
      ],
      "original": "./src/main.tsx"
    }
  ],
  "size": 53
}

project/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/project/src/main.tsx
Signatures::
(stored at emit) /home/src/workspaces/solution/project/src/main.tsx


Edit [0]:: no change

tsgo --b project -v --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is up to date because newest input 'project/src/main.tsx' is older than output 'project/src/main.js'




Edit [1]:: clean build

tsgo -b project --clean
ExitStatus:: Success
Output::
//// [/home/src/workspaces/solution/project/src/main.d.ts] *deleted*
//// [/home/src/workspaces/solution/project/src/main.js] *deleted*
//// [/home/src/workspaces/solution/project/tsconfig.tsbuildinfo] *deleted*

