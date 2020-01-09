/a/lib/tsc.js -b -w app
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


Output::
>> Screen clear
12:00:25 AM - Starting compilation in watch mode...


app/fileWithError.ts(1,12): error TS4094: Property 'p' of exported class expression may not be private or protected.


12:00:26 AM - Found 1 error. Watching for file changes.


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
  {"pollingInterval":250}
/user/username/projects/solution/app/filewitherror.ts:
  {"pollingInterval":250}
/user/username/projects/solution/app/filewithouterror.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/solution/app:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

Change:: Change fileWithoutError

//// [/user/username/projects/solution/app/fileWithoutError.ts]
export class myClass2 { }


Output::
>> Screen clear
12:00:30 AM - File change detected. Starting incremental compilation...


app/fileWithError.ts(1,12): error TS4094: Property 'p' of exported class expression may not be private or protected.


12:00:31 AM - Found 1 error. Watching for file changes.


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
  {"pollingInterval":250}
/user/username/projects/solution/app/filewitherror.ts:
  {"pollingInterval":250}
/user/username/projects/solution/app/filewithouterror.ts:
  {"pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/solution/app:
  {"fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined
