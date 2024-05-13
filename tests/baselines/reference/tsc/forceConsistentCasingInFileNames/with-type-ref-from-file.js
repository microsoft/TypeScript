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

//// [/src/project/src/file2.d.ts]
/// <reference types="./fileOne.d.ts"/>
declare const y: c;


//// [/src/project/src/fileOne.d.ts]
declare class c { }

//// [/src/project/src/tsconfig.json]
{ }



Output::
/lib/tsc -p /src/project/src --explainFiles --traceResolution
File '/src/project/src/package.json' does not exist.
File '/src/project/package.json' does not exist.
File '/src/package.json' does not exist.
File '/package.json' does not exist.
======== Resolving type reference directive './fileone.d.ts', containing file '/src/project/src/file2.d.ts', root directory '/src/project/src/node_modules/@types,/src/project/node_modules/@types,/src/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/src/project/src/node_modules/@types, /src/project/node_modules/@types, /src/node_modules/@types, /node_modules/@types'.
Directory '/src/project/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/src/project/src'.
Loading module as file / folder, candidate module location '/src/project/src/fileone.d.ts', target file types: Declaration.
File name '/src/project/src/fileone.d.ts' has a '.d.ts' extension - stripping it.
File '/src/project/src/fileone.d.ts' exists - use it as a name resolution result.
Resolving real path for '/src/project/src/fileone.d.ts', result '/src/project/src/fileOne.d.ts'.
======== Type reference directive './fileone.d.ts' was successfully resolved to '/src/project/src/fileone.d.ts', primary: false. ========
File '/src/project/src/package.json' does not exist according to earlier cached lookups.
File '/src/project/package.json' does not exist according to earlier cached lookups.
File '/src/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
File '/lib/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/project/src/file2.d.ts[0m:[93m1[0m:[93m23[0m - [91merror[0m[90m TS1261: [0mAlready included file name '/src/project/src/fileone.d.ts' differs from file name '/src/project/src/fileOne.d.ts' only in casing.
  The file is in the program because:
    Type library referenced via './fileOne.d.ts' from file '/src/project/src/file2.d.ts'
    Matched by default include pattern '**/*'

[7m1[0m /// <reference types="./fileOne.d.ts"/>
[7m [0m [91m                      ~~~~~~~~~~~~~~[0m

lib/lib.d.ts
  Default library for target 'es5'
src/project/src/fileone.d.ts
  Type library referenced via './fileOne.d.ts' from file 'src/project/src/file2.d.ts'
  Matched by default include pattern '**/*'
src/project/src/file2.d.ts
  Matched by default include pattern '**/*'

Found 1 error in src/project/src/file2.d.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsGenerated


