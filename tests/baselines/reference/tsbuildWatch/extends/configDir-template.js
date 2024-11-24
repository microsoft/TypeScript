currentDirectory:: /home/src/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/home/src/projects/configs/first/tsconfig.json]
{
  "extends": "../second/tsconfig.json",
  "include": [
    "${configDir}/src"
  ],
  "compilerOptions": {
    "typeRoots": [
      "root1",
      "${configDir}/root2",
      "root3"
    ],
    "types": []
  }
}

//// [/home/src/projects/configs/second/tsconfig.json]
{
  "files": [
    "${configDir}/main.ts"
  ],
  "compilerOptions": {
    "declarationDir": "${configDir}/decls",
    "paths": {
      "@myscope/*": [
        "${configDir}/types/*"
      ],
      "other/*": [
        "other/*"
      ]
    },
    "baseUrl": "${configDir}"
  },
  "watchOptions": {
    "excludeFiles": [
      "${configDir}/main.ts"
    ]
  }
}

//// [/home/src/projects/myproject/tsconfig.json]
{
  "extends": "../configs/first/tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "outDir",
    "traceResolution": true
  }
}

//// [/home/src/projects/myproject/main.ts]
// some comment
export const y = 10;
import { x } from "@myscope/sometype";


//// [/home/src/projects/myproject/src/secondary.ts]
// some comment
export const z = 10;
import { k } from "other/sometype2";


//// [/home/src/projects/myproject/types/sometype.ts]
export const x = 10;


//// [/home/src/projects/myproject/root2/other/sometype2/index.d.ts]
export const k = 10;


//// [/home/src/tslibs/TS/Lib/lib.d.ts]
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


/home/src/tslibs/TS/Lib/tsc.js -b -w --extendedDiagnostics --explainFiles -v
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

[[90mHH:MM:SS AM[0m] Projects in this build: 
    * tsconfig.json

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output file 'outDir/tsconfig.tsbuildinfo' does not exist

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/myproject/tsconfig.json'...

======== Resolving module '@myscope/sometype' from '/home/src/projects/myproject/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name '@myscope/sometype'.
'paths' option is specified, looking for a pattern to match module name '@myscope/sometype'.
Module name '@myscope/sometype', matched pattern '@myscope/*'.
Trying substitution '/home/src/projects/myproject/types/*', candidate module location: '/home/src/projects/myproject/types/sometype'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/types/sometype', target file types: TypeScript, Declaration.
File '/home/src/projects/myproject/types/sometype.ts' exists - use it as a name resolution result.
======== Module name '@myscope/sometype' was successfully resolved to '/home/src/projects/myproject/types/sometype.ts'. ========
======== Resolving module 'other/sometype2' from '/home/src/projects/myproject/src/secondary.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name 'other/sometype2'.
'paths' option is specified, looking for a pattern to match module name 'other/sometype2'.
Module name 'other/sometype2', matched pattern 'other/*'.
Trying substitution 'other/*', candidate module location: 'other/sometype2'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/other/sometype2', target file types: TypeScript, Declaration.
Loading module 'other/sometype2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/configs/first/root1' does not exist, skipping all lookups in it.
File '/home/src/projects/myproject/root2/other/sometype2.d.ts' does not exist.
File '/home/src/projects/myproject/root2/other/sometype2/package.json' does not exist.
File '/home/src/projects/myproject/root2/other/sometype2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/myproject/root2/other/sometype2/index.d.ts', result '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'.
======== Module name 'other/sometype2' was successfully resolved to '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
types/sometype.ts
  Imported via "@myscope/sometype" from file 'main.ts'
main.ts
  Part of 'files' list in tsconfig.json
root2/other/sometype2/index.d.ts
  Imported via "other/sometype2" from file 'src/secondary.ts'
src/secondary.ts
  Matched by include pattern '${configDir}/src' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/tsconfig.json 2000 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Config file /home/src/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/projects/configs/first/tsconfig.json 2000 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Extended config file
FileWatcher:: Added:: WatchInfo: /home/src/projects/configs/second/tsconfig.json 2000 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Extended config file
DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src 1 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Wild card directory /home/src/projects/myproject/tsconfig.json
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src 1 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Wild card directory /home/src/projects/myproject/tsconfig.json
ExcludeWatcher:: Added:: WatchInfo: /home/src/projects/myproject/main.ts 250 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Source file /home/src/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/src/secondary.ts 250 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Source file /home/src/projects/myproject/tsconfig.json
FileWatcher:: Added:: WatchInfo: /home/src/projects/myproject/root2/other/sometype2/package.json 2000 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} package.json file /home/src/projects/myproject/tsconfig.json


//// [/home/src/projects/myproject/outDir/types/sometype.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 10;


//// [/home/src/projects/myproject/decls/types/sometype.d.ts]
export declare const x = 10;


//// [/home/src/projects/myproject/outDir/main.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
// some comment
exports.y = 10;


//// [/home/src/projects/myproject/decls/main.d.ts]
export declare const y = 10;


//// [/home/src/projects/myproject/outDir/src/secondary.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
// some comment
exports.z = 10;


//// [/home/src/projects/myproject/decls/src/secondary.d.ts]
export declare const z = 10;


//// [/home/src/projects/myproject/outDir/tsconfig.tsbuildinfo]
{"root":["../main.ts","../src/secondary.ts"],"version":"FakeTSVersion"}

//// [/home/src/projects/myproject/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "root": [
    "../main.ts",
    "../src/secondary.ts"
  ],
  "version": "FakeTSVersion",
  "size": 71
}


PolledWatches::
/home/src/projects/myproject/root2/other/sometype2/package.json: *new*
  {"pollingInterval":2000}

FsWatches::
/home/src/projects/configs/first/tsconfig.json: *new*
  {}
/home/src/projects/configs/second/tsconfig.json: *new*
  {}
/home/src/projects/myproject/src/secondary.ts: *new*
  {}
/home/src/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/home/src/projects/myproject/src: *new*
  {}

Program root files: [
  "/home/src/projects/myproject/main.ts",
  "/home/src/projects/myproject/src/secondary.ts"
]
Program options: {
  "declarationDir": "/home/src/projects/myproject/decls",
  "paths": {
    "@myscope/*": [
      "/home/src/projects/myproject/types/*"
    ],
    "other/*": [
      "other/*"
    ]
  },
  "baseUrl": "/home/src/projects/myproject",
  "pathsBasePath": "/home/src/projects/configs/second",
  "typeRoots": [
    "/home/src/projects/configs/first/root1",
    "/home/src/projects/myproject/root2",
    "/home/src/projects/configs/first/root3"
  ],
  "types": [],
  "declaration": true,
  "outDir": "/home/src/projects/myproject/outDir",
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "extendedDiagnostics": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/myproject/types/sometype.ts
/home/src/projects/myproject/main.ts
/home/src/projects/myproject/root2/other/sometype2/index.d.ts
/home/src/projects/myproject/src/secondary.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/myproject/types/sometype.ts
/home/src/projects/myproject/main.ts
/home/src/projects/myproject/root2/other/sometype2/index.d.ts
/home/src/projects/myproject/src/secondary.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/home/src/projects/myproject/types/sometype.ts (computed .d.ts during emit)
/home/src/projects/myproject/main.ts (computed .d.ts during emit)
/home/src/projects/myproject/root2/other/sometype2/index.d.ts (used version)
/home/src/projects/myproject/src/secondary.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: edit extended config file

Input::
//// [/home/src/projects/configs/first/tsconfig.json]
{
  "extends": "../second/tsconfig.json",
  "include": [
    "${configDir}/src"
  ],
  "compilerOptions": {
    "typeRoots": [
      "${configDir}/root2"
    ],
    "types": []
  }
}


Output::
FileWatcher:: Triggered with /home/src/projects/configs/first/tsconfig.json 1:: WatchInfo: /home/src/projects/configs/first/tsconfig.json 2000 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Extended config file
Elapsed:: *ms FileWatcher:: Triggered with /home/src/projects/configs/first/tsconfig.json 1:: WatchInfo: /home/src/projects/configs/first/tsconfig.json 2000 {"excludeFiles":["/home/src/projects/myproject/main.ts"]} Extended config file


Timeout callback:: count: 1
1: timerToBuildInvalidatedProject *new*

Before running Timeout callback:: count: 1
1: timerToBuildInvalidatedProject

Host is moving to new time
After running Timeout callback:: count: 0
Output::
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

[[90mHH:MM:SS AM[0m] Project 'tsconfig.json' is out of date because output 'outDir/tsconfig.tsbuildinfo' is older than input '../configs/first/tsconfig.json'

[[90mHH:MM:SS AM[0m] Building project '/home/src/projects/myproject/tsconfig.json'...

======== Resolving module '@myscope/sometype' from '/home/src/projects/myproject/main.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name '@myscope/sometype'.
'paths' option is specified, looking for a pattern to match module name '@myscope/sometype'.
Module name '@myscope/sometype', matched pattern '@myscope/*'.
Trying substitution '/home/src/projects/myproject/types/*', candidate module location: '/home/src/projects/myproject/types/sometype'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/types/sometype', target file types: TypeScript, Declaration.
File '/home/src/projects/myproject/types/sometype.ts' exists - use it as a name resolution result.
======== Module name '@myscope/sometype' was successfully resolved to '/home/src/projects/myproject/types/sometype.ts'. ========
======== Resolving module 'other/sometype2' from '/home/src/projects/myproject/src/secondary.ts'. ========
Module resolution kind is not specified, using 'Node10'.
'baseUrl' option is set to '/home/src/projects/myproject', using this value to resolve non-relative module name 'other/sometype2'.
'paths' option is specified, looking for a pattern to match module name 'other/sometype2'.
Module name 'other/sometype2', matched pattern 'other/*'.
Trying substitution 'other/*', candidate module location: 'other/sometype2'.
Loading module as file / folder, candidate module location '/home/src/projects/myproject/other/sometype2', target file types: TypeScript, Declaration.
Loading module 'other/sometype2' from 'node_modules' folder, target file types: TypeScript, Declaration.
Searching all ancestor node_modules directories for preferred extensions: TypeScript, Declaration.
Directory '/home/src/projects/myproject/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/myproject/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/projects/node_modules' does not exist, skipping all lookups in it.
Directory '/home/src/node_modules' does not exist, skipping all lookups in it.
Directory '/home/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
File '/home/src/projects/myproject/root2/other/sometype2.d.ts' does not exist.
File '/home/src/projects/myproject/root2/other/sometype2/package.json' does not exist.
File '/home/src/projects/myproject/root2/other/sometype2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/home/src/projects/myproject/root2/other/sometype2/index.d.ts', result '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'.
======== Module name 'other/sometype2' was successfully resolved to '/home/src/projects/myproject/root2/other/sometype2/index.d.ts'. ========
../../tslibs/TS/Lib/lib.d.ts
  Default library for target 'es5'
types/sometype.ts
  Imported via "@myscope/sometype" from file 'main.ts'
main.ts
  Part of 'files' list in tsconfig.json
root2/other/sometype2/index.d.ts
  Imported via "other/sometype2" from file 'src/secondary.ts'
src/secondary.ts
  Matched by include pattern '${configDir}/src' in 'tsconfig.json'
[[90mHH:MM:SS AM[0m] Updating unchanged output timestamps of project '/home/src/projects/myproject/tsconfig.json'...

[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/home/src/projects/myproject/outDir/main.js] file changed its modified time
//// [/home/src/projects/myproject/decls/main.d.ts] file changed its modified time
//// [/home/src/projects/myproject/outDir/src/secondary.js] file changed its modified time
//// [/home/src/projects/myproject/decls/src/secondary.d.ts] file changed its modified time
//// [/home/src/projects/myproject/outDir/tsconfig.tsbuildinfo] file changed its modified time


Program root files: [
  "/home/src/projects/myproject/main.ts",
  "/home/src/projects/myproject/src/secondary.ts"
]
Program options: {
  "declarationDir": "/home/src/projects/myproject/decls",
  "paths": {
    "@myscope/*": [
      "/home/src/projects/myproject/types/*"
    ],
    "other/*": [
      "other/*"
    ]
  },
  "baseUrl": "/home/src/projects/myproject",
  "pathsBasePath": "/home/src/projects/configs/second",
  "typeRoots": [
    "/home/src/projects/myproject/root2"
  ],
  "types": [],
  "declaration": true,
  "outDir": "/home/src/projects/myproject/outDir",
  "traceResolution": true,
  "watch": true,
  "explainFiles": true,
  "extendedDiagnostics": true,
  "tscBuild": true,
  "configFilePath": "/home/src/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/home/src/projects/myproject/types/sometype.ts
/home/src/projects/myproject/main.ts
/home/src/projects/myproject/root2/other/sometype2/index.d.ts
/home/src/projects/myproject/src/secondary.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

exitCode:: ExitStatus.undefined
