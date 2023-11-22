currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/src/app.ts]
let x = 1;

//// [/a/tsconfig.json]
{
  "compilerOptions": {},
  "include": [
    "src/**/*",
    "notexistingfolder/*"
  ]
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


/a/lib/tsc.js -w -p /a/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[[90m12:00:18 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/src/app.js]
var x = 1;



PolledWatches::
/a/notexistingfolder: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/a/src/app.ts: *new*
  {}
/a/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/a/src: *new*
  {}

Program root files: [
  "/a/src/app.ts"
]
Program options: {
  "watch": true,
  "project": "/a/tsconfig.json",
  "configFilePath": "/a/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/src/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/src/app.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/src/app.ts (used version)

exitCode:: ExitStatus.undefined
