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
[[90m12:00:10 AM[0m] Projects in this build: 
    * src/child/tsconfig.json

[[90m12:00:11 AM[0m] Project 'src/child/tsconfig.json' is out of date because output file 'src/child/child.js' does not exist

[[90m12:00:12 AM[0m] Building project '/src/child/tsconfig.json'...

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
exports.child = void 0;
var child2_1 = require("../child/child2");
function child() {
    (0, child2_1.child2)();
}
exports.child = child;


//// [/src/child/child2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child2 = void 0;
function child2() {
}
exports.child2 = child2;




Change:: delete child2 file
Input::
//// [/src/child/child2.js] unlink
//// [/src/child/child2.ts] unlink


Output::
/lib/tsc --b /src/child/tsconfig.json -v --traceResolution --explainFiles
[[90m12:00:17 AM[0m] Projects in this build: 
    * src/child/tsconfig.json

[[90m12:00:18 AM[0m] Project 'src/child/tsconfig.json' is up to date because newest input 'src/child/child.ts' is older than output 'src/child/child.js'

exitCode:: ExitStatus.Success


