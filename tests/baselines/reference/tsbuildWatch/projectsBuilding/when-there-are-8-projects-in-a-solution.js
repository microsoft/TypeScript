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

//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;

//// [/user/username/projects/myproject/pkg0/tsconfig.json]
{"compilerOptions":{"composite":true}}

//// [/user/username/projects/myproject/pkg1/index.ts]
export const pkg1 = 1;

//// [/user/username/projects/myproject/pkg1/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg2/index.ts]
export const pkg2 = 2;

//// [/user/username/projects/myproject/pkg2/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg3/index.ts]
export const pkg3 = 3;

//// [/user/username/projects/myproject/pkg3/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg4/index.ts]
export const pkg4 = 4;

//// [/user/username/projects/myproject/pkg4/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg5/index.ts]
export const pkg5 = 5;

//// [/user/username/projects/myproject/pkg5/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg6/index.ts]
export const pkg6 = 6;

//// [/user/username/projects/myproject/pkg6/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/pkg7/index.ts]
export const pkg7 = 7;

//// [/user/username/projects/myproject/pkg7/tsconfig.json]
{"compilerOptions":{"composite":true},"references":[{"path":"../pkg0"}]}

//// [/user/username/projects/myproject/tsconfig.json]
{"references":[{"path":"./pkg0"},{"path":"./pkg1"},{"path":"./pkg2"},{"path":"./pkg3"},{"path":"./pkg4"},{"path":"./pkg5"},{"path":"./pkg6"},{"path":"./pkg7"}],"files":[]}


/a/lib/tsc.js -b -w -v
Output::
>> Screen clear
[[90m12:01:07 AM[0m] Starting compilation in watch mode...

[[90m12:01:08 AM[0m] Projects in this build: 
    * pkg0/tsconfig.json
    * pkg1/tsconfig.json
    * pkg2/tsconfig.json
    * pkg3/tsconfig.json
    * pkg4/tsconfig.json
    * pkg5/tsconfig.json
    * pkg6/tsconfig.json
    * pkg7/tsconfig.json
    * tsconfig.json

[[90m12:01:09 AM[0m] Project 'pkg0/tsconfig.json' is out of date because output file 'pkg0/index.js' does not exist

[[90m12:01:10 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:01:19 AM[0m] Project 'pkg1/tsconfig.json' is out of date because output file 'pkg1/index.js' does not exist

[[90m12:01:20 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:01:29 AM[0m] Project 'pkg2/tsconfig.json' is out of date because output file 'pkg2/index.js' does not exist

[[90m12:01:30 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:01:39 AM[0m] Project 'pkg3/tsconfig.json' is out of date because output file 'pkg3/index.js' does not exist

[[90m12:01:40 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:01:49 AM[0m] Project 'pkg4/tsconfig.json' is out of date because output file 'pkg4/index.js' does not exist

[[90m12:01:50 AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:01:59 AM[0m] Project 'pkg5/tsconfig.json' is out of date because output file 'pkg5/index.js' does not exist

[[90m12:02:00 AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:02:09 AM[0m] Project 'pkg6/tsconfig.json' is out of date because output file 'pkg6/index.js' does not exist

[[90m12:02:10 AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:02:19 AM[0m] Project 'pkg7/tsconfig.json' is out of date because output file 'pkg7/index.js' does not exist

[[90m12:02:20 AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:02:29 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg1/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg1/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg2/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg2/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg3/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg3/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg4/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg4/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg4/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg5/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg5/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg5/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg6/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg6/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg6/index.ts (computed .d.ts during emit)

Program root files: ["/user/username/projects/myproject/pkg7/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg7/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Shape signatures in builder refreshed for::
/a/lib/lib.d.ts (used version)
/user/username/projects/myproject/pkg7/index.ts (computed .d.ts during emit)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.pkg0 = void 0;
exports.pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10197922616-export const pkg0 = 0;","signature":"-4821832606-export declare const pkg0 = 0;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-10197922616-export const pkg0 = 0;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg1/index.js]
"use strict";
exports.__esModule = true;
exports.pkg1 = void 0;
exports.pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/index.d.ts]
export declare const pkg1 = 1;


//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-10158787190-export const pkg1 = 1;","signature":"-3530363548-export declare const pkg1 = 1;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-10158787190-export const pkg1 = 1;",
        "signature": "-3530363548-export declare const pkg1 = 1;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg2/index.js]
"use strict";
exports.__esModule = true;
exports.pkg2 = void 0;
exports.pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/index.d.ts]
export declare const pkg2 = 2;


//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14414619060-export const pkg2 = 2;","signature":"-6533861786-export declare const pkg2 = 2;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14414619060-export const pkg2 = 2;",
        "signature": "-6533861786-export declare const pkg2 = 2;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg3/index.js]
"use strict";
exports.__esModule = true;
exports.pkg3 = void 0;
exports.pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/index.d.ts]
export declare const pkg3 = 3;


//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14375483634-export const pkg3 = 3;","signature":"-5242392728-export declare const pkg3 = 3;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14375483634-export const pkg3 = 3;",
        "signature": "-5242392728-export declare const pkg3 = 3;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg4/index.js]
"use strict";
exports.__esModule = true;
exports.pkg4 = void 0;
exports.pkg4 = 4;


//// [/user/username/projects/myproject/pkg4/index.d.ts]
export declare const pkg4 = 4;


//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14336348208-export const pkg4 = 4;","signature":"-3950923670-export declare const pkg4 = 4;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14336348208-export const pkg4 = 4;",
        "signature": "-3950923670-export declare const pkg4 = 4;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg5/index.js]
"use strict";
exports.__esModule = true;
exports.pkg5 = void 0;
exports.pkg5 = 5;


//// [/user/username/projects/myproject/pkg5/index.d.ts]
export declare const pkg5 = 5;


//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14297212782-export const pkg5 = 5;","signature":"-2659454612-export declare const pkg5 = 5;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14297212782-export const pkg5 = 5;",
        "signature": "-2659454612-export declare const pkg5 = 5;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg6/index.js]
"use strict";
exports.__esModule = true;
exports.pkg6 = void 0;
exports.pkg6 = 6;


//// [/user/username/projects/myproject/pkg6/index.d.ts]
export declare const pkg6 = 6;


//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14258077356-export const pkg6 = 6;","signature":"-5662952850-export declare const pkg6 = 6;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14258077356-export const pkg6 = 6;",
        "signature": "-5662952850-export declare const pkg6 = 6;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}

//// [/user/username/projects/myproject/pkg7/index.js]
"use strict";
exports.__esModule = true;
exports.pkg7 = void 0;
exports.pkg7 = 7;


//// [/user/username/projects/myproject/pkg7/index.d.ts]
export declare const pkg7 = 7;


//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-14218941930-export const pkg7 = 7;","signature":"-4371483792-export declare const pkg7 = 7;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-14218941930-export const pkg7 = 7;",
        "signature": "-4371483792-export declare const pkg7 = 7;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 727
}


Change:: dts doesn't change

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;


Output::
>> Screen clear
[[90m12:02:32 AM[0m] File change detected. Starting incremental compilation...

[[90m12:02:33 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:02:34 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:02:47 AM[0m] Project 'pkg1/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:02:49 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:02:50 AM[0m] Project 'pkg2/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:02:52 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:02:53 AM[0m] Project 'pkg3/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:02:55 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:02:56 AM[0m] Project 'pkg4/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:02:58 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:02:59 AM[0m] Project 'pkg5/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:03:01 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:03:02 AM[0m] Project 'pkg6/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:03:04 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:03:05 AM[0m] Project 'pkg7/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:03:07 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:03:08 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts] file written with same contents
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"-7839887915-export const pkg0 = 0;const someConst2 = 10;","signature":"-4821832606-export declare const pkg0 = 0;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "-7839887915-export const pkg0 = 0;const someConst2 = 10;",
        "signature": "-4821832606-export declare const pkg0 = 0;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 748
}

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time

Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: dts change

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;


Output::
>> Screen clear
[[90m12:03:11 AM[0m] File change detected. Starting incremental compilation...

[[90m12:03:12 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:03:13 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;","signature":"-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "1748855762-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;",
        "signature": "-6216230055-export declare const pkg0 = 0;\nexport declare const someConst = 10;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 813
}


Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Output::
[[90m12:03:26 AM[0m] Project 'pkg1/tsconfig.json' is out of date because oldest output 'pkg1/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:03:27 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:03:29 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:03:30 AM[0m] Project 'pkg2/tsconfig.json' is out of date because oldest output 'pkg2/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:03:31 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:03:33 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:03:34 AM[0m] Project 'pkg3/tsconfig.json' is out of date because oldest output 'pkg3/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:03:35 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:03:37 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:03:38 AM[0m] Project 'pkg4/tsconfig.json' is out of date because oldest output 'pkg4/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:03:39 AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:03:41 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:03:42 AM[0m] Project 'pkg5/tsconfig.json' is out of date because oldest output 'pkg5/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:03:43 AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:03:45 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg1/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg2/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg3/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg4/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg4/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg5/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg5/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg6,pkg7

Input::

Output::
[[90m12:03:46 AM[0m] Project 'pkg6/tsconfig.json' is out of date because oldest output 'pkg6/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:03:47 AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:03:49 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:03:50 AM[0m] Project 'pkg7/tsconfig.json' is out of date because oldest output 'pkg7/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:03:51 AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:03:53 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:03:54 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg6/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg6/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg7/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg7/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg6/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time

Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined


Change:: dts change2

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;


Output::
>> Screen clear
[[90m12:03:57 AM[0m] File change detected. Starting incremental compilation...

[[90m12:03:58 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:03:59 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.someConst3 = exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;
exports.someConst3 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts]
export declare const pkg0 = 0;
export declare const someConst = 10;
export declare const someConst3 = 10;


//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;","signature":"-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "10857255042-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;",
        "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 883
}


Change:: build pkg1,pkg2,pkg3,pkg4,pkg5

Input::

Output::
[[90m12:04:13 AM[0m] Project 'pkg1/tsconfig.json' is out of date because oldest output 'pkg1/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:04:14 AM[0m] Building project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:04:16 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:04:17 AM[0m] Project 'pkg2/tsconfig.json' is out of date because oldest output 'pkg2/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:04:18 AM[0m] Building project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:04:20 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:04:21 AM[0m] Project 'pkg3/tsconfig.json' is out of date because oldest output 'pkg3/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:04:22 AM[0m] Building project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:04:24 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:04:25 AM[0m] Project 'pkg4/tsconfig.json' is out of date because oldest output 'pkg4/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:04:26 AM[0m] Building project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:04:28 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:04:29 AM[0m] Project 'pkg5/tsconfig.json' is out of date because oldest output 'pkg5/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:04:30 AM[0m] Building project '/user/username/projects/myproject/pkg5/tsconfig.json'...

[[90m12:04:32 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg1/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg1/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg1/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg2/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg2/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg2/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg3/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg3/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg3/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg4/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg4/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg4/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg5/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg5/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg5/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Change:: change while building

Input::
//// [/user/username/projects/myproject/pkg0/index.ts]
export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;


Output::
>> Screen clear
[[90m12:04:35 AM[0m] File change detected. Starting incremental compilation...

[[90m12:04:36 AM[0m] Project 'pkg0/tsconfig.json' is out of date because oldest output 'pkg0/index.js' is older than newest input 'pkg0/index.ts'

[[90m12:04:37 AM[0m] Building project '/user/username/projects/myproject/pkg0/tsconfig.json'...

[[90m12:04:50 AM[0m] Project 'pkg1/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:04:52 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg1/tsconfig.json'...

[[90m12:04:53 AM[0m] Project 'pkg2/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:04:55 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg2/tsconfig.json'...

[[90m12:04:56 AM[0m] Project 'pkg3/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:04:58 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg3/tsconfig.json'...

[[90m12:04:59 AM[0m] Project 'pkg4/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:05:01 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg4/tsconfig.json'...

[[90m12:05:02 AM[0m] Project 'pkg5/tsconfig.json' is up to date with .d.ts files from its dependencies

[[90m12:05:04 AM[0m] Updating output timestamps of project '/user/username/projects/myproject/pkg5/tsconfig.json'...



Program root files: ["/user/username/projects/myproject/pkg0/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg0/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg0/index.ts

Semantic diagnostics in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts

Shape signatures in builder refreshed for::
/user/username/projects/myproject/pkg0/index.ts (computed .d.ts)

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg0/index.js]
"use strict";
exports.__esModule = true;
exports.someConst3 = exports.someConst = exports.pkg0 = void 0;
exports.pkg0 = 0;
var someConst2 = 10;
exports.someConst = 10;
exports.someConst3 = 10;
var someConst4 = 10;


//// [/user/username/projects/myproject/pkg0/index.d.ts] file written with same contents
//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo]
{"program":{"fileNames":["../../../../../a/lib/lib.d.ts","./index.ts"],"fileInfos":[{"version":"-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }","affectsGlobalScope":true},{"version":"27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;","signature":"-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"}],"options":{"composite":true},"referencedMap":[],"exportedModulesMap":[],"semanticDiagnosticsPerFile":[1,2]},"version":"FakeTSVersion"}

//// [/user/username/projects/myproject/pkg0/tsconfig.tsbuildinfo.readable.baseline.txt]
{
  "program": {
    "fileNames": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ],
    "fileInfos": {
      "../../../../../a/lib/lib.d.ts": {
        "version": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "signature": "-7698705165-/// <reference no-default-lib=\"true\"/>\ninterface Boolean {}\ninterface Function {}\ninterface CallableFunction {}\ninterface NewableFunction {}\ninterface IArguments {}\ninterface Number { toExponential: any; }\ninterface Object {}\ninterface RegExp {}\ninterface String { charAt: any; }\ninterface Array<T> { length: number; [n: number]: T; }",
        "affectsGlobalScope": true
      },
      "./index.ts": {
        "version": "27277091473-export const pkg0 = 0;const someConst2 = 10;export const someConst = 10;export const someConst3 = 10;const someConst4 = 10;",
        "signature": "-13679921373-export declare const pkg0 = 0;\nexport declare const someConst = 10;\nexport declare const someConst3 = 10;\n"
      }
    },
    "options": {
      "composite": true
    },
    "referencedMap": {},
    "exportedModulesMap": {},
    "semanticDiagnosticsPerFile": [
      "../../../../../a/lib/lib.d.ts",
      "./index.ts"
    ]
  },
  "version": "FakeTSVersion",
  "size": 905
}

//// [/user/username/projects/myproject/pkg1/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg1/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg1/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg2/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg2/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg3/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg3/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg4/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg4/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg5/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg5/tsconfig.tsbuildinfo] file changed its modified time

Change:: build pkg6,pkg7

Input::

Output::
[[90m12:05:05 AM[0m] Project 'pkg6/tsconfig.json' is out of date because oldest output 'pkg6/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:05:06 AM[0m] Building project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:05:08 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg6/tsconfig.json'...

[[90m12:05:09 AM[0m] Project 'pkg7/tsconfig.json' is out of date because oldest output 'pkg7/index.js' is older than newest input 'pkg0/tsconfig.json'

[[90m12:05:10 AM[0m] Building project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:05:12 AM[0m] Updating unchanged output timestamps of project '/user/username/projects/myproject/pkg7/tsconfig.json'...

[[90m12:05:13 AM[0m] Found 0 errors. Watching for file changes.



Program root files: ["/user/username/projects/myproject/pkg6/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg6/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg6/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

Program root files: ["/user/username/projects/myproject/pkg7/index.ts"]
Program options: {"composite":true,"watch":true,"configFilePath":"/user/username/projects/myproject/pkg7/tsconfig.json"}
Program structureReused: Not
Program files::
/a/lib/lib.d.ts
/user/username/projects/myproject/pkg7/index.ts

Semantic diagnostics in builder refreshed for::

No shapes updated in the builder::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

//// [/user/username/projects/myproject/pkg6/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg6/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg6/tsconfig.tsbuildinfo] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.js] file changed its modified time
//// [/user/username/projects/myproject/pkg7/index.d.ts] file changed its modified time
//// [/user/username/projects/myproject/pkg7/tsconfig.tsbuildinfo] file changed its modified time

Change:: No change

Input::

Output::

WatchedFiles::
/user/username/projects/myproject/pkg0/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg0/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg0/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg0/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg1/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg1/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg1/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg1/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg2/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg2/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg2/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg2/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg3/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg3/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg3/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg3/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg4/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg4/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg4/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg4/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg5/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg5/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg5/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg5/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg6/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg6/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg6/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg6/index.ts","pollingInterval":250}
/user/username/projects/myproject/pkg7/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/pkg7/tsconfig.json","pollingInterval":250}
/user/username/projects/myproject/pkg7/index.ts:
  {"fileName":"/user/username/projects/myproject/pkg7/index.ts","pollingInterval":250}
/user/username/projects/myproject/tsconfig.json:
  {"fileName":"/user/username/projects/myproject/tsconfig.json","pollingInterval":250}

FsWatches::

FsWatchesRecursive::
/user/username/projects/myproject/pkg0:
  {"directoryName":"/user/username/projects/myproject/pkg0","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg1:
  {"directoryName":"/user/username/projects/myproject/pkg1","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg2:
  {"directoryName":"/user/username/projects/myproject/pkg2","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg3:
  {"directoryName":"/user/username/projects/myproject/pkg3","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg4:
  {"directoryName":"/user/username/projects/myproject/pkg4","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg5:
  {"directoryName":"/user/username/projects/myproject/pkg5","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg6:
  {"directoryName":"/user/username/projects/myproject/pkg6","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}
/user/username/projects/myproject/pkg7:
  {"directoryName":"/user/username/projects/myproject/pkg7","fallbackPollingInterval":500,"fallbackOptions":{"watchFile":"PriorityPollingInterval"}}

exitCode:: ExitStatus.undefined

