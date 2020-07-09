Input::
//// [/user/username/projects/myproject/index.ts]
const fn = (a: string, b: string) => b;

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"noUnusedParameters":true}}

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


/a/lib/tsc.js -b -w
Output::
>> Screen clear
[[90m12:00:21 AM[0m] Starting compilation in watch mode...


[96mindex.ts[0m:[93m1[0m:[93m13[0m - [91merror[0m[90m TS6133: [0m'a' is declared but its value is never read.

[7m1[0m const fn = (a: string, b: string) => b;
[7m [0m [91m            ~[0m


[[90m12:00:22 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/index.ts"]
Program options: {"noUnusedParameters":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/index.ts:
  {"fileName":"/user/username/projects/myproject/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Change tsconfig to set noUnusedParameters to false

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"noUnusedParameters":false}}


Output::
>> Screen clear
[[90m12:00:26 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/index.ts"]
Program options: {"noUnusedParameters":false,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/index.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/index.ts:
  {"fileName":"/user/username/projects/myproject/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/index.js]
var fn = function (a, b) { return b; };


