currentDirectory:: /home/src/projects/project useCaseSensitiveFileNames:: false
Input::
//// [/home/src/tslibs/TS/Lib/lib.es5.d.ts]
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
declare const eval: any

//// [/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts]
declare class Promise<T> {}

//// [/home/src/projects/project/app.ts]
var x: Promise<string>;

//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": true,
    "sourceMap": false,
    "lib": [
      "es5"
    ]
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

[96mapp.ts[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m TS2583: [0mCannot find name 'Promise'. Do you need to change your target library? Try changing the 'lib' compiler option to 'es2015' or later.

[7m1[0m var x: Promise<string>;
[7m [0m [91m       ~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.



//// [/home/src/projects/project/app.js]
var x;



PolledWatches::
/home/src/projects/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/node_modules/@types: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules: *new*
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/app.ts: *new*
  {}
/home/src/projects/project/tsconfig.json: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts: *new*
  {}

FsWatchesRecursive::
/home/src/projects/project: *new*
  {}

Program root files: [
  "/home/src/projects/project/app.ts"
]
Program options: {
  "module": 1,
  "target": 1,
  "noImplicitAny": true,
  "sourceMap": false,
  "lib": [
    "lib.es5.d.ts"
  ],
  "watch": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/projects/project/app.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/projects/project/app.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es5.d.ts (used version)
/home/src/projects/project/app.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Change the lib in config

Input::
//// [/home/src/projects/project/tsconfig.json]
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "noImplicitAny": true,
    "sourceMap": false,
    "lib": [
      "es5",
      "es2015.promise"
    ]
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

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/project/app.js] file written with same contents

PolledWatches::
/home/src/projects/node_modules:
  {"pollingInterval":500}
/home/src/projects/node_modules/@types:
  {"pollingInterval":500}
/home/src/projects/project/node_modules:
  {"pollingInterval":500}
/home/src/projects/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/projects/project/app.ts:
  {}
/home/src/projects/project/tsconfig.json:
  {}
/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts: *new*
  {}
/home/src/tslibs/TS/Lib/lib.es5.d.ts:
  {}

FsWatchesRecursive::
/home/src/projects/project:
  {}


Program root files: [
  "/home/src/projects/project/app.ts"
]
Program options: {
  "module": 1,
  "target": 1,
  "noImplicitAny": true,
  "sourceMap": false,
  "lib": [
    "lib.es5.d.ts",
    "lib.es2015.promise.d.ts"
  ],
  "watch": true,
  "configFilePath": "/home/src/projects/project/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts
/home/src/projects/project/app.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.es5.d.ts
/home/src/tslibs/TS/Lib/lib.es2015.promise.d.ts
/home/src/projects/project/app.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.es2015.promise.d.ts (used version)
/home/src/projects/project/app.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
