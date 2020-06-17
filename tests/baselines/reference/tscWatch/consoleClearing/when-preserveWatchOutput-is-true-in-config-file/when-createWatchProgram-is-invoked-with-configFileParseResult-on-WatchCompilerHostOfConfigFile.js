Input::
//// [/f.ts]


//// [/tsconfig.json]
{"compilerOptions":{"preserveWatchOutput":true}}

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


/a/lib/tsc.js --w -p /tsconfig.json
Output::
[[90m12:00:13 AM[0m] Starting compilation in watch mode...


[[90m12:00:16 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/f.ts","/a/lib/lib.d.ts"]
Program options: {"preserveWatchOutput":true,"watch":true,"project":"/tsconfig.json","configFilePath":"/tsconfig.json"}
Program files::
/f.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/f.ts
/a/lib/lib.d.ts

WatchedFiles::
/tsconfig.json:
  {"fileName":"/tsconfig.json","pollingInterval":250}
/f.ts:
  {"fileName":"/f.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"directoryName":"","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/f.js]



Change:: Comment added to file f

Input::
//// [/f.ts]
//


Output::
[[90m12:00:19 AM[0m] File change detected. Starting incremental compilation...


[[90m12:00:23 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/f.ts","/a/lib/lib.d.ts"]
Program options: {"preserveWatchOutput":true,"watch":true,"project":"/tsconfig.json","configFilePath":"/tsconfig.json"}
Program files::
/f.ts
/a/lib/lib.d.ts

Semantic diagnostics in builder refreshed for::
/f.ts

WatchedFiles::
/tsconfig.json:
  {"fileName":"/tsconfig.json","pollingInterval":250}
/f.ts:
  {"fileName":"/f.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/:
  {"directoryName":"","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/f.js]
//


