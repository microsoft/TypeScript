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

//// [/user/username/projects/myproject/src/main.ts]
import { foo } from "bar"; foo();

//// [/user/username/projects/myproject/node_modules/bar/index.d.ts]
export { foo } from "./foo";

//// [/user/username/projects/myproject/node_modules/bar/foo.d.ts]
export function foo(): string;

//// [/user/username/projects/myproject/node_modules/bar/fooBar.d.ts]
export function fooBar(): string;

//// [/user/username/projects/myproject/tsconfig.json]
{"exclude":["node_modules"]}


/a/lib/tsc.js -w -extendedDiagnostics
Output::
[[90m12:00:33 AM[0m] Starting compilation in watch mode...


Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file

Synchronizing program

CreatingProgramWith::

  roots: ["/user/username/projects/myproject/src/main.ts"]

  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 undefined Source file

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/bar/index.d.ts 250 undefined Source file

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations

Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 undefined Failed Lookup Locations

FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/bar/foo.d.ts 250 undefined Source file

FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations

Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots

Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots

DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/main.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations

Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/main.js :: WatchInfo: /user/username/projects/myproject/src 1 undefined Failed Lookup Locations

[[90m12:00:36 AM[0m] Found 0 errors. Watching for file changes.


DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory

Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


Program root files: ["/user/username/projects/myproject/src/main.ts"]
Program options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/bar/foo.d.ts
/user/username/projects/myproject/node_modules/bar/index.d.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/bar/foo.d.ts
/user/username/projects/myproject/node_modules/bar/index.d.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/bar/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/bar/index.d.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/bar/foo.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/bar/foo.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/src/main.js]
"use strict";
exports.__esModule = true;
var bar_1 = require("bar");
bar_1.foo();



Change:: Change foo

Input::
//// [/user/username/projects/myproject/node_modules/bar/foo.d.ts]
export function fooBar(): string;


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/node_modules/bar/foo.d.ts 1:: WatchInfo: /user/username/projects/myproject/node_modules/bar/foo.d.ts 250 undefined Source file

Scheduling update

Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/node_modules/bar/foo.d.ts 1:: WatchInfo: /user/username/projects/myproject/node_modules/bar/foo.d.ts 250 undefined Source file

[[90m12:00:40 AM[0m] File change detected. Starting incremental compilation...


Synchronizing program

CreatingProgramWith::

  roots: ["/user/username/projects/myproject/src/main.ts"]

  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}

[96mnode_modules/bar/index.d.ts[0m:[93m1[0m:[93m10[0m - [91merror[0m[90m TS2305: [0mModule '"./foo"' has no exported member 'foo'.

[7m1[0m export { foo } from "./foo";
[7m [0m [91m         ~~~[0m


[[90m12:00:41 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/myproject/src/main.ts"]
Program options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/node_modules/bar/foo.d.ts
/user/username/projects/myproject/node_modules/bar/index.d.ts
/user/username/projects/myproject/src/main.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/node_modules/bar/foo.d.ts
/user/username/projects/myproject/node_modules/bar/index.d.ts
/user/username/projects/myproject/src/main.ts

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/src/main.ts:
  {"fileName":"/user/username/projects/myproject/src/main.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/bar/index.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/bar/index.d.ts","pollingInterval":250}
/user/username/projects/myproject/node_modules/bar/foo.d.ts:
  {"fileName":"/user/username/projects/myproject/node_modules/bar/foo.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules:
  {"directoryName":"/user/username/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/src:
  {"directoryName":"/user/username/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

