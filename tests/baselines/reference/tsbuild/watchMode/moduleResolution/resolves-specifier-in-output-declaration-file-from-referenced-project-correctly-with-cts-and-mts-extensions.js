Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"module"}

//// [/user/username/projects/myproject/packages/pkg1/index.ts]
import type { TheNum } from 'pkg2'
export const theNum: TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg1/tsconfig.json]
{"compilerOptions":{"outDir":"build","module":"node12"},"references":[{"path":"../pkg2"}]}

//// [/user/username/projects/myproject/packages/pkg2/const.cts]
export type TheNum = 42;

//// [/user/username/projects/myproject/packages/pkg2/index.ts]
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/tsconfig.json]
{"compilerOptions":{"composite":true,"outDir":"build","module":"node12"}}

//// [/user/username/projects/myproject/packages/pkg2/package.json]
{"name":"pkg2","version":"1.0.0","main":"build/index.js","type":"module"}

//// [/user/username/projects/myproject/node_modules/pkg2] symlink(/user/username/projects/myproject/packages/pkg2)
//// [/a/lib/lib.es2020.full.d.ts]
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


/a/lib/tsc.js -b packages/pkg1 -w --verbose --traceResolution
Output::
>> Screen clear
[[90m12:00:41 AM[0m] Starting compilation in watch mode...

[[90m12:00:42 AM[0m] Projects in this build: 
    * packages/pkg2/tsconfig.json
    * packages/pkg1/tsconfig.json

[[90m12:00:43 AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because output file 'packages/pkg2/build/const.cjs' does not exist

[[90m12:00:44 AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.ts'. ========
Module resolution kind is not specified, using 'Node12'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.d.ts' does not exist.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[[90m12:01:00 AM[0m] Project 'packages/pkg1/tsconfig.json' is out of date because output file 'packages/pkg1/build/index.js' does not exist

[[90m12:01:01 AM[0m] Building project '/user/username/projects/myproject/packages/pkg1/tsconfig.json'...

Found 'package.json' at '/user/username/projects/myproject/packages/pkg1/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module 'pkg2' from '/user/username/projects/myproject/packages/pkg1/index.ts'. ========
Module resolution kind is not specified, using 'Node12'.
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
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' exist - use it as a name resolution result.
File '/user/username/projects/myproject/node_modules/pkg2/build/index.js' has an unsupported extension, so skipping it.
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
File '/user/username/projects/myproject/packages/pkg2/build/package.json' does not exist.
Found 'package.json' at '/user/username/projects/myproject/packages/pkg2/package.json'.
'package.json' does not have a 'typesVersions' field.
======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/build/index.d.ts'. ========
Using compiler options of project reference redirect '/user/username/projects/myproject/packages/pkg2/tsconfig.json'.
Module resolution kind is not specified, using 'Node12'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/build/const.cjs', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/build/const.cjs.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.cjs.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.cjs.d.ts' does not exist.
File name '/user/username/projects/myproject/packages/pkg2/build/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/build/const.cts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/build/const.d.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/build/const.d.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[[90m12:01:07 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/packages/pkg2/const.cts","/user/username/projects/myproject/packages/pkg2/index.ts"]
Program options: {"composite":true,"outDir":"/user/username/projects/myproject/packages/pkg2/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2020.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2020.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2020.full.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/const.cts (used version)
/user/username/projects/myproject/packages/pkg2/index.ts (used version)

Program root files: ["/user/username/projects/myproject/packages/pkg1/index.ts"]
Program options: {"outDir":"/user/username/projects/myproject/packages/pkg1/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2020.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.es2020.full.d.ts
/user/username/projects/myproject/packages/pkg2/build/index.d.ts
/user/username/projects/myproject/packages/pkg1/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.es2020.full.d.ts (used version)
/user/username/projects/myproject/packages/pkg2/build/index.d.ts (used version)
/user/username/projects/myproject/packages/pkg1/index.ts (used version)

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/pkg2/build/const.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/const.d.cts]
export declare type TheNum = 42;


//// [/user/username/projects/myproject/packages/pkg2/build/index.js]
export {};


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.ts]
export type { TheNum } from './const.cjs';


//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.es2020.full.d.ts","../const.cts","../index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-11202312776-export type TheNum = 42;","-9668872159-export type { TheNum } from './const.cjs';"],"options":{"composite":true,"module":100,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.es2020.full.d.ts",
      "../const.cts",
      "../index.ts"
    ],
    "fileNamesList": [
      [
        "../const.cts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.es2020.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../const.cts": {
        "version": "-11202312776-export type TheNum = 42;",
        "signature": "-11202312776-export type TheNum = 42;"
      },
      "../index.ts": {
        "version": "-9668872159-export type { TheNum } from './const.cjs';",
        "signature": "-9668872159-export type { TheNum } from './const.cjs';"
      }
    },
    "options": {
      "composite": true,
      "module": 100,
      "outDir": "./"
    },
    "referencedMap": {
      "../index.ts": [
        "../const.cts"
      ]
    },
    "exportedModulesMap": {
      "../index.ts": [
        "../const.cts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.es2020.full.d.ts",
      "../const.cts",
      "../index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 808
}

//// [/user/username/projects/myproject/packages/pkg1/build/index.js]
export const theNum = 42;



Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"commonjs"}


Output::

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: removes those errors when a package file is changed back

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"module"}


Output::

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: reports import errors after change to package file

Input::
//// [/user/username/projects/myproject/packages/pkg1/package.json]
{"name":"pkg1","version":"1.0.0","main":"build/index.js","type":"commonjs"}


Output::

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: removes those errors when a package file is changed to cjs extensions

Input::
//// [/user/username/projects/myproject/packages/pkg2/package.json] file written with same contents
//// [/user/username/projects/myproject/packages/pkg2/index.cts]
export type { TheNum } from './const.cjs';

//// [/user/username/projects/myproject/packages/pkg2/index.ts] deleted

Output::
>> Screen clear
[[90m12:01:23 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:24 AM[0m] Project 'packages/pkg2/tsconfig.json' is out of date because oldest output 'packages/pkg2/build/const.cjs' is older than newest input 'packages/pkg2/index.cts'

[[90m12:01:25 AM[0m] Building project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...

======== Resolving module './const.cjs' from '/user/username/projects/myproject/packages/pkg2/index.cts'. ========
Module resolution kind is not specified, using 'Node12'.
Loading module as file / folder, candidate module location '/user/username/projects/myproject/packages/pkg2/const.cjs', target file type 'TypeScript'.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.ts' does not exist.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.tsx' does not exist.
File '/user/username/projects/myproject/packages/pkg2/const.cjs.d.ts' does not exist.
File name '/user/username/projects/myproject/packages/pkg2/const.cjs' has a '.cjs' extension - stripping it.
File '/user/username/projects/myproject/packages/pkg2/const.cts' exist - use it as a name resolution result.
======== Module name './const.cjs' was successfully resolved to '/user/username/projects/myproject/packages/pkg2/const.cts'. ========
File '/a/lib/package.json' does not exist.
File '/a/package.json' does not exist.
File '/package.json' does not exist.
[[90m12:01:34 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/packages/pkg2/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/packages/pkg2/const.cts","/user/username/projects/myproject/packages/pkg2/index.cts"]
Program options: {"composite":true,"outDir":"/user/username/projects/myproject/packages/pkg2/build","module":100,"watch":true,"traceResolution":true,"configFilePath":"/user/username/projects/myproject/packages/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.es2020.full.d.ts
/user/username/projects/myproject/packages/pkg2/const.cts
/user/username/projects/myproject/packages/pkg2/index.cts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/index.cts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/packages/pkg2/index.cts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/packages/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/const.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/const.cts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/packages/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/packages/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/packages/pkg2/index.cts:
  {"fileName":"/user/username/projects/myproject/packages/pkg2/index.cts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/packages/pkg2:
  {"directoryName":"/user/username/projects/myproject/packages/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/packages/pkg1:
  {"directoryName":"/user/username/projects/myproject/packages/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/packages/pkg2/build/const.cjs] file changed its modified time
//// [/user/username/projects/myproject/packages/pkg2/build/const.d.cts] file changed its modified time
//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../../../a/lib/lib.es2020.full.d.ts","../const.cts","../index.cts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},"-11202312776-export type TheNum = 42;",{"version":"-9668872159-export type { TheNum } from './const.cjs';","signature":"-9835135925-export type { TheNum } from './const.cjs';\n"}],"options":{"composite":true,"module":100,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[[3,1]],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/packages/pkg2/build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../../../a/lib/lib.es2020.full.d.ts",
      "../const.cts",
      "../index.cts"
    ],
    "fileNamesList": [
      [
        "../const.cts"
      ]
    ],
    "fileInfos": {
      "../../../../../../../a/lib/lib.es2020.full.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "../const.cts": {
        "version": "-11202312776-export type TheNum = 42;",
        "signature": "-11202312776-export type TheNum = 42;"
      },
      "../index.cts": {
        "version": "-9668872159-export type { TheNum } from './const.cjs';",
        "signature": "-9835135925-export type { TheNum } from './const.cjs';\n"
      }
    },
    "options": {
      "composite": true,
      "module": 100,
      "outDir": "./"
    },
    "referencedMap": {
      "../index.cts": [
        "../const.cts"
      ]
    },
    "exportedModulesMap": {
      "../index.cts": [
        "../const.cts"
      ]
    },
    "semanticDiagnosticsPerFile": [
      "../../../../../../../a/lib/lib.es2020.full.d.ts",
      "../const.cts",
      "../index.cts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 892
}

//// [/user/username/projects/myproject/packages/pkg2/build/index.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/user/username/projects/myproject/packages/pkg2/build/index.d.cts]
export type { TheNum } from './const.cjs';


