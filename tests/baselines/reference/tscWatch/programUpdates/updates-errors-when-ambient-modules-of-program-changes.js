Input::
//// [/user/username/projects/myproject/a.ts]
declare module 'a' {
  type foo = number;
}

//// [/user/username/projects/myproject/tsconfig.json]
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


/a/lib/tsc.js -w
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

[[90m12:00:24 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (used version)

PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json: *new*
  {}
/user/username/projects/myproject/a.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/a.js]



Change:: Create b.ts with same content

Input::
//// [/user/username/projects/myproject/b.ts]
declare module 'a' {
  type foo = number;
}


Output::
>> Screen clear
[[90m12:00:27 AM[0m] File change detected. Starting incremental compilation...

[96ma.ts[0m:[93m2[0m:[93m8[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier 'foo'.

[7m2[0m   type foo = number;
[7m [0m [91m       ~~~[0m

  [96mb.ts[0m:[93m2[0m:[93m8[0m
    [7m2[0m   type foo = number;
    [7m [0m [96m       ~~~[0m
    'foo' was also declared here.

[96mb.ts[0m:[93m2[0m:[93m8[0m - [91merror[0m[90m TS2300: [0mDuplicate identifier 'foo'.

[7m2[0m   type foo = number;
[7m [0m [91m       ~~~[0m

  [96ma.ts[0m:[93m2[0m:[93m8[0m
    [7m2[0m   type foo = number;
    [7m [0m [96m       ~~~[0m
    'foo' was also declared here.

[[90m12:00:33 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts","/user/username/projects/myproject/b.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (computed .d.ts)
/user/username/projects/myproject/b.ts (computed .d.ts)

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/a.ts:
  {}
/a/lib/lib.d.ts:
  {}
/user/username/projects/myproject/b.ts: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/a.js] file written with same contents
//// [/user/username/projects/myproject/b.js]



Change:: Delete b.ts

Input::
//// [/user/username/projects/myproject/b.ts] deleted

Output::
>> Screen clear
[[90m12:00:35 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:39 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.ts (computed .d.ts)

PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/user/username/projects/myproject/tsconfig.json:
  {}
/user/username/projects/myproject/a.ts:
  {}
/a/lib/lib.d.ts:
  {}

FsWatches *deleted*::
/user/username/projects/myproject/b.ts:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/a.js] file written with same contents
