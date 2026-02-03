currentDirectory:: /user/username/workspace/solution/projects/projectc useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/app.ts]
let x = 1

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "node"
    ]
  }
}

//// [/user/username/workspace/solution/projects/project/node_modules/@types/node/index.d.ts]
declare var process: any

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


/home/src/tslibs/TS/Lib/tsc.js -w -p /user/username/workspace/solution/projects/project/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/app.js]
var x = 1;



PolledWatches::
/user/username/workspace/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/project/node_modules/@types/node/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/project/node_modules/@types/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/project/node_modules/package.json: *new*
  {"pollingInterval":2000}
/user/username/workspace/solution/projects/project/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/app.ts: *new*
  {}
/user/username/workspace/solution/projects/project/node_modules/@types/node/index.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project: *new*
  {}
/user/username/workspace/solution/projects/project/node_modules: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/app.ts"
]
Program options: {
  "types": [
    "node"
  ],
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/app.ts
/user/username/workspace/solution/projects/project/node_modules/@types/node/index.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/app.ts
/user/username/workspace/solution/projects/project/node_modules/@types/node/index.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/app.ts (used version)
/user/username/workspace/solution/projects/project/node_modules/@types/node/index.d.ts (used version)

exitCode:: ExitStatus.undefined
