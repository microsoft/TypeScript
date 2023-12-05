currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames: false
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

//// [/user/username/projects/myproject/node_modules/bar/temp/index.d.ts]
export function temp(): string;

//// [/user/username/projects/myproject/tsconfig.json]
{
  "exclude": [
    "node_modules"
  ],
  "watchOptions": {
    "excludeDirectories": [
      "node_modules"
    ]
  }
}


/a/lib/tsc.js -w -extendedDiagnostics
Output::
[[90m12:00:37 AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/src/main.ts"]
  options: {"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src/main.ts 250 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/bar/index.d.ts 250 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Source file
ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/bar/foo.d.ts 250 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Failed Lookup Locations
ExcludeWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Type roots
DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/main.js :: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/src/main.js :: WatchInfo: /user/username/projects/myproject/src 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Failed Lookup Locations
[[90m12:00:40 AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 {"excludeDirectories":["/user/username/projects/myproject/node_modules"]} Wild card directory


//// [/user/username/projects/myproject/src/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bar_1 = require("bar");
(0, bar_1.foo)();



PolledWatches::
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/a/lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/node_modules/bar/foo.d.ts: *new*
  {}
/user/username/projects/myproject/node_modules/bar/index.d.ts: *new*
  {}
/user/username/projects/myproject/src/main.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}
/user/username/projects/myproject/src: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/src/main.ts"
]
Program options: {
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
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

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/node_modules/bar/foo.d.ts (used version)
/user/username/projects/myproject/node_modules/bar/index.d.ts (used version)
/user/username/projects/myproject/src/main.ts (used version)

exitCode:: ExitStatus.undefined

Change:: delete fooBar

Input::
//// [/user/username/projects/myproject/node_modules/bar/fooBar.d.ts] deleted


exitCode:: ExitStatus.undefined
