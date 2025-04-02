currentDirectory:: /user/username/workspace/solution/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/user/username/workspace/solution/projects/project/app.ts]
let x = 10

//// [/user/username/workspace/solution/projects/project/tsconfig.json]

{
    // comment
    // More comment
    "compilerOptions": {
        "inlineSourceMap": true,
        "mapRoot": "./"
    }
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


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mtsconfig.json[0m:[93m6[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'mapRoot' cannot be specified with option 'inlineSourceMap'.

[7m6[0m         "inlineSourceMap": true,
[7m [0m [91m        ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m7[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'mapRoot' cannot be specified with option 'inlineSourceMap'.

[7m7[0m         "mapRoot": "./"
[7m [0m [91m        ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m7[0m:[93m9[0m - [91merror[0m[90m TS5069: [0mOption 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.

[7m7[0m         "mapRoot": "./"
[7m [0m [91m        ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.



//// [/user/username/workspace/solution/projects/project/app.js]
var x = 10;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSJ9


PolledWatches::
/user/username/workspace/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/workspace/solution/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

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
  "inlineSourceMap": true,
  "mapRoot": "./",
  "watch": true,
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

Change:: Remove the comment from config file

Input::
//// [/user/username/workspace/solution/projects/project/tsconfig.json]

{
    "compilerOptions": {
        "inlineSourceMap": true,
        "mapRoot": "./"
    }
}


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m4[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'mapRoot' cannot be specified with option 'inlineSourceMap'.

[7m4[0m         "inlineSourceMap": true,
[7m [0m [91m        ~~~~~~~~~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'mapRoot' cannot be specified with option 'inlineSourceMap'.

[7m5[0m         "mapRoot": "./"
[7m [0m [91m        ~~~~~~~~~[0m

[96mtsconfig.json[0m:[93m5[0m:[93m9[0m - [91merror[0m[90m TS5069: [0mOption 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.

[7m5[0m         "mapRoot": "./"
[7m [0m [91m        ~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.





Program root files: [
  "/user/username/workspace/solution/projects/project/app.ts"
]
Program options: {
  "inlineSourceMap": true,
  "mapRoot": "./",
  "watch": true,
  "configFilePath": "/user/username/workspace/solution/projects/project/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/workspace/solution/projects/project/app.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
