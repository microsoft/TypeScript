Input::
//// [/project/src/tsconfig.json]
{"compilerOptions":{"target":"es2016","module":"Node16","outDir":"../out"}}

//// [/project/src/fileA.ts]
import { foo } from "./fileB.mjs";
foo();


//// [/project/src/fileB.mts]
export function foo() {
}


//// [/project/package.json]
{"name":"app","version":"1.0.0"}

//// [/a/lib/lib.es2016.full.d.ts]
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


/a/lib/tsc.js --w --p /project/src/tsconfig.json --extendedDiagnostics -traceResolution --explainFiles
Output::
[[90m12:00:21 AM[0m] Starting compilation in watch mode...

Current directory: /project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /project/src/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/project/src/fileA.ts","/project/src/fileB.mts"]
  options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
File '/project/src/package.json' does not exist.
Found 'package.json' at '/project/package.json'.
'package.json' does not have a 'typesVersions' field.
FileWatcher:: Added:: WatchInfo: /project/src/fileA.ts 250 undefined Source file
======== Resolving module './fileB.mjs' from '/project/src/fileA.ts'. ========
Module resolution kind is not specified, using 'Node16'.
Loading module as file / folder, candidate module location '/project/src/fileB.mjs', target file type 'TypeScript'.
File '/project/src/fileB.mjs.ts' does not exist.
File '/project/src/fileB.mjs.tsx' does not exist.
File '/project/src/fileB.mjs.d.ts' does not exist.
File name '/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/project/src/fileB.mts'. ========
DirectoryWatcher:: Added:: WatchInfo: /project/src 0 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/src 0 undefined Failed Lookup Locations
FileWatcher:: Added:: WatchInfo: /project/src/fileB.mts 250 undefined Source file
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /project/src/package.json 2000 undefined File location affecting resolution
FileWatcher:: Added:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
DirectoryWatcher:: Added:: WatchInfo: /project/src/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/src/node_modules/@types 1 undefined Type roots
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Matched by default include pattern '**/*'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' does have field "type" or it's value is not "module"
[[90m12:00:29 AM[0m] Found 1 error. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /project/src 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/src 1 undefined Wild card directory


Program root files: ["/project/src/fileA.ts","/project/src/fileB.mts"]
Program options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2016.full.d.ts
/project/src/fileB.mts
/project/src/fileA.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2016.full.d.ts
/project/src/fileB.mts
/project/src/fileA.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2016.full.d.ts (used version)
/project/src/fileb.mts (used version)
/project/src/filea.ts (used version)

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/package.json:
  {"fileName":"/project/src/package.json","pollingInterval":250}
/project/package.json:
  {"fileName":"/project/package.json","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::
/project/src:
  {"directoryName":"/project/src"}

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined

//// [/project/out/fileB.mjs]
export function foo() {
}


//// [/project/out/fileA.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileB_mjs_1 = require("./fileB.mjs");
(0, fileB_mjs_1.foo)();



Change:: Modify package json file to add type module

Input::
//// [/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


Output::
FileWatcher:: Triggered with /project/package.json 1:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /project/package.json 1:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:00:33 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/project/src/fileA.ts","/project/src/fileB.mts"]
  options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
File '/project/src/package.json' does not exist.
Found 'package.json' at '/project/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/project/src/package.json' does not exist according to earlier cached lookups.
File '/project/package.json' exists according to earlier cached lookups.
Reusing resolution of module './fileB.mjs' from '/project/src/fileA.ts' of old program, it was successfully resolved to '/project/src/fileB.mts'.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Matched by default include pattern '**/*'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' does have field "type" or it's value is not "module"
[[90m12:00:34 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/project/src/fileA.ts","/project/src/fileB.mts"]
Program options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.es2016.full.d.ts
/project/src/fileB.mts
/project/src/fileA.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/package.json:
  {"fileName":"/project/src/package.json","pollingInterval":250}
/project/package.json:
  {"fileName":"/project/package.json","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::
/project/src:
  {"directoryName":"/project/src"}

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined


Change:: Modify package.json file to remove type module

Input::
//// [/project/package.json]
{"name":"app","version":"1.0.0"}


Output::
FileWatcher:: Triggered with /project/package.json 1:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /project/package.json 1:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:00:39 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/project/src/fileA.ts","/project/src/fileB.mts"]
  options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
File '/project/src/package.json' does not exist.
Found 'package.json' at '/project/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/project/src/package.json' does not exist according to earlier cached lookups.
File '/project/package.json' exists according to earlier cached lookups.
Reusing resolution of module './fileB.mjs' from '/project/src/fileA.ts' of old program, it was successfully resolved to '/project/src/fileB.mts'.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Matched by default include pattern '**/*'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' does have field "type" or it's value is not "module"
[[90m12:00:40 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/project/src/fileA.ts","/project/src/fileB.mts"]
Program options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.es2016.full.d.ts
/project/src/fileB.mts
/project/src/fileA.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/package.json:
  {"fileName":"/project/src/package.json","pollingInterval":250}
/project/package.json:
  {"fileName":"/project/package.json","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::
/project/src:
  {"directoryName":"/project/src"}

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined


Change:: Delete package.json

Input::
//// [/project/package.json] deleted

Output::
FileWatcher:: Triggered with /project/package.json 2:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /project/package.json 2:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:00:42 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/project/src/fileA.ts","/project/src/fileB.mts"]
  options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
File '/project/src/package.json' does not exist.
File '/project/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
File '/project/src/package.json' does not exist according to earlier cached lookups.
File '/project/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module './fileB.mjs' from '/project/src/fileA.ts' of old program, it was successfully resolved to '/project/src/fileB.mts'.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Matched by default include pattern '**/*'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' does have field "type" or it's value is not "module"
[[90m12:00:43 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/project/src/fileA.ts","/project/src/fileB.mts"]
Program options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.es2016.full.d.ts
/project/src/fileB.mts
/project/src/fileA.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/package.json:
  {"fileName":"/project/src/package.json","pollingInterval":250}
/project/package.json:
  {"fileName":"/project/package.json","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::
/project/src:
  {"directoryName":"/project/src"}

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined


Change:: Modify package json file to add type module

Input::
//// [/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


Output::
FileWatcher:: Triggered with /project/package.json 0:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /project/package.json 0:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:00:47 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/project/src/fileA.ts","/project/src/fileB.mts"]
  options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
File '/project/src/package.json' does not exist.
Found 'package.json' at '/project/package.json'.
'package.json' does not have a 'typesVersions' field.
File '/project/src/package.json' does not exist according to earlier cached lookups.
File '/project/package.json' exists according to earlier cached lookups.
Reusing resolution of module './fileB.mjs' from '/project/src/fileA.ts' of old program, it was successfully resolved to '/project/src/fileB.mts'.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Matched by default include pattern '**/*'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' does have field "type" or it's value is not "module"
[[90m12:00:48 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/project/src/fileA.ts","/project/src/fileB.mts"]
Program options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.es2016.full.d.ts
/project/src/fileB.mts
/project/src/fileA.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/package.json:
  {"fileName":"/project/src/package.json","pollingInterval":250}
/project/package.json:
  {"fileName":"/project/package.json","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::
/project/src:
  {"directoryName":"/project/src"}

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined


Change:: Delete package.json

Input::
//// [/project/package.json] deleted

Output::
FileWatcher:: Triggered with /project/package.json 2:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling invalidateFailedLookup
Elapsed:: *ms FileWatcher:: Triggered with /project/package.json 2:: WatchInfo: /project/package.json 2000 undefined File location affecting resolution
Scheduling update
Synchronizing program
[[90m12:00:50 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/project/src/fileA.ts","/project/src/fileB.mts"]
  options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
File '/project/src/package.json' does not exist.
File '/project/package.json' does not exist.
File '/package.json' does not exist according to earlier cached lookups.
File '/project/src/package.json' does not exist according to earlier cached lookups.
File '/project/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
Reusing resolution of module './fileB.mjs' from '/project/src/fileA.ts' of old program, it was successfully resolved to '/project/src/fileB.mts'.
File '/a/lib/package.json' does not exist according to earlier cached lookups.
File '/a/package.json' does not exist according to earlier cached lookups.
File '/package.json' does not exist according to earlier cached lookups.
[96msrc/fileA.ts[0m:[93m1[0m:[93m21[0m - [91merror[0m[90m TS1471: [0mModule './fileB.mjs' cannot be imported using this construct. The specifier only resolves to an ES module, which cannot be imported synchronously. Use dynamic import instead.

[7m1[0m import { foo } from "./fileB.mjs";
[7m [0m [91m                    ~~~~~~~~~~~~~[0m

../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Matched by default include pattern '**/*'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is CommonJS module because 'package.json' does have field "type" or it's value is not "module"
[[90m12:00:51 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/project/src/fileA.ts","/project/src/fileB.mts"]
Program options: {"target":3,"module":100,"outDir":"/project/out","watch":true,"project":"/project/src/tsconfig.json","extendedDiagnostics":true,"traceResolution":true,"explainFiles":true,"configFilePath":"/project/src/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.es2016.full.d.ts
/project/src/fileB.mts
/project/src/fileA.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/package.json:
  {"fileName":"/project/src/package.json","pollingInterval":250}
/project/package.json:
  {"fileName":"/project/package.json","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::
/project/src:
  {"directoryName":"/project/src"}

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined

