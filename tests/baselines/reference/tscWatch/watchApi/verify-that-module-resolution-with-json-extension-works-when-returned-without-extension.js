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

//// [/user/username/projects/myproject/index.ts]
import settings from './settings.json';

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"module":"commonjs","resolveJsonModule":true},"files":["index.ts"]}

//// [/user/username/projects/myproject/settings.json]
{"content":"Print this"}


/a/lib/tsc.js --w --p /user/username/projects/myproject/tsconfig.json
Output::
>> Screen clear
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

[96mindex.ts[0m:[93m1[0m:[93m8[0m - [91merror[0m[90m TS1259: [0mModule '"/user/username/projects/myproject/settings"' can only be default-imported using the 'esModuleInterop' flag

[7m1[0m import settings from './settings.json';
[7m [0m [91m       ~~~~~~~~[0m

  [96msettings.json[0m:[93m1[0m:[93m1[0m
    [7m1[0m {"content":"Print this"}
    [7m [0m [96m~[0m
    This module is declared with using 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.

[[90m12:00:26 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/index.ts"]
Program options: {"module":1,"resolveJsonModule":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/settings.json
/user/username/projects/myproject/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/settings.json
/user/username/projects/myproject/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/settings.json (used version)
/user/username/projects/myproject/index.ts (used version)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/index.ts:
  {"fileName":"/user/username/projects/myproject/index.ts","pollingInterval":250}
/user/username/projects/myproject/settings.json:
  {"fileName":"/user/username/projects/myproject/settings.json","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/index.js]
"use strict";
exports.__esModule = true;


