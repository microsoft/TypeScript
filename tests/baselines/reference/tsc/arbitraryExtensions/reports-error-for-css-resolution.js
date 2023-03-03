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

//// [/src/a.ts]
import {} from "./b.css";

//// [/src/b.css]
random content



Output::
/lib/tsc /src/a.ts --explainFiles --traceResolution
======== Resolving module './b.css' from '/src/a.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module as file / folder, candidate module location '/src/b.css', target file types: TypeScript, Declaration.
File name '/src/b.css' has a '.css' extension - stripping it.
File '/src/b.d.css.ts' does not exist.
File '/src/b.css.ts' does not exist.
File '/src/b.css.tsx' does not exist.
File '/src/b.css.d.ts' does not exist.
Directory '/src/b.css' does not exist, skipping all lookups in it.
Loading module as file / folder, candidate module location '/src/b.css', target file types: JavaScript.
File name '/src/b.css' has a '.css' extension - stripping it.
File '/src/b.css.js' does not exist.
File '/src/b.css.jsx' does not exist.
Directory '/src/b.css' does not exist, skipping all lookups in it.
======== Module name './b.css' was not resolved. ========
[96msrc/a.ts[0m:[93m1[0m:[93m16[0m - [91merror[0m[90m TS2307: [0mCannot find module './b.css' or its corresponding type declarations.

[7m1[0m import {} from "./b.css";
[7m [0m [91m               ~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/a.ts
  Root file specified for compilation

Found 1 error in src/a.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated
Program root files: ["/src/a.ts"]
Program options: {"explainFiles":true,"traceResolution":true}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts


//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


