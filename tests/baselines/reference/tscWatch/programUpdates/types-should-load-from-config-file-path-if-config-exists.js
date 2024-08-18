currentDirectory:: /a/c useCaseSensitiveFileNames: false
Input::
//// [/a/b/app.ts]
let x = 1

//// [/a/b/tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "node"
    ]
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
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/app.js]
var x = 1;



PolledWatches::
/a/b/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
/a/b/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/a/b/node_modules/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/a/b/app.ts: *new*
  {}
/a/b/node_modules/@types/node/index.d.ts: *new*
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
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/app.ts
/a/b/node_modules/@types/node/index.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/app.ts
/a/b/node_modules/@types/node/index.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/app.ts (used version)
/a/b/node_modules/@types/node/index.d.ts (used version)

exitCode:: ExitStatus.undefined
