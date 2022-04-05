Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js"}

//// [/user/username/projects/myproject/packages/pkg1/index.ts]
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json]
{"compilerOptions":{"outDir":"build"}}

//// [/user/username/projects/myproject/packages/pkg2/build/const.d.ts]
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts]
export type { TheNum } from './const.js';

//// [/user/username/projects/myproject/packages/pkg2/build/other.d.ts]
export type TheStr = string;

//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/index.js"}

//// [/user/username/projects/myproject/node_modules/pkg2] symlink(/user/username/projects/myproject/packages/pkg2)
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


/a/lib/tsc.js --project ./packages/pkg1/tsconfig.json -w --traceResolution
Output::
>> Screen clear
[[90m12:00:43 AM[0m] Starting compilation in watch mode...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' does not exist.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/node_modules/pkg2/build/index.js', target file type 'TypeScript'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.d.ts' does not exist.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
======== Resolving module './const.js' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.js', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/build/const.js.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.js.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.js.d.ts' does not exist.
File name '/user/username/projects/myproject/packages/pkg2/build/const.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.ts' exist - use it as a name resolution result.
======== Module name './const.js' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.ts'. ========
[[90m12:00:49 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","project":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/const.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/index.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (used version)

WatchedFiles::
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/index.d.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/index.d.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/const.d.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/const.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1/node_modules:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/node_modules:
  {"directoryName":"/user/username/projects/myproject/packages/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/packages/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
"use strict";
exports.__esModule = true;
exports.theNum = void 0;
exports.theNum = 42;



Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/other.js"}


Output::
>> Screen clear
[[90m12:00:53 AM[0m] File change detected. Starting incremental compilation...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/other.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/other.js'.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.js' does not exist.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/node_modules/pkg2/build/other.js', target file type 'TypeScript'.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.js.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.js.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.js.d.ts' does not exist.
File name '/user/username/projects/myproject/node_modules/pkg2/build/other.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/other.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/other.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/other.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/other.d.ts' with Package ID 'pkg2/build/other.d.ts@1.0.0'. ========
[96mpackages/pkg1/index.ts[0m:[93m1[0m:[93m15[0m - [91merror[0m[90m TS2305: [0mModule '"pkg2"' has no exported member 'TheNum'.

[7m1[0m import type { TheNum } from 'pkg2'
[7m [0m [91m              ~~~~~~[0m

[[90m12:00:57 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","project":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/other.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/other.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/other.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/other.d.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/other.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1/node_modules:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/node_modules:
  {"directoryName":"/user/username/projects/myproject/packages/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/packages/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/pkg1/build/index.js] file written with same contents

Change:: removes those errors when a package file is changed back

Input::
//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/index.js"}


Output::
>> Screen clear
[[90m12:01:01 AM[0m] File change detected. Starting incremental compilation...

======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module 'pkg2' from 'node_modules' folder, target file type 'TypeScript'.
Directory '/user/username/projects/myproject/packages/pkg1/node_modules' does not exist, skipping all lookups in it.
Directory '/user/username/projects/myproject/packages/node_modules' does not exist, skipping all lookups in it.
Found 'package.json' at '/user/username/projects/myproject/node_modules/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/user/username/projects/myproject/node_modules/pkg2.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2.d.ts' does not exist.
'package.json' does not have a 'typings' field.
'package.json' does not have a 'types' field.
'package.json' has 'main' field 'build/index.js' that references '/user/username/projects/myproject/node_modules/pkg2/build/index.js'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' does not exist.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/node_modules/pkg2/build/index.js', target file type 'TypeScript'.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js.d.ts' does not exist.
File name '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.ts' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.tsx' does not exist.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts' exist - use it as a name resolution result.
Resolving real path for '/user/username/projects/myproject/node_modules/pkg2/build/index.d.ts', result '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'.
======== Module name 'pkg2' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/index.d.ts' with Package ID 'pkg2/build/index.d.ts@1.0.0'. ========
======== Resolving module './const.js' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Module resolution kind is not specified, using 'NodeJs'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.js', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/build/const.js.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.js.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.js.d.ts' does not exist.
File name '/user/username/projects/myproject/packages/pkg2/build/const.js' has a '.js' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.ts' exist - use it as a name resolution result.
======== Module name './const.js' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.ts'. ========
[[90m12:01:05 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","project":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/const.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/build/const.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/index.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/package.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/package.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/index.d.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/index.d.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/build/const.d.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/build/const.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1/node_modules:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/node_modules:
  {"directoryName":"/user/username/projects/myproject/packages/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/packages/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/pkg1/build/index.js] file written with same contents
