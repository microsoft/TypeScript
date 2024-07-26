currentDirectory:: /user/username/workspace/projects/project useCaseSensitiveFileNames: false
Input::
//// [/user/username/workspace/projects/project/app.ts]
let x = 1

//// [/user/username/workspace/projects/project/tsconfig.json]
{
  "compiler": {},
  "files": []
}

//// [/user/username/workspace/projects/project/node_modules/@types/typings/index.d.ts]
export * from "./lib"

//// [/user/username/workspace/projects/project/node_modules/@types/typings/lib.d.ts]
export const x: number

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


/home/src/tslibs/ts/lib/tsc.js -w -p /user/username/workspace/projects/project/tsconfig.json
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m3[0m:[93m12[0m - [91merror[0m[90m TS18002: [0mThe 'files' list in config file '/user/username/workspace/projects/project/tsconfig.json' is empty.

[7m3[0m   "files": []
[7m [0m [91m           ~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.




PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/workspace/projects/project/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/workspace/projects/project/node_modules/@types: *new*
  {}

Program root files: []
Program options: {
  "watch": true,
  "project": "/user/username/workspace/projects/project/tsconfig.json",
  "configFilePath": "/user/username/workspace/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
