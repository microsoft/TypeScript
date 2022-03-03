Input::
//// [/user/username/projects/noEmitOnError/tsconfig.json]
{
    "compilerOptions": {
        "outDir": "./dev-build",
        "noEmitOnError": true
    }
}


//// [/user/username/projects/noEmitOnError/shared/types/db.ts]
export interface A {
    name: string;
}

//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
;

//// [/user/username/projects/noEmitOnError/src/other.ts]
console.log("hi");
export { }

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
interface ReadonlyArray<T> {}
declare const console: { log(msg: any): void; };


/a/lib/tsc.js -b -w -verbose --incremental
Output::
>> Screen clear
[[90m12:00:31 AM[0m] Starting compilation in watch mode...

[[90m12:00:32 AM[0m] Projects in this build: 
    * tsconfig.json

[[90m12:00:33 AM[0m] Project 'tsconfig.json' is out of date because output file 'dev-build/shared/types/db.js' does not exist

[[90m12:00:34 AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m

  [96msrc/main.ts[0m:[93m2[0m:[93m11[0m
    [7m2[0m const a = {
    [7m [0m [96m          ~[0m
    The parser expected to find a '}' to match the '{' token here.

[[90m12:00:35 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Output::
>> Screen clear
[[90m12:00:39 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:40 AM[0m] Project 'tsconfig.json' is out of date because output file 'dev-build/shared/types/db.js' does not exist

[[90m12:00:41 AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m4[0m:[93m1[0m - [91merror[0m[90m TS1005: [0m',' expected.

[7m4[0m ;
[7m [0m [91m~[0m

  [96msrc/main.ts[0m:[93m2[0m:[93m11[0m
    [7m2[0m const a = {
    [7m [0m [96m          ~[0m
    The parser expected to find a '}' to match the '{' token here.

[[90m12:00:42 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

No cached semantic diagnostics in the builder::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Fix Syntax error

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a = {
    lastName: 'sdsd'
};


Output::
>> Screen clear
[[90m12:00:46 AM[0m] File change detected. Starting incremental compilation...

[[90m12:00:47 AM[0m] Project 'tsconfig.json' is out of date because output file 'dev-build/shared/types/db.js' does not exist

[[90m12:00:48 AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90m12:01:09 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/noemitonerror/shared/types/db.ts (computed .d.ts)
/user/username/projects/noemitonerror/src/main.ts (computed .d.ts)
/user/username/projects/noemitonerror/src/other.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js]
"use strict";
exports.__esModule = true;


//// [/user/username/projects/noEmitOnError/dev-build/src/main.js]
"use strict";
exports.__esModule = true;
var a = {
    lastName: 'sdsd'
};


//// [/user/username/projects/noEmitOnError/dev-build/src/other.js]
"use strict";
exports.__esModule = true;
console.log("hi");


//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9621097780-export interface A {\r\n    name: string;\r\n}","signature":"-5014788164-export interface A {\n    name: string;\n}\n"},{"version":"-2574605496-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};","signature":"-3531856636-export {};\n"},{"version":"11373096570-console.log(\"hi\");\r\nexport { }","signature":"-3531856636-export {};\n"}],"options":{"noEmitOnError":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ],
    "fileNamesList": [
      [
        "../shared/types/db.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../shared/types/db.ts": {
        "version": "-9621097780-export interface A {\r\n    name: string;\r\n}",
        "signature": "-5014788164-export interface A {\n    name: string;\n}\n"
      },
      "../src/main.ts": {
        "version": "-2574605496-import { A } from \"../shared/types/db\";\nconst a = {\n    lastName: 'sdsd'\n};",
        "signature": "-3531856636-export {};\n"
      },
      "../src/other.ts": {
        "version": "11373096570-console.log(\"hi\");\r\nexport { }",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "noEmitOnError": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1181
}


Change:: Semantic Error

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a: string = 10;


Output::
>> Screen clear
[[90m12:01:13 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:14 AM[0m] Project 'tsconfig.json' is out of date because oldest output 'dev-build/shared/types/db.js' is older than newest input 'src/main.ts'

[[90m12:01:15 AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m const a: string = 10;
[7m [0m [91m      ~[0m

[[90m12:01:22 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/noEmitOnError/src/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/noemitonerror/src/main.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9621097780-export interface A {\r\n    name: string;\r\n}","signature":"-5014788164-export interface A {\n    name: string;\n}\n"},{"version":"-11111345725-import { A } from \"../shared/types/db\";\nconst a: string = 10;","signature":"-3531856636-export {};\n"},{"version":"11373096570-console.log(\"hi\");\r\nexport { }","signature":"-3531856636-export {};\n"}],"options":{"noEmitOnError":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,[3,[{"file":"../src/main.ts","start":46,"length":1,"code":2322,"category":1,"messageText":"Type 'number' is not assignable to type 'string'."}]],4],"affectedFilesPendingEmit":[[3,1]]},"version":"FakeTSVersion"}

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ],
    "fileNamesList": [
      [
        "../shared/types/db.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../shared/types/db.ts": {
        "version": "-9621097780-export interface A {\r\n    name: string;\r\n}",
        "signature": "-5014788164-export interface A {\n    name: string;\n}\n"
      },
      "../src/main.ts": {
        "version": "-11111345725-import { A } from \"../shared/types/db\";\nconst a: string = 10;",
        "signature": "-3531856636-export {};\n"
      },
      "../src/other.ts": {
        "version": "11373096570-console.log(\"hi\");\r\nexport { }",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "noEmitOnError": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../shared/types/db.ts",
      [
        "../src/main.ts",
        [
          {
            "file": "../src/main.ts",
            "start": 46,
            "length": 1,
            "code": 2322,
            "category": 1,
            "messageText": "Type 'number' is not assignable to type 'string'."
          }
        ]
      ],
      "../src/other.ts"
    ],
    "affectedFilesPendingEmit": [
      [
        "../src/main.ts",
        "Full"
      ]
    ]
  },
  "version": "FakeTSVersion",
  "size": 1344
}


Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Output::
>> Screen clear
[[90m12:01:26 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:27 AM[0m] Project 'tsconfig.json' is out of date because oldest output 'dev-build/shared/types/db.js' is older than newest input 'src/main.ts'

[[90m12:01:28 AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[96msrc/main.ts[0m:[93m2[0m:[93m7[0m - [91merror[0m[90m TS2322: [0mType 'number' is not assignable to type 'string'.

[7m2[0m const a: string = 10;
[7m [0m [91m      ~[0m

[[90m12:01:29 AM[0m] Found 1 error. Watching for file changes.



Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: Fix Semantic Error

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts]
import { A } from "../shared/types/db";
const a: string = "hello";


Output::
>> Screen clear
[[90m12:01:33 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:34 AM[0m] Project 'tsconfig.json' is out of date because oldest output 'dev-build/shared/types/db.js' is older than newest input 'src/main.ts'

[[90m12:01:35 AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90m12:01:43 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90m12:01:47 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/noEmitOnError/src/main.ts

Shape signatures in builder refreshed for::
/user/username/projects/noemitonerror/src/main.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js] file changed its modified time
//// [/user/username/projects/noEmitOnError/dev-build/src/main.js]
"use strict";
exports.__esModule = true;
var a = "hello";


//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] file changed its modified time
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","../shared/types/db.ts","../src/main.ts","../src/other.ts"],"fileInfos":[{"version":"3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };","affectsGlobalScope":true},{"version":"-9621097780-export interface A {\r\n    name: string;\r\n}","signature":"-5014788164-export interface A {\n    name: string;\n}\n"},{"version":"-8373351622-import { A } from \"../shared/types/db\";\nconst a: string = \"hello\";","signature":"-3531856636-export {};\n"},{"version":"11373096570-console.log(\"hi\");\r\nexport { }","signature":"-3531856636-export {};\n"}],"options":{"noEmitOnError":true,"outDir":"./"},"fileIdsList":[[2]],"referencedMap":[[3,1]],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2,3,4]},"version":"FakeTSVersion"}

//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ],
    "fileNamesList": [
      [
        "../shared/types/db.ts"
      ]
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "signature": "3858781397-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }\ninterface ReadonlyArray<T> {}\ndeclare const console: { log(msg: any): void; };",
        "affectsGlobalScope": true
      },
      "../shared/types/db.ts": {
        "version": "-9621097780-export interface A {\r\n    name: string;\r\n}",
        "signature": "-5014788164-export interface A {\n    name: string;\n}\n"
      },
      "../src/main.ts": {
        "version": "-8373351622-import { A } from \"../shared/types/db\";\nconst a: string = \"hello\";",
        "signature": "-3531856636-export {};\n"
      },
      "../src/other.ts": {
        "version": "11373096570-console.log(\"hi\");\r\nexport { }",
        "signature": "-3531856636-export {};\n"
      }
    },
    "options": {
      "noEmitOnError": true,
      "outDir": "./"
    },
    "referencedMap": {
      "../src/main.ts": [
        "../shared/types/db.ts"
      ]
    },
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "../shared/types/db.ts",
      "../src/main.ts",
      "../src/other.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 1172
}


Change:: No change

Input::
//// [/user/username/projects/noEmitOnError/src/main.ts] file written with same contents

Output::
>> Screen clear
[[90m12:01:51 AM[0m] File change detected. Starting incremental compilation...

[[90m12:01:52 AM[0m] Project 'tsconfig.json' is out of date because oldest output 'dev-build/shared/types/db.js' is older than newest input 'src/main.ts'

[[90m12:01:53 AM[0m] Building project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90m12:01:55 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/noEmitOnError/tsconfig.json'...

[[90m12:01:56 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/noEmitOnError/shared/types/db.ts","/user/username/projects/noEmitOnError/src/main.ts","/user/username/projects/noEmitOnError/src/other.ts"]
Program options: {"outDir":"/user/username/projects/noEmitOnError/dev-build","noEmitOnError":true,"watch":true,"incremental":true,"configFilePath":"/user/username/projects/noEmitOnError/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/noEmitOnError/shared/types/db.ts
/user/username/projects/noEmitOnError/src/main.ts
/user/username/projects/noEmitOnError/src/other.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/noemitonerror/tsconfig.json:
  {"fileName":"/user/username/projects/noEmitOnError/tsconfig.json","pollingInterval":250}
/user/username/projects/noemitonerror/shared/types/db.ts:
  {"fileName":"/user/username/projects/noEmitOnError/shared/types/db.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/main.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/main.ts","pollingInterval":250}
/user/username/projects/noemitonerror/src/other.ts:
  {"fileName":"/user/username/projects/noEmitOnError/src/other.ts","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/noemitonerror:
  {"directoryName":"/user/username/projects/noemitonerror","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/noEmitOnError/dev-build/shared/types/db.js] file changed its modified time
//// [/user/username/projects/noEmitOnError/dev-build/src/main.js] file changed its modified time
//// [/user/username/projects/noEmitOnError/dev-build/src/other.js] file changed its modified time
//// [/user/username/projects/noEmitOnError/dev-build/tsconfig.tsbuildinfo] file changed its modified time
