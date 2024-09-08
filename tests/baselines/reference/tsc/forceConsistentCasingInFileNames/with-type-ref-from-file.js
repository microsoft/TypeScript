currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/src/fileOne.d.ts]
declare class c { }

//// [/user/username/projects/myproject/src/file2.d.ts]
/// <reference types="./fileOne.d.ts"/>
declare const y: c;


//// [/user/username/projects/myproject/tsconfig.json]
{ }

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


/home/src/tslibs/TS/Lib/tsc.js -p /user/username/projects/myproject --explainFiles --traceResolution
Output::
======== Resolving type reference directive './fileOne.d.ts', containing file '/user/username/projects/myproject/src/file2.d.ts', root directory '/user/username/projects/myproject/node_modules/@types,/user/username/projects/node_modules/@types,/user/username/node_modules/@types,/user/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/user/username/projects/myproject/node_modules/@types, /user/username/projects/node_modules/@types, /user/username/node_modules/@types, /user/node_modules/@types, /node_modules/@types'.
Directory '/user/username/projects/myproject/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/projects/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/username/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/user/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/user/username/projects/myproject/src'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/src/fileOne.d.ts', target file types: Declaration.
File name '/user/username/projects/myproject/src/fileOne.d.ts' has a '.d.ts' extension - stripping it.
File '/user/username/projects/myproject/src/fileOne.d.ts' exists - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/src/fileOne.d.ts', result '/user/username/projects/myproject/src/fileOne.d.ts'.
======== Type reference directive './fileOne.d.ts' was successfully resolved to '/user/username/projects/myproject/src/fileOne.d.ts', primary: false. ========
../../../../home/src/tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
src/fileOne.d.ts
  Type library referenced via './fileOne.d.ts' from file 'src/file2.d.ts'
  Matched by default include pattern '**/*'
src/file2.d.ts
  Matched by default include pattern '**/*'



exitCode:: ExitStatus.Success
