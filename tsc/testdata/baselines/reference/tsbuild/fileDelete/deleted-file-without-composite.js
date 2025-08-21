currentDirectory::/home/src/workspaces/solution
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/solution/child/child.ts] *new* 
import { child2 } from "../child/child2";
export function child() {
    child2();
}
//// [/home/src/workspaces/solution/child/child2.ts] *new* 
export function child2() {
}
//// [/home/src/workspaces/solution/child/tsconfig.json] *new* 
{
    "compilerOptions": { }
}

tsgo --b child/tsconfig.json -v --traceResolution --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because output file 'child/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child2', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/workspaces/solution/child/child2.ts' exists - use it as a name resolution result.
======== Module name '../child/child2' was successfully resolved to '/home/src/workspaces/solution/child/child2.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
child/child2.ts
   Imported via "../child/child2" from file 'child/child.ts'
   Matched by default include pattern '**/*'
child/child.ts
   Matched by default include pattern '**/*'
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
//// [/home/src/workspaces/solution/child/child.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child = child;
const child2_1 = require("../child/child2");
function child() {
    (0, child2_1.child2)();
}

//// [/home/src/workspaces/solution/child/child2.js] *new* 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.child2 = child2;
function child2() {
}

//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./child.ts","./child2.ts"]}
//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./child.ts"
      ],
      "original": "./child.ts"
    },
    {
      "files": [
        "./child2.ts"
      ],
      "original": "./child2.ts"
    }
  ],
  "size": 63
}

child/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/child/child2.ts
*refresh*    /home/src/workspaces/solution/child/child.ts
Signatures::


Edit [0]:: delete child2 file
//// [/home/src/workspaces/solution/child/child2.js] *deleted*
//// [/home/src/workspaces/solution/child/child2.ts] *deleted*

tsgo --b child/tsconfig.json -v --traceResolution --explainFiles
ExitStatus:: DiagnosticsPresent_OutputsGenerated
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * child/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'child/tsconfig.json' is out of date because buildinfo file 'child/tsconfig.tsbuildinfo' indicates that file 'child/child2.ts' was root file of compilation but not any more.

[[90mHH:MM:SS AM[0m] Building project 'child/tsconfig.json'...

======== Resolving module '../child/child2' from '/home/src/workspaces/solution/child/child.ts'. ========
Module resolution kind is not specified, using 'Bundler'.
Resolving in CJS mode with conditions 'require', 'types'.
Loading module as file / folder, candidate module location '/home/src/workspaces/solution/child/child2', target file types: TypeScript, JavaScript, Declaration, JSON.
File '/home/src/workspaces/solution/child/child2.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.tsx' does not exist.
File '/home/src/workspaces/solution/child/child2.d.ts' does not exist.
File '/home/src/workspaces/solution/child/child2.js' does not exist.
File '/home/src/workspaces/solution/child/child2.jsx' does not exist.
Directory '/home/src/workspaces/solution/child/child2' does not exist, skipping all lookups in it.
======== Module name '../child/child2' was not resolved. ========
[96mchild/child.ts[0m:[93m1[0m:[93m24[0m - [91merror[0m[90m TS2307: [0mCannot find module '../child/child2' or its corresponding type declarations.

[7m1[0m import { child2 } from "../child/child2";
[7m [0m [91m                       ~~~~~~~~~~~~~~~~~[0m

../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
child/child.ts
   Matched by default include pattern '**/*'

Found 1 error in child/child.ts[90m:1[0m

//// [/home/src/workspaces/solution/child/child.js] *rewrite with same content*
//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo] *modified* 
{"version":"FakeTSVersion","root":["./child.ts"],"semanticErrors":true}
//// [/home/src/workspaces/solution/child/tsconfig.tsbuildinfo.readable.baseline.txt] *modified* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./child.ts"
      ],
      "original": "./child.ts"
    }
  ],
  "size": 71,
  "semanticErrors": true
}

child/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/solution/child/child.ts
Signatures::
