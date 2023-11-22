currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/compile]
let x = 1

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


/a/lib/tsc.js --w /a/compile
Output::
>> Screen clear
[[90m12:00:11 AM[0m] Starting compilation in watch mode...

[[90m12:00:14 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/compile.js]
var x = 1;



FsWatches::
/a/compile: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

Program root files: [
  "/a/compile"
]
Program options: {
  "allowNonTsExtensions": true
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/compile

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/compile

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/compile (used version)

exitCode:: ExitStatus.undefined
