currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/main.ts]
const x = 10;

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


/a/lib/tsc.js --w --p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js]
var x = 10;



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/main.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts"
]
Program options: {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Write a file

Input::
//// [/user/username/projects/myproject/bar.ts]
const y =10;


Output::
[[90m12:00:32 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js] file written with same contents
//// [/user/username/projects/myproject/bar.js]
var y = 10;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/bar.ts: *new*
  {}
/user/username/projects/myproject/main.ts:
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

Program root files: [
  "/user/username/projects/myproject/bar.ts",
  "/user/username/projects/myproject/main.ts"
]
Program options: {
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/bar.ts
/user/username/projects/myproject/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/bar.ts
/user/username/projects/myproject/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/bar.ts (computed .d.ts)
/user/username/projects/myproject/main.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
