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

//// [/user/username/projects/myproject/typings/xterm.d.ts]
export const typing = 10;

//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;

//// [/user/username/projects/myproject/pkg0/tsconfig.json]
{"complerOptions":{"composite":true},"include":["**/*.ts","../typings/xterm.d.ts"]}

//// [/user/username/projects/myproject/pkg1/index.ts]
export const pkg1 = 1;

//// [/user/username/projects/myproject/pkg1/tsconfig.json]
{"complerOptions":{"composite":true},"include":["**/*.ts","../typings/xterm.d.ts"]}

//// [/user/username/projects/myproject/pkg2/index.ts]
export const pkg2 = 2;

//// [/user/username/projects/myproject/pkg2/tsconfig.json]
{"complerOptions":{"composite":true},"include":["**/*.ts","../typings/xterm.d.ts"]}

//// [/user/username/projects/myproject/pkg3/index.ts]
export const pkg3 = 3;

//// [/user/username/projects/myproject/pkg3/tsconfig.json]
{"complerOptions":{"composite":true},"include":["**/*.ts","../typings/xterm.d.ts"]}

//// [/user/username/projects/myproject/tsconfig.json]
{"files":[],"include":[],"references":[{"path":"./pkg0"},{"path":"./pkg1"},{"path":"./pkg2"},{"path":"./pkg3"}]}


/a/lib/tsc.js --b --w
Output::
>> Screen clear
[[90m12:00:47 AM[0m] Starting compilation in watch mode...

[[90m12:00:48 AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * pkg3/tsconfig.json
    * tsconfig.json

[[90m12:00:49 AM[0m] Project 'pkg0/tsconfig.json' is out of date because output file 'pkg0/index.js' does not exist

[[90m12:00:50 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:00:53 AM[0m] Project 'pkg1/tsconfig.json' is out of date because output file 'pkg1/index.js' does not exist

[[90m12:00:54 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:00:57 AM[0m] Project 'pkg2/tsconfig.json' is out of date because output file 'pkg2/index.js' does not exist

[[90m12:00:58 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:01 AM[0m] Project 'pkg3/tsconfig.json' is out of date because output file 'pkg3/index.js' does not exist

[[90m12:01:02 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:01:05 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg0/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg0/index.ts (used version)
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: ["/user/username/projects/myproject/pkg1/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg1/index.ts (used version)
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: ["/user/username/projects/myproject/pkg2/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg2/index.ts (used version)
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: ["/user/username/projects/myproject/pkg3/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg3/index.ts (used version)
/user/username/projects/myproject/typings/xterm.d.ts (used version)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/typings/xterm.d.ts:
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.pkg0 = void 0;
exports.pkg0 = 0;


//// [/user/username/projects/myproject/pkg1/index.js]
"use strict";
exports.__esModule = true;
exports.pkg1 = void 0;
exports.pkg1 = 1;


//// [/user/username/projects/myproject/pkg2/index.js]
"use strict";
exports.__esModule = true;
exports.pkg2 = void 0;
exports.pkg2 = 2;


//// [/user/username/projects/myproject/pkg3/index.js]
"use strict";
exports.__esModule = true;
exports.pkg3 = void 0;
exports.pkg3 = 3;



Change:: modify typing file

Input::
//// [/user/username/projects/myproject/typings/xterm.d.ts]
export const typing = 10;export const typing1 = 10;


Output::
>> Screen clear
[[90m12:01:09 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:10 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'typings/xterm.d.ts'

[[90m12:01:11 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:01:13 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:01:14 AM[0m] Project 'pkg1/tsconfig.json' is out of date because oldest output 'pkg1/index.js' is older than newest input 'typings/xterm.d.ts'

[[90m12:01:15 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:17 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:18 AM[0m] Project 'pkg2/tsconfig.json' is out of date because oldest output 'pkg2/index.js' is older than newest input 'typings/xterm.d.ts'

[[90m12:01:19 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:21 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:22 AM[0m] Project 'pkg3/tsconfig.json' is out of date because oldest output 'pkg3/index.js' is older than newest input 'typings/xterm.d.ts'

[[90m12:01:23 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:01:25 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:01:26 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg0/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: ["/user/username/projects/myproject/pkg1/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: ["/user/username/projects/myproject/pkg2/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: ["/user/username/projects/myproject/pkg3/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/typings/xterm.d.ts:
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time

Change:: change pkg references

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{"files":[],"include":[],"references":[{"path":"./pkg0"},{"path":"./pkg1"},{"path":"./pkg2"}]}


Output::
>> Screen clear
[[90m12:01:30 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:31 AM[0m] Found 0 errors. Watching for file changes.



WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/typings/xterm.d.ts:
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: modify typing file

Input::
//// [/user/username/projects/myproject/typings/xterm.d.ts]
export const typing = 10;


Output::
>> Screen clear
[[90m12:01:35 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:36 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'typings/xterm.d.ts'

[[90m12:01:37 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:01:39 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:01:40 AM[0m] Project 'pkg1/tsconfig.json' is out of date because oldest output 'pkg1/index.js' is older than newest input 'typings/xterm.d.ts'

[[90m12:01:41 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:43 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:44 AM[0m] Project 'pkg2/tsconfig.json' is out of date because oldest output 'pkg2/index.js' is older than newest input 'typings/xterm.d.ts'

[[90m12:01:45 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:47 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:48 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg0/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: ["/user/username/projects/myproject/pkg1/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

Program root files: ["/user/username/projects/myproject/pkg2/index.ts","/user/username/projects/myproject/typings/xterm.d.ts"]
Program options: {"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts
/user/username/projects/myproject/typings/xterm.d.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/typings/xterm.d.ts (used version)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/typings/xterm.d.ts:
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
  {"fileName":"/user/username/projects/myproject/typings/xterm.d.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time

Change:: change pkg references to remove all watches

Input::
//// [/user/username/projects/myproject/tsconfig.json]
{"files":[],"include":[],"references":[]}


Output::
>> Screen clear
[[90m12:01:53 AM[0m] File change detected. Starting incremental compilation...

[96mtsconfig.json[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS18002: [0mThe 'files' list in config file '/user/username/projects/myproject/tsconfig.json' is empty.

[7m1[0m {"files":[],"include":[],"references":[]}
[7m [0m [91m         ~~[0m

[[90m12:01:54 AM[0m] Found 1 error. Watching for file changes.



WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined


Change:: modify typing file

Input::
//// [/user/username/projects/myproject/typings/xterm.d.ts]
export const typing = 10;export const typing1 = 10;


Output::

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

