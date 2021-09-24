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

//// [/a/b/tsconfig.json]
{"references":[{"path":"./project1.tsconfig.json"},{"path":"./project2.tsconfig.json"}],"files":[]}

//// [/a/b/alpha.tsconfig.json]
{"compilerOptions":{"strict":true}}

//// [/a/b/project1.tsconfig.json]
{"extends":"./alpha.tsconfig.json","compilerOptions":{"composite":true},"files":["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]}

//// [/a/b/commonFile1.ts]
let x = 1

//// [/a/b/commonFile2.ts]
let y = 1

//// [/a/b/bravo.tsconfig.json]
{"compilerOptions":{"strict":true}}

//// [/a/b/project2.tsconfig.json]
{"extends":"./bravo.tsconfig.json","compilerOptions":{"composite":true},"files":["/a/b/other.ts"]}

//// [/a/b/other.ts]
let z = 0;


/a/lib/tsc.js -b -w -v
Output::
>> Screen clear
[[90m12:00:27 AM[0m] Starting compilation in watch mode...

[[90m12:00:28 AM[0m] Projects in this build: 
    * project1.tsconfig.json
    * project2.tsconfig.json
    * tsconfig.json

[[90m12:00:29 AM[0m] Project 'project1.tsconfig.json' is out of date because output file 'commonFile1.js' does not exist

[[90m12:00:30 AM[0m] Building project '/a/b/project1.tsconfig.json'...

[[90m12:00:43 AM[0m] Project 'project2.tsconfig.json' is out of date because output file 'other.js' does not exist

[[90m12:00:44 AM[0m] Building project '/a/b/project2.tsconfig.json'...

[[90m12:00:53 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/a/b/commonFile1.ts","/a/b/commonFile2.ts"]
Program options: {"strict":true,"composite":true,"watch":true,"configFilePath":"/a/b/project1.tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/commonFile1.ts
/a/b/commonFile2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/commonfile1.ts (used version)
/a/b/commonfile2.ts (used version)

Program root files: ["/a/b/other.ts"]
Program options: {"strict":true,"composite":true,"watch":true,"configFilePath":"/a/b/project2.tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/a/b/other.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/a/b/other.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/a/b/other.ts (used version)

WatchedFiles::
/a/b/project1.tsconfig.json:
  {"fileName":"/a/b/project1.tsconfig.json","pollingInterval":250}
/a/b/alpha.tsconfig.json:
  {"fileName":"/a/b/alpha.tsconfig.json","pollingInterval":250}
/a/b/commonfile1.ts:
  {"fileName":"/a/b/commonFile1.ts","pollingInterval":250}
/a/b/commonfile2.ts:
  {"fileName":"/a/b/commonFile2.ts","pollingInterval":250}
/a/b/project2.tsconfig.json:
  {"fileName":"/a/b/project2.tsconfig.json","pollingInterval":250}
/a/b/bravo.tsconfig.json:
  {"fileName":"/a/b/bravo.tsconfig.json","pollingInterval":250}
/a/b/other.ts:
  {"fileName":"/a/b/other.ts","pollingInterval":250}
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

//// [/a/b/commonFile1.js]
"use strict";
var x = 1;


//// [/a/b/commonFile1.d.ts]
declare let x: number;


//// [/a/b/commonFile2.js]
"use strict";
var y = 1;


//// [/a/b/commonFile2.d.ts]
declare let y: number;


//// [/a/b/project1.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./commonfile1.ts","./commonfile2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2167136208-let x = 1","affectsGlobalScope":true},{"version":"2168322129-let y = 1","affectsGlobalScope":true}],"options":{"composite":true,"strict":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,3,1]},"version":"FakeTSVersion"}

//// [/a/b/project1.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./commonfile1.ts",
      "./commonfile2.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./commonfile1.ts": {
        "version": "2167136208-let x = 1",
        "signature": "2167136208-let x = 1",
        "affectsGlobalScope": true
      },
      "./commonfile2.ts": {
        "version": "2168322129-let y = 1",
        "signature": "2168322129-let y = 1",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "strict": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "./commonfile1.ts",
      "./commonfile2.ts",
      "../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 767
}

//// [/a/b/other.js]
"use strict";
var z = 0;


//// [/a/b/other.d.ts]
declare let z: number;


//// [/a/b/project2.tsconfig.tsbuildinfo]
{"program":{"fileNames":["../lib/lib.d.ts","./other.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"2874288940-let z = 0;","affectsGlobalScope":true}],"options":{"composite":true,"strict":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[2,1]},"version":"FakeTSVersion"}

//// [/a/b/project2.tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../lib/lib.d.ts",
      "./other.ts"
    ],
    "fileInfos": {
      "../lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./other.ts": {
        "version": "2874288940-let z = 0;",
        "signature": "2874288940-let z = 0;",
        "affectsGlobalScope": true
      }
    },
    "options": {
      "composite": true,
      "strict": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "./other.ts",
      "../lib/lib.d.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 680
}


Change:: Remove project2 from base config

Input::
//// [/a/b/tsconfig.json]
{"references":[{"path":"./project1.tsconfig.json"}],"files":[]}


Output::
>> Screen clear
[[90m12:00:56 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:57 AM[0m] Found 0 errors. Watching for file changes.



WatchedFiles::
/a/b/project1.tsconfig.json:
  {"fileName":"/a/b/project1.tsconfig.json","pollingInterval":250}
/a/b/alpha.tsconfig.json:
  {"fileName":"/a/b/alpha.tsconfig.json","pollingInterval":250}
/a/b/commonfile1.ts:
  {"fileName":"/a/b/commonFile1.ts","pollingInterval":250}
/a/b/commonfile2.ts:
  {"fileName":"/a/b/commonFile2.ts","pollingInterval":250}
/a/b/tsconfig.json:
  {"fileName":"/a/b/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::

exitCode:: ExitStatus.undefined

