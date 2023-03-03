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
/lib/tsc /src/a.ts --explainFiles --traceResolution --allowArbitraryExtensions
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
Loading module as file / folder, candidate module location '/src/b.css', target file types: Arbitrary.
File name '/src/b.css' has a '.css' extension - stripping it.
File '/src/b.css' exists - use it as a name resolution result.
======== Module name './b.css' was successfully resolved to '/src/b.css'. ========
lib/lib.d.ts
  Default library for target 'es5'
src/b.css
  Imported via "./b.css" from file 'src/a.ts'
src/a.ts
  Root file specified for compilation
exitCode:: ExitStatus.Success
Program root files: ["/src/a.ts"]
Program options: {"explainFiles":true,"traceResolution":true,"allowArbitraryExtensions":true}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/b.css
/src/a.ts


//// [/src/a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


