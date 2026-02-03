currentDirectory:: /user/username/workspace/solution/projects/projectc useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/app.ts]
let x = 1

//// [/user/username/workspace/solution/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "types": [
      "node"
    ],
    "typeRoots": []
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

[91merror[0m[90m TS2688: [0mCannot find type definition file for 'node'.
  The file is in the program because:
    Entry point of type library 'node' specified in compilerOptions

  [96m../project/tsconfig.json[0m:[93m4[0m:[93m7[0m
    [7m4[0m       "node"
    [7m [0m [96m      ~~~~~~[0m
    File is entry point of type library specified here.

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/app.js]
var x = 1;



FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/workspace/solution/projects/project/app.ts: *new*
  {}
/user/username/workspace/solution/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/solution/projects/project: *new*
  {}

Program root files: [
  "/user/username/workspace/solution/projects/project/app.ts"
]
Program options: {
  "types": [
    "node"
  ],
  "typeRoots": [],
  "watch": true,
  "project": "/user/username/workspace/solution/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/app.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/workspace/solution/projects/project/app.ts (used version)

exitCode:: ExitStatus.undefined
