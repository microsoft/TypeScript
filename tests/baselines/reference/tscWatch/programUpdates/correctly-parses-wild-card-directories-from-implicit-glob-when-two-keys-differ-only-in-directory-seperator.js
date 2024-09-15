currentDirectory:: /user/username/projects/myproject useCaseSensitiveFileNames:: false
Input::
//// [/user/username/projects/myproject/f1.ts]
export const x = 1

//// [/user/username/projects/myproject/f2.ts]
export const y = 1

//// [/user/username/projects/myproject/tsconfig.json]
{
  "compilerOptions": {
    "composite": true
  },
  "include": [
    "./",
    "./**/*.json"
  ]
}

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


/home/src/tslibs/TS/Lib/tsc.js -w --extendedDiagnostics
Output::
[[90mHH:MM:SS AM[0m] Starting compilation in watch mode...

Current directory: /user/username/projects/myproject CaseSensitiveFileNames: false
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/tsconfig.json 2000 undefined Config file
Synchronizing program
CreatingProgramWith::
  roots: ["/user/username/projects/myproject/f1.ts","/user/username/projects/myproject/f2.ts"]
  options: {"composite":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/f1.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /user/username/projects/myproject/f2.ts 250 undefined Source file
FileWatcher:: Added:: WatchInfo: /home/src/tslibs/TS/Lib/lib.d.ts 250 undefined Source file
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject/node_modules/@types 1 undefined Type roots
DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/node_modules/@types 1 undefined Type roots
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.

DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Elapsed:: *ms DirectoryWatcher:: Added:: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


//// [/user/username/projects/myproject/f1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.x = void 0;
exports.x = 1;


//// [/user/username/projects/myproject/f1.d.ts]
export declare const x = 1;


//// [/user/username/projects/myproject/f2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
exports.y = 1;


//// [/user/username/projects/myproject/f2.d.ts]
export declare const y = 1;


//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./f1.ts","./f2.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10906998252-export const x = 1","signature":"-7495133367-export declare const x = 1;\n"},{"version":"-10905812331-export const y = 1","signature":"-6203665398-export declare const y = 1;\n"}],"root":[2,3],"options":{"composite":true},"latestChangedDtsFile":"./f2.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./f1.ts",
    "./f2.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./f1.ts": {
      "original": {
        "version": "-10906998252-export const x = 1",
        "signature": "-7495133367-export declare const x = 1;\n"
      },
      "version": "-10906998252-export const x = 1",
      "signature": "-7495133367-export declare const x = 1;\n"
    },
    "./f2.ts": {
      "original": {
        "version": "-10905812331-export const y = 1",
        "signature": "-6203665398-export declare const y = 1;\n"
      },
      "version": "-10905812331-export const y = 1",
      "signature": "-6203665398-export declare const y = 1;\n"
    }
  },
  "root": [
    [
      2,
      "./f1.ts"
    ],
    [
      3,
      "./f2.ts"
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./f2.d.ts",
  "version": "FakeTSVersion",
  "size": 881
}


PolledWatches::
/user/username/projects/myproject/node_modules/@types: *new*
  {"pollingInterval":500}
/user/username/projects/node_modules/@types: *new*
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts: *new*
  {}
/user/username/projects/myproject/f1.ts: *new*
  {}
/user/username/projects/myproject/f2.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json: *new*
  {}

FsWatchesRecursive::
/user/username/projects/myproject: *new*
  {}

Program root files: [
  "/user/username/projects/myproject/f1.ts",
  "/user/username/projects/myproject/f2.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/f1.ts
/user/username/projects/myproject/f2.ts

Semantic diagnostics in builder refreshed for::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/f1.ts
/user/username/projects/myproject/f2.ts

Shape signatures in builder refreshed for::
/home/src/tslibs/ts/lib/lib.d.ts (used version)
/user/username/projects/myproject/f1.ts (computed .d.ts during emit)
/user/username/projects/myproject/f2.ts (computed .d.ts during emit)

exitCode:: ExitStatus.undefined

Change:: Add new file

Input::
//// [/user/username/projects/myproject/new-file.ts]
export const z = 1;


Output::
DirectoryWatcher:: Triggered with /user/username/projects/myproject/new-file.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory
Scheduling update
Elapsed:: *ms DirectoryWatcher:: Triggered with /user/username/projects/myproject/new-file.ts :: WatchInfo: /user/username/projects/myproject 1 undefined Wild card directory


Timeout callback:: count: 1
1: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
1: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Reloading new file names and options
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

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
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./f1.ts","./f2.ts","./new-file.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-10906998252-export const x = 1","signature":"-7495133367-export declare const x = 1;\n"},{"version":"-10905812331-export const y = 1","signature":"-6203665398-export declare const y = 1;\n"},{"version":"-11960320495-export const z = 1;","signature":"-9207164725-export declare const z = 1;\n"}],"root":[[2,4]],"options":{"composite":true},"latestChangedDtsFile":"./new-file.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./f1.ts",
    "./f2.ts",
    "./new-file.ts"
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./f1.ts": {
      "original": {
        "version": "-10906998252-export const x = 1",
        "signature": "-7495133367-export declare const x = 1;\n"
      },
      "version": "-10906998252-export const x = 1",
      "signature": "-7495133367-export declare const x = 1;\n"
    },
    "./f2.ts": {
      "original": {
        "version": "-10905812331-export const y = 1",
        "signature": "-6203665398-export declare const y = 1;\n"
      },
      "version": "-10905812331-export const y = 1",
      "signature": "-6203665398-export declare const y = 1;\n"
    },
    "./new-file.ts": {
      "original": {
        "version": "-11960320495-export const z = 1;",
        "signature": "-9207164725-export declare const z = 1;\n"
      },
      "version": "-11960320495-export const z = 1;",
      "signature": "-9207164725-export declare const z = 1;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./f1.ts",
        "./f2.ts",
        "./new-file.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "latestChangedDtsFile": "./new-file.d.ts",
  "version": "FakeTSVersion",
  "size": 1008
}

//// [/user/username/projects/myproject/new-file.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.z = void 0;
exports.z = 1;


//// [/user/username/projects/myproject/new-file.d.ts]
export declare const z = 1;



PolledWatches::
/user/username/projects/myproject/node_modules/@types:
  {"pollingInterval":500}
/user/username/projects/node_modules/@types:
  {"pollingInterval":500}

FsWatches::
/home/src/tslibs/TS/Lib/lib.d.ts:
  {}
/user/username/projects/myproject/f1.ts:
  {}
/user/username/projects/myproject/f2.ts:
  {}
/user/username/projects/myproject/new-file.ts: *new*
  {}
/user/username/projects/myproject/tsconfig.json:
  {}

FsWatchesRecursive::
/user/username/projects/myproject:
  {}


Program root files: [
  "/user/username/projects/myproject/f1.ts",
  "/user/username/projects/myproject/f2.ts",
  "/user/username/projects/myproject/new-file.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: Not
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/f1.ts
/user/username/projects/myproject/f2.ts
/user/username/projects/myproject/new-file.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/new-file.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/new-file.ts (computed .d.ts)

exitCode:: ExitStatus.undefined

Change:: Import new file

Input::
//// [/user/username/projects/myproject/f1.ts]
import { z } from "./new-file";export const x = 1


Output::
FileWatcher:: Triggered with /user/username/projects/myproject/f1.ts 1:: WatchInfo: /user/username/projects/myproject/f1.ts 250 undefined Source file
Scheduling update
Elapsed:: *ms FileWatcher:: Triggered with /user/username/projects/myproject/f1.ts 1:: WatchInfo: /user/username/projects/myproject/f1.ts 250 undefined Source file


Timeout callback:: count: 1
2: timerToUpdateProgram *new*

Before running Timeout callback:: count: 1
2: timerToUpdateProgram

Host is moving to new time
After running Timeout callback:: count: 0
Output::
Synchronizing program
[[90mHH:MM:SS AM[0m] File change detected. Starting incremental compilation...

CreatingProgramWith::
  roots: ["/user/username/projects/myproject/f1.ts","/user/username/projects/myproject/f2.ts","/user/username/projects/myproject/new-file.ts"]
  options: {"composite":true,"watch":true,"extendedDiagnostics":true,"configFilePath":"/user/username/projects/myproject/tsconfig.json"}
[[90mHH:MM:SS AM[0m] Found 0 errors. Watching for file changes.



//// [/user/username/projects/myproject/f1.js] file written with same contents
//// [/user/username/projects/myproject/tsconfig.tsbuildinfo]
{"fileNames":["../../../../home/src/tslibs/ts/lib/lib.d.ts","./new-file.ts","./f1.ts","./f2.ts"],"fileIdsList":[[2]],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-11960320495-export const z = 1;","signature":"-9207164725-export declare const z = 1;\n"},{"version":"1363236232-import { z } from \"./new-file\";export const x = 1","signature":"-7495133367-export declare const x = 1;\n"},{"version":"-10905812331-export const y = 1","signature":"-6203665398-export declare const y = 1;\n"}],"root":[[2,4]],"options":{"composite":true},"referencedMap":[[3,1]],"latestChangedDtsFile":"./new-file.d.ts","version":"FakeTSVersion"}

//// [/user/username/projects/myproject/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "fileNames": [
    "../../../../home/src/tslibs/ts/lib/lib.d.ts",
    "./new-file.ts",
    "./f1.ts",
    "./f2.ts"
  ],
  "fileIdsList": [
    [
      "./new-file.ts"
    ]
  ],
  "fileInfos": {
    "../../../../home/src/tslibs/ts/lib/lib.d.ts": {
      "original": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
      "affectsGlobalScope": true
    },
    "./new-file.ts": {
      "original": {
        "version": "-11960320495-export const z = 1;",
        "signature": "-9207164725-export declare const z = 1;\n"
      },
      "version": "-11960320495-export const z = 1;",
      "signature": "-9207164725-export declare const z = 1;\n"
    },
    "./f1.ts": {
      "original": {
        "version": "1363236232-import { z } from \"./new-file\";export const x = 1",
        "signature": "-7495133367-export declare const x = 1;\n"
      },
      "version": "1363236232-import { z } from \"./new-file\";export const x = 1",
      "signature": "-7495133367-export declare const x = 1;\n"
    },
    "./f2.ts": {
      "original": {
        "version": "-10905812331-export const y = 1",
        "signature": "-6203665398-export declare const y = 1;\n"
      },
      "version": "-10905812331-export const y = 1",
      "signature": "-6203665398-export declare const y = 1;\n"
    }
  },
  "root": [
    [
      [
        2,
        4
      ],
      [
        "./new-file.ts",
        "./f1.ts",
        "./f2.ts"
      ]
    ]
  ],
  "options": {
    "composite": true
  },
  "referencedMap": {
    "./f1.ts": [
      "./new-file.ts"
    ]
  },
  "latestChangedDtsFile": "./new-file.d.ts",
  "version": "FakeTSVersion",
  "size": 1083
}



Program root files: [
  "/user/username/projects/myproject/f1.ts",
  "/user/username/projects/myproject/f2.ts",
  "/user/username/projects/myproject/new-file.ts"
]
Program options: {
  "composite": true,
  "watch": true,
  "extendedDiagnostics": true,
  "configFilePath": "/user/username/projects/myproject/tsconfig.json"
}
Program structureReused: SafeModules
Program files::
/home/src/tslibs/TS/Lib/lib.d.ts
/user/username/projects/myproject/new-file.ts
/user/username/projects/myproject/f1.ts
/user/username/projects/myproject/f2.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/f1.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/f1.ts (computed .d.ts)

exitCode:: ExitStatus.undefined
