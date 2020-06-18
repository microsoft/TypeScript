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

//// [/home/user/projects/myproject/src/file.ts]
import * as a from "a"

//// [/home/user/projects/myproject/tsconfig.json]
{ "compilerOptions": { "extendedDiagnostics": true, "traceResolution": true }}

//// [/home/user/projects/myproject/node_modules/reala/index.d.ts]
export {}

//// [/home/user/projects/myproject/node_modules/realb/index.d.ts]
export {}

//// [/home/user/projects/myproject/node_modules/a] symlink(/home/user/projects/myproject/node_modules/reala)
//// [/home/user/projects/myproject/node_modules/b] symlink(/home/user/projects/myproject/node_modules/realb)
//// [/home/user/projects/myproject/node_modules/reala/node_modules/b] symlink(/home/user/projects/myproject/node_modules/b)
//// [/home/user/projects/myproject/node_modules/realb/node_modules/a] symlink(/home/user/projects/myproject/node_modules/a)

/a/lib/tsc.js --w
Output::
[[90m12:00:45 AM[0m] Starting compilation in watch mode...


Current directory: /home/user/projects/myproject CaseSensitiveFileNames: false

FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/tsconfig.json 2000 undefined Config file

Synchronizing program

CreatingProgramWith::

  roots: ["/home/user/projects/myproject/src/file.ts"]

  options: {"extendedDiagnostics":true,"traceResolution":true,"watch":true,"configFilePath":"/home/user/projects/myproject/tsconfig.json"}

FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/src/file.ts 250 undefined Source file

======== Resolving module 'a' from '/home/user/projects/myproject/src/file.ts'. ========

Module resolution kind is not specified, using 'NodeJs'.

Loading module 'a' from 'node_modules' folder, target file type 'TypeScript'.

Directory '/home/user/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.

File '/home/user/projects/myproject/node_modules/a/package.json' does not exist.

File '/home/user/projects/myproject/node_modules/a.ts' does not exist.

File '/home/user/projects/myproject/node_modules/a.tsx' does not exist.

File '/home/user/projects/myproject/node_modules/a.d.ts' does not exist.

File '/home/user/projects/myproject/node_modules/a/index.ts' does not exist.

File '/home/user/projects/myproject/node_modules/a/index.tsx' does not exist.

File '/home/user/projects/myproject/node_modules/a/index.d.ts' exist - use it as a name resolution result.

Resolving real path for '/home/user/projects/myproject/node_modules/a/index.d.ts', result '/home/user/projects/myproject/node_modules/reala/index.d.ts'.

======== Module name 'a' was successfully resolved to '/home/user/projects/myproject/node_modules/reala/index.d.ts'. ========

FileWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/reala/index.d.ts 250 undefined Source file

FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file

DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/src 1 undefined Failed Lookup Locations

Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/src 1 undefined Failed Lookup Locations

DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules 1 undefined Failed Lookup Locations

Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules 1 undefined Failed Lookup Locations

DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/@types 1 undefined Type roots

Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject/node_modules/@types 1 undefined Type roots

[[90m12:00:48 AM[0m] Found 0 errors. Watching for file changes.


DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject 1 undefined Wild card directory

Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/user/projects/myproject 1 undefined Wild card directory


Program root files: ["/home/user/projects/myproject/src/file.ts"]
Program options: {"extendedDiagnostics":true,"traceResolution":true,"watch":true,"configFilePath":"/home/user/projects/myproject/tsconfig.json"}
Program files::
/a/lib/lib.d.ts
/home/user/projects/myproject/node_modules/reala/index.d.ts
/home/user/projects/myproject/src/file.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/home/user/projects/myproject/node_modules/reala/index.d.ts
/home/user/projects/myproject/src/file.ts

WatchedFiles::
/home/user/projects/myproject/tsconfig.json:
  {"fileName":"/home/user/projects/myproject/tsconfig.json","pollingInterval":250}
/home/user/projects/myproject/src/file.ts:
  {"fileName":"/home/user/projects/myproject/src/file.ts","pollingInterval":250}
/home/user/projects/myproject/node_modules/reala/index.d.ts:
  {"fileName":"/home/user/projects/myproject/node_modules/reala/index.d.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::
/home/user/projects/myproject/src:
  {"directoryName":"/home/user/projects/myproject/src","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/user/projects/myproject/node_modules:
  {"directoryName":"/home/user/projects/myproject/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/user/projects/myproject/node_modules/reala:
  {"directoryName":"/home/user/projects/myproject/node_modules/reala","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/user/projects/myproject/node_modules/reala/node_modules:
  {"directoryName":"/home/user/projects/myproject/node_modules/reala/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/user/projects/myproject/node_modules/realb:
  {"directoryName":"/home/user/projects/myproject/node_modules/realb","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/user/projects/myproject/node_modules/realb/node_modules:
  {"directoryName":"/home/user/projects/myproject/node_modules/realb/node_modules","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/user/projects/myproject/node_modules/@types:
  {"directoryName":"/home/user/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/home/user/projects/myproject:
  {"directoryName":"/home/user/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/home/user/projects/myproject/src/file.js]
"use strict";
exports.__esModule = true;


