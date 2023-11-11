currentDirectory:: / useCaseSensitiveFileNames: false
Input::
//// [/a/b/app.ts]
let x = 10

//// [/a/b/tsconfig.json]
{}

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


/a/lib/tsc.js -w -p /a/b/tsconfig.json
Output::
>> Screen clear
[[90m12:00:15 AM[0m] Starting compilation in watch mode...

[[90m12:00:18 AM[0m] Found 0 errors. Watching for file changes.



//// [/a/b/app.js]
var x = 10;



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
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/app.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: change config file to add error

Input::
//// [/a/b/tsconfig.json]
{
                        "compilerOptions": {
                            "haha": 123
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

[96ma/b/tsconfig.json[0m:[93m3[0m:[93m29[0m - [91merror[0m[90m TS5023: [0mUnknown compiler option 'haha'.

[7m3[0m                             "haha": 123
[7m [0m [91m                            ~~~~~~[0m

[[90m12:00:23 AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/a/b/app.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: change config file to remove error

Input::
//// [/a/b/tsconfig.json]
{
                        "compilerOptions": {
                        }
                    }


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90m12:00:27 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:28 AM[0m] Found 0 errors. Watching for file changes.





Program root files: [
  "/a/b/app.ts"
]
Program options: {
  "watch": true,
  "project": "/a/b/tsconfig.json",
  "configFilePath": "/a/b/tsconfig.json"
}
Program structureReused: Completely
Program files::
/a/lib/lib.d.ts
/a/b/app.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
