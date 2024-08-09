currentDirectory:: /user/username/workspace useCaseSensitiveFileNames: false
Input::
//// [/user/username/workspace/projects/project/app.ts]
let x = 1

//// [/user/username/workspace/projects/project/tsconfig.json]
{
  "include": [
    "app.ts"
  ]
}

//// [/home/src/tslibs/ts/lib/lib.d.ts]
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


/home/src/tslibs/ts/lib/tsc.js -w -p /user/username/workspace/PROJECTS/PROJECT/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/PROJECTS/PROJECT/app.js]
var x = 1;



PolledWatches::
/user/username/workspace/PROJECTS/PROJECT/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/PROJECTS/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/ts/lib/lib.d.ts: *new*
  {}
/user/username/workspace/PROJECTS/PROJECT/app.ts: *new*
  {}
/user/username/workspace/PROJECTS/PROJECT/tsconfig.json: *new*
  {}

Program root files: [
  "/user/username/workspace/PROJECTS/PROJECT/app.ts"
]
Program options: {
  "watch": true,
  "project": "/user/username/workspace/PROJECTS/PROJECT/tsconfig.json",
  "configFilePath": "/user/username/workspace/PROJECTS/PROJECT/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/ts/lib/lib.d.ts
/user/username/workspace/PROJECTS/PROJECT/app.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts
/user/username/workspace/PROJECTS/PROJECT/app.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/projects/project/app.ts (used version)

exitCode:: ExitStatus.undefined
