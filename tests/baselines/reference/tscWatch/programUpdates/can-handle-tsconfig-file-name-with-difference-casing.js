currentDirectory:: /user/username/workspace/solution useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/app.ts]
let x = 1

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "include": [
    "app.ts"
  ]
}

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


/home/src/tslibs/TS/Lib/tsc.js -w -p /user/username/workspace/solution/PROJECTS/PROJECT/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/PROJECTS/PROJECT/app.js]
var x = 1;



PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/PROJECTS/PROJECT/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/PROJECTS/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/PROJECTS/PROJECT/app.ts: *new*
  {}
/user/username/workspace/solution/PROJECTS/PROJECT/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/PROJECTS/PROJECT/app.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/workspace/solution/PROJECTS/PROJECT/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/PROJECTS/PROJECT/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/PROJECTS/PROJECT/app.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/PROJECTS/PROJECT/app.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/app.ts (used version)

exitCode:: ExitStatus.undefined
