currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/src/index.ts]
export const x = 10;

//// [/home/src/workspaces/project/types/type.ts]
export type t = string;

//// [/home/src/workspaces/project/tsconfig.json]
{
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  }
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


/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'


Found 1 error.



//// [/home/src/workspaces/project/dist/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/workspaces/project/types/type.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/home/src/workspaces/project/tsconfig.tsbuildinfo]
{"root":["./src/index.ts","./types/type.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/index.ts",
    "./types/type.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 85
}


exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js --b -v
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because buildinfo file 'tsconfig.tsbuildinfo' indicates that program needs to report errors.

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'


Found 1 error.



//// [/home/src/workspaces/project/dist/index.js] file written with same contents
//// [/home/src/workspaces/project/types/type.js] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo] file written with same contents
//// [/home/src/workspaces/project/tsconfig.tsbuildinfo.readable.baseline.txt] file written with same contents

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped

Change:: Normal build without change, that does not block emit on error to show files that get emitted

Input::

/home/src/tslibs/TS/Lib/tsc.js -p /home/src/workspaces/project/tsconfig.json
Output::
[91merror[0m[90m TS6059: [0mFile '/home/src/workspaces/project/types/type.ts' is not under 'rootDir' '/home/src/workspaces/project/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by default include pattern '**/*'


Found 1 error.



//// [/home/src/workspaces/project/dist/index.js] file written with same contents
//// [/home/src/workspaces/project/types/type.js] file written with same contents

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
