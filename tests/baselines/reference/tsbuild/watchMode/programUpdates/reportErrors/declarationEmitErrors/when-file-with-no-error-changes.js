Input::
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

//// [/user/username/projects/solution/app/fileWithError.ts]
export var myClassWithError = class {
        tags() { }
        private p = 12
    };

//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass { }

//// [/user/username/projects/solution/app/tsconfig.json]
{"compilerOptions":{"composite":true}}


/a/lib/tsc.js -b -w app
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...


[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m


[[90m12:00:26 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/solution/app/fileWithError.ts","/user/username/projects/solution/app/fileWithoutError.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/solution/app/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

WatchedFiles::
/user/username/projects/solution/app/tsconfig.json:
  {"fileName":"/user/username/projects/solution/app/tsconfig.json","pollingInterval":250}
/user/username/projects/solution/app/filewitherror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithError.ts","pollingInterval":250}
/user/username/projects/solution/app/filewithouterror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithoutError.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/solution/app:
  {"directoryName":"/user/username/projects/solution/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Change fileWithoutError

Input::
//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass2 { }


Output::
>> Screen clear
[[90m12:00:30 AM[0m] File change detected. Starting incremental compilation...


[96mapp/fileWithError.ts[0m:[93m1[0m:[93m12[0m - [91merror[0m[90m TS4094: [0mProperty 'p' of exported class expression may not be private or protected.

[7m1[0m export var myClassWithError = class {
[7m [0m [91m           ~~~~~~~~~~~~~~~~[0m


[[90m12:00:31 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/solution/app/fileWithError.ts","/user/username/projects/solution/app/fileWithoutError.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/solution/app/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/solution/app/fileWithError.ts
/user/username/projects/solution/app/fileWithoutError.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/solution/app/fileWithoutError.ts

WatchedFiles::
/user/username/projects/solution/app/tsconfig.json:
  {"fileName":"/user/username/projects/solution/app/tsconfig.json","pollingInterval":250}
/user/username/projects/solution/app/filewitherror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithError.ts","pollingInterval":250}
/user/username/projects/solution/app/filewithouterror.ts:
  {"fileName":"/user/username/projects/solution/app/fileWithoutError.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/solution/app:
  {"directoryName":"/user/username/projects/solution/app","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

