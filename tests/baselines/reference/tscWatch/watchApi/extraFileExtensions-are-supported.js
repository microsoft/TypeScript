currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/user/username/projects/myproject/tsconfig.json]
{}

//// [/user/username/projects/myproject/main.ts]
const x = 10;

//// [/user/username/projects/myproject/other.vue]


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
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/main.js]
var x = 10;


//// [/user/username/projects/myproject/other.vue.js]



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
/user/username/projects/myproject/other.vue: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.vue"
]
Program options: {
  "allowNonTsExtensions": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.vue

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.vue

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/main.ts (used version)
/user/username/projects/myproject/other.vue (used version)

exitCode:: ExitStatus.undefined

Change:: Write a file

Input::
//// [/user/username/projects/myproject/other2.vue]



Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:31 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/other2.vue.js]



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/main.ts:
  {}
/user/username/projects/myproject/other.vue:
  {}
/user/username/projects/myproject/other2.vue: *new*
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}


Program root files: [
  "/user/username/projects/myproject/main.ts",
  "/user/username/projects/myproject/other.vue",
  "/user/username/projects/myproject/other2.vue"
]
Program options: {
  "allowNonTsExtensions": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/main.ts
/user/username/projects/myproject/other.vue
/user/username/projects/myproject/other2.vue

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/other2.vue

Shape signatures in builder refreshed for::
/user/username/projects/myproject/other2.vue (used version)

exitCode:: ExitStatus.undefined
