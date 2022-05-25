Input::
//// [/user/username/projects/myproject/f1.ts]
export const x = 1

//// [/user/username/projects/myproject/f2.ts]
export const y = 1

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

//// [/user/username/projects/myproject/tsconfig.json]
{"compilerOptions":{"composite":true},"include":["./","./**/*.json"]}


/a/lib/tsc.js -w --extendedDiagnostics
Output::
[[90m12:00:23 AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/f1.ts","/user/username/projects/myproject/f2.ts"]
  options: {"composite":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/f1.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/f2.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /a/lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
[[90m12:00:34 AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


Program root files: ["/user/username/projects/myproject/f1.ts","/user/username/projects/myproject/f2.ts"]
Program options: {"composite":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/f1.ts
/user/username/projects/myproject/f2.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/f1.ts
/user/username/projects/myproject/f2.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/f1.ts (computed .d.ts during emit)
/user/username/projects/myproject/f2.ts (computed .d.ts during emit)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/f1.ts:
  {"fileName":"/user/username/projects/myproject/f1.ts","pollingInterval":250}
/user/username/projects/myproject/f2.ts:
  {"fileName":"/user/username/projects/myproject/f2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/f1.js]
"use strict";
exports.__esModule = true;
exports.x = void 0;
exports.x = 1;


//// [/user/username/projects/myproject/f1.d.ts]
export declare const x = 1;


//// [/user/username/projects/myproject/f2.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = 1;


//// [/user/username/projects/myproject/f2.d.ts]
export declare const y = 1;


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./f1.ts","./f2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10906998252-export const x = 1","signature":"-7495133367-export declare const x = 1;\n"},{"version":"-10905812331-export const y = 1","signature":"-6203665398-export declare const y = 1;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./f1.ts",
      "./f2.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./f1.ts": {
        "version": "-10906998252-export const x = 1",
        "signature": "-7495133367-export declare const x = 1;\n"
      },
      "./f2.ts": {
        "version": "-10905812331-export const y = 1",
        "signature": "-6203665398-export declare const y = 1;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./f1.ts",
      "./f2.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 828
}


Change:: Add new file

Input::
//// [/user/username/projects/myproject/new-file.ts]
export const z = 1;


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/new-file.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/new-file.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Reloading new file names and options
Synchronizing program
[[90m12:00:39 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/f1.ts","/user/username/projects/myproject/f2.ts","/user/username/projects/myproject/new-file.ts"]
  options: {"composite":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/new-file.ts 250 undefined Source file
DirectoryWatcher:: Triggered with /user/username/projects/myproject/new-file.js :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected file add/remove of non supported extension: /user/username/projects/myproject/new-file.js
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/new-file.js :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
DirectoryWatcher:: Triggered with /user/username/projects/myproject/new-file.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Project: /user/username/projects/myproject/tsconfig.json Detected output file: /user/username/projects/myproject/new-file.d.ts
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/new-file.d.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
[[90m12:00:47 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/f1.ts","/user/username/projects/myproject/f2.ts","/user/username/projects/myproject/new-file.ts"]
Program options: {"composite":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/f1.ts
/user/username/projects/myproject/f2.ts
/user/username/projects/myproject/new-file.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/new-file.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/new-file.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/f1.ts:
  {"fileName":"/user/username/projects/myproject/f1.ts","pollingInterval":250}
/user/username/projects/myproject/f2.ts:
  {"fileName":"/user/username/projects/myproject/f2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/new-file.ts:
  {"fileName":"/user/username/projects/myproject/new-file.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./f1.ts","./f2.ts","./new-file.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10906998252-export const x = 1","signature":"-7495133367-export declare const x = 1;\n"},{"version":"-10905812331-export const y = 1","signature":"-6203665398-export declare const y = 1;\n"},{"version":"-11960320495-export const z = 1;","signature":"-9207164725-export declare const z = 1;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./f1.ts",
      "./f2.ts",
      "./new-file.ts"
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./f1.ts": {
        "version": "-10906998252-export const x = 1",
        "signature": "-7495133367-export declare const x = 1;\n"
      },
      "./f2.ts": {
        "version": "-10905812331-export const y = 1",
        "signature": "-6203665398-export declare const y = 1;\n"
      },
      "./new-file.ts": {
        "version": "-11960320495-export const z = 1;",
        "signature": "-9207164725-export declare const z = 1;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./f1.ts",
      "./f2.ts",
      "./new-file.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 949
}

//// [/user/username/projects/myproject/new-file.js]
"use strict";
exports.__esModule = true;
exports.z = void 0;
exports.z = 1;


//// [/user/username/projects/myproject/new-file.d.ts]
export declare const z = 1;



Change:: Import new file

Input::
//// [/user/username/projects/myproject/f1.ts]
import { z } from "./new-file";export const x = 1


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/f1.ts 1:: WatchInfo: /user/username/projects/myproject/f1.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/f1.ts 1:: WatchInfo: /user/username/projects/myproject/f1.ts 250 undefined Source file
Synchronizing program
[[90m12:00:53 AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/f1.ts","/user/username/projects/myproject/f2.ts","/user/username/projects/myproject/new-file.ts"]
  options: {"composite":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[[90m12:01:03 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/f1.ts","/user/username/projects/myproject/f2.ts","/user/username/projects/myproject/new-file.ts"]
Program options: {"composite":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
Program structureReused: SafeModules
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/new-file.ts
/user/username/projects/myproject/f1.ts
/user/username/projects/myproject/f2.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/f1.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/f1.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/f1.ts:
  {"fileName":"/user/username/projects/myproject/f1.ts","pollingInterval":250}
/user/username/projects/myproject/f2.ts:
  {"fileName":"/user/username/projects/myproject/f2.ts","pollingInterval":250}
/a/lib/lib.d.ts:
  {"fileName":"/a/lib/lib.d.ts","pollingInterval":250}
/user/username/projects/myproject/new-file.ts:
  {"fileName":"/user/username/projects/myproject/new-file.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/node_modules/@types:
  {"directoryName":"/user/username/projects/myproject/node_modules/@types","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject:
  {"directoryName":"/user/username/projects/myproject","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/f1.js] file written with same contents
//// [/user/username/projects/myproject/f1.d.ts] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../a/lib/lib.d.ts","./new-file.ts","./f1.ts","./f2.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-11960320495-export const z = 1;","signature":"-9207164725-export declare const z = 1;\n"},{"version":"1363236232-import { z } from \"./new-file\";export const x = 1","signature":"-7495133367-export declare const x = 1;\n"},{"version":"-10905812331-export const y = 1","signature":"-6203665398-export declare const y = 1;\n"}],"options":{"composite":true},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,3,4,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../a/lib/lib.d.ts",
      "./new-file.ts",
      "./f1.ts",
      "./f2.ts"
    ],
    "fileNamesList": [
      [
        "./new-file.ts"
      ]
    ],
    "fileInfos": {
      "../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./new-file.ts": {
        "version": "-11960320495-export const z = 1;",
        "signature": "-9207164725-export declare const z = 1;\n"
      },
      "./f1.ts": {
        "version": "1363236232-import { z } from \"./new-file\";export const x = 1",
        "signature": "-7495133367-export declare const x = 1;\n"
      },
      "./f2.ts": {
        "version": "-10905812331-export const y = 1",
        "signature": "-6203665398-export declare const y = 1;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {
      "./f1.ts": [
        "./new-file.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../a/lib/lib.d.ts",
      "./f1.ts",
      "./f2.ts",
      "./new-file.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1005
}

