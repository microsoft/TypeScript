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
{"name":"app","version":"1.0.0","type":"module"}

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
File name '/project/src/fileB.mjs' has a '.mjs' extension - stripping it.
File '/project/src/fileB.mts' exist - use it as a name resolution result.
======== Module name './fileB.mjs' was successfully resolved to '/project/src/fileB.mts'. ========
FileWatcher:: Added:: WatchInfo: /project/src/fileB.mts 250 undefined Source file
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
FileWatcher:: Added:: WatchInfo: /a/lib/lib.es2016.full.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /project/src/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /project/src/node_modules/@types 1 undefined Type roots
../a/lib/lib.es2016.full.d.ts
  Default library for target 'es2016'
src/fileB.mts
  Imported via "./fileB.mjs" from file 'src/fileA.ts'
  Matched by default include pattern '**/*'
src/fileA.ts
  Matched by default include pattern '**/*'
  File is ECMAScript module because 'package.json' has field "type" with value "module"
[[90m12:00:29 AM[0m] Found 0 errors. Watching for file changes.

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
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined

//// [/project/out/fileB.mjs]
export function foo() {
}


//// [/project/out/fileA.js]
import { foo } from "./fileB.mjs";
foo();



Change:: Modify package.json file to remove type module

Input::
//// [/project/package.json]
{"name":"app","version":"1.0.0"}


Output::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined


Change:: Modify package json file to add type module

Input::
//// [/project/package.json]
{"name":"app","version":"1.0.0","type":"module"}


Output::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined


Change:: Delete package.json

Input::
//// [/project/package.json] deleted

Output::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined


Change:: Modify package json file to without type module

Input::
//// [/project/package.json]
{"name":"app","version":"1.0.0"}


Output::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined


Change:: Delete package.json

Input::
//// [/project/package.json] deleted

Output::

WatchedFiles::
/project/src/tsconfig.json:
  {"fileName":"/project/src/tsconfig.json","pollingInterval":250}
/project/src/filea.ts:
  {"fileName":"/project/src/fileA.ts","pollingInterval":250}
/project/src/fileb.mts:
  {"fileName":"/project/src/fileB.mts","pollingInterval":250}
/a/lib/lib.es2016.full.d.ts:
  {"fileName":"/a/lib/lib.es2016.full.d.ts","pollingInterval":250}
/project/src/node_modules/@types:
  {"fileName":"/project/src/node_modules/@types","pollingInterval":500}

FsWatches::

FsWatchesRecursive::
/project/src:
  {"directoryName":"/project/src"}

exitCode:: ExitStatus.undefined

