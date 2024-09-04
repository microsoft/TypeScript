currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/a.ts]
interface Document {
    fullscreen: boolean;
}

//// [/user/username/projects/myproject/b.d.ts]
interface Document {
    fullscreen: boolean;
}

//// [/user/username/projects/myproject/tsconfig.json]
{}

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
interface Document {
    readonly fullscreen: boolean;
}


/home/src/tslibs/TS/Lib/tsc.js -w
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[96m../../../../home/src/tslibs/TS/Lib/lib.d.ts[0m:[93m15[0m:[93m14[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m15[0m     readonly fullscreen: boolean;
[7m  [0m [91m             ~~~~~~~~~~[0m

[96ma.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[96mb.d.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.



//// [/user/username/projects/myproject/a.js]



PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/user/username/projects/myproject/b.d.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (used version)
/user/username/projects/myproject/b.d.ts (used version)

exitCode:: ExitStatus.undefined

Change:: Changing config to {
  "compilerOptions": {
    "skipLibCheck": true
  }
}

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "skipLibCheck": true
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

[96ma.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts"
]
Program options: {
  "skipLibCheck": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/b.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Changing config to {
  "compilerOptions": {
    "skipDefaultLibCheck": true
  }
}

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "skipDefaultLibCheck": true
  }
}


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[96mb.d.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts"
]
Program options: {
  "skipDefaultLibCheck": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/b.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Changing config to {
  "compilerOptions": {}
}

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {}
}


Timeout callback:: count: 1
3: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
3: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96m../../../../home/src/tslibs/TS/Lib/lib.d.ts[0m:[93m15[0m:[93m14[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m15[0m     readonly fullscreen: boolean;
[7m  [0m [91m             ~~~~~~~~~~[0m

[96ma.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[96mb.d.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Changing config to {
  "compilerOptions": {
    "skipDefaultLibCheck": true
  }
}

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "skipDefaultLibCheck": true
  }
}


Timeout callback:: count: 1
4: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
4: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[96mb.d.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 2 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts"
]
Program options: {
  "skipDefaultLibCheck": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Changing config to {
  "compilerOptions": {
    "skipLibCheck": true
  }
}

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}


Timeout callback:: count: 1
5: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
5: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 1 error. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts"
]
Program options: {
  "skipLibCheck": true,
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/b.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined

Change:: Changing config to {
  "compilerOptions": {}
}

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {}
}


Timeout callback:: count: 1
6: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
6: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
>> Screen clear
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[96m../../../../home/src/tslibs/TS/Lib/lib.d.ts[0m:[93m15[0m:[93m14[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m15[0m     readonly fullscreen: boolean;
[7m  [0m [91m             ~~~~~~~~~~[0m

[96ma.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[96mb.d.ts[0m:[93m2[0m:[93m5[0m - [91merror[0m[90m TS2687: [0mAll declarations of 'fullscreen' must have identical modifiers.

[7m2[0m     fullscreen: boolean;
[7m [0m [91m    ~~~~~~~~~~[0m

[[90mHH:MM:SS AM[0m] Found 3 errors. Watching for file changes.





Program root files: [
  "/user/username/projects/myproject/a.ts",
  "/user/username/projects/myproject/b.d.ts"
]
Program options: {
  "watch": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Completely
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.d.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/b.d.ts

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
