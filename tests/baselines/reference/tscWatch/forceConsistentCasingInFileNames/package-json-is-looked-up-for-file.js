currentDirectory:: /Users/name/projects/lib-boilerplate useCaseSensitiveFileNames:: false
Input::
//// [/Users/name/projects/lib-boilerplate/package.json]
{
  "name": "lib-boilerplate",
  "version": "0.0.2",
  "type": "module",
  "exports": "./src/index.ts"
}

//// [/Users/name/projects/lib-boilerplate/src/index.ts]
export function thing(): void {}


//// [/Users/name/projects/lib-boilerplate/test/basic.spec.ts]
import { thing } from 'lib-boilerplate'


//// [/Users/name/projects/lib-boilerplate/tsconfig.json]
{
  "compilerOptions": {
    "module": "node16",
    "target": "es2021",
    "forceConsistentCasingInFileNames": true,
    "traceResolution": true
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


/home/src/tslibs/TS/Lib/tsc.js -w --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

File '/Users/name/projects/lib-boilerplate/src/package.json' does not exist.
Found 'package.json' at '/Users/name/projects/lib-boilerplate/package.json'.
File '/Users/name/projects/lib-boilerplate/test/package.json' does not exist.
File '/Users/name/projects/lib-boilerplate/package.json' exists according to earlier cached lookups.
======== Resolving module 'lib-boilerplate' from '/Users/name/projects/lib-boilerplate/test/basic.spec.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/Users/name/projects/lib-boilerplate/test/package.json' does not exist according to earlier cached lookups.
File '/Users/name/projects/lib-boilerplate/package.json' exists according to earlier cached lookups.
Using 'exports' subpath '.' with target './src/index.ts'.
File '/Users/name/projects/lib-boilerplate/src/index.ts' exists - use it as a name resolution result.
'package.json' does not have a 'peerDependencies' field.
======== Module name 'lib-boilerplate' was successfully resolved to '/Users/name/projects/lib-boilerplate/src/index.ts' with Package ID 'lib-boilerplate/src/index.ts@0.0.2'. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
../../../../home/src/tslibs/TS/Lib/lib.es2021.full.d.ts
  Default library for target 'es2021'
src/index.ts
  Matched by default include pattern '**/*'
  Imported via 'lib-boilerplate' from file 'test/basic.spec.ts' with packageId 'lib-boilerplate/src/index.ts@0.0.2'
  File is ECMAScript module because 'package.json' has field "type" with value "module"
test/basic.spec.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/tslibs/TS/Lib/lib.es2021.full.d.ts] *Lib*

//// [/Users/name/projects/lib-boilerplate/src/index.js]
export function thing() { }


//// [/Users/name/projects/lib-boilerplate/test/basic.spec.js]
export {};



PolledWatches::
/Users/name/projects/lib-boilerplate/node_modules/@types: *new*
  {"pollingInterval":500}
/Users/name/projects/lib-boilerplate/src/package.json: *new*
  {"pollingInterval":2000}
/Users/name/projects/lib-boilerplate/test/package.json: *new*
  {"pollingInterval":2000}
/Users/name/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/tslibs/TS/Lib/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/TS/package.json: *new*
  {"pollingInterval":2000}
/home/src/tslibs/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/Users/name/projects/lib-boilerplate/package.json: *new*
  {}
/Users/name/projects/lib-boilerplate/src/index.ts: *new*
  {}
/Users/name/projects/lib-boilerplate/test/basic.spec.ts: *new*
  {}
/Users/name/projects/lib-boilerplate/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es2021.full.d.ts: *new*
  {}

FsWatchesRecursive::
/Users/name/projects/lib-boilerplate: *new*
  {}
/Users/name/projects/lib-boilerplate/test: *new*
  {}

Program root files: [
  "/Users/name/projects/lib-boilerplate/src/index.ts",
  "/Users/name/projects/lib-boilerplate/test/basic.spec.ts"
]
Program options: {
  "module": 100,
  "target": 8,
  "forceConsistentCasingInFileNames": true,
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "configFilePath": "/Users/name/projects/lib-boilerplate/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es2021.full.d.ts
/Users/name/projects/lib-boilerplate/src/index.ts
/Users/name/projects/lib-boilerplate/test/basic.spec.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es2021.full.d.ts
/Users/name/projects/lib-boilerplate/src/index.ts
/Users/name/projects/lib-boilerplate/test/basic.spec.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2021.full.d.ts (used version)
/users/name/projects/lib-boilerplate/src/index.ts (used version)
/users/name/projects/lib-boilerplate/test/basic.spec.ts (used version)

exitCode:: ExitStatus.undefined
