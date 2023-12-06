currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/app.ts]
let x = 10

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

//// [/a/b/tsconfig.json]

{
    // comment
    // More comment
    "compilerOptions": {
        "inlineSourceMap": true,
        "mapRoot": "./"
    }
}


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[96ma/b/tsconfig.json[0m:[93m6[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'mapRoot' cannot be specified with option 'inlineSourceMap'.

[7m6[0m         "inlineSourceMap": true,
[7m [0m [91m        ~~~~~~~~~~~~~~~~~[0m

[96ma/b/tsconfig.json[0m:[93m7[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'mapRoot' cannot be specified with option 'inlineSourceMap'.

[7m7[0m         "mapRoot": "./"
[7m [0m [91m        ~~~~~~~~~[0m

[96ma/b/tsconfig.json[0m:[93m7[0m:[93m9[0m - [91merror[0m[90m TS5069: [0mOption 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.

[7m7[0m         "mapRoot": "./"
[7m [0m [91m        ~~~~~~~~~[0m

[[90m12:00:18 AM[0m] Found 3 errors. Watching for file changes.



//// [/a/b/app.js]
var x = 10;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSJ9


FsWatches::
/a/b/app.ts: *new*
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
  "inlineSourceMap": true,
  "mapRoot": "./",
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

No cached semantic diagnostics in the builder::

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Remove the comment from config file

Input::
//// [/a/b/tsconfig.json]

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

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:22 AM[0m] File change detected. Starting incremental compilation...

[96ma/b/tsconfig.json[0m:[93m4[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'mapRoot' cannot be specified with option 'inlineSourceMap'.

[7m4[0m         "inlineSourceMap": true,
[7m [0m [91m        ~~~~~~~~~~~~~~~~~[0m

[96ma/b/tsconfig.json[0m:[93m5[0m:[93m9[0m - [91merror[0m[90m TS5053: [0mOption 'mapRoot' cannot be specified with option 'inlineSourceMap'.

[7m5[0m         "mapRoot": "./"
[7m [0m [91m        ~~~~~~~~~[0m

[96ma/b/tsconfig.json[0m:[93m5[0m:[93m9[0m - [91merror[0m[90m TS5069: [0mOption 'mapRoot' cannot be specified without specifying option 'sourceMap' or option 'declarationMap'.

[7m5[0m         "mapRoot": "./"
[7m [0m [91m        ~~~~~~~~~[0m

[[90m12:00:23 AM[0m] Found 3 errors. Watching for file changes.





Program root files: [
  "/a/b/app.ts"
]
Program options: {
  "inlineSourceMap": true,
  "mapRoot": "./",
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
