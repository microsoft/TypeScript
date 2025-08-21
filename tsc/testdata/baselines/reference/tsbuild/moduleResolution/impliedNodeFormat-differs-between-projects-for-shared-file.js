currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::
//// [/home/src/workspaces/project/a/src/index.ts] *new* 

//// [/home/src/workspaces/project/a/tsconfig.json] *new* 
{
    "compilerOptions": {
        "strict": true
    }
}
//// [/home/src/workspaces/project/b/package.json] *new* 
{
    "name": "b",
    "type": "module"
}
//// [/home/src/workspaces/project/b/src/index.ts] *new* 
import pg from "pg";
pg.foo();
//// [/home/src/workspaces/project/b/tsconfig.json] *new* 
{
    "compilerOptions": { 
        "strict": true,
        "module": "node16"
    },
}
//// [/home/src/workspaces/project/node_modules/@types/pg/index.d.ts] *new* 
export function foo(): void;
//// [/home/src/workspaces/project/node_modules/@types/pg/package.json] *new* 
{
    "name": "@types/pg",
    "types": "index.d.ts"
}

tsgo -b a b --verbose --traceResolution --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * a/tsconfig.json
    * b/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is out of date because output file 'a/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'a/tsconfig.json'...

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
../../tslibs/TS/Lib/lib.d.ts
   Default library for target 'ES5'
a/src/index.ts
   Matched by default include pattern '**/*'
node_modules/@types/pg/index.d.ts
   Entry point for implicit type library 'pg'
[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is out of date because output file 'b/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project 'b/tsconfig.json'...

======== Resolving module 'pg' from '/home/src/workspaces/project/b/src/index.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Resolving in ESM mode with conditions 'import', 'types', 'node'.
File '/home/src/workspaces/project/b/src/package.json' does not exist.
Found 'package.json' at '/home/src/workspaces/project/b/package.json'.
Loading module 'pg' from 'node_modules' folder, target file types: TypeScript, JavaScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/workspaces/project/b/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/b/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/b/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/workspaces/project/b/node_modules/@types' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/workspaces/project/node_modules/@types/pg/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
======== Module name 'pg' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'. ========
======== Resolving type reference directive 'pg', containing file '/home/src/workspaces/project/b/__inferred type names__.ts', root directory '/home/src/workspaces/project/b/node_modules/@types,/home/src/workspaces/project/node_modules/@types,/home/src/workspaces/node_modules/@types,/home/src/node_modules/@types,/home/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/home/src/workspaces/project/b/node_modules/@types, /home/src/workspaces/project/node_modules/@types, /home/src/workspaces/node_modules/@types, /home/src/node_modules/@types, /home/node_modules/@types, /node_modules/@types'.
Directory '/home/src/workspaces/project/b/node_modules/@types' does not exist, skipping all lookups in it.
Found 'package.json' at '/home/src/workspaces/project/node_modules/@types/pg/package.json'.
'package.json' does not have a 'typesVersions' field.
'package.json' does not have a 'typings' field.
'package.json' has 'types' field 'index.d.ts' that references '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
File '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts', result '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts'.
======== Type reference directive 'pg' was successfully resolved to '/home/src/workspaces/project/node_modules/@types/pg/index.d.ts', primary: true. ========
../../tslibs/TS/Lib/lib.es2022.full.d.ts
   Default library for target 'ES2022'
node_modules/@types/pg/index.d.ts
   Imported via "pg" from file 'b/src/index.ts'
   Entry point for implicit type library 'pg'
   File is CommonJS module because 'node_modules/@types/pg/package.json' does not have field "type"
b/src/index.ts
   Matched by default include pattern '**/*'
   File is ECMAScript module because 'b/package.json' has field "type" with value "module"
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
//// [/home/src/tslibs/TS/Lib/lib.es2022.full.d.ts] *Lib*
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
//// [/home/src/workspaces/project/a/src/index.js] *new* 

//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./src/index.ts"]}
//// [/home/src/workspaces/project/a/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": "./src/index.ts"
    }
  ],
  "size": 53
}
//// [/home/src/workspaces/project/b/src/index.js] *new* 
import pg from "pg";
pg.foo();

//// [/home/src/workspaces/project/b/tsconfig.tsbuildinfo] *new* 
{"version":"FakeTSVersion","root":["./src/index.ts"]}
//// [/home/src/workspaces/project/b/tsconfig.tsbuildinfo.readable.baseline.txt] *new* 
{
  "version": "FakeTSVersion",
  "root": [
    {
      "files": [
        "./src/index.ts"
      ],
      "original": "./src/index.ts"
    }
  ],
  "size": 53
}

a/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.d.ts
*refresh*    /home/src/workspaces/project/a/src/index.ts
*refresh*    /home/src/workspaces/project/node_modules/@types/pg/index.d.ts
Signatures::

b/tsconfig.json::
SemanticDiagnostics::
*refresh*    /home/src/tslibs/TS/Lib/lib.es2022.full.d.ts
*refresh*    /home/src/workspaces/project/node_modules/@types/pg/index.d.ts
*refresh*    /home/src/workspaces/project/b/src/index.ts
Signatures::


Edit [0]:: no change

tsgo -b a b --verbose --traceResolution --explainFiles
ExitStatus:: Success
Output::
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * a/tsconfig.json
    * b/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'a/tsconfig.json' is up to date because newest input 'a/src/index.ts' is older than output 'a/src/index.js'

[[90mHH:MM:SS AM[0m] Project 'b/tsconfig.json' is up to date because newest input 'b/src/index.ts' is older than output 'b/src/index.js'


