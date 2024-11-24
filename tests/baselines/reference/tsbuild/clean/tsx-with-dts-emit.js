currentDirectory:: /home/src/workspaces/solution useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/solution/project/src/main.tsx]
export const x = 10;

//// [/home/src/workspaces/solution/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
  },
  "include": [
    "src/**/*.tsx",
    "src/**/*.ts"
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


/home/src/tslibs/TS/Lib/tsc.js --b project -v --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is out of date because output file 'project/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/solution/project/tsconfig.json'...

../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
project/src/main.tsx
  Matched by include pattern 'src/**/*.tsx' in 'project/tsconfig.json'


//// [/home/src/workspaces/solution/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/solution/project/src/main.d.ts]
export declare const x = 10;


//// [/home/src/workspaces/solution/project/tsconfig.tsbuildinfo]
{"root":["./src/main.tsx"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/solution/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/main.tsx"
  ],
  "version": "FakeTSVersion",
  "size": 53
}


exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b project -v --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'project/tsconfig.json' is up to date because newest input 'project/src/main.tsx' is older than output 'project/src/main.js'




exitCode:: ExitStatus.Success

Change:: clean build

Input::

/home/src/tslibs/TS/Lib/tsc.js -b project --clean
//// [/home/src/workspaces/solution/project/src/main.js] deleted
//// [/home/src/workspaces/solution/project/src/main.d.ts] deleted
//// [/home/src/workspaces/solution/project/tsconfig.tsbuildinfo] deleted

exitCode:: ExitStatus.Success
