currentDirectory:: /a useCaseSensitiveFileNames: false
Input::
//// [/a/app.ts]
let x = 1

//// [/a/tsconfig.json]
{
  "compiler": {},
  "files": []
}

//// [/a/node_modules/@types/typings/index.d.ts]
export * from "./lib"

//// [/a/node_modules/@types/typings/lib.d.ts]
export const x: number

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
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m3[0m:[93m12[0m - [91merror[0m[90m TS18002: [0mThe 'files' list in config file '/a/tsconfig.json' is empty.

[7m3[0m   "files": []
[7m [0m [91m           ~~[0m

[[90m12:00:24 AM[0m] Found 1 error. Watching for file changes.




FsWatches::
/a/tsconfig.json: *new*
  {}

Program root files: []
Program options: {
  "watch": true,
  "project": "/a/tsconfig.json",
  "configFilePath": "/a/tsconfig.json"
}
Program structureReused: Not
Program files::

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
