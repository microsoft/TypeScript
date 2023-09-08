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

//// [/src/project/src/main.tsx]
export const x = 10;

//// [/src/project/tsconfig.json]
{"compilerOptions":{"declaration":true},"include":["src/**/*.tsx","src/**/*.ts"]}



Output::
/lib/tsc --b src/project -v --explainFiles
[[90m12:00:10 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:11 AM[0m] Project 'src/project/tsconfig.json' is out of date because output file 'src/project/src/main.js' does not exist

[[90m12:00:12 AM[0m] Building project '/src/project/tsconfig.json'...

lib/lib.d.ts
  Default library for target 'es5'
src/project/src/main.tsx
  Matched by include pattern 'src/**/*.tsx' in 'src/project/tsconfig.json'
exitCode:: ExitStatus.Success


//// [/src/project/src/main.d.ts]
export declare const x = 10;


//// [/src/project/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;




Change:: no-change-run
Input::


Output::
/lib/tsc --b src/project -v --explainFiles
[[90m12:00:15 AM[0m] Projects in this build: 
    * src/project/tsconfig.json

[[90m12:00:16 AM[0m] Project 'src/project/tsconfig.json' is out of date because output 'src/project/src/main.js' is older than input 'src/project/src/main.d.ts'

[[90m12:00:17 AM[0m] Building project '/src/project/tsconfig.json'...

[91merror[0m[90m TS5055: [0mCannot write file '/src/project/src/main.d.ts' because it would overwrite input file.

lib/lib.d.ts
  Default library for target 'es5'
src/project/src/main.tsx
  Matched by include pattern 'src/**/*.tsx' in 'src/project/tsconfig.json'
src/project/src/main.d.ts
  Matched by include pattern 'src/**/*.ts' in 'src/project/tsconfig.json'

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: clean build
Input::


Output::
/lib/tsc -b /src/project --clean
exitCode:: ExitStatus.Success


//// [/src/project/src/main.js] unlink
