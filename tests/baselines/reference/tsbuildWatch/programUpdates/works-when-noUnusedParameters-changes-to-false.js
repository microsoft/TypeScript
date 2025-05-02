currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/index.ts]
const fn = (a: string, b: string) => b;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "noUnusedParameters": true
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


/home/src/tslibs/TS/Lib/tsc.js -b -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96mindex.ts[0m:[93m1[0m:[93m13[0m - [91merror[0m[90m TS6133: [0m'a' is declared but its value is never read.

[7m1[0m const fn = (a: string, b: string) => b;
[7m [0m [91m            ~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/user/username/projects/myproject/index.js]
var fn = function (a, b) { return b; };


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"root":["./index.ts"],"errors":true,"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts"
  ],
  "errors": true,
  "version": "FakeTSVersion",
  "size": 63
}


FsWatches::
/user/username/projects/myproject/index.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/index.ts"
]
Program options: {
  "noUnusedParameters": true,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/index.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/index.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change tsconfig to set noUnusedParameters to false

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "noUnusedParameters": false
  }
}


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/index.js] file changed its modified time
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"root":["./index.ts"],"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "./index.ts"
  ],
  "version": "FakeTSVersion",
  "size": 49
}



Program root files: [
  "/user/username/projects/myproject/index.ts"
]
Program options: {
  "noUnusedParameters": false,
  "watch": true,
  "tscBuild": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/index.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/index.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
