currentDirectory:: /src/projects/a useCaseSensitiveFileNames: false
Input::
//// [/src/projects/a/src/index.ts]


//// [/src/projects/a/tsconfig.json]
{
  "compilerOptions": {
    "strict": true,
    "incremental": true,
    "outFile": "../outFile.js"
  }
}

//// [/src/projects/node_modules/@types/pg/index.d.ts]
export function foo(): void;

//// [/src/projects/node_modules/@types/pg/package.json]
{
  "name": "@types/pg",
  "types": "index.d.ts"
}

//// [/a/lib/lib.d.ts]
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


/a/lib/tsc.js -b -w --verbose --traceResolution --explainFiles
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file '../outFile.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/projects/a/tsconfig.json'...

======== Resolving type reference directive 'pg', containing file '/src/projects/a/__inferred type names__.ts', root directory '/src/projects/a/node_modules/@types,/src/projects/node_modules/@types,/src/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/src/projects/a/node_modules/@types, /src/projects/node_modules/@types, /src/node_modules/@types, /node_modules/@types'.
Directory '/src/projects/a/node_modules/@types' does not exist, skipping all lookups in it.
Found 'package.json' at '/src/projects/node_modules/@types/pg/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/src/projects/node_modules/@types/pg/index.d.ts'.
File '/src/projects/node_modules/@types/pg/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/src/projects/node_modules/@types/pg/index.d.ts', result '/src/projects/node_modules/@types/pg/index.d.ts'.
======== Type reference directive 'pg' was successfully resolved to '/src/projects/node_modules/@types/pg/index.d.ts', primary: true. ========
../../../a/lib/lib.d.ts
  Default library for target 'es5'
src/index.ts
  Matched by default include pattern '**/*'
../node_modules/@types/pg/index.d.ts
  Entry point for implicit type library 'pg'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/src/projects/outFile.js]
"use strict";


//// [/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../a/lib/lib.d.ts","./a/src/index.ts","./node_modules/@types/pg/index.d.ts"],"fileInfos":["-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","5381-","-691057527-export function foo(): void;"],"root":[2],"options":{"outFile":"./outFile.js","strict":true},"version":"FakeTSVersion"}

//// [/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../a/lib/lib.d.ts",
    "./a/src/index.ts",
    "./node_modules/@types/pg/index.d.ts"
  ],
  "fileInfos": {
    "../../a/lib/lib.d.ts": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
    "./a/src/index.ts": "5381-",
    "./node_modules/@types/pg/index.d.ts": "-691057527-export function foo(): void;"
  },
  "root": [
    [
      2,
      "./a/src/index.ts"
    ]
  ],
  "options": {
    "outFile": "./outFile.js",
    "strict": true
  },
  "version": "FakeTSVersion",
  "size": 608
}


FsWatches::
/src/projects/a/src/index.ts: *new*
  {}
/src/projects/a/tsconfig.json: *new*
  {}
/src/projects/node_modules/@types/pg/package.json: *new*
  {}

FsWatchesRecursive::
/src/projects/a: *new*
  {}

Program root files: [
  "/src/projects/a/src/index.ts"
]
Program options: {
  "strict": true,
  "incremental": true,
  "outFile": "/src/projects/outFile.js",
  "watch": true,
  "explainFiles": true,
  "traceResolution": true,
  "tscBuild": true,
  "configFilePath": "/src/projects/a/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/projects/a/src/index.ts
/src/projects/node_modules/@types/pg/index.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/src/projects/a/src/index.ts
/src/projects/node_modules/@types/pg/index.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: update package

Input::
//// [/src/projects/node_modules/@types/pg/index.d.ts]
export function foo(): void;export function bar(): void;


Before running Timeout callback:: count: 0

After running Timeout callback:: count: 0


exitCode:: ExitStatus.undefined
