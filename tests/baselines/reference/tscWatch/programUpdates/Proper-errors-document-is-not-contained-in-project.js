currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/app.ts]


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

//// [/a/b/tsconfig.json]
{


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[96ma/b/tsconfig.json[0m:[93m1[0m:[93m2[0m - [91merror[0m[90m TS1005: [0m'}' expected.

[7m1[0m {
[7m [0m [91m [0m

  [96ma/b/tsconfig.json[0m:[93m1[0m:[93m1[0m
    [7m1[0m {
    [7m [0m [96m~[0m
    The parser expected to find a '}' to match the '{' token here.

[[90m12:00:18 AM[0m] Found 1 error. Watching for file changes.



//// [/a/b/app.js]



FsWatches::
/a/b/app.ts: *new*
  {}
/a/b/tsconfig.json: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/a/b: *new*
  {}

Program root files: [
  "/a/b/app.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/app.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/app.ts (used version)

exitCode:: ExitStatus.undefined
