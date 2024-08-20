currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/home/src/tslibs/ts/lib/lib.d.ts]
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

//// [/src/project/src/main.tsx]
export const x = 10;

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
  },
  "include": [
    "src/**/*.tsx",
    "src/**/*.ts"
  ]
}



/home/src/tslibs/ts/lib/tsc.js --b src/project -v --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/project/tsconfig.json'...

home/src/tslibs/ts/lib/lib.d.ts
  Default library for target 'es5'
src/project/src/main.tsx
  Matched by include pattern 'src/**/*.tsx' in 'src/project/tsconfig.json'


//// [/src/project/src/main.d.ts]
export declare const x = 10;


//// [/src/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/project/tsconfig.tsbuildinfo]
{"root":["./src/main.tsx"],"version":"FakeTSVersion"}

//// [/src/project/tsconfig.tsbuildinfo.readable.baseline.txt]
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


/home/src/tslibs/ts/lib/tsc.js --b src/project -v --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/project/tsconfig.json' is up to date because newest input 'src/project/src/main.tsx' is older than output 'src/project/src/main.js'




exitCode:: ExitStatus.Success


Change:: clean build
Input::


/home/src/tslibs/ts/lib/tsc.js -b /src/project --clean
Output::


//// [/src/project/tsconfig.tsbuildinfo] unlink
//// [/src/project/src/main.d.ts] unlink
//// [/src/project/src/main.js] unlink

exitCode:: ExitStatus.Success
