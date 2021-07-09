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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };

//// [/user/username/projects/myproject/a.js]


//// [/user/username/projects/myproject/b.ts]


//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"allowJs":true,"noEmit":true}}


/a/lib/tsc.js -b -w -verbose
Output::
>> Screen clear
[[90m12:00:25 AM[0m] Starting compilation in watch mode...

[[90m12:00:26 AM[0m] Projects in this build: 
    * tsconfig.json

[[90m12:00:27 AM[0m] Project 'tsconfig.json' is out of date because oldest output 'a.js' is older than newest input 'b.ts'

[[90m12:00:28 AM[0m] Building project '/user/username/projects/myproject/tsconfig.json'...

[[90m12:00:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.js","/user/username/projects/myproject/b.ts"]
Program options: {"allowJs":true,"noEmit":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/a.js (used version)
/user/username/projects/myproject/b.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.js:
  {"fileName":"/user/username/projects/myproject/a.js","pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"fileName":"/user/username/projects/myproject/b.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: No change

Input::
//// [/user/username/projects/myproject/a.js] file written with same contents

Output::
>> Screen clear
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:34 AM[0m] Project 'tsconfig.json' is out of date because output file 'b.js' does not exist

[[90m12:00:35 AM[0m] Building project '/user/username/projects/myproject/tsconfig.json'...

[[90m12:00:36 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.js","/user/username/projects/myproject/b.ts"]
Program options: {"allowJs":true,"noEmit":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.js:
  {"fileName":"/user/username/projects/myproject/a.js","pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"fileName":"/user/username/projects/myproject/b.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: change

Input::
//// [/user/username/projects/myproject/a.js]
const x = 10;


Output::
>> Screen clear
[[90m12:00:40 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:41 AM[0m] Project 'tsconfig.json' is out of date because output file 'b.js' does not exist

[[90m12:00:42 AM[0m] Building project '/user/username/projects/myproject/tsconfig.json'...

[[90m12:00:43 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/a.js","/user/username/projects/myproject/b.ts"]
Program options: {"allowJs":true,"noEmit":true,"watch":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/a.js
/user/username/projects/myproject/b.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/a.js (computed .d.ts)
/user/username/projects/myproject/b.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/a.js:
  {"fileName":"/user/username/projects/myproject/a.js","pollingInterval":250}
/user/username/projects/myproject/b.ts:
  {"fileName":"/user/username/projects/myproject/b.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

