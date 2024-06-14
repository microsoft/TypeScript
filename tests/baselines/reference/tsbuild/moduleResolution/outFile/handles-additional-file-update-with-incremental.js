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



Output::
/lib/tsc -b /src/projects/a --verbose --traceResolution --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/projects/a/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/projects/a/tsconfig.json' is out of date because output file 'src/projects/outFile.tsbuildinfo' does not exist

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
lib/lib.d.ts
  Default library for target 'es5'
src/projects/a/src/index.ts
  Matched by default include pattern '**/*'
src/projects/node_modules/@types/pg/index.d.ts
  Entry point for implicit type library 'pg'
exitCode:: ExitStatus.Success


//// [/src/projects/outFile.js]
"use strict";


//// [/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../lib/lib.d.ts","./a/src/index.ts","./node_modules/@types/pg/index.d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5381-","-691057527-export function foo(): void;"],"root":[2],"options":{"outFile":"./outFile.js","strict":true},"version":"FakeTSVersion"}

//// [/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../lib/lib.d.ts",
    "./a/src/index.ts",
    "./node_modules/@types/pg/index.d.ts"
  ],
  "fileInfos": {
    "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
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
  "size": 686
}



Change:: no-change-run
Input::


Output::
/lib/tsc -b /src/projects/a --verbose --traceResolution --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/projects/a/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/projects/a/tsconfig.json' is up to date because newest input 'src/projects/a/src/index.ts' is older than output 'src/projects/outFile.tsbuildinfo'

exitCode:: ExitStatus.Success




Change:: update package
Input::
//// [/src/projects/node_modules/@types/pg/index.d.ts]
export function foo(): void; export function bar(): void;



Output::
/lib/tsc -b /src/projects/a --verbose --traceResolution --explainFiles
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/projects/a/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/projects/a/tsconfig.json' is out of date because output 'src/projects/outFile.tsbuildinfo' is older than input 'src/projects/node_modules/@types/pg/index.d.ts'

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
lib/lib.d.ts
  Default library for target 'es5'
src/projects/a/src/index.ts
  Matched by default include pattern '**/*'
src/projects/node_modules/@types/pg/index.d.ts
  Entry point for implicit type library 'pg'
exitCode:: ExitStatus.Success


//// [/src/projects/outFile.js] file written with same contents
//// [/src/projects/outFile.tsbuildinfo]
{"fileNames":["../../lib/lib.d.ts","./a/src/index.ts","./node_modules/@types/pg/index.d.ts"],"fileInfos":["3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","5381-","-10634348642-export function foo(): void; export function bar(): void;"],"root":[2],"options":{"outFile":"./outFile.js","strict":true},"version":"FakeTSVersion"}

//// [/src/projects/outFile.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../lib/lib.d.ts",
    "./a/src/index.ts",
    "./node_modules/@types/pg/index.d.ts"
  ],
  "fileInfos": {
    "../../lib/lib.d.ts": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
    "./a/src/index.ts": "5381-",
    "./node_modules/@types/pg/index.d.ts": "-10634348642-export function foo(): void; export function bar(): void;"
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
  "size": 717
}

