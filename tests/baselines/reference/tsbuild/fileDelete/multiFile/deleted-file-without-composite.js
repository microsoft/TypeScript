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

//// [/src/child/child.ts]
import { child2 } from "../child/child2";
export function child() {
    child2();
}


//// [/src/child/child2.ts]
export function child2() {
}


//// [/src/child/tsconfig.json]
{
  "compilerOptions": {}
}



Output::
/lib/tsc --b /src/child/tsconfig.json -v --traceResolution --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/child/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/child/tsconfig.json' is out of date because output file 'src/child/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/src/child/child.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/src/child/child2', target file types: TypeScript, Declaration.
File '/src/child/child2.ts' exists - use it as a name resolution result.
======== Module name '../child/child2' was successfully resolved to '/src/child/child2.ts'. ========
lib/lib.d.ts
  Default library for target 'es5'
src/child/child2.ts
  Imported via "../child/child2" from file 'src/child/child.ts'
  Matched by default include pattern '**/*'
src/child/child.ts
  Matched by default include pattern '**/*'
exitCode:: ExitStatus.Success


//// [/src/child/child.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child = child;
var child2_1 = require("../child/child2");
function child() {
    (0, child2_1.child2)();
}


//// [/src/child/child2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child2 = child2;
function child2() {
}


//// [/src/child/tsconfig.tsbuildinfo]
{"root":["./child.ts","./child2.ts"],"version":"FakeTSVersion"}

//// [/src/child/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./child.ts",
    "./child2.ts"
  ],
  "version": "FakeTSVersion",
  "size": 63
}



Change:: delete child2 file
Input::
//// [/src/child/child2.js] unlink
//// [/src/child/child2.ts] unlink


Output::
/lib/tsc --b /src/child/tsconfig.json -v --traceResolution --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/child/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/child/tsconfig.json' is out of date because buildinfo file 'src/child/tsconfig.tsbuildinfo' indicates that file 'src/child/child2.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project '/src/child/tsconfig.json'...

======== Resolving module '../child/child2' from '/src/child/child.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/src/child/child2', target file types: TypeScript, Declaration.
File '/src/child/child2.ts' does not exist.
File '/src/child/child2.tsx' does not exist.
File '/src/child/child2.d.ts' does not exist.
Directory '/src/child/child2' does not exist, skipping all lookups in it.
Loading module as file / folder, candidate module location '/src/child/child2', target file types: JavaScript.
File '/src/child/child2.js' does not exist.
File '/src/child/child2.jsx' does not exist.
Directory '/src/child/child2' does not exist, skipping all lookups in it.
======== Module name '../child/child2' was not resolved. ========
[96msrc/child/child.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS2307: [0mCannot find module '../child/child2' or its corresponding type declarations.

[7m1[0m import { child2 } from "../child/child2";
[7m [0m [91m                       ~~~~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/child/child.ts
  Matched by default include pattern '**/*'

Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped


//// [/src/child/child.js] file written with same contents
//// [/src/child/tsconfig.tsbuildinfo]
{"root":["./child.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/src/child/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./child.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 63
}

