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

//// [/src/src/index.ts]
export const x = 10;

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
}



/home/src/tslibs/ts/lib/tsc.js --b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...



//// [/src/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/src/tsconfig.tsbuildinfo]
{"root":["./src/index.ts"],"version":"FakeTSVersion"}

//// [/src/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}


exitCode:: ExitStatus.Success


Change:: no-change-run
Input::


/home/src/tslibs/ts/lib/tsc.js --b /src/tsconfig.json -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/src/index.ts' is older than output 'src/dist/index.js'




exitCode:: ExitStatus.Success


Change:: Normal build without change, that does not block emit on error to show files that get emitted
Input::


/home/src/tslibs/ts/lib/tsc.js -p /src/tsconfig.json
Output::


//// [/src/dist/index.js] file written with same contents

exitCode:: ExitStatus.Success
