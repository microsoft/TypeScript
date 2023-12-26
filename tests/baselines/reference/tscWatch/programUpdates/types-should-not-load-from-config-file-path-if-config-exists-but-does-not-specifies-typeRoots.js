currentDirectory:: /a/c useCaseSensitiveFileNames: false
Input::
//// [/a/b/app.ts]
let x = 1

//// [/a/b/tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "node"
    ],
    "typeRoots": []
  }
}

//// [/a/b/node_modules/@types/node/index.d.ts]
declare var process: any

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


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

[91merror[0m[90m TS2688: [0mCannot find type definition file for 'node'.
  The file is in the program because:
    Entry point of type library 'node' specified in compilerOptions

  [96m../b/tsconfig.json[0m:[93m4[0m:[93m7[0m
    [7m4[0m       "node"
    [7m [0m [96m      ~~~~~~[0m
    File is entry point of type library specified here.

[[90m12:00:28 AM[0m] Found 1 error. Watching for file changes.



//// [/a/b/app.js]
var x = 1;



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
  "types": [
    "node"
  ],
  "typeRoots": [],
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/app.ts (used version)

exitCode:: ExitStatus.undefined
