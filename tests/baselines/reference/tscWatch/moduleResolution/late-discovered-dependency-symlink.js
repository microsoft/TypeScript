currentDirectory:: /home/src/workspace/packageC useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspace/packageA/index.d.ts]
export declare class Foo {
    private f: any;
}


//// [/home/src/workspace/packageB/package.json]
{
  "private": true,
  "dependencies": {
    "package-a": "file:../packageA"
  }
}

//// [/home/src/workspace/packageB/index.d.ts]
import { Foo } from "package-a";
export declare function invoke(): Foo;


//// [/home/src/workspace/packageC/package.json]
{
  "private": true,
  "dependencies": {
    "package-b": "file:../packageB",
    "package-a": "file:../packageA"
  }
}

//// [/home/src/workspace/packageC/index.ts]
import * as pkg from "package-b";

export const a = pkg.invoke();


//// [/home/src/workspace/packageC/node_modules/package-a] symlink(/home/src/workspace/packageA)

//// [/home/src/workspace/packageB/node_modules/package-a] symlink(/home/src/workspace/packageA)

//// [/home/src/workspace/packageC/node_modules/package-b] symlink(/home/src/workspace/packageB)

//// [/home/src/workspace/packageC/tsconfig.json]
{
  "compilerOptions": {
    "declaration": true
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


/home/src/tslibs/TS/Lib/tsc.js --traceResolution --explainFiles --watch
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

======== Resolving module 'package-b' from '/home/src/workspace/packageC/index.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package-b' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Found 'package.json' at '/home/src/workspace/packageC/node_modules/package-b/package.json'.
File '/home/src/workspace/packageC/node_modules/package-b.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.d.ts' does not exist.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
File '/home/src/workspace/packageC/node_modules/package-b/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-b/index.d.ts', result '/home/src/workspace/packageB/index.d.ts'.
======== Module name 'package-b' was successfully resolved to '/home/src/workspace/packageB/index.d.ts'. ========
======== Resolving module 'package-a' from '/home/src/workspace/packageB/index.d.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package-a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageB/node_modules/package-a/package.json' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a.ts' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a.tsx' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a.d.ts' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a/index.ts' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a/index.tsx' does not exist.
File '/home/src/workspace/packageB/node_modules/package-a/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageB/node_modules/package-a/index.d.ts', result '/home/src/workspace/packageA/index.d.ts'.
======== Module name 'package-a' was successfully resolved to '/home/src/workspace/packageA/index.d.ts'. ========
======== Resolving module 'package-b' from '/home/src/workspace/packageC/package.json'. ========
Resolution for module 'package-b' was found in cache from location '/home/src/workspace/packageC'.
======== Module name 'package-b' was successfully resolved to '/home/src/workspace/packageB/index.d.ts'. ========
======== Resolving module 'package-a' from '/home/src/workspace/packageC/package.json'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package-a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageC/node_modules/package-a/package.json' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.d.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-a/index.d.ts', result '/home/src/workspace/packageA/index.d.ts'.
======== Module name 'package-a' was successfully resolved to '/home/src/workspace/packageA/index.d.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
../packageA/index.d.ts
  Imported via "package-a" from file '../packageB/index.d.ts'
../packageB/index.d.ts
  Imported via "package-b" from file 'index.ts'
index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/packageC/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
var pkg = require("package-b");
exports.a = pkg.invoke();


//// [/home/src/workspace/packageC/index.d.ts]
export declare const a: import("package-a").Foo;



PolledWatches::
/home/src/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/workspace/packageC/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/home/src/workspace/packageA/index.d.ts: *new*
  {}
/home/src/workspace/packageB/index.d.ts: *new*
  {}
/home/src/workspace/packageB/package.json: *new*
  {}
/home/src/workspace/packageC/index.ts: *new*
  {}
/home/src/workspace/packageC/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/workspace/packageB/node_modules: *new*
  {}
/home/src/workspace/packageB/node_modules/package-a: *new*
  {}
/home/src/workspace/packageC: *new*
  {}
/home/src/workspace/packageC/node_modules: *new*
  {}
/home/src/workspace/packageC/node_modules/package-b: *new*
  {}

Program root files: [
  "/home/src/workspace/packageC/index.ts"
]
Program options: {
  "declaration": true,
  "traceResolution": true,
  "explainFiles": true,
  "watch": true,
  "configFilePath": "/home/src/workspace/packageC/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspace/packageA/index.d.ts
/home/src/workspace/packageB/index.d.ts
/home/src/workspace/packageC/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspace/packageA/index.d.ts
/home/src/workspace/packageB/index.d.ts
/home/src/workspace/packageC/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/workspace/packagea/index.d.ts (used version)
/home/src/workspace/packageb/index.d.ts (used version)
/home/src/workspace/packagec/index.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: change index.ts

Input::
//// [/home/src/workspace/packageC/index.ts]
import * as pkg from "package-b";

export const aa = pkg.invoke();


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

Reusing resolution of module 'package-b' from '/home/src/workspace/packageC/index.ts' of old program, it was successfully resolved to '/home/src/workspace/packageB/index.d.ts'.
======== Resolving module 'package-b' from '/home/src/workspace/packageC/package.json'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package-b' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageC/node_modules/package-b/package.json' exists according to earlier cached lookups.
File '/home/src/workspace/packageC/node_modules/package-b.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' does not have a 'main' field.
File '/home/src/workspace/packageC/node_modules/package-b/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-b/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-b/index.d.ts', result '/home/src/workspace/packageB/index.d.ts'.
======== Module name 'package-b' was successfully resolved to '/home/src/workspace/packageB/index.d.ts'. ========
======== Resolving module 'package-a' from '/home/src/workspace/packageC/package.json'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'package-a' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
File '/home/src/workspace/packageC/node_modules/package-a/package.json' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a.d.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.ts' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.tsx' does not exist.
File '/home/src/workspace/packageC/node_modules/package-a/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspace/packageC/node_modules/package-a/index.d.ts', result '/home/src/workspace/packageA/index.d.ts'.
======== Module name 'package-a' was successfully resolved to '/home/src/workspace/packageA/index.d.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
../packageA/index.d.ts
  Imported via "package-a" from file '../packageB/index.d.ts'
../packageB/index.d.ts
  Imported via "package-b" from file 'index.ts'
index.ts
  Matched by default include pattern '**/*'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/workspace/packageC/index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aa = void 0;
var pkg = require("package-b");
exports.aa = pkg.invoke();


//// [/home/src/workspace/packageC/index.d.ts]
export declare const aa: import("package-a").Foo;




Program root files: [
  "/home/src/workspace/packageC/index.ts"
]
Program options: {
  "declaration": true,
  "traceResolution": true,
  "explainFiles": true,
  "watch": true,
  "configFilePath": "/home/src/workspace/packageC/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/workspace/packageA/index.d.ts
/home/src/workspace/packageB/index.d.ts
/home/src/workspace/packageC/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/workspace/packageC/index.ts

Shape signatures in builder refreshed for::
/home/src/workspace/packagec/index.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
