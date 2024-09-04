currentDirectory:: /home/src/workspaces/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/workspaces/project/a/src/index.ts]


//// [/home/src/workspaces/project/a/tsconfig.json]
{
  "compilerOptions": {
    "strict": true
  }
}

//// [/home/src/workspaces/project/b/src/index.ts]
import pg from "pg";
pg.foo();


//// [/home/src/workspaces/project/b/tsconfig.json]
{
  "compilerOptions": {
    "strict": true,
    "module": "node16"
  }
}

//// [/home/src/workspaces/project/b/package.json]
{
  "name": "b",
  "type": "module"
}

//// [/home/src/workspaces/project/node_modules/@types/pg/index.d.ts]
export function foo(): void;

//// [/home/src/workspaces/project/node_modules/@types/pg/package.json]
{
  "name": "@types/pg",
  "types": "index.d.ts"
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


/home/src/tslibs/TS/Lib/tsc.js -b a b --verbose --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * a/tsconfig.json
    * b/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because output file 'a/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/a/tsconfig.json'...

======== Resolving type reference directive 'pg', containing file '/home/src/workspaces/project/a/__inferred type names__.ts', root directory '/home/src/workspaces/project/a/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/a/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/a/node_modules/@types' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/workspaces/project/node_modules/@types/pg/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
======== Type reference directive 'pg' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts', primary: true. ========
File '/home/src/workspaces/project/node_modules/@types/pg/package.json' exists according to earlier cached lookups.
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
a/src/index.ts
  Matched by default include pattern '**/*'
node_modules/@types/pg/index.d.ts
  Entry point for implicit type library 'pg'
[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is out of date because output file 'b/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/workspaces/project/b/tsconfig.json'...

File '/home/src/workspaces/project/b/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/b/package.json'.
======== Resolving module 'pg' from '/home/src/workspaces/project/b/src/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/workspaces/project/b/src/package.json' does not exist according to earlier cached lookups.
File '/home/src/workspaces/project/b/package.json' exists according to earlier cached lookups.
Loading module 'pg' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/b/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/b/node_modules' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/node_modules/@types/pg/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
======== Module name 'pg' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'. ========
File '/home/src/workspaces/project/node_modules/@types/pg/package.json' exists according to earlier cached lookups.
======== Resolving type reference directive 'pg', containing file '/home/src/workspaces/project/b/__inferred type names__.ts', root directory '/home/src/workspaces/project/b/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/b/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/b/node_modules/@types' does not exist, skipping all lookups in it.
File '/home/src/workspaces/project/node_modules/@types/pg/package.json' exists according to earlier cached lookups.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
======== Type reference directive 'pg' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts', primary: true. ========
File '/home/src/tslibs/TS/Lib/package.json' does not exist.
File '/home/src/tslibs/TS/package.json' does not exist.
File '/home/src/tslibs/package.json' does not exist.
File '/home/src/package.json' does not exist.
File '/home/package.json' does not exist.
File '/package.json' does not exist.
../../tslibs/TS/Lib/lib.es2022.full.d.ts
  Default library for target 'es2022'
node_modules/@types/pg/index.d.ts
  Imported via "pg" from file 'b/src/index.ts'
  Entry point for implicit type library 'pg'
  File is CommonJS module because 'node_modules/@types/pg/package.json' does not have field "type"
b/src/index.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'b/package.json' has field "type" with value "module"


//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*

//// [/home/src/workspaces/project/a/src/index.js]
"use strict";


//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo]
{"root":["./src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}

//// [/home/src/workspaces/project/b/src/index.js]
import pg from "pg";
pg.foo();


//// [/home/src/workspaces/project/b/tsconfig.tsbuildinfo]
{"root":["./src/index.ts"],"version":"FakeTSVersion"}

//// [/home/src/workspaces/project/b/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./src/index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 53
}


exitCode:: ExitStatus.Success

Change:: no-change-run

Input::

/home/src/tslibs/TS/Lib/tsc.js -b a b --verbose --traceResolution --explainFiles
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * a/tsconfig.json
    * b/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is up to date because newest input 'a/src/index.ts' is older than output 'a/src/index.js'

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is up to date because newest input 'b/src/index.ts' is older than output 'b/src/index.js'




exitCode:: ExitStatus.Success
