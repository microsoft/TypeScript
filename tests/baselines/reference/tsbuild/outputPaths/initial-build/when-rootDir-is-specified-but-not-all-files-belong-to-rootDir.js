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

//// [/src/src/index.ts]
export const x = 10;

//// [/src/tsconfig.json]
{"compilerOptions":{"outDir":"dist","rootDir":"src"}}

//// [/src/types/type.ts]
export type t = string;



Output::
/lib/tsc --b /src/tsconfig.json -v
[[90m12:01:00 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:01:00 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/dist/index.js' does not exist

[[90m12:01:00 AM[0m] Building project '/src/tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/src/types/type.ts' is not under 'rootDir' '/src/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by include pattern '**/*' in '/src/tsconfig.json'


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v
[[90m12:04:00 AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90m12:04:00 AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/dist/index.js' does not exist

[[90m12:04:00 AM[0m] Building project '/src/tsconfig.json'...

[91merror[0m[90m TS6059: [0mFile '/src/types/type.ts' is not under 'rootDir' '/src/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by include pattern '**/*' in '/src/tsconfig.json'


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped




Change:: Normal build without change, that does not block emit on error to show files that get emitted
Input::


Output::
/lib/tsc -p /src/tsconfig.json
[91merror[0m[90m TS6059: [0mFile '/src/types/type.ts' is not under 'rootDir' '/src/src'. 'rootDir' is expected to contain all source files.
  The file is in the program because:
    Matched by include pattern '**/*' in '/src/tsconfig.json'


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


//// [/src/dist/index.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 10;


//// [/src/types/type.js]
"use strict";
exports.__esModule = true;


