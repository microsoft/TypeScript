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

//// [/src/project/file1.ts]
export const x: 30 = "hello";

//// [/src/project/file2.ts]
export class D { }

//// [/src/project/tsconfig.json]
{
  "compilerOptions": {
    "outFile": "../outFile.js",
    "module": "amd",
    "noEmitOnError": true
  }
}



Output::
/lib/tsc --p /src/project -i
[96msrc/project/file1.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType '"hello"' is not assignable to type '30'.

[7m1[0m export const x: 30 = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/project/file1.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/project/file1.ts",
  "/src/project/file2.ts"
]
Program options: {
  "outFile": "/src/outFile.js",
  "module": 2,
  "noEmitOnError": true,
  "project": "/src/project",
  "incremental": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/file1.ts
/src/project/file2.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::




Change:: delete file without error
Input::
//// [/src/project/file2.ts] unlink


Output::
/lib/tsc --p /src/project -i
[96msrc/project/file1.ts[0m:[93m1[0m:[93m14[0m - [91merror[0m[90m TS2322: [0mType '"hello"' is not assignable to type '30'.

[7m1[0m export const x: 30 = "hello";
[7m [0m [91m             ~[0m


Found 1 error in src/project/file1.ts[90m:1[0m

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/project/file1.ts"
]
Program options: {
  "outFile": "/src/outFile.js",
  "module": 2,
  "noEmitOnError": true,
  "project": "/src/project",
  "incremental": true,
  "configFilePath": "/src/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/project/file1.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::


