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

//// [/src/a.ts]
const err: number = "error";
const a: number = "hello"

//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "noCheck": true,
    "emitDeclarationOnly": true,
    "declaration": true
  }
}



Output::
/lib/tsc --b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output file 'src/a.d.ts' does not exist

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts"
]
Program options: {
  "noCheck": true,
  "emitDeclarationOnly": true,
  "declaration": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)


//// [/src/a.d.ts]
declare const err: number;
declare const a: number;




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/a.d.ts'

exitCode:: ExitStatus.Success




Change:: Fix `a` error
Input::
//// [/src/a.ts]
const err: number = "error";
const a = "hello"



Output::
/lib/tsc --b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/a.d.ts' is older than input 'src/a.ts'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

exitCode:: ExitStatus.Success
Program root files: [
  "/src/a.ts"
]
Program options: {
  "noCheck": true,
  "emitDeclarationOnly": true,
  "declaration": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (computed .d.ts during emit)


//// [/src/a.d.ts]
declare const err: number;
declare const a = "hello";




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is up to date because newest input 'src/a.ts' is older than output 'src/a.d.ts'

exitCode:: ExitStatus.Success




Change:: Disable noCheck
Input::
//// [/src/tsconfig.json]
{
  "compilerOptions": {
    "emitDeclarationOnly": true,
    "declaration": true
  }
}



Output::
/lib/tsc --b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/a.d.ts' is older than input 'src/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const err: number = "error";
[7m [0m [91m      ~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts"
]
Program options: {
  "emitDeclarationOnly": true,
  "declaration": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (used version)




Change:: no-change-run
Input::


Output::
/lib/tsc --b /src/tsconfig.json -v
[[90mHH:MM:SS AM[0m] Projects in this build: 
    * src/tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'src/tsconfig.json' is out of date because output 'src/a.d.ts' is older than input 'src/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/src/tsconfig.json'...

[96msrc/a.ts[0m:[93m1[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'string' is not assignable to type 'number'.

[7m1[0m const err: number = "error";
[7m [0m [91m      ~~~[0m


Found 1 error.

exitCode:: ExitStatus.DiagnosticsPresent_OutputsSkipped
Program root files: [
  "/src/a.ts"
]
Program options: {
  "emitDeclarationOnly": true,
  "declaration": true,
  "configFilePath": "/src/tsconfig.json"
}
Program structureReused: Not
Program files::
/lib/lib.d.ts
/src/a.ts

Semantic diagnostics in builder refreshed for::
/lib/lib.d.ts
/src/a.ts

Shape signatures in builder refreshed for::
/lib/lib.d.ts (used version)
/src/a.ts (used version)


