currentDirectory:: /src/project useCaseSensitiveFileNames: false
Input::
//// [/src/project/tsconfig.json]
{"compilerOptions":{"composite":true,"traceResolution":true,"outDir":"outDir"}}

//// [/src/project/fileWithImports.ts]
import type { Import0 } from "pkg0";
import type { Import1 } from "pkg1";


//// [/src/project/node_modules/pkg0/index.d.ts]
export interface Import0 {}

//// [/src/project/fileWithTypeRefs.ts]
/// <reference types="pkg2"/>
/// <reference types="pkg3"/>
interface LocalInterface extends Import2, Import3 {}
export {}


//// [/src/project/node_modules/pkg2/index.d.ts]
interface Import2 {}

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


/a/lib/tsc.js -w --explainFiles --extendedDiagnostics
Output::
[[90m12:00:29 AM[0m] Starting compilation in watch mode...

Current directory: /src/project CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /src/project/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts"]
  options: {"composite":true,"traceResolution":true,"outDir":"/src/project/outDir","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /src/project/fileWithImports.ts 250 undefined Source file
======== Resolving module 'pkg0' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg0' from 'node_modules' folder, target file types: TypeScript, Declaration.
File '/src/project/node_modules/pkg0/package.json' does not exist.
File '/src/project/node_modules/pkg0.ts' does not exist.
File '/src/project/node_modules/pkg0.tsx' does not exist.
File '/src/project/node_modules/pkg0.d.ts' does not exist.
File '/src/project/node_modules/pkg0/index.ts' does not exist.
File '/src/project/node_modules/pkg0/index.tsx' does not exist.
File '/src/project/node_modules/pkg0/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg0/index.d.ts', result '/src/project/node_modules/pkg0/index.d.ts'.
======== Module name 'pkg0' was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'. ========
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
Loading module 'pkg1' from 'node_modules' folder, target file types: JavaScript.
File '/src/project/node_modules/pkg1.js' does not exist.
File '/src/project/node_modules/pkg1.jsx' does not exist.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Module name 'pkg1' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg0/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /src/project/fileWithTypeRefs.ts 250 undefined Source file
======== Resolving type reference directive 'pkg2', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types,/src/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types, /src/node_modules/@types, /node_modules/@types'.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg2/package.json' does not exist.
File '/src/project/node_modules/pkg2.d.ts' does not exist.
File '/src/project/node_modules/pkg2/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg2/index.d.ts', result '/src/project/node_modules/pkg2/index.d.ts'.
======== Type reference directive 'pkg2' was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts', primary: false. ========
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types,/src/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types, /src/node_modules/@types, /node_modules/@types'.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules' does not exist, skipping all lookups in it.
Directory '/node_modules' does not exist, skipping all lookups in it.
======== Type reference directive 'pkg3' was not resolved. ========
FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg2/index.d.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project/node_modules/@types 1 undefined Type roots
[96mfileWithImports.ts[0m:[93m2[0m:[93m30[0m - [91merror[0m[90m TS2307: [0mCannot find module 'pkg1' or its corresponding type declarations.

[7m2[0m import type { Import1 } from "pkg1";
[7m [0m [91m                             ~~~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m43[0m - [91merror[0m[90m TS2552: [0mCannot find name 'Import3'. Did you mean 'Import2'?

[7m3[0m interface LocalInterface extends Import2, Import3 {}
[7m [0m [91m                                          ~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by default include pattern '**/*'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by default include pattern '**/*'
[[90m12:00:43 AM[0m] Found 3 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /src/project 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /src/project 1 undefined Wild card directory


Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts"]
Program options: {"composite":true,"traceResolution":true,"outDir":"/src/project/outDir","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/src/project/node_modules/pkg0/index.d.ts (used version)
/src/project/filewithimports.ts (computed .d.ts during emit)
/src/project/node_modules/pkg2/index.d.ts (used version)
/src/project/filewithtyperefs.ts (computed .d.ts during emit)

PolledWatches::
/src/project/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json: *new*
  {}
/src/project/filewithimports.ts: *new*
  {}
/src/project/node_modules/pkg0/index.d.ts: *new*
  {}
/src/project/filewithtyperefs.ts: *new*
  {}
/src/project/node_modules/pkg2/index.d.ts: *new*
  {}
/a/lib/lib.d.ts: *new*
  {}

FsWatchesRecursive::
/src/project/node_modules: *new*
  {}
/src/project: *new*
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/outDir/fileWithImports.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/src/project/outDir/fileWithImports.d.ts]
export {};


//// [/src/project/outDir/fileWithTypeRefs.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference types="pkg2"/>
/// <reference types="pkg3"/>


//// [/src/project/outDir/fileWithTypeRefs.d.ts]
export {};


//// [/src/project/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../a/lib/lib.d.ts","../node_modules/pkg0/index.d.ts","../filewithimports.ts","../node_modules/pkg2/index.d.ts","../filewithtyperefs.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-8124756421-export interface Import0 {}",{"version":"-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-11273315461-interface Import2 {}","affectsGlobalScope":true},{"version":"-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n","signature":"-3531856636-export {};\n"}],"root":[3,5],"options":{"composite":true,"outDir":"./"},"fileIdsList":[[2],[4]],"referencedMap":[[3,1],[5,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,[3,[{"file":"../filewithimports.ts","start":66,"length":6,"messageText":"Cannot find module 'pkg1' or its corresponding type declarations.","category":1,"code":2307}]],[5,[{"file":"../filewithtyperefs.ts","start":102,"length":7,"messageText":"Cannot find name 'Import3'. Did you mean 'Import2'?","category":1,"code":2552}]],2,4],"latestChangedDtsFile":"./fileWithTypeRefs.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../a/lib/lib.d.ts",
      "../node_modules/pkg0/index.d.ts",
      "../filewithimports.ts",
      "../node_modules/pkg2/index.d.ts",
      "../filewithtyperefs.ts"
    ],
    "fileNamesList": [
      [
        "../node_modules/pkg0/index.d.ts"
      ],
      [
        "../node_modules/pkg2/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../node_modules/pkg0/index.d.ts": {
        "version": "-8124756421-export interface Import0 {}",
        "signature": "-8124756421-export interface Import0 {}"
      },
      "../filewithimports.ts": {
        "original": {
          "version": "-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "../node_modules/pkg2/index.d.ts": {
        "original": {
          "version": "-11273315461-interface Import2 {}",
          "affectsGlobalScope": true
        },
        "version": "-11273315461-interface Import2 {}",
        "signature": "-11273315461-interface Import2 {}",
        "affectsGlobalScope": true
      },
      "../filewithtyperefs.ts": {
        "original": {
          "version": "-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        3,
        "../filewithimports.ts"
      ],
      [
        5,
        "../filewithtyperefs.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../filewithimports.ts": [
        "../node_modules/pkg0/index.d.ts"
      ],
      "../filewithtyperefs.ts": [
        "../node_modules/pkg2/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../a/lib/lib.d.ts",
      [
        "../filewithimports.ts",
        [
          {
            "file": "../filewithimports.ts",
            "start": 66,
            "length": 6,
            "messageText": "Cannot find module 'pkg1' or its corresponding type declarations.",
            "category": 1,
            "code": 2307
          }
        ]
      ],
      [
        "../filewithtyperefs.ts",
        [
          {
            "file": "../filewithtyperefs.ts",
            "start": 102,
            "length": 7,
            "messageText": "Cannot find name 'Import3'. Did you mean 'Import2'?",
            "category": 1,
            "code": 2552
          }
        ]
      ],
      "../node_modules/pkg0/index.d.ts",
      "../node_modules/pkg2/index.d.ts"
    ],
    "latestChangedDtsFile": "./fileWithTypeRefs.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1614
}


Change:: write file not resolved by import

Input::
//// [/src/project/node_modules/pkg1/index.d.ts]
export interface Import1 {}


Before running Timeout callback:: count: 2
3: timerToInvalidateFailedLookupResolutions
4: timerToUpdateProgram
After running Timeout callback:: count: 1
5: timerToUpdateProgram
Before running Timeout callback:: count: 1
5: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1 :: WatchInfo: /src/project 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg1/index.d.ts :: WatchInfo: /src/project 1 undefined Wild card directory
Scheduling update
Reloading new file names and options
Synchronizing program
[[90m12:00:50 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts"]
  options: {"composite":true,"traceResolution":true,"outDir":"/src/project/outDir","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
======== Resolving module 'pkg1' from '/src/project/fileWithImports.ts'. ========
Module resolution kind is not specified, using 'Node10'.
Loading module 'pkg1' from 'node_modules' folder, target file types: TypeScript, Declaration.
File '/src/project/node_modules/pkg1/package.json' does not exist.
File '/src/project/node_modules/pkg1.ts' does not exist.
File '/src/project/node_modules/pkg1.tsx' does not exist.
File '/src/project/node_modules/pkg1.d.ts' does not exist.
File '/src/project/node_modules/pkg1/index.ts' does not exist.
File '/src/project/node_modules/pkg1/index.tsx' does not exist.
File '/src/project/node_modules/pkg1/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg1/index.d.ts', result '/src/project/node_modules/pkg1/index.d.ts'.
======== Module name 'pkg1' was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'. ========
FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg1/index.d.ts 250 undefined Source file
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
Reusing resolution of type reference directive 'pkg3' from '/src/project/fileWithTypeRefs.ts' of old program, it was not resolved.
[96mfileWithTypeRefs.ts[0m:[93m2[0m:[93m23[0m - [91merror[0m[90m TS2688: [0mCannot find type definition file for 'pkg3'.

[7m2[0m /// <reference types="pkg3"/>
[7m [0m [91m                      ~~~~[0m

[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m43[0m - [91merror[0m[90m TS2552: [0mCannot find name 'Import3'. Did you mean 'Import2'?

[7m3[0m interface LocalInterface extends Import2, Import3 {}
[7m [0m [91m                                          ~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
node_modules/pkg1/index.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by default include pattern '**/*'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by default include pattern '**/*'
[[90m12:00:57 AM[0m] Found 2 errors. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts"]
Program options: {"composite":true,"traceResolution":true,"outDir":"/src/project/outDir","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/node_modules/pkg1/index.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/fileWithTypeRefs.ts

Semantic diagnostics in builder refreshed for::
/src/project/node_modules/pkg1/index.d.ts
/src/project/fileWithImports.ts

Shape signatures in builder refreshed for::
/src/project/node_modules/pkg1/index.d.ts (used version)
/src/project/filewithimports.ts (computed .d.ts)

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/node_modules/pkg0/index.d.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg1/index.d.ts: *new*
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/outDir/fileWithImports.js] file written with same contents
//// [/src/project/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../a/lib/lib.d.ts","../node_modules/pkg0/index.d.ts","../node_modules/pkg1/index.d.ts","../filewithimports.ts","../node_modules/pkg2/index.d.ts","../filewithtyperefs.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-8124756421-export interface Import0 {}","-8124720484-export interface Import1 {}",{"version":"-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-11273315461-interface Import2 {}","affectsGlobalScope":true},{"version":"-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n","signature":"-3531856636-export {};\n"}],"root":[4,6],"options":{"composite":true,"outDir":"./"},"fileIdsList":[[2,3],[5]],"referencedMap":[[4,1],[6,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,[6,[{"file":"../filewithtyperefs.ts","start":102,"length":7,"messageText":"Cannot find name 'Import3'. Did you mean 'Import2'?","category":1,"code":2552}]],2,3,5],"latestChangedDtsFile":"./fileWithTypeRefs.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../a/lib/lib.d.ts",
      "../node_modules/pkg0/index.d.ts",
      "../node_modules/pkg1/index.d.ts",
      "../filewithimports.ts",
      "../node_modules/pkg2/index.d.ts",
      "../filewithtyperefs.ts"
    ],
    "fileNamesList": [
      [
        "../node_modules/pkg0/index.d.ts",
        "../node_modules/pkg1/index.d.ts"
      ],
      [
        "../node_modules/pkg2/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../node_modules/pkg0/index.d.ts": {
        "version": "-8124756421-export interface Import0 {}",
        "signature": "-8124756421-export interface Import0 {}"
      },
      "../node_modules/pkg1/index.d.ts": {
        "version": "-8124720484-export interface Import1 {}",
        "signature": "-8124720484-export interface Import1 {}"
      },
      "../filewithimports.ts": {
        "original": {
          "version": "-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "../node_modules/pkg2/index.d.ts": {
        "original": {
          "version": "-11273315461-interface Import2 {}",
          "affectsGlobalScope": true
        },
        "version": "-11273315461-interface Import2 {}",
        "signature": "-11273315461-interface Import2 {}",
        "affectsGlobalScope": true
      },
      "../filewithtyperefs.ts": {
        "original": {
          "version": "-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        4,
        "../filewithimports.ts"
      ],
      [
        6,
        "../filewithtyperefs.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../filewithimports.ts": [
        "../node_modules/pkg0/index.d.ts",
        "../node_modules/pkg1/index.d.ts"
      ],
      "../filewithtyperefs.ts": [
        "../node_modules/pkg2/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../a/lib/lib.d.ts",
      "../filewithimports.ts",
      [
        "../filewithtyperefs.ts",
        [
          {
            "file": "../filewithtyperefs.ts",
            "start": 102,
            "length": 7,
            "messageText": "Cannot find name 'Import3'. Did you mean 'Import2'?",
            "category": 1,
            "code": 2552
          }
        ]
      ],
      "../node_modules/pkg0/index.d.ts",
      "../node_modules/pkg1/index.d.ts",
      "../node_modules/pkg2/index.d.ts"
    ],
    "latestChangedDtsFile": "./fileWithTypeRefs.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1528
}


Change:: write file not resolved by typeRef

Input::
//// [/src/project/node_modules/pkg3/index.d.ts]
export interface Import3 {}


Before running Timeout callback:: count: 2
8: timerToInvalidateFailedLookupResolutions
9: timerToUpdateProgram
After running Timeout callback:: count: 1
10: timerToUpdateProgram
Before running Timeout callback:: count: 1
10: timerToUpdateProgram
After running Timeout callback:: count: 0
Output::
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3 :: WatchInfo: /src/project 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
Scheduling invalidateFailedLookup, Cancelled earlier one
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project/node_modules 1 undefined Failed Lookup Locations
DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /src/project/node_modules/pkg3/index.d.ts :: WatchInfo: /src/project 1 undefined Wild card directory
Scheduling update
Reloading new file names and options
Synchronizing program
[[90m12:01:06 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts"]
  options: {"composite":true,"traceResolution":true,"outDir":"/src/project/outDir","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Reusing resolution of module 'pkg0' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg0/index.d.ts'.
Reusing resolution of module 'pkg1' from '/src/project/fileWithImports.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg1/index.d.ts'.
Reusing resolution of type reference directive 'pkg2' from '/src/project/fileWithTypeRefs.ts' of old program, it was successfully resolved to '/src/project/node_modules/pkg2/index.d.ts'.
======== Resolving type reference directive 'pkg3', containing file '/src/project/fileWithTypeRefs.ts', root directory '/src/project/node_modules/@types,/src/node_modules/@types,/node_modules/@types'. ========
Resolving with primary search path '/src/project/node_modules/@types, /src/node_modules/@types, /node_modules/@types'.
Directory '/src/project/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/src/node_modules/@types' does not exist, skipping all lookups in it.
Directory '/node_modules/@types' does not exist, skipping all lookups in it.
Looking up in 'node_modules' folder, initial location '/src/project'.
File '/src/project/node_modules/pkg3/package.json' does not exist.
File '/src/project/node_modules/pkg3.d.ts' does not exist.
File '/src/project/node_modules/pkg3/index.d.ts' exists - use it as a name resolution result.
Resolving real path for '/src/project/node_modules/pkg3/index.d.ts', result '/src/project/node_modules/pkg3/index.d.ts'.
======== Type reference directive 'pkg3' was successfully resolved to '/src/project/node_modules/pkg3/index.d.ts', primary: false. ========
FileWatcher:: Added:: WatchInfo: /src/project/node_modules/pkg3/index.d.ts 250 undefined Source file
[96mfileWithTypeRefs.ts[0m:[93m3[0m:[93m43[0m - [91merror[0m[90m TS2552: [0mCannot find name 'Import3'. Did you mean 'Import2'?

[7m3[0m interface LocalInterface extends Import2, Import3 {}
[7m [0m [91m                                          ~~~~~~~[0m

../../a/lib/lib.d.ts
  Default library for target 'es5'
node_modules/pkg0/index.d.ts
  Imported via "pkg0" from file 'fileWithImports.ts'
node_modules/pkg1/index.d.ts
  Imported via "pkg1" from file 'fileWithImports.ts'
fileWithImports.ts
  Matched by default include pattern '**/*'
node_modules/pkg2/index.d.ts
  Type library referenced via 'pkg2' from file 'fileWithTypeRefs.ts'
node_modules/pkg3/index.d.ts
  Type library referenced via 'pkg3' from file 'fileWithTypeRefs.ts'
fileWithTypeRefs.ts
  Matched by default include pattern '**/*'
[[90m12:01:13 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/src/project/fileWithImports.ts","/src/project/fileWithTypeRefs.ts"]
Program options: {"composite":true,"traceResolution":true,"outDir":"/src/project/outDir","watch":true,"explainFiles":true,"extendedDiagnostics":true,"configFilePath":"/src/project/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/src/project/node_modules/pkg0/index.d.ts
/src/project/node_modules/pkg1/index.d.ts
/src/project/fileWithImports.ts
/src/project/node_modules/pkg2/index.d.ts
/src/project/node_modules/pkg3/index.d.ts
/src/project/fileWithTypeRefs.ts

Semantic diagnostics in builder refreshed for::
/src/project/node_modules/pkg3/index.d.ts
/src/project/fileWithTypeRefs.ts

Shape signatures in builder refreshed for::
/src/project/node_modules/pkg3/index.d.ts (used version)
/src/project/filewithtyperefs.ts (computed .d.ts)

PolledWatches::
/src/project/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/src/project/tsconfig.json:
  {}
/src/project/filewithimports.ts:
  {}
/src/project/node_modules/pkg0/index.d.ts:
  {}
/src/project/filewithtyperefs.ts:
  {}
/src/project/node_modules/pkg2/index.d.ts:
  {}
/a/lib/lib.d.ts:
  {}
/src/project/node_modules/pkg1/index.d.ts:
  {}
/src/project/node_modules/pkg3/index.d.ts: *new*
  {}

FsWatchesRecursive::
/src/project/node_modules:
  {}
/src/project:
  {}

exitCode:: ExitStatus.undefined

//// [/src/project/outDir/fileWithTypeRefs.js] file written with same contents
//// [/src/project/outDir/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../a/lib/lib.d.ts","../node_modules/pkg0/index.d.ts","../node_modules/pkg1/index.d.ts","../filewithimports.ts","../node_modules/pkg2/index.d.ts","../node_modules/pkg3/index.d.ts","../filewithtyperefs.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-8124756421-export interface Import0 {}","-8124720484-export interface Import1 {}",{"version":"-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n","signature":"-3531856636-export {};\n"},{"version":"-11273315461-interface Import2 {}","affectsGlobalScope":true},"-8124648610-export interface Import3 {}",{"version":"-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n","signature":"-3531856636-export {};\n"}],"root":[4,7],"options":{"composite":true,"outDir":"./"},"fileIdsList":[[2,3],[5,6]],"referencedMap":[[4,1],[7,2]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,4,[7,[{"file":"../filewithtyperefs.ts","start":102,"length":7,"messageText":"Cannot find name 'Import3'. Did you mean 'Import2'?","category":1,"code":2552}]],2,3,5,6],"latestChangedDtsFile":"./fileWithTypeRefs.d.ts"},"version":"FakeTSVersion"}

//// [/src/project/outDir/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../a/lib/lib.d.ts",
      "../node_modules/pkg0/index.d.ts",
      "../node_modules/pkg1/index.d.ts",
      "../filewithimports.ts",
      "../node_modules/pkg2/index.d.ts",
      "../node_modules/pkg3/index.d.ts",
      "../filewithtyperefs.ts"
    ],
    "fileNamesList": [
      [
        "../node_modules/pkg0/index.d.ts",
        "../node_modules/pkg1/index.d.ts"
      ],
      [
        "../node_modules/pkg2/index.d.ts",
        "../node_modules/pkg3/index.d.ts"
      ]
    ],
    "fileInfos": {
      "../../../a/lib/lib.d.ts": {
        "original": {
          "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
          "affectsGlobalScope": true
        },
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../node_modules/pkg0/index.d.ts": {
        "version": "-8124756421-export interface Import0 {}",
        "signature": "-8124756421-export interface Import0 {}"
      },
      "../node_modules/pkg1/index.d.ts": {
        "version": "-8124720484-export interface Import1 {}",
        "signature": "-8124720484-export interface Import1 {}"
      },
      "../filewithimports.ts": {
        "original": {
          "version": "-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-14287751515-import type { Import0 } from \"pkg0\";\nimport type { Import1 } from \"pkg1\";\n",
        "signature": "-3531856636-export {};\n"
      },
      "../node_modules/pkg2/index.d.ts": {
        "original": {
          "version": "-11273315461-interface Import2 {}",
          "affectsGlobalScope": true
        },
        "version": "-11273315461-interface Import2 {}",
        "signature": "-11273315461-interface Import2 {}",
        "affectsGlobalScope": true
      },
      "../node_modules/pkg3/index.d.ts": {
        "version": "-8124648610-export interface Import3 {}",
        "signature": "-8124648610-export interface Import3 {}"
      },
      "../filewithtyperefs.ts": {
        "original": {
          "version": "-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n",
          "signature": "-3531856636-export {};\n"
        },
        "version": "-12735305811-/// <reference types=\"pkg2\"/>\n/// <reference types=\"pkg3\"/>\ninterface LocalInterface extends Import2, Import3 {}\nexport {}\n",
        "signature": "-3531856636-export {};\n"
      }
    },
    "root": [
      [
        4,
        "../filewithimports.ts"
      ],
      [
        7,
        "../filewithtyperefs.ts"
      ]
    ],
    "options": {
      "composite": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../filewithimports.ts": [
        "../node_modules/pkg0/index.d.ts",
        "../node_modules/pkg1/index.d.ts"
      ],
      "../filewithtyperefs.ts": [
        "../node_modules/pkg2/index.d.ts",
        "../node_modules/pkg3/index.d.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../a/lib/lib.d.ts",
      "../filewithimports.ts",
      [
        "../filewithtyperefs.ts",
        [
          {
            "file": "../filewithtyperefs.ts",
            "start": 102,
            "length": 7,
            "messageText": "Cannot find name 'Import3'. Did you mean 'Import2'?",
            "category": 1,
            "code": 2552
          }
        ]
      ],
      "../node_modules/pkg0/index.d.ts",
      "../node_modules/pkg1/index.d.ts",
      "../node_modules/pkg2/index.d.ts",
      "../node_modules/pkg3/index.d.ts"
    ],
    "latestChangedDtsFile": "./fileWithTypeRefs.d.ts"
  },
  "version": "FakeTSVersion",
  "size": 1608
}

